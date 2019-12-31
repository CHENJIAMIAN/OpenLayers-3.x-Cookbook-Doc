/**
 * Chapter 7
 * Drawing in freehand mode
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 15,
        center: [-595501, 4320196]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector()
        })
    ]
});

var draw = new ol.interaction.Draw({
    source: map.getLayers().item(1).getSource(),
    type: 'Polygon'
});
map.addInteraction(draw);

draw.on('drawend', function(event) {
    var feature = event.feature;
    var convertTo = document.querySelector('[type="radio"]:checked').value;

    if (convertTo === 'rectangle') {
        feature.setGeometry(
            new ol.geom.Polygon.fromExtent(
                feature.getGeometry().getExtent()
            )
        );
    } else {
        var extent = feature.getGeometry().getExtent();
        var centre = ol.extent.getCenter(extent);
        var width = ol.extent.getTopRight(extent)[0] - ol.extent.getTopLeft(extent)[0];
        var radius = width / 2;

        feature.setGeometry(
            new ol.geom.Circle(centre, radius)
        );
    }
});