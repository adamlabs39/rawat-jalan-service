// import NotfoundException from "../exceptions/notfound-exception.js";
// import ValidationException from "../exceptions/validation-exception.js";
// import {
//   messageErrorDataNotFound,
//   messageErrorEdit,
//   messageSuccessEdit,
//   messageSuccessShow,
// } from "../helpers/message.js";
// import AntrianRawatJalanRepository from "../repositories/antrian_rj-repository.js";
// import AntrianRawatJalanValidation from "../validations/antrian_rajal-validation.js";
// import ZodValidator from "../validations/zod-validator.js";

// export default class AntrianRawatJalanService {
//   static async updateAntrian(uuid, data) {
//     const validationResult = ZodValidator.validate(
//       AntrianRawatJalanValidation.UPDATE,
//       data
//     );

//     if (validationResult.errors) {
//       throw new ValidationException({ errors: validationResult.errors });
//     }

//     const existingRajal = await AntrianRawatJalanRepository.findRajalByUuid(
//       uuid
//     );
//     if (!existingRajal) {
//       throw new NotfoundException(messageErrorEdit, messageErrorDataNotFound);
//     }

//     const result = await AntrianRawatJalanRepository.updateStatusRajal(
//       existingRajal,
//       data
//     );
//     return ResultResponse.responseMessagePayload(messageSuccessEdit, result);
//   }

//   static async getAntrian(status) {
//     const result = await AntrianRawatJalanRepository.getAntrian(
//       parseInt(status) || null
//     );
//     return ResultResponse.responseMessagePayload(messageSuccessShow, result);
//   }
// }
