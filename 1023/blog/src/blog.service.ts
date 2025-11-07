import { Injectable } from '@nestjs/common';
import { PostDto } from './blog.model';
import { BlogRepositoryImpl } from './blog.repository';

@Injectable()
export class BlogService {
  // posts: PostDto[] = [];

  constructor(private readonly blogRepository: BlogRepositoryImpl) {}

  async getAllPosts(): Promise<PostDto[]> {
    return await this.blogRepository.getAllPosts();
  }

  createPost(postDto: PostDto) {
    this.blogRepository.createPost(postDto);
  }

  getPost(id: string) {
    return this.blogRepository.getPost(id);
  }

  delete(id: string) {
    this.blogRepository.delete(id);
  }

  updatePost(id: string, postDto: PostDto) {
    this.blogRepository.updatePost(id, postDto);
  }
}