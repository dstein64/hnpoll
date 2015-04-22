(function(){
    var hackernews = document.location.hostname === "news.ycombinator.com";
    var poll = document.title.substring(0,5) === "Poll:";
    if (hackernews && poll) {
        var _class = '_hnpoll_bf08b84d-4439-4b9e-bb9b-bb20b96decdb';
        var bars = document.getElementsByClassName(_class);
        for (var i = bars.length-1; i >= 0 ; i--) {
            var e = bars[i];
            e.parentElement.removeChild(e);
        }
        
        var selected = document.querySelectorAll('span[id^="score_"]');
        var nodes = [];
        for (var i = 1; i < selected.length; i++) { 
            nodes[i-1] = selected[i];
        }
        var maxPoints = 0;
        for (var i = 0; i < nodes.length; i++) {
            var points = parseInt(nodes[i].textContent);
            maxPoints = Math.max(maxPoints,points);
        }
        if (isFinite(maxPoints) && maxPoints > 0) {
            for (var i = 0; i < nodes.length; i++) {
                var n = nodes[i];
                var points = parseInt(n.textContent);
                var bar = document.createElement('div');
                bar.className = _class;
                var maxWidth = '400'; // in pixels
                bar.style.width = ((points / maxPoints) * maxWidth) + 'px';
                bar.style.height = '10px';
                bar.style.background = '#828282';
                bar.style.marginTop = '5px';
                n.parentNode.appendChild(bar);
            }
        }
    }
})();
