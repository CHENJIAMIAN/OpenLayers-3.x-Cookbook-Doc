/**
 * Chapter 3
 * Adding KML layer
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 16,
        center: [3465642, 3500474]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
            opacity: 0.4
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector({
                url: 'egypt-pyramids.kml',
                format: new ol.format.KML()
            })
        })
    ]
});