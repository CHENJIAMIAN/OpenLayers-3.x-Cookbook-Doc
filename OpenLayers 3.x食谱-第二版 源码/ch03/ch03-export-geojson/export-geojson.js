/**
 * Chapter 3
 * Exporting features as GeoJSON
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 5,
        center: [2103547, 6538117]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'osm'})
        })
    ]
});

// from http://stackoverflow.com/questions/1527803/
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var features = [];
var numberOfFeatures = 0;

while(numberOfFeatures < 10) {
    var circle = new ol.geom.Circle(
        ol.proj.fromLonLat(
            [getRandomInt(14, 23), getRandomInt(48, 54)]
        ),
        getRandomInt(4, 15) * 10000
    );

    var polygonCircle = ol.geom.Polygon.fromCircle(circle);

    features.push(new ol.Feature(polygonCircle));
    numberOfFeatures++;
}

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: features
    })
});

map.addLayer(vectorLayer);

document.forms[0].addEventListener('submit', function(event) {
    event.preventDefault();

    var format = new ol.format.GeoJSON();
    var features = vectorLayer.getSource().getFeatures();
    var geoJson = format.writeFeatures(features);

    document.getElementById('js-textarea').value = geoJson;
});