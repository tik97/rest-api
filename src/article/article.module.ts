import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ArticleService } from './article.service';
import { ArticleRepository } from './article.repository';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    CacheModule.register(),
  ],
  providers: [ArticleService, ArticleRepository],
  exports: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}