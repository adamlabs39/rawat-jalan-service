import { DataTypes, Model } from "sequelize";
import identifierModel from "./common/identifier-model.js";
import sequelizeInstance from "../configurations/sequelize-instance.js";
import fieldTime from "./base-model.js";
import PetugasTindakanModel from "./petugas-tindakan-model.js";

export default class HistoryTindakanModel extends Model {}
HistoryTindakanModel.init(
  {
    ...identifierModel,
    tarif_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    nama_tindakan: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    harga_tindakan: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    qty_tindakan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lokasi_uuid: {
      type: DataTypes.UUID,
    },
    pelayanan: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ...fieldTime,
  },
  {
    sequelize: sequelizeInstance,
    tableName: "history_tindakans",
    className: "HistoryTindakans",
    underscored: true,
    timestamps: false,
    indexes: [
      {
        fields: ["faskes_uuid"],
      },
    ],
  }
);

HistoryTindakanModel.hasMany(PetugasTindakanModel, {
  sourceKey: "uuid",
  foreignKey: "history_tindakan_uuid",
  as: "petugas_tindakan",
});
