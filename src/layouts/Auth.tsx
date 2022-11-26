import React from "react";
import { Outlet } from "react-router-dom";

// Import components

import Navbar from "../components/Navbars/AuthNavbar";
import FooterSmall from "../components/Footers/FooterSmall";

// Import assets
import bgImg from "../assets/img/register_bg_2.png";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url(" + bgImg + ")",
            }}
          ></div>
          <Outlet />
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
