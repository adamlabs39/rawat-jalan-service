import { Op } from "sequelize";
import sequelizeInstance from "../configurations/sequelize-instance.js";
import UserModel from "./user-model.js";
import AdmissionRawatJalanModel from "./admission_rawat_jalan-model.js";
import bcrypt from "bcrypt";
import PatientModel from "./patient-model.js";

export default async function syncDB() {
  try {
    await sequelizeInstance.authenticate();

    const models = [UserModel, AdmissionRawatJalanModel, PatientModel];

    for (const model of models) {
      await model.sync();
    }

    // await sequelizeInstance.transaction(async (tr) => {
    //   await UserModel.findOrCreate({
    //     transaction: tr,
    //     where: {
    //       [Op.and]: [
    //         {
    //           email: "habib@gmail.com",
    //           username: "habib-dev",
    //         },
    //       ],
    //     },
    //     defaults: {
    //       faskes_uuid: "01916de0-795c-7450-a68f-17f8bc5642fc",
    //       role_uuid: "9d403ufjh43ufh3uf8430ihf",
    //       // dokter_uuid: "coijr0i3nh0uc30hfjij3ci",
    //       name: "habib",
    //       phone: "0811341082934",
    //       email: "habib@gmail.com",
    //       username: "habib-dev",
    //       password: await bcrypt.hash("secreet_pass", 10),
    //       inventory_medis: true,
    //       inventory_non_medis: true,
    //       token:
    //         "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTFmNWZlLWE3NWItN2RkNC1iNDhlLTJlYWZmMzZlYWU5MSIsInVzZXJuYW1lIjoiaGFiaWItZGV2IiwiZmFza2VzVXVpZCI6IjlkNDAzdWZqaDQzdWZoM3VmODQzMGloZiIsInVzZXJVdWlkIjoiMDE5MWY1ZmUtYWVjNC03MmMyLWIyNjUtZGRhMTkwNGZhZjdlIiwiaWF0IjoxNzI4MzYxOTE4LCJleHAiOjE3MzA5NTM5MTgsImlzcyI6ImF1dGhlbnRpY2F0aW9uLXNlcml2aWNlIn0.Jr1RzDQ-6Sa_4zne9u3ouEsiqstUAvCclTbZzrNY2EgQqYQAyIMVnaSXKM9bgokgq5DdmX3DM21UY0KGqR_-uZNADMea4roqMVAHrU9eebkLJOf4n1TB0RscWJEoMI0sxQivLhOAHMpxQ-Fp-_GF5f1ACT66zuqV2Pl28KmQmEp0hdiF2obIH_Jg64tmAmRxNbaNz1qc1prPuqumEvfNuuFUBkJY8nbrdMmZ2sVjqm5KFg5xJpjP5kZ20BkzNmNG161XH_j_Fgj6HZjGRtDlbcT_XLjSYFT7maaUOVM9VaDxhHN31ZLdBv8xbJisqK4qCh-OOxAL-kACwg_f3-BLNQ",
    //       status: true,
    //     },
    //   });
    // });
  } catch (error) {
    console.error("Terjadi kesalahan saat sinkronisasi:", error);
  }
}
