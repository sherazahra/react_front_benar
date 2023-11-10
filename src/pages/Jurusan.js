import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Modal} from 'react-bootstrap';
const token = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

function Jurusan() {
  const [jurusan, setJurusan] = useState([]);
  const [show, setShow] = useState(false);
  const [namaJurusan, setNamaJurusan] = useState('');
  const [id_j, setIdJurusan] = useState('');
  const [editData, setEditData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try{
      const headers ={
        Authorization: `Bearer ${token}`,
      }
    const response = await axios.get('http://localhost:5000/api/jurusan');
    const data = await response.data.data;
    setJurusan(data);
    } catch (error){
      console.error('Gagal mengambil data:', error);
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShowEditModal = (data) => {
    setEditData(data);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditData(null);
  };

  const handleNamaJurusanChange = (e) => {
    setNamaJurusan(e.target.value);
  };

  const handleIdJurusanChange = (e) => {
    setIdJurusan(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nama_jurusan: namaJurusan,
    };

    try {
      await axios.post('http://localhost:5000/api/jurusan/store', data, {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
          },
      });
      fetchData();
      handleClose();
    } catch (error) {
      console.error('Kesalahan: ', error);
}
  };

  const handleUpdate = async () => {
    const data = {
      nama_jurusan: editData.nama_jurusan,
    };

    try {
      await axios.patch(`http://localhost:5000/api/jurusan/update/${editData.id_j}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
      fetchData();
      handleCloseEditModal();
    } catch (error) {
      console.error('Kesalahan:', error);
    }
  };

  const handleDelete = async (id_j) => {
    try {
      await axios.delete(`http://localhost:5000/api/jurusan/delete/${id_j}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus data:', error);
    }
  };

  return (
    <div>
      <h2>Data Jurusan</h2>
      <button onClick={handleShow} className="btn btn-primary">
        Tambah Jurusan
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID Jurusan</th>
            <th scope="col">Nama Jurusan</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {jurusan.map((j, index) => (
            <tr key={index}>
              <td>{j.id_j}</td>
              <td>{j.nama_jurusan}</td>
              <td>
                <button onClick={() => handleShowEditModal(j)} className="btn btn-sm btn-info">
                  Edit
                </button>
                <button onClick={() => handleDelete(j.id_j)} className="btn btn-sm btn-danger">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jurusan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nama Jurusan:</label>
              <input
                type="text"
                className="form-control"
                value={namaJurusan}
                onChange={handleNamaJurusanChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Jurusan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Nama Jurusan:</label>
              <input
                type="text"
                className="form-control"
                value={editData ? editData.nama_jurusan : ''}
                onChange={(e) => setEditData({ ...editData, nama_jurusan: e.target.value })}
              />
            </div>
            <button onClick={handleUpdate} className="btn btn-primary">
              Simpan Perubahan
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Jurusan;
