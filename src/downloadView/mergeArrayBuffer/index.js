
export default function concatArrayBuffers () {
    var buffers = Array.prototype.slice.call(arguments),
        buffersLengths = buffers.map(function(b) { return b.byteLength; }),
        totalBufferlength = buffersLengths.reduce(function(p, c) { return p+c; }, 0),
        unit8Arr = new Uint8Array(totalBufferlength);
    buffersLengths.reduce(function (p, c, i) {
        unit8Arr.set(new Uint8Array(buffers[i]), p);
        return p+c;
    }, 0);
    return unit8Arr.buffer;
};