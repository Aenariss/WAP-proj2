/**
 * A module that contains a Robot class - part of WAP project 2
 * @module Robot
 * @author Vojtech Fiala <xfiala61>
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
        let old_coords = this.getCoords();
        let old_dir = this.getDirection();
        let new_coords = this.moveFunction(map, old_coords, old_dir);
        try {
            this.coords = new_coords.coords;
            this.direction = new_coords.direction;
        }
        catch {
            this.coords = old_coords;
            this.direction = old_dir;
        }
    }

    /**
     * Getter for the ID
     * @returns {int} the ID of the robot
     */
    getId() {
        return this.id;
    }

    /**
     * Getter for the direction
     * @returns {int} Direction the robot is facing
     */
    getDirection() {
        return this.direction;
    }

    /**
     * method to get robot's current coordinates
     * @returns {Object} coordinates as in {row, col}
     */
    getCoords() {
        return this.coords;
    }
}
