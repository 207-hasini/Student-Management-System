import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('https://student-management-system-90c9.onrender.com/students');
            setStudents(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching students:', error);
            toast.error('Failed to fetch students');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`https://student-management-system-90c9.onrender.com/students/${id}`);
                setStudents(students.filter(student => student._id !== id));
                toast.success('Student deleted successfully');
            } catch (error) {
                console.error('Error deleting student:', error);
                toast.error('Failed to delete student');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 className="page-title">Student List</h2>
                <Link to="/students/add" className="btn btn-success">Add New Student</Link>
            </div>
            
            {students.length === 0 ? (
                <p>No students found. Please add some students.</p>
            ) : (
                <div className="card">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll Number</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Semester</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>{student.rollNumber}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.department}</td>
                                    <td>{student.semester}</td>
                                    <td>
                                        <Link to={`/students/edit/${student._id}`} className="btn">Edit</Link>
                                        <button onClick={() => handleDelete(student._id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StudentList;
