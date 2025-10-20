import sequelizeInstance from "../configurations/sequelize-instance.js";
import moment from "moment";
import {RawatJalanModel} from "@adameds/model-sdk/pelayanan";
import {PatientModel} from "@adameds/model-sdk/admisi";
import dayjs from "dayjs";
import { createAntrianCall, getAllAntrianCall, updateAntrianCall } from "../configurations/axios-instance.js";

export default class AntrianRawatJalanRepository {
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

    static async updateStatusRajal(uuid, data) {
        try{
            
            const statusMessages = {
                1: "Antrian berhasil dipanggil",
                2: "Antrian berhasil dilewati",
                3: "Antrian berhasil diproses",
                4: "Antrian berhasil diselesaikan",
            };

            const result = await updateAntrianCall.put(`/${uuid}`, {
                status_panggilan: data.status_panggilan
            });

            const antrian = result.data.payload;

            if (antrian.status_panggilan === 4){
                try {
                    await createAntrianCall.post("/", {
                        patient_uuid: antrian.patient_data.patient_uuid,
                        rawat_jalan_uuid: antrian.rawat_jalan_uuid,
                        pelayanan: "farmasi",
                        jenis_pasien: antrian.jenis_pasien,
                        pasien_baru: antrian.pasien_baru,
                    });
                } catch (error) {
                    console.error("Error update status antrian:", error);
                    throw error;
                }
            }

            return { message: statusMessages[antrian.status_panggilan] };

        }catch(error){
            console.error("Error updating antrian:", error);
            throw error;
        }
    }
}
