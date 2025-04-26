import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [studentData, setStudentData] = useState({
        name: '',
        rollNumber: '',
        email: '',
        phone: '',
        department: '',
        semester: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudent();
    }, []);

    const fetchStudent = async () => {
        try {
            const response = await axios.get(`https://student-management-system-90c9.onrender.com/students/${id}`);
            setStudentData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching student:', error);
            toast.error('Failed to fetch student details');
            navigate('/students');
        }
    };

    const handleChange = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!studentData.name.trim()) newErrors.name = 'Name is required';
        if (!studentData.rollNumber.trim()) newErrors.rollNumber = 'Roll Number is required';
        if (!studentData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(studentData.email)) {
            newErrors.email = 'Email format is invalid';
        }
        if (!studentData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(studentData.phone)) {
            newErrors.phone = 'Phone must be a 10-digit number';
        }
        if (!studentData.department.trim()) newErrors.department = 'Department is required';
        if (!studentData.semester) {
            newErrors.semester = 'Semester is required';
        } else if (studentData.semester < 1 || studentData.semester > 8) {
            newErrors.semester = 'Semester must be between 1 and 8';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const payload = {
                    name: studentData.name.trim(),
                    rollNumber: studentData.rollNumber.trim(),
                    email: studentData.email.trim(),
                    phone: studentData.phone.trim(),
                    department: studentData.department.trim(),
                    semester: parseInt(studentData.semester, 10)
                };

                await axios.put(`https://student-management-system-90c9.onrender.com/students/${id}`, payload);

                toast.success('Student updated successfully!');
                navigate('/students');
            } catch (error) {
                console.error('Error updating student:', error);
                if (error.response?.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('Failed to update student');
                }
            }
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container">
            <h2 className="page-title">Edit Student</h2>
            <div className="card p-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={studentData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="rollNumber">Roll Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="rollNumber"
                            name="rollNumber"
                            value={studentData.rollNumber}
                            onChange={handleChange}
                        />
                        {errors.rollNumber && <div style={{ color: 'red' }}>{errors.rollNumber}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={studentData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={studentData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="department">Department</label>
                        <input
                            type="text"
                            className="form-control"
                            id="department"
                            name="department"
                            value={studentData.department}
                            onChange={handleChange}
                        />
                        {errors.department && <div style={{ color: 'red' }}>{errors.department}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="semester">Semester</label>
                        <input
                            type="number"
                            className="form-control"
                            id="semester"
                            name="semester"
                            min="1"
                            max="8"
                            value={studentData.semester}
                            onChange={handleChange}
                        />
                        {errors.semester && <div style={{ color: 'red' }}>{errors.semester}</div>}
                    </div>

                    <button type="submit" className="btn btn-success w-100">
                        Update Student
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditStudent;
