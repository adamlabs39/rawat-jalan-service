import express from "express";
import AntrianRawatJalanController from "../controllers/antrian_rj-controller.js";

const routes = express.Router();

routes.get(`/`, (req, res) => res.status(200).json({ message: "Hello World" }));

routes.put(`/rajal/:uuid`, AntrianRawatJalanController.updateStatus);
routes.get(`/rajal`, AntrianRawatJalanController.getAntrian);

export default routes;
