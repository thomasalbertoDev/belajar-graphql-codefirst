import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { CreateBookInput } from './dto/create-book.input';
import { Book } from './entities/book.entity';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book, { name: 'createBook' })
  async createBook(@Args('request') req: CreateBookInput): Promise<Book> {
    return this.bookService.create(req);
  }

  @Query(() => [Book], { name: 'findAll' })
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query(() => Book, { name: 'findOne' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book, { name: 'updateBook' })
  async updateBook(@Args('id') id: string, @Args('request') req: UpdateBookInput): Promise<Book> {
    return this.bookService.update(id, req);
  }

  @Mutation(() => Boolean, { name: 'removeBook' })
  async removeBook(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return this.bookService.remove(id);
  }
}
