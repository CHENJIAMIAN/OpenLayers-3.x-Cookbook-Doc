/**
 * Chapter 2
 * Using Bing imagery
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 4,
        center: [2520000, 8570000]
    }),
    target: 'js-map'
});

var apiKey = 'your_api_key';

var layerGroup = new ol.layer.Group({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.BingMaps({
                key: apiKey,
                imagerySet: 'Aerial'
            }),
            title: 'Aerial'
        }),
        new ol.layer.Tile({
            source: new ol.source.BingMaps({
                key: apiKey,
                imagerySet: 'AerialWithLabels'
            }),
            title: 'AerialWithLabels',
            visible: false
        }),
        new ol.layer.Tile({
            source: new ol.source.BingMaps({
                key: apiKey,
                imagerySet: 'Road',
                culture: 'en-GB'
            }),
            title: 'Road',
            visible: false
        })
    ]
});

map.addLayer(layerGroup);

var $layersList = $('#js-layers');

layerGroup.getLayers().forEach(function(element) {
    var $li = $('<li />');
    $li.text(element.get('title'));
    $layersList.append($li);
});

$layersList.sortable({
    update: function() {
        var topLayer = $layersList.find('li:first-child').text();

        layerGroup.getLayers().forEach(function(element) {
            element.setVisible(element.get('title') === topLayer);
        });
    }
});