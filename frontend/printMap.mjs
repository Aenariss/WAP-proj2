/**
 * A module that contains function printMap
 * @module printMap
 * @author: Zaneta Grossova <xgross11>
*/

import { RobotIcon } from "./robotIcon.mjs";
import { Rectangle } from "../frontend/rectangle.mjs"

/**
 * Function to calculate a direction if it wasnt specified yet
 * @param {number} height - height of map
 * @param {number} width - width of map
 * @param {Object} canvas - canvas object
 * @param {Object} context - context of canvas
 * @param {Object} controller - controller from backend
 */
export function printMap(height, width, canvas, context, controller) {

    let map = controller.getMapObj().getMap();

    const cellWidth = canvas.width/width;
    const cellHeight = canvas.height/height;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (map[row][col] === "2") { //robot
                let robot = new RobotIcon(row, col, cellHeight, cellWidth, map, context);
                robot.drawRobot();
            } else {
                let rect = new Rectangle(row, col, cellHeight, cellWidth, map, context);
            rect.drawRectangle();
            }
            
            
        }
    }

}