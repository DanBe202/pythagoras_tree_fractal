import './style.css'
import P5 from 'p5';
import {Line} from "./models/line";

const sketch = (p5: P5) => {
    let line: Line;

    p5.setup = () => {
        p5.createCanvas(600, 600);
        line = new Line(p5, p5.width / 2, p5.height, p5.width / 2, p5.height - (p5.height / 6));
    };

    p5.draw = () => {
        p5.background(250);
        line.draw();
    };

    p5.mouseClicked = () => {
        line.next();
    };
};

new P5(sketch);

