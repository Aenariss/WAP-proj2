/**
 * A module that contains a move functions, meant to be used with the Robot class
 * @module rectangle
 * @author: Zaneta Grossova <xgross11>
*/

import { Circle } from "./circle.mjs";

export class Rectangle {

    constructor(row, col, cellSide, map, context) {
        this.row = row;
        this.cellSide = cellSide;
        this.col = col;
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
     * Getter for the cellSide
     * @returns {int} size of the cell side
     */
    getCellSide() {
        return this.cellSide;
    }

    /**
     * Getter for the map
     * @returns {Array} a map array
     */
    getMap() {
        return this.map;
    }

    drawRectangle() {

        let row = this.getRow();
        let col = this.getCol();
        let cellSide = this.getCellSide();

        let x = col * cellSide;
        let y = row * cellSide;

        let map = this.getMap();
            
        let cellColor;
        let context = this.getContext();

        if (map[row][col] === "0" || map[row][col] === "2" ) { //path is white
            cellColor = '#ffffff';
        }
        else if (map[row][col] === "1") { // wall is grey
            cellColor = '#808080';
        }
        context.beginPath();
        context.fillStyle = cellColor;
        context.fillRect(x, y, cellSide, cellSide); 
 
    }

}
