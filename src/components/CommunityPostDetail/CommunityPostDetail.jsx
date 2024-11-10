import React from "react";
import Navbar from "../../layout/Navbar/Navbar";
import { useParams } from "react-router-dom";
import "./CommunityPostDetail.style.css";
import NotFoundPage from "../../pages/NotFound/NotFoundPage";

// test Code (임시 데이터)
const posts = [
  { id: 1, title: "테스트1", author: "차지태", date: "2024.09.24" },
  { id: 2, title: "테스트2", author: "이충현", date: "2024.09.25" },
  { id: 3, title: "테스트3", author: "배준형", date: "2024.09.26" },
  { id: 4, title: "테스트4", author: "최근호", date: "2024.09.27" },
  { id: 5, title: "테스트5", author: "배대한", date: "2024.09.28" },
  { id: 6, title: "테스트6", author: "이선재", date: "2024.09.29" },
];

const PostDetail = () => {
  const { id } = useParams();
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className="postDetailContainer">
      <Navbar />
      <div className="postDetailContentContainer">
        <p>{post.date}</p>
        <h1>{post.title}</h1>
        <p>작성자: {post.author}</p>
      </div>
    </div>
  );
};

export default PostDetail;
