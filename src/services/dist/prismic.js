"use strict";
exports.__esModule = true;
exports.getPrismicClient = void 0;
var prismic = require("@prismicio/client");
var next_1 = require("@prismicio/next");
function getPrismicClient(config) {
    var repositoryName = 'SpacesTraveling';
    var endpoint = prismic.getRepositoryEndpoint(repositoryName);
    var client = prismic.createClient(endpoint, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN
    });
    next_1.enableAutoPreviews({
        client: client,
        req: config.req
    });
    return client;
}
exports.getPrismicClient = getPrismicClient;
/*
export function getPrismicClient(config: PrismicConfig): prismic.Client {
  const client = prismic.createClient(process.env.PRISMIC_API_ENDPOINT);

  enableAutoPreviews({
    client,
    req: config.req,
  })

  return client;
}
 */
