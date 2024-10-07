import express from "express";

const apiBase = process.env.API_BASE || "api";
const apiVersion = process.env.API_VERSION || "v1";
const baseUrl = `/${apiBase}/${apiVersion}/igd`;

const routes = express.Router();

routes.get(`${baseUrl}/`, (req, res) =>
  res.status(200).json({ message: "Hello World" })
);

export default routes;
