/**
 * Chapter 2
 * Changing the zoom effect
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 5,
        center: [9686000, 1707000]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM({
                attributions: [
                    new ol.Attribution({
                        html: 'Tiles courtesy of ' +
                        '<a href="http://hot.openstreetmap.org">' +
                        'Humanitarian OpenStreetMap Team</a>'
                    }),
                    ol.source.OSM.ATTRIBUTION
                ],
                url: 'http://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            })
        })
    ]
});

var easingSelect = document.getElementById('js-zoom-effect');
var durationSelect = document.getElementById('js-zoom-speed');
var bounceSelect = document.getElementById('js-bounce');

map.getView().on('change:resolution', function(event) {
    if (bounceSelect.value === 'true') {
        map.beforeRender(ol.animation.bounce({
            resolution: map.getView().getResolution() * 1.5,
            duration: parseInt(durationSelect.value, 10)
        }));
    } else {
        map.beforeRender(ol.animation.zoom({
            resolution: event.oldValue,
            duration: parseInt(durationSelect.value, 10),
            easing: ol.easing[easingSelect.value]
        }));
    }
});