/**
 * fetchJSON
 *
 * A simple abstraction for json fetches.
 *
 * @param {String} path - the path/url to fetch
 */
const fetchJSON = async path => {
  try {
    const res = await fetch(path);
    return res.json();
  } catch (e) {
    throw e.message;
  }
};


export {fetchJSON}
