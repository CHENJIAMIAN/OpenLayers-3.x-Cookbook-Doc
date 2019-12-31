/**
 * Chapter 5
 * Getting information from a WMS server
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var bgsSource = new ol.source.TileWMS({
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
});

var map = new ol.Map({
    view: new ol.View({
        zoom: 7, center: [-146759, 7060335]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({source: new ol.source.OSM()}),
        new ol.layer.Tile({source: bgsSource})
    ]
});

var $featureInfo = $('#js-feature-info');

map.on('singleclick', function(event) {
    var url = bgsSource.getGetFeatureInfoUrl(
        event.coordinate,
        map.getView().getResolution(),
        map.getView().getProjection(),
        {INFO_FORMAT: 'text/html'}
    );

    $.ajax({
        type: 'GET',
        url: url
    }).done(function(data) {
        $featureInfo.html(data.match(/<body>([\s\S]+)<\/body>/)[1]);
        $featureInfo.find('table').addClass('table table-bordered table-condensed');
    });
});