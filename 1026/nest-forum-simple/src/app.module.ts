import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // ✅ 환경 변수 모듈 추가
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // ✅ .env를 전역에서 읽게 설정
    MongooseModule.forRoot(process.env.MONGODB_URI || ''), // ✅ undefined 방지
    PostsModule,
  ],
})
export class AppModule {}
