import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCustomersTable1617393759998 implements MigrationInterface {

  private tableName: string = 'customers';

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
          name: 'firstName',
          type: 'varchar',
        },
        {
          name: 'lastName',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
        },
        {
          name: 'merchantId',
          type: 'char',
          length: '36',
          isNullable: true,
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
      uniques: [
        {
          name: this.tableName + '_email_unique',
          columnNames: ['email'],
        },
      ],
      foreignKeys: [
        {
          name: this.tableName + '_merchantId_foreign',
          columnNames: ['merchantId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'merchants',
          onDelete: 'SET NULL',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, this.tableName + '_merchantId_foreign');
    await queryRunner.dropTable(this.tableName);
  }
}
