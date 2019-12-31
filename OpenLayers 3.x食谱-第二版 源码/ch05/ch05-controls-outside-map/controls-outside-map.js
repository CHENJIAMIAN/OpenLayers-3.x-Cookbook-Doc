/**
 * Chapter 5
 * Placing controls outside the map
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 10,
        center: [4740318, 5344324]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ]
});

map.addControl(new ol.control.ScaleLine({
    target: document.getElementById('js-scale-line')
}));

var zoomToExtent = new ol.control.ZoomToExtent({
    extent: [4684596, 5306182, 4796041, 5382466]
});

zoomToExtent.setTarget('js-zoom-extent');

map.addControl(zoomToExtent);