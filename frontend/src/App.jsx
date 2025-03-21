import React, { useEffect, useState } from 'react';
import Login from './Components/Login';
import Layout from './Components/Layout';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminProfile from './Components/AdminProfile';
import Dashboard from './Components/Dashboard';
import './index.css';
// import Cases from './Components/Cases';
// import Attorneys from './Components/Applications';
// import User from './Components/User';
import SignedUP from './Components/SignedUP';
// import AddStudentForm from './Components/AddStudentForm';

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios.get(`${url}/api/user/logincheck`, { withCredentials: true })
      .then(res => {
        setAuth(res.data);
      }).catch(() => {
        setAuth(false);
      });
  }, [auth]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/login' element={auth ? <Navigate to='/' /> : <Login />} />
        <Route path='/logout' element={<Login />} />
        <Route element={auth ? <Layout /> : <Navigate to='/login' />}>
          <Route path='/' element={<Dashboard/>} />
          {/* <Route path='/User' element={<User/>} /> */}
          <Route path='/profile' element={<AdminProfile/>}/>
          <Route path='/home' element={<Dashboard/>}/>
          {/* <Route path='/attorneys' element={<Attorneys/>}/> */}
          <Route path='/signup' element={<SignedUP/>}/>
          {/* <Route path='/appointments' element={<AddStudentForm/>}/> */}
          {/* <Route path='/cases' element={<Cases/>}/> */}

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
