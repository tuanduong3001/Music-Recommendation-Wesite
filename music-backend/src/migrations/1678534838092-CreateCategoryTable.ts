import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateCategoryTable1678534838092 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `categories` (' +
            '`id` int(11) NOT NULL AUTO_INCREMENT,'+
            '`name` varchar(225) DEFAULT NULL,' +
             '`created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP), ' +
              '`updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP), ' +
            'PRIMARY KEY (`id`))' +
            'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;',
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('Drop Table `categories`')
    }

}
