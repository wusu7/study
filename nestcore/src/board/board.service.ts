import { Injectable } from '@nestjs/common';
import { title } from 'process';

@Injectable()
export class BoardService {}

   boards = [{
     id: 1,
     title: '게시글'
   },
{
  id: 2,
  title: '게시글2'
}]

getAllBoards(){
    return this.boards

}