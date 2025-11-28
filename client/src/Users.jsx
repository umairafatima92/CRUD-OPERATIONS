import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;


  // Fetch all users
  useEffect(() => {
    axios.get(`${API_URL}/users`) 
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);

  // Delete a user
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/deleteUser/${id}`)
      .then(res => {
        console.log(res.data);
        
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <Link to="/create" className='btn btn-success mb-3'>Add +</Link>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/update/${user._id}`} className='btn btn-success me-2'>Update</Link>
                  <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users;
