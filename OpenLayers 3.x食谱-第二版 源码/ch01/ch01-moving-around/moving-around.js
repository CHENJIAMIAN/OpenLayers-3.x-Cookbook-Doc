/**
 * Chapter 1
 * Moving around the map view
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'watercolor'
            })
        })
    ],
    target: 'js-map',
    view: new ol.View({
        zoom: 6,
        center: ol.proj.fromLonLat([12.5, 41.9])
    })
});

var citySelect = document.getElementById('js-city');
var zoomInput = document.getElementById('js-zoom');
var rotateInput = document.getElementById('js-rotate');
var lonInput = document.getElementById('js-lon');
var latInput = document.getElementById('js-lat');

var updateUI = function(event) {
    var view = event && event.currentTarget || map.getView();
    zoomInput.value = view.getZoom();
    rotateInput.value = view.getRotation();

    var centerLonLat = ol.proj.toLonLat(view.getCenter());
    lonInput.value = centerLonLat[0].toFixed(3);
    latInput.value = centerLonLat[1].toFixed(3);
};
updateUI();

map.getView().on([
    'change:center',
    'change:resolution',
    'change:rotation'
], updateUI);

var setCenter = function(lon, lat) {
    map.getView().setCenter(ol.proj.fromLonLat([
        parseFloat(lon), parseFloat(lat)
    ]));
};

window.addEventListener('keyup', function(event) {
    switch(event.target.id) {
        case 'js-zoom':
            map.beforeRender(ol.animation.zoom({
                resolution: map.getView().getResolution(),
                duration: 150
            }));
            map.getView().setZoom(parseInt(event.target.value, 10));
            break;

        case 'js-rotate':
            map.beforeRender(ol.animation.rotate({
                rotation: map.getView().getRotation(),
                duration: 250
            }));
            map.getView().setRotation(parseFloat(event.target.value));
            break;

        case 'js-lon':
            setCenter(event.target.value, latInput.value);
            break;

        case 'js-lat':
            setCenter(lonInput.value, event.target.value);
            break;
    }
});

citySelect.addEventListener('change', function() {
    map.beforeRender(ol.animation.pan({
        source: map.getView().getCenter(),
        duration: 500
    }));
    setCenter.apply(null, this.value.split(','));
});