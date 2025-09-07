// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/ui/Navbar';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup, googleSignIn } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await googleSignIn();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-primary)',
    display: 'flex',
    flexDirection: 'column'
  };

  const formStyle = {
    maxWidth: '400px',
    margin: 'var(--spacing-2xl) auto',
    padding: 'var(--spacing-xl)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--color-bg-primary)'
  };

  return (
    <div style={pageStyle}>
      <Navbar />
      
      <div style={formStyle}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-xl)',
          color: 'var(--color-text-primary)'
        }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {error && (
          <div style={{ 
            padding: 'var(--spacing-md)',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-md)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              padding: 'var(--spacing-md)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-primary)'
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={{
              padding: 'var(--spacing-md)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-primary)'
            }}
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              style={{
                padding: 'var(--spacing-md)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-primary)',
                color: 'var(--color-text-primary)'
              }}
            />
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: 'var(--spacing-md)',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontWeight: '600',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: 'var(--spacing-md) 0' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>or</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            width: '100%',
            padding: 'var(--spacing-md)',
            backgroundColor: 'white',
            color: '#1a1a1a',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-sm)',
            opacity: loading ? 0.7 : 1
          }}
        >
          <img 
            src="https://developers.google.com/identity/images/g-logo.png" 
            alt="Google" 
            style={{ width: '20px', height: '20px' }}
          />
          Continue with Google
        </button>

        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-md)' }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;