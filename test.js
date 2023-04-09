import { Map } from "./map.mjs";
import { Robot } from "./robot.mjs"
import { randomWalk } from "./moveFunctions.mjs"

let MapObj = new Map(21, 21); // this will need to be done on the frontend so that no invalid values are inputted. valid values are 11*11, 21*21...
MapObj.printMap();

let robot = new Robot(0, {"row":1, "col":1}, randomWalk);

// create something, some class as a controller i guess, that places and then moves the robots and stuff

console.log(robot.getCoords());
robot.move(MapObj)
console.log(robot.getCoords());
