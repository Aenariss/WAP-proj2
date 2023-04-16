/**
 * A module that contains a move functions, meant to be used with the Robot class
 * @module printMap
 * @author: Zaneta Grossova <xgross11>
*/

import { Circle } from "../frontend/circle.mjs";
import { Rectangle } from "../frontend/rectangle.mjs"

export function printMap(height, width, canvas, context, controller) {

    let map = controller.getMapObj().getMap();

    const cellSide = canvas.width/width;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (map[row][col] === "2") { //robot
                let circle = new Circle(row, col, cellSide, map, context);
                circle.drawCircle();
            } else {
                let rect = new Rectangle(row, col, cellSide, map, context);
            rect.drawRectangle();
            }
            
            
        }
    }

}