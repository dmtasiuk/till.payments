import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Merchant, Customer } from '../../../../../../../../_shared/types';

interface Props {
  actions: {
    onEdit: (row: Customer) => void;
    onDelete: (row: Customer) => void;
  };
}

const tableColumns = ({ actions: { onEdit, onDelete } }: Props) => [
  {
    title: '#',
    dataIndex: 'id',
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Merchant',
    dataIndex: 'merchant',
    render: (value: Merchant) => value.name,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    render: (value, row) => (
      <div className="ant-btn-group" style={{ marginLeft: '5px' }}>
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(row)}
        />
        <Button
          danger
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => onDelete(row)}
        />
      </div>
    ),
  },
];

export default tableColumns;
