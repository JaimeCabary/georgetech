// // src/pages/Login.jsx
// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import Navbar from '../components/ui/Navbar';

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   const { login, signup, googleSignIn } = useAuth();

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (!isLogin && formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     try {
//       if (isLogin) {
//         await login(formData.email, formData.password);
//       } else {
//         await signup(formData.email, formData.password);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//     setLoading(false);
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       setError('');
//       setLoading(true);
//       await googleSignIn();
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   const pageStyle = {
//     minHeight: '100vh',
//     backgroundColor: 'var(--color-bg-primary)',
//     display: 'flex',
//     flexDirection: 'column'
//   };

//   const formStyle = {
//     maxWidth: '400px',
//     margin: 'var(--spacing-2xl) auto',
//     padding: 'var(--spacing-xl)',
//     border: '1px solid var(--color-border)',
//     borderRadius: 'var(--radius-lg)',
//     backgroundColor: 'var(--color-bg-primary)'
//   };

//   return (
//     <div style={pageStyle}>
//       <Navbar />
      
//       <div style={formStyle}>
//         <h2 style={{ 
//           textAlign: 'center', 
//           marginBottom: 'var(--spacing-xl)',
//           color: 'var(--color-text-primary)'
//         }}>
//           {isLogin ? 'Login' : 'Sign Up'}
//         </h2>

//         {error && (
//           <div style={{ 
//             padding: 'var(--spacing-md)',
//             backgroundColor: '#fee2e2',
//             color: '#dc2626',
//             borderRadius: 'var(--radius-md)',
//             marginBottom: 'var(--spacing-md)'
//           }}>
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             style={{
//               padding: 'var(--spacing-md)',
//               border: '1px solid var(--color-border)',
//               borderRadius: 'var(--radius-md)',
//               backgroundColor: 'var(--color-bg-primary)',
//               color: 'var(--color-text-primary)'
//             }}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//             style={{
//               padding: 'var(--spacing-md)',
//               border: '1px solid var(--color-border)',
//               borderRadius: 'var(--radius-md)',
//               backgroundColor: 'var(--color-bg-primary)',
//               color: 'var(--color-text-primary)'
//             }}
//           />
//           {!isLogin && (
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               required
//               style={{
//                 padding: 'var(--spacing-md)',
//                 border: '1px solid var(--color-border)',
//                 borderRadius: 'var(--radius-md)',
//                 backgroundColor: 'var(--color-bg-primary)',
//                 color: 'var(--color-text-primary)'
//               }}
//             />
//           )}
//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               padding: 'var(--spacing-md)',
//               backgroundColor: 'var(--color-primary)',
//               color: 'white',
//               border: 'none',
//               borderRadius: 'var(--radius-md)',
//               cursor: 'pointer',
//               fontWeight: '600',
//               opacity: loading ? 0.7 : 1
//             }}
//           >
//             {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
//           </button>
//         </form>

//         <div style={{ textAlign: 'center', margin: 'var(--spacing-md) 0' }}>
//           <span style={{ color: 'var(--color-text-secondary)' }}>or</span>
//         </div>

//         <button
//           onClick={handleGoogleSignIn}
//           disabled={loading}
//           style={{
//             width: '100%',
//             padding: 'var(--spacing-md)',
//             backgroundColor: 'white',
//             color: '#1a1a1a',
//             border: '1px solid var(--color-border)',
//             borderRadius: 'var(--radius-md)',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: 'var(--spacing-sm)',
//             opacity: loading ? 0.7 : 1
//           }}
//         >
//           <img 
//             src="https://developers.google.com/identity/images/g-logo.png" 
//             alt="Google" 
//             style={{ width: '20px', height: '20px' }}
//           />
//           Continue with Google
//         </button>

//         <div style={{ textAlign: 'center', marginTop: 'var(--spacing-md)' }}>
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             style={{
//               background: 'none',
//               border: 'none',
//               color: 'var(--color-primary)',
//               cursor: 'pointer',
//               textDecoration: 'underline'
//             }}
//           >
//             {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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

  return (
    <div className="login-container">
      <Navbar />
      
      <div className="login-content">
        <div className="login-card">
          <h2 className="login-title">
            {isLogin ? 'Welcome back!' : 'Create an account'}
          </h2>
          <p className="login-subtitle">
            {isLogin ? 'Sign in to continue' : 'Join us to get started'}
          </p>

          {error && (
            <div className="error-message">
              <FontAwesomeIcon icon={faCircleExclamation} className="error-icon" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon 
                    icon={showPassword ? faEye : faEyeSlash} 
                  />
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <FontAwesomeIcon 
                      icon={showConfirmPassword ? faEyeSlash : faEye} 
                    />
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? (
                <span className="button-loading">
                  <span className="spinner"></span>
                  Processing...
                </span>
              ) : (
                isLogin ? 'Login' : 'Create Account'
              )}
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="google-button"
          >
            <img 
              src="https://developers.google.com/identity/images/g-logo.png" 
              alt="Google" 
              className="google-icon"
            />
            Continue with Google
          </button>

          <div className="auth-switch">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="switch-button"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
      
      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--color-bg-primary);
        }
        
        .login-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-xl) var(--spacing-md);
        }
        
        .login-card {
          width: 100%;
          max-width: 440px;
          padding: var(--spacing-2xl);
          background-color: var(--color-bg-secondary);
          border-radius: var(--radius-xl);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          border: 1px solid var(--color-border);
        }
        
        .login-title {
          text-align: center;
          margin-bottom: var(--spacing-xs);
          color: var(--color-text-primary);
          font-size: 1.75rem;
          font-weight: 700;
        }
        
        .login-subtitle {
          text-align: center;
          margin-bottom: var(--spacing-xl);
          color: var(--color-text-secondary);
          font-size: 1rem;
        }
        
        .error-message {
          display: flex;
          align-items: center;
          padding: var(--spacing-md);
          background-color: #fef2f2;
          color: #dc2626;
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-lg);
          font-size: 0.9rem;
        }
        
        .error-icon {
          margin-right: var(--spacing-sm);
        }
        
        .login-form {
          display: grid;
          gap: var(--spacing-lg);
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
        }
        
        .input-group label {
          margin-bottom: var(--spacing-xs);
          font-weight: 500;
          color: var(--color-text-primary);
          font-size: 0.9rem;
        }
        
        .form-input {
          padding: var(--spacing-md);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background-color: var(--color-bg-primary);
          color: var(--color-text-primary);
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
        }
        
        .password-input-container {
          position: relative;
        }
        
        .password-toggle {
          position: absolute;
          right: var(--spacing-md);
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          padding: 0;
          color: var(--color-text-secondary);
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .login-button {
          padding: var(--spacing-md);
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: background-color 0.2s, transform 0.1s;
        }
        
        .login-button:hover:not(:disabled) {
          background-color: var(--color-primary-dark);
        }
        
        .login-button:active:not(:disabled) {
          transform: scale(0.98);
        }
        
        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .button-loading {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          margin-right: var(--spacing-sm);
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .divider {
          display: flex;
          align-items: center;
          margin: var(--spacing-xl) 0;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }
        
        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background-color: var(--color-border);
        }
        
        .divider span {
          padding: 0 var(--spacing-md);
        }
        
        .google-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          width: 100%;
          padding: var(--spacing-md);
          background-color: white;
          color: #1a1a1a;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          font-weight: 500;
          font-size: 1rem;
          transition: background-color 0.2s;
        }
        
        .google-button:hover:not(:disabled) {
          background-color: #f7f7f7;
        }
        
        .google-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .google-icon {
          width: 18px;
          height: 18px;
        }
        
        .auth-switch {
          text-align: center;
          margin-top: var(--spacing-xl);
          color: var(--color-text-secondary);
        }
        
        .switch-button {
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
          font-weight: 600;
          margin-left: var(--spacing-xs);
          padding: 0;
        }
        
        .switch-button:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 480px) {
          .login-card {
            padding: var(--spacing-xl) var(--spacing-lg);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;