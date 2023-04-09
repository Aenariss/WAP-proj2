/**
 * A module that contains a move functions, meant to be used with the Robot class
 * @module moveFunctions
 * @author: Vojtech Fiala <xfiala61>
 * 
*/

var north = 0;
var east = 1;
var south = 2;
var west = 3;

/**
 * Function to calculate where the robot will move next using a random generation
 * @param {Object} map - Object that represents the map
 * @param {Object} coords - coordinates of the robot in the form of {row, col}
 * @param {int} direction - integer representing which direction the robot is facing (0,1,2,3 for north,east,south,west)
 * @returns {Object} {{row, col}, dir} which represent the new coordinates and direction
 */
export function randomWalk(map, coords, direction) {
    let poss_moves = map.possibleMovesFrom(coords);
    let new_dir = null; 

    let new_dirmove_flag = false;

    if (direction === null) { // if the robot's not moving towards any particular direction
        if (poss_moves.length === 0) { // if you can't move, don't and hope someone moves themselves first
            return coords;
        }
        new_dir = poss_moves[Math.floor(Math.random() * poss_moves.length)] // pick oen direction at random
        direction = new_dir.direction;
        new_dir = new_dir.coords;
    }
    else { // if he is, there will be a small chance he changes the direction
        for (let move in poss_moves) {
            // if he can move towards the direction he already is moving, there is 25% cchance he changes that direction
            if (move.direction === direction) {
                let randomRes = Math.floor(Math.random() * 100);
                if (randomRes >= 25) {
                    new_dir = move.coords;
                    break;
                }
                else {
                    new_dirmove_flag = true;
                    break;
                }
            }
        }
        // i didnt find a move in my direction
        if (new_dir === null && new_dirmove_flag === false) {
            new_dir = poss_moves[Math.floor(Math.random() * poss_moves.length)] // pick oen direction at random
            direction = new_dir.direction;
            new_dir = new_dir.coords;
        }
        // robot changes direction because of rng, but he can change it towards the original one, too
        else if (new_dirmove_flag === true) {
            new_dir = poss_moves[Math.floor(Math.random() * poss_moves.length)] // pick oen direction at random
            direction = new_dir.direction;
            new_dir = new_dir.coords;
        }
    }

    let retVal = {"coords" : new_dir, "direction" : direction};
    return retVal;

}
