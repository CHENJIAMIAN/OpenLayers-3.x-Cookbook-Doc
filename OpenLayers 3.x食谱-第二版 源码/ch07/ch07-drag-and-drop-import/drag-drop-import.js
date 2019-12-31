/**
 * Chapter 7
 * Adding features to vector layer with drag & drop
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var map = new ol.Map({
    view: new ol.View({
        zoom: 6,
        center: [13484714, -266612]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ]
});

var dragDrop = new ol.interaction.DragAndDrop({
    formatConstructors: [ol.format.GeoJSON]
});
map.addInteraction(dragDrop);

$('#js-confirmed').on('click', function() {
    var vectorSource = new ol.source.Vector({
        features: featuresToImport
    });

    map.addLayer(new ol.layer.Vector({
        source: vectorSource
    }));

    map.getView().fit(
        vectorSource.getExtent(),
        map.getSize()
    );
});

var featuresToImport;

dragDrop.on('addfeatures', function(event) {
    featuresToImport = event.features;

    $('#js-filename').text(event.file.name);
    $('#js-count').text(featuresToImport.length);

    $('#js-modal').modal();
});