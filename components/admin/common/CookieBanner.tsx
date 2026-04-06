"use client";

import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import Script from "next/script";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const consent = getCookieConsentValue("zerava_cookie_consent");
    if (consent === "true") {
      setAccepted(true);
    }
  }, []);

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept cookies"
        declineButtonText="Reject non-essential"
        enableDeclineButton
        cookieName="zerava_cookie_consent"
        expires={180}
        onAccept={() => setAccepted(true)}
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
          <span className="ml-1">
            Learn more in our{" "}
            <Link href="/cookies" className="underline text-emerald-600">
              Cookie Policy
            </Link>.
          </span>
        </div>
      </CookieConsent>

      {accepted && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-J49J0MF84R"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-J49J0MF84R');
            `}
          </Script>
        </>
      )}
    </>
  );
}