import { SelectItem } from "primeng/api";

export function toSelectItems<T>(
  array: Array<T>,
  valueGetter: (t: T) => string,
  labelGetter: (t: T) => string,
): Array<SelectItem> {
  return array.map((x) => ({
    value: valueGetter(x),
    label: labelGetter(x),
  }));
}
