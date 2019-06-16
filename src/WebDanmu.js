function WebDanmu(div, position, duration) {
    div.style.opacity = '0';
    div.style.position = 'absolute';
    div.style.textShadow = '#000 0 0 2px';
    div.style.fontWeight = 'bold';
    div.style.fontFamily = '黑体, sans-serif';
    div.style.whiteSpace = 'nowrap';
    this.div = div;
    this.position = position || 0;
    this.duration = duration || 5;
    this.width = NaN;
    this.height = NaN;
    this.time = NaN;
}
