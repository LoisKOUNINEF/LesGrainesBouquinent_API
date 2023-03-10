import { MigrationInterface, QueryRunner } from "typeorm";

export class BookPicture1678441766547 implements MigrationInterface {
    name = 'BookPicture1678441766547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "pictureUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "pictureUrl"`);
    }

}
