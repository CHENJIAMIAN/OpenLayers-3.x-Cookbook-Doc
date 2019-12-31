/**
 * Chapter 5
 * Working with geolocation
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var locationCircle = new ol.Feature();
var positionElem = document.getElementById('js-position');
var speedElem = document.getElementById('js-speed');
var altitudeElem = document.getElementById('js-altitude');
var headingElem = document.getElementById('js-heading');

var map = new ol.Map({
    view: new ol.View({
        zoom: 17,
        center: [10030840, 6731350]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [locationCircle]
            })
        })
    ]
});

new ol.Geolocation({
    projection: map.getView().getProjection(),
    tracking: true,
    trackingOptions: {
        enableHighAccuracy: true
    }
})
.on('change', function() {
    var position = this.getPosition();
    var speed = this.getSpeed();
    var altitude = this.getAltitude();
    var heading = this.getHeading();

    map.getView().setCenter(position);

    locationCircle.setGeometry(
        new ol.geom.Circle(position, 20)
    );

    positionElem.innerHTML = position.join(',<br>');
    speedElem.innerHTML = speed ? speed.toFixed(3) + ' m/s' : 'n/a';
    altitudeElem.innerHTML = altitude ? altitude.toFixed(3) + ' m' : 'n/a';
    headingElem.innerHTML = heading ? heading.toFixed(3) + ' degrees' : 'n/a';
});