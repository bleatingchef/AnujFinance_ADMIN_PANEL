import React, { useState } from 'react';
import logo from '../assets/logo.png';
import bg from '../assets/loginhero.jpg';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const idata = {
    email: "",
    password: ""
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const [form, setForm] = useState(idata);

  const userLogin = async () => {
    const { email, password } = form;
    if (!email || !password) {
      return toast.error("Fill all the fields");
    }

    try {
      const res = await axios.post(`${url}/api/user/login`, {
        email,
        password
      }, {
        withCredentials: true
      });
      navigate('/');
      navigate(0)
      toast.success("You have logged in successfully");
      console.log(res.data);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {/* <ToastContainer/> */}
      <div className="min-h-screen flex items-center justify-end pr-48 md:justify-end md:pl-80 relative bg-cover bg-center bg-opacity-80" style={{ backgroundImage: `url(${bg})` }}>
        <div className="bg-gray-300 p-8 md:p-20 bg-opacity-70 rounded-3xl border-2 border-pink-800 shadow-2xl shadow-slate-950 max-w-md w-full z-10 relative">
          <img src={logo} className='pb-8 mx-auto' alt="" style={{ width: '150px', height: 'auto' }} />
          <form>
            <div className="mb-4">
              <label className="block text-pink-800 text-sm font-bold mb-2" htmlFor="email">
              </label>
              <input
                className="shadow appearance-none border-2 border-black bg-gray-200 rounded-3xl w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                value={form.email}
                onChange={handleChange}
                name='email'
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-yellow-100 text-sm font-bold mt-10 mb-2" htmlFor="password">
              </label>
              <input
                className="shadow appearance-none border-2 border-black bg-gray-300 rounded-3xl w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                value={form.password}
                onChange={handleChange}
                name='password'
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-pink-800 hover:bg-white text-white hover:text-slate-950 mx-auto mb-5 font-bold py-2 px-10 rounded-3xl focus:outline-none focus:shadow-outline"
                type="button"
                onClick={userLogin}
              >
                Sign In
              </button>
            </div>
            <a
              className="block text-center font-bold text-sm text-pink-800"
              href="#"
            >
              Forgot Password?
            </a>
          </form>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
    </>
  );
};

export default Login;
