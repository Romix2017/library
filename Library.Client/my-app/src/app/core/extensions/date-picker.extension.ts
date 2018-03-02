import { NgbDateAdapter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {

  fromModel(date: Date): NgbDateStruct {

    if (date == null) {
      return null;
    }

    let localDate = new Date(date);
    return (localDate && localDate.getFullYear()) ? { year: localDate.getFullYear(), month: localDate.getMonth() + 1, day: localDate.getDate() } : null;
  }

  toModel(date: NgbDateStruct): Date {
    console.log("to model")
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}
