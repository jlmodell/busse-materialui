import React from "react";
import NavBar from "./layout/Navbar";
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
