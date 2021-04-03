import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactionsTable1617394837556 implements MigrationInterface {

  private tableName: string = 'transactions';

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
          name: 'amount',
          type: 'decimal',
          precision: 8,
          scale: 2,
        },
        {
          name: 'description',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'ccLastFour',
          type: 'varchar',
          length: '4',
        },
        {
          name: 'ccExpiry',
          type: 'varchar',
          length: '5',
        },
        {
          name: 'ccToken',
          type: 'varchar',
        },
        {
          name: 'merchantId',
          type: 'char',
          length: '36',
          isNullable: true,
        },
        {
          name: 'customerId',
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
      foreignKeys: [
        {
          name: this.tableName + '_merchantId_foreign',
          columnNames: ['merchantId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'merchants',
          onDelete: 'SET NULL',
        },
        {
          name: this.tableName + '_customerId_foreign',
          columnNames: ['customerId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'customers',
          onDelete: 'SET NULL',
        },
      ],
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, this.tableName + '_merchantId_foreign');
    await queryRunner.dropForeignKey(this.tableName, this.tableName + '_customerId_foreign');
    await queryRunner.dropTable(this.tableName);
  }
}
