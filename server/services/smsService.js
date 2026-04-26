export function getSmsMode() {
  const hasTwilioConfig =
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_NUMBER;

  return hasTwilioConfig ? "twilio-configured-stub" : "simulated-sms";
}

export function buildSmsReply(analysis) {
  return {
    mode: getSmsMode(),
    body: analysis.patientReply,
    note:
      "This prototype does not require real Twilio credentials. The webhook simulates an inbound SMS and returns the same care-coordination analysis."
  };
}
