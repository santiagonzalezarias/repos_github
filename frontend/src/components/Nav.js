import React from "react";
import Logo from "../img/logo-build.png";
import { FaGithub, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <img src={Logo} alt="HelloBuild!" />

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to='/repositories' className="nav-link active" aria-current="page" >
                  <FaGithub /> Repos
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/favorites' className="nav-link">
                  <FaStar /> Fav
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
