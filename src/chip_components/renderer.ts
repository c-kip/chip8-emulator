/**
 * Handles the rendering of a 64x32 pixel screen to the canvas.
 */
class Renderer {
  // Class constants
  readonly PIXEL_COLS = 64;
  readonly PIXEL_ROWS = 32;

  // Class variables
  scale: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  display: number[][];

  constructor(scale: number) {
    this.scale = scale;

    // Retrieve (and verify) the canvas
    let canvas = document.querySelector('canvas');
    if (!canvas) {
      throw new Error('Could not find canvas element.');
    }

    // Retrieve (and verify) the context for the canvas
    let context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not find context for canvas element.');
    }

    this.canvas = canvas;
    this.context = context;

    // Scale the size of the canvas (i.e., how many actual pixels are used to
    // draw a single pixel of the CHIP8 screen)
    this.canvas.width = this.PIXEL_COLS * this.scale;
    this.canvas.height = this.PIXEL_ROWS * this.scale;

    // Create an array to represent the individual pixels (0 = off, 1 = on)
    this.display = Array(this.PIXEL_ROWS).map(() =>
      Array(this.PIXEL_COLS).fill(0)
    );
  }
}

export default Renderer;
