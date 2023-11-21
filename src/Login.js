import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login () {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    
      const url = 'https://stg.dhunjam.in/account/admin/login';
      const requestBody = { username, password };

      const { data } = await axios.post(url, requestBody);

      const { status, response: responseMessage, data: responseData } = data;
      if (status === 200 && responseMessage === 'Success') {
        console.log('Login successful:', responseData);
        navigate('/dashboard', { state: { responseData } });
      } else {
        console.error('Login failed:', data);
      }
    
  };

  return (
    <div className=" bg-black text-white min-h-screen flex items-center justify-center">
      <div className="w-96">
        <h1 className="text-4xl font-semibold mb-6 text-center">Venue Admin Login</h1>
        
        <label className="block mb-4">
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full border border-white p-2 bg-black rounded-xl"
          />
        </label>
        
        <label className="block mb-4 bg-black">
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full  border border-white p-2 bg-black rounded-xl"
          />
        </label>
        
        <button
          onClick={handleLogin}
          className="w-full bg-purple-700 hover:border-purple-500 hover:bg-purple-500 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-200 text-white rounded-xl p-2"
        >
          Sign in
        </button>
        <h3 className=' text-center pt-4'>New Registration?</h3>
      </div>
    </div>
  );
};

export default Login;
