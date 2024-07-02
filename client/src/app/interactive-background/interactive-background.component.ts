import { Component, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-interactive-background',
  templateUrl: './interactive-background.component.html',
  styleUrls: ['./interactive-background.component.css']
})
export class InteractiveBackgroundComponent implements AfterViewInit {
  @ViewChild('canvasElement') canvasRef!: ElementRef<HTMLCanvasElement>;
  points: Array<{ x: number; y: number; startTime: number }> = [];

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.initializeCanvas();
  }

  initializeCanvas(): void {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (ctx) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      canvas.addEventListener('mousemove', (event) => {
        this.addPoint(event.clientX, event.clientY);
      });

      this.zone.runOutsideAngular(() => this.renderLoop(ctx));
    }
  }

  addPoint(x: number, y: number): void {
    const point = { x, y, startTime: Date.now() };
    this.points.push(point);
    if (this.points.length > 100) { // Limit the number of points stored
      this.points.shift();
    }
  }

  renderLoop(ctx: CanvasRenderingContext2D): void {
    requestAnimationFrame(() => this.renderLoop(ctx));

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const currentTime = Date.now();

    this.points.forEach(point => {
      const age = (currentTime - point.startTime) / 500; // Age in seconds
      if (age < 2) { // Only draw if less than 2 seconds old
        this.lightUpPixels(ctx, point.x, point.y, 1 - age / 2); // Fade out over 2 seconds
      }
    });
  }

  lightUpPixels(ctx: CanvasRenderingContext2D, x: number, y: number, opacity: number): void {
    const radius = 20;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
