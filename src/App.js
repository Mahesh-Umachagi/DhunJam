import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
  return (
   <Routes>
   <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/" element={<Login />} />
   </Routes>
  );
}

export default App;
