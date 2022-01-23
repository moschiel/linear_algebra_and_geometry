import React, { useEffect, useRef, useState } from 'react';
import { ICartesianInfo } from './interfaces';
import styles from './styles.module.css';

const separatorSpace = 40
const separatorSize = 10

const Axis = (cartInfo: ICartesianInfo, axis: 'x'|'y') => {
  if(!cartInfo.center) return

  const Separator = (pos: number) => {
    if(axis === 'x')
      return <div className={styles.CartesianXSeparator} style={{right: pos, top: -separatorSize/2, height: separatorSize}}></div>
    else
      return <div className={styles.CartesianYSeparator} style={{top: pos, left: -separatorSize/2, width: separatorSize}}></div>
  }
  const AuxLine = (pos: number) => {
    if(axis === 'x')
      return <div className={styles.CartesianXAuxLine} style={{right: pos, top: -cartInfo.center.y, height: cartInfo.size.height}}></div>
    else
      return <div className={styles.CartesianYAuxLine} style={{top: pos, left: -cartInfo.center.x, width: cartInfo.size.width}}></div>
  }
  const SeparatorNumber = (num: number, pos: number) => {
    if(axis === 'x')
      return <div className={styles.CartesianXNumber} style={{right: pos-4, top: separatorSize/2}}>{num}</div>
    else
      return <div className={styles.CartesianYNumber} style={{top: pos-11, left: separatorSize}}>{num}</div>
  }

  const Separators = []
  const AuxLines = []
  const SeparatorNumbers = []
  const posReference = axis === 'x'? cartInfo.center.x : cartInfo.center.y
  for( let i=1; (i*separatorSpace) < posReference; i++) {
    const pos = posReference + i*separatorSpace
    Separators.push(Separator(pos))
    AuxLines.push(AuxLine(pos))
    SeparatorNumbers.push(SeparatorNumber(-i, pos))
  }
  for( let i=1; (i*separatorSpace) < posReference; i++) {
    const pos = posReference - i*separatorSpace
    Separators.push(Separator(pos))
    AuxLines.push(AuxLine(pos))
    SeparatorNumbers.push(SeparatorNumber(i, pos))
  }

  return <div className={axis === 'x'? styles.CartesianXAxis : styles.CartesianYAxis}>
      {/* <div className={styles.InnerCartesianAxis}> */}
        {Separators}
        {AuxLines}
        {SeparatorNumbers}
      {/* </div> */}
    </div>
}

const CartesianPlan = () => {
  const cartesianRef = useRef<HTMLDivElement>(null);
  const [cartesianInfo, setCartesianInfo] = useState<ICartesianInfo>({} as ICartesianInfo);
  const [yAxis, setYAxis] = useState<JSX.Element>();
  const [xAxis, setXAxis] = useState<JSX.Element>();

  useEffect(()=>{
    setCartesianInfo({
      size: {
        width: cartesianRef.current?.clientWidth as number,
        height: cartesianRef.current?.clientHeight as number
      },
      center:{
        x: (cartesianRef.current?.clientWidth as number)/2,
        y: (cartesianRef.current?.clientHeight as number)/2
      }
    })
  }, []);

  useEffect(()=>{
    console.log(cartesianInfo);
    setXAxis(Axis(cartesianInfo, 'x'))
    setYAxis(Axis(cartesianInfo, 'y'))
  },[cartesianInfo])

  return <div className={styles.CartesianContainer}>
    <div className={styles.CartesianPlan} ref={cartesianRef}>
      {xAxis}
      {yAxis}
    </div>
  </div>
}

export default CartesianPlan
