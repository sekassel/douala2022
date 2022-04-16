import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ScoreserviceService } from '../scoredatabase/scoreservice.service'
import { BLOCK_SIZE, COLORS, COLORSDARKER, COLORSLIGHTER, COLS, KEY, LEVEL, LINES_PER_LEVEL, POINTS, ROWS } from './constants'
import { GameService } from './game.service'
import { IPiece, Piece } from './piece.component'

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent implements OnInit {

  @ViewChild('board', { static: true })
  canvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('next', { static: true })
  canvasNext?: ElementRef<HTMLCanvasElement>;

  ctx?: CanvasRenderingContext2D | null;
  lines: number = 0;
  level: number = 0;
  board: any;
  piece?: Piece;
  moves : Map<number, any> = new Map()
  // moves = {
  //   [KEY.LEFT]: (p: IPiece): IPiece => ({ ...p, x: p.x - 1 }),
  //   [KEY.RIGHT]: (p: IPiece): IPiece => ({ ...p, x: p.x + 1 }),
  //   [KEY.DOWN]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
  //   [KEY.SPACE]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
  //   [KEY.UP]: (p: IPiece): IPiece => this.service.rotate(p)
  // };
  gameStarted: boolean = false;
  requestId: number = 0;
  highScore: any
  points: number = 0;
  time: { start: number; elapsed: number; level: number } = {
    start: 0,
    elapsed: 0,
    level: 0,
  }
  paused: boolean = false;
  next?: Piece
  ctxNext?: CanvasRenderingContext2D | null;


  constructor(
    private service: GameService,
    private scoreService: ScoreserviceService
  ) {
    this.moves.set(KEY.LEFT, (p: IPiece): IPiece => ({ ...p, x: p.x - 1 }))
    this.moves.set(KEY.RIGHT, (p: IPiece): IPiece => ({ ...p, x: p.x + 1 }))
    this.moves.set(KEY.DOWN, (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }))
    this.moves.set(KEY.SPACE, (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }))
    this.moves.set(KEY.UP, (p: IPiece): IPiece => this.service.rotate(p))
  }

  ngOnInit() {
    this.initBoard();
    this.initNext();
    this.resetGame();
    this.highScore = 0;
  }

  initBoard() {
    // Get the 2D context that we draw on.
    this.ctx = this.canvas?.nativeElement.getContext('2d');

    // Calculate size of canvas from constants.
    if (this.ctx != null) {
      console.log('init board prepares ctx')
      this.ctx.canvas.width = COLS * BLOCK_SIZE;
      this.ctx.canvas.height = ROWS * BLOCK_SIZE;
      this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    }
  }

  initNext() {
    this.ctxNext = this.canvasNext?.nativeElement.getContext('2d');

    // Calculate size of canvas from constants.
    // The + 2 is to allow for space to add the drop shadow to
    // the "next piece"
    if (this.ctxNext == null) {
      return
    }
    this.ctxNext.canvas.width = 4 * BLOCK_SIZE + 2;
    this.ctxNext.canvas.height = 4 * BLOCK_SIZE;

    this.ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
  }


  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.doKey(event.keyCode, event)
  }

  doKey(key: number, event: KeyboardEvent | null) {
    if (key === KEY.ESC) {
      this.gameOver();
    } else if (this.moves.get(key)) {
      if (event) {
        event.preventDefault();
      }
      // Get new state
      let p = this.moves.get(key)(this.piece);
      if (key === KEY.SPACE) {
        // Hard drop
        while (this.service.valid(p, this.board)) {
          this.points += POINTS.HARD_DROP;
          this.piece?.move(p);
          p = this.moves.get(KEY.DOWN)(this.piece);
        }
      } else if (this.service.valid(p, this.board)) {
        this.piece?.move(p);
        if (key === KEY.DOWN) {
          this.points += POINTS.SOFT_DROP;
        }
      }
      if (this.ctx == null) {
        return
      }
    }
  }

  left() {
    this.doKey(KEY.LEFT, null);
  }

  right() {
    this.doKey(KEY.RIGHT, null);
  }

  getEmptyBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  play() {
    if (this.ctx == null || this.ctxNext == null) {
      console.log('ups this.ctx is null')
      return
    }
    this.gameStarted = true;
    this.resetGame();
    this.next = new Piece(this.ctx);
    this.piece = new Piece(this.ctx);
    this.next.drawNext(this.ctxNext);
    this.time.start = performance.now();

    // If we have an old game running a game then cancel the old
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }

    this.animate();
  }

  resetGame() {
    this.points = 0;
    this.lines = 0;
    this.level = 0;
    this.board = this.getEmptyBoard();
    this.time = { start: 0, elapsed: 0, level: LEVEL[this.level] };
    this.paused = false;
    this.addOutlines();
  }

  animate(now = 0) {
    this.time.elapsed = now - this.time.start;
    if (this.time.elapsed > this.time.level) {
      this.time.start = now;
      if (!this.drop()) {
        this.gameOver();
        return;
      }
    }
    this.draw();
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    if (this.ctx == null) {
      return
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.piece?.draw();
    this.drawBoard();
  }

  drop(): boolean {
    let p = this.moves.get(KEY.DOWN)(this.piece);
    if (this.service.valid(p, this.board)) {
      this.piece?.move(p);
    } else {
      this.freeze();
      this.clearLines();
      if (this.piece?.y === 0) {
        // Game over
        return false;
      }
      this.piece = this.next;
      if (this.ctx == null || this.ctxNext == null) {
        return true;
      }
      this.next = new Piece(this.ctx);
      this.next.drawNext(this.ctxNext);
    }
    return true;
  }

  clearLines() {
    let lines = 0;
    this.board.forEach((row: any[], y: any) => {
      if (row.every(value => value !== 0)) {
        lines++;
        this.board.splice(y, 1);
        this.board.unshift(Array(COLS).fill(0));
      }
    });
    if (lines > 0) {
      this.points += this.service.getLinesClearedPoints(lines, this.level);
      this.lines += lines;
      if (this.lines >= LINES_PER_LEVEL) {
        this.level++;
        this.lines -= LINES_PER_LEVEL;
        this.time.level = LEVEL[this.level];
      }
    }
  }

  freeze() {
    if (this.piece == null) {
      return
    }
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0 && this.piece != null) {
          this.board[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }


  drawBoard() {
    this.board.forEach((row: any[], y: number) => {
      row.forEach((value, x) => {
        if (value > 0 && this.ctx != null) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
          this.add3D(x, y, value);
        }
      });
    });
    this.addOutlines();
  }

  private add3D(x: number, y: number, color: number): void {
    if (this.ctx == null) {
      return
    }
    //Darker Color
    this.ctx.fillStyle = COLORSDARKER[color];
    // Vertical
    this.ctx.fillRect(x + .9, y, .1, 1);
    // Horizontal
    this.ctx.fillRect(x, y + .9, 1, .1);

    //Darker Color - Inner
    // Vertical
    this.ctx.fillRect(x + .65, y + .3, .05, .3);
    // Horizontal
    this.ctx.fillRect(x + .3, y + .6, .4, .05);

    // Lighter Color - Outer
    this.ctx.fillStyle = COLORSLIGHTER[color];

    // Lighter Color - Inner
    // Vertical
    this.ctx.fillRect(x + .3, y + .3, .05, .3);
    // Horizontal
    this.ctx.fillRect(x + .3, y + .3, .4, .05);

    // Lighter Color - Outer
    // Vertical
    this.ctx.fillRect(x, y, .05, 1);
    this.ctx.fillRect(x, y, .1, .95);
    // Horizontal
    this.ctx.fillRect(x, y, 1 , .05);
    this.ctx.fillRect(x, y, .95, .1);
  }

  pause() {
    if (this.gameStarted) {
      if (this.paused) {
        this.animate();
      } else if (this.ctx != null) {
        this.ctx.font = '1px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('GAME PAUSED', 1.4, 4);
        cancelAnimationFrame(this.requestId);
      }

      this.paused = !this.paused;
    }
  }

  async gameOver() {
    this.gameStarted = false;
    cancelAnimationFrame(this.requestId);
    this.highScore = this.points > this.highScore ? this.points : this.highScore;
    if (this.ctx == null) {
      return
    }
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(1, 3, 8, 1.2);
    this.ctx.font = '1px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('GAME OVER', 1.8, 4);

    console.log(`game is over we have ${this.points} points`)

    // store new high score in the database
    const doc = await this.scoreService.scoresDatabase?.scores.insert(
      {
        dateTime: new Date().toISOString(),
        score: `${this.points}`,
        player: 'newbie'
      }
    )
    console.log(`stored data is ${doc?.get('score')}`)

  }

  private addOutlines() {
    if (this.ctx == null) {
      return
    }
    for(let index = 1; index < COLS; index++) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(index, 0, .025, this.ctx.canvas.height);
    }

    for(let index = 1; index < ROWS; index++) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, index, this.ctx.canvas.width, .025);
    }
  }
}
