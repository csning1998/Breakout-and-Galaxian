/*
 * Handles the setup and configuration of the canvas and the drawing context.
 */

export function initializeCanvas(canvas: HTMLCanvasElement): { ctx: CanvasRenderingContext2D } {
  console.log('initializeCanvas received canvas:', canvas)
  if (!canvas) {
    throw new Error('Canvas not found / must be defined.')
  }

  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
  canvas.style.border = '2px solid #BB86FC'
  canvas.style.backgroundColor = '#1E1E1E'

  const ctx = canvas.getContext('2d')!
  if (!ctx) {
    throw new Error('Failed to get Canvas context.')
  }

  return { ctx: ctx }
}
