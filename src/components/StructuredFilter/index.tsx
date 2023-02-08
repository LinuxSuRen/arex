import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { useKeyPress } from 'ahooks';
import { Button, Select } from 'antd';
import { isEqual } from 'lodash';
import { BaseSelectRef } from 'rc-select';
import React, { FC, useRef, useState } from 'react';
import { useImmer } from 'use-immer';

import StructuredOption, {
  StructuredOptionMode,
  StructuredOptionProps,
  StructuredOptionRef,
  StructuredOptionType,
  StructuredValue,
} from './StructuredOption';
import StructuredTag from './StructuredTag';

export const LabelKey = 'label';
export type SearchDataType = { keyword?: string; structuredValue: StructuredValue[] };
export type StructuredFilterProps = {
  onSearch?: (value: SearchDataType) => void;
  options: StructuredOptionType[];
};

const StructuredFilter: FC<StructuredFilterProps> = (props) => {
  const selectRef = useRef<BaseSelectRef>(null);
  const structuredOptionRef = useRef<StructuredOptionRef>(null);

  const [focus, setFocus] = useState(false);
  const [open, setOpen] = useState(false);

  const [keyword, setKeyword] = useState<string>();
  const [filterData, setFilterData] = useImmer<StructuredValue[]>([]);

  useKeyPress(['Backspace', 'Enter'], (e) => {
    if (focus) {
      if (e.key === 'Enter') return handleSearch();
      if (e.key === 'Backspace' && !keyword) {
        setFilterData((state) => {
          state.pop();
        });
      }
    }
  });

  const handleTagOperatorClick = (data?: StructuredValue) => {
    structuredOptionRef.current?.set({ type: 'operator', data });
  };

  const handleTagValueClick = (data?: StructuredValue) => {
    structuredOptionRef.current?.set({ type: 'value', data });
  };

  const handleDeleteTag = (value?: StructuredValue) => {
    const data = filterData.filter((data) => !isEqual(value, data));
    setFilterData(data);
  };

  const handleChange: StructuredOptionProps['onChange'] = (mode, value, oldValue) => {
    setOpen(false);
    if (mode === StructuredOptionMode.modify) {
      setFilterData((state) => {
        const index = state.findIndex((item) => isEqual(item, oldValue));
        index >= 0 && (state[index] = value);
      });
    } else if (mode === StructuredOptionMode.append) {
      setFilterData((state) => {
        state.push(value);
      });
    }
  };

  const handleSearch = () => {
    setOpen(false);
    props.onSearch?.({ structuredValue: filterData, keyword });
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Select
        allowClear
        ref={selectRef}
        mode='multiple'
        open={open}
        tagRender={(props) => (
          <StructuredTag
            {...props}
            onOperatorClick={handleTagOperatorClick}
            onValueClick={handleTagValueClick}
            onDelete={handleDeleteTag}
          />
        )}
        value={filterData.map((data) => JSON.stringify(data))}
        searchValue={keyword}
        autoClearSearchValue={false}
        dropdownRender={() => (
          <StructuredOption
            ref={structuredOptionRef}
            keyword={keyword}
            options={props.options}
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
