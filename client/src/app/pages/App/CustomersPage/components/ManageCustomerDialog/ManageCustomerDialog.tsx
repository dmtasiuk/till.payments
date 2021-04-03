import * as React from 'react';
import { Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { customersActions } from 'store/slices/customers';
import { RootState } from 'types/RootState';
import { MerchantSelector } from 'app/components/MerchantSelector';
import { Customer } from '../../../../../../../../_shared/types';
import {
  createCustomerAction,
  updateCustomerAction,
} from 'store/slices/customers/actions';

interface Props {
  isDialogVisible: boolean;
  onSave: (customer: Customer) => void;
  onClose: () => void;
}

export function ManageCustomerDialog({
  isDialogVisible,
  onSave,
  onClose,
}: Props): React.ReactElement {
  const [form] = Form.useForm();
  const { saveLoading, editingCustomer, validationErrors } = useSelector(
    (state: RootState) => state.customers,
  );

  const dispatch = useDispatch();

  const onFormSubmit = () => {
    dispatchAction()
      .then(response => onSave(response))
      .catch(() => {
        //
      });
  };

  const onDialogClose = (): void => {
    // Wait for dialog animation to be finished
    setTimeout(() => {
      if (isEmpty(form.getFieldsValue())) {
        form.resetFields();
      }
      dispatch(customersActions.setValidationErrors({}));
    }, 300);

    onClose();
  };

  const dispatchAction = (): Promise<Customer> => {
    const dispatchingAction = editingCustomer?.id
      ? updateCustomerAction
      : createCustomerAction;
    const fields = {
      ...editingCustomer,
      ...form.getFieldsValue(),
    };
    return dispatch(dispatchingAction.request(fields));
  };

  React.useEffect(() => {
    if (isDialogVisible) {
      form.setFieldsValue(editingCustomer);
    }
  }, [isDialogVisible, form, editingCustomer]);

  return (
    <Modal
      okText="Save"
      destroyOnClose={true}
      onOk={() => form.submit()}
      onCancel={onDialogClose}
      visible={isDialogVisible}
      title={`${editingCustomer?.id ? 'Edit' : 'Create'} customer`}
      okButtonProps={{
        loading: saveLoading,
      }}
    >
      <Form
        {...{
          labelCol: { span: 5 },
          wrapperCol: { span: 18 },
        }}
        form={form}
        layout="horizontal"
        id="manage-customer-form"
        onFinish={onFormSubmit}
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input placeholder="Enter first name" allowClear />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input placeholder="Enter last name" allowClear />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          help={
            validationErrors.email !== undefined
              ? validationErrors.email[0]
              : undefined
          }
          validateStatus={validationErrors.email ? 'error' : undefined}
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" placeholder="Enter Email address" allowClear />
        </Form.Item>
        <Form.Item
          label="Merchant"
          name="merchantId"
          rules={[{ required: true, message: 'Please select a merchant!' }]}
        >
          <MerchantSelector />
        </Form.Item>
      </Form>
    </Modal>
  );
}
