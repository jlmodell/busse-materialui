import React from "react";
import NavBar from "./layout/Navbar_Reach";
import Footer from "./layout/Footer";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
