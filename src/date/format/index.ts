const weekName = {
  0: "日",
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
};

/**
 *
 * @description 根据时间戳 返回这个时间戳所对应的时间
 * @param timestamp 时间戳 秒 或者毫秒
 * @param format 格式化方式 默认  YYYY-MM-DD hh:mm:ss 星期是 `w` 日-六
 * @returns 按照格式化方式 转换时间
 */
export const timeToString = (
  timestamp: number,
  format: string = "YYYY-MM-DD hh:mm:ss"
): string => {
  const len = String(timestamp).length;
  if (![10, 13].includes(len)) {
    throw Error("not a valid timestamp");
  }
  if (len === 10) timestamp = timestamp * 1000;
  const date = new Date(timestamp);

  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1); // 月份是从零开始的
  const day = String(date.getDate());
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const seconds = String(date.getSeconds());
  const week = date.getDay();

  // 自定义替换规则
  const replacements = {
    YYYY: date.getFullYear(),
    MM: String(date.getMonth() + 1).padStart(2, "0"),
    DD: String(date.getDate()).padStart(2, "0"),
    hh: String(date.getHours()).padStart(2, "0"),
    mm: String(date.getMinutes()).padStart(2, "0"),
    ss: String(date.getSeconds()).padStart(2, "0"),
    M: String(date.getMonth() + 1),
    D: String(date.getDate()),
    h: String(date.getHours()),
    m: String(date.getMinutes()),
    s: String(date.getSeconds()),
  };

  // 替换格式化字符串中的占位符
  return format
    .replace(/(YYYY|MM|DD|hh|mm|ss)/g, (match) => replacements[match])
    .replace(/(M|D|h|m|s)/g, (match) => replacements[match]);
};

/**
 *
 * @param timestamp 时间戳
 * @returns {type: "years" | "months" | "days" | "hours" | "minutes" | "seconds";  str: "YYYY" | "MM" | "DD" | "hh" | "mm" | "ss";value: number;}[]
 */
export const formatTimestamp = (timestamp: number) => {
  const seconds = Math.floor(timestamp % 60);
  const minutes = Math.floor((timestamp / 60) % 60);
  const hours = Math.floor((timestamp / 3600) % 24);
  const days = Math.floor(timestamp / 86400); // 86400 秒是一天

  const years = Math.floor(days / 365);
  const remainingDays = days % 365;

  const months = Math.floor(remainingDays / 30);
  const remainingDaysInMonth = remainingDays % 30;

  const parts: {
    type: "years" | "months" | "days" | "hours" | "minutes" | "seconds";
    str: "YYYY" | "MM" | "DD" | "hh" | "mm" | "ss";
    value: number;
  }[] = [];

  if (years > 0) {
    parts.push({ type: "years", str: "YYYY", value: years });
  }

  if (months > 0) {
    parts.push({ type: "months", str: "MM", value: months });
  }

  if (remainingDaysInMonth > 0) {
    parts.push({ type: "days", str: "DD", value: remainingDaysInMonth });
  }

  if (hours > 0) {
    parts.push({ type: "hours", str: "hh", value: hours });
  }

  if (minutes > 0) {
    parts.push({ type: "minutes", str: "mm", value: minutes });
  }

  if (seconds > 0 || parts.length === 0) {
    parts.push({ type: "seconds", str: "ss", value: seconds });
  }
  return parts;
};
/**
 * @description 给开始时间戳和结束时间戳 返回相距多少 时间戳/时间
 * @param start
 * @param end
 * @param format  输出的列表 ["DD天", "hh小时"] YYYY|MM|DD|hh|mm|ss
 * @param join  按什么拼接 传入空字符 则会返回列表
 * @returns string
 * @description 欠考虑 跨年 但是 format里面不包含年
 */
export const distance = (
  start: number,
  end: number,
  format: string[] = ["DD天", "hh小时"],
  join: string = " "
) => {
  if (String(start).length === 10) start = start * 1000;
  if (String(end).length === 10) end = end * 1000;
  const distance = end - start;
  const parts = formatTimestamp(distance);
  const map = {};
  parts.forEach((item) => {
    map[item.str] = item.value;
  });
  const result = format
    .map((item) => {
      let flag = -1;
      const v = item.replace(/(YYYY|MM|DD|hh|mm|ss)/g, (match: string) => {
        const res = map[match];
        flag = map[match] ? map[match] : 0;
        map[match] = 0;
        return res;
      });
      if (flag === 0) return "";
      return v;
    })
    .filter((i) => i);

  if (join) return result.join(join);
  return result;
};
