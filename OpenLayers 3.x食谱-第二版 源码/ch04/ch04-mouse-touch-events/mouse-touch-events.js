/**
 * Chapter 4
 * Listening for mouse/touch events
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var coords = document.getElementById('js-coords');
var pixels = document.getElementById('js-pixels');
var extent = document.getElementById('js-extent');

new ol.Map({
    view: new ol.View({
        zoom: 10,
        center: [-9016970, 4437475]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({source: new ol.source.Stamen({layer: 'terrain'})})
    ]
})
.on(['click', 'moveend'], function(event) {
    if (event.type === 'click') {
        coords.innerHTML = event.coordinate.join(',<br>');

        var pixelsAtCoords = event.map.getPixelFromCoordinate(event.coordinate);
        pixels.innerHTML = [
            pixelsAtCoords[0].toFixed(0),
            pixelsAtCoords[1].toFixed(0)
        ].join(', ');
    } else {
        extent.innerHTML = event.map.getView().calculateExtent(
            event.map.getSize()
        ).join(',<br>');
    }
});