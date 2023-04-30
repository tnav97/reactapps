// @ts-nocheck
/**
 * Since we use ReactDOMServer to render on server side,
 * 'window' is not available, and therefore we should reference
 * process.env on the server side to get envrionment variables
 */

const environmentVariables = {
  MIXPANEL_TOKEN: process.env.SELF_SIGNUP_MIXPANEL_TOKEN,
};
const { MIXPANEL_TOKEN } = environmentVariables;

export { MIXPANEL_TOKEN };
export default environmentVariables;
