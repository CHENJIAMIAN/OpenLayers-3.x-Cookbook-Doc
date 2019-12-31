/**
 * Chapter 7
 * Transitioning between weather forecast imagery
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var proj4326 = ol.proj.get('EPSG:4326');
var proj4326Extent = proj4326.getExtent();
var size = ol.extent.getWidth(proj4326Extent) / 256;
var resolutions = [];
var matrixIds = [];
for (var z = 0; z < 11; ++z) {
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
}

var times = [];
var count = 0;

while (count <= 5) {
    var time = moment().startOf('hour');
    time.subtract(count, 'hour');
    times.push(time);
    count++;
}

var apiKey = 'your_api_key';

var createWMTSLayer = function(time) {
    return new ol.layer.Tile({
        opacity: 0.7,
        source: new ol.source.WMTS({
            attributions:  [new ol.Attribution({
                html: '<br>Contains public sector information licensed under the Open Government Licence from the ' +
                      '<a href="http://www.metoffice.gov.uk">Met Office</a>'
            })],
            url: 'http://datapoint.metoffice.gov.uk/public/data/inspire/view/wmts?key=' + apiKey + '&TileMatrix=EPSG:4326:6&time=' + time.format('YYYY-MM-DDTHH:00:00') + 'Z',
            layer: 'RADAR_UK_Composite_Highres',
            matrixSet: 'EPSG:4326',
            format: 'image/png',
            style: 'Bitmap 1km Blue-Pale blue gradient 0.01 to 32mm/hr',
            projection: proj4326,
            tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(proj4326Extent),
                resolutions: resolutions,
                matrixIds: matrixIds
            })
        })
    });
};

var map = new ol.Map({
    view: new ol.View({
        zoom: 6, minZoom: 6, maxZoom: 6,
        center: [-354667, 7254791]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({source: new ol.source.MapQuest({
            layer: 'osm'
        })}),
        createWMTSLayer(times[0])
    ]
});

var timeElem = document.getElementById('js-time');
timeElem.innerHTML = times[0].format('dddd Do MMM, ha');

var rotateCount = 1;
var oldLayer;
var newLayer;

var fadeAndRemoveLayer = function() {
    var opacity = oldLayer.getOpacity();

    if (opacity > 0) {
        oldLayer.setOpacity(opacity - 0.1);
        setTimeout(fadeAndRemoveLayer, 100);
    } else {
        map.removeLayer(oldLayer);
        timeElem.innerHTML = times[rotateCount].format('dddd Do MMM, ha');

        if (rotateCount !== times.length - 1) {
            rotateCount++;
        } else {
            rotateCount = 0;
        }

        setTimeout(rotate, 7000);
    }
};

var showLayer = function() {
    var opacity = newLayer.getOpacity();

    if (opacity < 0.7) {
        newLayer.setOpacity(opacity + 0.1);
        setTimeout(showLayer, 100);
    }
};

var rotate = function() {
    newLayer = createWMTSLayer(times[rotateCount]);
    newLayer.setOpacity(0);
    map.addLayer(newLayer);

    oldLayer = map.getLayers().item(1);

    setTimeout(function() {
        fadeAndRemoveLayer();
        showLayer();
    }, 3000);
};

setTimeout(rotate, 10000);