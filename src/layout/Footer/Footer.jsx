import React from "react";
import "./Footer.style.css";
import Logo from "/public/images/Favicon/Calorie.png";

export default function Footer() {
  return (
    <div className="footerContentContainer">
      <div className="footerLogoContainer">
        <img className="footerInfoLogo" src={Logo} />
        <div className="footerInfoTitle">FCM</div>
      </div>
      <div className="footerInfoTextContainer">
        <div className="footerInfoCopyright">
          © 2024. 기업연계프로젝트 All rights reserved.
        </div>
        <div className="footerInfoCopyright">
          전북특별자치도 익산시 신동 원광대학교 | 010-1234-5678
        </div>
      </div>
    </div>
  );
}
