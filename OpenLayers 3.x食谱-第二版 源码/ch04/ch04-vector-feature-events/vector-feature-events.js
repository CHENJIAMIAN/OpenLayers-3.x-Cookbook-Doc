/**
 * Chapter 4
 * Listening for vector layer feature events
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 4,
        center: [-10703629, 2984101]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({source: new ol.source.OSM()})
    ]
});

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'points.geojson',
        format: new ol.format.GeoJSON({defaultDataProjection: 'EPSG:3857'})
    })
});

var select = new ol.interaction.Select({
    condition: ol.events.condition.click,
    layers: [vectorLayer]
});
map.addInteraction(select);

select.on('select', function(event) {
    if (event.selected[0]) {
        vectorLayer.getSource().removeFeature(event.selected[0]);
        select.getFeatures().clear();
    }
});

var featureCount = document.getElementById('js-feature-count');

vectorLayer.getSource().on('addfeature', function(event) {
    event.feature.setStyle(new ol.style.Style({
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                color: event.feature.get('colour')
            }),
            stroke: new ol.style.Stroke({
                color: [0, 13, 51, 0.8],
                width: 2
            }),
            radius: event.feature.get('size')
        })
    }));
    featureCount.innerHTML = vectorLayer.getSource().getFeatures().length;
});

vectorLayer.getSource().on('removefeature', function() {
    featureCount.innerHTML = vectorLayer.getSource().getFeatures().length;
});

map.addLayer(vectorLayer);