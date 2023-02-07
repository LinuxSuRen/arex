import { Button, Space } from 'antd';
import { DefaultOptionType } from 'rc-select/lib/Select';
import React from 'react';

const StructuredTag = (props: DefaultOptionType) => {
  return (
    <Space.Compact block size='small' style={{ margin: '4px' }}>
      <Button size='small'>{JSON.parse(props.value as string)?.category}</Button>
      <Button size='small'>{JSON.parse(props.value as string)?.operator}</Button>
      <Button size='small'>{JSON.parse(props.value as string)?.value}</Button>
    </Space.Compact>
  );
};

export default StructuredTag;
