import React, { useState, useEffect } from 'react';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Invalid username or password');
      }
    })
    .then(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.id);
      window.location.href = '/profile';
    })
    .catch(error => {
      setError(error.message);
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    fetch(`https://dummyjson.com/users/${userId}`)
    .then(res => res.json())
    .then(data => {
      setUser(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  return (
    <div id="main">
      <h2>Profile</h2>
      {user &&
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
        </div>
      }
    </div>
  );
}

function App() {
  return (
    <div>
      <Login />
      {localStorage.getItem('token') && <Profile />}
    </div>
  );
}

export default App;
