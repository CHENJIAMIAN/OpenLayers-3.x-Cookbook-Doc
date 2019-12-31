/**
 * Chapter 5
 * Drawing features across multiple vector layers
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var vectorLayer1 = new ol.layer.Vector({
    source: new ol.source.Vector()
});

var vectorLayer2 = new ol.layer.Vector({
    source: new ol.source.Vector()
});

var map = new ol.Map({
    view: new ol.View({
        zoom: 10,
        center: [-11863791, 3898899]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({ source: new ol.source.Stamen({
            layer: 'terrain'
        })}),
        vectorLayer1, vectorLayer2
    ]
});

var layerSelect = $('#js-layer-select');
var geomRadios = $('[name=geometries]');
var drawControl;

var updateDrawControl = function() {
    var geometryType = geomRadios.filter(':checked').val();

    map.removeInteraction(drawControl);

    if (geometryType === 'None') return;

    drawControl = new ol.interaction.Draw({
        type: geometryType,
        source: window[layerSelect.val()].getSource()
    });

    map.addInteraction(drawControl);
};

layerSelect.on('change', updateDrawControl);
geomRadios.on('change', updateDrawControl);