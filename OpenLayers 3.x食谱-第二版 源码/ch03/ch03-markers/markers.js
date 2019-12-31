/**
 * Chapter 3
 * Using point features as markers
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var createIconStyle = function(country) {
    return new ol.style.Style({
        image: new ol.style.Icon({
            src: '../../assets/images/flags/' + country + '.png'
        })
    })
};

var algeria = new ol.Feature(new ol.geom.Point([146759, 3297187]));
var libya = new ol.Feature(new ol.geom.Point([1927436, 3160212]));
var niger = new ol.Feature(new ol.geom.Point([968610, 1986139]));

algeria.setStyle(createIconStyle('algeria'));
libya.setStyle(createIconStyle('libya'));
niger.setStyle(createIconStyle('niger'));

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [algeria, libya, niger]
    })
});

var map = new ol.Map({
    view: new ol.View({
        zoom: 3,
        center: [1995923, -4167958]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'osm'})
        }),
        vectorLayer
    ]
});