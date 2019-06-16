function WebDanmuPainter(wrapper) {
    this.wrapper = wrapper;
    this.wrapper.style.position = 'relative';
    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.left = '0';
    this.container.style.top = '0';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.fontSize = '0.8em';
    this.container.style.overflow = 'hidden';
    this.container.style.pointerEvents = 'none';
    this.resize();
    this.wrapper.appendChild(this.container);
    this.offsets = [0, 0, 0];
    this.danmakus = [];
    setInterval(this.paint.bind(this), 15);
}

WebDanmuPainter.prototype.resize = function () {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
};

WebDanmuPainter.prototype.now = function () {
    return Date.now() / 1000;
};

WebDanmuPainter.prototype.launch = function (danmu, delay) {
    danmu.div.style.left = this.width + 'px';
    this.container.appendChild(danmu.div);
    danmu.width = danmu.div.clientWidth;
    danmu.height = danmu.div.clientHeight;
    if (this.offsets[danmu.position] + danmu.height > this.height) {
        this.offsets[danmu.position] = 0;
    }
    switch (danmu.position) {
        case 0:
            danmu.div.style.left = this.width + 'px';
            break;
        case 1:
        case 2:
            danmu.div.style.left = ((this.width - danmu.width) / 2) + 'px';
            break;
    }
    switch (danmu.position) {
        case 0:
        case 1:
            danmu.div.style.top = this.offsets[danmu.position] + 'px';
            this.offsets[danmu.position] += danmu.height;
            break;
        case 2:
            this.offsets[danmu.position] += danmu.height;
            danmu.div.style.top = (this.height - this.offsets[danmu.position]) + 'px';
            break;
    }
    delay = delay || 0;
    danmu.time = this.now() + delay;
    this.danmakus.push(danmu);
};

WebDanmuPainter.prototype.paint = function () {
    var t = this.now();
    for (var i in this.danmakus) {
        var danmaku = this.danmakus[i];
        var dt = t - danmaku.time;
        if (dt > danmaku.duration) {
            switch (danmaku.position) {
                case 0:
                case 1:
                    if (danmaku.div.offsetTop < this.offsets[danmaku.position]) {
                        this.offsets[danmaku.position] = danmaku.div.offsetTop;
                    }
                    break;
                case 2:
                    var offset = this.height - (danmaku.div.offsetTop + danmaku.div.offsetHeight);
                    if (offset < this.offsets[danmaku.position]) {
                        this.offsets[danmaku.position] = offset;
                    }
                    break;
            }
            this.container.removeChild(danmaku.div);
            this.danmakus.splice(i, 1);
        } else if (dt >= 0) {
            danmaku.div.style.opacity = '';
            switch (danmaku.position) {
                case 0:
                    danmaku.div.style.left = (this.width - dt / danmaku.duration * (this.width + danmaku.width)) + 'px';
                    break;
                case 1:
                case 2:
                    danmaku.div.style.left = ((this.width - danmaku.width) / 2) + 'px';
                    break;
            }
        }
    }
};
