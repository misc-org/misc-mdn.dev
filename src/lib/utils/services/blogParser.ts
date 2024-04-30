export function parser(data: any, content: any[]) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(data, "text/html");

    Array.from(doc.body.childNodes).forEach((node) => {
        if (node instanceof Element && node.hasAttribute("data-filename")) {
            const filename = node.getAttribute("data-filename") || "";
            const codeElement = node.querySelector("code");
            if (codeElement) {
                const language = codeElement.className.replace("language-", "");
                const code: string = codeElement.textContent
                    ? codeElement.textContent
                    : "";

                content.push({ type: "code", language, code, filename });
            }
        } else if (node instanceof Element) {
            if (node.tagName === 'H2' || node.tagName === 'H3') {
                content.push({ type: node.tagName.toLowerCase(), text: node.textContent || '' });
            } else if (node.tagName === 'P') {
                const paragraphContent: ContentItem[] = [];
                Array.from(node.childNodes).forEach((childNode) => {
                    if (childNode.nodeType === Node.TEXT_NODE) {
                        paragraphContent.push({ type: "text", text: childNode.textContent || '' });
                    } else if (childNode instanceof Element) {
                        if (childNode.classList.contains('icon')) {
                            paragraphContent.push({ type: "icon", content: childNode.textContent || '' });
                        } else if (childNode.tagName === 'CODE') {
                            paragraphContent.push({ type: "code", text: childNode.textContent || '' });
                        } else if (childNode.tagName === 'BR') {
                            paragraphContent.push({ type: "text", text: '<br>' });
                        }
                    }
                });
                content.push({ type: "paragraph", content: paragraphContent });
            } else if (node.tagName === 'UL' || node.tagName === 'OL') {
                const listItems: ContentItem[] = [];
                Array.from(node.querySelectorAll('li')).forEach((innerNode) => {
                    if (innerNode instanceof Element) {
                        const listItemContent: ContentItem[] = [];
                        Array.from(innerNode.childNodes).forEach((childNode) => {
                            if (childNode.nodeType === Node.TEXT_NODE) {
                                listItemContent.push({ type: "text", text: childNode.textContent || '' });
                            } else if (childNode instanceof Element) {
                                if (childNode.classList.contains('icon')) {
                                    listItemContent.push({ type: "icon", content: childNode.textContent || '' });
                                } else if (childNode.tagName === 'CODE') {
                                    listItemContent.push({ type: "code", text: childNode.textContent || '' });
                                } else if (childNode.tagName === 'BR') {
                                    listItemContent.push({ type: "text", text: '<br>' });
                                }
                            }
                        });
                        listItems.push({ type: "listItem", content: listItemContent });
                    }
                });
                content.push({ type: node.tagName.toLowerCase(), content: listItems });
            } else if (node.tagName === 'TABLE') {
                const tableRows: ContentItem[] = [];
                Array.from(node.querySelectorAll('tr')).forEach((innerNode) => {
                    if (innerNode instanceof Element) {
                        const tableRowContent: ContentItem[] = [];
                        Array.from(innerNode.childNodes).forEach((childNode) => {
                            if (childNode.nodeType === Node.TEXT_NODE) {
                                tableRowContent.push({ type: "text", text: childNode.textContent || '' });
                            } else if (childNode instanceof Element) {
                                if (childNode.tagName === 'TH' || childNode.tagName === 'TD') {
                                    const cellContent: ContentItem[] = [];
                                    Array.from(childNode.childNodes).forEach((grandChildNode) => {
                                        if (grandChildNode.nodeType === Node.TEXT_NODE) {
                                            cellContent.push({ type: "text", text: grandChildNode.textContent || '' });
                                        } else if (grandChildNode instanceof Element) {
                                            if (grandChildNode.tagName === 'P') {
                                                const paragraphContent: ContentItem[] = [];
                                                Array.from(grandChildNode.childNodes).forEach((greatGrandChildNode) => {
                                                    if (greatGrandChildNode.nodeType === Node.TEXT_NODE) {
                                                        paragraphContent.push({ type: "text", text: greatGrandChildNode.textContent || '' });
                                                    } else if (greatGrandChildNode instanceof Element) {
                                                        if (greatGrandChildNode.classList.contains('icon')) {
                                                            paragraphContent.push({ type: "icon", content: greatGrandChildNode.textContent || '' });
                                                        } else if (greatGrandChildNode.tagName === 'CODE') {
                                                            paragraphContent.push({ type: "code", text: greatGrandChildNode.textContent || '' });
                                                        } else if (greatGrandChildNode.tagName === 'BR') {
                                                            paragraphContent.push({ type: "text", text: '<br>' });
                                                        }
                                                    }
                                                });
                                                cellContent.push({ type: "paragraph", content: paragraphContent });
                                            }
                                        }
                                    });
                                    tableRowContent.push({ type: childNode.tagName.toLowerCase() as any, content: cellContent });
                                }
                            }
                        });
                        tableRows.push({ type: "tableRow", content: tableRowContent });
                    }
                });
                content.push({ type: "table", content: tableRows });
            } else {
                content.push({ type: "html", html: node.outerHTML });
            }
        }
    });

    return content;
}

export type ContentItem =
    | { type: "code"; language: string; code: string; filename?: string }
    | { type: "html"; html: string }
    | { type: "h2" | "h3"; text: string }
    | { type: "text"; text: string; }
    | { type: "code"; text: string; }
    | { type: "icon"; content: string; }
    | { type: "paragraph"; content: ContentItem[] }
    | { type: "ul" | "ol"; content: ContentItem[] }
    | { type: "listItem"; content: ContentItem[] }
    | { type: "table"; content: ContentItem[] }
    | { type: "tableRow"; content: ContentItem[] }
    | { type: "th" | "td"; content: ContentItem[] };