import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';

@Module({})
export class PostsModule {
  imports: [UsersModule];
}
