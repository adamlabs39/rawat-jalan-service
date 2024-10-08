import sequelizeInstance from "../configurations/sequelize-instance.js";
import moment from "moment";
import AdmissionRawatJalanModel from "../models/admission_rawat_jalan-model.js";

export default class AntrianRawatJalanRepository {
  static async getAntrian(status = null) {
    console.log(status);
    if (!status) {
      status = 3;
    }
    return await AdmissionRawatJalanModel.findAll({
      where: {
        status_rj: status,
      },
    });
  }

  static async findRajalByUuid(uuid) {
    return await AdmissionRawatJalanModel.findOne({
      where: { uuid },
    });
  }

  static async updateStatusRajal(admissionRawatJalan, data) {
    return await sequelizeInstance.transaction(async (transaction) => {
      return await admissionRawatJalan.update(
        data,
        { updatedAt: moment().unix() },
        { transaction }
      );
    });
  }
}
