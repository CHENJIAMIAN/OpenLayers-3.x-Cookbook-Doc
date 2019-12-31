/**
 * Chapter 4
 * Using keyboard pan/zoom
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var keyboardPan = new ol.interaction.KeyboardPan({
    duration: 90,
    pixelDelta: 256
});

var keyboardZoom = new ol.interaction.KeyboardZoom({
    duration: 90
});

new ol.Map({
    view: new ol.View({
        zoom: 10,
        center: [-12987415, 3851814]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({source: new ol.source.Stamen({
            layer: 'terrain'
        })})
    ],
    interactions: ol.interaction.defaults().extend([
        keyboardPan, keyboardZoom
    ]),
    keyboardEventTarget: document
});