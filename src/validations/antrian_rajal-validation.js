import { z } from "zod";

export default class AntrianRawatJalanValidation {
  static UPDATE = z.object({
    status_rj: z.number().int().min(0).max(5).optional(),
  });
}
