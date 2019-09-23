import React from "react";

function Footer({ remaining, total }) {
  return (
    <p data-testid="footer">
      {remaining} / {total} left
    </p>
  );
}

export default Footer;
