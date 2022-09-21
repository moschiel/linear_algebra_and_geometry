export const mountStraightLineEquationFromCoord = (x1: number, y1: number, x2: number, y2: number) => {
  const m = (y2-y1)/(x2-x1);
  const b = y1 - m*x1;
  return mountStraightLineEquation(m, b);
}

export const mountStraightLineEquation = (m: number, b: number) => {
  const eq1 = m==null ? 'mx' : m==0 || isNaN(m) ? '' : m==1 ? 'x' : String(m) + 'x'
  const eq2 = m==null || (m >= 1 && b > 0 && !isNaN(b))? ' + ' : ' '
  const eq3 = b==null ? 'b' : b==0 || isNaN(b) ? '' : b
  return `y = ${eq1}${eq2}${eq3}`
}
