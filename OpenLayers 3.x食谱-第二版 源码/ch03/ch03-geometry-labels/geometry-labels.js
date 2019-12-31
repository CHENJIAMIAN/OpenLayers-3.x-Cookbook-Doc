/**
 * Chapter 3
 * Adding text label to geometry point
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 19,
        center: [-161669, 6609321]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ]
});

var createPoint = function(coords, resident) {
    var feature = new ol.Feature(new ol.geom.Point(coords));
    feature.set('resident', resident);
    return feature;
};

var getStyle = function(feature) {
    return [
        new ol.style.Style({
            text: new ol.style.Text({
                text: feature.get('resident'),
                fill: new ol.style.Fill({
                    color: '#333'
                }),
                stroke: new ol.style.Stroke({
                    color: [255, 255, 255, 0.8],
                    width: 2
                }),
                font: '26px "Helvetica Neue", Arial'
            }),
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: [255, 255, 255, 0.3]
                }),
                stroke: new ol.style.Stroke({
                    color: [51, 153, 204, 0.4],
                    width: 1.5
                }),
                radius: 15
            })
        })
    ];
};

map.addLayer(
    new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                createPoint([-161705, 6609398], 'Alanna'),
                createPoint([-161659, 6609371], 'Peter'),
                createPoint([-161732, 6609328], 'Paul')
            ]
        }),
        style: getStyle
    })
);