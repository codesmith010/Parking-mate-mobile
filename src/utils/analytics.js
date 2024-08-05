import analytics from "@react-native-firebase/analytics";

/**
 * Easily log an analytics event. Guaranteed to succeed.
 * Will sanity check arguments for correctness vs underlying analytics provider,
 * and log errors (possibly via analytics if possible)
 *
 * @param {string} name 40 character max alphanumeric and '_' only, starts with alpha
 * @param {Object} props keys 40 character max w/name content rules, values 100 character max
 */
function analyticsEvent(name, props) {
  try {
    analytics().logEvent(name, props);
  } catch (e) {
    console.log("Unable to tag analytics event:", e);
  }
}

/**
 * Set user properties
 * @param {{ [key: string]: string | null }} props keys 24 char max alphanumeric and '_' only starts alpha, values 26 char max
 */
function setAnalyticsUserProperties(props) {
  analytics().setUserProperties(props);
}

function setAnalyticsUser(id) {
  analytics().setUserId(id);
}

/**
 * Verify that we follow google rules for analytics string contents
 * If there is a problem it will have the side-effect of logging a reportable event
 * for followup to fix the problem
 * @param {string} value string to verify
 * @param {number} maxLength optional max length of the string, defaults to 40
 */
function checkAnalyticsString(value, maxLength = 40) {
  let badEvent = "errorInvalidAnalyticsEvent";
  if (value.length > maxLength) {
    analytics().logEvent(badEvent, { badKey: value.substr(0, maxLength - 1) });
    return false;
  }

  if (!/^[a-zA-Z][_a-zA-Z0-9]+$/.test(value)) {
    analytics().logEvent(badEvent, { badKey: value });
    return false;
  }

  return true;
}

export {
  analyticsEvent,
  setAnalyticsUserProperties,
  setAnalyticsUser,
  checkAnalyticsString,
};
