import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import * as prismicNext from "@prismicio/next";
import sm from "../../sm.json";

/**
 * The project's Prismic repository name.
 */
export const ignewsRepository = prismic.getRepositoryName(sm.apiEndpoint);

/**
 * The project's Prismic Link Resolver. This function determines the URL for a given Prismic document.
 *
 * @type {prismicH.LinkResolverFunction}
 */
// Update the Link Resolver to match your project's route structure
export function linkResolver(doc) {
  switch (doc.type) {
    case "homepage":
      return "/";
    case "page":
      return `/${doc.uid}`;
    default:
      return null;
  }
}

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */
export const createClient = (config: prismic.ClientConfig = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, {
    ...config,
    accessToken: process.env.PRIMIC_ACCESS_TOKEN,
  });

  prismicNext.enableAutoPreviews({
    client,
  });

  return client;
};
