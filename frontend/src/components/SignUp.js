import React from "react";
import { useForm } from "react-hook-form";
import {FaUserPlus} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const user = JSON.stringify(data);
    localStorage.setItem('user', user)
    navigate("/")
    
  };

  return (
    <div className="container-main">
      <div className="container-login">
        <h2 className='mb-3'><FaUserPlus /> Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username:</label>
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
            <label className="form-label">Password:</label>
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

          <input
            type="submit"
            value="Sign Up"
            className="btn btn-primary form-control mb-3"
          />
        </form>
      </div>
    </div>
  );
}
