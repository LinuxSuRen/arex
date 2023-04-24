import { EditOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { useRequest } from 'ahooks';
import { App, Breadcrumb, Button, Input, Select, Space, Tag, Typography } from 'antd';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { treeFindPath } from '../../../helpers/collection/util';
import { getLocalStorage } from '../../../helpers/utils';
import { CollectionService } from '../../../services/Collection.service';
import { FileSystemService } from '../../../services/FileSystem.service';
import { useStore } from '../../../store';
import { SpaceBetweenWrapper } from '../../styledComponents';
import QuickEdit from '../components/smart/QuickEdit';
import { HttpContext } from '../index';

const { Text } = Typography;

export type HttpBreadcrumbProps = {
  nodePath: string[];
  id: string;
  defaultTags?: string[];
  nodeType: number;
};

const CollectionBreadcrumb: FC<HttpBreadcrumbProps> = ({ nodePath, id, defaultTags, nodeType }) => {
  const { t } = useTranslation();
  const params = useParams();
  const { message } = App.useApp();
  const { store, dispatch } = useContext(HttpContext);
  const { collectionTreeData } = useStore();

  const [editEditAble, setEditAble] = useState(false);
  const [labelValue, setLabelValue] = useState<string[]>([]);

  const { data: labelsData } = useRequest(
    () => CollectionService.queryLabels({ workspaceId: params.workspaceId as string }),
    {
      ready: !!params.workspaceId,
    },
  );

  const { run: runUpdateRequestDescription } = useRequest(
    () =>
      nodeType === 2
        ? // @ts-ignore
          FileSystemService.saveCase({ id: id, description: store.request.description })
        : // @ts-ignore
          FileSystemService.saveInterface({ id: id, description: store.request.description }),
    {
      manual: true,
      onSuccess() {
        message.success('update success');
      },
    },
  );

  const { run: runUpdateRequestName } = useRequest(
    () => {
      const paths = treeFindPath(collectionTreeData, (node) => node.key === id);
      return CollectionService.rename({
        id: params.workspaceId,
        newName: store.request.name,
        path: paths.map((i) => i.key),
        userName: getLocalStorage('email'),
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success('update success');
        window.globalFetchTreeData();
      },
    },
  );

  useEffect(() => {
    defaultTags &&
      setLabelValue(defaultTags.filter((t) => labelsData?.map((d) => d.id).includes(t)));
  }, [defaultTags, labelsData]);

  const { run: saveLabel } = useRequest(FileSystemService.saveCase, {
    manual: true,
    onSuccess(success) {
      success ? message.success('update label success') : message.error('update label failed');
    },
    onFinally() {
      setEditAble(false);
    },
  });

  return (
    <SpaceBetweenWrapper>
      <Space>
        <QuickEdit
          edit={(setDisplayMode: any) => (
            <Input
              css={css`
                width: 260px;
              `}
              size={'small'}
              value={store.request.name || ''}
              onChange={(e) => {
                dispatch((state) => {
                  state.request.name = e.target.value;
                });
              }}
              onBlur={() => {
                setDisplayMode();
                runUpdateRequestName();
              }}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  setDisplayMode();
                  runUpdateRequestName();
                }
              }}
            />
          )}
          display={
            <Breadcrumb>
              {nodePath.map((title, index) => (
                <Breadcrumb.Item key={index}>{title}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
          }
        ></QuickEdit>

        {nodeType === 2 &&
          (!editEditAble ? (
            <div
              css={css`
                margin-left: 10px;
                &:hover {
                  .edit-btn {
                    display: inline-block;
                  }
                }
              `}
            >
              {labelValue.length > 0 ? (
                labelValue.map((id) => (
                  <Tag key={id} color={labelsData?.find((d) => d.id === id)?.color}>
                    {labelsData?.find((d) => d.id === id)?.labelName}
                  </Tag>
                ))
              ) : (
                <Tag>{t('http.add_tag', { ns: 'components' })}</Tag>
              )}

              <Button
                css={css`
                  display: none;
                `}
                className={'edit-btn'}
                size='small'
                type='link'
                icon={<EditOutlined />}
                onClick={() => {
                  setEditAble(true);
                }}
              ></Button>
            </div>
          ) : (
            <Select
              css={css`
                width: 360px;
              `}
              autoFocus
              allowClear
              size='small'
              mode='multiple'
              placeholder='Please select'
              value={labelValue}
              options={labelsData?.map((t) => ({ label: t.labelName, value: t.id }))}
              tagRender={({ label, value }) => (
                <Tag
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  key={value}
                  closable
                  onClose={() => {
                    setLabelValue(labelValue.filter((l) => l !== value));
                  }}
                  color={labelsData?.find((d) => d.id === value)?.color}
                >
                  {label}
                </Tag>
              )}
              onBlur={() =>
                saveLabel({ id, workspaceId: params.workspaceId as string, labelIds: labelValue })
              }
              onChange={setLabelValue}
            />
          ))}
        <QuickEdit
          edit={(setDisplayMode: any) => (
            <Input
              size={'small'}
              value={store.request.description}
              onChange={(e) => {
                dispatch((state) => {
                  state.request.description = e.target.value;
                });
              }}
              onBlur={() => {
                setDisplayMode();
                runUpdateRequestDescription();
              }}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  setDisplayMode();
                  runUpdateRequestDescription();
                }
              }}
            />
          )}
          display={
            <Text
              type={'secondary'}
              css={css`
                font-size: 12px;
              `}
            >
              {store.request.description || t('description', { ns: 'common' })}
            </Text>
          }
        ></QuickEdit>
      </Space>
    </SpaceBetweenWrapper>
  );
};

export default CollectionBreadcrumb;