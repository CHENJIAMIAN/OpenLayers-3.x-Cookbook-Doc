/**
 * Chapter 2
 * Creating an image layer
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var extent = [-93941, 6650480, 64589, 6766970];

var map = new ol.Map({
    view: new ol.View({
        zoom: 10,
        center: ol.extent.getCenter(extent)
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'toner'
            })
        })
    ]
});

map.addLayer(new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: 'http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms',
        params: {
            LAYERS: 'BGS_EN_Bedrock_and_Superficial_Geology'
        },
        attributions: [
            new ol.Attribution({
                html: 'Contains <a href="http://bgs.ac.uk">British Geological Survey</a> ' +
                      'materials &copy; NERC 2015'
            })
        ]
    }),
    opacity: 0.7,
    extent: extent
}));