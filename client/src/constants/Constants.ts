export const CONSTANTS = {
  google: {
    capatcha: process.env.REACT_APP_CAPTCHA || "",
  },
  emailJs: {
    serviceId: process.env.REACT_APP_EMAIL_SERVICE || "",
    templateId: process.env.REACT_APP_EMAIL_TEMPLATE || "",
    publicKey: process.env.REACT_APP_EMAIL_KEY || "",
  },
  apiEndpoints: {
    graduationRsvps: process.env.REACT_APP_GRADUATION_RSVPS_API_URL || "",
  },
  secrets: {
    consolePassword: process.env.REACT_APP_CONSOLE_PASSWORD || "password",
  },
};
