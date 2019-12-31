/**
 * Chapter 1
 * Managing map's stack layers
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({
                layer: 'sat'
            }),
            opacity: 0.5,
            zIndex: 1
        })
    ],
    view: new ol.View({
        zoom: 4,
        center: [2120000, 0]
    }),
    target: 'js-map'
});

var layerGroup = new ol.layer.Group({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({
                layer: 'osm'
            }),
            title: 'MapQuest OSM'
        }),
        new ol.layer.Tile({
            source: new ol.source.MapQuest({
                layer: 'hyb'
            }),
            title: 'MapQuest Hybrid',
            visible: false
        }),
        new ol.layer.Tile({
            source: new ol.source.OSM(),
            title: 'OpenStreetMap',
            visible: false
        })
    ],
    zIndex: 0
});

map.addLayer(layerGroup);

var $layersList = $('#js-layers');

layerGroup.getLayers().forEach(function(element, index, array) {
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