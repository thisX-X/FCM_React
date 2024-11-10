import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../layout/Navbar/Navbar.jsx";
import "./WriterPage.css";

export default function LoginPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();

        const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);

        const userId = user.userId;

        const queryParams = new URLSearchParams(location.search);
        const boardGrade = queryParams.get('boardGrade');
        const grade = boardGrade.toUpperCase();

        const adjustedPassword = password === "" ? null : password;

        const postData = {
            title,
            content,
            userId,
            grade,
            password: adjustedPassword,
        };

        try {
            const response = await axios.post(
                "/api/post",
                postData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                navigate(`/${boardGrade}`);
            } else {
                console.error("글작성 실패");
            }
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };
    const signupNavigate = () => {
        navigate("/signup");
    };

    return (
        <div className="writePostContainer">
            <Navbar/>
            <h1 className="writePostTitle">글쓰기</h1>
            <form className="writePostForm" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="제목을 입력하세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="password">비밀번호 등록</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력하세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="formContentGroup">
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        placeholder="내용을 입력하세요."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="submitButtonContainer">
                    <button type="submit" className="submitButton">
                        작성하기
                    </button>
                </div>
            </form>
        </div>
    );
}
