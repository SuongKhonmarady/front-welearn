import { useEffect, useState } from 'react';
import { getUser } from '../context/user/UserAction';

const AuthDebug = () => {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      // Check localStorage
      const authToken = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      const isAdmin = localStorage.getItem('is_admin');
      const tokenType = localStorage.getItem('token_type');

      // Check API
      let apiUser = null;
      try {
        apiUser = await getUser();
      } catch (error) {
        console.error('API Error:', error);
      }

      setDebugInfo({
        localStorage: {
          authToken: authToken ? `${authToken.substring(0, 20)}...` : null,
          userData: userData ? JSON.parse(userData) : null,
          isAdmin,
          tokenType
        },
        apiUser,
        timestamp: new Date().toISOString()
      });
    };

    checkAuth();
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('token_type');
    window.location.reload();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>Authentication Debug Info</h2>
      <button onClick={clearAuth} style={{ marginBottom: '20px', padding: '10px', backgroundColor: 'red', color: 'white' }}>
        Clear Auth & Reload
      </button>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
};

export default AuthDebug;
