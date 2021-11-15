import React, {useState} from "react";
import Logo from "../img/logo-build.png";
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom';
import {FaUserAlt, FaKey} from 'react-icons/fa';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const userRegister = JSON.parse(localStorage.getItem('user'));
  const [incorrectUser, setIncorrectUser] = useState(false);
  
  const onSubmit = async (data) => {
    if(userRegister){
      if(data.username === userRegister.username && data.password === userRegister.password){
        localStorage.setItem('login', true)
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=fff90d45d5140b7a17ec&redirect_uri=http://localhost:3000/home&scope=repo'
    }   
    else
      setIncorrectUser(true);
    } else setIncorrectUser(true);
    
        

    
    

  };

  return (
    <div className="container-main">
      <div className="container-login">
        <img src={Logo} alt="HelloBuild!" className="mb-3" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label"><FaUserAlt /> Username:</label>
            <input
              type="text"
              className="form-control"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label"><FaKey /> Password:</label>
            <input
              type="password"
              className="form-control"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
          </div>

          {incorrectUser && 
          <div className='mb-2 text-danger'><span>Wrong username or password!</span></div>
          }
          
          <input
            type="submit"
            value="Sign In"
            className="btn btn-primary form-control mb-3"
          />
          <div>
            <div>Don't have an account?</div>
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
