/**
 * Chapter 4
 * Implementing a work in progress indicator for map layers
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var rasterSource = new ol.source.MapQuest({layer: 'sat'});
var progressBar = document.getElementById('js-progress-bar');
var tilesLoaded = 0;
var tilesPending = 0;

rasterSource.on(['tileloadend', 'tileloaderror'], function() {
    ++tilesLoaded;
    var percentage = Math.round(tilesLoaded / tilesPending * 100);
    progressBar.style.width = percentage + '%';

    if (percentage >= 100) {
        setTimeout(function() {
            progressBar.parentNode.style.opacity = 0;
            progressBar.style.width = 0;
            tilesLoaded = 0;
            tilesPending = 0;
        }, 600);
    }
});

rasterSource.on('tileloadstart', function() {
    progressBar.parentNode.style.opacity = 1;
    ++tilesPending;
});

new ol.Map({
    view: new ol.View({
        zoom: 5,
        center: [-6291073, -1027313]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: rasterSource
        })
    ]
});