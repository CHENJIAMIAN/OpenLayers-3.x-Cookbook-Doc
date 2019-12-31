/**
 * Chapter 3
 * Reading and creating features from a WKT
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var wkt = [
    'POLYGON ((',
    '-8222044.493780339 4965922.635117188,',
    '-8217687.583168084 4967566.031225319,',
    '-8217572.927625656 4967527.812711176,',
    '-8216999.649913518 4967718.905281889,',
    '-8216082.405574095 4965616.887004048,',
    '-8218260.860880223 4964890.735235338,',
    '-8220324.660643922 4965349.357405049',
    '))'
];

var feature = new ol.format.WKT().readFeature(wkt.join(''));

var map = new ol.Map({
    view: new ol.View({
        zoom: 12,
        center: [-8224433, 4965464]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({layer: 'terrain'})
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [feature]
            })
        })
    ]
});

document.forms[0].addEventListener('submit', function(event) {
    event.preventDefault();

    var wktFormat = new ol.format.WKT();
    var features = map.getLayers().item(1).getSource().getFeatures();
    var wkt = wktFormat.writeFeatures(features);

    document.getElementById('js-textarea').value = wkt;
});