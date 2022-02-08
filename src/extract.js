this.extract = function(document) {
    const tbody = document.querySelector('table.fatitem > tbody table > tbody');
    if (tbody === null) return;
    const names = [...tbody.querySelectorAll('.comment')].map(x => x.textContent.trim());
    const scoreNodes = [...tbody.querySelectorAll('.score')];
    const scores = scoreNodes.map(x => parseInt(x.textContent));
    let result = null;
    if (names.length > 0
            && names.length === scoreNodes.length
            && names.length === scores.length) {
        const items = names.map((x, i) =>
            ({idx: i, name: x, score: scores[i], scoreNode: scoreNodes[i]}));
        result = {items: items, tbody: tbody};
    }
    return result;
};
