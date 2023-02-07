import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { useKeyPress } from 'ahooks';
import { Button, Select } from 'antd';
import { isEqual } from 'lodash';
import { BaseSelectRef } from 'rc-select';
import React, { useMemo, useRef, useState } from 'react';
import { useImmer } from 'use-immer';

import { tryParseJsonString } from '../../helpers/utils';
import StructuredOption, { StructuredOptionRef, StructuredValue } from './StructuredOption';
import StructuredTag from './StructuredTag';

const FilterData: StructuredValue[] = [{ category: 'Name', operator: 'contains', value: 'invest' }];

const StructuredFilter = () => {
  const selectRef = useRef<BaseSelectRef>(null);
  const structuredOptionRef = useRef<StructuredOptionRef>(null);

  const [focus, setFocus] = useState(false);
  const [open, setOpen] = useState(false);

  const [keyword, setKeyword] = useState<string>();
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

  useKeyPress('Backspace', () => {
    // focus &&
    //   setFilterData((state) => {
    //     state.pop();
    //   });
  });

  const handleDeleteTag = (value?: string) => {
    const parsedValue = tryParseJsonString<StructuredValue>(value);
    const data = filterData.filter((data) => !isEqual(parsedValue, data));
    setFilterData(data);
  };

  const handleChange = (value: StructuredValue) => {
    setOpen(false);
    setFilterData((state) => {
      state.push(value);
    });
  };

  const handleSearch = () => {
    console.log({ filterData, keyword });
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Select
        allowClear
        ref={selectRef}
        mode='multiple'
        open={open}
        tagRender={(props) => <StructuredTag {...props} onDelete={handleDeleteTag} />}
        value={filterData.map((data) => JSON.stringify(data))}
        searchValue={keyword}
        autoClearSearchValue={false}
        dropdownRender={() => (
          <StructuredOption
            ref={structuredOptionRef}
            keyword={keyword}
            options={options}
            onChange={handleChange}
            onSearch={handleSearch}
          />
        )}
        onSearch={setKeyword}
        onClear={() => setFilterData([])}
        onFocus={() => {
          setFocus(true);
          setOpen(true);
        }}
        onBlur={() => {
          setFocus(false);
          setOpen(false);
          structuredOptionRef.current?.reset();
        }}
        css={css`
          flex-grow: 1;
          margin-right: 8px;
          .ant-select-selector {
            height: 36px;
          }
        `}
      />

      <Button icon={<SearchOutlined />} onClick={handleSearch} style={{ height: '36px' }}>
        Search
      </Button>
    </div>
  );
};

export default StructuredFilter;
