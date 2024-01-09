import { forwardRef, Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import {
  IsEmailExistConstraint,
  IsEmailNotExistConstraint,
} from '../common/interceptors/exist-email.interceptor';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UsersAdminController } from './users.admin.controller';
import { UsersAdminService } from './users.admin.service';
import { IsMatchConfirmPasswordConstraint } from '../common/interceptors/is-match-password.interceptor';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { MusicService } from '../musics/musics.service';
import { MusicEntity } from '../../entities/music.entity';
import { CategoryEntity } from '../../entities/category.entity';
import { ArtistEntity } from '../../entities/artist.entity';
import { EmbeddingEntity } from '../../entities/embedding.entity';
import { CategoryAdminService } from '../categories/categories.admin.service';
import { ArtistService } from '../artists/artists.service';
import { EmbeddingService } from '../embedding/embedding.service';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS,
      },
    }),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([
      UserEntity,
      MusicEntity,
      CategoryEntity,
      ArtistEntity,
      EmbeddingEntity,
    ]),
  ],
  controllers: [UserController, UsersAdminController],
  providers: [
    UserService,
    AuthService,
    IsEmailExistConstraint,
    JwtService,
    MusicService,
    CategoryAdminService,
    UsersAdminService,
    IsEmailNotExistConstraint,
    IsMatchConfirmPasswordConstraint,
    ArtistService,
    EmbeddingService,  
  ],
  exports: [UserService, MusicService],
})
export class UserModule {}
