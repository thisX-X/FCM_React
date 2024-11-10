import Logo from "/public/images/NavbarImage/LogoNoneText.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.style.css";

export default function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userSession = sessionStorage.getItem("user");

    if (userSession) {
      try {
        const user = JSON.parse(userSession);
        setUserName(user.username);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("사용자 세션 파싱에 실패했습니다:", error);
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    alert("로그아웃되었습니다.");
    setDropdownVisible(false);
  };

  const handleNavigateToMypage = () => {
    navigate("/calendar");
    setDropdownVisible(false);
  };

  const homePageNavigate = () => {
    navigate("/");
  };

  const communityNavigate = () => {
    navigate("/community");
  };

  const questionAnswerNavigate = () => {
    navigate("/question");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const loginNavigate = () => {
    if (isLoggedIn) {
      toggleDropdown();
    } else {
      navigate("/login");
    }
  };

  return (
      <div className="navbarContainer">
        <div className="navbarHomeNavigateContainer" onClick={homePageNavigate}>
          <img className="navbarNavigate navbarLogo" src={Logo} alt="Logo" />
          <div className="navbarNavigate navbarHomeAnchor">FCM</div>
        </div>
        <div className="navbarNavigateSet">
          <div className="navbarNavigate" onClick={communityNavigate}>
            커뮤니티
          </div>
          <div className="navbarNavigate" onClick={questionAnswerNavigate}>
            Q&A
          </div>

          <div className="navbarDropdown">
            <div className="navbarNavigate" onClick={loginNavigate}>
              {isLoggedIn ? `${userName}님 ▼` : "로그인"}
            </div>
            {isLoggedIn && dropdownVisible && (
                <div className="navbarDropdownMenu">
                  <div
                      className="navbarDropdownItem"
                      onClick={handleNavigateToMypage}
                  >
                    내 기록
                  </div>
                  <div className="navbarDropdownItem" onClick={handleLogout}>
                    로그아웃
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}