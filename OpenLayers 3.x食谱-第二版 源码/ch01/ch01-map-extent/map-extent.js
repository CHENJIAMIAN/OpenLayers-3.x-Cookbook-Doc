/**
 * Chapter 1
 * Restricting the map extent
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var extent = ol.proj.transformExtent(
    [-125.0011, 24.9493, -66.9326, 49.5904],
    'EPSG:4326', 'EPSG:3857'
);

new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'watercolor'
            })
        }),
        new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'terrain-labels'
            }),
            extent: extent
        })
    ],
    target: 'js-map',
    view: new ol.View({
        zoom: 6,
        minZoom: 5,
        center: [-12100000, 3400000],
        extent: extent
    })
});