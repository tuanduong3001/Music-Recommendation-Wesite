import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateArtistTable1680025586033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `artists` (' +
            '`id` int(11) NOT NULL AUTO_INCREMENT, ' +
            '`name` varchar(225) NOT NULL,' +
            '`image` varchar(225) NOT NULL,' +
            '`title` varchar(225) NOT NULL,' +
            '`created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP),' +
             '`updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP),' +
            'PRIMARY KEY (`id`))' +
            'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `artists`')
    }

}
