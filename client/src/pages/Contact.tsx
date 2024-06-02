import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Input, TextButton } from "../components";
import { COLORS, CONSTANTS } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { useScrollToTop } from "../hooks";
import { useScreenSize } from "../providers";

const useContact = () => {
  const form = useRef<HTMLFormElement>(null);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const submitButton = useRef<HTMLInputElement>(null);

  useScrollToTop();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [captcha, setCaptcha] = useState<string | null>(null);

  const errorMessage = (msg: string) => {
    toast(msg, {
      type: "error",
    });
  };

  const successMessage = () => {
    toast("Thanks for reaching out I will get back as soon as possible", {
      type: "success",
      autoClose: 5000,
    });
  };

  const reset = () => {
    setName("");
    setEmail("");
    setMsg("");
  };

  const validate = () => {
    if (name.length === 0) {
      errorMessage("Missing Name");
      return false;
    }
    if (email.length === 0) {
      errorMessage("Missing Email");
      return false;
    }
    if (msg.length === 0) {
      errorMessage("Missing Project Idea");
      return false;
    }
    if (!captcha) {
      errorMessage("Please Prove you are Human");
      return false;
    }
    return true;
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current || !captchaRef.current) return;

    if (!validate()) return;

    const template = {
      user_name: name,
      user_email: email,
      user_message: msg,
      "g-recaptcha-response": captcha,
    };

    emailjs
      .send(
        CONSTANTS.emailJs.serviceId,
        CONSTANTS.emailJs.templateId,
        template,
        CONSTANTS.emailJs.publicKey
      )
      .then((result) => {
        successMessage();
        reset();
      })
      .catch((error) => {
        // console.log(`Email Error:`);
        // console.log(stringify(error));
        errorMessage("Something went wrong, please try again later");
      });
  };

  return {
    form,
    state: {
      name,
      setName,
      email,
      setEmail,
      msg,
      setMsg,
      captcha,
      setCaptcha,
      captchaRef,
    },
    submitButton,
    sendEmail,
  };
};

export const Contact = () => {
  const { form, state, submitButton, sendEmail } = useContact();
  const {
    name,
    setName,
    email,
    setEmail,
    msg,
    setMsg,
    captcha,
    setCaptcha,
    captchaRef,
  } = state;

  const { ltMedSmall, ltSmall } = useScreenSize();

  return (
    <div
      className={`pb-100 bg-secondary pv-50 ${
        ltMedSmall ? "ph-15" : "ph-150"
      }  flex`}
    >
      <ToastContainer closeOnClick autoClose={2000} limit={1} />
      <div
        className={`rad-20 p-25 bg-primary flex-1 color-secondary ${
          ltSmall ? "ph-10" : "ph-50"
        }`}
      >
        <p className="fs-2 bold font-2">Lets Get In Contact</p>

        <form className="flex column" ref={form} onSubmit={sendEmail}>
          <div className={`flex center  ${ltSmall ? "column" : "row space"}`}>
            <div className={`flex-1 ${ltSmall ? "width mv-20" : "mr-20"}`}>
              <Input
                value={name}
                onValueChange={setName}
                placeHolder="Full Name"
                name="user_name"
                type="text"
              />
            </div>
            <div className={`flex-1 ${ltSmall ? "width " : "ml-20"}`}>
              <Input
                value={email}
                onValueChange={setEmail}
                placeHolder="Email"
                name="user_email"
                type="email"
              />
            </div>
          </div>

          <div className="mv-20">
            <Input
              value={msg}
              onValueChange={setMsg}
              placeHolder="Project Idea"
              name="user_message"
              longText
            />
          </div>

          <input ref={submitButton} type="submit" style={{ display: "none" }} />

          <div className={`flex  ${ltSmall ? "column" : "ai-end space"}`}>
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={CONSTANTS.google.capatcha}
              onChange={setCaptcha}
            />
            <TextButton
              disabled={captcha === null}
              onPress={() => submitButton.current!.click()}
              buttonColor={COLORS.accent}
              color={COLORS.primary}
              text="Send Message"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
