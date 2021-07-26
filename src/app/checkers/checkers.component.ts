import { Component, OnInit } from '@angular/core';

import { faCrown, faYinYang } from '@fortawesome/free-solid-svg-icons';

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

  selected_i: number = -1;
  selected_j: number = -1;

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

  nextPlayer(){
    if (this.activePlayer == this.PLAYER_RED){
      this.activePlayer = this.PLAYER_BLACK;
    } else {
      this.activePlayer = this.PLAYER_RED;
    }
  }

  canPieceMove(from_i: number, from_j: number, to_i: number, to_j: number): boolean {
    return true;
  }

  onStartMove(i:number, j:number){
    this.selected_i = i;
    this.selected_j = j;
    if (this.activePlayer == this.playerPiece(this.board[i][j])){
      this.canPieceMove;
    }
  }
//Copies, deletes old and resets 
  onCompleteMove(i:number, j:number){
    this.board[i][j] = this.board[this.selected_i][this.selected_j];
    this.board[this.selected_i][this.selected_j] = this.EMPTY_CELL;
    this.selected_i = -1;
    this.selected_j = -1;
    this.nextPlayer();
  }

  onClickedCell(i:number, j:number){
    if (this.selected_i == -1 || this.selected_j == -1){
      this.onStartMove(i, j);
    } else if (i == this.selected_i && j == this.selected_j){
      this.selected_i = -1;
      this.selected_j = -1;
    } else {
      this.onCompleteMove(i, j);
    }
    return;
  }

// css styling
  isSelected(i:number, j:number): boolean {
    if(i == this.selected_i && j == this.selected_j){
    return true;
    } else {
      return false;
    }
  }

// css styling
  isValidMove(i:number, j:number): boolean {
      return false;
  }


// inBounds() {
//   if (this.numRows < 8 && this.numRows > -1 && 
//     this.numCols < 8 && this.numCols > -1){
//      return this.board[i][j];
//   } else {
//     return false;
//     }
// }

// possibleMoves() {
//  if ((this.numRows-1, this.numCols-1) && this.PLAYER_RED) {
//    ((this.numRows-1, this.numCols+1) && this.PLAYER_RED),
//    ((this.numRows+1, this.numCols-1) && this.PLAYER_BLACK),
//    ((this.numRows+1, this.numCols+1) && this.PLAYER_BLACK)
// }
// }
  
  ngOnInit(): void {
  }
}