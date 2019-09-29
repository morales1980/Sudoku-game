import React, {Component} from 'react';
import Tile from './Tile';

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialBoard: '52...6.........7.13...........4..8..6......5...........418.........3..2...87.....',
      board: '',
      initialNumbers: []
    }

    this.getNumbers = this.getNumbers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.markInitialNumners = this.markInitialNumners.bind(this);
  }

  componentDidMount() {
    if(this.state.board === '') {
      const initialNumbers = this.markInitialNumners();

      this.setState({
        board: this.state.initialBoard,
        initialNumbers: initialNumbers
      })
    }
  }

  getNumbers() {
    const numbers = [...this.state.board];
    const newNumbers = numbers.map((number) => {
      if(number==='.') number = '';

      return number;
    });

    return newNumbers;
  }

  handleChange(index, e) {
    const board = [...this.state.board];
    board[index] = e.target.value;
    const stringifiedBoard = board.toString().replace(/,/g, '');

    this.setState({
      board: stringifiedBoard
    });
  }

  markInitialNumners() {
    const initialNumbersIndex = [];
    const initialBoard = [...this.state.initialBoard];

    initialBoard.forEach((element) => {
      (element !== '.') ? initialNumbersIndex.push(true) : initialNumbersIndex.push(false);
    });

    return initialNumbersIndex;
  }

  render() {
    const initialNumbers = this.state.initialNumbers;
    const numbers = this.getNumbers();

    const listItems = numbers.map((number, index) => (
        <li key={index}>
          { initialNumbers[index]
            ? <Tile handleChange={this.handleChange.bind(null, index)} tileValue={number} disabled/>
            : <Tile handleChange={this.handleChange.bind(null, index)} tileValue={number}/>
          }
        </li>
    ));

    return (
      <ul>
        {listItems}
      </ul>
    );
  }
}

export default Board;
