export const CONSTANTS = {
  google: {
    capatcha: process.env.REACT_APP_CAPTCHA as string,
  },
  emailJs: {
    serviceId: process.env.REACT_APP_EMAIL_SERVICE as string,
    templateId: process.env.REACT_APP_EMAIL_TEMPLATE as string,
    publicKey: process.env.REACT_APP_EMAIL_KEY as string,
  },
};
