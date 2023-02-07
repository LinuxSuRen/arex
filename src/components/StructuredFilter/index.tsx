import { SearchOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { BaseSelectRef } from 'rc-select';
import React, { useMemo, useRef, useState } from 'react';
import { useImmer } from 'use-immer';

import StructuredOption, { StructuredOptionRef, StructuredValue } from './StructuredOption';
import StructuredTag from './StructuredTag';

const FilterData: StructuredValue[] = [{ category: 'Name', operator: 'contains', value: 'invest' }];

const StructuredFilter = () => {
  const selectRef = useRef<BaseSelectRef>(null);
  const structuredOptionRef = useRef<StructuredOptionRef>(null);

  const [open, setOpen] = useState(false);
  const [filterData, setFilterData] = useImmer<StructuredValue[]>(FilterData);

  const options = useMemo(
    () => [
      {
        category: 'number',
        operator: ['==', '>', '<', '>=', '<='],
        value: [1, 2, 3],
      },
      {
        category: 'name',
        operator: ['==', '!='],
        value: ['pwang31'],
      },
    ],
    [],
  );

  const handleChange = (value: StructuredValue) => {
    setOpen(false);
    setFilterData((state) => {
      state.push(value);
    });
  };

  const handleSearch = () => {
    console.log({ filterData });
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Select
        ref={selectRef}
        mode='multiple'
        value={filterData.map((data) => JSON.stringify(data))}
        open={open}
        tagRender={StructuredTag}
        dropdownRender={() => (
          <StructuredOption ref={structuredOptionRef} options={options} onChange={handleChange} />
        )}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setOpen(false);
          structuredOptionRef.current?.reset();
        }}
        style={{ flexGrow: 1, marginRight: '8px' }}
      />

      <Button icon={<SearchOutlined />} onClick={handleSearch} style={{ height: '36px' }}>
        Search
      </Button>
    </div>
  );
};

export default StructuredFilter;
