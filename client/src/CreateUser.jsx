import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const submit = async (e) => {
    e.preventDefault();
    
    console.log("=== SUBMIT DEBUG ===");
    console.log("API_URL:", API_URL);
    console.log("Full endpoint:", `${API_URL}/createUser`);
    console.log("Data being sent:", { name, email, age });
    
    try {
      const response = await axios.post(`${API_URL}/createUser`, { 
        name, 
        email, 
        age: Number(age)
      });
      
      console.log("SUCCESS!");
      console.log("Response:", response);
      console.log("Response data:", response.data);
      
      alert("User created successfully!");
      navigate("/");
    } catch (err) {
      console.error("ERROR OCCURRED!");
      console.error("Full error:", err);
      console.error("Error message:", err.message);
      console.error("Error response:", err.response);
      console.error("Error response data:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={submit}>
          <h2>Add User</h2>

          <div className='mb-2'>
            <label>Name</label>
            <input 
              type='text' 
              placeholder='Enter Name' 
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className='mb-2'>
            <label>Email</label>
            <input 
              type='email' 
              placeholder='Enter Email' 
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='mb-2'>
            <label>Age</label>
            <input 
              type='number' 
              placeholder='Enter Age' 
              className='form-control'
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <button className='btn btn-success' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateUser;