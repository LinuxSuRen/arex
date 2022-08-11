import styled from '@emotion/styled';
import { useRequest } from 'ahooks';
import { Badge, Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FC, useState } from 'react';

import ReplayService from '../../services/Replay.service';
import { PlanStatistics } from '../../services/Replay.type';
import { useStore } from '../../store';
import { Theme } from '../../style/theme';
const { Text } = Typography;

export const resultsStates = [
  { label: 'init', color: 'grey', value: 0 },
  { label: 'running', color: 'orange', value: 1 },
  { label: 'done', color: 'green', value: 2 },
  { label: 'interrupted', color: 'red', value: 3 },
  { label: 'cancelled', color: 'blue', value: 4 },
];

const columns: ColumnsType<PlanStatistics> = [
  {
    title: 'Report Name',
    dataIndex: 'planName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'State',
    render: (_, record) => {
      const state = resultsStates.find((s) => s.value === record.status);
      return state ? (
        <Tag color={state.color}>
          {state.label}
          {record.status === 1 && (
            <span style={{ marginLeft: '8px' }}>
              <Badge status='processing' />
              {record.percent && <span>{record.percent > 99 ? 99 : record.percent}</span>}
            </span>
          )}
        </Tag>
      ) : (
        <Tag>Unknown State</Tag>
      );
    },
  },
  {
    title: 'Passed',
    dataIndex: 'successCaseCount',
    render: (text) => <Text style={{ color: '#91cc75' }}>{text}</Text>,
  },
  {
    title: 'Failed',
    dataIndex: 'failCaseCount',
    render: (text) => <Text style={{ color: '#ef6566' }}>{text}</Text>,
  },
  {
    title: 'Invalid',
    dataIndex: 'errorCaseCount',
    render: (text) => <Text style={{ color: '#73c0de' }}>{text}</Text>,
  },
  {
    title: 'Blocked',
    dataIndex: 'waitCaseCount',
    render: (text) => <Text style={{ color: '#fac858' }}>{text}</Text>,
  },
  {
    title: 'Executor',
    dataIndex: 'creator',
  },
  {
    title: 'replayStartTime',
    dataIndex: 'replayStartTime',
    render(text) {
      return text ? new Date(text).toLocaleString() : '';
    },
  },
];

const AppTable = styled(Table)<{ theme?: Theme }>`
  // highlight selected row
  .clickRowStyl {
    background-color: ${(props) => (props.theme === Theme.light ? '#f6efff' : '#171528')};
  }
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background-color: ${(props) =>
      props.theme === Theme.light ? '#f6efff88' : '#17152888'}!important;
  }
`;

const Results: FC<{
  appId?: string;
  defaultSelectFirst?: boolean;
  refreshDep?: React.Key;
  onSelectedPlanChange: (selectedPlan: PlanStatistics) => void;
}> = ({ appId, defaultSelectFirst, refreshDep, onSelectedPlanChange }) => {
  const theme = useStore((state) => state.theme);
  const [selectRow, setSelectRow] = useState<number>(defaultSelectFirst ? 0 : -1);
  const { data: planStatistics, loading } = useRequest(
    () =>
      ReplayService.queryPlanStatistics({
        appId,
        needTotal: true,
        pageSize: 100,
        pageIndex: 1,
      }),
    {
      ready: !!appId,
      refreshDeps: [appId, refreshDep],
      onSuccess(res) {
        res.length && defaultSelectFirst && onSelectedPlanChange(res[0]);
      },
    },
  );
  return (
    <div>
      <AppTable
        rowKey='planId'
        size='small'
        theme={theme}
        loading={loading}
        pagination={{ pageSize: 5 }}
        columns={columns}
        onRow={(record, index) => {
          return {
            onClick: () => {
              if (typeof index === 'number') {
                setSelectRow(index === selectRow ? -1 : index);
                onSelectedPlanChange(record as PlanStatistics);
              }
            },
          };
        }}
        rowClassName={(record, index) => (index === selectRow ? 'clickRowStyl' : '')}
        dataSource={planStatistics}
      />
    </div>
  );
};

export default Results;
