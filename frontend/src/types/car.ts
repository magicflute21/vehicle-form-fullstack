export type SelectOptionType = 'brand' | 'series' | 'model';

export type SelectOption = {
  id: number;
  value: string;
  label: string;
  type: SelectOptionType;
  parentId?: string;
  childIds: string[];
  indentLevel: number
  internalId: number
}

export type CarModel = {
  id: number;
  name: string;
}

export type CarSeries = {
  id: number;
  name: string;
  models: CarModel[];
}

export type CarBrand = {
  id: number;
  name: string;
  series: CarSeries[];
}