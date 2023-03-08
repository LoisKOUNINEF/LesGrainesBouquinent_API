import { MigrationInterface, QueryRunner } from "typeorm";

export class FixNullCascade1678290808216 implements MigrationInterface {
    name = 'FixNullCascade1678290808216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9eb8ce066f46b656be75d847150"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9eb8ce066f46b656be75d847150" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9eb8ce066f46b656be75d847150"`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9eb8ce066f46b656be75d847150" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
