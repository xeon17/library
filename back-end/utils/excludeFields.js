// Exclude keys from user
function excludeFields(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

module.exports = excludeFields;
