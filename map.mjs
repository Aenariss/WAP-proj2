/**
 * A module that contains a map class that generates the map - part of WAP project 2
 * @module Map
 * @author: Vojtech Fiala <xfiala61>
 * 
*/

/**
 * Class representing a map
 */
export class Map {
    /**
     * Create a map
     * @param {number} height - The height of the map - min 1, max 50
     * @param {number} width  - The width of the map - min 1, max 50
     */
    constructor(height, width) {
        if (height > 0 && height <= 50 && width > 0 && width <= 50) {
            this.height = height;
            this.width = width;
            this.map = this.#generateMap(height, width);
        }
        else {
            throw new Error("Invalid height or width!");
        }
    }

    /**
     * Function to mark all cells in a map as visited
     * @param {number} height - height  of the map
     * @param {number} width - width of the map
     * @param {*} val1 - the value that will be put as path
     * @param {*} val2 - the value that will be put as wall
     * @returns {Array} - 2D array representing the initial map
     */
    #initMapValues(height, width, val1, val2) {
        let rows = [];

        let last_col = width-1;
        let first_col = 0;
        let first_row = 0;
        let last_row = height-1;

        for (let row_num = 0; row_num < height; row_num++) {
            let col = []
            for (let col_num = 0; col_num < width; col_num++) {
                if (col_num === first_col || col_num === last_col || 
                    row_num === first_row || row_num === last_row) { // if its the edge, its a wall
                    col.push(val2) // v as visited for the walls, so that I dont work with them
                }
                else {
                    col.push(val1) // u as univisited
                }
            }
            rows.push(col)
        }
        return rows;
    }

    /**
     * Function to mark all cells in a map as visited
     * @param {number} height - height  of the map
     * @param {number} width - width of the map
     * @param {*} val1 - the value that will be put as path
     * @param {*} val2 - the value that will be put as wall
     * @returns {Array} - 2D array representing the walled map
     */
    #initWalledMap(height, width, val1, val2) {
        let rows = [];

        let last_col = width-1;
        let first_col = 0;
        let first_row = 0;
        let last_row = height-1;

        for (let row_num = 0; row_num < height; row_num++) {
            let col = []
            for (let col_num = 0; col_num < width; col_num++) {
                if (col_num === first_col || col_num === last_col || 
                    row_num === first_row || row_num === last_row) { // if its the edge, its a wall
                    col.push(val2); 
                }
                else if (row_num % 2 === 1 && col_num % 2 === 1) { // even line or column, put space
                    col.push(val1); 
                }
                else {
                    col.push(val2);
                }
            }
            rows.push(col)
        }
        return rows;
    }

    /**
     * Method to convert coords to string in
     * @param {number} row
     * @param {number} col 
     * @returns {Object} Object with row and col
     */
    #coordsToObj(row, col) {
        return {row, col};
    }

    /**
     * Find unvisited neighbors of the given cell
     * @param {Array} visited - Array of visited and unvisited cells
     * @param {String} coords - Encoded coordinates of the cell in a string
     * @returns {Array} array of coords of unvisited neighbors
     */
    #univisitedNeighbours(visited, coords) {
        let row = coords.row;
        let col = coords.col;
        
        let neighbors = [];

        if (row > 0 && row < this.getHeight() && col > 0 && col < this.getWidth()) { // check if we're inside the maze
            let top = {"visited" : visited[row-1][col], "coords" : this.#coordsToObj(row-1, col)}; // above
            let bot = {"visited" : visited[row+1][col], "coords" : this.#coordsToObj(row+1, col)}; // below
            let right = {"visited" : visited[row][col+1], "coords" : this.#coordsToObj(row, col+1)};
            let left = {"visited" : visited[row][col-1], "coords" : this.#coordsToObj(row, col-1)};

            if (top.visited === "u") neighbors.push(top.coords);
            if (bot.visited === "u") neighbors.push(bot.coords);
            if (right.visited === "u") neighbors.push(right.coords);
            if (left.visited === "u") neighbors.push(left.coords);
        }
        return neighbors;
    }

    /**
     * Generate a map using iterative DFS algorithm
     * https://en.wikipedia.org/wiki/Maze_generation_algorithm - iterative DFS
     * @param {number} height - The height of the map to generate
     * @param {number} width - width of the map to generate
     */
    #generateMap(height, width) {

        let vis_height = (height-1)/2 + 2;
        let vis_width = (width-1)/2 + 2;

        let visited = this.#initMapValues(vis_height, vis_width, "u", "v");
        let walledMap = this.#initWalledMap(height, width, "0", "1");

        let stack = [];

        let init_val = {
            "visited" : visited[vis_height-2][1], // begin in the left bottom
            "coords": this.#coordsToObj(vis_height-2, 1)
        };
        stack.push(init_val);

        while (stack.length != 0) { // while stack isnt empty, continue
            // pop a cell and make ti the current cell
            let currCell = stack.pop();
            let newNeighbours = this.#univisitedNeighbours(visited, currCell.coords);
            if (newNeighbours.length !== 0) { // if the cell has any unvisited neighbors

                stack.push(currCell); // Push the current cell to the stack
                let randomNeighbor = newNeighbours[Math.floor(Math.random() * newNeighbours.length)]; // Choose one of the unvisited neighbours
                
                let wallY, wallX;
                if (currCell.coords.row != randomNeighbor.row) { // 
                    wallY = 2*randomNeighbor.col-1; // 1 1, 3 2, 5 3, 7 4 9 5
                    wallX = randomNeighbor.row + currCell.coords.row - 1; // 21 31 -> 41 wall 11 21 -> 21, 41 51 -> 81
                }

                else if (currCell.coords.col != randomNeighbor.col) {
                    wallY = randomNeighbor.col + currCell.coords.col - 1;
                    wallX = 2*randomNeighbor.row-1; // 11 12 -> 12; 12 13 -> 14, 21, 22 -> 32
                }

                walledMap[wallX][wallY] = "0" // Remove the wall between the current cell and the chosen cell

                visited[randomNeighbor.row][randomNeighbor.col] = "v"; // Mark the chosen cell as visited
                let chosenVal = {"visited" : "v", "coords" : randomNeighbor}; 
                stack.push(chosenVal); // and push it to the stack
            }
        }
    
        return walledMap;
    }

    /**
     * Getter for the width parameter
     * @returns {number} The width of the map
     */
    getWidth() {
        return this.width;
    }

    /**
     * Getter for the height parameter
     * @returns {number} The height of the map
     */
    getHeight() {
        return this.height;
    }

    /**
     * Setter for the map
     * @param {Array} 2D array that represents the updated map
     */
    updateMap(map) {
        this.map = map;
    } 

    /**
     * Getter for the map
     * 1 represents a wall, 0 represents a path, 2 represents a robot
     * @returns {Array} The array that represents the map
     */
    getMap() {
        return this.map;
    }

    /**
     * Method to get the object on the givne coords in map
     * @param {Object} coords - coords in the form of {row, col}
     * @returns {*} value on the givne coords
     */
    getCoordsObject(coords) {
        if (coords.row >= this.getHeight() || coords.row < 0 || coords.col < 0 || coords.col >= this.getWidth()) {
            throw new Error("Invalid position to find possible moves from!");
        }
        return this.map[coords.row][coords.col];
    }

    /**
     * Method to print the ascii representation of the map
     */
    printMap() {
        let map = this.getMap();
        for (let row_num = 0; row_num < this.height; row_num++) {
            for (let col_num = 0; col_num < this.width; col_num++) {
                process.stdout.write(map[row_num][col_num].toString());
            }
            process.stdout.write("\n");
        }
    }

    /**
     * Method to find moves possible from a given coordinates
     * @param {Object} coords - coords in the form of {row, col}
     * @returns {Array} Array containig coordinates with possible moves and the direction they aim into
     */
    possibleMovesFrom(coords) {
        let possibleMoves = [];

        var north = 0;
        var east = 1;
        var south = 2;
        var west = 3;

        if (coords.col >= this.getWidth()-1 || coords.col < 1 || coords.row < 1 || coords.row >= this.getHeight()-1) {
            throw new Error("Invalid position to find possible moves from!");
        }

        // north
        if (this.getCoordsObject({"row" : coords.row-1, "col": coords.col}) === "0")  possibleMoves.push({"coords" : {"row" : coords.row-1, "col": coords.col}, "direction" : north});
        // south
        if (this.getCoordsObject({"row" : coords.row+1, "col": coords.col}) === "0")  possibleMoves.push({"coords" : {"row" : coords.row+1, "col": coords.col}, "direction" : south});
        // east
        if (this.getCoordsObject({"row" : coords.row, "col": coords.col+1}) === "0")  possibleMoves.push({"coords" : {"row" : coords.row, "col": coords.col+1}, "direction" : east});
        // west
        if (this.getCoordsObject({"row" : coords.row, "col": coords.col-1}) === "0")  possibleMoves.push({"coords" : {"row" : coords.row, "col": coords.col-1}, "direction" : west});

        return possibleMoves;
    }

    /**
     * Debug function
     */
    #tmpPrintMap(map, height, width) {
        for (let row_num = 0; row_num < height; row_num++) {
            for (let col_num = 0; col_num < width; col_num++) {
                process.stdout.write(map[row_num][col_num].toString());
            }
            process.stdout.write("\n");
        }
    }
}
