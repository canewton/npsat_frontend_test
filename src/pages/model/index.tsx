import { Box, Divider } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { CoreContainer } from '@/components/core/CoreContainer/CoreContainer';
import { CoreTabs } from '@/components/core/CoreTabs/CoreTabs';
import { CoreText } from '@/components/core/CoreText/CoreText';
import Footer from '@/components/custom/Footer/Footer';
import Layout from '@/components/custom/Layout/Layout';
import { VBox } from '@/components/custom/VBox/VBox';
import { useModelRegions } from '@/hooks/useModelRegionsInfo';
import { useGetModelandBaseModelDetailQuery } from '@/store';
import type { ModelDetail } from '@/store/apis/modelApi';
import type { RegionDetail } from '@/store/apis/regionApi';

import BAUCompareChart from './components/BAUCompareChart';
import CropLoadingDetailsTable from './components/CropLoadingDetailsTable';
import ModelChart from './components/ModelChart';
import ModelDescriptionTable from './components/ModelDescriptionTable';

const ModelPage = () => {
  const router = useRouter();
  const modelDetail = useGetModelandBaseModelDetailQuery(+router.query.id!);
  const [selectedTab, setSelectedTab] = useState('Comparison Line Plot');
  console.log('modelDetail', modelDetail);

  const MapWithNoSSR = dynamic(() => import('@/components/maps/RegionsMap'), {
    ssr: false,
  });

  const customModelDetail: ModelDetail | undefined =
    ((modelDetail.data as any) ?? [undefined, undefined])[0];
  const baseModelDetail: ModelDetail | undefined =
    ((modelDetail.data as any) ?? [undefined, undefined])[1];

  console.log('base model detail', baseModelDetail);
  console.log('custom model detail', customModelDetail);

  const regions = useModelRegions(customModelDetail?.regions ?? []);

  if (modelDetail.isFetching || modelDetail.error || !customModelDetail) {
    return <Box />;
  }

  if (modelDetail.error) {
    console.log(modelDetail.error);
    return <Box />;
  }

  const tabs = [
    {
      label: 'Comparison Line Plot',
    },
    {
      label: 'Difference Heatmap',
    },
  ];

  return (
    <Layout>
      <CoreText variant="h1" sx={{ my: 4 }}>
        Details and Results
      </CoreText>
      <VBox spacing={4}>
        <CoreContainer title="Scenario info">
          <ModelDescriptionTable
            modelDetail={customModelDetail}
            regions={regions}
          />
        </CoreContainer>
        <CoreContainer title="Run results">
          <ModelChart
            percentiles={customModelDetail.results}
            reductionStartYear={customModelDetail.reduction_start_year}
            reductionCompleteYear={customModelDetail.reduction_end_year}
          />
        </CoreContainer>
        <CoreContainer title="BAU comparison">
          <CoreTabs tabs={tabs} onTabChange={(tab) => setSelectedTab(tab)} />
          <Divider sx={{ mb: 4 }} />
          {selectedTab === 'Comparison Line Plot' && (
            <BAUCompareChart
              basePercentiles={baseModelDetail!.results}
              customPercentiles={customModelDetail!.results}
              reductionStartYear={customModelDetail!.reduction_start_year}
              reductionCompleteYear={customModelDetail!.reduction_end_year}
            />
          )}
        </CoreContainer>
        <CoreContainer title="Crop loading details">
          <CropLoadingDetailsTable
            customModelDetail={customModelDetail}
            baseModelDetail={baseModelDetail}
          />
        </CoreContainer>
        <CoreContainer title="Regions included in this scenario run">
          <Box id="map" style={{ height: '600px', margin: 0 }}>
            <MapWithNoSSR
              data={regions.map((region: RegionDetail) => region.geometry)}
            />
          </Box>
        </CoreContainer>
      </VBox>
      <Box sx={{ mt: 10 }} />
      <Footer />
    </Layout>
  );
};

export default ModelPage;
