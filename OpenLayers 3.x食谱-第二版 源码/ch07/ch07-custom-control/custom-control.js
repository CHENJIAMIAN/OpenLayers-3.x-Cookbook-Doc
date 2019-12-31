/**
 * Chapter 7
 * Creating a custom control
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var LayerSwitcher = function(options) {
    options = options || {};
    var className = options.className ? options.className : 'ol-layer-switcher';
    var cssClasses = className + ' ' + ol.css.CLASS_UNSELECTABLE + ' ' + ol.css.CLASS_CONTROL;
    var layers = options.layers;
    var list = document.createElement('ul');

    layers.forEach(function(layer, index, layers) {
        var li = document.createElement('li');
        li.setAttribute('data-layer-ref', ++index);
        li.innerHTML = 'Layer ' + index;

        if (index === layers.length) li.className = 'active';

        list.appendChild(li);
    });

    var controlDiv = goog.dom.createDom('div', cssClasses, list);

    controlDiv.addEventListener('click', function(event) {
        if (event.target.nodeName.toLowerCase() === 'li') {
            var itemNumber = parseInt(event.target.getAttribute('data-layer-ref'), 10);

            list.querySelector('.active').className = '';
            list.querySelector('[data-layer-ref="' + itemNumber + '"]').className = 'active';
            itemNumber--;

            layers.forEach(function(layer, index) {
                layers.item(index).setVisible(index === itemNumber);
            });
        }
    });

    ol.control.Control.call(this, {
        element: controlDiv
    });
};

ol.inherits(LayerSwitcher, ol.control.Control);

var map = new ol.Map({
    view: new ol.View({
        zoom: 10,
        center: [-12987415, 3851814]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({source: new ol.source.Stamen({
            layer: 'terrain'
        })}),
        new ol.layer.Tile({source: new ol.source.Stamen({
            layer: 'watercolor'
        })}),
        new ol.layer.Tile({source: new ol.source.Stamen({
            layer: 'toner'
        })})
    ]
});

map.addControl(new LayerSwitcher({
    layers: map.getLayers()
}));