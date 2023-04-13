import { randomWalk } from "./moveFunctions.mjs";
import { Controller } from "./controller.mjs";
import { Rectangle } from "./rectangle.mjs";

let controller = new Controller();

const side_size = 21;

controller.initMap(side_size,side_size);

controller.addRobot(0, {"row":1, "col":1}, randomWalk);

//controller.getMapObj().printMap();
const canvas = document.querySelector('canvas');
canvas.width = 120*side_size;
canvas.height = 120*side_size;

function updateVisual() {
    controller.doRobotMovement();
    drawMap();
}

function drawMap() {

    let map = controller.getMapObj().getMap();

    const cellSide = 120*side_size/side_size/2;
    var ctx = canvas.getContext('2d');
    for (let row = 0; row < side_size; row++) {
        for (let col = 0; col < side_size; col++) {
            
            let rect = new Rectangle(row, col, cellSide, map, ctx);
            rect.drawRectangle();
        }
    }
}

setInterval(updateVisual, controller.delay);