// here's how you make the bookmarlet work on Wordpress
// this is the script.
// you inject this with:
//   <script type="text/javascript" src="/blog/wp-content/uploads/2013/07/hnBookmarklet.js"></script>
// in the blog post. The document.write happens right after the <script>.

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

var js = 'javascript:!function(){var e=&quot;news.ycombinator.com&quot;===document.location.hostname,t=&quot;Poll:&quot;===document.title.substring(0,5);if(e&&t){for(var n\
=&quot;_hnpoll_bf08b84d-4439-4b9e-bb9b-bb20b96decdb&quot;,a=document.getElementsByClassName(n),o=a.length-1;o>=0;o--){var r=a[o];r.parentElement.removeChild(r)}for(var l=d\
ocument.querySelectorAll(\'span[id^=&quot;score_&quot;]\'),s=[],o=1;o<l.length;o++)s[o-1]=l[o];for(var i=0,o=0;o<s.length;o++){var d=parseInt(s[o].textContent);i=Math.max(\
i,d)}if(isFinite(i)&&i>0)for(var o=0;o<s.length;o++){var m=s[o],d=parseInt(m.textContent),c=document.createElement(&quot;div&quot;);c.className=n;var b=&quot;400&quot;;c.s\
tyle.width=d/i*b+&quot;px&quot;,c.style.height=&quot;10px&quot;,c.style.background=&quot;#828282&quot;,c.style.marginTop=&quot;5px&quot;,m.parentNode.appendChild(c)}}}();'

// here's how you were doing it, prior to updates on 4/22/2015
//var js = 'javascript:(function(){if(document.title.substring(0,5)==&quot;Poll:&quot;){var e=document.querySelectorAll(\'span[id^=&quot;score_&quot;]\');var t=[];for(var \
n=1;n<e.length;n++){t[n-1]=e[n]}var r=0;for(var n=0;n<t.length;n++){var i=parseInt(t[n].textContent);r=Math.max(r,i)}if(isFinite(r)&&r>0){for(var n=0;n<t.length;n++){var s\
=t[n];var i=parseInt(s.textContent);var o=document.createElement(&quot;div&quot;);var u=&quot;400&quot;;o.style.width=i/r*u+&quot;px&quot;;o.style.height=&quot;10px&quot;;\
o.style.background=&quot;#828282&quot;;o.style.marginTop=&quot;5px&quot;;s.parentNode.appendChild(o)}}}})()';

document.write('<a style="' + style + '"; href="' + js + '">HnPollVis</a> Bookmarklet (drag the link to the browser bookmark area)');