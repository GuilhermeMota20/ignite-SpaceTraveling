import * as prismic from '@prismicio/client';
import { HttpRequestLike } from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

export interface PrismicConfig {
  req?: HttpRequestLike;
}

export function getPrismicClient(config: PrismicConfig): prismic.Client {
  const repositoryName = 'SpacesTraveling';
  const endpoint = prismic.getRepositoryEndpoint(repositoryName);

  const client = prismic.createClient(endpoint, {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
  })

  enableAutoPreviews({
    client,
    req: config.req,
  })

  return client;
}