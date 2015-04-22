// here's how you make the bookmarlet work on Wordpress
// this is the script.
// you inject this with:
//   <script type="text/javascript" src="/blog/wp-content/uploads/2013/07/hnBookmarklet.js"></script>
// in the blog post. The document.write happens right after the <script>.

// ideas for minification here: https://developers.google.com/speed/docs/insights/MinifyResources
// you used Closure Compiler to minify content.js.
// https://developers.google.com/closure/compiler/
// java -jar compiler.jar content.js
// also available online: http://closure-compiler.appspot.com/home
// 
// Then you replace single quotes with \' and double quotes with &quot;
// and then paste below.
// to see how the minifier works, there are beutifiers to de-minify:
// e.g., http://jsbeautifier.org/

// hacky way to get bookmarklets working in a Wordpress post
var style = ';padding: 1px 4px 2px; \
margin: 0 2px; \
-webkit-border-radius: 3px; \
-moz-border-radius: 3px; \
border-radius: 3px; \
font-weight: bold; \
line-height: 14px; \
text-decoration: none; \
color: white; \
white-space: nowrap; \
vertical-align: baseline; \
background-color: rgb(255, 102, 0);'

var js = 'javascript:(function(){var a=&quot;news.ycombinator.com&quot;===document.location.hostname,c=&quot;Poll:&quot;===document.title.substring(0,5);if(a&&c){c=document.getElementsByClassName(&quot;_hnpoll_bf08b84d-4439-4b9e-bb9b-bb20b96decdb&quot;);for(a=c.length-1;0<=a;a--){var b=c[a];b.parentElement.removeChild(b)}b=document.querySelectorAll(\'span[id^=&quot;score_&quot;]\');c=[];for(a=1;a<b.length;a++)c[a-1]=b[a];for(a=b=0;a<c.length;a++)var e=parseInt(c[a].textContent),b=Math.max(b,e);if(isFinite(b)&&0<b)for(a=0;a<c.length;a++){var f=c[a],e=parseInt(f.textContent),d=document.createElement(&quot;div&quot;);d.className=&quot;_hnpoll_bf08b84d-4439-4b9e-bb9b-bb20b96decdb&quot;;d.style.width=e/b*400+&quot;px&quot;;d.style.height=&quot;10px&quot;;d.style.background=&quot;#828282&quot;;d.style.marginTop=&quot;5px&quot;;f.parentNode.appendChild(d)}}})();';

// here's how you were doing it, prior to updates on 4/22/2015
//var js = 'javascript:(function(){if(document.title.substring(0,5)==&quot;Poll:&quot;){var e=document.querySelectorAll(\'span[id^=&quot;score_&quot;]\');var t=[];for(var \
n=1;n<e.length;n++){t[n-1]=e[n]}var r=0;for(var n=0;n<t.length;n++){var i=parseInt(t[n].textContent);r=Math.max(r,i)}if(isFinite(r)&&r>0){for(var n=0;n<t.length;n++){var s\
=t[n];var i=parseInt(s.textContent);var o=document.createElement(&quot;div&quot;);var u=&quot;400&quot;;o.style.width=i/r*u+&quot;px&quot;;o.style.height=&quot;10px&quot;;\
o.style.background=&quot;#828282&quot;;o.style.marginTop=&quot;5px&quot;;s.parentNode.appendChild(o)}}}})()';

document.write('<a style="' + style + '"; href="' + js + '">HnPollVis</a> Bookmarklet (drag the link to the browser bookmark area)');