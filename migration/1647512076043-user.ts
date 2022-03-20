import { MigrationInterface, QueryRunner } from 'typeorm';

export class user1647512076043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "k1" ALTER COLUMN "name" RENAME TO "name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
