import { Box, Divider } from '@mui/material';
import React, { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import type { CoreFormField } from '@/components/core/CoreForm/CoreForm';
import { CoreForm } from '@/components/core/CoreForm/CoreForm';
import type { CoreMultipleSelectOption } from '@/components/core/CoreMultipleSelect/CoreMultipleSelect';
import { CoreMultipleSelect } from '@/components/core/CoreMultipleSelect/CoreMultipleSelect';
import { CoreSlider } from '@/components/core/CoreSlider/CoreSlider';
import { PageAdvancementButtons } from '@/components/custom/PageAdvancementButtons/PageAdvancementButtons';
import { saveCurrentStep } from '@/store/slices/modelSlice';

import type { Step } from '../../create';
import Step3Instructions from './Step3Instructions';

interface Step3Props extends Step {}

const crops: (CoreMultipleSelectOption | undefined)[] = [
  { label: 'Alfalfa' },
  { label: 'All Other Crops' },
  { label: 'Almonds' },
  { label: 'Annual Grassland' },
  { label: 'Beans (dry)' },
  { label: 'Blue Oak Woodland' },
  { label: 'Carrots' },
  { label: 'Cherries' },
];

const Step3 = ({ onPrev, onNext }: Step3Props) => {
  const dispatch = useDispatch();
  const onFormSubmit = (data: FieldValues) => {
    console.log(data);
    dispatch(
      saveCurrentStep({
        modifications: [],
      }),
    );
    onNext();
  };

  const defaultVal: (CoreMultipleSelectOption | undefined)[] = [crops[1]];
  const [selectedCrops, setSelectedCrops] =
    useState<(CoreMultipleSelectOption | undefined)[]>(defaultVal);
  const [fields, setFields] = useState<CoreFormField[]>([
    { label: 'Crop(s):' },
    ...defaultVal.map((selectedVal) => {
      return { label: `${selectedVal?.label} Loading:` ?? '' };
    }),
  ]);
  const handeCropSelect = (
    selected: (CoreMultipleSelectOption | undefined)[],
  ) => {
    setSelectedCrops(selected);
    setFields([
      { label: 'Crop(s):' },
      ...selected.map((selectedVal) => {
        return { label: `${selectedVal?.label} Loading:` ?? '' };
      }),
    ]);
  };

  return (
    <Box>
      <CoreForm
        fields={fields}
        sx={{
          mt: 6,
        }}
        onFormSubmit={onFormSubmit}
      >
        <CoreMultipleSelect
          options={crops}
          sx={{ width: 400 }}
          placeholder=""
          group={false}
          fieldValue={selectedCrops}
          setFieldValue={handeCropSelect}
        />
        {selectedCrops.map((crop) => (
          <CoreSlider units="%" key={crop?.label} min={0} max={200} />
        ))}
        <PageAdvancementButtons onClickPrev={onPrev} />
      </CoreForm>
      <Divider sx={{ mt: 6 }} />
      <Step3Instructions />
    </Box>
  );
};

export default Step3;
