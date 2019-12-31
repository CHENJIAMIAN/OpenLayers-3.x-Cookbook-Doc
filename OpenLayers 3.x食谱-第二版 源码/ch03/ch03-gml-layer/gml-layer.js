/**
 * Chapter 3
 * Adding a GML layer
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 4,
        center: [-7494000, 2240000]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({
                layer: 'osm'
            })
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector({
                url: 'bermuda-triangle.gml',
                format: new ol.format.GML2()
            })
        })
    ]
});