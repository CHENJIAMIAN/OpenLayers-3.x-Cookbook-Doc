/**
 * Chapter 3
 * Creating a heat map
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 3,
        center: [-4187526, 4481044]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ]
});

map.addLayer(new ol.layer.Heatmap({
    source: new ol.source.Vector({
        url: 'users-online.json',
        format: new ol.format.GeoJSON({
            defaultDataProjection: 'EPSG:3857'
        })
    })
}));