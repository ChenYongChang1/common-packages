export const getRandomStr = (num: number) => {
  num = parseInt(num.toString());
  if (num <= 0) throw Error("num must bigger 0");

  if (num > 11) {
    const sum = Math.random().toString(36).slice(-11);
    return sum + getRandomStr(num - 11);
  }
  return Math.random().toString(36).slice(-num);
};
export const getRandomColor = () => {
  return "#" + Math.random().toString(16).slice(2, 8);
};
