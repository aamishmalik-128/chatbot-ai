import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};
const NavigationLinks = (props: Props) => {
  return (
    <Link
      to={props.to}
      onClick={props.onClick}
      style={{
        textDecoration: "none",
        padding: "10px 22px",
        borderRadius: "12px",
        background: props.bg,
        color: props.textColor,
        fontWeight: 600,
        fontSize: "15px",
        letterSpacing: "0.5px",
        transition: "all .3s ease",
        boxShadow: "0 0 15px rgba(0,229,255,.25)",
        border: "1px solid rgba(255,255,255,.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 0 20px rgba(0,229,255,.55)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 0 15px rgba(0,229,255,.25)";
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLinks;
