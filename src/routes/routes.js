import express from "express";
// import AntrianRawatJalanController from "../controllers/antrian_rj-controller.js";
import authorizationMiddleware from "../middlewares/authorization-middleware.js";
import ReportController from "../controllers/report-controller.js";

const routes = express.Router();

routes.use(authorizationMiddleware);

routes.get(`/`, (req, res) => res.status(200).json({ message: "Hello World" }));

// routes.put(`/rajal/:uuid`, AntrianRawatJalanController.updateStatus);
// routes.get(`/rajal`, AntrianRawatJalanController.getAntrian);
// routes.get(`/rajal/laporan_tindakan`, ReportController.getTindakans);

//* Reports
routes.get('/rajal/report/kunjungan', ReportController.getAllKunjungan);
routes.get("/rajal/report/batal-kunjungan", ReportController.getCancelKunjungan);

export default routes;
