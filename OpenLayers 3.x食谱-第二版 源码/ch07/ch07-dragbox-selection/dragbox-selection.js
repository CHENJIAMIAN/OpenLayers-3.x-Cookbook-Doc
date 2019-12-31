/**
 * Chapter 7
 * Selecting features by dragging out a selection area
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 6, minZoom: 6, maxZoom: 6,
        center: [13484714, -266612]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({source: new ol.source.OSM()})
    ]
});

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'points.geojson',
        format: new ol.format.GeoJSON({
            defaultDataProjection: 'EPSG:3857'
        })
    })
});
map.addLayer(vectorLayer);

var selectedCount = document.getElementById('js-selected');
var deleteButton = document.getElementById('js-delete');

var select = new ol.interaction.Select();
map.addInteraction(select);
var dragbox = new ol.interaction.DragBox();
map.addInteraction(dragbox);

var reset = function() {
    select.getFeatures().clear();
    selectedCount.innerHTML = 0;
    deleteButton.setAttribute('disabled', 'disabled');
};

dragbox.on('boxstart', reset);

dragbox.on('boxend', function() {
    var extent = dragbox.getGeometry().getExtent();
    var count = 0;
    vectorLayer.getSource().forEachFeatureIntersectingExtent(extent, function(feature) {
        select.getFeatures().push(feature);
        count++;
    });
    selectedCount.innerHTML = count;

    if(count > 0) {
        deleteButton.removeAttribute('disabled');
    } else {
        deleteButton.setAttribute('disabled', 'disabled');
    }
});

deleteButton.addEventListener('click', function() {
    select.getFeatures().forEach(function(feature) {
        vectorLayer.getSource().removeFeature(feature);
    });
    reset();
});