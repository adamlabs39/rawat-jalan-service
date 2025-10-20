import successResponse from "../responses/success-response.js";
import AntrianRawatJalanService from "../services/antrian_rj-service.js";

export default class AntrianRawatJalanController {
    static async updateStatus(req, res, nextFunction) {
        try {
            const result = await AntrianRawatJalanService.updateStatus(req.params.uuid, req.body);
            return res.status(200).json(successResponse(result.message));
        }catch(error){
            console.error("Error in controller:", error);
            nextFunction(error);
        }
    }

    static async getAntrian(req, res, nextFunction) {
        try {
            const result = await AntrianRawatJalanService.getAntrian(req.query);
            return res.status(200).json(successResponse("Data Antrian berhasil ditampilkan", result));
        } catch (error) {
            nextFunction(error);
        }
    }
}
