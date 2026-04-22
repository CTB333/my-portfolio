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
const LOGS = process.env.LOGS === "true";

type IRSVP = {
  rsvpId: string;
  name: string;
  phone: string;
  isComing: boolean;
  numBringing: number;
  guestList: string[];
  familySide: string;
  attendingDinner: boolean;
  keepInContact: boolean;
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

  @prop({ type: String })
  phone: string;

  @prop({ required: true, type: Boolean })
  isComing: boolean;

  @prop({ required: true, type: Number })
  numBringing: number;

  @prop({ required: true, type: () => [String] })
  guestList: string[];

  @prop({ required: true, type: String })
  familySide: string;

  @prop({ required: true, type: Boolean })
  attendingDinner: boolean;

  @prop({ required: true, type: Boolean })
  keepInContact: boolean;

  constructor() {
    this.rsvpId = new mongoose.Types.ObjectId().toString();
    this.name = "";
    this.phone = "";
    this.isComing = false;
    this.numBringing = 1;
    this.guestList = [];
    this.familySide = "";
    this.attendingDinner = false;
    this.keepInContact = false;
  }

  setRSVP({
    rsvpId,
    name,
    phone,
    isComing,
    numBringing,
    guestList,
    familySide,
    attendingDinner,
    keepInContact,
  }: IRSVP) {
    this.rsvpId = rsvpId;
    this.name = name;
    this.phone = phone;
    this.isComing = isComing;
    this.numBringing = numBringing;
    this.guestList = guestList;
    this.familySide = familySide;
    this.attendingDinner = attendingDinner;
    this.keepInContact = keepInContact;
  }

  toRSVP(): IRSVP {
    return {
      rsvpId: this.rsvpId,
      name: this.name,
      phone: this.phone,
      isComing: this.isComing,
      numBringing: this.numBringing,
      guestList: this.guestList,
      familySide: this.familySide,
      attendingDinner: this.attendingDinner,
      keepInContact: this.keepInContact,
    };
  }
}

const RSVPModel = getModelForClass(RSVP);

const getFirstError = (validation: Validator.Validator<IRSVP>) => {
  const errors = validation.errors.all();
  const firstKey = Object.keys(errors)[0];
  return errors[firstKey][0];
};

const log = (...args: any[]) => LOGS && console.log(...args);

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
    log(`Connecting to MongoDB...`);
    await mongoose.connect(MONGO_URI, {
      timeoutMS: 10000,
      dbName: "tondreau-tech",
    });
    log(`Connected to MongoDB.`);

    if (method === "POST") {
      if (!bodyJson) throw new Error("Request body is required.");

      const body = JSON.parse(bodyJson) as IRSVP;
      log("Received RSVP:", body);
      const validation = new Validator(body, {
        name: "required|string",
        phone: "present|string",
        isComing: "required|boolean",
        numBringing: "required|integer|min:1",
        guestList: "present|array",
        familySide: "required|string",
        attendingDinner: "required|boolean",
        keepInContact: "required|boolean",
      });
      log("Validation result:");
      log(`Passed: ${validation.passes()}, Failed: ${validation.fails()}`);
      log("Validation errors:", validation.errors.all());

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
    log(`API Error: ${err instanceof Error ? err.message : err}`);
  } finally {
    await mongoose.connection.close();
  }

  return response;
};
