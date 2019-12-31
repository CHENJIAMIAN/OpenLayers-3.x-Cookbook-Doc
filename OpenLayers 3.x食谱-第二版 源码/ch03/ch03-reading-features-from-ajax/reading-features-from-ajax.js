/**
 * Chapter 3
 * Reading features directly using AJAX
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 7,
        center: [-9039137, 3169996]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({layer: 'terrain'})
        })
    ]
});

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        loader: function() {
            $.ajax({
                type: 'GET',
                url: 'points.wkt',
                context: this
            }).done(function(data) {
                var format = new ol.format.WKT({splitCollection: true});
                this.addFeatures(format.readFeatures(data));
            });

            $.ajax({
                type: 'GET',
                url: 'polygons.json',
                context: this
            }).done(function(data) {
                var format = new ol.format.GeoJSON();
                this.addFeatures(format.readFeatures(data));
            });
        }
    })
});

map.addLayer(vectorLayer);