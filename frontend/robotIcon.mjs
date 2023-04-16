/**
 * A module that contains a move functions, meant to be used with the Robot class
 * @module robotIcon
 * @author: Zaneta Grossova <xgross11>
*/

export class RobotIcon {

    constructor(row, col, cellSide, map, context){
        this.row = row
        this.col = col
        this.cellSide = cellSide;
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

    drawRobot(){
        let context = this.getContext();
        let col = this.getCol();
        let row = this.getRow();
        let cellSide = this.getCellSide();

        var img = new Image();
        img.onload = function() {
            context.drawImage(img, (col*cellSide)+1, (row*cellSide)+1, cellSide/1.1, cellSide/1.1); // +1 and /1.1. is just for correction size and placing in the labyrinth
        }
        img.src = "./frontend/robot-solid.svg";
        
    }

}