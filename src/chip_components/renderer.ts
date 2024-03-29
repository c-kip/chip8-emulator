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

  /**
   * Simplified DRW command, XORs a single pixel on the display and returns
   * true if a pixel was overwritten (false otherwise)
   * @param {number} x The x coordinate to XOR
   * @param {number} y The y coordinate to XOR
   * @returns {boolean} True if a pixel was overwritten, false otherwise
   */
  public setPixel(x: number, y: number): boolean {
    // Limit the pixel to the screen bounds (wrap-around if needed)
    x = x % this.PIXEL_COLS;
    y = y % this.PIXEL_ROWS;

    this.display[y][x] ^= 1; // XOR the pixel w/ 1

    return !this.display[y][x]; // return true if a pixel was replaced
  }

  /**
   * CLS command, clears the screen (sets all pixels to 0).
   */
  public clear() {
    this.display = this.display.map(() => Array(this.PIXEL_COLS).fill(0));
  }

  /**
   * Render method that draws all pixels in the display array to the canvas.
   */
  public render() {
    // Clear the canvas screen each render
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Set the fill colour to black
    this.context.fillStyle = '#000';

    // Loop through the pixel array and draw each individual pixel to the
    // correct scale
    for (let y = 0; y < this.display.length; y++) {
      for (let x = 0; x < this.display[x].length; x++) {
        // Draw the pixel if it exists (display val = 1)
        if (this.display[y][x]) {
          this.context.fillRect(
            x * this.scale,
            y * this.scale,
            this.scale,
            this.scale
          );
        }
      }
    }
  }
}

export default Renderer;
