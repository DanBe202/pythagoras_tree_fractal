import P5 from "p5";

export class Line {
    private readonly p5: P5;
    private readonly x1: number;
    private readonly y1: number;
    private readonly x2: number;
    private readonly y2: number;
    private readonly angle: number;

    private left: Line | null = null;
    private right: Line | null = null;

    constructor(p5: P5, x1: number, y1: number, x2: number, y2: number, angle?: number) {
        this.p5 = p5;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.angle = typeof angle === 'number' ? angle : -this.p5.HALF_PI;
    }

    draw(): void {
        this.p5.stroke(0);
        this.p5.line(this.x1, this.y1, this.x2, this.y2);
        if (this.left) {
            this.left.draw();
        }
        if (this.right) {
            this.right.draw();
        }
    }

    next(): void {
        const nextLength = this.p5.dist(this.x1, this.y1, this.x2, this.y2) * 0.7;
        if (this.left) {
            this.left.next();
        } else {
            const nextLeftX = this.x2 + nextLength * Math.cos(this.angle - this.p5.QUARTER_PI);
            const nextLeftY = this.y2 + nextLength * Math.sin(this.angle - this.p5.QUARTER_PI);
            this.left = new Line(this.p5, this.x2, this.y2, nextLeftX, nextLeftY, this.angle - this.p5.QUARTER_PI);
        }
        if (this.right) {
            this.right.next();
        } else {
            const nextRightX = this.x2 + nextLength * Math.cos(this.angle + this.p5.QUARTER_PI);
            const nextRightY = this.y2 + nextLength * Math.sin(this.angle + this.p5.QUARTER_PI )
            this.right = new Line(this.p5, this.x2, this.y2, nextRightX, nextRightY, this.angle + this.p5.QUARTER_PI);
        }
    }
}
