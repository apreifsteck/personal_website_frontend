const markdownToHTML = (text) => {
    const expressions = {
        headers: [
            /###### (.*)/g,
            /##### (.*)/g,
            /#### (.*)/g,
            /### (.*)/g,
            /## (.*)/g,
            /# (.*)/g,
        ],
        unordered_lists: /((-) (.*\n?))+/g,
        ordered_lists: /((\d\.) (.*\n?))+/g,
        strong: /\*(.*)\*/g,
        italic: /_(.*)_/g,
        code: /`(.*)`/g
    }

    expressions.headers.forEach((currentVal, index) => {
        text = text.replace(currentVal, (match, p1) => `<h${6 - index}>${p1}</h${6 - index}>`)
    })

    text = text.replace(expressions.unordered_lists, (match) => {
        const innerListReplace = match.replace(/- (.*)/g, (innerMatch, p1) => `<li>${p1}</li>`)
        return `<ul>${innerListReplace}</ul>`
    })

    text = text.replace(expressions.ordered_lists, (match) => {
        console.log(match)
        const innerListReplace = match.replace(/\d\. (.*)/g, (innerMatch, p1) => `<li>${p1}</li>`)
        return `<ol>${innerListReplace}</ol>`
    })
    text = text.replace(expressions.strong, (match, p1) => {
        return `<strong>${p1}</strong>`
    })
    text = text.replace(expressions.italic, (match, p1) => {
        return `<i>${p1}</i>`
    })
    text = text.replace(expressions.code, (match, p1) => {
        return `<code>${p1}</code>`
    })

    return text
}

export default markdownToHTML