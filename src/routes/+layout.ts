export const prerender = (request: { url: string | URL }) => {
  const url = new URL(request.url);
  const draftKey = url.searchParams.get("draftKey");
  return !draftKey;
};
