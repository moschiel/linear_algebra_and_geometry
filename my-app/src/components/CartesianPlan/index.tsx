import React, { useContext, useEffect, useRef, useState } from 'react';
import { ICartesianInfo } from './interfaces';
import styles from './styles.module.css';
import { CartesianContext } from '../../contexts/CartesianContext';

const SEPARATOR_SIZE = 10

export const CoordinateToPixels = (cartInfo: ICartesianInfo, coordinate: { x: number, y: number }) => {
  const { center, unitScale } = cartInfo.axisInfo.pixels
  return {
    x: center.x + coordinate.x * unitScale,
    y: center.y - coordinate.y * unitScale
  }
}

const Axis = (cartInfo: ICartesianInfo) => {
  const { center, size, unitScale } = cartInfo.axisInfo.pixels
  const { limits } = cartInfo.axisInfo.coordinates
  if(!center || !size || !unitScale) return

  const Separator = (axis: 'x'|'y', pos: number) => {
    return axis === 'x'
      ?<div className={styles.CartesianXSeparator} style={{right: pos, top: -SEPARATOR_SIZE/2, height: SEPARATOR_SIZE}}></div>
      :<div className={styles.CartesianYSeparator} style={{top: pos, left: -SEPARATOR_SIZE/2, width: SEPARATOR_SIZE}}></div>
  }
  const SeparatorNumber = (axis: 'x'|'y', pos: number, num: number) => {
    return axis === 'x'
      ?<div className={styles.CartesianXNumber} style={{right: pos-4, top: SEPARATOR_SIZE/2}}>{num}</div>
      :<div className={styles.CartesianYNumber} style={{top: pos-11, right: SEPARATOR_SIZE}}>{num}</div>
  }
  const AuxLine = (axis: 'x'|'y', pos: number) => {
    return axis === 'x'
      ?<div className={styles.CartesianXAuxLine} style={{right: pos, top: -center.y, height: size.height}}></div>
      :<div className={styles.CartesianYAuxLine} style={{top: pos, left: -center.x, width: size.width}}></div>
  }

  const Separators = {x:[], y:[]}
  const SeparatorNumbers = {x:[], y:[]}
  const AuxLines = {x:[], y:[]}
  for(let x = 1; x <= limits.x; x++) {
    const pos = center.x + x*unitScale
    Separators.x.push(Separator('x', pos))
    SeparatorNumbers.x.push(SeparatorNumber('x', pos, -x))
    AuxLines.x.push(AuxLine('x', pos))
  }
  for(let x = 1; x <= limits.x; x++) {
    const pos = center.x - x*unitScale
    Separators.x.push(Separator('x', pos))
    SeparatorNumbers.x.push(SeparatorNumber('x', pos, x))
    AuxLines.x.push(AuxLine('x', pos))
  }
  for(let y = 1; y <= limits.y; y++) {
    const pos = center.y + y*unitScale
    Separators.y.push(Separator('y', pos))
    SeparatorNumbers.y.push(SeparatorNumber('y', pos, -y))
    AuxLines.y.push(AuxLine('y', pos))
  }
  for(let y = 1; y <= limits.y; y++) {
    const pos = center.y - y*unitScale
    Separators.y.push(Separator('y', pos))
    SeparatorNumbers.y.push(SeparatorNumber('y', pos, y))
    AuxLines.y.push(AuxLine('y', pos))
  }

  return <>
    <div className={styles.CartesianXAxis}>
      {Separators.x}
      {SeparatorNumbers.x}
      {AuxLines.x}
    </div>
    <div className={styles.CartesianYAxis}>
      {Separators.y}
      {SeparatorNumbers.y}
      {AuxLines.y}
    </div>
  </>
}

export const CartesianPlan = () => {
  const { cartesianCtx } = useContext(CartesianContext)
  const cartesianRef = useRef<HTMLDivElement>(null);
  const [AxisState, setAxisState] = useState<JSX.Element>();

  useEffect(()=>{
    cartesianCtx.axisInfo.pixels.size.width = cartesianRef.current?.clientWidth as number
    cartesianCtx.axisInfo.pixels.size.height = cartesianRef.current?.clientHeight as number
    cartesianCtx.axisInfo.pixels.center.x = (cartesianRef.current?.clientWidth as number)/2
    cartesianCtx.axisInfo.pixels.center.y = (cartesianRef.current?.clientHeight as number)/2
    cartesianCtx.axisInfo.coordinates.limits.x = Math.trunc(cartesianCtx.axisInfo.pixels.center.x / cartesianCtx.axisInfo.pixels.unitScale)
    cartesianCtx.axisInfo.coordinates.limits.y = Math.trunc(cartesianCtx.axisInfo.pixels.center.y / cartesianCtx.axisInfo.pixels.unitScale)
    cartesianCtx.canvasRef.current.width = cartesianCtx.axisInfo.pixels.size.width;
    cartesianCtx.canvasRef.current.height = cartesianCtx.axisInfo.pixels.size.height;
  }, []);

  useEffect(()=>{
    console.log(cartesianCtx)
    setAxisState(Axis(cartesianCtx))
  },[cartesianCtx])

  return <div className={styles.CartesianContainer}>
    <div className={styles.CartesianPlan} ref={cartesianRef}>
      {AxisState}
      <canvas
        id="cartesian_canvas"
        className={styles.CartesianCanvas}
        ref={cartesianCtx.canvasRef}>
      </canvas>
    </div>
  </div>
}
