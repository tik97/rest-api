export class CreateArticleDto {
  title: string;
  description: string;
  publicationDate: Date;
  author: string;

  constructor(title: string, description: string, publicationDate: Date, author: string) {
    this.title = title;
    this.description = description;
    this.publicationDate = publicationDate;
    this.author = author;
  }
}
