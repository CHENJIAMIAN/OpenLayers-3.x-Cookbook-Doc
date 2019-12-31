/**
 * Chapter 5
 * Getting feature information from a data source
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var vectorSource = new ol.source.Vector({
    url: 'geojson.json',
    format: new ol.format.GeoJSON({defaultDataProjection: 'EPSG:3857'})
});

var map = new ol.Map({
    view: new ol.View({
        zoom: 15, center: [872800, 6065125]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({source: new ol.source.OSM()}),
        new ol.layer.Vector({source: vectorSource})
    ]
});

var overlayElem = document.getElementById('js-overlay');
var featureRefElem = document.getElementById('js-ref');
var featureRestrictionsElem = document.getElementById('js-restrictions');

var overlay = new ol.Overlay({
    element: overlayElem
});

map.addOverlay(overlay);
overlayElem.style.display = 'block';

map.on('singleclick', function(event) {
    overlay.setPosition(undefined);
    var features = vectorSource.getFeaturesAtCoordinate(event.coordinate);

    if (features.length > 0) {
        overlay.setPosition(event.coordinate);
        featureRefElem.innerHTML = features[0].get('ref');
        featureRestrictionsElem.innerHTML = features[0].get('restrictions');
    }
});