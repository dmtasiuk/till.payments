import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { validateUserAction } from '../../../store/slices/auth/actions';
import { RootState } from 'types/RootState';
import * as routes from 'routes';

interface Props {
  children: React.ReactElement;
}

const Loading = () => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
  </div>
);

export function AppContainer({ children }: Props) {
  const { authValidated, user } = useSelector((state: RootState) => state.auth);

  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect((): void => {
    dispatch(validateUserAction.request());
  }, [dispatch]);

  React.useEffect((): void => {
    const {
      location: { pathname },
    } = history;
    if (!authValidated) {
      return;
    }
    if (user && pathname === routes.HOME) {
      history.push(routes.APP_DASHBOARD);
    }
    if (!user && pathname !== routes.AUTH_LOGIN) {
      history.push(routes.AUTH_LOGIN);
    }
  }, [authValidated, user, history]);

  return authValidated ? children : <Loading />;
}
