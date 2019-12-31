/**
 * Chapter 6
 * Styling layers
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 10,
        center: [-12036691, 4697972]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'osm'})
        })
    ]
});

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'features.geojson',
        format: new ol.format.GeoJSON({defaultDataProjection: 'EPSG:3857'})
    })
});

var setStyles = function() {
    vectorLayer.setStyle(new ol.style.Style({
        stroke: strokeStyle(),
        fill: fillStyle(),
        image: new ol.style.Circle({
            fill: fillStyle(),
            stroke: strokeStyle(),
            radius: 8
        })
    }));
};

$('#js-stroke-width').slider({
    min: 1, max: 10, step: 1, value: 1,
    slide: function(event, ui) {
        $('#js-stroke-width-value').text(ui.value);
        setStyles();
    }
});

$('#js-fill-opacity').slider({
    min: 0, max: 100, step: 1, value: 50,
    slide: function(event, ui) {
        $('#js-fill-opacity-value').text(ui.value + '%');
        setStyles();
    }
});

$('#js-stroke-colour, #js-fill-colour').spectrum({
    color: 'black',
    change: setStyles
});

$('#js-stroke-style').on('change', setStyles);

var fillStyle = function() {
    var rgb = $('#js-fill-colour').spectrum('get').toRgb();
    return new ol.style.Fill({
        color: [
            rgb.r, rgb.g, rgb.b,
            $('#js-fill-opacity').slider('value') / 100
        ]
    });
};

var strokeStyle = function() {
    return new ol.style.Stroke({
        color: $('#js-stroke-colour').spectrum('get').toHexString(),
        width: $('#js-stroke-width').slider('value'),
        lineDash: $('#js-stroke-style').val() === 'solid' ? undefined : [8]
    });
};

setStyles();
map.addLayer(vectorLayer);