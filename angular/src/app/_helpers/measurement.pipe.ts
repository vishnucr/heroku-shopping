import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measurement'
})
export class MeasurementPipe implements PipeTransform {

  private measurements = [
    {
      name: "KG",
      id: 1,
    },
    {
      name: "Gram",
      id: 2,
    },
    {
      name: "Liter",
      id: 3,
    },
    {
      name: "Nos",
      id: 4,
    },
  ];

  transform(id: number): string {
    const measurement = this.measurements.find(m => m.id == id);
    return measurement.name;
  }

}
