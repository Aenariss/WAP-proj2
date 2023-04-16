/**
 * A module that contains a move functions, meant to be used with the Robot class
 * @module circle
 * @author: Zaneta Grossova <xgross11>
*/

export class Circle {

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

    drawCircle(){
        let context = this.getContext();
        let col = this.getCol();
        let row = this.getRow();
        let cellSide = this.getCellSide();

        context.beginPath();
        context.arc((col*cellSide)+(cellSide/2), (row*cellSide)+(cellSide/2), cellSide/3, 0, (Math.PI*2))
        context.fillStyle = '#0000FF'
        context.fill()
    }

}