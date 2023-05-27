import { z } from "zod";

export declare type CleanData<T extends z.ZodType> = z.infer<T>;

function isValidUnixTimestamp(timestamp: number): boolean {
  return new Date(timestamp).getTime() > 0;
}

const BaseItem = z
  .object({
    id: z.number(),
    deleted: z.boolean(),
    type: z.enum(["job", "story", "comment", "poll", "pollopt"]),
    by: z.string(),
    time: z
      .number()
      .refine(isValidUnixTimestamp)
      .transform((value) => new Date(value * 1000)),
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

const UserModel = z.object({
  id: z.string(),
  created: z
    .number()
    .refine(isValidUnixTimestamp)
    .transform((value) => new Date(value * 1000)),
  karma: z.number().gte(0),
  about: z.string().optional(),
  submitted: z.array(z.number()),
});

const ArticleCommentModel = BaseItem.pick({
  id: true,
  text: true,
  time: true,
  type: true,
  by: true,
})
  .required()
  .merge(
    z.object({
      kids: z.array(z.number()).optional(),
      parent: z.number().optional(),
    })
  );

export type Article = CleanData<typeof ArticleModel>;
export type ArticleComment = CleanData<typeof ArticleCommentModel>;
export type User = CleanData<typeof UserModel>;

export { ArticleModel, ArticleCommentModel, UserModel };
