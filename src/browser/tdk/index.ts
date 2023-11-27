/**
 *
 * @param t 标题
 * @param d 描述
 * @param k 关键词
 * @description 设置当前页面的tdk
 */
export const tdk = (t: string, d: string, k: string) => {
  if (t) {
    document.title = t;
  }
  if (d) {
    // 设置描述
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", d || "");
  }

  if (k) {
    // 设置关键字
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement("meta");
      keywordsTag.setAttribute("name", "keywords");
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute("content", k || "");
  }
};
