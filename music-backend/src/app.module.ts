import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {AppDataSource} from '../ormconfig'
import { CustomConfigModule } from './config/config.module';
import { UserModule } from './modules/users/users.module';
import { MusicModule } from './modules/musics/musics.module';
import { CategoryModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArtistModule } from './modules/artists/artists.module';
import { EmbeddingModule } from './modules/embedding/embedding.module';
@Module({
  imports: [ 
    UserModule,
    CategoryModule,
    AuthModule,
    ArtistModule,
    EmbeddingModule,
    MusicModule,
    CustomConfigModule,
  TypeOrmModule.forRoot(AppDataSource.options)
],
  controllers: [],
  providers: [],
})
export class AppModule {}
