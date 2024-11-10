import React from "react";
import "./NotFoundPage.style.css";
import Warning from "/public/images/NotFoundPage/Warning.png";
import BackButton from "/public/images/NotFoundPage/backButton.png";
import HomeButton from "/public/images/NotFoundPage/HomeButton.png";

export default function NotFoundPage() {
  return (
    <div className="notFoundContainer">
      <img src={Warning} className="notFoundImage" />
      <h1 className="notFoundTextHeader">
        요청하신 페이지를 찾을 수 없습니다.
      </h1>
      <p className="notFoundTextContent notFoundSign">
        입력한 주소가 잘못되었거나, 사용이 일시 중단되어 요청하신 페이지를 찾을
        수 없습니다.
      </p>
      <p className="notFoundTextContent notFoundReroadText">
        다시 한번 확인 부탁드립니다.
      </p>
      <div className="buttonContainer">
        <div className="backButton">
          <img src={BackButton} />
          BACK
        </div>
        <div className="homeButton">
          <img src={HomeButton} />
          HOME
        </div>
      </div>
    </div>
  );
}
