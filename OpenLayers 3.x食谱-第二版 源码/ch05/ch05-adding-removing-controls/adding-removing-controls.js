/**
 * Chapter 5
 * Adding and removing controls
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var controls = [
    new ol.control.Attribution({collapsed: false}),
    new ol.control.FullScreen(),
    new ol.control.MousePosition(),
    new ol.control.OverviewMap({collapsed: false, collapsible: false}),
    new ol.control.Rotate({autoHide: false}),
    new ol.control.ScaleLine(),
    new ol.control.Zoom(),
    new ol.control.ZoomSlider(),
    new ol.control.ZoomToExtent()
];

var map = new ol.Map({
    view: new ol.View({
        zoom: 7,
        center: [3826743, 4325724]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'osm'})
        })
    ],
    controls: controls
});

var buttonList = document.getElementById('js-buttons');
var controlEnabledRegex = /btn-success/;

buttonList.addEventListener('click', function(event) {
    var element = event.target;

    if (element.nodeName === 'BUTTON') {
        if (controlEnabledRegex.test(element.className)) {
            map.getControls().forEach(function(control) {
                if (control instanceof ol.control[element.innerHTML]) {
                    map.removeControl(control);
                }
            });
            element.className = element.className.replace('btn-success', 'btn-default');

        } else {
            controls.forEach(function(control) {
                if (control instanceof ol.control[element.innerHTML]) {
                    map.addControl(control);
                }
            });
            element.className = element.className.replace('btn-default', 'btn-success');
        }
    }
});