import { css } from '@emotion/react';
import { useRequest } from 'ahooks';
import { Progress, Table } from 'antd';
import axios from 'axios';
import { useState } from 'react';

interface RunResultPaneProps {
  name: string;
}
const columns = [
  {
    title: 'interfaceId',
    dataIndex: 'interfaceId',
    key: 'interfaceId',
  },
  {
    title: 'interfaceName',
    dataIndex: 'interfaceName',
    key: 'interfaceName',
  },

  {
    title: 'statusList',
    dataIndex: 'statusList',
    key: 'statusList',
    render(_: any, record: any) {
      console.log({ _, record });
      return (
        <div>
          <Progress percent={30} size="small" />
        </div>
      );
    },
  },
];
const url = 'http://10.5.153.1:8090/api/batchcomparereport';
const RunResultPane = () => {
  const [value, setValue] = useState('');
  const { data } = useRequest(() => {
    return axios
      .post(
        url + '/queryBatchCompareProgress',
        {
          planId: '905019230',
        },
        {
          headers: {
            [`access-token`]: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzY4Nzg3NTQsInVzZXJuYW1lIjoidHpoYW5nbUB0cmlwLmNvbSJ9.tEBtdQX63rDbukFYAt_9J0SwkEpt-3XLCNazwV9SrjU`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.body);
        return res.data.body;
      });
  });
  return (
    <div
      css={css`
        display: block;
      `}
    >
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{'record.description'}</p>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
      />
    </div>
  );
};

export default RunResultPane;
