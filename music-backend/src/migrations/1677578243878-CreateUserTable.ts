import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1677578243878 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `users` (' +
            '`id` int(11) NOT NULL AUTO_INCREMENT, ' +
            '`name` varchar(225) DEFAULT NULL,' +
            '`email` varchar(255) DEFAULT NULL,' +
            '`avatar` varchar(255) DEFAULT NULL,' +
            '`dateOfBirth` Date DEFAULT NULL,' +
            '`gender` tinyint NOT NULL DEFAULT 1,' +
            '`role` tinyint NOT NULL DEFAULT 1,' +
            '`password` varchar(255) DEFAULT NULL,' +
            '`resetPasswordExpires` DATETIME DEFAULT NULL,' +
            '`resetPasswordToken` varchar(255) DEFAULT NULL,' +
            '`created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP),' +
             '`updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP),' +
            'PRIMARY KEY (`id`))' +
            'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP Table `users`')
    }

}
