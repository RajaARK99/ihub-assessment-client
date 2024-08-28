import { z } from "zod";

const usersSearchSchema = z
  .object({
    page: z.number(),
    limit: z.number(),
  })
  .catch({
    page: 1,
    limit: 10,
  });

export { usersSearchSchema };
