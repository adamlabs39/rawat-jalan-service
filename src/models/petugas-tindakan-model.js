import { DataTypes, Model } from "sequelize";
import identifierModel from "./common/identifier-model.js";
import fieldTime from "./base-model.js";
import sequelizeInstance from "../configurations/sequelize-instance.js";

export default class PetugasTindakanModel extends Model {}
PetugasTindakanModel.init(
  {
    ...identifierModel,
    history_tindakan_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    practitioner_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ...fieldTime,
  },
  {
    sequelize: sequelizeInstance,
    tableName: "petugas_tindakans",
    className: "PetugasTindakans",
    underscored: true,
    timestamps: false,
    indexes: [
      {
        fields: ["faskes_uuid"],
      },
    ],
  }
);
