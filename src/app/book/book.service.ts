import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(req: CreateBookInput): Promise<Book> {
    const { title, author, year } = req;

    const payload = { title, author, year };
    const book = new Book(payload);

    const savedBook = await this.bookRepository.save(book);

    return this.bookRepository.save(savedBook);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new GraphQLError('Book Not Found.', {
        extensions: {
          code: 400,
        },
      });
    }

    return book;
  }

  async update(id: string, req: UpdateBookInput): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new GraphQLError('Book Not Found.', {
        extensions: {
          code: 400,
        },
      });
    }

    const payload = { title: req.title, author: req.author, year: req.year };

    await this.bookRepository.update(id, payload);

    return this.bookRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<boolean> {
    // const todo = await this.bookRepository.findOne({
    //   where: { id },
    // });

    // if (!todo) {
    //   throw new ApolloError('Book not found', 'NOT_FOUND', {
    //     statusCode: HttpStatus.NOT_FOUND,
    //   });
    // }

    await this.bookRepository.delete(id);
    return true; // Return true to indicate successful deletion
  }
}
