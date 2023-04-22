/**
 * Frontend controller
 * @author: Zaneta Grossova <xgross11>, Vojtech Fiala <xfiala61>
 */

import { printMap } from '../frontend/printMap.mjs';
import { Controller } from "../backend/controller.mjs"
import { randomWalk, wallTurn, rightHand, leftHand, wallBounce } from "../backend/moveFunctions.mjs"

const controller = new Controller();

let map = null;
let pauseFlag = false;

const map_canvas = document.getElementById("mapCanvas");
const map_canvas_context = map_canvas.getContext('2d');

var moveMethod = randomWalk;
 
window.addEventListener('DOMContentLoaded', (event) => {

    let createMapButton = document.getElementById("createMapButton");
    let exportMapButton = document.getElementById("exportMapButton");
    let loadMapButton = document.getElementById("loadMapButton");
    let pauseButton = document.getElementById("pauseButton");
    let playButton = document.getElementById("unpauseButton");
    let killButton = document.getElementById("killButton");
    let delay = document.getElementById("form_delay");
    let movementOptions = document.getElementById("movements");

    // dynamic canvas size based on size of the screen
    map_canvas.width  = window.innerHeight/1.15;
    map_canvas.height = window.innerHeight/1.15;

    let robots = 0;

    //listener for button for creating map
    createMapButton.addEventListener("click", function(){
        remove_messages();
        robots = 0;
        var width = document.getElementById('form_width').value;
        var height = document.getElementById('form_height').value;
        // delete existing robots
        controller.deleteAllRobots();
        controller.setRobots([]);

        if(check_values(width, height)) {
            map_canvas_context.clearRect(0, 0, map_canvas.width, map_canvas.height); // clear the original canvas before drawing a new one
            controller.initMap(height,width);
            map = controller.getMapObj()
            printMap(height, width, map_canvas, map_canvas_context, controller);
            setCanvasSize(width, height);
        }
    });

    // listenen to pause button click
    pauseButton.addEventListener("click", () => {
        pauseFlag = true;
        controller.setDelay(86400); // pause = wait 1 day, smart innit
    });

    // listen to play button click
    playButton.addEventListener("click", () => {
        if (pauseFlag) { // only create new timeout if its set to pause, otherwise it could get reeeealy fast
            pauseFlag = false;
            // use original value... unfortunately, this means creating a new timeout, but noone will have the page open for one whole day or misuse it, right? RIGHT?!
            setTimeout(timeOutCallback, controller.setDelay(delay.value));
        }
    });

    // listen to kill all robots button click
    killButton.addEventListener("click", () => {
        robots = 0;
        controller.deleteAllRobots();
        printMap(map.height, map.width, map_canvas, map_canvas_context, controller);
    });

    // listen to change of delay value
    delay.addEventListener("change", () => {
        remove_messages();
        if (check_delay(parseInt(delay.value))) { // delay is valid
            document.getElementById("delayResponse").innerHTML = "Delay set!";
            controller.setDelay(delay.value);
            setTimeout(remove_messages, 3000);
        }
        else { // delay is invalid
            document.getElementById("delayResponse").innerHTML = "Invalid delay value Choose between 50-5000!";
            setTimeout(remove_messages, 3000);
        }
    });

    // listener to change movement function
    movementOptions.addEventListener("change", () => {
        remove_messages();
        let selected = movementOptions.value;
        if (selected === "wallTurn")
            moveMethod = wallTurn;
        else if (selected === "wallBounce")
            moveMethod = wallBounce;
        else if (selected === "rightHand") 
            moveMethod = rightHand;
        else if (selected === "leftHand")
            moveMethod = leftHand;
        else if (selected === "randomWalk")
            moveMethod = randomWalk;
    });

    // listener to export map button click
    exportMapButton.addEventListener("click", () => {
        let res = controller.exportMap();
        if (res){ // success exporting
            document.getElementById("mapStuffResponse").innerHTML = "Map has been successfully exported!";
            setTimeout(remove_messages, 3000);
        }
        else{  // error exporting
            document.getElementById("mapStuffResponse").innerHTML = "Error while exporting the map! Please initialize the map first!";
            setTimeout(remove_messages, 3000);
        }
    });

    // listener to load map button click
    loadMapButton.addEventListener("click", () => {
        robots = 0;
        controller.setRobots([]);
        let res = controller.loadMap();
        if (res === false) {
            document.getElementById("mapStuffResponse").innerHTML = "Error while loading the map! No map saved!";
            setTimeout(remove_messages, 3000);
        }
        else {
            map = controller.getMapObj();
            map_canvas_context.clearRect(0, 0, map_canvas.width, map_canvas.height); // clear the original canvas before drawing a new one
            printMap(controller.getMapObj().getHeight(), controller.getMapObj().getWidth(), map_canvas, map_canvas_context, controller);
            document.getElementById("mapStuffResponse").innerHTML = "Map has been successfully loaded!";
            setTimeout(remove_messages, 3000);
            setCanvasSize(controller.getMapObj().getWidth(), controller.getMapObj().getHeight());
        }
    });

    // listener for mouse down events fired on the canvas
    map_canvas.addEventListener('mousedown', function(e) { 
        if (map == null) { return; } // if map is not initialized, return
        remove_messages();
        const canvasBound = map_canvas.getBoundingClientRect()
        const x = e.clientX - canvasBound.left
        const y = e.clientY - canvasBound.top

        let coords = getMapCoordinates(x, y);
        let coords_obj = {"row":coords.row, "col":coords.column};

        if (controller.getRobots().length <= 30) { // hard limit on max number of robots because when there's too much of them, bad stuff happens

            if (controller.getMapObj().getCoordsObject(coords_obj) === "0") {  // Remember, Robot can only be placed on a path, not on another robot or in a wall
                controller.addRobot(robots, coords_obj, moveMethod); // this throws an error if you can't place the robot on given coords
                console.log("robot number " + robots + " x: " + coords.row + " y: " + coords.column);
                robots++; // only increase robot ID count if we can
            }
            else if (controller.getMapObj().getCoordsObject(coords_obj) === "2") { // you clicked on a robot! poor lad, lets delete him
                controller.deleteRobotByCoords(coords_obj);
                console.log("deleted robot on coords x: " + coords.row + " y: " + coords.column);
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

    // listens to resizing of the screen to dynamically resize canvas
    window.addEventListener("resize", function() {
        if (map != null) {
            map_canvas.width  = window.innerHeight/1.15;
            map_canvas.height = window.innerHeight/1.15;
            setCanvasSize(map.width, map.height);
            printMap(map.height, map.width, map_canvas, map_canvas_context, controller);
        }
    });
    
});

/**
 * Function to remove written info messages
 */
function remove_messages() {
    document.getElementById("mapStuffResponse").innerHTML = ""; // when you click on the map, remove info about loading/exporting the map
    document.getElementById("delayResponse").innerHTML = "";
}

/**
 * Function to check if width and height of the map seems ok
 * @param {int} width - Width of the map
 * @param {int} height - Height of hte map
 * @returns {bool} true if given values are ok, false if not
 */
function check_values(width, height) {
    if(width % 2 === 1 && height % 2 === 1 && width <= 121 && width >= 3 && height <= 121 && height >= 3) 
        return true;
    else {
        alert("Width and height both have to be an odd number!");
        return false;
    }
}

/**
 * Function to check if given delay is A-okay
 * @param {int} delay 
 * @returns {Boolean} Truth value based on if the delay value is okay
 */
function check_delay(delay) {
    return (delay >= 50 && delay <= 5000);
}

/**
 * Function to compute given mouse click coordinates to column and row indexes
 * @param {int} mouseX x coordinate of mouse click
 * @param {int} mouseY y coordinate of mouse click
 * @returns {Object} Object with row and col coordinates of mouse click
 */
function getMapCoordinates(mouseX, mouseY) {
    let column = mouseX/(map_canvas.width/map.width)|0;
    let row = mouseY/(map_canvas.height/map.height)|0;
    return {"column" : column, "row" : row};
}

/**
 * Function to compute given mouse click coordinates to column and row indexes
 * @param {int} width width of map inputted by user
 * @param {int} height height of map inputted by user
 */
function setCanvasSize(width, height) {
    map_canvas.width  = window.innerHeight/1.15;
    map_canvas.height = window.innerHeight/1.15;
    const cellWidth = map_canvas.width/width;
    const cellHeight = map_canvas.height/height;
    let cellSize = 0;

    if(cellHeight > cellWidth) {
        cellSize = cellWidth;
    } else {
        cellSize = cellHeight;
    }

    map_canvas.width  = cellSize * width;
    map_canvas.height = cellSize * height;
}

/**
 * Callback function for timeout, that manage to periodically refresh map
 */
function timeOutCallback() {
    if (map !== null) {
        controller.doRobotMovement(); 
        printMap(map.height, map.width, map_canvas, map_canvas_context, controller);
    }
    setTimeout(timeOutCallback, controller.getDelay()); // recursively  create a new timeout
}
// this MUST be done only once, otherwise if I did this every time I add a robot, it wouldnt end well ( a new counter would be made each time)
setTimeout(timeOutCallback, controller.getDelay());
