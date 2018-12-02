module.exports = function tryRequire(modulePath, moduleName) {
  if (global[moduleName]) {
    // use library added with apps script web editor
    return global[moduleName];
  } else {
    return require(modulePath);
  }
}
