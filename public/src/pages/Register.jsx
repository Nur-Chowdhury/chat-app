import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

function Register() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "", 
  });

  useEffect(() => {
    if(localStorage.getItem("app-user")){
      navigate("/chat");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      const {password, confirmPassword, name, username, email} = values;
      const {data} = await axios.post(registerRoute, {
        name, 
        username, 
        email, 
        password,
      });
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true){
        localStorage.setItem("app-user", JSON.stringify(data.user));
        navigate("/chat");
      }
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const {password, confirmPassword, name, username, email} = values;
    if(password != confirmPassword){
      toast.error("Passwords Doesn't match.", toastOptions);
      return false;
    }
    else if (password.length<8){
      toast.error("Password should be atleast 8 characters.", toastOptions);
      return false;
    }
    return true;
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };
  

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img src={Logo} alt='logo' />
            <h1>fChat</h1>
          </div>
          <input type='text' placeholder='Name' name='name' onChange={(e) => handleChange(e)} />
          <input type='text' placeholder='UserName' name='username' onChange={(e) => handleChange(e)} />
          <input type='email' placeholder='Email' name='email' onChange={(e) => handleChange(e)} />
          <input type='password' placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
          <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={(e) => handleChange(e)} />
          <button type='submit'>Create User</button>
          <span>
            Already an User? <Link to={"/login"}>Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content:center;
    gap: 1rem;
    align-items: center;
    background-color: #B0E1FA;
    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      img {
        height: 5rem;
      }
      h1{
        color: black;
      }
    }
    form{
      display: flex;
      flex-direction: column;
      gap: 2rem;
      background-color: #468EF6;
      border-radius: 2rem;
      padding: 3rem 5rem;
      input {
        background-color: transparent;
        padding: 1rem;
        border; 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: black;
        width: 100%;
        font-size: 1rem;
        &:focus {
          border: 0.1rem solid #997af0;
          outline: none;
        }
      }
      button {
        backgrounf-color: #997af0;
        color: black;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        transition: 0.5s ease-in-out;
        &:hover {
          background-color: #4e0eff;
        }
      }
      span {
        color: black;
        text-transform: uppercase;
        a {
          color: #4e0eff;
          text-decoration: none;
          font-weight: bold;
        }
      }
    }
  `;

export default Register
