/**
 * Chapter 6
 * Styling interaction render intents
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
});

var map = new ol.Map({
    view: new ol.View({
        zoom: 11,
        center: [-8238306, 4987133]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({layer: 'toner'})
        }),
        vectorLayer
    ]
});

var imageCircle = function(radius) {
    return new ol.style.Circle({
        stroke: new ol.style.Stroke({
            color: 'red', width: 2
        }),
        radius: radius
    });
};

var drawInteraction = new ol.interaction.Draw({
    style: [
        new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(153, 202, 255, 0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 2,
                lineDash: [8, 10]
            }),
            image: imageCircle(15)
        }),
        new ol.style.Style({
            image: imageCircle(10)
        }),
        new ol.style.Style({
            image: imageCircle(5)
        })
    ],
    type: 'Polygon',
    source: vectorLayer.getSource()
});

var selectInteraction = new ol.interaction.Select({
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 31, 0.8)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 154, 31, 0.9)',
            width: 4
        })
    })
});

map.addInteraction(new ol.interaction.DragZoom());
map.addInteraction(drawInteraction);

document.getElementById('js-draw-or-select')
    .addEventListener('change', function() {
        var oldInteraction = (this.value === 'draw') ? 'select' : 'draw';
        map.removeInteraction(window[oldInteraction + 'Interaction']);
        map.addInteraction(window[this.value + 'Interaction']);
    });