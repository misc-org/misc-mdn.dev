import type { PageServerLoad } from "./$types";
import { getContentDetail } from "$lib/utils/services/microcms";

export const load: PageServerLoad = async ({ request, params }) => {
  const { slug } = params;
  const url = new URL(request.url);
  const res = await getContentDetail("blogs", slug);
  return {
    detail: res,
  };
};
