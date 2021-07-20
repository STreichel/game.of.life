import { Component, OnInit } from '@angular/core';

import { faChessKing, faChessPawn, faCoins, faCrown, faDatabase, faYinYang } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkers',
  templateUrl: './checkers.component.html',
  styleUrls: ['./checkers.component.css']
})
export class CheckersComponent implements OnInit {
  
  faCrown = faCrown;
  faYingYang = faYinYang;

  board: Array<Array<string>>;

  numRows: number = 8;
  numCols: number = 8;
  
  EMPTY_CELL='';

  RED_PAWN='r';
  RED_KING='R';
  BLACK_PAWN="b";
  BLACK_KING='B';

  PLAYER_NONE=0;
  PLAYER_RED=1;
  PLAYER_BLACK=2;

  activePlayer = this.PLAYER_RED;

  WINNER = null;

  selected_i: number;
  selected_j: number;

  constructor() {
    this.newGame();
  }

  createBoard(): Array<Array<string>> {
    let board = new Array<Array<string>>(this.numRows);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array<string>(this.numCols);
      for (let j = 0; j < board[i].length; j++){
        board[i][j] = this.EMPTY_CELL;
      }
    }  
    return board;
  };

  newGame(){
    this.board = this.createBoard();
// Black pieces starting place
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 == 1) {
        this.board[i][j] = this.BLACK_PAWN; 
        }
      }
    }
// Red pieces starting place
    for (let i = 5; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 == 1) {
        this.board[i][j] = this.RED_PAWN;
        }
      }
    }
    return this.board;
  }

  playerPiece(piece: string) {
    if (piece == this.RED_PAWN || piece == this.RED_KING) {
      return this.PLAYER_RED;
    }
    if (piece == this.BLACK_PAWN || piece == this.BLACK_KING) {
      return this.PLAYER_BLACK;
    }
  }

  iconForPiece(i: number, j: number) {
    if (this.board[i][j] == this.BLACK_PAWN || this.board[i][j] == this.RED_PAWN) {
      return this.faYingYang;
    }
    return this.faCrown;
  }
  iconClassForPiece(i: number, j: number): string {
    let player = this.playerPiece(this.board[i][j]);
    if (player == this.PLAYER_RED) {
      return "redPiece";
    } else if (player == this.PLAYER_BLACK) {
      return "blackPiece";
    }
    return "";
  }

  canPieceMove(from_i: number, from_j: number, to_i: number, to_j: number): boolean {
    return true;
  }

  nextPlayer(){
    if (this.activePlayer == this.PLAYER_RED){
      this.activePlayer = this.PLAYER_BLACK;
    } else {
      this.activePlayer = this.PLAYER_RED;
    }
  }

  // Add css rule
  cellClicked(i:number, j:number){
    if (this.activePlayer == this.playerPiece(this.board[i][j])){
      this.canPieceMove;
    }
    this.nextPlayer();
  }

// inBounds() {
//   if (this.numRows < 8 && this.numRows > -1 && 
//     this.numCols <8 && this.numCols > -1){
//      return this.board[i][j];
//   } else {
//     return false;
//     }
// }

// possibleMoves() {
//   if (inBounds && playerTurn == PLAYER_RED){
//     check top left (numRows-1, numCols-1)
//     check top right (numRows-1, numCols+1)
//   }
//   if (inBounds && playerTurn == PLAYER_BLACK){
//     check bottom left (numRows+1, numCols-1)
//     check bottom right (numRows+1, numCols+1)
//   }
// }
  
  ngOnInit(): void {
  }
}