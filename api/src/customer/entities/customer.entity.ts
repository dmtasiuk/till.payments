import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer as ICustomer } from '../../../../_shared/types';
import { MerchantEntity } from '../../merchant/entities/merchant.entity';

@Entity({ name: 'customers' })
export class CustomerEntity implements ICustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  merchantId: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: `CURRENT_TIMESTAMP(6)` })
  public updatedAt: Date;


  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToOne(() => MerchantEntity)
  @JoinColumn()
  merchant: MerchantEntity;

  public fullName: string;

  @AfterLoad()
  getFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  get isNew(): boolean {
    return false;
  }

  toJSON() {
    delete this.deletedAt;
    return this;
  }
}
