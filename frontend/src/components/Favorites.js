import axios from "axios";
import React, { useEffect, useState } from "react";
import Global from "./Global";
import { Link } from "react-router-dom";
import { MdUpdate } from "react-icons/md";
import {AiFillDelete} from "react-icons/ai";

export default function Repositories() {
  const token = localStorage.getItem("token");
  const login = localStorage.getItem("login")
  const username = localStorage.getItem("username")
  const [repositories, setRepositories] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!login) window.location.href = "/";
  });
  

  useEffect(() => {
    async function getRepositories() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          Global.baseUrl + `/favorite/${token}/${username}`
        );
        setRepositories(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getRepositories();
  }, [token, username]);

  const deleteFavorite = async (autor, repository) => {
    try {
      await axios.get(
        Global.baseUrl + `/favorite/${token}/${autor}/${repository}`
      );
      window.location.replace("");
      
    } catch (err) {
      console.log(err);
    }
  };

  function logOut() {
    localStorage.removeItem('login');
}

  return (
    <>
      {isLoading ? (
        <h3>Cargando...</h3>
      ) : (
        <>
         
          {repositories.length > 0 ? (
            <div>
              <img
                src={repositories[0].owner.avatar_url}
                alt="owner"
                className="avatar"
              />
              <span className="name">{repositories[0].owner.login}</span>
              <Link to="/" onClick={logOut} className="logout">
                {" "}
                Log Out
              </Link>
              <div className="repositories-container">
                {repositories.map((repository) => {
                  return (
                    <div className="repository-container" key={repository.id}>
                      <h3>
                        {repository.name} <span>{repository.visibility}</span>
                      </h3>
                      <p>{repository.description}</p>
                      <div>
                        <MdUpdate /> Last Update:
                      </div>
                      <span>
                        {new Date(repository.updated_at).toLocaleString()}
                      </span>
                      <div>
                      <button
                          className="btn btn-dark"
                          onClick={() =>
                            deleteFavorite(repository.owner.login, repository.name)
                          }
                        >
                          <AiFillDelete style={{ marginBottom: "3px" }} /> Delete favorite
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>No favorites repositories or reload page!</div>
          )}
        </>
      )}
    </>
  );
}
