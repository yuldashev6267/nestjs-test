import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs_app',
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true,
  autoLoadEntities: true,
};
