import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const newArticle = this.articleRepository.create(createArticleDto);
    console.log(newArticle);
    await this.articleRepository.save(newArticle);
    await this.cacheManager.del('articles');
    return newArticle;
  }

  async findAll(): Promise<Article[]> {
    const cachedArticles = await this.cacheManager.get<Article[]>('articles');
    if (cachedArticles) {
      return cachedArticles;
    }

    const articles = await this.articleRepository.find();
    await this.cacheManager.set('articles', articles, 600);
    return articles;
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const article = await this.articleRepository.preload({
      id,
      ...updateArticleDto,
    });
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    await this.articleRepository.save(article);
    await this.cacheManager.del('articles');
    return article;
  }

  async remove(id: number): Promise<void> {
    const result = await this.articleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    await this.cacheManager.del('articles'); // Удаляем кэш, чтобы обновить данные
  }
}
