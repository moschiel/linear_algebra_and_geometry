import React, { useContext, useEffect, useRef, useState } from 'react'
import { CartesianContext } from '../../contexts/CartesianContext'
import { CoordinateToPixels } from '../CartesianPlan'
import { ICartesianInfo } from '../CartesianPlan/interfaces'
import styles from './styles.module.css'
import { mountStraightLineEquationFromCoord } from '../../utils/straightLineEquation'

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
  const p1 =  CoordinateToPixels(cartInfo, coords.p1)
  const p2 =  CoordinateToPixels(cartInfo, coords.p2)

  const canvas = cartInfo.canvasRef.current
  const ctx = canvas.getContext('2d')
  //configure ctx
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //draw line
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()

  //draw coordinate 1
  ctx.strokeStyle = '#003300';
  ctx.beginPath()
  ctx.arc(p1.x, p1.y, 5, 0, 2 * Math.PI);
  ctx.fill()
  ctx.stroke()

  //draw coordinate 2
  ctx.beginPath()
  ctx.arc(p2.x, p2.y, 5, 0, 2 * Math.PI);
  ctx.fill()
  ctx.stroke()
}

//compute vector of a straight line
export const Vectors = () => {
  const { cartesianCtx } = useContext(CartesianContext)
  const x1Ref = useRef<HTMLInputElement>(null);
  const y1Ref = useRef<HTMLInputElement>(null);
  const x2Ref = useRef<HTMLInputElement>(null);
  const y2Ref = useRef<HTMLInputElement>(null);
  const [equation, setEquation] = useState('');

  const handleOnClick = () => {
    const coords: vectorCoordinates = {
      p1: {x: x1Ref.current.valueAsNumber, y: y1Ref.current.valueAsNumber},
      p2: {x: x2Ref.current.valueAsNumber, y: y2Ref.current.valueAsNumber}
    }
    draw(cartesianCtx, coords)
  }

  const mountEquation = () => {
    const x1 = x1Ref.current.valueAsNumber;
    const x2 = x2Ref.current.valueAsNumber;
    const y1 = y1Ref.current.valueAsNumber;
    const y2 = y2Ref.current.valueAsNumber;
    setEquation(mountStraightLineEquationFromCoord(x1, y1, x2, y2))
  }

  useEffect(() => {
    mountEquation()
  }, [])

  return (
    <div className={styles.FormContainer}>
      <p>{`Vector of a Straight Line in R² : ${equation}`}</p>
      <div className={styles.InputContainer}>
        <label htmlFor="x1-input">x1:</label>
        <input id="x1-input" type={'number'} name="x1-input" ref={x1Ref} onChange={mountEquation}/>
        <label htmlFor="y1-input">y1:</label>
        <input id="y1-input" type={'number'} name="y1-input" ref={y1Ref} onChange={mountEquation}/>
      </div>
      <div className={styles.InputContainer}>
        <label htmlFor="x2-input">x2:</label>
        <input id="x2-input" type={'number'} name="x2-input" ref={x2Ref} onChange={mountEquation}/>
        <label htmlFor="y2-input">y2:</label>
        <input id="y2-input" type={'number'} name="y2-input" ref={y2Ref} onChange={mountEquation}/>
      </div>
      <button onClick={handleOnClick}>draw</button>
    </div>
  )
}

