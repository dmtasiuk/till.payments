import { Pagination, Table } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customersActions as actions } from 'store/slices/customers';
import columns from './tableColumns';
import { RootState } from '../../../../../../types/RootState';
import { Customer } from '../../../../../../../../_shared/types';

interface Props {
  refresh: () => void;
  onRowEdit: (customer: Customer) => void;
  onRowDelete: (customer: Customer) => void;
}

export function CustomersTable({
  refresh,
  onRowEdit,
  onRowDelete,
}: Props): React.ReactElement {
  const {
    customers,
    fetchLoading,
    pagination: { page, limit },
  } = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch();

  const onPaginationChanged = (page: number): void => {
    dispatch(actions.setPagination({ page }));
    refresh();
  };

  const onLimitChanged = (page: number, limit: number): void => {
    dispatch(actions.setPagination({ page: 1, limit }));
  };
  const tableColumns = columns({
    actions: {
      onEdit: onRowEdit,
      onDelete: onRowDelete,
    },
  });

  return (
    <Table
      rowKey="id"
      columns={tableColumns}
      pagination={false}
      loading={fetchLoading}
      dataSource={customers.items}
      rowClassName={row => (row.isNew ? 'odd' : '')}
      footer={() => (
        <div className="text-right">
          {customers.items.length > 0 && (
            <React.Fragment>
              <Pagination
                total={customers.meta.totalItems}
                current={page}
                pageSize={limit}
                showTotal={total => true}
                onShowSizeChange={onLimitChanged}
                onChange={onPaginationChanged}
              />
            </React.Fragment>
          )}
        </div>
      )}
    />
  );
}
