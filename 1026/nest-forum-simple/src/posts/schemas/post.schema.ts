import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false, timestamps: { createdAt: true, updatedAt: false } })
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop({ default: '익명' })
  authorName: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true, maxlength: 100 })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [CommentSchema], default: [] })
  comments: Types.DocumentArray<Comment>;
}
export const PostSchema = SchemaFactory.createForClass(Post);
