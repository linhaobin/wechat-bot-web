import * as React from 'react'

export interface SquareProps {
  value: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Square: React.SFC<SquareProps> = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default Square
