import axios from "axios";
import React, { useEffect, useState } from "react";
import Global from "./Global";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";

export default function Repositories() {
  const token = localStorage.getItem("token");
  const login = localStorage.getItem("login");
  const [repositories, setRepositories] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (!login) window.location.href = "/";
  });

  useEffect(() => {
    async function getRepositories() {
      try {
        setIsLoading(true);
        await delay(500)
        const response = await axios.get(
          Global.baseUrl + `/repositories/${token}`
        );
        setRepositories(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getRepositories();
  }, [token]);

  const delay = (millis) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, millis);
  });

  const addFavorite = async (autor, repository) => {
    try {
      await axios.put(
        Global.baseUrl + `/favorite/${token}/${autor}/${repository}`
      );
      setAlert(true)
      await delay(4000)
      setAlert(false)
    } catch (err) {
      console.log(err);
    }
  };

  function logOut() {
    localStorage.removeItem("login");
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
              <span className="name">
                {repositories[0].owner.login}{" "}
                {localStorage.setItem("username", repositories[0].owner.login)}
              </span>
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
                            addFavorite(repository.owner.login, repository.name)
                          }
                        >
                          <FaStar style={{ marginBottom: "3px" }} /> Add to
                          favorite
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>No repository or reload page!</div>
          )}

          {alert &&
          (
            <div class="alert alert-success" role="alert">
              Add to favorites!
            </div>
          )}
        </>
      )}
    </>
  );
}
