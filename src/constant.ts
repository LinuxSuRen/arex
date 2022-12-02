export const ExtensionVersion = '1.0.4';

export const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;
export enum MethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export const methodMap = {
  GET: {
    color: '#0cbb52',
  },
  PUT: {
    color: '#097bed',
  },
  POST: {
    color: '#ffb400',
  },
  DELETE: {
    color: '#eb2013',
  },
  PATCH: {
    color: '#212121',
  },
  UNKNOWN: {
    color: '#0cbb52',
  },
};

export enum NodeType {
  interface = 1,
  case = 2,
  folder = 3,
}

export enum ContentTypeEnum {
  ApplicationJson = 'application/json',
}

export enum RoleEnum {
  Admin = 1,
  Editor = 2,
  Viewer = 3,
}

export const RoleMap = {
  [RoleEnum.Admin]: 'Admin',
  [RoleEnum.Editor]: 'Editor',
  [RoleEnum.Viewer]: 'Viewer',
};

export enum FontSizeMap {
  small = 0.9,
  medium = 1,
  large = 1.1,
}

// localStorage key
export const UserProfileKey = 'userProfile';
export const EmailKey = 'email'; // 初始化接口相关的 email 请使用该 key 而非 UserInfo
export const AccessTokenKey = 'accessToken';
export const RefreshTokenKey = 'refreshToken';
export const CollapseMenuKey = 'collapseMenu';
export const EnvironmentKey = 'environmentId';
export const I18Key = 'i18nextLng';
