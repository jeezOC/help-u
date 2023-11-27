import dayjs from "dayjs";

export const parseStringToDate = (date: any) => {
  const parsedDate = dayjs(date).format("DD MMM, YY");
  return parsedDate;
};

export const parseStringToHour = (date: any) => {
  const parsedDate = dayjs(date.toDate()).format("hh:mm a");
  return parsedDate;
};

export const sortByDate = (date1: any, date2: any) => {
  const parsedDate1 = dayjs(date1.toDate());
  const parsedDate2 = dayjs(date2.toDate());

  const diff1 = parsedDate1.diff(parsedDate2);
  const diff2 = parsedDate2.diff(parsedDate1);

  if (diff1 < diff2) {
    return 1;
  } else if (diff1 > diff2) {
    return -1;
  }
  return 0;
};

export const parseStringToInputDate = (date: any) => {
  const parsedDate = dayjs(date.toDate()).format("YYYY-MM-DDTHH:mm");
  return parsedDate;
}
