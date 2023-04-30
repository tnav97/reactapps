const environmentVariables = {
  MIXPANEL_TOKEN: process.env.SAFETY_INTELLIGENCE_MIXPANEL_TOKEN,
  featureToggles: {
    SHOW_EDIT_PASSWORD_BUTTON:
      process.env
        .FEATURE_TOGGLE_SHOW_UPDATE_PASSWORD_BUTTON_FOR_SAFETY_INTELLIGENCE,
  },
};
export default environmentVariables;
