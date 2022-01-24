import React, { useContext, useRef } from 'react'
import { CartesianContext } from '../../contexts/CartesianContext'
import { ICartesianInfo } from '../CartesianPlan/interfaces'
import styles from './styles.module.css'

const draw = (cartInfo: ICartesianInfo, m: number, b: number) => {
  const { center, size, unitScale } = cartInfo.axisInfo.pixels

  const ctx = cartInfo.canvasRef.current.getContext('2d')
  //configure ctx
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 1
  //draw
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(150, 100)
  ctx.stroke()
}

const StraightLines = () => {
  const { cartesianCtx } = useContext(CartesianContext)
  const mRef = useRef<HTMLInputElement>(null);
  const bRef = useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    draw(cartesianCtx, mRef.current.valueAsNumber, bRef.current.valueAsNumber)
  }

  return (
    <div className={styles.FormContainer}>
      <p>Straight Lines in R² : y=mx+b</p>
      <div className={styles.InputContainer}>
        <label htmlFor="m-input">m:</label>
        <input id="m-input" type={'number'} name="m-input" ref={mRef}/>
      </div>
      <div className={styles.InputContainer}>
        <label htmlFor="b-input">b:</label>
        <input id="b-input" type={'number'} name="b-input" ref={bRef}/>
      </div>
      <button onClick={handleOnClick}>draw</button>
    </div>
  )
}

export default StraightLines
