'use client';

import { InfoCircleOutlined } from '@ant-design/icons';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Button, Select } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import AppLayout from '@/components/custom/AppLayout/AppLayout';
import EditableTable from '@/components/custom/EditableTable/EditableTable';
import { HBox } from '@/components/custom/HBox/Hbox';
import { StandardText } from '@/components/custom/StandardText/StandardText';
import { VBox } from '@/components/custom/VBox/VBox';
import { useScenarioGroups } from '@/hooks/useScenarioGroups';
import {
  useDeleteModelMutation,
  useFetchFeedQuery,
  usePatchModelMutation,
} from '@/store';
import { clearModel } from '@/store/slices/modelSlice';
import type { PlotModel } from '@/types/feed/Feed';

import { COLUMNS } from '../utils/constants';

const Index = () => {
  const { data, error, refetch } = useFetchFeedQuery();
  const [patchModel] = usePatchModelMutation();
  const [displayData, setDisplayData] = useState<PlotModel[]>(
    data?.recentCompletedModels ?? [],
  );
  const [selected, setSelected] = useState<number[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    flowScenarios: flowScenarioOptions,
    loadScenarios: loadScenarioOptions,
    unsatScenarios: unsatScenarioOptions,
    welltypeScenarios: welltypeScenarioOptions,
  } = useScenarioGroups();

  useEffect(() => {
    setDisplayData(data?.recentCompletedModels ?? []);
  }, [data]);

  useEffect(() => {
    dispatch(clearModel());
    refetch();
  }, []);

  if (error) {
    console.log('error', error);
    const e = error as FetchBaseQueryError;
    if (e && e.status === 401) {
      router.push('/user/login');
    }
  }

  const filterScenarios = (filter: string | null) => {
    if (filter) {
      const newData = (data?.recentCompletedModels ?? []).filter(
        (d) =>
          d.flowScenario === filter ||
          d.unsatScenario === filter ||
          d.wellTypeScenario === filter ||
          d.loadScenario === filter,
      );
      setDisplayData(newData);
    } else {
      setDisplayData(data?.recentCompletedModels ?? []);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelected(newSelectedRowKeys.map((key) => parseInt(`${key}`, 10)));
  };

  const rowSelection: TableRowSelection<PlotModel> = {
    selectedRowKeys: selected,
    onChange: onSelectChange,
  };

  const [deleteModel] = useDeleteModelMutation();

  return (
    <AppLayout>
      <HBox>
        <StandardText variant="h1" style={{ marginTop: 10 }}>
          Home
        </StandardText>
        <Button
          type="primary"
          size="large"
          onClick={() => router.push('/model/create')}
        >
          Create Scenario
        </Button>
      </HBox>
      <VBox spacing="large" style={{ marginTop: 20 }}>
        <HBox spacing="small">
          <StandardText variant="body1">Scenario Type:</StandardText>
          <Select
            showSearch
            placeholder="Filter Scenarios"
            optionFilterProp="children"
            allowClear
            style={{ width: 500 }}
            onChange={filterScenarios}
          >
            <Select.OptGroup label="Flow Scenario">
              {flowScenarioOptions.map((item) => (
                <Select.Option key={item.id} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select.OptGroup>
            <Select.OptGroup label="Load Scenario">
              {loadScenarioOptions.map((item) => (
                <Select.Option key={item.id} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select.OptGroup>
            <Select.OptGroup label="Unsat Scenario">
              {unsatScenarioOptions.map((item) => (
                <Select.Option key={item.id} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select.OptGroup>
            <Select.OptGroup label="Well Type Scenario">
              {welltypeScenarioOptions.map((item) => (
                <Select.Option key={item.id} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select.OptGroup>
          </Select>
        </HBox>
        <HBox
          style={{
            padding: 10,
            backgroundColor: 'rgba(100,149,237, 0.2)',
            borderRadius: 8,
          }}
        >
          <HBox spacing="small">
            <InfoCircleOutlined />
            You may select two or more models to compare. Maximum of 32.
          </HBox>
          <Button
            disabled={selected.length <= 1 || selected.length > 32}
            onClick={() =>
              router.push(`/model/compare/?models=${selected.join('&models=')}`)
            }
          >
            Compare Scenario
          </Button>
        </HBox>
        <EditableTable<PlotModel>
          scroll={{ x: 'max-content' }}
          rowSelection={rowSelection}
          columns={COLUMNS}
          dataSource={displayData}
          rowKey={(model) => model.id}
          updateCallback={async (m) => {
            await patchModel({
              id: m.id,
              name: m.name,
              description: m.description,
            });
            await refetch();
          }}
          deleteCallback={async (id) => {
            await deleteModel(id);
            await refetch();
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                router.push(`/model/?id=${record.id}`);
              },
            };
          }}
        />
      </VBox>
    </AppLayout>
  );
};

export default Index;
