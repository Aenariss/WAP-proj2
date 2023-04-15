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
            new_dir = poss_moves[Math.floor(Math.random() * poss_moves.length)]; // pick oen direction at random
            if (poss_moves.length === 0) { // poor robot can't move and stays in place
                return {"coords" : coords, "direction" : direction};
            }
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

export function wallTurn(map, coords, direction) {
    let new_dir;

    if (direction === null) { // if I dont have a direction, I'll call the random walk to decide
        return randomWalk(map, coords, direction);
    }
    else {
        let poss_moves = map.possibleMovesFrom(coords);
        if (poss_moves.length === 0)
            return {"coords" : coords, "direction" : direction};
        if (poss_moves.length === 1) // if you can move only 1 way, well, pick it.
            return poss_moves[0];
        let foundDirection = false;
        for (let move of poss_moves) {
            if (move.direction === direction) {
               new_dir = move;
               foundDirection = true;
               return new_dir;
            }
        }
        if (!foundDirection) { // i didnt find a move in my direction, means its time to change it.... pick anyone but the one you came from
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
}

export function wallTurn(map, coords, direction) {
    let new_dir;

    if (direction === null) { // if I dont have a direction, I'll call the random walk to decide
        return randomWalk(map, coords, direction);
    }
    else {
        let poss_moves = map.possibleMovesFrom(coords);
        if (poss_moves.length === 0)
            return {"coords" : coords, "direction" : direction};
        if (poss_moves.length === 1) // if you can move only 1 way, well, pick it.
            return poss_moves[0];
        let foundDirection = false;
        for (let move of poss_moves) {
            if (move.direction === direction) {
               new_dir = move;
               foundDirection = true;
               return new_dir;
            }
        }
        if (!foundDirection) { // i didnt find a move in my direction, means its time to change it.... pick anyone but the one you came from
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
}


// dalsi funkce bude, ze jde porad rovne dokud nenarazi v jeho smeru na prekazku... pak smer (nahodne?) meni

// dalsi 3 pohyby.... idk? jde porad nejak, dokud nenarazi na robota - pak se otaci a pokracuje smerem odkud prisel
// rightHand move a leftHand move?

// dalsi 3 pohyby.... idk? jde porad nejak, dokud nenarazi na robota - pak se otaci a pokracuje smerem odkud prisel
// rightHand move a leftHand move?