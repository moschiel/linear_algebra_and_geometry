import React from "react";

export interface ICartesianInfo {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>,
  axisInfo: {
    pixels: {
      unitScale: number,
      size: { width: number, height: number },
      center: { x: number, y: number }
    },
    coordinates: {
      limits: { x: number, y: number },
    }
  }
}
