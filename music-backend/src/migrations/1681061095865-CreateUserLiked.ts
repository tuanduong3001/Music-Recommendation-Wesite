import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserLiked1681061095865 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `user_liked` (' +
            '`id` int(11) NOT NULL AUTO_INCREMENT,'+
            '`user_id` int(11) DEFAULT NULL,' +
            '`music_id` int(11) DEFAULT NULL,' +
             '`created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP), ' +
              '`updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP), ' +
              'KEY `FK_3373bsd2341s8965d94365sbc` (`user_id`), ' +
              'KEY `FK_3373bsd2341s8965d921a123sbc` (`music_id`), ' +
             'CONSTRAINT `FK_3373bsd2341s8965d94365sbc` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, ' +
             'CONSTRAINT `FK_3373bsd2341s8965d921a123sbc` FOREIGN KEY (`music_id`) REFERENCES `musics` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, ' +
            'PRIMARY KEY (`id`))' +
            'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;',
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `user_liked`')
    }

}
