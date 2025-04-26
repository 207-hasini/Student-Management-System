import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const BASE_URL = 'https://student-management-system-90c9.onrender.com';

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/students`);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
            toast.error('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this student?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`${BASE_URL}/students/${id}`);
            setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
            toast.success('Student deleted successfully!');
        } catch (error) {
            console.error('Error deleting student:', error);
            toast.error('Failed to delete student');
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="page-title">Student List</h2>
                <Link to="/students/add" className="btn btn-success">Add New Student</Link>
            </div>

            {students.length === 0 ? (
                <div className="alert alert-info">No students found. Please add some students.</div>
            ) : (
                <div className="card p-3">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="thead-dark">
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
                                {students.map((student) => (
                                    <tr key={student._id}>
                                        <td>{student.name}</td>
                                        <td>{student.rollNumber}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.department}</td>
                                        <td>{student.semester}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Link to={`/students/edit/${student._id}`} className="btn btn-primary btn-sm">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(student._id)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentList;
