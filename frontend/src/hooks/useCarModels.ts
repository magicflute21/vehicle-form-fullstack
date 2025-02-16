import { useState, useEffect } from 'react';
import { CarBrand, SelectOption } from '../types/car';

export type UseCarModelsReturn = {
  isLoading: boolean;
  error: string | null;
  options: Array<SelectOption>;
}

export const useCarModels = (): UseCarModelsReturn => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformDataToOptions = (data: CarBrand[]): SelectOption[] => {
    const allOptions: SelectOption[] = [];
    let counter = 0; // will use counter to generate unique id to each select option

    data.forEach(brand => {
      const brandId = counter++;
      const brandValue = `brand_${brand.id}`;

      allOptions.push({
        id: brandId,
        internalId: brand.id,
        value: brandValue,
        label: brand.name,
        type: 'brand',
        childIds: [], // We'll fill these in after adding series and models
        indentLevel: 0
      });

      brand.series.forEach(series => {
        const seriesId = counter++;
        const seriesValue = `series_${brand.id}_${series.id}`;
        allOptions.push({
          id: seriesId,
          internalId: series.id,
          value: seriesValue,
          label: series.name,
          type: 'series',
          parentId: brandValue,
          childIds: [],
          indentLevel: 1
        });

        series.models.forEach(model => {
          const modelId = counter++;
          const modelValue = `model_${brand.id}_${series.id}_${model.id}`;
          allOptions.push({
            id: modelId,
            internalId: model.id,
            value: modelValue,
            label: model.name,
            type: 'model',
            parentId: seriesValue,
            childIds: [],
            indentLevel: 2
          });
        });
      });
    });

    allOptions.forEach(option => {
      if (option.type === 'brand') {
        option.childIds = allOptions
          .filter(opt => opt.parentId === option.value)
          .map(opt => opt.value);
      } else if (option.type === 'series') {
        option.childIds = allOptions
          .filter(opt => opt.parentId === option.value)
          .map(opt => opt.value);
      }
    });

    return allOptions;
  };

  useEffect(() => {
    const fetchCarModels = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/car-models');
        if (!response.ok) {
          throw new Error('Failed to fetch car models');
        }
        const data: CarBrand[] = await response.json();
        setOptions(transformDataToOptions(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarModels();
  }, []);

  return { 
    options, 
    isLoading, 
    error,
  };
};