import { storeHighlightJs } from "@skeletonlabs/skeleton";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/panda-syntax-light.css";

export function setupHighlightJs() {
  storeHighlightJs.set(hljs);

  hljs.registerLanguage("xml", xml);
  hljs.registerLanguage("css", css);
  hljs.registerLanguage("json", json);
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("typescript", typescript);
}