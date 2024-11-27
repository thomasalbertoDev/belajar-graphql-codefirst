import { AppModule } from '@/app/app.module';
import { DateScalar } from '@/scalars/date.scalar';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    AppModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      debug: true,
      // buildSchemaOptions: {
      //   dateScalarMode: 'timestamp',
      // },
    }),
  ],
  providers: [DateScalar],
})
export class GraphqlModule {}
