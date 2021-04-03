import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Merchant as IMerchant } from '../../../../_shared/types';

@Entity({ name: 'merchants' })
export class MerchantEntity implements IMerchant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  currency: string;

  @Column()
  isTrading: boolean;

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
