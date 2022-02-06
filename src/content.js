(function(){
    if (document.location.hostname !== 'news.ycombinator.com') return;
    if (!document.title.startsWith('Poll:')) return;
    const _class = '_hnpoll_bf08b84d-4439-4b9e-bb9b-bb20b96decdb';
    for (const e of [...document.getElementsByClassName(_class)]) {
        e.parentElement.removeChild(e);
    }
    let nodes = [...document.querySelectorAll('.fatitem .score')].slice(1);
    if (nodes.length === 0) return;
    let tbody = nodes[0];
    while (tbody !== null && tbody.tagName !== 'TBODY') {
        tbody = tbody.parentElement;
    }
    if (tbody === null) return;
    nodes = nodes.filter(x => tbody.contains(x));
    const points = nodes.map(x => parseInt(x.textContent));
    const maxPoints = Math.max(...points);
    if (!isFinite(maxPoints) || maxPoints <= 0) return;
    for (const n of nodes) {
        const points = parseInt(n.textContent);
        const bar = document.createElement('div');
        bar.className = _class;
        const left = n.parentNode.getBoundingClientRect().left;
        let maxWidth = 400;  // in pixels
        maxWidth = Math.min(maxWidth, window.screen.width - left - 30);
        if (maxWidth <= 0) continue;
        bar.style.width = ((points / maxPoints) * maxWidth) + 'px';
        bar.style.height = '10px';
        bar.style.background = '#828282';
        bar.style.marginTop = '5px';
        bar.style.marginLeft = '0px';
        bar.style.marginRight = '0px';
        bar.style.paddingLeft = '0px';
        bar.style.paddingRight = '0px';
        n.parentNode.appendChild(bar);
    }
    const indexedPoints = points.map((x, idx) => ({points: x, idx: idx}));
    indexedPoints.sort((a, b) => b.points - a.points);
    const groupSize = tbody.children.length / nodes.length;
    const tmps = [];
    for (let i = 0; i < indexedPoints.length; ++i) {
        const idx = indexedPoints[i].idx;
        const points = indexedPoints[i].points;
        for (let j = idx * groupSize; j < idx * groupSize + groupSize; ++j) {
            // A temporary row is inserted so that positions are maintained.
            const tmp = document.createElement('tr');
            tmps.push(tmp);
            const e = tbody.replaceChild(tmp, tbody.children[j]);
            tbody.appendChild(e);
        }
    }
    for (const tmp of tmps) {
        tmp.parentElement.removeChild(tmp);
    }
})();
