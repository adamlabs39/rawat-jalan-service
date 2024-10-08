import NotfoundException from "../errors/notfound-exception.js";
import BadRequestException from "../errors/bad-request-exception.js";
import ResultResponse from "../responses/result-response.js";
import { messageErrorSave } from "../helpers/message.js";
import { ZodError } from "zod";

/**
 * @param {Error} error - Error yang ditangkap
 * @param {import('express').Request} request - Express Request object
 * @param {import('express').Response} response - Express Response object
 * @param {import('express').NextFunction} next - Express NextFunction
 */

const errorMiddleware = (error, request, response, next) => {
  if (error instanceof ZodError) {
    return response.status(422).json({
      message: messageErrorSave,
      errors: error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }

  if (error instanceof NotfoundException) {
    return response.status(error.code).json(
      ResultResponse.errorResponse(error.message, {
        error: "not found",
        message: error.errorMessage,
      })
    );
  }

  if (error instanceof BadRequestException) {
    return response.status(error.status).json(
      ResultResponse.errorResponse(error.message, {
        error: "bad request",
        message: error.errorMessage,
      })
    );
  }

  // Default error handler
  return response.status(500).json(
    ResultResponse.errorResponse("Internal server error", {
      type: "server error",
      message: "Terjadi kesalahan diserver. Silahkan coba lagi nanti...",
    })
  );
};

export default errorMiddleware;
