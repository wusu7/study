import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 목록 페이지
  @Get()
  @Render('posts/list')
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const p = Number(page) || 1;
    const l = Number(limit) || 10;
    return await this.postsService.paginate(p, l, search || '');
  }

  // 상세 페이지
  @Get(':id')
  @Render('posts/detail')
  async detail(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    return { post, id };
  }

  // 생성
  @Post()
  @Redirect('/posts')
  async create(@Body() dto: CreatePostDto) {
    await this.postsService.create(dto);
  }

  // 수정
  @Post(':id')
  @Redirect()
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    await this.postsService.update(id, dto);
    return { url: `/posts/${id}` };
  }

  // 삭제
  @Post(':id/delete')
  @Redirect('/posts')
  async remove(@Param('id') id: string) {
    await this.postsService.delete(id);
  }

  // 댓글 추가
  @Post(':id/comments')
  @Redirect()
  async addComment(@Param('id') id: string, @Body() dto: CreateCommentDto) {
    await this.postsService.addComment(id, dto);
    return { url: `/posts/${id}` };
  }

  // 댓글 삭제
  @Post(':id/comments/:index/delete')
  @Redirect()
  async deleteComment(@Param('id') id: string, @Param('index') index: string) {
    await this.postsService.deleteComment(id, Number(index));
    return { url: `/posts/${id}` };
  }
}
