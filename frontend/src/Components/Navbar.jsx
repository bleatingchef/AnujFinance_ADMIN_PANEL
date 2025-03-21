import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from "../assets/logo.png";
import { FiUsers, FiGift, FiMenu, FiX, FiCalendar } from 'react-icons/fi';
import { FaFolder, FaUserAlt, FaGavel, FaHome } from 'react-icons/fa'; // Importing new icons

const Navbar = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [casesDropdownOpen, setCasesDropdownOpen] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get(`${url}/api/user/logout`, {
        withCredentials: true,
      });
      navigate('/logout');
      navigate(0);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const navigateToUser = () => {
    navigate('/user');
  };

  const navigateToMembership = () => {
    navigate('/attorneys');
  };

  const navigateToAppointments = () => {
    navigate('/signup');
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const toggleCasesDropdown = () => {
    setCasesDropdownOpen(!casesDropdownOpen);
  };

  return (
    <div className=" ">
      {/* Fixed Sidebar */}
      <div className={`fixed   rounded-r inset-y-0 left-0  z-40 p-4 bg-opacity-90 transition-all duration-300 transform ${sidebarExpanded ? 'translate-x-0 w-80' : 'translate-x-[0%] w-32'}`}>
        <div className="flex flex-col items-center">
          <button
            className="btn btn-ghost self-center mb-4"
            onClick={toggleSidebar}
          >
            {sidebarExpanded ? <FiX className="h-6 w-6 text-white" /> : <FiMenu className="h-6 w-6 text-white" />}
          </button>
          <div className={`flex justify-center w-full mb-6 transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <Link to="/">
              <img src={logo} alt="Logo" className="h-24 w-36 shadow-yellow-500" />
            </Link>
          </div>
          <div className="h-20 w-20 rounded-full outline outline-cyan-500 shadow shadow-xl shadow-cyan-500 mb-4">
            <img
              alt="User Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              className="h-20 w-20 rounded-full"
            />
          </div>
          <div className={`flex flex-col items-center ${sidebarExpanded ? 'w-full' : 'w-0'} transition-all duration-300 overflow-hidden`}>
            <Link to="/profile" className="hover:bg-cyan-500 hover:text-black text-white rounded-box py-2 w-full text-center">
              Profile
            </Link>
            <button className="hover:bg-cyan-500 hover:text-black text-white rounded-box py-2 w-full text-center" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <ul className='pt-10 space-y-4 flex flex-col items-center'>
          {/* Dashboard */}
          <li className="flex items-center pl-2 rounded-xl hover:shadow-lg hover:shadow-cyan-500 py-3 cursor-pointer" onClick={() => { navigate('/home'); toggleSidebar(); }}>
            <FaHome className="h-6 w-6 mr-2 text-white" />
            {sidebarExpanded && <span className='text-white'>Dashboard</span>}
          </li>

          {/* Eligibility */}
          <li className="flex items-center pl-2 rounded-xl hover:shadow-lg hover:shadow-cyan-500 py-3 cursor-pointer" onClick={() => { navigate('/cases'); toggleSidebar(); }}>
            <FaFolder className="h-6 w-6 mr-2 text-white" />
            {sidebarExpanded && <span className='text-white'>Booked Demo</span>}
          </li>

          {/* Signed Up Users */}
          <li className="flex items-center pl-2 rounded-xl hover:shadow-lg hover:shadow-cyan-500 py-3 cursor-pointer" onClick={() => { navigateToAppointments(); toggleSidebar(); }}>
            <FiCalendar className="h-6 w-6 mr-2 text-white" />
            {sidebarExpanded && <span className='text-white'>Transformed</span>}
          </li>

          {/* Loan Application */}
          <li className="flex items-center pl-2 rounded-xl hover:shadow-lg hover:shadow-cyan-500 py-3 cursor-pointer " onClick={() => { navigateToMembership(); toggleSidebar(); }}>
            <FaGavel className="h-6 w-6 mr-2 text-white" />
            {sidebarExpanded && <span className='text-white'>Faqs</span>}
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
