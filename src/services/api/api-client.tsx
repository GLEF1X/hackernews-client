import {
  Article,
  ArticleComment,
  ArticleCommentModel,
  ArticleModel,
  type CleanData,
  User,
  UserModel,
} from "./types";
import { createContext, type ReactNode, useContext } from "react";

export const ApiContext = createContext<ApiClient | null>(null);

export class ApiClient {
  private apiUrl: string;

  public constructor() {
    // TODO: move hardcoded base api url to env variables or whatever credentials storage
    this.apiUrl = "https://hacker-news.firebaseio.com/v0";
  }

  async getBestArticles(
    lastFetchedId = 0,
    numberOfItemsToFetch = 50
  ): Promise<Array<CleanData<typeof ArticleModel>>> {
    const getBestNewsIds: Promise<number[]> = fetch(this.apiUrl + "/topstories.json").then(
      async (response) => await response.json()
    );

    return await getBestNewsIds.then(
      async (newsIds) =>
        await Promise.all(
          newsIds
            .slice(lastFetchedId, lastFetchedId + numberOfItemsToFetch)
            .map(this.getArticleById, this)
        )
    );
  }

  async getArticleById(id: number): Promise<Article> {
    return await fetch(this.apiUrl + `/item/${id}.json`)
      .then(async (response) => await response.json())
      .then((jsonResponse) => ArticleModel.parse(jsonResponse));
  }

  async getComments(ids: number[]): Promise<ArticleComment[]> {
    return (await Promise.all(ids.map(this.getCommentById, this))).filter(
      Boolean
    ) as ArticleComment[];
  }

  async getCommentById(id: number): Promise<ArticleComment | null> {
    return await fetch(this.apiUrl + `/item/${id}.json`)
      .then(async (response) => await response.json())
      .then((jsonResponse) => {
        if (jsonResponse.deleted || jsonResponse.dead) {
          return null;
        }

        return ArticleCommentModel.parse(jsonResponse);
      });
  }

  async getUser(nickname: string): Promise<User> {
    return await fetch(this.apiUrl + `/user/${nickname}.json`)
      .then(async (response) => await response.json())
      .then((jsonResponse) => UserModel.parse(jsonResponse));
  }
}

export const apiClient = new ApiClient();

export const ApiClientProvider = ({ children }: { children?: ReactNode }) => (
  <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
);

export const useApiClient = () => {
  const apiClient = useContext(ApiContext);

  if (apiClient === null) {
    throw new Error("Unable to use API client without provided instance in context.");
  }
  return apiClient;
};
