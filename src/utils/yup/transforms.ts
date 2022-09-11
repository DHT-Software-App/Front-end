import { parse,  format } from "date-fns";

export function parseDateString(fmt: string = "yyyy-MM-dd HH:mm:ss") {

  return (_: any, originalValue: Date) => {
    const parsedDate = parse(format(originalValue, fmt), fmt, new Date());
    
    return parsedDate;
  }
}