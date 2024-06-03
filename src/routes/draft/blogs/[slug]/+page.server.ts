import type { PageServerLoad } from "./$types";
import {
  getContentDetail,
  getDraftContentDetail,
} from "$lib/utils/services/microcms";

export const load: PageServerLoad = async ({ request, params }) => {
  const { slug } = params;
  const url = new URL(request.url);
  const draftKey = url.searchParams.get("draftKey");
  let res;
  if (draftKey) {
    res = await getDraftContentDetail("blogs", slug, draftKey);
  } else {
    res = await getContentDetail("blogs", slug);
  }
  return {
    detail: res,
  };
};
