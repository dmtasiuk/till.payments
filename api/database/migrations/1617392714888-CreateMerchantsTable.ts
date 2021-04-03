import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMerchantsTable1617392714888 implements MigrationInterface {

  private tableName: string = 'merchants';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'char',
          isPrimary: true,
          length: '36',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'currency',
          type: 'varchar',
          default: `'AUD'`,
        },
        {
          name: 'isTrading',
          type: 'boolean',
          default: false,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP()',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP()',
          onUpdate: 'CURRENT_TIMESTAMP()',
        },
        {
          name: 'deletedAt',
          type: 'timestamp',
          isNullable: true,
          default: null,
        },
      ],
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('merchants');
  }
}
