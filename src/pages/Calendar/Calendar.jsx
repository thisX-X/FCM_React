import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import Navbar from "../../layout/Navbar/Navbar.jsx";

Modal.setAppElement('#root');

const CustomCalendar = () => {
    const [events, setEvents] = useState([]); // 서버에서 가져올 이벤트 목록을 저장할 상태
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDescription, setNewEventDescription] = useState('');

    // 서버에서 이벤트 데이터를 가져오는 부분 추가
    useEffect(() => {
        // 사용자 ID 가져오기
        const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);
    
        if (user && user.userId) {
            const userId = user.userId;
    
            // 사용자 ID를 포함한 API 호출
            axios
                .get(`/api/calendar/${userId}`)
                .then(response => {
                    const data = response.data;
                    if (Array.isArray(data)) {
                        // 서버에서 받은 데이터를 Date 객체로 변환
                        const transformedData = data.map(event => ({
                            ...event,
                            date: new Date(event.date), // 이벤트의 date 필드를 Date 객체로 변환
                        }));
                        setEvents(transformedData); // 변환된 데이터를 상태에 저장
                    } else {
                        console.error('서버에서 받은 데이터가 배열이 아닙니다:', data);
                    }
                })
                .catch(error => {
                    console.error('이벤트 데이터 가져오기 실패:', error);
                });
        } else {
            console.error('사용자 정보가 유효하지 않습니다.');
        }
    }, []);

    const findEventsForDate = (date) => {
        return events.filter(event =>
            event.date.getFullYear() === date.getFullYear() &&
            event.date.getMonth() === date.getMonth() &&
            event.date.getDate() === date.getDate()
        );
    };

    const handleDateClick = (date) => {
        const dateEvents = findEventsForDate(date);
        setSelectedDateEvents(dateEvents);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDateEvents([]);
        setSelectedFile(null);
        setNewEventTitle('');
        setNewEventDescription('');
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = () => {
        if (selectedFile || (newEventTitle && newEventDescription)) {
            const formData = new FormData();
    
            // 파일 추가
            if (selectedFile) {
                formData.append('file', selectedFile);
            }
    
            // JSON 객체 생성
            const entity = {
                title: newEventTitle,
                description: newEventDescription,
                userId: JSON.parse(sessionStorage.getItem('user')).userId,
            };
    
            // JSON 객체를 문자열로 변환 후 추가
            formData.append('entity', JSON.stringify(entity));
    
            // 서버에 POST 요청
            fetch('/api/calendar/upload', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('파일 및 이벤트 업로드 성공:', data);
                    closeModal();
                })
                .catch(error => {
                    console.error('파일 업로드 실패:', error);
                });
        }
    };

    return (
        <div className="calendar-container">
            <Navbar />
            <h1 className="calendar-title">달력</h1>
            <Calendar
                onClickDay={handleDateClick}
                tileContent={({ date, view }) => view === 'month' && findEventsForDate(date).length > 0 ? <span className="event-dot">●</span> : null}
                className="custom-calendar"
            />

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="react-modal"
                contentLabel="Event Modal"
            >
                <div className="modal-header">
                    <h2>이벤트 관리</h2>
                    <button className="modal-close-btn" onClick={closeModal}>&times;</button>
                </div>

                <div className="modal-content">
                    {selectedDateEvents.length > 0 && (
                        <div>
                            <h2>이벤트 목록</h2>
                            {selectedDateEvents.map((event, index) => (
                                <div key={index}>
                                    <h3>{event.title}</h3>
                                    <p>{`${event.date.getFullYear()}년 ${event.date.getMonth() + 1}월 ${event.date.getDate()}일`}</p>
                                    <p>{event.description}</p>
                                    {event.fileUrl && (
                                        <p>파일: <a href={event.fileUrl}>다운로드</a></p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="modal-input">
                        <h2>새로운 이벤트 추가</h2>
                        <input
                            type="text"
                            placeholder="이벤트 제목"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="이벤트 설명"
                            value={newEventDescription}
                            onChange={(e) => setNewEventDescription(e.target.value)}
                        />
                        <input type="file" onChange={handleFileChange} />
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="submit-btn" onClick={handleSubmit}>파일 및 이벤트 업로드</button>
                    <button className="cancel-btn" onClick={closeModal}>닫기</button>
                </div>
            </Modal>
        </div>
    );
};

export default CustomCalendar;