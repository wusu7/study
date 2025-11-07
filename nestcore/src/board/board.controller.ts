import { Controller, Get,Post, Put} from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/all')
  getAllBoards() {
    return this.boardService.getAllBoards()
  }
}
