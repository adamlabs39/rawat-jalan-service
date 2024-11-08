import sequelizeInstance from "../configurations/sequelize-instance.js";
import Pagination from "../helpers/pagination.js";
import { Op } from "sequelize";
import moment from "moment";
import {HistoryTindakanModel, PetugasTindakanModel} from "@adameds/model-sdk/rekam-medis";

export default class ReportRepository {
  static async getTindakans(args) {
    return sequelizeInstance.transaction(async (tr) => {
      const currentYear = moment().year();
      const currentMonth = moment().month() + 1;
      const startOfMonth = moment()
        .year(currentYear)
        .month((args.month ?? currentMonth) - 1)
        .startOf("month")
        .valueOf();
      const endOfMonth = moment()
        .year(currentYear)
        .month((args.month ?? currentMonth) - 1)
        .endOf("month")
        .valueOf();

      let filter = {
        nama_tindakan: { [Op.like]: `%${args.name || ""}%` },
        created_at: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        pelayanan: { [Op.like]: `%${args.pelayanan || ""}%` },
        faskes_uuid: args.faskes_uuid,
      };

      if (args.lokasi_uuid) {
        filter.lokasi_uuid = args.lokasi_uuid; // Direct equality check
      }

      const option = {
        where: {
          ...filter,
        },
        include: [
          {
            model: PetugasTindakanModel,
            as: "petugas_tindakan",
            attributes: ["practitioner_uuid"],
            required: true,
            where: {
              practitioner_uuid: args.practitioner_uuid || null, // Direct equality check
            },
          },
        ],
      };

      return await Pagination.init(HistoryTindakanModel, args, option);
    });
  }
}
