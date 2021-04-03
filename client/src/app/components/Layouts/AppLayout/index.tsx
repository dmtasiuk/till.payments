import * as React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import * as routes from '../../../../routes';
import './styles.scss';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const { Header, Footer, Content } = Layout;

const Copyrights: React.ElementType = () => (
  <>&copy; {new Date().getFullYear()}</>
);

export function AppLayout({ children }: Props) {
  const history = useHistory();
  const [activeMenuItem, setActiveMenuItem] = useState(
    history.location.pathname,
  );

  const onMenuClick = (menuItem: string): void => {
    setActiveMenuItem(menuItem);
    history.push(menuItem);
  };

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={({ key }) => onMenuClick(key.toString())}
          selectedKeys={[activeMenuItem]}
        >
          <Menu.Item key={routes.APP_DASHBOARD}>Dashboard</Menu.Item>
          <Menu.Item key={routes.APP_CUSTOMERS}>Customers</Menu.Item>
          <Menu.Item key={routes.APP_MERCHANTS}>Merchants</Menu.Item>
        </Menu>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <Copyrights />
      </Footer>
    </Layout>
  );
}
