import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import { ICartesianInfo } from '../components/CartesianPlan/interfaces'

export type CartesianContextData = {
  cartesianCtx: ICartesianInfo
}

type CartesianProviderProps = {
  children: ReactNode
}

export const CartesianContext = createContext({} as CartesianContextData)

export function CartesianProvider({ children }: CartesianProviderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const unitScaleInPx = 40 //each axis unit is 40px

  return (
    <CartesianContext.Provider
      value={{
        cartesianCtx: {
          canvasRef: canvasRef,
          axisInfo: {
            pixels: {
              unitScale: unitScaleInPx,
              size: { width: null, height: null },
              center: { x: null, y: null },
            },
            coordinates: {
              limits: { x: null, y: null },
            }
          }
        }}
      }
    >
      {children}
    </CartesianContext.Provider>
  )
}
