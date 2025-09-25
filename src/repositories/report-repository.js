import sequelizeInstance from "../configurations/sequelize-instance.js";
import Pagination from "../helpers/pagination.js";
import { Op } from "sequelize";
import moment from "moment";
import {HistoryTindakanModel, PetugasTindakanModel} from "@adameds/model-sdk/rekam-medis";
import { RawatJalanModel } from "@adameds/model-sdk/pelayanan";
import { kunjunganReportInclude } from "./include/report-include.js";
import { cancelReportFilter, commonFilterReport } from "./filters/common-filter.js";
import { Context } from "../middlewares/context.js";
import { CTX_AUTHOR } from "../constants/context-constant.js";

export default class ReportRepository {
  static async getAllKunjungan(args) {
      const { faskesUuid } = Context.get(CTX_AUTHOR);
        try {
            const filter = commonFilterReport({ faskesUuid, args, options: { discharge_date: { [Op.between]: [args.start_date, args.end_date] } } });

            const options = {
            include: kunjunganReportInclude,
            attributes: ["uuid", "no_reg", "no_pelayanan", "tanggal_daftar", "discharge_date", "kondisi_pasien_pulang", "status_pulang"],
            };

            const transform = {
                practitioner: (row) => ({
                  uuid: undefined,
                  ...row.practitioner.pegawai.get(),
                }),
                polyclinic: (row) => ({
                  ...row.lokasi.get(),
                }),
                lokasi: (row) => undefined,
            };

            //* Tanpa Pagination
            if (args.all === "aktif") {
                const allData = await RawatJalanModel.findAll({
                  where: filter,
                  ...options,
                });

                const dataTransform = await Pagination.transform(allData, transform);

                return {
                  data: dataTransform,
                };
            }

            return await Pagination.init(RawatJalanModel, args, filter, options, transform);
        } catch (error) {
            console.log("Error on LogPelayananRepository");
            throw error;
        }
  }

  static async getCancelKunjungan(args) {
      const { faskesUuid } = Context.get(CTX_AUTHOR);
          try {
              const filter = cancelReportFilter({ faskesUuid, args, options: {} });

              const options = {
                  include: kunjunganReportInclude,
                  attributes: ["uuid", "tanggal_daftar", "no_reg", "no_pelayanan", "petugas", "alasan_batal", "deletedAt"],
              };

              const transform = {
                practitioner: (row) => ({
                  uuid: undefined,
                  ...row.practitioner.pegawai.get(),
                }),
                polyclinic: (row) => ({
                  ...row.lokasi.get(),
                }),
                lokasi: (row) => undefined,
              };

              //* Tanpa Pagination
              if (args.all === "aktif") {
                  const allData = await RawatJalanModel.findAll({
                    where: filter,
                    ...options,
                  });

                  const dataTransform = await Pagination.transform(allData, transform);

                  return {
                    data: dataTransform,
                  };
              }

              return await Pagination.init(RawatJalanModel, args, filter, options, transform);
          } catch (error) {
              console.log("Error on LogPelayananRepository");
              throw error;
          }
  }

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
