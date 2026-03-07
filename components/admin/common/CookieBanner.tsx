"use client";

import CookieConsent from "react-cookie-consent";
import Link from "next/link";

export default function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept cookies"
      declineButtonText="Reject non-essential"
      enableDeclineButton
      cookieName="zerava_cookie_consent"
      style={{
        background: "#ffffff",
        color: "#1f2937",
        borderTop: "1px solid #e5e7eb",
        padding: "20px",
      }}
      contentStyle={{
        maxWidth: "900px",
        margin: "auto",
        fontSize: "14px",
        lineHeight: "1.6",
      }}
      buttonStyle={{
        background: "#10b981",
        color: "#ffffff",
        borderRadius: "6px",
        padding: "8px 16px",
        fontSize: "14px",
      }}
      declineButtonStyle={{
        background: "#a4a4a4",
        color: "#ffffff",
        borderRadius: "6px",
        padding: "8px 16px",
        fontSize: "14px",
      }}
    >
      <div>
        <strong>We use cookies</strong> to improve your experience, analyse
        website traffic, and support essential site functionality.  
        You can accept all cookies or reject non-essential ones.  

        <span className="ml-1">
          Learn more in our{" "}
          <Link
            href="/cookies"
            className="underline text-emerald-600"
          >
            Cookie Policy
          </Link>.
        </span>
      </div>
    </CookieConsent>
  );
}