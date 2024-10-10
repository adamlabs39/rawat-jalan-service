import { DataTypes, Model, Op } from "sequelize";
import sequelizeInstance from "../configurations/sequelize-instance.js";
import fieldTime from "./common/fieldTime-model.js";
import identifierModel from "./common/identifier-model.js";
export default class PatientModel extends Model {}
PatientModel.init(
  {
    ...identifierModel,
    satu_sehat_uuid: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    no_rm: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    identity: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    no_identity: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    birth_detail_uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    religion: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    address_uuid: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: "ID",
    },
    mother_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    maritial_status: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: false,
    },
    is_new_born: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    unggah_berkas: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    ...fieldTime,
  },
  {
    sequelize: sequelizeInstance,
    tableName: "patients",
    modelName: "PatientModel",
    underscored: true,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["no_rm", "faskes_uuid"],
      },
    ],
  }
);
