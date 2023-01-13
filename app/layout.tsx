"use client";

import { useRouter } from "next/router";
import NavBar from "components/NavBar";
import SideNav from "components/SideNav";
import "styles/globals.css";

export default function Layout({ children }) {
  return (
    <html>
      <head />
      <body>
        <NavBar />
        {/* <SideNav /> */}
        <div className="max-w-screen-2xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
