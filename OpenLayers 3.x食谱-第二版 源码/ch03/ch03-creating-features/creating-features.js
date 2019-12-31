/**
 * Chapter 3
 * Creating features programmatically
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 3,
        center: [-2719935, 3385243]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'osm'})
        })
    ]
});

var point = new ol.Feature({
    geometry: new ol.geom.Point([-606604, 3228700])
});

var circle = new ol.Feature(
    new ol.geom.Circle([-391357, 4774562], 9e5)
);

var line = new ol.Feature(
    new ol.geom.LineString([
        [-371789, 6711782],
        [1624133, 4539747]
    ])
);

var polygon = new ol.Feature(
    new ol.geom.Polygon([[
        [606604, 4285365], [1506726, 3933143],
        [1252344, 3248267], [195678, 3248267]
    ]])
);

map.addLayer(new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [point, circle, line, polygon]
    })
}));