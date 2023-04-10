/**
 * Module that exports a class that acts as a controller that controls the map and robots withing - part of WAP Project 2
 * @module controller
 * Author: Vojtech Fiala
 */

import { Map } from "./map.mjs";
import { Robot } from "./robot.mjs"

export class Controller {
    /**
     * initialize the controller
     */
    constructor() {
        this.map = null; // needs to be initialized separately
        this.robots = []; // empty array to store the robots
        this.delay = 1; // default delay of 1 move per second
    }

    /**
     * method to initialize the map
     */
    initMap(height, width) {
        // maybe some backend checks if height/width is valid here?
        this.map = new Map(height, width);
    }

    /**
     * Getter for Map object
     * @returns {Map} a map object
     */
    getMapObj() {
        return this.map;
    }

    /**
     * Method to add a robot to the field
     * @param {int} id - id of the robot
     * @param {Object} initCoords - initial robot coords
     * @param {Function} controlFunc - function that decides how the robot moves
     */
    addRobot(id, initCoords, controlFunc) {
        let robot = new Robot(id, initCoords, controlFunc);
        this.robots.push(robot); // add the robot to the array
        this.#putIntoMap(initCoords, "2"); // and put it into the map;
    }

    /**
     * Method to delete a robot by its ID
     * @param {int} id 
     */
    deleteRobot(id) {
        let index = null;
        for(let i = 0; i < this.robots.length; i++) {
            if (this.robots[i].id === id) {
                index = i;
            }
        }
        // i found the robot in the array
        if (index !== null) {
            this.#removeFromMap(this.robots[index].coords);
            this.robots.splice(index, 1); // remove from array
        }
    }

    /**
     * Method to remove something from the map and replace it with path
     * @param {Object} coords - row, col
     * @param {*} value - value of the something you want to replace (eg. 2 to replace  a robot)
     */
    #removeFromMap(coords, value) {
        // check if the position contains a robot
        if (this.map.getCoordsObject(coords) === value) { // 2 is a robot for example
            this.map.setCoordsObject(coords, "0"); // replace robot with a path
        }
        else {
            throw new Error("What you are trying to delete is not what you think!")
        }
    }

    /**
     * Method to put an object of choice to the map, but only on a path
     * @param {Object} coords 
     * @param {*} value 
     */
    #putIntoMap(coords, value) {
        if (this.map.getCoordsObject(coords) === "0") { // 2 is a robot
            this.map.setCoordsObject(coords, value); // replace robot with a path
        }
        else {
            throw new Error("Invalid place to put something on. It's not a path!")
        }
    }

    /**
     * Method to move the robot using its move function
     * @param {Robot} robot - the robot that will mvoe
     */
    #changeRobotPosition(robot) {
        let initCoords = robot.getCoords(); // init coords
        robot.move(this.map); // calculate its next position
        let newCoords = robot.getCoords(); // new coords

        this.#removeFromMap(initCoords, "2"); // now, remove the robot from its old position
        this.#putIntoMap(newCoords, "2"); // and put it into a new place
    }

    /**
     * Method that calculates the moves of all the robots on the map and carries out the movements
     */
    doRobotMovement() {
        // do this for all the robots on the map, but only after a given period of time
        for (let robot of this.robots) {
            this.#changeRobotPosition(robot);
        }
    }

}
