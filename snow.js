//https://gist.github.com/paulirish/1579671
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// https://myrusakov.ru/padaushij-sneg-javascript.html
var SnowAnimation = (function() {
    function SnowAnimation(root) {
        this.root = root || document.body;
        this.els = [];
        this.timer = null;
    }

    SnowAnimation.prototype.stop = function() {
        var me = this;
        cancelAnimationFrame(this.timer);
        this.timer = null;
        this.els.forEach(function(el) {
            el.remove();
        });
        this.els = [];        
    }

    SnowAnimation.prototype.start = function() {
        // Максимальное количество снежинок
        var snowmax = 40;
        var snowcolor = new Array("#AAAACC", "#DDDDFF", "#CCCCDD", "#F3F3F3", "#F0FFFF");
        var snowtype = new Array("Arial Black", "Arial Narrow", "Times", "Comic Sans MS");
        var snowletter = "*";
        //Скорость 
        var sinkspeed = 0.5;
        //Максимальный размер снежинок
        var snowmaxsize = 30;
        //Минимальный размер снежинок
        var snowminsize = 8

        var snow = new Array();
        var marginbottom;
        var marginright;
        var timer;
        var i_snow = 0;
        var x_mv = new Array();
        var crds = new Array();
        var lftrght = new Array();
        var browserinfos = navigator.userAgent;
        var ie5 = document.all && document.getElementById && !browserinfos.match(/Opera/);
        var ns6 = document.getElementById && !document.all;
        var opera = browserinfos.match(/Opera/);

        function randommaker(range) {
            rand = Math.floor(range * Math.random());
            return rand;
        }

        function initsnow() {
            if (ie5 || opera) {
                marginbottom = document.body.clientHeight;
                marginright = document.body.clientWidth;
            } else if (ns6) {
                marginbottom = window.innerHeight;
                marginright = window.innerWidth;
            }
            var snowsizerange = snowmaxsize - snowminsize;
            for (i = 0; i <= snowmax; i++) {
                crds[i] = 0;
                lftrght[i] = Math.random() * 15;
                x_mv[i] = 0.03 + Math.random() / 10;
                snow[i] = document.getElementById("s" + i);
                snow[i].style.fontFamily = snowtype[randommaker(snowtype.length)];
                snow[i].size = randommaker(snowsizerange) + snowminsize;
                snow[i].style.fontSize = snow[i].size;
                snow[i].style.color = snowcolor[randommaker(snowcolor.length)];
                snow[i].sink = sinkspeed * snow[i].size / 5;
                snow[i].posx = randommaker(marginright - snow[i].size);
                snow[i].posy = randommaker(2 * marginbottom - marginbottom - 2 * snow[i].size);
                snow[i].style.left = snow[i].posx + "px";
                snow[i].style.top = snow[i].posy + "px";
            }
            movesnow();
        }
        var me = this;

        function movesnow() {
            for (i = 0; i <= snowmax; i++) {
                crds[i] += x_mv[i];
                snow[i].posy += snow[i].sink;
                snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + "px";
                snow[i].style.top = snow[i].posy + "px";
                if (snow[i].posy >= marginbottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginright - 3 * lftrght[i])) {
                    snow[i].posx = randommaker(marginright - snow[i].size);
                    snow[i].posy = 0;
                }
            }
            me.timer = requestAnimationFrame(movesnow, 50);
        }

        for (i = 0; i <= snowmax; i++) {
            var el = document.createElement('span');
            el.id = 's' + i;
            el.className = 'snow-item';
            el.style.position = 'absolute';
            el.style.top = -1 * snowmaxsize + "px";
            el.innerHTML = snowletter;
            this.els.push(el);
            this.root.appendChild(el);
        }
        initsnow();
    }

    return SnowAnimation;
})();