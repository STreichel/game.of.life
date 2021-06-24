import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})

export class TicTacToeComponent implements OnInit {
  
  board: Array<Array<string>>;

  player1='X';
  player2='O';

  playerTurn = this.player1;

  winner = null;
  

  createBoard = (): Array<Array<string>> => [['', '', ''], ['', '', ''], ['', '', '']]
  
  constructor() { 
    this.board = this.createBoard();
    for (let i = 0; i < this.board.length; ++i) {
      for (let j = 0; j < this.board[i].length; ++j) {
        this.board[i][j] = this.board[i][j];
      }
    }
  }
 
  StartNewGame(){
    this.board = this.createBoard();
    for (let i = 0; i < this.board.length; ++i) {
      for (let j = 0; j < this.board[i].length; ++j) {
        this.board[i][j] = this.board[i][j];
        this.winner = null;
      }
    }
  }

  takeTurn(i:number, j:number){
    if(this.board[i][j] != ''){
      return;
    } 
      this.board[i][j] = this.playerTurn;
      this.winnerCheck(i, j);
        if(this.playerTurn == this.player1){
          this.playerTurn = this.player2;
        }
          else{
           this.playerTurn = this.player1;
          }
  }

  winnerCheck(i, j){
/// Rows
      for (let i = 0; i < 3; i++){
        if (this.board[i][0] != '' && this.board[i][0] == this.board[i][1] 
          && this.board[i][0]== this.board[i][2]){
            this.winner = this.board[i][0];
            return this.winner;
        }
      }
// Columns
      if(this.board[0][j] != '' && this.board[0][j] == this.board[1][j] 
        && this.board[0][j] == this.board[2][j]){        
          this.winner = this.board[0][j];
          return this.winner;
      }
// Diagonal
      if(this.board[0][0] != '' && this.board[0][0] == this.board[1][1] 
        && this.board[0][0] == this.board[2][2]){
          this.winner = this.board[0][0];
            return this.winner; 
      }
      if(this.board[2][0] != '' && this.board[2][0] == this.board[1][1] 
        && this.board[2][0] == this.board[0][2]){
          this.winner = this.board[2][0];
            return this.winner;
      }    
  
/// If board is full without winner, display 'Draw'
      let cnt = 0;
      for (let i = 0; i < this.board.length; ++i) {
        for (let j = 0; j < this.board.length; ++j) { 
          if (this.board[i][j] != ''){
             ++cnt;
          }
          if (cnt == 9 && this.winner == null){
            this.winner = 'Draw';
          } 
        }
      }     
  }

  ngOnInit(): void {
  }
}

