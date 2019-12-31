/**
 * Chapter 4
 * Creating a side-by-side map comparator
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var view = new ol.View({
    zoom: 5,
    center: [1252000, 7240000]
});

var map1 = new ol.Map({
    view: view,
    target: 'js-map1',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ]
});

var map2 = new ol.Map({
    view: view,
    target: 'js-map2',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({layer: 'watercolor'})
        })
    ]
});