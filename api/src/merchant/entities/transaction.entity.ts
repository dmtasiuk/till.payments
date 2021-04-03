import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transaction as ITransaction } from '../../../../_shared/types';

@Entity({ name: 'transactions' })
export class TransactionEntity implements ITransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  ccLastFour: string;

  @Column()
  ccExpiry: string;

  @Column()
  ccToken: string;

  @Column()
  merchantId: string;

  @Column()
  customerId: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  toJSON() {
    delete this.deletedAt;
    return this;
  }
}
