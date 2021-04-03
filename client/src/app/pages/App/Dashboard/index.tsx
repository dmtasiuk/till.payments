import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../types/RootState';

export function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="block-center">
      <h1>
        Hello, {user?.firstName} {user?.lastName}!
      </h1>
      <span>Use navigation to manage customers and merchants...</span>
    </div>
  );
}
