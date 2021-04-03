import * as React from 'react';
import { Layout } from 'antd';
import './styles.scss';

interface Props {
  children: React.ReactNode;
}

export function AuthLayout({ children }: Props) {
  return (
    <Layout>
      <Layout.Content>
        <div className={'auth-container'}>{children}</div>
      </Layout.Content>
    </Layout>
  );
}
