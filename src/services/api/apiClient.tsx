import { type ArticleModel, type CleanData } from './types';
import { createContext, type ReactNode, useContext } from 'react';

export const ApiContext = createContext<ApiClient | null>(null);

export class ApiClient {
  private apiUrl: string;

  public constructor() {
    this.apiUrl = 'https://hacker-news.firebaseio.com/v0';
  }

  async getBestArticles(): Promise<Array<CleanData<typeof ArticleModel>>> {
    const getBestNewsIds: Promise<number[]> = fetch(this.apiUrl + '/beststories.json').then(
      async (response) => await response.json()
    );

    return await getBestNewsIds.then(
      async (newsIds) =>
        await Promise.all(
          newsIds
            .slice(0, 100)
            .map(
              async (id) =>
                await fetch(this.apiUrl + `/item/${id}.json`).then(
                  async (response) => await response.json()
                )
            )
        )
    );
  }
}

export const ApiClientProvider = ({ children }: { children?: ReactNode }) => {
  // TODO: move hardcoded base api url to env variables or whatever credentials storage
  const apiClient = new ApiClient();

  return <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>;
};

export const useApiClient = () => {
  const apiClient = useContext(ApiContext);

  if (apiClient === null) {
    throw new Error('Unable to use API client without provided instance in context.');
  }
  return apiClient;
};
