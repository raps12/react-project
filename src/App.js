
import React from 'react';
import './App.css';

class Game extends React.Component {

    constructor(){
        super();
        this.state={
          squares:Array(9).fill(null),
          flag:true,
          history:Array(9).fill(null)
        }
        this.history=[];
        this.history.push(null);
      }

    handleClick(i){
    const squares = this.state.squares.slice();
    if(squares[i]==null && !checkWinner(this.state.squares)){
     this.state.flag?squares[i]='X' :squares[i]='O' ;
     this.history.push(squares);
     this.setState({squares:squares,flag:!this.state.flag});
    }   
    }
    // maintainHistory(moves){
    //   moves.map(function(move,num){
    //     return (
    //       <li key={move}>hola </li>)
    //   })
    // }
    hopToMove(move){
      console.log(move);
      this.setState({squares:move});
    }

    render(){ 
    const winner = checkWinner(this.state.squares);
    let status;

    const moves = this.history.map((move,num) => {
    if(move) return(<li><a href='#'onClick={() => this.hopToMove(move)}> move {num} </a> </li>)
      else return(<li> <a href='#' onClick={() => this.hopToMove(move)}> game-start </a> </li>)
    });
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.flag ? 'X' : 'O');
    }    
      return(
      <div className="game">
      <div className="game-board"> <Board value={this.state.squares} onClick={i => this.handleClick(i)}/> </div>
      <div className="game-info"> {status}
      <ol> {moves} </ol></div>
      </div>
      );
  }
}
//in java script classes , you have to explicitly call super, when defining constructor of a sub class
class Board extends React.Component {

  renderSquare(i){
    return <Square value={this.props.value[i]} onClick={() => this.props.onClick(i)}/>;
  }

  render(){
    return(
     <div>
     {status}
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
      </div>);
  }
}

class Square extends React.Component{
  // constructor(){
  //   super();
  //   this.state={
  //     value:null
  //   };
  // }

  render(){
    return(
      <button className="square" value={this.props.value} onClick={()=>this.props.onClick()}>
      {this.props.value}
     </button>);
  }

}



function checkWinner(squares){
  const winning_sequence = [ [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];
   
    for(let i=0;i<winning_sequence.length;i++){
         if(squares[winning_sequence[i][0]] === squares[winning_sequence[i][1]] && squares[winning_sequence[i][0]] === squares[winning_sequence[i][2]]) {
          if(squares[winning_sequence[i][1]]) return squares[winning_sequence[i][1]]
         }
          if(i === winning_sequence.length -1){
            return null;
          }
      }
}
export default Game;