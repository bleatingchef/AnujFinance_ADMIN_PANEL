import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications

const Students = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState('');

    const studentsPerPage = 10;
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = data.slice(indexOfFirstStudent, indexOfLastStudent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent({ ...newStudent, [name]: value });
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/eligible/getEligibility`, { withCredentials: true });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchStudents();
    }, []);


    const handleDeleteStudent = (rollno) => {
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/form/deleteStudent`, {
            data: { pan }
        })
        .then(response => {
            // Remove the deleted student from the list
            setData(data.filter(student => student.pan !== pan));
            toast.success("Student deleted successfully");
        })
        .catch(error => {
            console.error("Error deleting student:", error);
            toast.error("Error deleting student");
        });
    };

    return (
        <div className='bg-'>
            <div className="text-center bg-gradient-to-r from-purple-800 to-blue-800 mx-auto pl-40 pt-8">
                <h1 className='inline-block text-blue-500 text-3xl md:text-7xl'>Booked Demo</h1>
            </div>
            <div className="flex bg-gradient-to-r from-purple-800 to-blue-800 justify-center items-center min-h-screen">
                <div className="container mx-auto p-10" style={{ marginLeft: '320px' }}>

                    {error && <p className="text-red-500">{error}</p>}
                    
                    <div className="overflow-x-auto outline outline-cyan-500 rounded-xl shadow-cyan-500 shadow-lg border">
                        <table className="min-w-full rounded-xl text-center">
                            <thead className="outline outline-cyan-500">
                                <tr className='text-cyan-500 text-lg'>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Mobile</th>
                                    <th className="px-6 py-4">Pan Number</th>
                                    <th className="px-6 py-4">Email</th>
                                    {/* <th className="px-6 py-4">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {currentStudents.map((student, index) => (
                                    <tr key={index} className="border border-cyan-500 text-white">
                                        <td className="px-6 py-4">{student.name}</td>
                                        <td className="px-6 py-4">{student.mobile}</td>
                                        <td className="px-6 py-4">{student.pan}</td>
                                        <td className="px-6 py-4">{student.email}</td>
                                        <td className="px-6 py-4 flex justify-center space-x-2">
                                       
                                            {/* <button 
                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700" 
                                                onClick={() => handleDeleteStudent(student.pan)}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between text-white items-center mt-4">
                        <span>Showing {indexOfFirstStudent + 1} to {indexOfLastStudent} of {data.length} entries</span>
                        <div className="flex space-x-2">
                            {[...Array(Math.ceil(data.length / studentsPerPage)).keys()].map(number => (
                                <button
                                    key={number + 1}
                                    onClick={() => paginate(number + 1)}
                                    className={`px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-cyan-500 text-black' : 'bg-cyan-300 text-black'}`}
                                >
                                    {number + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Students;
