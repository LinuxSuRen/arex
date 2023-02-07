import { MoreOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { App, Button, Dropdown, Input, Popconfirm } from 'antd';
import React, { ReactNode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { EmailKey, MethodMap } from '../../../constant';
import SearchHighLight from '../../../helpers/collection/searchHighLight';
import { treeFindPath } from '../../../helpers/collection/util';
import { generateGlobalPaneId, getLocalStorage } from '../../../helpers/utils';
import { CollectionService } from '../../../services/Collection.service';
import { FileSystemService } from '../../../services/FileSystem.service';
import { useStore } from '../../../store';
import { PagesType } from '../../panes';
import { MenusType } from '../index';

const PrefixIcon = styled(
  (props: { icon: ReactNode; border?: boolean }) => <div {...props}>{props.icon}</div>,
  { shouldForwardProp: (prop) => prop !== 'border' },
)`
  margin-right: 6px;
  border: ${(props) => (props.border ? '1px solid' : 'none')};
  font-size: 12px;
  display: block;
  line-height: 12px;
`;

function CollectionTitle({
  val,
  updateDirectoryTreeData,
  treeData,
  callbackOfNewRequest,
  searchValue,
}: any) {
  const { t } = useTranslation(['common', 'components']);
  const { message } = App.useApp();
  const _useParams = useParams();
  const { setPages } = useStore();
  const userName = getLocalStorage<string>(EmailKey);

  const [open, setOpen] = useState(false);
  const [renameKey, setRenameKey] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const menu = (val: any) => {
    const paths = treeFindPath(treeData, (node: any) => node.key === val.key);
    return {
      items: [
        {
          key: '7',
          label: (
            <span className={'dropdown-click-target'}>
              {t('collection.batch_run', { ns: 'components' })}
            </span>
          ),
          disabled: val.nodeType !== 3,
        },
        {
          key: '8',
          label: (
            <span className={'dropdown-click-target'}>
              {t('collection.batch_compare', { ns: 'components' })}
            </span>
          ),
          disabled: val.nodeType !== 3,
        },
        {
          key: '3',
          label: (
            <span className={'dropdown-click-target'}>
              {t('collection.add_folder', { ns: 'components' })}
            </span>
          ),
          // 只有类型为3才能新增文件夹
          disabled: val.nodeType !== 3,
        },
        {
          key: '1',
          label: (
            <span className={'dropdown-click-target'}>
              {t('collection.add_request', { ns: 'components' })}
            </span>
          ),
          disabled: val.nodeType !== 3,
        },
        {
          key: '2',
          label: (
            <span className={'dropdown-click-target'}>
              {t('collection.add_case', { ns: 'components' })}
            </span>
          ),
          disabled: val.nodeType !== 1,
        },
        {
          key: '4',
          label: (
            <span className={'dropdown-click-target'}>
              {t('collection.rename', { ns: 'components' })}
            </span>
          ),
        },
        {
          key: '6',
          label: (
            <span className={'dropdown-click-target'}>
              {t('collection.duplicate', { ns: 'components' })}
            </span>
          ),
        },
        {
          key: '5',
          label: (
            <Popconfirm
              title={t('are_you_sure')}
              okText={t('yes')}
              cancelText={t('no')}
              onConfirm={() => {
                CollectionService.removeItem({
                  id: _useParams.workspaceId,
                  removeNodePath: paths.map((i: any) => i.key),
                  userName,
                }).then(() => {
                  updateDirectoryTreeData();
                });
              }}
            >
              <a style={{ color: 'red' }}>{t('collection.delete', { ns: 'components' })}</a>
            </Popconfirm>
          ),
        },
      ],
      onClick(e: any) {
        switch (e.key) {
          case '3':
            CollectionService.addItem({
              id: _useParams.workspaceId,
              nodeName: 'New Collection',
              nodeType: 3,
              parentPath: paths.map((i: any) => i.key),
              userName,
            })
              .then(() => {
                updateDirectoryTreeData();
              })
              .catch((e) => message.error(e));
            break;
          case '1':
            CollectionService.addItem({
              id: _useParams.workspaceId,
              nodeName: 'New Request',
              nodeType: 1,
              parentPath: paths.map((i: any) => i.key),
              userName,
            }).then((res) => {
              updateDirectoryTreeData();
              callbackOfNewRequest(
                [res.body.infoId],
                paths.map((i: any) => i.key),
                1,
              );
            });
            break;
          case '2':
            CollectionService.addItem({
              id: _useParams.workspaceId,
              nodeName: 'case',
              nodeType: 2,
              parentPath: paths.map((i: any) => i.key),
              userName,
            }).then((res) => {
              FileSystemService.queryInterface({ id: paths[paths.length - 1].key }).then(
                (parentInterface) => {
                  FileSystemService.saveCase({
                    workspaceId: _useParams.workspaceId as string,
                    ...parentInterface,
                    id: res.body.infoId,
                  }).then((_) => {
                    updateDirectoryTreeData();
                    callbackOfNewRequest(
                      [res.body.infoId],
                      paths.map((i) => i.key),
                      2,
                    );
                  });
                },
              );
            });
            break;
          case '4':
            setRenameKey(val.id);
            setRenameValue(val.title);
            break;
          case '6':
            CollectionService.duplicate({
              id: _useParams.workspaceId,
              path: paths.map((i: any) => i.key),
              userName,
            }).then((res) => {
              console.log(res);
              updateDirectoryTreeData();
            });
            break;
          case '7':
            setPages(
              {
                key: val.id,
                title: t('collection.batch_run', { ns: 'components' }),
                pageType: PagesType.BatchRun,
                menuType: MenusType.Collection,
                isNew: true,
                data: undefined,
                paneId: generateGlobalPaneId(MenusType.Collection, PagesType.BatchRun, val.id),
                rawId: val.id,
              },
              'push',
            );
            break;
          case '8':
            setPages(
              {
                key: val.id,
                title: t('collection.batch_compare', { ns: 'components' }),
                pageType: PagesType.BatchCompare,
                menuType: MenusType.Collection,
                isNew: true,
                data: undefined,
                paneId: generateGlobalPaneId(MenusType.Collection, PagesType.BatchCompare, val.id),
                rawId: val.id,
              },
              'push',
            );
            break;
        }
        e.domEvent.stopPropagation();
        setOpen(false);
      },
    };
  };

  const rename = () => {
    const paths = treeFindPath(treeData, (node: any) => node.key === val.key);
    CollectionService.rename({
      id: _useParams.workspaceId,
      newName: renameValue,
      path: paths.map((i: any) => i.key),
      userName,
    }).then(() => {
      updateDirectoryTreeData();
      setRenameValue('');
      setRenameKey('');
    });
  };

  const method = useMemo(() => {
    return Object.keys(MethodMap).includes(val.method) ? val.method : 'UNKNOWN';
  }, [val]);

  return (
    <div className={'collection-title-render'}>
      <div className={'left'}>
        {val.nodeType === 1 && (
          // @ts-ignore
          <span css={css(`color:${MethodMap[method].color};margin-right:4px`)}>{method}</span>
        )}
        {val.nodeType === 2 && <PrefixIcon border icon='case' />}
        <div className={'content'}>
          {renameKey === val.id ? (
            <Input
              value={renameValue}
              onPressEnter={rename}
              onBlur={rename}
              onChange={(val) => setRenameValue(val.target.value)}
              style={{ padding: '0 4px', width: '100%' }}
            />
          ) : (
            <SearchHighLight text={val.title} keyword={searchValue} />
          )}
        </div>
      </div>

      <div className='right'>
        <Dropdown menu={menu(val)} trigger={['click']} open={open} onOpenChange={setOpen}>
          <Button
            type='text'
            size='small'
            icon={<MoreOutlined style={{ fontSize: '14px' }} />}
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
      </div>
    </div>
  );
}

export default CollectionTitle;