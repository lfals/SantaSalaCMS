export interface IMateria {
  name: string;
  code: string;
  description: string;
  hours: number;
  dependence: Array<string>;
  lock: Array<string>;
  period: number;
  optional: boolean;
}
