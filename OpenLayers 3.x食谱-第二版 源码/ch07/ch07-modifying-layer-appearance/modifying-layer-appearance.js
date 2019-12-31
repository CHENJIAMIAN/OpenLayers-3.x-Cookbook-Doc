/**
 * Chapter 7
 * Modifying Layer Appearance
 *
 * Peter J Langley
 * http://www.codechewing.com
 */
var selectElem = document.getElementById('js-colour');
selectElem.addEventListener('change', function() {
    raster.changed();
});

var goDarker = { enable: false, level: 0.1 };
document.getElementById('js-darker')
    .addEventListener('click', function() {
        goDarker.enable = true;
        raster.changed();
    });

var goLighter = { enable: false, level: 0.1 };
document.getElementById('js-lighter')
    .addEventListener('click', function() {
        goLighter.enable = true;
        raster.changed();
    });

var raster = new ol.source.Raster({
    sources: [
        new ol.source.Stamen({
            layer: 'watercolor'
        })
    ],
    threads: 0,
    operation: function(pixels, data) {
        if (pixels[0][0] == 0 && pixels[0][1] == 0 && pixels[0][2] == 0) {
            return [0, 0, 0, 0];
        }

        var rgb = d3_color.rgb(
            pixels[0][0],
            pixels[0][1],
            pixels[0][2]
        );

        if (data.blackAndWhite) {
            var hcl = d3_color.hcl(rgb);
            hcl.c = 0;
            rgb = d3_color.rgb(hcl);
        }

        if (data.goDarker) {
            rgb = rgb.darker(data.level);
        }
        else if (data.goLighter) {
            rgb = rgb.brighter(data.level);
        }

        return [rgb.r, rgb.g, rgb.b, 255];
    }
});

raster.setAttributions(ol.source.Stamen.ATTRIBUTIONS);

raster.on(ol.source.RasterEventType.BEFOREOPERATIONS, function(event) {
    var data = event.data;
    data.blackAndWhite = selectElem.value === 'blackAndWhite';

    if (goDarker.enable) {
        data.goDarker = true;
        data.level = goDarker.level;
        goDarker.enable = false;
        goDarker.level += 0.1;
        goLighter.level -= 0.1;
    }
    else if (goLighter.enable) {
        data.goLighter = true;
        data.level = goLighter.level;
        goLighter.enable = false;
        goLighter.level += 0.1;
        goDarker.level -= 0.1;
    }
});

var map = new ol.Map({
    layers: [
        new ol.layer.Image({
            source: raster
        })
    ],
    target: 'js-map',
    view: new ol.View({
        center: [-4383204, 6985732],
        zoom: 3
    })
});