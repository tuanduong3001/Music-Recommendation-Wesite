import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateMusicEmbedding1681037775078 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `music_embedding` (' +
            '`id` int(11) NOT NULL AUTO_INCREMENT,'+
            '`music_id` int(11) DEFAULT NULL,' +
            '`embedding` LONGTEXT NOT NULL,' +
             '`created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP), ' +
            '`updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP), ' +
              'KEY `FK_3373bsd2341s8965d92123112sbc` (`music_id`), ' +
             'CONSTRAINT `FK_3373bsd2341s8965d93433sbc` FOREIGN KEY (`music_id`) REFERENCES `musics` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, ' +
            'PRIMARY KEY (`id`))' +
            'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;',
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `music_embedding`')
    }

}
