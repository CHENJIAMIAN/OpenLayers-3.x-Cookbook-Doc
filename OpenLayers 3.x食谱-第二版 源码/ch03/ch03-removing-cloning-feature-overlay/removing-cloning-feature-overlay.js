/**
 * Chapter 3
 * Removing or cloning features using overlays
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature(new ol.geom.Circle([2780119, 8437147], 900)),
            new ol.Feature(new ol.geom.Circle([2774826, 8433459], 850)),
            new ol.Feature(new ol.geom.Circle([2772686, 8438217], 999))
        ]
    })
});

var map = new ol.Map({
    view: new ol.View({
        zoom: 13,
        center: [2775906, 8433717]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'osm'})
        }),
        vectorLayer
    ]
});

var overlay = new ol.Overlay({
    element: document.getElementById('js-overlay')
});

map.addOverlay(overlay);
document.getElementById('js-overlay').style.display = 'block';

var selectedFeature;

var select = new ol.interaction.Select({
    condition: ol.events.condition.click,
    layers: [vectorLayer]
});
map.addInteraction(select);

select.on('select', function(event) {
    selectedFeature = event.selected[0];
    (selectedFeature) ?
        overlay.setPosition(selectedFeature.getGeometry().getCenter()) :
        overlay.setPosition(undefined);
});

document.getElementById('js-clone').addEventListener('click', function() {
    var circle = selectedFeature.clone();
    var circleGeometry = circle.getGeometry();
    var circleCenter = circleGeometry.getCenter();

    circleGeometry.setCenter([
        circleCenter[0] + circleGeometry.getRadius() * 2,
        circleCenter[1]
    ]);
    vectorLayer.getSource().addFeature(circle);
    overlay.setPosition(undefined);
    select.getFeatures().clear();
});

document.getElementById('js-remove').addEventListener('click', function() {
    vectorLayer.getSource().removeFeature(selectedFeature);
    overlay.setPosition(undefined);
    select.getFeatures().clear();
});