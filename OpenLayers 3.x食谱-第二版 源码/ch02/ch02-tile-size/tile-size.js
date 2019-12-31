/**
 * Chapter 2
 * Setting the tile size in WMS layers
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 0,
        maxZoom: 8,
        center: [-10439500, 4256000]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'toner-lite'
            })
        })
    ]
});

var view = map.getView();

var resolutions = [view.getResolution()];
for (var i = 1; i < 8; i++) {
    resolutions.push(resolutions[0] / Math.pow(2, i));
}

view.setZoom(4);

var tileGrid = new ol.tilegrid.TileGrid({
    extent: view.getProjection().getExtent(),
    resolutions: resolutions,
    tileSize: [512, 512]
});

map.addLayer(new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://gis.srh.noaa.gov/arcgis/services/NDFDTemps/MapServer/WMSServer',
        params: {
            LAYERS: 16
        },
        attributions: [
            new ol.Attribution({
                html: 'Data provided by the <a href="http://noaa.gov">NOAA</a>.'
            })
        ],
        tileGrid: tileGrid
    }),
    opacity: 0.50
}));