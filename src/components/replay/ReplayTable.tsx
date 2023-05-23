import { usePagination } from 'ahooks';
import { theme, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FC, useState } from 'react';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { useCustomSearchParams } from '../../router/useCustomSearchParams';
import ReplayService from '../../services/Replay.service';
import { PlanStatistics } from '../../services/Replay.type';
import { FullHeightSpin } from '../styledComponents';
import HighlightRowTable, { HighlightRowTableProps } from '../styledComponents/HighlightRowTable';
import StatusTag from './StatusTag';

const defaultPageSize = 5 as const;

export type ResultsProps = {
  appId?: string;
  refreshDep?: React.Key;
  onSelectedPlanChange: (selectedPlan: PlanStatistics) => void;
};

const ReplayTable: FC<ResultsProps> = (props) => {
  const { appId, refreshDep, onSelectedPlanChange } = props;

  const nav = useNavigate();
  const location = useLocation();
  const customSearchParams = useCustomSearchParams();

  const { token } = theme.useToken();
  const { t } = useTranslation(['components']);
  const [search] = useSearchParams();

  const [init, setInit] = useState(true);

  const defaultPagination = {
    defaultCurrent: parseInt(search.get('current') || '1'),
    defaultRow: parseInt(search.get('row') || '0'),
  };

  const columns: ColumnsType<PlanStatistics> = [
    {
      title: t('replay.replayReportName'),
      dataIndex: 'planName',
      ellipsis: { showTitle: false },
      render: (text) => (
        <Tooltip title={text} placement='topLeft'>
          <a>{text}</a>
        </Tooltip>
      ),
    },
    {
      title: t('replay.state'),
      render: (_, record) => (
        <StatusTag
          status={record.status}
          caseCount={record.successCaseCount + record.failCaseCount + record.errorCaseCount}
          totalCaseCount={record.totalCaseCount}
          message={record.errorMessage}
        />
      ),
    },
    {
      title: t('replay.passed'),
      width: 80,
      dataIndex: 'successCaseCount',
      render: (text) => (
        <CountUp
          preserveValue
          duration={0.3}
          end={text}
          style={{ color: token.colorSuccessText }}
        />
      ),
    },
    {
      title: t('replay.failed'),
      width: 80,
      dataIndex: 'failCaseCount',
      render: (text) => (
        <CountUp preserveValue duration={0.3} end={text} style={{ color: token.colorErrorText }} />
      ),
    },
    {
      title: t('replay.invalid'),
      width: 80,
      dataIndex: 'errorCaseCount',
      render: (text) => (
        <CountUp preserveValue duration={0.3} end={text} style={{ color: token.colorInfoText }} />
      ),
    },
    {
      title: t('replay.blocked'),
      width: 80,
      dataIndex: 'waitCaseCount',
      render: (text) => (
        <CountUp
          preserveValue
          duration={0.3}
          end={text}
          style={{ color: token.colorWarningText }}
        />
      ),
    },
    {
      title: t('replay.executor'),
      dataIndex: 'creator',
    },
    {
      title: t('replay.replayStartTime'),
      dataIndex: 'replayStartTime',
      render(text) {
        return text ? new Date(text).toLocaleString() : '-';
      },
    },
    {
      title: t('replay.replayEndTime'),
      dataIndex: 'replayEndTime',
      render(text) {
        return text ? new Date(text).toLocaleString() : '-';
      },
    },
  ];

  const {
    data: { list: planStatistics } = { list: [] },
    pagination,
    loading,
    cancel: cancelPollingInterval,
  } = usePagination(
    (params) =>
      ReplayService.queryPlanStatistics({
        appId,
        ...params,
      }),
    {
      ready: !!appId,
      loadingDelay: 200,
      pollingInterval: 6000,
      defaultPageSize,
      defaultCurrent: defaultPagination.defaultCurrent,
      refreshDeps: [appId, refreshDep],
      onSuccess({ list }) {
        if (init) {
          onSelectedPlanChange(list[parseInt(search.get('row') || '0')]);
          setInit(false); // 设置第一次初始化标识);
        }
        list.every((record) => record.status !== 1) && cancelPollingInterval();
      },
    },
  );

  const handleRowClick: HighlightRowTableProps<PlanStatistics>['onRowClick'] = (record, index) => {
    onSelectedPlanChange(record);
    nav(
      `${location.pathname}?data=${customSearchParams.query.data}&planId=${record.planId}&current=${pagination.current}&row=${index}`,
    );
  };

  return (
    <FullHeightSpin
      spinning={init}
      minHeight={240}
      // 为了 defaultCurrent 和 defaultRow 生效，需在初次获取到数据后再挂载子组件
      mountOnFirstLoading={false}
    >
      <HighlightRowTable<PlanStatistics>
        rowKey='planId'
        size='small'
        loading={loading}
        columns={columns}
        pagination={pagination}
        onRowClick={handleRowClick}
        dataSource={planStatistics}
        defaultCurrent={defaultPagination.defaultCurrent}
        defaultRow={defaultPagination.defaultRow}
        sx={{
          '.ant-table-cell-ellipsis': {
            color: token.colorPrimary,
          },
        }}
      />
    </FullHeightSpin>
  );
};

export default ReplayTable;
