/**
 * Chapter 2
 * Buffering the layer data to improve the map navigation
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var view = new ol.View({
    zoom: 5,
    center: [1252000, 7240000]
});

new ol.Map({
    view: view,
    target: 'js-map-preload',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'watercolor'
            }),
            preload: Infinity
        })
    ]
});

new ol.Map({
    view: view,
    target: 'js-map-no-preload',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({
                layer: 'osm'
            })
        })
    ]
});