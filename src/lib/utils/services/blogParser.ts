function addTextContent(node: Node, content: ContentItem[]): void {
    content.push({ type: "text", text: node.textContent || '' });
}

function processElementNode(node: Element, content: ContentItem[]): void {
    if (node.classList.contains('icon')) {
        content.push({ type: "icon", content: node.textContent || '' });
    } else if (node.tagName === 'CODE') {
        content.push({ type: "code", text: node.textContent || '' });
    } else if (node.tagName === 'BR') {
        content.push({ type: "text", text: '<br>' });
    }
}

function processNode(node: Node, content: ContentItem[]): void {
    if (node.nodeType === Node.TEXT_NODE) {
        addTextContent(node, content);
    } else if (node instanceof Element) {
        processElementNode(node, content);
    }
}


function processCodeElement(node: Element, content: any[]) {
    const filename = node.getAttribute("data-filename") || "";
    const codeElement = node.querySelector("code");
    if (codeElement) {
        const language = codeElement.className.replace("language-", "");
        const code: string = codeElement.textContent
            ? codeElement.textContent
            : "";

        content.push({ type: "code", language, code, filename });
    }
}

function processParagraph(node: Element, content: any[]) {
    const paragraphContent: ContentItem[] = [];
    Array.from(node.childNodes).forEach((childNode) => {
        processNode(childNode, paragraphContent);
    });
    content.push({ type: "paragraph", content: paragraphContent });
}

function processList(node: Element, content: any[]) {
    const listItems: ContentItem[] = [];
    Array.from(node.querySelectorAll('li')).forEach((innerNode) => {
        if (innerNode instanceof Element) {
            const listItemContent: ContentItem[] = [];
            Array.from(innerNode.childNodes).forEach((childNode) => {
                processNode(childNode, listItemContent);
            });
            listItems.push({ type: "listItem", content: listItemContent });
        }
    });
    content.push({ type: node.tagName.toLowerCase(), content: listItems });
}

function processTableCell(node: Element, tableRowContent: any[]) {
    const cellContent: ContentItem[] = [];
    Array.from(node.childNodes).forEach((grandChildNode) => {
        if (grandChildNode.nodeType === Node.TEXT_NODE) {
            cellContent.push({ type: "text", text: grandChildNode.textContent || '' });
        } else if (grandChildNode instanceof Element) {
            if (grandChildNode.tagName === 'P') {
                const paragraphContent: ContentItem[] = [];
                Array.from(grandChildNode.childNodes).forEach((greatGrandChildNode) => {
                    processNode(greatGrandChildNode, paragraphContent);
                });
                cellContent.push({ type: "paragraph", content: paragraphContent });
            }
        }
    });
    tableRowContent.push({ type: node.tagName.toLowerCase() as any, content: cellContent });
}

function processTable(node: Element, content: any[]) {
    const tableRows: ContentItem[] = [];
    Array.from(node.querySelectorAll('tr')).forEach((innerNode) => {
        if (innerNode instanceof Element) {
            const tableRowContent: ContentItem[] = [];
            Array.from(innerNode.childNodes).forEach((childNode) => {
                if (childNode.nodeType === Node.TEXT_NODE) {
                    tableRowContent.push({ type: "text", text: childNode.textContent || '' });
                } else if (childNode instanceof Element) {
                    if (childNode.tagName === 'TH' || childNode.tagName === 'TD') {
                        processTableCell(childNode, tableRowContent);
                    }
                }
            });
            tableRows.push({ type: "tableRow", content: tableRowContent });
        }
    });
    content.push({ type: "table", content: tableRows });
}

function processOtherElements(node: Element, content: any[]) {
    if (node.tagName === 'H2' || node.tagName === 'H3') {
        content.push({ type: node.tagName.toLowerCase(), text: node.textContent || '' });
    } else if (node.tagName === 'P') {
        processParagraph(node, content);
    } else if (node.tagName === 'UL' || node.tagName === 'OL') {
        processList(node, content);
    } else if (node.tagName === 'TABLE') {
        processTable(node, content);
    } else {
        content.push({ type: "html", html: node.outerHTML });
    }
}

export function parser(data: any, content: any[]) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(data, "text/html");

    Array.from(doc.body.childNodes).forEach((node) => {
        if (node instanceof Element && node.hasAttribute("data-filename")) {
            processCodeElement(node, content);
        } else if (node instanceof Element) {
            processOtherElements(node, content);
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