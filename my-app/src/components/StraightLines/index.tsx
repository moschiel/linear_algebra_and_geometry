import React, { useContext, useRef, useState } from 'react'
import { CartesianContext } from '../../contexts/CartesianContext'
import { CoordinateToPixels } from '../CartesianPlan'
import { ICartesianInfo } from '../CartesianPlan/interfaces'
import styles from './styles.module.css'

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

//compute equation y=mx+b
const StraightLines = () => {
  const { cartesianCtx } = useContext(CartesianContext)
  const mRef = useRef<HTMLInputElement>(null);
  const bRef = useRef<HTMLInputElement>(null);
  const [m_Value, setM_Value] = useState(null);
  const [b_Value, setB_Value] = useState(null);

  const handleOnClick = () => {
    draw(cartesianCtx, mRef.current.valueAsNumber, bRef.current.valueAsNumber)
    setM_Value(mRef.current.valueAsNumber)
    setB_Value(bRef.current.valueAsNumber)
  }
  const eq1 = m_Value==null ? 'mx' : m_Value==0 || isNaN(m_Value) ? '' : m_Value==1 ? 'x' : String(m_Value) + 'x'
  const eq2 = m_Value==null || (m_Value >= 1 && b_Value !== 0 && !isNaN(b_Value))? '+' : ''
  const eq3 = b_Value==null ? 'b' : b_Value==0 || isNaN(b_Value) ? '' : b_Value
  const equation = `y=${eq1}${eq2}${eq3}`

  return (
    <div className={styles.FormContainer}>
      <p>{`Straight Lines in R² : ${equation}`}</p>
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
