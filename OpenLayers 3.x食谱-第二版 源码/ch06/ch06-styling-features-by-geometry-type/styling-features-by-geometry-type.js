/**
 * Chapter 6
 * Styling features based on geometry type
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 4,
        center: [-10732981, 4676723]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'osm'})
        })
    ]
});

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        loader: function() {
            $.ajax({
                type: 'GET',
                url: 'features.geojson',
                context: this
            }).done(function(data) {
                var format = new ol.format.GeoJSON();
                var features = format.readFeatures(data);
                this.addFeatures(modifyFeatures(features));
            });
        }
    })
});

map.addLayer(vectorLayer);

function modifyFeatures(features) {
    features.forEach(function(feature) {
        var geometry = feature.getGeometry();
        geometry.transform('EPSG:4326', 'EPSG:3857');

        if (geometry.getType() === 'Point') {
            feature.setStyle(
                new ol.style.Style({
                    image: new ol.style.RegularShape({
                        fill: new ol.style.Fill({
                            color: [255, 0, 0, 0.6]
                        }),
                        stroke: new ol.style.Stroke({
                            width: 2,
                            color: 'blue'
                        }),
                        points: 5,
                        radius1: 25,
                        radius2: 12.5
                    })
                })
            );
        }

        if (geometry.getType() === 'LineString') {
            feature.setStyle(
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color:  [255, 255, 255, 1],
                        width: 3,
                        lineDash: [8, 6]
                    })
                })
            );
        }
    });
    return features;
}