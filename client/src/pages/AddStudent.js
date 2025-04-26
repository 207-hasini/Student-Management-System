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
                await axios.post('http://localhost:5000/students', studentData);
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
                    
                    <div className="form-group">
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
                    
                    <div className="form-group">
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
                    
                    <div className="form-group">
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
                    
                    <div className="form-group">
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
                    
                    <div>
                        <button type="submit" className="btn btn-success">Add Student</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;