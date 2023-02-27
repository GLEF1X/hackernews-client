import { z } from "zod";
import dayjs from "dayjs";

export declare type CleanData<T extends z.ZodType> = z.infer<T>;

const BaseItem = z
  .object({
    id: z.number(),
    deleted: z.boolean(),
    type: z.enum(["job", "story", "comment", "poll", "pollopt"]),
    by: z.string(),
    time: z.number().transform((value) => dayjs.unix(value)),
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
  score: true,
  time: true,
  title: true,
  type: true,
  url: true,
})
  .required()
  .merge(
    z
      .object({
        descendants: z.number(),
        text: z.string(),
        url: z.string(),
        kids: z.array(z.number()),
      })
      .partial()
  );

const ArticleCommentModel = BaseItem.pick({
  by: true,
  id: true,
  kids: true,
  parent: true,
  text: true,
  time: true,
  type: true,
})
  .required()
  .merge(
    z
      .object({
        kids: z.array(z.number()),
        parent: z.number(),
      })
      .partial()
  );

export type Article = CleanData<typeof ArticleModel>;
export type ArticleComment = CleanData<typeof ArticleCommentModel>;

export { ArticleModel, ArticleCommentModel };
