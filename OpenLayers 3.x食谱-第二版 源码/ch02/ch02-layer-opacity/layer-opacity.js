/**
 * Chapter 2
 * Changing the layer opacity
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 8,
        center: [860000, 5558000]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'watercolor'
            })
        }),
        new ol.layer.Tile({
            source: new ol.source.OSM({
                attributions: [
                    new ol.Attribution({
                        html: 'Tiles courtesy of ' +
                        '<a href="http://www.thunderforest.com">Andy Allan</a>'
                    }),
                    ol.source.OSM.ATTRIBUTION
                ],
                url: 'http://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'
            })
        })
    ]
});

var $opacity = $('#js-opacity');

$('#js-slider').slider({
    min: 0,
    max: 100,
    value: 100,
    slide: function(event, ui) {
        $opacity.text(ui.value + '%');
        map.getLayers().item(1).setOpacity(ui.value / 100);
    }
});