import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

function About() {
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const fetchStudentInfo = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/about`);
      setStudentInfo(response.data);
    } catch (err) {
      setError('Không thể tải thông tin. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="about-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="about-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-card">
          <h1 className="about-title">👤 Thông tin cá nhân</h1>
          
          <div className="info-group">
            <label>Họ và tên:</label>
            <p>{studentInfo?.fullName || 'N/A'}</p>
          </div>

          <div className="info-group">
            <label>Mã số sinh viên (MSSV):</label>
            <p>{studentInfo?.studentId || 'N/A'}</p>
          </div>

          <div className="info-group">
            <label>Lớp:</label>
            <p>{studentInfo?.class || 'N/A'}</p>
          </div>

          <div className="info-group">
            <label>Trường:</label>
            <p>{studentInfo?.school || 'N/A'}</p>
          </div>

          <hr />

          <div className="app-info">
            <h2>📚 Về ứng dụng</h2>
            <div className="info-group">
              <label>Tên ứng dụng:</label>
              <p>{studentInfo?.appName || 'N/A'}</p>
            </div>

            <div className="info-group">
              <label>Mô tả:</label>
              <p>{studentInfo?.message || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
