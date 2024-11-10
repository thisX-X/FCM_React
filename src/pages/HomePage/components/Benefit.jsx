import React from "react";
import "./Benefit.style.css";

export default function Benefit({ icon, contentTitle, subContent }) {
  return (
    <div className="benefitContainer">
      <img className="benefitIconImage" src={icon} />
      <div className="benefitContent">{contentTitle}</div>
      <div className="benefitSubContent">{subContent}</div>
    </div>
  );
}
