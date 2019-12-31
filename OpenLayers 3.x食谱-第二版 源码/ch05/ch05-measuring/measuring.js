/**
 * Chapter 5
 * Measuring distances and areas
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
});

var map = new ol.Map({
    view: new ol.View({
        zoom: 15,
        center: [-13610530, 4555374]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({ source: new ol.source.Stamen({
            layer: 'terrain'
        })}),
        vectorLayer
    ]
});

var measurementRadios = $('[type=radio]');
var resultElement = $('#js-result');
var measuringTool;

var enableMeasuringTool = function() {
    map.removeInteraction(measuringTool);

    var geometryType = measurementRadios.filter(':checked').val();
    var html = geometryType === 'Polygon' ? '<sup>2</sup>' : '';

    measuringTool = new ol.interaction.Draw({
        type: geometryType,
        source: vectorLayer.getSource()
    });

    measuringTool.on('drawstart', function(event) {
        vectorLayer.getSource().clear();

        event.feature.on('change', function(event) {
            var measurement = geometryType === 'Polygon'
                ? event.target.getGeometry().getArea()
                : event.target.getGeometry().getLength();

            var measurementFormatted = measurement > 100
                ? (measurement / 1000).toFixed(2) + 'km'
                : measurement.toFixed(2) + 'm';

            resultElement.html(measurementFormatted + html);
        });
    });

    map.addInteraction(measuringTool);
};

measurementRadios.on('change', enableMeasuringTool);

enableMeasuringTool();