import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmbeddingEntity } from "../../entities/embedding.entity";
import { EmbeddingController } from "./embedding.controller";
import { EmbeddingService } from "./embedding.service";

@Module({
    imports: [TypeOrmModule.forFeature([EmbeddingEntity])],
    controllers: [EmbeddingController],
    providers: [EmbeddingService]
})
export class EmbeddingModule{}