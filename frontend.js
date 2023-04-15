/**
 * Frontend control functions
 * @author: Zaneta Grossova <xgross11>, Vojtech Fiala <xfiala61>
 */

import { printMap } from './printMap.mjs';
import { Controller } from "./controller.mjs"
import { randomWalk, wallTurn, rightHand, leftHand, wallBounce } from "./moveFunctions.mjs"

const controller = new Controller();

let map = null;

const map_canvas = document.getElementById("mapCanvas");
const map_canvas_context = map_canvas.getContext('2d');
 
window.addEventListener('DOMContentLoaded', (event) => {

    let createMapButton = document.getElementById("createMapButton");

    // dynamic canvas size based on size of the screen
    map_canvas.width  = window.innerHeight/1.2;
    map_canvas.height = window.innerHeight/1.2;

    let robots = 0;

    createMapButton.addEventListener("click", function(){
        //TODO check width and height values
        robots = 0;
        var width = document.getElementById('form_width').value;
        var height = document.getElementById('form_height').value;
        // delete exzisting robots
        controller.setRobots([]);

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
        let coords_obj = {"row":coords.y, "col":coords.x};

        if (controller.getRobots().length <= 30) { // hard limit on max number of robots because when there's too much of them, bad stuff happens

            if (controller.getMapObj().getCoordsObject(coords_obj) === "0") {  // Remember, Robot can only be placed on a path, not on another robot or in a wall
                controller.addRobot(robots, coords_obj, wallBounce); // this throws an error if you can't place the robot on given coords
                console.log("robot number " + robots + " x: " + coords.x + " y: " + coords.y)
                robots++; // only increase robot ID count if we can
            }
            else if (controller.getMapObj().getCoordsObject(coords_obj) === "2") { // you clicked on a robot! poor lad, lets delete him
                controller.deleteRobotByCoords(coords_obj);
                console.log("deleted robot on coords x: " + coords.x + " y: " + coords.y);
                robots++; //incement ID anyway cuz why not
            }
            else {
                console.log("Trying to do something we shouldn't aren't we");
            }
        }
        else {
            console.log("Can't add another robot, there's too much of them already!")
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
    if(width === height) {
        if(width % 2 === 1) 
            return true;
        else {
            alert("Width and height has to odd!");
            return false;
        }
    } else {
        alert("Width and height has to be equal numbers!");
        return false;
    }
}

function getMapCoordinates(mouseX, mouseY, map_canvas, width) {
    let x = mouseX/(map_canvas.width/width)|0;
    let y = mouseY/(map_canvas.width/width)|0;
    return {x, y};
}

// this MUST be done only once, otherwise if I did this every time I add a robot, it wouldnt end well ( a new counter would be made each time)
setInterval( function() {
    if (map !== null) {
        controller.doRobotMovement(); 
        printMap(map.height, map.width, map_canvas, map_canvas_context, controller);
    }
}, controller.getDelay());