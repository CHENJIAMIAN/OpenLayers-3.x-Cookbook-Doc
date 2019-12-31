/**
 * Chapter 3
 * Adding features from a WFS server
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 6,
        center: [-415817, 6790054]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
        })
    ]
});

var vectorSource = new ol.source.Vector({
    format: new ol.format.WFS(),
    url: function(extent, resolution, projection) {
        return [
            '/proxy?proxyHost=ogc.bgs.ac.uk',
            'proxyPath=/digmap625k_gsml32_cgi_gs/wfs?',
            'service=WFS',
            'version=1.1.0',
            'request=GetFeature',
            'typename=test:uk_625k_mapped_feature',
            'srsname=' + projection.getCode(),
            'bbox=' + extent.join(',') + ',' + projection.getCode(),
            'outputformat=gml3'
        ].join('&');
    },
    strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ()),
    attributions: [
        new ol.Attribution({
            html: 'Contains <a href="http://bgs.ac.uk/">British Geological Survey</a> ' +
            'materials &copy; NERC 2015'
        })
    ]
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    opacity: 0.4
});

map.addLayer(vectorLayer);