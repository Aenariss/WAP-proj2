/**
 * A module that contains a Robot class - part of WAP project 2
 * @module Robot
 * @author: Vojtech Fiala <xfiala61>
 * 
*/

/**
 * Class representing a robot
 */
export class Robot {
    /**
     * Create a robot
     * @param {number} id - ID to identify the robot by
     * @param {Object} initPos - initial position of the robot in the ofmr of {row,col} coordinates
     * @param {function} moveFunction - function that the robot will use to calculate its next position
     */
    constructor(id, initPos, moveFunction) {
        this.id = id;
        this.coords = initPos;
        this.moveFunction = moveFunction;
        this.direction = null;
    }

    /**
     * Method to calculate the next move
     * @param {Object} map - Map object representing the world, mean to be used with the one from map.mjs
     */
    move(map) {
        let new_coords = this.moveFunction(map, this.coords, this.direction);
        this.coords = new_coords.coords;
        this.direction = new_coords.direction;
    }

    /**
     * method to get robot's current coordinates
     * @returns {Object} coordinates as in {row, col}
     */
    getCoords() {
        return this.coords;
    }
}
