import localFont from "next/font/local";

// Host Grotesk, self-hosted. Exposed as the CSS variable --font-host-grotesk
// and applied to the site in app/globals.css (.site-body).
export const hostGrotesk = localFont({
  src: [
    { path: "../styles/fonts/HostGrotesk-Light.woff2", weight: "300", style: "normal" },
    { path: "../styles/fonts/HostGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "../styles/fonts/HostGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "../styles/fonts/HostGrotesk-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-host-grotesk",
  display: "swap",
});
