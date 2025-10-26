import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async paginate(page = 1, limit = 10, search = '') {
    const q = search ? { title: { $regex: search, $options: 'i' } } : {};
    const total = await this.postModel.countDocuments(q);
    const data = await this.postModel
      .find(q)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      search,
    };
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id).lean();
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  create(dto: CreatePostDto) {
    return this.postModel.create(dto);
  }

  async update(id: string, dto: UpdatePostDto) {
    const post = await this.postModel.findByIdAndUpdate(id, dto, { new: true });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async delete(id: string) {
    const res = await this.postModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Post not found');
    return { deleted: true };
  }

  async addComment(id: string, dto: CreateCommentDto) {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    post.comments.push({
      content: dto.content,
      authorName: dto.authorName || '익명',
      createdAt: new Date(),
    } as any);
    await post.save();
    return post;
  }

  async deleteComment(postId: string, commentIndex: number) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    if (commentIndex < 0 || commentIndex >= post.comments.length)
      throw new NotFoundException('Comment not found');
    post.comments.splice(commentIndex, 1);
    await post.save();
    return post;
  }
}
