/**
 * Chapter 3
 * Using the cluster strategy
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 4,
        center: [2152466, 5850795]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
        })
    ]
});

// from http://stackoverflow.com/questions/1527803/
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var features = [];
var numberOfFeatures = 0;

while(numberOfFeatures < 100) {
    var point = new ol.geom.Point([
        getRandomInt(1545862, 2568284),
        getRandomInt(6102732, 7154505)
    ]);

    features.push(new ol.Feature(point));
    numberOfFeatures++;
}

var getStyle = function(feature) {
    var length = feature.get('features').length;
    return [
       new ol.style.Style({
           image: new ol.style.Circle({
               radius: Math.min(
                   Math.max(length * 1.2, 15), 20
               ),
               fill: new ol.style.Fill({
                   color: [0, 204, 0, 0.6]
               })
           }),
           text: new ol.style.Text({
               text: length.toString(),
               fill: new ol.style.Fill({
                   color: 'white'
               }),
               stroke: new ol.style.Stroke({
                   color: [0, 51, 0, 1],
                   width: 1
               }),
               font: '10px "Helvetica Neue", Arial'
           })
       })
    ];
};

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Cluster({
        distance: 25,
        source: new ol.source.Vector({
            features: features
        })
    }),
    style: getStyle
});

map.addLayer(vectorLayer);