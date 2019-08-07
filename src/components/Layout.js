import React from "react";
import { NavBar, Footer } from "./layout/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
