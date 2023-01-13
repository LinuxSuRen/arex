import {
  ApiOutlined,
  DeploymentUnitOutlined,
  FieldTimeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import React, { FC, ReactNode } from 'react';

import AppSettingMenu from './AppSettingMenu';
import CollectionMenu from './CollectionMenu';
import EnvironmentMenu from './EnvironmentMenu';
import ReplayMenu from './ReplayMenu';

export type MenuConfig = {
  key: string;
  label: string;
  icon: ReactNode;
  Menu?: FC;
  children?: MenuConfig[];
};

export enum MenusType {
  Collection = 'collection',
  Replay = 'replay',
  AppSetting = 'appSetting',
  Environment = 'environment',
  Setting = 'setting',
}

// TODO import ExtraConfig
// import ExtraConfig from 'src/extra/menus'
const ExtraConfig: MenuConfig[] = [];

const CommonConfig: MenuConfig[] = [
  {
    key: MenusType.Collection,
    label: MenusType.Collection,
    icon: <ApiOutlined />,
    Menu: CollectionMenu,
  },
  {
    key: MenusType.Replay,
    label: MenusType.Replay,
    icon: <FieldTimeOutlined />,
    Menu: ReplayMenu,
  },
  {
    key: MenusType.Environment,
    label: MenusType.Environment,
    icon: <DeploymentUnitOutlined />,
    Menu: EnvironmentMenu,
  },
  {
    key: MenusType.AppSetting,
    label: MenusType.AppSetting,
    icon: <SettingOutlined />,
    Menu: AppSettingMenu,
  },
];

const Config = [...CommonConfig, ...ExtraConfig];

export default Config;
export { CollectionMenu, EnvironmentMenu, ReplayMenu };
