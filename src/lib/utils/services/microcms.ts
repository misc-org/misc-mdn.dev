import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import {
  PUBLIC_MICROCMS_SERVICE_DOMAIN,
  PUBLIC_MICROCMS_API_KEY,
} from "$env/static/public";
import blogsDetail from "$lib/assets/mocks/blogs-detail.json";
import blogsList from "$lib/assets/mocks/blogs-list.json";
import type { EndPoints } from "$lib/utils/types/microcms";

export const microcms = createClient({
  serviceDomain: PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: PUBLIC_MICROCMS_API_KEY,
});

export async function getContentList<T extends keyof EndPoints["gets"]>(
  key: T,
  queries: MicroCMSQueries = {},
): Promise<EndPoints["gets"][T]> {
  if (process.env.NODE_ENV === "development") {
    switch (key) {
      case "blogs":
        return blogsList as any;
      default:
        throw new Error("Invalid key");
    }
  }

  return microcms.get({
    endpoint: key,
    queries,
  });
}

export async function getContentDetail<T extends keyof EndPoints["get"]>(
  key: T,
  id: string,
  queries: MicroCMSQueries = {},
): Promise<EndPoints["get"][T]> {
  if (process.env.NODE_ENV === "development") {
    switch (key) {
      case "blogs":
        return blogsDetail as any;
      default:
        throw new Error("Invalid key");
    }
  }
  return microcms.getListDetail<EndPoints["get"][T]>({
    endpoint: key,
    contentId: id,
    queries,
  });
}

export async function getDraftContentDetail<T extends keyof EndPoints["get"]>(
  key: T,
  id: string,
  draftKey: string,
  queries: MicroCMSQueries = {},
): Promise<EndPoints["get"][T]> {
  if (process.env.NODE_ENV === "development") {
    switch (key) {
      case "blogs":
        return blogsDetail as any;
      default:
        throw new Error("Invalid key");
    }
  }
  return microcms.get<EndPoints["get"][T]>({
    endpoint: key,
    contentId: id,
    queries: { draftKey, ...queries },
  });
}
