/**
 * A module that contains an canvas object and providing its getters and setters, meant as super class for Rectangle and RobotIcon
 * @module canvasObject
 * @author: Zaneta Grossova <xgross11>
*/

/**
 * Class representing canvas object
 */
export class CanvasObject {

    /**
     * Create an canvas object
     * @param {number} row - Row coordinate index
     * @param {number} col - Column coordinate index
     * @param {number} cellWidth - Widtg of one cell in the map
     * @param {number} cellHeight - Height of one cell in the map
     * @param {Array} map 2D array representing the map
     * @param {Object} context - context of canvas
     */
    constructor(row, col, cellHeight, cellWidth, map, context) {
        this.row = row;
        this.col = col;
        this.cellHeight = cellHeight;
        this.cellWidth = cellWidth;
        this.map = map;
        this.context = context;
    }
    
    /**
     * Getter for the col
     * @returns {int} a column index
     */
    getCol() {
        return this.col;
    }

    /**
     * Getter for the row
     * @returns {int} a row index
     */
    getRow() {
        return this.row;
    }

    /**
     * Getter for the context
     * @returns {Object} a given context
     */
    getContext() {
        return this.context;
    }

    /**
     * Getter for the cellHeight
     * @returns {int} height of the cell side
     */
    getCellHeight() {
        return this.cellHeight;
    }

    /**
     * Getter for the cellWidht
     * @returns {int} width of the cell side
     */
    getCellWidth() {
        return this.cellWidth;
    }

    /**
     * Getter for the map
     * @returns {Array} a map array
     */
    getMap() {
        return this.map;
    }

}
