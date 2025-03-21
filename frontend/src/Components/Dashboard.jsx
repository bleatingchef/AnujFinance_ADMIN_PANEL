import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent, Button } from "@mui/material";
import { FaHome, FaFolder, FaGavel } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const VisitorDashboard = () => {
  const [activeTab, setActiveTab] = useState("total_visitors");
  const [data, setData] = useState({
    total_visitors: [],
    booked_demo: [],
    transformed_users: [],
    faqs: []
  });
  
  const navigate = useNavigate();
  const url = "http://localhost:5002"; 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitorsRes, demoRes, usersRes, faqsRes] = await Promise.all([
          axios.get(`${url}/api/visitors/get-visitors`, { withCredentials: true }),
          axios.get(`${url}/api/bookdemo/get-demo`, { withCredentials: true }),
          axios.get(`${url}/api/transform/get-transform-visitors`, { withCredentials: true }),
          axios.get(`${url}/api/faqs/get-faqs`, { withCredentials: true })
        ]);

        setData({
          total_visitors: Array.isArray(visitorsRes.data) ? visitorsRes.data : [],
          booked_demo: Array.isArray(demoRes.data) ? demoRes.data : [],
          transformed_users: Array.isArray(usersRes.data) ? usersRes.data : [],
          faqs: Array.isArray(faqsRes.data) ? faqsRes.data : []
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);
  
  const icons = [FaHome, FaFolder, FiCalendar, FaGavel];
  const titles = ["Total Visitors", "Booked Demo", "Transformed Users", "FAQs"];
  
  const logout = async () => {
    try {
      await axios.get(`${url}/api/user/logout`, { withCredentials: true });
      navigate('/logout');
      navigate(0);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const deleteEndpoints = {
    total_visitors: "/api/visitors/delete-visitors/",
    booked_demo: "/api/bookdemo/delete-demo/",
    transformed_users: "/api/transform/delete-transform-visitors/",
    faqs: "/api/faqs/delete-faqs/"
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}${deleteEndpoints[activeTab]}${id}`, { withCredentials: true });
      setData((prevData) => ({
        ...prevData,
        [activeTab]: prevData[activeTab].filter((item) => item._id !== id)
      }));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-5xl text-center mb-10 text-pink-800">Visitor Management System</h1>
      <Link to="/profile" className="bg-pink-800 text-white rounded-box py-2 p-8 text-center">Profile</Link>
      <button className="text-white bg-pink-800 rounded-box py-2 p-8 text-center" onClick={logout}>Logout</button>
      
      {/* Statistics Section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {Object.keys(data).map((tab, index) => {
          const Icon = icons[index];
          const isActive = activeTab === tab;

          return (
            <Card
              key={tab}
              onClick={() => setActiveTab(tab)}
              sx={{
                backgroundColor: isActive ? "#9D174D" : "#FFFFFF", 
                color: isActive ? "#FFFFFF" : "#000000", 
                cursor: "pointer",
                transition: "all 0.3s",
                "&:hover": { boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" },
              }}
            >
              <CardContent className="flex flex-col items-center text-center">
                <h2 className="text-xl font-semibold flex items-center">
                  <Icon className="mr-2" /> {titles[index]}
                </h2>
                <p className="text-3xl font-bold">{data[tab]?.length || 0}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Table Section */}
      <div className="overflow-auto bg-white shadow-md rounded-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">S. No</TableCell>
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell className="font-semibold">Email</TableCell>
              <TableCell className="font-semibold">Phone</TableCell>
              <TableCell className="font-semibold">Comment</TableCell>
              <TableCell className="font-semibold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data[activeTab]) ? data[activeTab].map((item, index) => (
              <TableRow key={item._id} className="hover:bg-gray-100">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.comment}</TableCell>
                <TableCell>
                  <Button 
                    onClick={() => handleDelete(item._id)}
                    sx={{ backgroundColor: "#9D174D", color: "#FFFFFF", '&:hover': { backgroundColor: "#7B123A" } }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VisitorDashboard;
