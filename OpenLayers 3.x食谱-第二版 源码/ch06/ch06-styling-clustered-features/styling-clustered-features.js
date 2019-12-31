/**
 * Chapter 6
 * Styling clustered features
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 5,
        center: [13565432, -577252]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({layer: 'watercolor'})
        })
    ]
});

var style1 = function(feature) {
    var length = feature.get('features').length;
    var styles = [
        new ol.style.Style({
            image: new ol.style.RegularShape({
                radius: 20,
                stroke: new ol.style.Stroke({
                    color: [1, 115, 54, 0.9],
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: [255, 255, 255, 0.3]
                }),
                points: 4
            }),
            text: new ol.style.Text({
                text: length.toString(),
                fill: new ol.style.Fill({
                    color: [1, 115, 54, 1]
                }),
                stroke: new ol.style.Stroke({
                    color: [255, 255, 255, 1],
                    width: 2
                }),
                font: '12px "Helvetica Neue", Arial',
                rotation: -0.3
            })
        })
    ];

    if (length > 15) {
        styles.push(new ol.style.Style({
            image: new ol.style.Icon({
                src: '../../assets/images/arrow-left.png',
                rotation: -0.3,
                scale: 1.2,
                anchor: [-0.2, 0.5]
            })
        }))
    }

    return styles;
};

var style2 = function(feature) {
    var length = feature.get('features').length;
    return [
        new ol.style.Style({
            image: new ol.style.RegularShape({
                radius: 20,
                stroke: new ol.style.Stroke({
                    color: [255, 188, 17, 0.9],
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: [173, 10, 43, 0.7]
                }),
                points: 3
            }),
            text: new ol.style.Text({
                text: length.toString(),
                fill: new ol.style.Fill({
                    color: 'white'
                }),
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 1],
                    width: 3
                }),
                font: '12px "Arial Black"',
                offsetY: 9
            })
        })
    ];
};

var createClusteredLayer = function(url, style) {
    return new ol.layer.Vector({
        source: new ol.source.Cluster({
            distance: 25,
            source: new ol.source.Vector({
                url: url,
                format: new ol.format.GeoJSON({
                    defaultDataProjection: 'EPSG:3857'
                })
            }),
            projection: 'EPSG:3857'
        }),
        style: style
    })
};

map.addLayer(createClusteredLayer('points1.geojson', style1));
map.addLayer(createClusteredLayer('points2.geojson', style2));