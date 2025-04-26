import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
    <div className="home-page">
        <h1>Welcome to the Student Management System</h1>
        <p>This application allows you to manage student records efficiently.</p>
        <div style={{ marginTop: '30px' }}>
        <Link to="/students" className="btn">View All Students</Link>
        <Link to="/students/add" className="btn btn-success">Add New Student</Link>
        </div>
    </div>
    );
};

export default Home;