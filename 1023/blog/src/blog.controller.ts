import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog') // localhost:3000/blog
export class BlogController {
  blogService: BlogService;

  constructor(blogService: BlogService) {
    this.blogService = blogService;
  }

  @Get() // localhost:3000/blog get
  getAllPosts() {
    console.log('getAllPosts');
    return this.blogService.getAllPosts();
  }

  @Post() // localhost:3000/blog post
  createPost(@Body() post: any): any {
    console.log(post);
    this.blogService.createPost(post);
    return post;
  }

  @Get('/:id') // localhost:3000/blog/123 get => id, console.log(id) ===> 123
  getPost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 하나 가져오기`);
    return this.blogService.getPost(id);
  }

  @Delete('/:id') // localhost:3000/blog/123 delete => id, console.log(id) ===> 123
  deletePost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 삭제`);
    this.blogService.delete(id);
    return 'success';
  }

  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() post: any) {
    console.log(`[id: ${id}] 게시글 수정`);
    console.log(post);
    return this.blogService.updatePost(id, post);
  }
}