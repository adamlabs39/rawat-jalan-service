import sequelizeInstance from "../configurations/sequelize-instance.js";
import moment from "moment";
import AdmissionRawatJalanModel from "../models/admission_rawat_jalan-model.js";
import PatientModel from "../models/patient-model.js";

export default class AntrianRawatJalanRepository {
  static async getAntrian(status = null) {
    if (!status) {
      status = 3;
    }
    return await AdmissionRawatJalanModel.findAll({
      where: {
        status_rj: status,
      },
      include: [
        {
          model: PatientModel,
          as: "patient", // Make sure the alias matches the one you defined in the association
          attributes: ["uuid", "name", "no_rm"], // Select the fields you need
        },
      ],
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
