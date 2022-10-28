import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import AjaxTest from './components/AjaxTest';

const { Cell } = ResponsiveGrid;

const Dashboard1 = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <AjaxTest />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Dashboard1;
