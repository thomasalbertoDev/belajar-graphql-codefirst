import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';

@Module({
  imports: [BookModule],
  providers: [],
  exports: [],
})
export class AppModule {}
