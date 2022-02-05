(function(){
    const hackernews = document.location.hostname === "news.ycombinator.com";
    const poll = document.title.substring(0,5) === "Poll:";
    if (!hackernews || !poll) return;
    const _class = '_hnpoll_bf08b84d-4439-4b9e-bb9b-bb20b96decdb';
    const bars = document.getElementsByClassName(_class);
    for (let i = bars.length-1; i >= 0 ; i--) {
        const e = bars[i];
        e.parentElement.removeChild(e);
    }
    const nodes = [...document.querySelectorAll('.fatitem .score')].slice(1);
    const points = nodes.map(x => parseInt(x.textContent));
    const maxPoints = Math.max(...points);
    if (!isFinite(maxPoints) || maxPoints <= 0) return;
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const points = parseInt(n.textContent);
        const bar = document.createElement('div');
        bar.className = _class;
        const left = n.parentNode.getBoundingClientRect().left;
        let maxWidth = 400; // in pixels
        if (maxWidth <= 0) return;
        maxWidth = Math.min(maxWidth, window.screen.width - left - 30);
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
})();
