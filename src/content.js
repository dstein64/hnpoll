chrome.storage.local.get(['options'], function(storage) {
    if (document.location.hostname !== 'news.ycombinator.com') return;
    if (!document.title.startsWith('Poll:')) return;
    const options = storage.options;
    if (!['none', 'alphabetic', 'numeric'].includes(options.sorting))
        return;
    const _class = '_hnpoll_bf08b84d-4439-4b9e-bb9b-bb20b96decdb';
    for (const e of [...document.getElementsByClassName(_class)]) {
        e.parentElement.removeChild(e);
    }
    const tbody = document.querySelector('table.fatitem > tbody table > tbody');
    if (tbody === null) return;
    const names = [...tbody.querySelectorAll('.comment')].map(x => x.textContent.trim());
    const scoreNodes = [...tbody.querySelectorAll('.score')];
    const scores = scoreNodes.map(x => parseInt(x.textContent));
    if (names.length === 0) return;
    if (names.length !== scoreNodes.length || names.length !== scores.length)
        return;
    const items = names.map((x, i) =>
        ({idx: i, name: x, score: scores[i], scoreNode: scoreNodes[i]}));
    const maxScore = Math.max(...scores);
    const sumScore = scores.reduce((a, b) => a + b, 0);
    if (!isFinite(maxScore) || maxScore <= 0) return;
    for (const item of items) {
        const bar = document.createElement('div');
        bar.className = _class;
        const left = item.scoreNode.parentNode.getBoundingClientRect().left;
        let maxWidth = 400;  // in pixels
        maxWidth = Math.min(maxWidth, window.screen.width - left - 30);
        if (maxWidth <= 0) continue;
        bar.style.width = ((item.score / maxScore) * maxWidth) + 'px';
        bar.style.height = '10px';
        bar.style.background = '#828282';
        bar.style.marginTop = '5px';
        bar.style.marginLeft = '0px';
        bar.style.marginRight = '0px';
        bar.style.paddingLeft = '0px';
        bar.style.paddingRight = '0px';
        bar.setAttribute('title', (100 * item.score / sumScore).toFixed(1) + '%');
        item.scoreNode.parentNode.appendChild(bar);
    }
    if (options.sorting !== 'none') {
        // The initial compare assumes options.sorting === 'alphabetic'.
        let compare = (a, b) => a.name.localeCompare(b.name);
        if (options.sorting === 'numeric') {
            compare = (a, b) => b.score - a.score;
        }
        const sortedItems = [...items];
        sortedItems.sort(compare);
        const groupSize = tbody.children.length / sortedItems.length;
        if (!Number.isInteger(groupSize)) return;
        const elements = [];
        for (const item of sortedItems) {
            for (let j = item.idx * groupSize; j < item.idx * groupSize + groupSize; ++j) {
                elements.push(tbody.children[j]);
            }
        }
        tbody.textContent = '';
        tbody.append(...elements);
    }
});
