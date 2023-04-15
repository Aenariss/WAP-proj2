import { printMap } from './printMap.mjs';
import { Controller } from "./controller.mjs"
import { randomWalk } from "./moveFunctions.mjs"

let controller = new Controller();

let map;
 
window.addEventListener('DOMContentLoaded', (event) =>{

    let map_canvas = document.getElementById("mapCanvas");
    let createMapButton = document.getElementById("createMapButton");

    let map_canvas_context = map_canvas.getContext('2d');

    // dynamic canvas size based on size of the screen
    map_canvas.width  = window.innerHeight/1.2;
    map_canvas.height = window.innerHeight/1.2;

    let robots = 0;

    createMapButton.addEventListener("click", function(){
        //TODO check width and height values
        var width = document.getElementById('form_width').value;
        var height = document.getElementById('form_height').value;
        if(check_values(width, height)) {
            controller.initMap(height,width);
            map = controller.getMapObj()
            printMap(height, width, map_canvas, map_canvas_context, controller);
        }
    });

    map_canvas.addEventListener('mousedown', function(e) { 
        const canvasBound = map_canvas.getBoundingClientRect()
        const x = e.clientX - canvasBound.left
        const y = e.clientY - canvasBound.top
        let coords = getMapCoordinates(x, y, map_canvas, controller.getMapObj().getWidth());
        robots++;
        controller.addRobot(robots, {"row":coords.y, "col":coords.x}, randomWalk);
        console.log("robot number " + robots + " x: " + coords.x + " y: " + coords.y)
        if(robots == 1) {
            setInterval( function() {
                controller.doRobotMovement();
                printMap(map.height, map.width, map_canvas, map_canvas_context, controller);
            }, controller.delay)
        }
        printMap(map.height, map.width, map_canvas, map_canvas_context, controller);
        
    });

    window.addEventListener("resize", function() {
        map_canvas.width  = window.innerHeight/1.2;
        map_canvas.height = window.innerHeight/1.2;

        printMap(map.height, map.width, map_canvas, map_canvas_context, controller);
    })
    
})

function check_values(width, height) {
    if(width == height) {
        if(width % 2 == 1) 
            return true;
        else {
            alert("Width and height has to odd!")
            return false
        }
    } else {
        alert("Width and height has to be equal numbers!");
        return false;
    }
}

function getMapCoordinates(mouseX, mouseY, map_canvas, width) {
    let x = mouseX/(map_canvas.width/width)|0
    let y = mouseY/(map_canvas.width/width)|0
    return {x, y}
}