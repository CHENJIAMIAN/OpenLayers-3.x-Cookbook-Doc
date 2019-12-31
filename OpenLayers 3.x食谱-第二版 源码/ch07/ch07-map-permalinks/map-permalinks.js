/**
 * Chapter 7
 * Making use of map permalinks
 *
 * Peter J Langley
 * http://www.codechewing.com
 *
 * e.g. #/view=-8726204,4937946,12z/controls=[zoom,attribution]
 */
var viewHashRegex = /view=([^z]+)/;
var controlHashRegex = /controls=\[(.+)\]/;
var defaultView = [-8726204, 4937946, 12];
var view, viewArray, controls, controlsArray;

var map = new ol.Map({
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'terrain'
            })
        })
    ],
    controls: []
});

if (window.location.hash) {
    view = window.location.hash.match(viewHashRegex);
    controls = window.location.hash.match(controlHashRegex);

    if (view) {
        viewArray = view[1].split(',');

        if (viewArray.length === 3) {
            defaultView[0] = viewArray[0];
            defaultView[1] = viewArray[1];
            defaultView[2] = viewArray[2];
        }
    }

    if (controls) {
        controlsArray = controls[1].split(',');
        controlsArray.forEach(function (control) {
            var name = control.charAt(0).toUpperCase() + control.slice(1);

            if (typeof ol.control[name] === 'function') {
                map.addControl(new ol.control[name]());
            }
        })
    }
}

map.setView(new ol.View({
    center: [defaultView[0], defaultView[1]],
    zoom: defaultView[2]
}));

map.getView().on(['change:center', 'change:resolution'], function() {
    window.location.hash = window.location.hash.replace(
        viewHashRegex, 'view=' + this.getCenter().join(',') + ',' + this.getZoom()
    );
});