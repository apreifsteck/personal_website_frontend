const markdownToHTML = (text, media) => {
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
        code: /`(.*)`/g,
        image: /\[img\]\((.*)\)/g
    }

    expressions.headers.forEach((currentVal, index) => {
        text = text.replace(currentVal, (match, group1) => `<h${6 - index}>${group1}</h${6 - index}>`)
    })

    text = text.replace(expressions.unordered_lists, (match) => {
        const innerListReplace = match.replace(/- (.*)/g, (innerMatch, group1) => `<li>${group1}</li>`)
        return `<ul>${innerListReplace}</ul>`
    })

    text = text.replace(expressions.ordered_lists, (match) => {
        console.log(match)
        const innerListReplace = match.replace(/\d\. (.*)/g, (innerMatch, group1) => `<li>${group1}</li>`)
        return `<ol>${innerListReplace}</ol>`
    })
    text = text.replace(expressions.strong, (match, group1) => {
        return `<strong>${group1}</strong>`
    })
    text = text.replace(expressions.italic, (match, group1) => {
        return `<i>${group1}</i>`
    })
    text = text.replace(expressions.code, (match, group1) => {
        return `<code>${group1}</code>`
    })
    text = text.replace(expressions.image, (match, group1) => {
        // First, look in our object of picture snapshots.
        if (media.hasOwnProperty(group1)) {
            return `<img src="${media[group1]}"/>`
        }
        return `<img src="${group1}"/>`

    })

    return text
}

export default markdownToHTML