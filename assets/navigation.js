/*
 * Copyright (c) 2019. Karel Koudelka, all rights reserved
 */

$(document).ready(function () {
    let shiftPressed = false;
    let controlPressed = false;
    let lastMousePosition = null;

    $('#draggable').draggable();


    /*
    * Zoom
    */
    $(window).bind('mousewheel', function (event) {
        let zoomX = Math.abs(Math.abs(Math.cbrt((window.simulus.chart.options.axisX.maximum-1) + (window.simulus.chart.options.axisX.maximum-1)))/10);
        let zoomY = Math.abs(Math.abs(Math.cbrt((window.simulus.chart.options.axisY.maximum-1) + (window.simulus.chart.options.axisY.maximum-1)))/10);
        if (event.originalEvent.wheelDelta >= 0) {
            if (shiftPressed) {
                if ((window.simulus.chart.options.axisY.maximum - zoomY) + (window.simulus.chart.options.axisY.maximum + zoomY) > 0) {

                    window.simulus.chart.options.axisY.minimum += zoomY;
                    window.simulus.chart.options.axisY.maximum -= zoomY;
                }

            } else {

                if ((window.simulus.chart.options.axisX.maximum - zoomX) + (window.simulus.chart.options.axisX.maximum + zoomX) > 0) {
                    window.simulus.chart.options.axisX.minimum += zoomX;
                    window.simulus.chart.options.axisX.maximum -= zoomX;
                }
            }
        } else {
            if (shiftPressed) {
                window.simulus.chart.options.axisY.minimum -= zoomY;
                window.simulus.chart.options.axisY.maximum += zoomY;
            } else {
                window.simulus.chart.options.axisX.minimum -= zoomX;
                window.simulus.chart.options.axisX.maximum += zoomX;
            }

        }
        window.simulus.chart.render();


    });


    $(document).keydown(function (e) {
        if (e.keyCode === 16) {
            shiftPressed = true;
        }
        if (e.keyCode === 17) {
            controlPressed = true;
        }
    }).keyup(function (e) {
        if (e.keyCode === 16) {
            shiftPressed = false;
        }
        if (e.keyCode === 17) {
            controlPressed = false;
            lastMousePosition = null;
        }
    });

    $('#navigation-modal').modal('show');


    /*
    * Moving axis
    */
    $(document).mousemove(function (event) {
        if (!controlPressed) return;
        if (lastMousePosition === null) {
            lastMousePosition = {
                x: event.pageX,
                y: event.pageY,
            };
            return;
        }
        if (lastMousePosition.x !== event.pageX) {
            let scaleDiv = 250;
            if ((window.simulus.chart.options.axisX.maximum - window.simulus.chart.options.axisX.minimum < 5)) scaleDiv = 600;
            const diffX = (lastMousePosition.x - event.pageX) / scaleDiv;
            window.simulus.chart.options.axisX.minimum += diffX;
            window.simulus.chart.options.axisX.maximum += diffX;
        }
        if (lastMousePosition.y !== event.pageY) {
            let scaleDiv = 100;
            if ((window.simulus.chart.options.axisY.maximum - window.simulus.chart.options.axisY.minimum < 8)) scaleDiv = 250;
            const diffY = (lastMousePosition.y - event.pageY) / scaleDiv;
            window.simulus.chart.options.axisY.minimum -= diffY;
            window.simulus.chart.options.axisY.maximum -= diffY;
        }


        lastMousePosition = {
            x: event.pageX,
            y: event.pageY,
        };
        window.simulus.chart.render();
    });

    $("#draggable").hover(
        function () {
            $(this).removeClass("transparent");
        }, function () {
            $(this).addClass("transparent");
        }
    );
})
;
