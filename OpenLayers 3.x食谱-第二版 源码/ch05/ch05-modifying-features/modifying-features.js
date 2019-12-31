/**
 * Chapter 5
 * Modifying features
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 10,
        center: [-12035468, 4686812]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({ source: new ol.source.Stamen({
            layer: 'terrain'
        })}),
        new ol.layer.Vector({
            editable: true,
            source: new ol.source.Vector({
                url: 'features.geojson',
                format: new ol.format.GeoJSON({defaultDataProjection: 'EPSG:3857'})
            })
        })
    ]
});

var select = new ol.interaction.Select({
    filter: function(feature, layer) {
        return layer.get('editable') &&
            /Polygon|LineString/.test(
                feature.getGeometry().getType()
            );
    },
    condition: ol.events.condition.click
});
map.addInteraction(select);

map.addInteraction(new ol.interaction.Modify({
    features: select.getFeatures()
}));

map.addInteraction(new ol.interaction.Translate({
    features: select.getFeatures()
}));