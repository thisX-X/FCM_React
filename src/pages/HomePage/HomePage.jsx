import React from "react";
import "./HomePage.style.css";
import Navbar from "../../layout/Navbar/Navbar";
import Benefit from "./components/Benefit";
import Footer from "../../layout/Footer/Footer";
import WorryCheck from "/public/images/HomePageImage/WorryCheck.png";
import DietControl from "/public/images/HomePageImage/DietControl.png";
import ServiceFree from "/public/images/HomePageImage/ServiceFree.png";

export default function HomePage() {
  return (
    <div className="homePageContainer">
      <Navbar />
      <div className="bannerContainer">
        <div className="bannerSubTitleText">
          AI Calculation of food Calories
        </div>
        <div className="bannerTitleText">내가 섭취하고</div>
        <div className="bannerTitleText">있는 열량은</div>
        <div className="bannerTitleText">어떻게 될까?</div>
        <div className="bannerButton">AI 분석 바로가기</div>
      </div>
      <div className="benefitContentContainer">
        <div className="benefitTitleContainer">
          <div className="benefitSubTitle">Positive</div>
          <div className="benefitTitleSet">
            <div className="benefitTitle">저희 사이트의,</div>
            <div className="benefitTitleWord">대표 장점</div>
          </div>
        </div>
        <div className="hompageBenefitContainer">
          <Benefit
            icon={WorryCheck}
            contentTitle={"걱정되는 칼로리 해결"}
            subContent={"칼로리 걱정, 더 이상 미루지 마세요."}
          />
          <div className="benefitContour"></div>
          <Benefit
            icon={DietControl}
            contentTitle={"식단 조절 기능"}
            subContent={"맞춤형 식단으로 건강한 변화를 시작하세요."}
          />
          <div className="benefitContour"></div>
          <Benefit
            icon={ServiceFree}
            contentTitle={"서비스 무료 제공"}
            subContent={"부담 없이 체험하는 스마트한 관리"}
          />
        </div>
      </div>
      <div className="homepageBottomContainer">
        <div className="homepageBottomTitleContainerSet">
          <div className="homepageBottomTitleContainer">
            <div className="homepageTopSubTitle">AI</div>
            <div className="homepageTitleSet">
              <div className="homepageTitle">깔끔한 AI 분석, 어떻게</div>
              <div className="homepageTitle">이루어 지나요?</div>
            </div>
            <div className="homepageBottomSubTitle">AI 기술 상세하게 기재</div>
          </div>
          <div className="hompageBottomTitleButton">AI 분석 사용하기</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
