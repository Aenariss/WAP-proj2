/**
 * A module that contains a move functions, meant to be used with the Robot class
 * @module moveFunctions
 * @author: Vojtech Fiala <xfiala61>
 * 
*/

// North is 0, East is 1, South 2, West 3... Just for clarification how the algorithms work

/**
 * Function to calculate a direction if it wasnt specified yet
 * @param {Array} poss_moves - Array containing possible mvoes from given position
 * @returns {Object} One of the possible moves
 */
function initDirection(poss_moves) {
    let new_dir = poss_moves[Math.floor(Math.random() * poss_moves.length)] // pick oen direction at random
    return new_dir;
}

/**
 * Function to determine if a number is odd
 * @param {int} num - number to check if is odd
 */
function isOdd(num) {
    return Boolean(num % 2); // 0 means its even (and therefore false), 1 means its odd (and therefore true)
}

/**
 * Function to calculate where the robot will move next using a random generation
 * @param {Object} map - Object that represents the map
 * @param {Object} coords - coordinates of the robot in the form of {row, col}
 * @param {int} direction - integer representing which direction the robot is facing (0,1,2,3 for north,east,south,west)
 * @returns {Object} {{row, col}, dir} which represent the new coordinates and direction
 */
export function randomWalk(map, coords, direction) {
    let poss_moves = map.possibleMovesFrom(coords);
    if (poss_moves.length === 0) { // if you can't move, don't and hope someone moves themselves first
        return {"coords" : coords, "direction" : direction};
    }
    let new_dir = null; 
    let new_dirmove_flag = false;


    if (direction === null) { // if the robot's not moving towards any particular direction, pick one initial
        new_dir = initDirection(poss_moves, coords);
        direction = new_dir.direction;
        new_dir = new_dir.coords;
    }
    else { // if he is, there will be a small chance he changes the direction
        for (let move of poss_moves) {
            // if he can move towards the direction he already is moving, there is 35% cchance he changes that direction
            if (move.direction === direction) {
                let randomRes = Math.floor(Math.random() * 100);
                if (randomRes >= 35) {
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
            new_dir = poss_moves[Math.floor(Math.random() * poss_moves.length)]; // pick oen direction at random
            if (poss_moves.length === 0) { // poor robot can't move and stays in place
                return {"coords" : coords, "direction" : direction};
            }
            direction = new_dir.direction;
            new_dir = new_dir.coords;
        }
        // robot changes direction because of rng, but he can change it towards the original one, too
        else if (new_dirmove_flag === true) {
            new_dir = poss_moves[Math.floor(Math.random() * poss_moves.length)]; // pick oen direction at random
            direction = new_dir.direction;
            new_dir = new_dir.coords;
        }
    }

    let retVal = {"coords" : new_dir, "direction" : direction};
    return retVal;
}

/**
 * Function to calculate where the robot will move next by following the direction he already moves in. If he hits a wall, he changes direction by random
 * @param {Object} map - Object that represents the map
 * @param {Object} coords - coordinates of the robot in the form of {row, col}
 * @param {int} direction - integer representing which direction the robot is facing (0,1,2,3 for north,east,south,west)
 * @returns {Object} {{row, col}, dir} which represent the new coordinates and direction
 */
export function wallTurn(map, coords, direction) {

    if (direction === null) { // if I dont have a direction, I'll call the random walk to decide
        return randomWalk(map, coords, direction);
    }
    else {
        let poss_moves = map.possibleMovesFrom(coords);
        if (poss_moves.length === 0)
            return {"coords" : coords, "direction" : direction};
        if (poss_moves.length === 1) // if you can move only 1 way, well, pick it.
            return poss_moves[0];
        for (let move of poss_moves) {
            if (move.direction === direction) {
               return move;
            }
        }
        // i didnt find a move in my direction, means its time to change it.... pick anyone but the one you came from
        let available_moves = [];
        for (let move of poss_moves) { // find direction that go everywhere but the one you came from... eg. came from south -> if possible, east/west
            if (isOdd(direction) && !isOdd(move.direction)) { // only add different kind of direction (eg. it was east/west -> only add north/south)
                available_moves.push(move);
            }
            else if (!isOdd(direction) && isOdd(move.direction)) { // do the same but it was north/south and I want east/west
                available_moves.push(move);
            }
        }
        // pick one from the available moves by random
        return available_moves[Math.floor(Math.random() * available_moves.length)];
    }
}

/**
 * Function to calculate where the robot will move next considering I want him to bounce between two walls
 * @param {Object} map - Object that represents the map
 * @param {Object} coords - coordinates of the robot in the form of {row, col}
 * @param {int} direction - integer representing which direction the robot is facing (0,1,2,3 for north,east,south,west)
 * @returns {Object} {{row, col}, dir} which represent the new coordinates and direction
 */
export function wallBounce(map, coords, direction) {
    if (direction === null) { // if I dont have a direction, I'll call the random walk to decide
        return randomWalk(map, coords, direction);
    }
    else {
        let poss_moves = map.possibleMovesFrom(coords);
        if (poss_moves.length === 0)
            return {"coords" : coords, "direction" : direction};
        if (poss_moves.length === 1) // if you can move only 1 way, well, pick it.
            return poss_moves[0];
        for (let move of poss_moves) {
            if (move.direction === direction) {
               return move;
            }
        }
        for (let move of poss_moves) {
            if (move.direction === (direction+2) % 4) { // choose the opposite direction - bounce
               return move;
            }
        }
    }
}

/**
 * Function to calculate where the robot will move next using a left hand method - similar to the method above, but he will always go in a way he has a wall on his right side
 * @param {Object} map - Object that represents the map
 * @param {Object} coords - coordinates of the robot in the form of {row, col}
 * @param {int} direction - integer representing which direction the robot is facing (0,1,2,3 for north,east,south,west)
 * @returns {Object} {{row, col}, dir} which represent the new coordinates and direction
 */
export function leftHand(map, coords, direction) {

    if (direction === null) { // if I dont have a direction, I'll call the random walk to decide
        return randomWalk(map, coords, direction);
    }
    else {
        let poss_moves = map.possibleMovesFrom(coords);
        if (poss_moves.length === 0)
            return {"coords" : coords, "direction" : direction};
        if (poss_moves.length === 1) // if you can move only 1 way, well, pick it.
            return poss_moves[0];

        let availableOptions = [null, null, null];
        for (let move of poss_moves) { // Example situation: >goes easts >hits a wall >goes south >refuses to elaborate further
            // highst priority is the move to the right
            if (direction === (move.direction+1) % 4) { // goes south (2) and the move direction is west (2+1%4, means 3), just as an example
                availableOptions[0] = move;
            } // second highest is following the direction
            else if (move.direction === direction) {
                availableOptions[1] = move;
            }
            // third is if he has nowhere else to go (except return, but i dont want that)
            else if (direction === (move.direction+3) % 4) { // goes north, cant go west, so choose east
                availableOptions[2] = move;
            }
        }
        // go through options sequentially and return first that is not null
        for (let option of availableOptions) {
            if (option !== null)
                return option;
        }
    }
}


/**
 * Function to calculate where the robot will move next using a right hand method
 * @param {Object} map - Object that represents the map
 * @param {Object} coords - coordinates of the robot in the form of {row, col}
 * @param {int} direction - integer representing which direction the robot is facing (0,1,2,3 for north,east,south,west)
 * @returns {Object} {{row, col}, dir} which represent the new coordinates and direction
 */
export function rightHand(map, coords, direction) {
    
    if (direction === null) { // if I dont have a direction, I'll call the random walk to decide
        return randomWalk(map, coords, direction);
    }
    else {
        let poss_moves = map.possibleMovesFrom(coords);
        if (poss_moves.length === 0)
            return {"coords" : coords, "direction" : direction};
        if (poss_moves.length === 1) // if you can move only 1 way, well, pick it.
            return poss_moves[0];

        let availableOptions = [null, null, null];
        for (let move of poss_moves) {
            // highst priority is the move to the left
            if ((direction+1) % 4 === move.direction) { // goes south (2) and the move direction is east (2, means 1+1%4), just as an example
                availableOptions[0] = move;
            } // second highest is following the direction
            else if (move.direction === direction) {
                availableOptions[1] = move;
            }
            // third is if he has nowhere else to go (except return, but i dont want that)
            else if ((direction+3) % 4 === move.direction) { // goes north, cant go east, so choose west
                availableOptions[2] = move;
            }
        }
        // go through options sequentially and return first that is not null
        for (let option of availableOptions) {
            if (option !== null)
                return option;
        }
    }
}
