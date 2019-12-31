/**
 * Chapter 3
 * Zooming to extent of layer
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var rasterLayer = new ol.layer.Tile({
    source: new ol.source.OSM({
        attributions: [
            new ol.Attribution({
                html: 'Tiles courtesy of ' +
                '<a href="http://www.thunderforest.com">Andy Allan</a>'
            }),
            ol.source.OSM.ATTRIBUTION
        ],
        url: 'http://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png'
    })
});

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature(new ol.geom.Circle([-376645, 7762876], 200)),
            new ol.Feature(new ol.geom.Circle([-375955, 7762195], 200)),
            new ol.Feature(new ol.geom.Circle([-376953, 7761632], 200))
        ]
    })
});

var map = new ol.Map({
    view: new ol.View({
        zoom: 11,
        center: [-372592, 7763536]
    }),
    target: 'js-map',
    layers: [rasterLayer, vectorLayer]
});

document.getElementById('js-zoom').addEventListener('click', function() {
    map.beforeRender(
        ol.animation.pan({
            source: map.getView().getCenter(),
            duration: 150
        }),
        ol.animation.zoom({
            resolution: map.getView().getResolution(),
            duration: 500,
            easing: ol.easing.easeIn
        })
    );

    map.getView().fit(
        vectorLayer.getSource().getExtent(), map.getSize()
    );
});