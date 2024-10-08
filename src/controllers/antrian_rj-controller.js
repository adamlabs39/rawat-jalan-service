import AntrianRawatJalanService from "../services/antrian_rj-service.js";

export default class AntrianRawatJalanController {
  static async updateStatus(req, res, nextFunction) {
    try {
      const result = await AntrianRawatJalanService.updateAntrian(
        req.params.uuid,
        req.body
      );
      res.status(201).json(result);
    } catch (error) {
      nextFunction(error);
    }
  }

  static async getAntrian(req, res, nextFunction) {
    try {
      const status = req.query.status;

      const result = await AntrianRawatJalanService.getAntrian(status);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      nextFunction(error);
    }
  }
}
