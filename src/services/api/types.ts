import { z } from "zod";

export declare type CleanData<T extends z.ZodType> = z.infer<T>;

const BaseItem = z
  .object({
    id: z.number(),
    deleted: z.boolean(),
    type: z.enum(["job", "story", "comment", "poll", "pollopt"]),
    by: z.string(),
    time: z.number().transform((value) => new Date(value * 1000)),
    text: z.string(),
    dead: z.boolean(),
    parent: z.number(),
    poll: z.number(),
    kids: z.array(z.number()),
    url: z.string().url(),
    score: z.number().gte(0),
    title: z.string(),
    parts: z.array(z.number()),
    descendants: z.number(),
  })
  .partial();

const ArticleModel = BaseItem.pick({
  by: true,
  descendants: true,
  id: true,
  kids: true,
  score: true,
  time: true,
  title: true,
  type: true,
  url: true,
});

export { ArticleModel };
