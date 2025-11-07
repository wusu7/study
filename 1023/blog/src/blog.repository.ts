import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { PostDto } from './blog.model';
// import * as fs from 'fs';

export interface BlogRepository {
  getAllPosts(): Promise<PostDto[]>;
  createPost(postDto: PostDto);
  getPost(id: string): Promise<PostDto>;
  delete(id: string): Promise<void>;
  updatePost(id: string, postDto: PostDto): Promise<PostDto>;
}

@Injectable()
export class BlogRepositoryImpl implements BlogRepository {
  // FILE_NAME = './src/blog.json';

  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    this.blogModel = blogModel;
  }

  getAllPosts(): Promise<PostDto[]> {
    return this.blogModel.find().exec();
  }

  async createPost(postDto: PostDto) {
    const createdPost = {
      ...postDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };

    await this.blogModel.create(createdPost);
  }

  getPost(id: string): Promise<PostDto> {
    return this.blogModel.findById(id).exec() as Promise<PostDto>;
  }

  delete(id: string): Promise<void> {
    console.log(`[id: ${id}] 게시글 삭제`);
    this.blogModel.findByIdAndDelete(id).exec();
    return Promise.resolve();
  }

  async updatePost(id: string, postDto: PostDto): Promise<PostDto> {
    const updatedPost = {
      ...postDto,
      updatedDt: new Date(),
    };

    await this.blogModel.findByIdAndUpdate(id, updatedPost).exec();
    return updatedPost;
  }
}