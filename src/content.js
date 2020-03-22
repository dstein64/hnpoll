(function(){
    const hackernews = document.location.hostname === "news.ycombinator.com";
    const poll = document.title.substring(0,5) === "Poll:";
    if (hackernews && poll) {
        const _class = '_hnpoll_bf08b84d-4439-4b9e-bb9b-bb20b96decdb';
        const bars = document.getElementsByClassName(_class);
        for (let i = bars.length-1; i >= 0 ; i--) {
            const e = bars[i];
            e.parentElement.removeChild(e);
        }

        const selected = document.querySelectorAll('span[id^="score_"]');
        const nodes = [];
        for (let i = 1; i < selected.length; i++) {
            nodes[i-1] = selected[i];
        }
        let maxPoints = 0;
        for (let i = 0; i < nodes.length; i++) {
            const points = parseInt(nodes[i].textContent);
            maxPoints = Math.max(maxPoints,points);
        }
        if (isFinite(maxPoints) && maxPoints > 0) {
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                const points = parseInt(n.textContent);
                const bar = document.createElement('div');
                bar.className = _class;
                const maxWidth = '400'; // in pixels
                bar.style.width = ((points / maxPoints) * maxWidth) + 'px';
                bar.style.height = '10px';
                bar.style.background = '#828282';
                bar.style.marginTop = '5px';
                n.parentNode.appendChild(bar);
            }
        }
    }
})();
