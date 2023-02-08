import { Tabs, Tag } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useImmer } from 'use-immer';

import { uuid } from '../../helpers/utils';
import { useStore } from '../../store';
import { Authorization } from '../Folder';
import { ScriptBlocks } from '../index';
import { reorder, ScriptBlock, ScriptBlocksMap, ScriptBlockType } from '../ScriptBlocks';
import { ScriptBlocksProps } from '../ScriptBlocks/ScriptBlocks';
import StructuredFilter, {
  LabelKey,
  SearchDataType,
  StructuredFilterProps,
} from '../StructuredFilter';
import { PageFC } from './index';

const ScriptBlocksSource = [ScriptBlocksMap[ScriptBlockType.CustomScript]];

const FolderPage: PageFC = () => {
  const { t } = useTranslation(['components', 'page']);
  const [script, setScript] = useState<string>();
  const [items, setItems] = useImmer<ScriptBlock<string>[]>([]);

  const { labelData } = useStore();
  const [searchData, setSearchData] = useState<SearchDataType>();
  const options = useMemo(
    () => [
      {
        category: LabelKey,
        operator: ['==', '!='],
        value: labelData.map((label) => ({
          label: <Tag color={label.color}>{label.labelName}</Tag>,
          key: label.id,
        })),
      },
      {
        category: 'name',
        operator: ['==', '!='],
        value: ['Tom', 'Jack', 'Lina'],
      },
    ],
    [labelData],
  );

  const handleAdd: ScriptBlocksProps<string>['onAdd'] = (key) => {
    const block = ScriptBlocksSource.find((block) => block.key === key);
    if (!block) return;

    const data: ScriptBlock<string> = {
      key: uuid(),
      type: block.type,
      icon: block.icon,
      label: block.label,
      value: '',
      disabled: false,
    };
    const state = items.concat(data);
    setItems(state);
  };

  const handleDelete = useCallback<Required<ScriptBlocksProps<string>>['onDelete']>(
    (id) => {
      const state = items.filter((item) => item.key !== id);
      setItems(state);
    },
    [items],
  );

  const handleDrag = useCallback<Required<ScriptBlocksProps<string>>['onDrag']>(
    (source, destination) => {
      setItems(reorder(items, source, destination));
    },
    [items],
  );

  const handleSave = () => {
    const output = items.filter((item) => !item.disabled);
    console.log({ output });
  };

  const handlePreRequestScriptChange: ScriptBlocksProps<string>['onChange'] = ({ id, value }) => {
    if (typeof value === 'string') setScript(value);
    else
      setItems((state) => {
        const index = state.findIndex((item) => item.key === id);
        index >= 0 && (state[index] = value);
      });
  };

  return (
    <Tabs
      defaultActiveKey='authorization'
      items={[
        {
          key: 'authorization',
          label: t('http.authorization', { ns: 'components' }),
          children: <Authorization />,
        },
        {
          key: 'pre-requestScript',
          label: t('http.pre-requestScript', { ns: 'components' }),
          children: (
            <ScriptBlocks
              multiple
              value={items}
              blocksSource={ScriptBlocksSource}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onDrag={handleDrag}
              onChange={handlePreRequestScriptChange}
              onSave={handleSave}
            />
          ),
        },
        {
          key: 'tests',
          label: t('folderPage.tests', { ns: 'page' }),
          children: (
            <>
              <StructuredFilter options={options} onSearch={setSearchData} />
              <span>{JSON.stringify(searchData)}</span>
            </>
          ),
        },
      ]}
    />
  );
};

export default FolderPage;
