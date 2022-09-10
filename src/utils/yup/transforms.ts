import { parse,  format } from "date-fns";

export function parseDateString(fmt: string = "yyyy-MM-dd") {

  return (_: any, originalValue: Date) => {
    const parsedDate = parse(format(originalValue, 'dd-MM-yyyy HH:mm:ss'), 'dd-MM-yyyy HH:mm:ss', new Date());
    
    return parsedDate;
  }
}