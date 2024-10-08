import { DataTypes, Model } from "sequelize";
import fieldTime from "./common/fieldTime-model.js";
import identifierModel from "./common/identifier-model.js";
import sequelizeInstance from "../configurations/sequelize-instance.js";

export default class AdmissionRawatJalanModel extends Model {}
AdmissionRawatJalanModel.init(
  {
    ...identifierModel,
    paymentMethod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    no_reg: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    patient_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    no_antrian_admisi: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    no_antrian_poli: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    no_rm: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    birth_detail_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    tanggal_daftar: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tanggal_periksa: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    practitioner_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    maternity: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    complaint: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    lokasi_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tanggal_checkin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    platform: {
      type: DataTypes.STRING(255),
      unique: false,
      allowNull: true,
    },

    kode_booking: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    alasan_batal: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status_rj: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    edukasi: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    edukasi_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    prognosis: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    rencana_tindak_lanjut: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    rencana_tindak_lanjut_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    kondisi_pasien_pulang: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    kondisi_keluar_lainnya: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status_pulang: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status_pulang_keterangan: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tujuan_rujuk: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tujuan_rujuk_lainnya: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    // instruksiDate: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
    instruksi_no_darurat: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    transport_rujuk: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    transport_rujuk_lainnya: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_internal: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    rujuk_internal: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    rujuk_eksternal: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    instruksi_tindak_lanjut: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    discharge_date: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    petugas: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    rekam_medis_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    lab_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    farmasi_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    jadwal_periksa: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    jadwal_dokter_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    no_referensi: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    no_pelayanan: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ...fieldTime,
  },
  {
    sequelize: sequelizeInstance,
    modelName: "AdmissionRawatJalan",
    tableName: "admission_rawat_jalans",
    underscored: true,
    timestamps: false,
  }
);
