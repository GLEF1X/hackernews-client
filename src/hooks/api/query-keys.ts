export const newsQueryKeys = {
  getBestNews: () => ["bestArticles"],
  getComments: (...args: any[]) => ["comments", ...args],
};
