import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/config.service';
import { EventsModule } from './events/events.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    UsersModule,
    EventsModule,
    LocationsModule,
  ],
})
export class AppModule {}
