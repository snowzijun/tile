const ELEMENT = '__'
const MODS = '--'

const join = (name, el, symbol) => {
  return el? (name + symbol + el) : name
}

const prefix = (name, mods) => {
  if (typeof mods === 'string') {
    return join(name, mods, MODS);
  }

  if (Array.isArray(mods)) {
    return mods.map(item => prefix(name, item));
  }

  const ret = {};
  mods &&
    Object.keys(mods).forEach(key => {
      ret[name + MODS + key] = mods[key];
    });
  return ret;
};

export default name => (el, mods) => {
  if (el && typeof el !== 'string') {
    mods = el;
    el = '';
  }
  el = join(name, el, ELEMENT);

  return mods ? [el, prefix(el, mods)] : el;
};
