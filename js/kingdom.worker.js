self.addEventListener('message',function(e){
    debugger
    self.postMessage('done')

    for(; idx < len; idx++) {
        var child = this.children[idx];
        element.appendChild(child.generate())
    }

    if(!!this.data)
        fragment.appendChild(element);

    return fragment;
}, false);
