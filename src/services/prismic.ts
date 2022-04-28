import * as prismic from '@prismicio/client';
import { HttpRequestLike } from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';
import sm from '../../sm.json';

export interface PrismicConfig {
  req?: HttpRequestLike;
}

export const repositoryName = sm.apiEndpoint
export const endpoint = prismic.getRepositoryName(repositoryName);

export function getPrismicClient(config: PrismicConfig): prismic.Client {
  const client = prismic.createClient(endpoint, {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      ...config
  })

  enableAutoPreviews({
    client,
    req: config.req,
  })

  return client;
}