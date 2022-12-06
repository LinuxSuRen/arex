import { SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize/types';
import styled from '@emotion/styled';
import { useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { Button, Input, Menu, Spin } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { ChangeEventHandler, ReactNode, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type MenuSelectProps<D, P extends any[]> = {
  sx?: CSSInterpolation; // custom style
  small?: boolean;
  refresh?: boolean; // show refresh button
  prefix?: ReactNode; // icon beside search input
  defaultSelectFirst?: boolean;
  initValue?: string;
  rowKey: string;
  selectedKeys?: string[];
  onSelect: (app: D) => void;
  onClick?: (info: any) => void;
  filter?: ((keyword: string, app: D) => boolean) | string;
  forceFilter?: boolean; // filtering even if the keyword is empty
  request: () => Promise<D[]>;
  requestOptions?: Options<D[], P>; // ahooks request options
  placeholder?: string; // from i18n namespace "components"
  itemRender?: (app: D, index: number) => { label: ReactNode; key: React.Key };
};

const MenuSelectWrapper = styled.div`
  height: 100%;
  padding: 8px;
  .ant-spin-nested-loading,
  .ant-spin {
    height: 100%;
    max-height: 100% !important;
  }
`;
const MenuList = styled(Menu, {
  shouldForwardProp: (propName) => propName !== 'small',
})<{
  small?: boolean;
}>`
  border: none !important;
  background: transparent !important;
  .ant-menu-item {
    color: ${(props) => props.theme.colorTextSecondary}!important;
    padding-left: 8px;
    height: ${(props) => (props.small ? '24px' : '28px')};
    line-height: ${(props) => (props.small ? '24px' : '28px')};
    background: transparent !important;
  }
  .ant-menu-item-active,
  .ant-menu-item-selected {
    color: ${(props) => props.theme.colorText}!important;
  }
  .ant-menu-item-active {
    background-color: ${(props) => props.theme.colorFillTertiary} !important;
  }
  .ant-menu-item-selected {
    background-color: ${(props) => props.theme.colorPrimaryBg} !important;
  }
`;

type MenuFilterProps = {
  refresh?: boolean;
  prefix?: ReactNode;
  size?: SizeType;
  value: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFresh?: () => void;
  className?: string;
};
const MenuFilter = styled((props: MenuFilterProps) => {
  return (
    <div className={props.className}>
      <span className='button-group'>
        {props.prefix}
        {props.refresh && (
          <Button type='text' size={props.size} icon={<SyncOutlined />} onClick={props.onFresh} />
        )}
      </span>

      <Input
        prefix={<SearchOutlined />}
        size={props.size}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        style={{ flex: 1 }}
      />
    </div>
  );
})`
  margin: 2px 0 6px 0;
  display: flex !important;
  .button-group {
    margin-right: 2px;
    .ant-btn-icon-only {
      color: ${(props) => props.theme.colorTextSecondary} !important;
      .anticon > svg {
        transform: scale(0.8);
      }
    }
  }
`;

function MenuSelect<D extends { [key: string]: any }, P extends any[] = []>(
  props: MenuSelectProps<D, P>,
) {
  const { t } = useTranslation('components');

  const [selectedKey, setSelectedKey] = useState<string>();
  const selectedKeys = useMemo(
    () => props.selectedKeys || (selectedKey ? [selectedKey] : undefined),
    [props.selectedKeys, selectedKey],
  );

  const [filterKeyword, setFilterKeyword] = useState('');

  const filter = useCallback(
    (data: D[]) =>
      data.filter((app) => {
        if (typeof props.filter === 'string') {
          return app[props.filter].toLocaleLowerCase().includes(filterKeyword.toLocaleLowerCase());
        } else {
          return props.filter && props.filter(filterKeyword, app);
        }
      }),
    [filterKeyword, props],
  );

  const {
    data: apps = [],
    loading,
    run: reload,
  } = useRequest<D[], P>(props.request, {
    onSuccess(res) {
      if (res.length && (props.defaultSelectFirst || props.initValue)) {
        const record = props.defaultSelectFirst
          ? props.forceFilter
            ? filter(res)[0]
            : res[0]
          : res.find((i) => i.id === props.initValue);

        if (record) {
          setSelectedKey(record[props.rowKey]);
          props.onSelect(record);
        }
      }
    },
    ...props.requestOptions,
  });

  const filteredApps = useMemo<ItemType[]>(() => {
    const filtered = (props.forceFilter || filterKeyword) && props.filter ? filter(apps) : apps;
    return filtered.map<ItemType>(
      props.itemRender
        ? props.itemRender
        : (app) => ({
            label: app[props.rowKey],
            key: app[props.rowKey],
          }),
    );
  }, [filterKeyword, props, apps]);

  const handleAppMenuClick = (value: { key: string }) => {
    const app: D | undefined = apps.find((app) => app[props.rowKey] === value.key);
    if (app) {
      props.onSelect(app);
      setSelectedKey(app[props.rowKey]);
    }
  };
  return (
    <MenuSelectWrapper css={css(props.sx)}>
      <Spin spinning={loading}>
        {/* 目前刷新按钮的显示受限于搜索逻辑 */}
        {props.filter && (
          <MenuFilter
            refresh={props.refresh}
            prefix={props.prefix}
            size={props.small ? 'small' : 'middle'}
            value={filterKeyword}
            placeholder={props.placeholder && t(props.placeholder)}
            onChange={(e) => setFilterKeyword(e.target.value)}
            onFresh={reload}
          />
        )}
        <MenuList
          small={props.small}
          selectedKeys={selectedKeys}
          items={filteredApps}
          onClick={handleAppMenuClick}
        />
      </Spin>
    </MenuSelectWrapper>
  );
}

export default MenuSelect;
