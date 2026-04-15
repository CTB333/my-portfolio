import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useErrorSnack,
  useFetch,
  useScrollToTop,
  useSuccessSnack,
  useTimeoutEffect,
} from "../hooks";
import { useScreenSize } from "../providers";
import { CheckboxInput, Input, TextButton } from "../components";
import { produce } from "immer";
import { CONSTANTS } from "../constants";

enum FamilySide {
  Mom = "Mom",
  Dad = "Dad",
  Lex = "Lex",
  Friends = "Friends",
}

export const RSVP = () => {
  useScrollToTop();
  const { ltSmall } = useScreenSize();

  const [isComing, setIsComing] = useState<boolean>(true);
  const [showGuestList, setShowGuestList] = useState(false);

  const [name, setName] = useState("");
  const [numBringing, setNumBringing] = useState("1");
  const [guestList, setGuestList] = useState([""]);

  const [familySide, setFamilySide] = useState<FamilySide | "">("");

  const { post } = useFetch();
  const successSnack = useSuccessSnack();
  const errorSnack = useErrorSnack();

  useTimeoutEffect(
    () => {
      const num = parseInt(numBringing);
      if (isNaN(num) || num < 1) {
        setNumBringing("1");
        setGuestList([""]);
        setShowGuestList(false);
      } else if (num - 1 !== guestList.length) {
        setGuestList(
          num > guestList.length
            ? [...guestList].concat(Array(num - 1 - guestList.length).fill(""))
            : guestList.slice(0, num - 1),
        );
      }
    },
    [numBringing],
    150,
  );

  const validate = () => {
    if (name.trim().length === 0) {
      return errorSnack("Please enter your name.", true, false);
    }

    if (isComing) {
      const num = parseInt(numBringing, 10);
      if (isNaN(num) || num < 1) {
        return errorSnack("Number of people must be at least 1.", true, false);
      }

      if (!familySide) {
        return errorSnack(
          "Please select which side of the family you are from.",
          true,
          false,
        );
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    const data = {
      name,
      numBringing: parseInt(numBringing, 10),
      guestList,
      familySide,
    };

    const res = await post(
      CONSTANTS.apiEndpoints.graduationRsvps + "/create",
      data,
    );

    if (res.err || !res.data) {
      console.log(`Error submitting RSVP: ${res.err}`);
      errorSnack("Failed to submit RSVP.", true, false);
      return;
    }

    successSnack("RSVP submitted successfully!", true, false);
    setName("");
    setNumBringing("1");
    setGuestList([""]);
    setFamilySide("");
    setShowGuestList(false);
  };

  return (
    <div
      className={`flex column bg-secondary color-primary pv-50 ${ltSmall ? "ph-15" : "ph-100"}`}
    >
      <div className="mb-50 text-center">
        <p className="fs-1 font-2 bold color-primary">RSVP</p>
        <Link to="/graduation/invite" className="fs-3 mv-10 color-primary">
          Graduation - May 9, 2026
        </Link>
      </div>

      <div className="rad-25 bg-primary p-50 mw-700 center">
        <p className="fs-2 bold color-secondary text-center">
          Let us know your coming!
        </p>

        <div
          className="flex row center mt-20"
          style={{ gap: "16px", flexWrap: "wrap" }}
        >
          <CheckboxInput
            checked={isComing}
            onChange={(checked) => checked && setIsComing(true)}
            label="Yes, I will be attending"
          />
          <CheckboxInput
            checked={!isComing}
            onChange={(checked) => checked && setIsComing(false)}
            label="No, I cannot attend"
          />
        </div>

        {isComing && (
          <div className="flex column">
            <Input
              dark
              placeHolder="Name"
              value={name}
              onValueChange={setName}
            />

            <div className="mv-20">
              <Input
                dark
                type="number"
                placeHolder="# of people coming (including you)"
                value={numBringing}
                onValueChange={setNumBringing}
              />
            </div>

            {guestList.length > 0 && (
              <div className="flex row jc-end">
                <div style={{ width: "300px" }}>
                  <TextButton
                    onPress={() => setShowGuestList((prev) => !prev)}
                    buttonColor="#944bbb"
                    color="#FFFFFF"
                    text={showGuestList ? "Hide guest list" : "Tell us who"}
                  />
                </div>
              </div>
            )}

            {showGuestList && (
              <div className="flex column mt-20">
                <p className="fs-5 bold color-secondary mb-10">
                  Who are you coming with?
                </p>
                {guestList.map((guest, i) => (
                  <div key={i} className="mb-10">
                    <Input
                      dark
                      placeHolder="Name(s) of guests"
                      value={guest}
                      onValueChange={(v) =>
                        setGuestList(
                          produce(guestList, (draft) => {
                            draft[i] = v;
                          }),
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex column mt-25" style={{ gap: "14px" }}>
              <p className="fs-5 bold color-secondary mb-10">
                Which side of the family are you from?
              </p>
              <div
                className="flex center row"
                style={{ gap: "12px", flexWrap: "wrap" }}
              >
                <CheckboxInput
                  checked={familySide === FamilySide.Mom}
                  onChange={(checked) =>
                    setFamilySide(checked ? FamilySide.Mom : "")
                  }
                  label="Mom"
                />
                <CheckboxInput
                  checked={familySide === FamilySide.Dad}
                  onChange={(checked) =>
                    setFamilySide(checked ? FamilySide.Dad : "")
                  }
                  label="Dad"
                />
                <CheckboxInput
                  checked={familySide === FamilySide.Lex}
                  onChange={(checked) =>
                    setFamilySide(checked ? FamilySide.Lex : "")
                  }
                  label="Lex"
                />
                <CheckboxInput
                  checked={familySide === FamilySide.Friends}
                  onChange={(checked) =>
                    setFamilySide(checked ? FamilySide.Friends : "")
                  }
                  label="Friends"
                />
              </div>
            </div>

            <div className="mt-30">
              <TextButton
                onPress={handleSubmit}
                buttonColor="#944bbb"
                color="#FFFFFF"
                text="Submit RSVP"
              />
            </div>
          </div>
        )}

        {!isComing && (
          <div className="flex column mt-30">
            <p className="fs-5 color-secondary text-center">
              Sorry to hear that you won't be able to make it.
            </p>
            <p className="fs-5 color-secondary text-center">
              Check back as the date approaches for a link to the livestream of
              the event to tune in from home.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
