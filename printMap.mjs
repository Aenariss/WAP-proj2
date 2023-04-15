/**
 * A module that contains a move functions, meant to be used with the Robot class
 * @module printMap
 * @author: Zaneta Grossova <xgross11>
*/

import { Circle } from "./circle.mjs";
import { Rectangle } from "./rectangle.mjs"

export function printMap(height, width, canvas, context, controller) {

    let map = controller.getMapObj().getMap();

    const cellSide = canvas.width/width;

    for (let row = 0; row < canvas.width/width; row++) {
        for (let col = 0; col < canvas.height/height; col++) {
            let rect = new Rectangle(row, col, cellSide, map, context);
            rect.drawRectangle();
            /*if (map[row][col] === "2") {
                let circle = new Circle(row, col, cellSide, map, context);
                circle.drawCircle();
            }*/
        }
    }

}