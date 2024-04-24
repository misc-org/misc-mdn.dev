import { addAnchorCopy } from "./rewriters/add-anchor-copy";
import { highlight } from "./rewriters/highlight";

export type Rewriter = (html: string) => string;

export function rewriteHTML(
  html: string,
  additionalRewriter: Rewriter[] = [],
): string {
  let result = html;

  const writers: Rewriter[] = [highlight, addAnchorCopy, ...additionalRewriter];

  // eslint-disable-next-line no-restricted-syntax
  for (const rewriter of writers) {
    result = rewriter(result ?? "");
  }

  return result;
}
