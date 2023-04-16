/**
 * A module that contains a RobotIcon class
 * @module robotIcon
 * @author: Zaneta Grossova <xgross11>
*/

import { CanvasObject } from "./canvasObject.mjs";

/**
 * Class representing a Robot character for html canvas
 */
export class RobotIcon extends CanvasObject {

    /**
     * Function to draw robot on canvas
     */
    drawRobot(){
        let context = this.getContext();
        let col = this.getCol();
        let row = this.getRow();
        let cellWidth = this.getCellWidth();
        let cellHeight = this.getCellHeight();
        let robotSize;
        
        if(cellHeight > cellWidth) {
            robotSize = cellWidth;
        } else {
            robotSize = cellHeight;
        }

        var img = new Image();
        img.onload = function() {
            context.drawImage(img, (col*cellWidth)+1, (row*cellHeight)+1, robotSize/1.15, robotSize/1.15); // +1 and /1.1. is just for correction size and placing in the labyrinth
        }
        img.src = "./graphics/robot-solid.svg";
        
    }

}