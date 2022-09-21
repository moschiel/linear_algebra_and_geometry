import React, { useContext, useEffect, useRef, useState } from 'react'
import { CartesianContext } from '../../contexts/CartesianContext'
import { CoordinateToPixels } from '../CartesianPlan'
import { ICartesianInfo } from '../CartesianPlan/interfaces'
import styles from './styles.module.css'
import { mountStraightLineEquation } from '../../utils/straightLineEquation'

//compute equation y=mx+b
export const StraightLines = () => {
  const { cartesianCtx } = useContext(CartesianContext)
  const mRef = useRef<HTMLInputElement>(null);
  const bRef = useRef<HTMLInputElement>(null);
  const [equation, setEquation] = useState('');

  const handleOnClick = () => {
    draw(cartesianCtx, mRef.current.valueAsNumber, bRef.current.valueAsNumber)
  }
  const mountEquation = () => {
    const m = mRef.current.valueAsNumber;
    const b = bRef.current.valueAsNumber;
    setEquation(mountStraightLineEquation(m, b))
  }

  useEffect(() => {
    mountEquation()
  }, [])

  return (
    <div className={styles.FormContainer}>
      <p>{`Straight Lines in R² : ${equation}`}</p>
      <div className={styles.InputContainer}>
        <label htmlFor="m-input">m:</label>
        <input id="m-input" type={'number'} name="m-input" ref={mRef} onChange={mountEquation}/>
      </div>
      <div className={styles.InputContainer}>
        <label htmlFor="b-input">b:</label>
        <input id="b-input" type={'number'} name="b-input" ref={bRef}  onChange={mountEquation}/>
      </div>
      <button onClick={handleOnClick}>draw</button>
    </div>
  )
}

const draw = (cartInfo: ICartesianInfo, m: number, b: number) => {
  const { limits } = cartInfo.axisInfo.coordinates
  m = m ? m : 0
  b = b ? b : 0
  const x1 = -limits.x
  const y1 = m*x1 + b
  const x2 = limits.x
  const y2 = m*x2 + b
  const p1 =  CoordinateToPixels(cartInfo, {x: x1, y: y1})
  const p2 =  CoordinateToPixels(cartInfo, {x: x2, y: y2})

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

