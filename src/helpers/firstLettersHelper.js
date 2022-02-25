/*
  Get first (max) 3 letters of title.
  If letters > 3, then return first letter of first and last words.
*/
const getFirstLetters = (s) => {
  let _s = s.split(' ').map(x => x[0]);
  if (_s.length > 3) {
    _s = [_s[0], _s[_s.length - 1]];
  }
  return _s.join('');
};

export default getFirstLetters;