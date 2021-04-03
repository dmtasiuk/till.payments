import * as React from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMerchantsAction } from '../../../store/slices/merchants/actions';
import { RootState } from '../../../types/RootState';

interface Props {
  value?: string | undefined;
  onChange?: (value: string) => void;
}

export function MerchantSelector({ value, onChange }: Props) {
  const {
    merchants: { items },
  } = useSelector((state: RootState) => state.merchants);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchMerchantsAction.request({ page: 1 }));
  }, [dispatch]);

  return (
    <Select
      showSearch
      allowClear
      className="full-width"
      optionFilterProp="children"
      placeholder="Select a merchant"
      defaultValue={value}
      onChange={onChange}
      filterOption={(input, option) =>
        // @ts-ignore
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {items.map(({ id, name }) => (
        <Select.Option key={id} value={id}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
}
