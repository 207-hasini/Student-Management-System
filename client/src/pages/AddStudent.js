import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddStudent = () => {
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
            newErrors.email = 'Email is invalid';
        }
        if (!studentData.phone.trim()) newErrors.phone = 'Phone is required';
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
                await axios.post('https://student-management-system-90c9.onrender.com/students', studentData);
                toast.success('Student added successfully');
                navigate('/students');
            } catch (error) {
                console.error('Error adding student:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('Failed to add student');
                }
            }
        }
    };

    return (
        <div>
            <h2 className="page-title">Add New Student</h2>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
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

                    <div className="form-group">
                        <label htmlFor="rollNumber">Roll
