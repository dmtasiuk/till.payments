import * as React from 'react';
import { Input, Tooltip } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { customersActions } from 'store/slices/customers';

const suffix = (
  <Tooltip title="To much things for one demo :)">
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  </Tooltip>
);

interface Props {
  refresh: () => void;
}

export function CustomersFilter({ refresh }: Props): React.ReactElement {
  const dispatch = useDispatch();

  const onInputChange = (query: string): void => {
    dispatch(
      customersActions.setSearchQuery(query.length ? query.trim() : undefined),
    );
    dispatch(customersActions.setPagination({ page: 1 }));
    refresh();
  };

  return (
    <Input.Search
      allowClear
      suffix={suffix}
      enterButton="Search"
      placeholder="Search a customer"
      onSearch={onInputChange}
    />
  );
}
