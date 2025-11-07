import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog, BlogSchema } from './blog.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogRepositoryImpl } from './blog.repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blog'),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogRepositoryImpl],
})
export class AppModule {}