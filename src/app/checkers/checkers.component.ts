import { Component, OnInit } from '@angular/core';
import { faChessKing, faChessPawn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkers',
  templateUrl: './checkers.component.html',
  styleUrls: ['./checkers.component.css']
})
export class CheckersComponent implements OnInit {
  public faChessPawn = faChessPawn;
  public faChessKing = faChessKing;

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
    return this.PLAYER_NONE;
  }

  iconForPiece(i: number, j: number) {
    if (this.board[i][j] == this.BLACK_PAWN || this.board[i][j] == this.RED_PAWN) {
      return this.faChessPawn;
    }
    return this.faChessKing;
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

  //inBounds() {
//  if(i >= 0 && i < i &&
//    j >= 0 && j < j)
    
//    return true;
  
  
//  return false;
  
//}
  

  ngOnInit(): void {
  }

}
