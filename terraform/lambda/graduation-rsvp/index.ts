import {
  Handler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import Validator from "validatorjs";
import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import mongoose from "mongoose";
import {
  BeAnObject,
  BeAnyObject,
  IObjectWithTypegooseFunction,
} from "@typegoose/typegoose/lib/types";

const MONGO_URI = process.env.MONGO_URI || "";
const _importDynamic = new Function("modulePath", "return import(modulePath)");

const fetch = async function (...args: any): Promise<Response> {
  const { default: fetch } = await _importDynamic("node-fetch");
  return fetch(...args);
};

type IRSVP = {
  rsvpId: string;
  name: string;
  numBringing: number;
  guestList: string[];
  familySide: string;
};

type IDocument<T> =
  | (mongoose.Document<unknown, BeAnObject, T, BeAnyObject, {}> &
      Omit<
        T & {
          _id: mongoose.Types.ObjectId;
        } & {
          __v: number;
        },
        "typegooseName"
      > &
      IObjectWithTypegooseFunction)
  | null;

@modelOptions({ schemaOptions: { collection: "Graduation-RSVP" }, options: {} })
class RSVP implements IRSVP {
  @prop({ required: true, type: String })
  rsvpId: string;

  @prop({ required: true, type: String })
  name: string;

  @prop({ required: true, type: Number })
  numBringing: number;

  @prop({ required: true, type: () => [String] })
  guestList: string[];

  @prop({ required: true, type: String })
  familySide: string;

  constructor() {
    this.rsvpId = new mongoose.Types.ObjectId().toString();
    this.name = "";
    this.numBringing = 1;
    this.guestList = [];
    this.familySide = "";
  }

  setRSVP({ rsvpId, name, numBringing, guestList, familySide }: IRSVP) {
    this.rsvpId = rsvpId;
    this.name = name;
    this.numBringing = numBringing;
    this.guestList = guestList;
    this.familySide = familySide;
  }

  toRSVP(): IRSVP {
    return {
      rsvpId: this.rsvpId,
      name: this.name,
      numBringing: this.numBringing,
      guestList: this.guestList,
      familySide: this.familySide,
    };
  }
}

const RSVPModel = getModelForClass(RSVP);

const getFirstError = (validation: Validator.Validator<IRSVP>) => {
  const errors = validation.errors.all();
  const firstKey = Object.keys(errors)[0];
  return errors[firstKey][0];
};

export const handler: Handler = async (event: APIGatewayProxyEvent) => {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: `{}`,
  };

  const method = event.httpMethod;
  const forwardPath =
    (event.pathParameters?.forwardPath as string | undefined) || "";
  const bodyJson = event.body;

  try {
    await mongoose.connect(MONGO_URI, {
      timeoutMS: 10000,
      dbName: "tondreau-tech",
    });

    if (method === "POST") {
      if (!bodyJson) throw new Error("Request body is required.");

      const body = JSON.parse(bodyJson) as IRSVP;
      const validation = new Validator(body, {
        name: "required|string",
        numBringing: "required|integer|min:1",
        guestList: "present|array",
        familySide: "required|string",
      });

      if (validation.fails())
        throw new Error(`Validation failed: ${getFirstError(validation)}`);

      const doc = new RSVPModel({
        ...body,
        rsvpId: new mongoose.Types.ObjectId().toString(),
      });
      await doc.save();

      response.body = JSON.stringify({
        message: "RSVP saved successfully.",
        rsvpId: doc.rsvpId,
      });
    }

    if (method === "GET") {
      const splitPaths = forwardPath.split("/").filter((p) => p.trim() !== "");

      if (splitPaths.length === 0) return response;

      if (splitPaths[0] === "all") {
        const rsvps = await RSVPModel.find({});
        response.body = JSON.stringify({ rsvps: rsvps.map((r) => r.toRSVP()) });
        return response;
      }

      const rsvpId = splitPaths[0];
      const rsvp: IDocument<RSVP> | null = await RSVPModel.findOne({ rsvpId });

      if (!rsvp) throw new Error(`Could not find RSVP (${rsvpId})`);

      response.body = JSON.stringify({
        rsvp: rsvp.toRSVP(),
      });
      return response;
    }
  } catch (err: unknown) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      error: err instanceof Error ? err.message : "Internal Server Error",
    });
    console.log(`API Error: ${err instanceof Error ? err.message : err}`);
  } finally {
    await mongoose.connection.close();
  }

  return response;
};
