(function(){
    if (document.title.substring(0,5) == "Poll:") {
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
