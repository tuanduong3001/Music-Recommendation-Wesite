import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateMusicArtistTable1680025709061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `music_artist` (' +
            '`id` int(11) NOT NULL AUTO_INCREMENT,'+
            '`artist_id` int(11) DEFAULT NULL,' +
            '`music_id` int(11) DEFAULT NULL,' +
             '`created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP), ' +
              '`updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP), ' +
              'KEY `FK_3373bsd2341s8965d9212333sbc` (`artist_id`), ' +
              'KEY `FK_3373bsd2341s8965d921231231sbc` (`music_id`), ' +
             'CONSTRAINT `FK_3373bsd2341s8965d9212333sbc` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, ' +
             'CONSTRAINT `FK_3373bsd2341s8965d921231231sbc` FOREIGN KEY (`music_id`) REFERENCES `musics` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, ' +
            'PRIMARY KEY (`id`))' +
            'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;',
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `music_artist`')
    }

}
