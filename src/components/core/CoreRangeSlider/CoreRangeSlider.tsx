import type { BoxProps } from '@mui/material';
import { Box, Slider } from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

import { HBox } from '@/components/custom/HBox/Hbox';

import { CoreInput } from '../CoreInput/CoreInput';
import { CoreNumberField } from '../CoreNumberField/CoreNumberField';

export interface CoreRangeSliderProps extends BoxProps {
  units?: string;
  minFieldLabel?: string;
  maxFieldLabel?: string;
  name?: string;
}

export const CoreRangeSlider = ({
  units,
  minFieldLabel,
  maxFieldLabel,
  name,
  ...rest
}: CoreRangeSliderProps) => {
  const [range, setRange] = useState<number[]>([0, 100]);

  return (
    <Box {...rest}>
      <Controller
        name={name ?? ''}
        defaultValue={range}
        render={({ field: { onChange } }) => (
          <HBox spacing={2}>
            <Slider
              sx={{ width: 150 }}
              value={range}
              onChange={(_event: Event, newValue: number | number[]) => {
                onChange(newValue as number[]);
                setRange(newValue as number[]);
              }}
            />
            <div>
              <CoreInput
                displayLabel="left"
                fieldLabel={minFieldLabel}
                sx={{ ml: 2 }}
              >
                <CoreNumberField
                  value={range[0]}
                  onNumberChange={(value: number) => {
                    setRange([value, range[1] as number]);
                    onChange([value, range[1] as number]);
                  }}
                  units={units}
                  sx={{ width: 90 }}
                />
              </CoreInput>
            </div>
            <div>
              <CoreInput displayLabel="left" fieldLabel={maxFieldLabel}>
                <CoreNumberField
                  value={range[1]}
                  onNumberChange={(value: number) => {
                    setRange([range[0] as number, value]);
                    onChange([range[0] as number, value]);
                  }}
                  units={units}
                  sx={{ width: 90 }}
                />
              </CoreInput>
            </div>
          </HBox>
        )}
      />
    </Box>
  );
};
