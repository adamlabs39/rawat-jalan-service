import sequelizeInstance from "../configurations/sequelize-instance.js";
import moment from "moment";
import {RawatJalanModel} from "@adameds/model-sdk/pelayanan";
import {PatientModel} from "@adameds/model-sdk/admisi";
import dayjs from "dayjs";
import { getAllAntrianCall } from "../configurations/axios-instance.js";

export default class AntrianRawatJalanRepository {
//   static async getAntrian(status = null) {
//     if (!status) {
//       status = 3;
//     }
//     return await RawatJalanModel.findAll({
//       where: {
//         status_rj: status,
//       },
//       include: [
//         {
//           model: PatientModel,
//           as: "patient", // Make sure the alias matches the one you defined in the association
//           attributes: ["uuid", "name", "no_rm"], // Select the fields you need
//         },
//       ],
//     });
//   }

    static async getAntrian(args){
        try {
            const result = await getAllAntrianCall.get("/all", { params: args });
            
            const startOfDay = dayjs().startOf("day").format("YYYY-MM-DD");

            const antrian = result.data.payload.filter((item) => item.pelayanan == "poli" && dayjs.unix(item.patient_data.jadwal_periksa).format("YYYY-MM-DD") >= startOfDay && dayjs.unix(item.patient_data.jadwal_periksa).format("YYYY-MM-DD") <= startOfDay).sort((a, b) => a.patient_data.antrian.no_antrian_poli - b.patient_data.antrian.no_antrian_poli);

            return antrian;

        } catch (error) {
            console.error("Error fetching all antrian:", error);
            throw error;
        }
    }

    static async findRajalByUuid(uuid) {
        return await RawatJalanModel.findOne({
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
