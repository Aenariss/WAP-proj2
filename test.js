import { randomWalk } from "./moveFunctions.mjs"
import { Controller } from "./controller.mjs"

let controller = new Controller();
controller.initMap(5,5);


controller.addRobot(0, {"row":1, "col":1}, randomWalk);

controller.getMapObj().printMap();

controller.doRobotMovement();

// perhaps create a function that does the movement in a while loop and wrap it up in settimeout

setTimeout(function() { controller.getMapObj().printMap() }, 1500);