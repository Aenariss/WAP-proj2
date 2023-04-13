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
        this.delay = 50; // default delay of 1 move per second
        this.delay = 50; // default delay of 1 move per second
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
     * Getter for robots arr
     * @returns {Array} robots arr
     */ 
    getRobots() {
        return this.robots;
    }

    /**
     * Setter for robots arr
     * @param {Array} robots - new robots arr
     */ 
    setRobots(robots) {
        this.robots = robots;
    }

    /**
     * Method to add a robot to the robot arr
     * @param {Robot} robot - a robot to add
     */
    #appendRobot(robot) {
        this.robots.push(robot);
    }

    /**
     * Setter for the delay
     * @param {int} delay - a new delay in miliseconds
     */
    setDelay(delay) {
        this.delay = delay;
    }

    /**
     * Getter for the delay
     * @returns {int} delay - current delay value
     */
    getDelay() {
        return this.delay;
    }

    /**
     * Getter for robots arr
     * @returns {Array} robots arr
     */ 
    getRobots() {
        return this.robots;
    }

    /**
     * Setter for robots arr
     * @param {Array} robots - new robots arr
     */ 
    setRobots(robots) {
        this.robots = robots;
    }

    /**
     * Method to add a robot to the robot arr
     * @param {Robot} robot - a robot to add
     */
    #appendRobot(robot) {
        this.robots.push(robot);
    }

    /**
     * Setter for the delay
     * @param {int} delay - a new delay in miliseconds
     */
    setDelay(delay) {
        this.delay = delay;
    }

    /**
     * Getter for the delay
     * @returns {int} delay - current delay value
     */
    getDelay() {
        return this.delay;
    }

    /**
     * Method to add a robot to the field
     * @param {int} id - id of the robot
     * @param {Object} initCoords - initial robot coords
     * @param {Function} controlFunc - function that decides how the robot moves
     */
    addRobot(id, initCoords, controlFunc) {
        let map = this.getMapObj();
        if (map.getCoordsObject(initCoords) !== "0") {
            throw new Error("Can't place a robot here, sorry.");
        }
        let robot = new Robot(id, initCoords, controlFunc);
        this.#appendRobot(robot); // add the robot to the array
        this.#appendRobot(robot); // add the robot to the array
        this.#putIntoMap(initCoords, "2"); // and put it into the map;
    }

    /**
     * Method to delete a robot by its ID
     * @param {int} id 
     */
    deleteRobotById(id) {
        let index = null;
        let robots = this.getRobots();
        for(let i = 0; i < robots.length; i++) {
            if (robots[i].id === id) {
        let robots = this.getRobots();
        for(let i = 0; i < robots.length; i++) {
            if (robots[i].id === id) {
                index = i;
            }
        }
        // i found the robot in the array
        if (index !== null) {
            this.#removeFromMap(robots[index].coords);
            this.setRobots(robots.splice(index, 1)); // remove from array
        }
    }

    /**
     * Method to remove something from the map and replace it with path
     * @param {Object} coords - row, col
     * @param {*} value - value of the something you want to replace (eg. 2 to replace  a robot)
     */
    #removeFromMap(coords, value) {
        // check if the position contains a robot
        if (this.getMapObj().getCoordsObject(coords) === value) { // 2 is a robot for example
            this.getMapObj().setCoordsObject(coords, "0"); // replace robot with a path
        if (this.getMapObj().getCoordsObject(coords) === value) { // 2 is a robot for example
            this.getMapObj().setCoordsObject(coords, "0"); // replace robot with a path
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
        if (this.getMapObj().getCoordsObject(coords) === "0") { // 2 is a robot
            this.getMapObj().setCoordsObject(coords, value); // replace robot with a path
        if (this.getMapObj().getCoordsObject(coords) === "0") { // 2 is a robot
            this.getMapObj().setCoordsObject(coords, value); // replace robot with a path
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
        
        //console.log(this.getRobots());
        //if (!this.getRobots().includes(robot)) // if its not among the robots anymore, its been deleted mid-move, so just return;
        //    return;

        let initCoords = robot.getCoords(); // init coords
        robot.move(this.getMapObj()); // calculate its next position
        robot.move(this.getMapObj()); // calculate its next position
        let newCoords = robot.getCoords(); // new coords

        if (initCoords == newCoords || initCoords == undefined || newCoords == undefined) { // if they match or arent valid, dont do anything
            return;
        }

        this.#removeFromMap(initCoords, "2"); // now, remove the robot from its old position
        this.#putIntoMap(newCoords, "2"); // and put it into a new place
    }

    /**
     * Method that calculates the moves of all the robots on the map and carries out the movements
     */
    doRobotMovement() {

        let robots = this.getRobots();
        // do this for all the robots on the map, but only after a given period of time
        for (let robot of robots) {
            this.#changeRobotPosition(robot);
        }
    }

}
