"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _plugin() {
  const data = require("@parcel/plugin");
  _plugin = function () {
    return data;
  };
  return data;
}
function _utils() {
  const data = require("@parcel/utils");
  _utils = function () {
    return data;
  };
  return data;
}
function _diagnostic() {
  const data = require("@parcel/diagnostic");
  _diagnostic = function () {
    return data;
  };
  return data;
}
function _rust() {
  const data = require("@parcel/rust");
  _rust = function () {
    return data;
  };
  return data;
}
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _nullthrows() {
  const data = _interopRequireDefault(require("nullthrows"));
  _nullthrows = function () {
    return data;
  };
  return data;
}
var _DevPackager = require("./DevPackager");
var _ScopeHoistingPackager = require("./ScopeHoistingPackager");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CONFIG_SCHEMA = {
  type: 'object',
  properties: {
    unstable_asyncBundleRuntime: {
      type: 'boolean'
    }
  },
  additionalProperties: false
};
var _default = new (_plugin().Packager)({
  async loadConfig({
    config,
    options
  }) {
    var _pkg$contents$name, _pkg$contents, _pkg$contents$package;
    // Generate a name for the global parcelRequire function that is unique to this project.
    // This allows multiple parcel builds to coexist on the same page.
    let pkg = await config.getConfigFrom(_path().default.join(options.projectRoot, 'index'), ['package.json']);
    let packageKey = '@parcel/packager-js';
    if (pkg !== null && pkg !== void 0 && pkg.contents[packageKey]) {
      _utils().validateSchema.diagnostic(CONFIG_SCHEMA, {
        data: pkg === null || pkg === void 0 ? void 0 : pkg.contents[packageKey],
        source: await options.inputFS.readFile(pkg.filePath, 'utf8'),
        filePath: pkg.filePath,
        prependKey: `/${(0, _diagnostic().encodeJSONKeyComponent)(packageKey)}`
      }, packageKey, `Invalid config for ${packageKey}`);
    }
    let name = (_pkg$contents$name = pkg === null || pkg === void 0 || (_pkg$contents = pkg.contents) === null || _pkg$contents === void 0 ? void 0 : _pkg$contents.name) !== null && _pkg$contents$name !== void 0 ? _pkg$contents$name : '';
    return {
      parcelRequireName: 'parcelRequire' + (0, _rust().hashString)(name).slice(-4),
      unstable_asyncBundleRuntime: Boolean(pkg === null || pkg === void 0 || (_pkg$contents$package = pkg.contents[packageKey]) === null || _pkg$contents$package === void 0 ? void 0 : _pkg$contents$package.unstable_asyncBundleRuntime)
    };
  },
  async package({
    bundle,
    bundleGraph,
    getInlineBundleContents,
    getSourceMapReference,
    config,
    options
  }) {
    // If this is a non-module script, and there is only one asset with no dependencies,
    // then we don't need to package at all and can pass through the original code un-wrapped.
    let contents, map;
    if (bundle.env.sourceType === 'script') {
      let entries = bundle.getEntryAssets();
      if (entries.length === 1 && bundleGraph.getDependencies(entries[0]).length === 0) {
        contents = await entries[0].getCode();
        map = await entries[0].getMap();
      }
    }
    if (contents == null) {
      let packager = bundle.env.shouldScopeHoist ? new _ScopeHoistingPackager.ScopeHoistingPackager(options, bundleGraph, bundle, (0, _nullthrows().default)(config).parcelRequireName, (0, _nullthrows().default)(config).unstable_asyncBundleRuntime) : new _DevPackager.DevPackager(options, bundleGraph, bundle, (0, _nullthrows().default)(config).parcelRequireName);
      ({
        contents,
        map
      } = await packager.package());
    }
    contents = '#!/usr/bin/env node\n\n' + contents;
    contents += '\n' + (await getSourceMapSuffix(getSourceMapReference, map));

    // For library builds, we need to replace URL references with their final resolved paths.
    // For non-library builds, this is handled in the JS runtime.
    if (bundle.env.isLibrary) {
      ({
        contents,
        map
      } = (0, _utils().replaceURLReferences)({
        bundle,
        bundleGraph,
        contents,
        map,
        getReplacement: s => JSON.stringify(s).slice(1, -1)
      }));
    }
    return (0, _utils().replaceInlineReferences)({
      bundle,
      bundleGraph,
      contents,
      getInlineReplacement: (dependency, inlineType, content) => ({
        from: `"${dependency.id}"`,
        to: inlineType === 'string' ? JSON.stringify(content) : content
      }),
      getInlineBundleContents,
      map
    });
  }
});
exports.default = _default;
async function getSourceMapSuffix(getSourceMapReference, map) {
  let sourcemapReference = await getSourceMapReference(map);
  if (sourcemapReference != null) {
    return '//# sourceMappingURL=' + sourcemapReference + '\n';
  } else {
    return '';
  }
}