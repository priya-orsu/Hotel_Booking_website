import { FaUser, FaLock, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const res = await axios.post('https://hotel-booking-website-szw4.onrender.com/api/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

     alert(res.data.message || "User registered successfully!");
     window.location.href = '/login';
    } catch (err) {
      console.error("Registration error:", err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'white',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px grey',
        padding: '2rem',
        width: '100%',
        maxWidth: '450px',
        marginTop: '80px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', color: 'red' }}>
          <h2 style={{ margin: 0 }}>VS-Hotel</h2>
          <p style={{ color: '#64748b', marginTop: '5px' }}>Create your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#334155' }}>
              <FaUser style={{ marginRight: '8px' }} />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#334155' }}>
              <FaEnvelope style={{ marginRight: '8px' }} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#334155' }}>
              <FaLock style={{ marginRight: '8px' }} />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#334155' }}>
              <FaLock style={{ marginRight: '8px' }} />
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            <FaUserPlus /> Register
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          color: '#64748b',
          fontSize: '14px'
        }}>
          Already have an account?{' '}
          <a href="/login" style={{
            color: 'red',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid black',
  borderRadius: '6px',
  fontSize: '16px'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px'
};

export default RegisterPage;
