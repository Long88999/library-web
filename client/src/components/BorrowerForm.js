import React, { useState } from 'react';
import axios from 'axios';
import './BorrowerForm.css';

function BorrowerForm({ onBorrowerAdded }) {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    bookName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${API_URL}/api/borrowers`, formData);
      
      setSuccess('✅ Đăng ký thành công!');
      setFormData({ fullName: '', studentId: '', bookName: '' });
      
      // Call parent callback to refresh list
      if (onBorrowerAdded) {
        onBorrowerAdded();
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('❌ ' + (err.response?.data?.message || 'Đăng ký thất bại'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="borrower-form" onSubmit={handleSubmit}>
      {error && <div className="form-alert error">{error}</div>}
      {success && <div className="form-alert success">{success}</div>}

      <div className="form-group">
        <label htmlFor="fullName">Họ và tên *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Nhập họ và tên"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="studentId">Mã số sinh viên (MSSV) *</label>
        <input
          type="text"
          id="studentId"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          placeholder="Nhập MSSV"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="bookName">Tên sách *</label>
        <input
          type="text"
          id="bookName"
          name="bookName"
          value={formData.bookName}
          onChange={handleChange}
          placeholder="Nhập tên sách"
          required
        />
      </div>

      <button type="submit" disabled={loading} className="btn-submit">
        {loading ? 'Đang xử lý...' : 'Đăng ký mượn sách'}
      </button>
    </form>
  );
}

export default BorrowerForm;
