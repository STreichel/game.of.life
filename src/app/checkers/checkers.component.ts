import { Component, OnInit } from '@angular/core';

import { faCrown, faYinYang } from '@fortawesome/free-solid-svg-icons';

class MoveDetails{
  from_i:number;
  from_j:number;
  to_i:number;
  to_j:number;
  capturedPiece:string;

  constructor(from_i:number, from_j:number, to_i:number, to_j:number, capturedPiece:string){
    this.from_i = from_i;
    this.from_j = from_j;
    this.to_i = to_i;
    this.to_j = to_j;
    this.capturedPiece = capturedPiece;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}

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

  moveHistory: MoveDetails[] = [];
  moveCount = 0;

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
    this.clearMoveHistory();
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
    this.selected_i = -1;
    this.selected_j = -1;
    this.activePlayer = this.PLAYER_RED;
    return this.board;
  }
          // add each move in stack
  addMove(item: any){
    this.moveHistory[this.moveCount] = item;
    this.moveCount ++;    
  }
  undoLastMove(){
    if (this.moveCount == 0) {
      return;
    }
          // pop the most recent move onto the stack
    let move = this.lastMove();
    delete this.moveHistory[this.moveCount -1];
    this.moveCount --;
    this.moveHistory.length = this.moveCount;
          // undo board
    this.board[move.from_i][move.from_j] = this.board[move.to_i][move.to_j];
    this.board[move.to_i][move.to_j] = this.EMPTY_CELL;
          // un-delete previous captured piece if there was one
    let mid_i = (move.from_i + move.to_i) / 2;
    let mid_j = (move.from_j + move.to_j) / 2;
    if (Math.abs(move.from_i - move.to_i) == 2 || Math.abs(move.from_j - move.to_j) == 2){
      this.board[mid_i][mid_j] = move.capturedPiece;
    }
  }
  
          // stores each move in a first in, last out stack
  lastMove(){
    if (this.isMoveHistoryEmpty()){
      return null;
    }
    return this.moveHistory[this.moveCount -1]
  }
          // counts the stacks levels that have been saved
  stackSize(){
    return this.moveCount;
  }
          // checks to see if the stack size is zero
  isMoveHistoryEmpty(){
    return this.stackSize() ? false : true;
  }
          // clears the whole stack history and resets to zero
  clearMoveHistory(){
    this.moveHistory = [];
    this.moveCount = 0;
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

          // checking to make sure (i, j) is within board constructed/ on true location
  isInBounds(i:number, j:number): boolean {
    if (i < 0 || i >= this.numRows || j < 0 || j >= this.numCols) {
      return false;
    } else {
    return true;
    }
  }

          // check to see if the cell is occupied or empty
  isOccupied(i:number, j:number): boolean {
    if (this.board[i][j] == this.EMPTY_CELL){
      return false;
    } else {
    return true;
    }
  }

  canJump(from_i:number, from_j:number, to_i:number, to_j:number): boolean{
          // if not an active player has a piece @ (i, j)
    if (this.activePlayer != this.playerPiece(this.board[from_i][from_j])){
      return false;
    }
          // didn't move the same number of squares in both directions
    if (Math.abs(to_i - from_i) != 2 || Math.abs(to_j - from_j) != 2){
      return false;
    }
          // if destination has piece, can't jump
    if (this.isOccupied(to_i, to_j)) {
      return false;
    }
          // new variables for inbetween startMove and completeMove
    let mid_i = (from_i + to_i) / 2;
    let mid_j = (from_j + to_j) / 2;
          // if there is no piece between start and finish
    if (this.board[mid_i][mid_j] == this.EMPTY_CELL){
      return false;
    }
          // if the piece that is there is owned by current player ; cannot capture your own piece
    if (this.playerPiece(this.board[mid_i][mid_j]) == this.activePlayer){
     return false;
    }
    return true;
  }
  
          // css styling for checking and highlighting all possible valid moves
  isValidMove(from_i: number, from_j: number, to_i: number, to_j: number): boolean {    
          // if (i, j) is not a true location on the board return false
    if (!this.isInBounds(from_i, from_j)){
      return false;
    }
          // check if icon is a red pawn or not and if it's moving down the board
    let piece = this.board[from_i][from_j];
    if (piece == this.RED_PAWN && to_i >= from_i){
      return false;
    }
          // check if icon is a black pawn and if it's moving up the board
    if (piece == this.BLACK_PAWN && to_i <= from_i){
      return false;
    }
          // check for jump
    if (this.canJump(from_i, from_j, to_i, to_j)){
      return true;
    }
          // if delta in column or row index is not equal to 1 return false ; diagonal move, no jump
    if (Math.abs(to_i - from_i) != 1 || Math.abs(to_j - from_j) != 1) {
      return false;
    }
          // if there's another piece at (i, j) return false
    if (this.isOccupied(to_i, to_j)){
      return false;
    } else {
      return true;
    }
  }

  onStartMove(i:number, j:number){
          // make sure the cell is occupied before selecting
    if (this.playerPiece(this.board[i][j]) != this.activePlayer){
      return;
  }
         // new variables to save new piece to
    this.selected_i = i;
    this.selected_j = j;
    if (this.activePlayer == this.playerPiece(this.board[i][j])){
      this.isValidMove(this.selected_i, this.selected_j, i, j);
    }
  }

  onCompleteMove(i:number, j:number){
          // make sure move is valid
    if (!this.isValidMove(this.selected_i, this.selected_j, i, j)){
      return;
    }
          // Copies piece selected to selected destination
    this.board[i][j] = this.board[this.selected_i][this.selected_j];
          // Clears original selected cell/no piece now
    this.board[this.selected_i][this.selected_j] = this.EMPTY_CELL;
          // if this new destination is row 0 and icon is RED_PAWN, change icon to RED_KING/crown
    if (this.board[i][j] == this.RED_PAWN && (i == 0)){
      this.board[i][j] = this.RED_KING;
    }
          // if this new destination is row 8 and icon is BLACK_PAWN, change icon to BLACK_KING/crown
    if (this.board[i][j] == this.BLACK_PAWN && (i == this.board.length - 1)){
      this.board[i][j] = this.BLACK_KING
    }
          // delete icon if jumped over
    let capturedPiece = this.EMPTY_CELL;
    let mid_i = (this.selected_i + i) / 2;
    let mid_j = (this.selected_j + j) / 2;
    if (Math.abs(this.selected_i - i) == 2 || Math.abs(this.selected_j - j) == 2) {
      console.log("capturing piece from: " + mid_i + ", " + mid_j + " piece=" + this.board[mid_i][mid_j])
      capturedPiece = this.board[mid_i][mid_j];
      this.board[mid_i][mid_j] = this.EMPTY_CELL;
    }
          // stores previous play in stack
    this.moveHistory[this.moveCount++] = new MoveDetails(this.selected_i, this.selected_j, i, j, capturedPiece);
          // Move to next player
    this.nextPlayer();
          // Unselects original piece/cell
    this.selected_i = -1;
    this.selected_j = -1;
  }

  onClickedCell(i:number, j:number){
          // if this piece is unselected, we can startMove
    if (this.selected_i == -1 || this.selected_j == -1){
      this.onStartMove(i, j);
          // unselect piece if clicked twice, clear your "click"
    } else if (i == this.selected_i && j == this.selected_j){
      this.selected_i = -1;
      this.selected_j = -1;
          // copy, delete, unselect and move to nextPlayer
    } else {
      this.onCompleteMove(i, j);
    }
    return;
  }

          // checking to see if a cell is selected ; css styling
  isSelected(i:number, j:number): boolean {
    if(i == this.selected_i && j == this.selected_j){
    return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
  }
}