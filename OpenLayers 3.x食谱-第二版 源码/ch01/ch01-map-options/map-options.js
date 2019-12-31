/**
 * Chapter 1
 * Playing with the map's options
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ]
});

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(2),
    projection: 'EPSG:4326'
});

map.addControl(mousePositionControl);
map.setTarget('js-map');

var view = new ol.View({
    zoom: 4,
    projection: 'EPSG:3857',
    maxZoom: 6,
    minZoom: 3,
    rotation: 0.34 // 20 degrees
});

view.setCenter([-10800000, 4510000]);

map.setView(view);