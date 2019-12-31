/**
 * Chapter 7
 * Working with projections
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
proj4.defs(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 ' +
    '+k=0.9996012717 +x_0=400000 +y_0=-100000 ' +
    '+ellps=airy ' +
    '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 '
    + '+units=m +no_defs'
);

var extent = ol.proj.transformExtent(
    [-8.74, 49.81, 1.84, 60.9],
    'EPSG:4326', 'EPSG:3857'
);

var map = new ol.Map({
    view: new ol.View({
        zoom: 8,
        center: [-177333, 6626173],
        extent: extent
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ]
});

var coordXElem = document.getElementById('js-coordX');
var coordYElem = document.getElementById('js-coordY');

map.on('click', function(event) {
    var coordinate = ol.proj.transform(
        event.coordinate,
        'EPSG:3857', 'EPSG:27700'
    );

    coordXElem.innerHTML = coordinate[0].toFixed(5);
    coordYElem.innerHTML = coordinate[1].toFixed(5);
});