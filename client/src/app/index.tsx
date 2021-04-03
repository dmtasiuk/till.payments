import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/Auth/LoginPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { PrivateRoute } from './components/PrivateRoute';
import * as routes from '../routes';
import { AppLayout, AuthLayout } from './components/Layouts';
import { AppContainer } from './components/AppContainer/Loadable';
import { Dashboard } from './pages/App/Dashboard/Loadable';
import { CustomersPage } from './pages/App/CustomersPage/Loadable';
import { MerchantsPage } from './pages/App/MerchantsPage/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Till.payments Demo"
        defaultTitle="Till.payments Demo"
      />
      <AppContainer>
        <Switch>
          <Route exact path={routes.HOME} component={HomePage} />
          {/* Auth routes */}
          <Route
            path={routes.AUTH}
            render={() => (
              <AuthLayout>
                <Route exact path={routes.AUTH_LOGIN} component={LoginPage} />
              </AuthLayout>
            )}
          />
          {/* Application routes */}
          <PrivateRoute
            path={routes.APP}
            render={() => (
              <AppLayout>
                <PrivateRoute
                  exact
                  component={Dashboard}
                  path={routes.APP_DASHBOARD}
                />
                <PrivateRoute
                  exact
                  component={CustomersPage}
                  path={routes.APP_CUSTOMERS}
                />
                <PrivateRoute
                  exact
                  component={MerchantsPage}
                  path={routes.APP_MERCHANTS}
                />
              </AppLayout>
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </AppContainer>
    </BrowserRouter>
  );
}
