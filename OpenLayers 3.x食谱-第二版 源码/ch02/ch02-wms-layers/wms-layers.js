/**
 * Chapter 2
 * Adding WMS layer
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 4,
        center: [-10527519, 3160212]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ]
});

map.addLayer(new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://gis.srh.noaa.gov/arcgis/services/NDFDTemps/MapServer/WMSServer',
        params: {
            LAYERS: 16,
            FORMAT: 'image/png',
            TRANSPARENT: true
        },
        attributions: [
            new ol.Attribution({
                html: 'Data provided by the <a href="http://noaa.gov">NOAA</a>.'
            })
        ]
    }),
    opacity: 0.50
}));

map.addLayer(new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms',
        params: {
            LAYERS: 'BGS_EN_Bedrock_and_Superficial_Geology'
        },
        attributions: [
            new ol.Attribution({
                html: 'Contains <a href="http://bgs.ac.uk/">British Geological Survey</a> ' +
                      'materials &copy; NERC 2015'
            })
        ]
    }),
    opacity: 0.85
}));

document.getElementById('js-layers').addEventListener('change', function() {
    var values = this.value.split(',');
    var view = map.getView();
    view.setCenter([parseFloat(values[0]), parseFloat(values[1])]);
    view.setZoom(values[2]);
});