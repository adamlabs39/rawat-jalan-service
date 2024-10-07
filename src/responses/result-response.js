export default class ResultResponse {
  static responseWithPaginate(message, pagination, data) {
    return {
      message: message,
      properties: pagination,
      payload: data,
    };
  }
  static responseMessagePayload(message, data) {
    return {
      message: message,
      payload: data,
    };
  }
}
