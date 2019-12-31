/**
 * Chapter 6
 * Styling based on feature attributes
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 4,
        center: [-10987364, 4109254]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
        })
    ]
});

var searchQueryElem = document.getElementById('js-search-query');

searchQueryElem.addEventListener('keyup', function() {
    vectorLayer.changed();
});

var styleFunction = function(feature) {
    var cityName = feature.get('name');
    var searchQuery = searchQueryElem.value;
    var opacity = 1;

    if (searchQuery &&
        cityName.search(new RegExp(searchQuery, 'i')) === -1) {
        opacity = 0.3;
    }

    return [
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 10,
                stroke: new ol.style.Stroke({
                    color: [74, 138, 168, opacity],
                    width: 2
                })
            }),
            text: new ol.style.Text({
                text: cityName,
                fill: new ol.style.Fill({
                    color: [255, 255, 255, opacity]
                }),
                stroke: new ol.style.Stroke({
                    color: [0, 51, 0, opacity],
                    width: 1
                }),
                font: '11px "Helvetica Neue", Arial'
            })
        })
    ];
};

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'cities.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: styleFunction
});

map.addLayer(vectorLayer);