import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar";
import NotFoundPage from "../../pages/NotFound/NotFoundPage";
import axios from "axios";
import "./CommunityPageDetail.css";

export default function CommunityPostDetail() {
    const { id } = useParams(); // Extracts the post id from the URL
    const [post, setPost] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/post/community/${id}`);
                setPost(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to load the post.", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        loadPost();
    }, [id]);

    if (error) {
        return <NotFoundPage />;
    }

    if (loading) {
        return <div className="loadingIndicator">Loading...</div>;
    }

    if (!post) {
        return <div>No post available.</div>;
    }

    return (
        <div className="postDetailContainer">
            <Navbar />
            <div className="postDetailContentContainer">
                <h1>{post.title}</h1>
                <p>{post.writer}</p>
                <p>{post.content}</p>
            </div>
        </div>
    );
};