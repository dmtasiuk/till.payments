import * as React from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Auth } from '../../../../../../_shared/types';
import { loginAction } from 'store/slices/auth/actions';
import { RootState } from 'types/RootState';
import { APP_DASHBOARD } from '../../../../routes';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function LoginForm(): React.ReactElement {
  const { authError, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values: Auth) => {
    dispatch(loginAction.request(values))
      .then(() => history.push(APP_DASHBOARD))
      .catch(() => {
        // nothing to do
      });
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      className="auth-form"
    >
      {authError && <Alert message={authError} type="error" closable />}
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input allowClear type="email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password autoComplete="current-password" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
