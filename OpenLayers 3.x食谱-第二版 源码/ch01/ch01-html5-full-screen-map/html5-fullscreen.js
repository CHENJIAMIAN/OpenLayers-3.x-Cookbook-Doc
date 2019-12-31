/**
 * Chapter 1
 * Creating a simple HTML5 full screen map
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        center: [-15000, 6700000],
        zoom: 5
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    controls: ol.control.defaults().extend([
        new ol.control.FullScreen()
    ]),
    target: 'js-map'
});