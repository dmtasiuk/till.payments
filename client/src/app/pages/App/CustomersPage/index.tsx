import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, message, Modal, Row } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { CustomersTable } from './components/CustomersTable/CustomersTable';
import { ManageCustomerDialog } from './components/ManageCustomerDialog/ManageCustomerDialog';
import { Customer } from '../../../../../../_shared/types';
import { customersActions } from 'store/slices/customers';
import './styles.scss';
import { CustomersFilter } from './components/CustomersFilter/CustomersFilter';
import {
  deleteCustomerAction,
  fetchCustomersAction,
} from 'store/slices/customers/actions';

export function CustomersPage(): React.ReactElement {
  const [isDialogVisible, toggleDialogVisibility] = useState<boolean>(false);

  const dispatch = useDispatch();

  const toggleDialog = (): void => {
    toggleDialogVisibility(!isDialogVisible);
  };

  const onDialogSave = (customer: Customer): void => {
    toggleDialog();
    dispatchCustomer();
    message.success(
      `Customer successfully ${customer.isNew ? 'created' : 'updated'}`,
    );
  };

  const onDialogCancel = (): void => {
    dispatchCustomer();
    toggleDialog();
  };

  const onTableRefresh = (): void => {
    dispatch(fetchCustomersAction.request({}));
  };

  const onCustomerDelete = (customer: Customer): void => {
    Modal.confirm({
      title: 'Wait!',
      content: 'Do you want to delete this customer?',
      onOk() {
        return dispatch(deleteCustomerAction.request(customer)).then(() => {
          message.success('Customer successfully deleted');
        });
      },
      onCancel() {},
    });
  };

  const onCustomerEdit = (customer: Customer): void => {
    dispatchCustomer(customer);
    toggleDialog();
  };

  const dispatchCustomer = (customer?: Customer | undefined): void => {
    dispatch(customersActions.setEditingCustomer(customer));
  };

  React.useEffect((): void => {
    dispatch(fetchCustomersAction.request({}));
  }, [dispatch]);

  return (
    <React.Fragment>
      <ManageCustomerDialog
        isDialogVisible={isDialogVisible}
        onClose={onDialogCancel}
        onSave={onDialogSave}
      />
      <Row>
        <Col span={6}>
          <CustomersFilter refresh={onTableRefresh} />
        </Col>
        <Col span={18}>
          <div className="add-customer-button text-right">
            <Button
              type="primary"
              onClick={toggleDialog}
              icon={<PlusCircleOutlined />}
            >
              Create customer
            </Button>
          </div>
        </Col>
      </Row>
      <CustomersTable
        refresh={onTableRefresh}
        onRowEdit={onCustomerEdit}
        onRowDelete={onCustomerDelete}
      />
    </React.Fragment>
  );
}
