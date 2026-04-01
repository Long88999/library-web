import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BorrowerList.css';

function BorrowerList({ refreshTrigger }) {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBorrowers();
  }, [refreshTrigger]);

  const fetchBorrowers = async () => {
    try {
      setLoading(true);
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/api/borrowers`);
      setBorrowers(response.data);
      setError('');
    } catch (err) {
      setError('Không thể tải danh sách. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      try {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        await axios.delete(`${API_URL}/api/borrowers/${id}`);
        fetchBorrowers();
      } catch (err) {
        setError('Lỗi khi xóa dữ liệu');
      }
    }
  };

  if (loading) {
    return <div className="loading">⏳ Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (borrowers.length === 0) {
    return <div className="empty-state">Chưa có đăng ký nào</div>;
  }

  return (
    <div className="borrower-list">
      <div className="list-header">
        <p>Tổng số: <strong>{borrowers.length}</strong> đăng ký</p>
      </div>
      <table className="borrower-table">
        <thead>
          <tr>
            <th>Họ và tên</th>
            <th>MSSV</th>
            <th>Tên sách</th>
            <th>Ngày mượn</th>
            <th>Hạn trả</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {borrowers.map(borrower => (
            <tr key={borrower._id} className="borrower-row">
              <td>{borrower.fullName}</td>
              <td>{borrower.studentId}</td>
              <td>{borrower.bookName}</td>
              <td>{new Date(borrower.borrowDate).toLocaleDateString('vi-VN')}</td>
              <td>{new Date(borrower.dueDate).toLocaleDateString('vi-VN')}</td>
              <td>
                <span className={`status status-${borrower.status}`}>
                  {borrower.status === 'borrowed' ? '📖 Đang mượn' : '✅ Đã trả'}
                </span>
              </td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(borrower._id)}
                  title="Xóa"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowerList;
