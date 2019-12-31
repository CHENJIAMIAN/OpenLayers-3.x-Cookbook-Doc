/**
 * Chapter 2
 * Using OpenStreetMap imagery
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 4,
        center: [4158174, 4392988]
    }),
    target: 'js-map'
});

map.addLayer(new ol.layer.Tile({
    source: new ol.source.OSM({
        attributions: [
            new ol.Attribution({
                html: 'Tiles courtesy of ' +
                '<a href="http://hot.openstreetmap.org">' +
                'Humanitarian OpenStreetMap Team</a>'
            }),
            ol.source.OSM.ATTRIBUTION
        ],
        url: 'http://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }),
    title: 'Humanitarian OSM'
}));

map.addLayer(new ol.layer.Tile({
    source: new ol.source.OSM({
        attributions: [
            new ol.Attribution({
                html: 'Tiles courtesy of ' +
                '<a href="http://www.mapquest.com/">MapQuest</a>' +
                '<img src="https://developer.mapquest.com/content/osm/mq_logo.png">'
            }),
            ol.source.OSM.ATTRIBUTION
        ],
        url: 'http://otile{1-3}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png'
    }),
    title: 'MapQuest OSM',
    visible: false
}));

map.addLayer(new ol.layer.Tile({
    source: new ol.source.OSM({
        attributions: [
            new ol.Attribution({
                html: 'Tiles courtesy of ' +
                '<a href="http://www.thunderforest.com">Andy Allan</a>'
            }),
            ol.source.OSM.ATTRIBUTION
        ],
        url: 'http://{a-c}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png'
    }),
    title: 'Transport Dark OSM',
    visible: false
}));

var $layersList = $('#js-layers');

map.getLayers().forEach(function(element) {
    var $li = $('<li />');
    $li.text(element.get('title'));
    $layersList.append($li);
});

$layersList.sortable({
    update: function() {
        var topLayer = $layersList.find('li:first-child').text();

        map.getLayers().forEach(function(element) {
            element.setVisible(element.get('title') === topLayer);
        });
    }
});