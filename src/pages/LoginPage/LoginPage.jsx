import React, { useState } from "react";
import "./LoginPage.style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../layout/Footer/Footer";
import Logo from "/public/images/LoginPageImage/LogoNoneText.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "/api/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
          const user = response.data;
          sessionStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        console.error("로그인 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const signupNavigate = () => {
    navigate("/signup");
  };

  return (
    <div className="loginContainer">
      <div className="loginTitleSet">
        <img className="loginTitleIcon" src={Logo} />
        <div className="loginTitle">FCM</div>
      </div>
      <input
        type="email"
        className="email"
        placeholder="이메일을 입력해주세요"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="password"
        placeholder="비밀번호를 입력해주세요"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="loginPageButton loginPageSubmitButton"
        onClick={handleSubmit}
      >
        로그인
      </button>
      <div className="loginPageSignupAskContainer">
        <div className="loginPageSignupQuestion">아직 회원이 아니신가요?</div>
        <div className="loginPageSignupQuestionLine"></div>
        <div
          className="loginPageButton loginPageGoSignupPage"
          onClick={signupNavigate}
        >
          회원가입
        </div>
      </div>
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
}
