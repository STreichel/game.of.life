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
    this.board[i][j] = '';
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
                  
/// 3 in a row, rows 
    for (let i = 0; i < 3; i++){
      if (this.board[i][0] == this.board[i][1] && this.board[i][0] == this.board[i][2]){
         this.winner = this.board[i][0];}
           return this.winner;
    }    

/// 3 in a row, columns  
    for (let i = 0; i < 3; i++){
      if(this.board[0][i] == this.board[1][i] && this.board[0][i] == this.board[2][i]){
        this.winner = this.board[0][i];}
          return this.winner;
     }

/// 3 in a row, diagonal
    if(this.board[0][0] == this.board[1][1] && this.board[0][0] == this.board[2][2]){
      this.winner = this.board[0][0];
        return this.winner;
    }  
        if(this.board[2][0] == this.board [2][2] && this.board[2][0] == this.board[0][2]){
          this.winner = this.board[2][0];
            return this.winner;
        }

/// If board is full without winner, stop loop display 'Draw'
     if (this.winner == null && this.board.length == 0){
       this.winner = 'tie';
      }

///   If no winner and board not full, continue 
     if (this.board.length != 0 && this.board[i][j] != this.winner)
        this.takeTurn;
  }

  ngOnInit(): void {
  }
}

