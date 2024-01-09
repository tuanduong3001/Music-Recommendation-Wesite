import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateMusicTable1678540169922 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `musics` (' +
            '`id` int(11) NOT NULL AUTO_INCREMENT, ' +
            '`name` varchar(225) NOT NULL,' +
            '`category_id` int(11) DEFAULT NULL,' +
            '`source` varchar(225) NOT NULL,' +
            '`image` varchar(225) NOT NULL,' +
            '`view` int(11) DEFAULT 0,' +
            '`like` int(11) DEFAULT 0,' +
            '`duration` int(11) DEFAULT 0,' +
            '`created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP),' +
             '`updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP),' +
             'KEY `FK_3373bsd2341s8965d9238413sbc` (`category_id`), ' +
             'CONSTRAINT `FK_3373bsd2341s8965d9238413sbc` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, ' +
            'PRIMARY KEY (`id`))' +
            'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `musics`')
    }

}
