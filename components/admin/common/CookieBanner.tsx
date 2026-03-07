"use client";

import CookieConsent from "react-cookie-consent";

export default function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Reject"
      enableDeclineButton
      cookieName="zerava_cookie_consent"
      style={{ background: "#0A0A0A" }}
      buttonStyle={{ background: "#38D6C4", color: "#000", borderRadius: "6px" }}
      declineButtonStyle={{ background: "#a21616", color: "#fff", borderRadius: "6px" }}
    >
      We use cookies to analyse traffic and improve your experience.
    </CookieConsent>
  );
}