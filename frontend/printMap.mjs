/**
 * A module that contains a move functions, meant to be used with the Robot class
 * @module printMap
 * @author: Zaneta Grossova <xgross11>
*/

import { RobotIcon } from "./robotIcon.mjs";
import { Rectangle } from "../frontend/rectangle.mjs"

export function printMap(height, width, canvas, context, controller) {

    let map = controller.getMapObj().getMap();

    let cellSide;
    if (width >= height) {
        cellSide = canvas.width/width;
    }
    else {
        cellSide = canvas.height/height;  
    }

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (map[row][col] === "2") { //robot
                let robot = new RobotIcon(row, col, cellSide, map, context);
                robot.drawRobot();
            } else {
                let rect = new Rectangle(row, col, cellSide, map, context);
            rect.drawRectangle();
            }
            
            
        }
    }

}