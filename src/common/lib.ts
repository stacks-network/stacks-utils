/**
 * fetchJSON
 *
 * A simple abstraction for json fetches.
 *
 * @param {String} path - the path/url to fetch
 */
export const fetchJSON = async (path: string) => {
  try {
    const res = await fetch(path);
    return res.json();
  } catch (e) {
    throw e.message;
  }
};
