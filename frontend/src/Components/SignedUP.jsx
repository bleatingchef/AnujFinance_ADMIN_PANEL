import axios from 'axios';
import React, { useState, useEffect } from 'react';

const SignedUP = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from API
  
  useEffect(() => {
    const fetchSignUp = async ()=>{
        try {
            const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/signup/getsignup`, {withCredentials:true})
            setData(response.data);
        } catch (error) {
            console.error("Error Fetching data",error);            
        }

    }
    fetchSignUp();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pl-52 bg-gradient-to-r from-purple-800 to-blue-800">
      <h1 className="text-5xl text-center text-blue-200 mb-8">Transformed</h1>
      <div className="overflow-x-auto rounded-xl " style={{width:"1200px"}}>
        {loading ? (
          <div className="text-blue-200 text-center">Loading...</div>
        ) : (
          <table className="table-auto w-full border-4 border-cyan-500 rounded-2xl">
            <thead className="text-cyan-500 text-xl rounded-xl">
              <tr>
                {/* <th className="px-4 py-2 border-b border-blue-400">Name</th> */}
                {/* <th className="px-4 py-2 border-b border-blue-400">Mobile</th> */}
                {/* <th className="px-4 py-2 border-b border-blue-400">Pan Number</th> */}
                <th className="px-4 py-2 border-b border-blue-400">Username</th>
                <th className="px-4 py-2 border-b border-blue-400">Email</th>
                <th className="px-4 py-2 border-b border-blue-400">Password</th>
              </tr>
            </thead>
            <tbody className="text-white text-center">
              {data.map((item, index) => (
                <tr key={index} className=" border-blue-400">
                  {/* <td className="px-4 py-2">{item.name}</td> */}
                  {/* <td className="px-4 py-2">{item.mobile}</td> */}
                  {/* <td className="px-4 py-2">{item.pan}</td> */}
                  <td className="px-4 py-2">{item.username}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.password}</td>  {/* Hide password */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && <div className="text-white text-end mt-4">Showing {data.length} of {data.length} entries</div>}
      </div>
    </div>
  );
};

export default SignedUP;
