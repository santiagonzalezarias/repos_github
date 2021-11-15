"use strict";

const axios = require("axios");

const controller = {
  getToken: async function (req, res) {
    const data = req.query;
    try {
      const response = await axios.post(
        "https://github.com/login/oauth/access_token/",
        data,
        { headers: { Accept: "application/json" } }
      );
      return res.status(200).send(response.data);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  },

  getRepositories: async function (req, res) {
    const token = req.params.token;
    try {
      const response = await axios.get("https://api.github.com/user/repos", {
        headers: { Authorization: `token ${token}` },
      });
      return res.status(200).send(response.data);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  },

  addFavorite: async function (req, res) {
    const token = req.params.token;
    const autor = req.params.autor;
    const repository = req.params.repository;
    try {
      await axios.put(
        `https://api.github.com/user/starred/${autor}/${repository}`, {},
        {
          headers: {
            Authorization: `token ${token}`,
            "Content-Length": 0,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      return res.status(200).send({ message: "ok" });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  },

  deleteFavorite: async function (req, res) {
    const token = req.params.token;
    const autor = req.params.autor;
    const repository = req.params.repository;
    try {
      await axios.delete(
        `https://api.github.com/user/starred/${autor}/${repository}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      return res.status(200).send({ message: "ok" });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  },

  getRepositoiresFav: async function (req, res) {
    const user = req.params.user;
    const token = req.params.token;
    try {
      const response = await axios.get(
        `https://api.github.com/users/${user}/starred`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      return res.status(200).send(response.data);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  },
};

module.exports = controller;
