const getEditDistance = require('./edit-distance');
const { otherThanGitignore } = require('./helper');

// findEditDistance :: [String] -> [FileGitignore] -> {key: [String], key: [String]}
function findEditDistance(notMatch, files) {
  const splitFileName = i => i.split('.');
  const toLower = ([name]) => name.toLowerCase();

  const safeFilter = i => {
    if (i && i.distance <= 3 && i.suggest !== '') {
      return i;
    }
    return null;
  };

  const getDistance = i => {
    return files
      .filter(otherThanGitignore)
      .map(splitFileName)
      .map(toLower)
      .map(ii => {
        return {
          language: i,
          suggest: ii,
          distance: getEditDistance(i, ii)
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .map(safeFilter)
      .filter(Boolean);
  };

  const getSuggest = ([i]) => {
    if (i) return i.suggest;
    return null;
  };

  const suggest = notMatch
    .map(getDistance)
    .map(getSuggest)
    .filter(Boolean);

  return { suggest, notMatch };
}

module.exports = findEditDistance;
