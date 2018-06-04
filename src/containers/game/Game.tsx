import * as React from 'react'

import './Game.css'

import Board from '../../components/game/Board'

interface GameState {
  history: Array<{ squares: string[] }>
  xIsNext: boolean
  stepNumber: number
}

export default class Game extends React.PureComponent<any, GameState> {
  public state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    stepNumber: 0,
    xIsNext: true
  }

  public handleClick = (i: number) => {
    const { xIsNext, stepNumber } = this.state
    const history = this.state.history.slice(0, stepNumber + 1)
    const current = history[history.length - 1]

    if (calculateWinner(current.squares) || current.squares[i]) return

    const nextSquares = [...current.squares]
    nextSquares[i] = xIsNext ? 'X' : 'O'

    this.setState({
      history: [...history, { squares: nextSquares }],
      stepNumber: history.length,
      xIsNext: !xIsNext
    })
  }

  public jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 ? false : true
    })
  }

  public render() {
    const { history, stepNumber, xIsNext } = this.state

    const current = history[stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game start'
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>
            {desc}
          </a>
        </li>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

export function calculateWinner(squares: string[]) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
