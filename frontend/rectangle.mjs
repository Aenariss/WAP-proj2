/**
 * A module that contains a Rectangle class
 * @module rectangle
 * @author Zaneta Grossova <xgross11>
*/

import { CanvasObject } from "./canvasObject.mjs";

/**
 * Class representing a Rectangle for printing on canvas
 */
export class Rectangle extends CanvasObject {

    /**
     * Function to draw rectangle on canvas
     */
    drawRectangle() {
        let row = this.getRow();
        let col = this.getCol();
        let cellSize = this.getCellSide();

        let x = col * cellSize;
        let y = row * cellSize;

        let map = this.getMap();
            
        let cellColor;
        let context = this.getContext();

        if (map[row][col] === "0") { //path is green
            cellColor = '#b6e69e';
        }
        else if (map[row][col] === "1") { // wall is brown
            cellColor = '#5d5546';
        }
        else {
            cellColor = '#111546';
        }
        context.beginPath();
        context.fillStyle = cellColor;
        context.fillRect(x, y, cellSize, cellSize); 
 
    }

}
