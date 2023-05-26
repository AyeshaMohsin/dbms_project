import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
const Dashboard = ({ setAuth }) => {

  const navigate = useNavigate();

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();
      
      parseRes === true ? setIsAuthenticated(true) :navigate("/");
      
     
      
    } catch (err) {
      console.error(err.message);
    }
  };
  

  useEffect(() => {
    checkAuthenticated();
  }, []);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return <h2>Dashboard</h2>;
};

export default Dashboard;
