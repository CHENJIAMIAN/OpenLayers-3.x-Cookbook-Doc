/**
 * Chapter 1
 * Managing map's controls
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({
                layer: 'osm'
            })
        })
    ],
    view: new ol.View({
        center: [12930000, -78000],
        zoom: 3
    }),
    target: 'js-map',
    controls: []
});

var zoomControl = new ol.control.Zoom({
    zoomInTipLabel: 'Zoom closer in',
    zoomOutTipLabel: 'Zoom further out',
    className: 'ol-zoom custom-zoom-control'
});

var attributionControl = new ol.control.Attribution({
    collapsible: false,
    collapsed: false
});

var rotateControl = new ol.control.Rotate({
    autoHide: false
});

map.addControl(zoomControl);
map.addControl(attributionControl);
map.addControl(rotateControl);

$('#js-controls').on('change', function(event) {
    var target = $(event.target);
    var control = target.val();

    if (target.prop('checked')) {
        map.addControl(window[control]);
    } else {
        map.removeControl(window[control]);
    }
});