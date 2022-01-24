import React, { useContext, useRef, useState } from 'react'
import { CartesianContext } from '../../contexts/CartesianContext'
import { CoordinateToPixels } from '../CartesianPlan'
import { ICartesianInfo } from '../CartesianPlan/interfaces'
import styles from './styles.module.css'

type vectorCoordinates = {
  p1: {
    x: number,
    y: number
  },
  p2: {
    x: number,
    y: number
  }
}

const draw = (cartInfo: ICartesianInfo, coords: vectorCoordinates) => {
  const deltaX = coords.p1.x/coords.p2.x
  const deltaY = coords.p1.y/coords.p2.y

  const { limits } = cartInfo.axisInfo.coordinates
  // m = m ? m : 0
  // b = b ? b : 0
  // const x1 = -limits.x
  // const y1 = m*x1 + b
  // const x2 = limits.x
  // const y2 = m*x2 + b
  const p1 =  CoordinateToPixels(cartInfo, coords.p1)
  const p2 =  CoordinateToPixels(cartInfo, coords.p2)

  const canvas = cartInfo.canvasRef.current
  const ctx = canvas.getContext('2d')
  //configure ctx
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 1
  //draw
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()
}

//compute vector of a straight line
const Vectors = () => {
  const { cartesianCtx } = useContext(CartesianContext)
  const x1Ref = useRef<HTMLInputElement>(null);
  const y1Ref = useRef<HTMLInputElement>(null);
  const x2Ref = useRef<HTMLInputElement>(null);
  const y2Ref = useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    const coords: vectorCoordinates = {
      p1: {x: x1Ref.current.valueAsNumber, y: y1Ref.current.valueAsNumber},
      p2: {x: x2Ref.current.valueAsNumber, y: y2Ref.current.valueAsNumber}
    }
    draw(cartesianCtx, coords)
  }

  // const eq1 = m_Value==null ? 'mx' : m_Value==0 || isNaN(m_Value) ? '' : m_Value==1 ? 'x' : String(m_Value) + 'x'
  // const eq2 = m_Value==null || (m_Value >= 1 && b_Value !== 0 && !isNaN(b_Value))? '+' : ''
  // const eq3 = b_Value==null ? 'b' : b_Value==0 || isNaN(b_Value) ? '' : b_Value
  // const equation = `y=${eq1}${eq2}${eq3}`

  return (
    <div className={styles.FormContainer}>
      <p>{`Vector of Straight Lines in R² : ${''}`}</p>
      <div className={styles.InputContainer}>
        <label htmlFor="x1-input">x1:</label>
        <input id="x1-input" type={'number'} name="x1-input" ref={x1Ref}/>
        <label htmlFor="y1-input">y1:</label>
        <input id="y1-input" type={'number'} name="y1-input" ref={y1Ref}/>
      </div>
      <div className={styles.InputContainer}>
        <label htmlFor="x2-input">x2:</label>
        <input id="x2-input" type={'number'} name="x2-input" ref={x2Ref}/>
        <label htmlFor="y2-input">y2:</label>
        <input id="y2-input" type={'number'} name="y2-input" ref={y2Ref}/>
      </div>
      <button onClick={handleOnClick}>draw</button>
    </div>
  )
}

export default Vectors
