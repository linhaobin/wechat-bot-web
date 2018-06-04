import * as React from 'react'

import Square from './Square'

interface BoardProps {
  squares: string[]
  onClick: (i: number) => void
}

export default class Board extends React.PureComponent<BoardProps> {
  public renderSquare(i: number) {
    const { squares, onClick } = this.props
    return <Square value={squares[i]} onClick={() => onClick(i)} />
  }

  public render() {
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}
