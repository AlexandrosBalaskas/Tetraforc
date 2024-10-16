// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module != 'undefined' ? Module : {};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string' && process.type != 'renderer';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
}

if (ENVIRONMENT_IS_NODE) {
  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?

}

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// include: C:\Users\abalaska\AppData\Local\Temp\tmpjup56tnb.js

  if (!Module['expectedDataFileDownloads']) {
    Module['expectedDataFileDownloads'] = 0;
  }

  Module['expectedDataFileDownloads']++;
  (() => {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    var isPthread = typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD;
    var isWasmWorker = typeof ENVIRONMENT_IS_WASM_WORKER != 'undefined' && ENVIRONMENT_IS_WASM_WORKER;
    if (isPthread || isWasmWorker) return;
    function loadPackage(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'index.data';
      var REMOTE_PACKAGE_BASE = 'index.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, (err, contents) => {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        Module['dataFileDownloads'] ??= {};
        fetch(packageName)
          .catch((cause) => Promise.reject(new Error(`Network Error: ${packageName}`, {cause}))) // If fetch fails, rewrite the error to include the failing URL & the cause.
          .then((response) => {
            if (!response.ok) {
              return Promise.reject(new Error(`${response.status}: ${response.url}`));
            }

            if (!response.body && response.arrayBuffer) { // If we're using the polyfill, readers won't be available...
              return response.arrayBuffer().then(callback);
            }

            const reader = response.body.getReader();
            const iterate = () => reader.read().then(handleChunk).catch((cause) => {
              return Promise.reject(new Error(`Unexpected error while handling : ${response.url} ${cause}`, {cause}));
            });

            const chunks = [];
            const headers = response.headers;
            const total = Number(headers.get('Content-Length') ?? packageSize);
            let loaded = 0;

            const handleChunk = ({done, value}) => {
              if (!done) {
                chunks.push(value);
                loaded += value.length;
                Module['dataFileDownloads'][packageName] = {loaded, total};

                let totalLoaded = 0;
                let totalSize = 0;

                for (const download of Object.values(Module['dataFileDownloads'])) {
                  totalLoaded += download.loaded;
                  totalSize += download.total;
                }

                Module['setStatus']?.(`Downloading data... (${totalLoaded}/${totalSize})`);
                return iterate();
              } else {
                const packageData = new Uint8Array(chunks.map((c) => c.length).reduce((a, b) => a + b, 0));
                let offset = 0;
                for (const chunk of chunks) {
                  packageData.set(chunk, offset);
                  offset += chunk.length;
                }
                callback(packageData.buffer);
              }
            };

            Module['setStatus']?.('Downloading data...');
            return iterate();
          });
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, (data) => {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS(Module) {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "assets", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency'](`fp ${this.name}`);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency'](`fp ${that.name}`);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_index.data');

      };
      Module['addRunDependency']('datafile_index.data');

      if (!Module['preloadResults']) Module['preloadResults'] = {};

      Module['preloadResults'][PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS(Module);
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/assets/boss.png", "start": 0, "end": 95694}, {"filename": "/assets/bullet.png", "start": 95694, "end": 144294}, {"filename": "/assets/bullet2.png", "start": 144294, "end": 163860}, {"filename": "/assets/enemy.png", "start": 163860, "end": 301990}, {"filename": "/assets/enemyhit.ogg", "start": 301990, "end": 314344, "audio": 1}, {"filename": "/assets/firingbullet.ogg", "start": 314344, "end": 328685, "audio": 1}, {"filename": "/assets/font.ttf", "start": 328685, "end": 368065}, {"filename": "/assets/galaxytrack1.ogg", "start": 368065, "end": 2779367, "audio": 1}, {"filename": "/assets/hardtrack.ogg", "start": 2779367, "end": 5968208, "audio": 1}, {"filename": "/assets/heart.png", "start": 5968208, "end": 5987976}, {"filename": "/assets/mute.png", "start": 5987976, "end": 5993592}, {"filename": "/assets/playerhit.ogg", "start": 5993592, "end": 6001881, "audio": 1}, {"filename": "/assets/rocket.png", "start": 6001881, "end": 6871180}, {"filename": "/assets/star.png", "start": 6871180, "end": 10832082}, {"filename": "/assets/subfont.ttf", "start": 10832082, "end": 11162134}, {"filename": "/assets/tetra.png", "start": 11162134, "end": 12891000}, {"filename": "/assets/tetraforce.png", "start": 12891000, "end": 13287154}, {"filename": "/assets/volume.png", "start": 13287154, "end": 13292914}, {"filename": "/assets/wallpaper.png", "start": 13292914, "end": 15269212}], "remote_package_size": 15269212});

  })();

// end include: C:\Users\abalaska\AppData\Local\Temp\tmpjup56tnb.js
// include: C:\Users\abalaska\AppData\Local\Temp\tmprzpwu6mi.js

    // All the pre-js content up to here must remain later on, we need to run
    // it.
    if (Module['$ww'] || (typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD)) Module['preRun'] = [];
    var necessaryPreJSTasks = Module['preRun'].slice();
  // end include: C:\Users\abalaska\AppData\Local\Temp\tmprzpwu6mi.js
// include: C:\Users\abalaska\AppData\Local\Temp\tmp1bjd6lvv.js

    if (!Module['preRun']) throw 'Module.preRun should exist because file support used it; did a pre-js delete it?';
    necessaryPreJSTasks.forEach((task) => {
      if (Module['preRun'].indexOf(task) < 0) throw 'All preRun tasks that exist before user pre-js code should remain after; did you replace Module or modify Module.preRun?';
    });
  // end include: C:\Users\abalaska\AppData\Local\Temp\tmp1bjd6lvv.js


// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {
  if (typeof process == 'undefined' || !process.release || process.release.name !== 'node') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split('.').slice(0, 3);
  numericVersion = (numericVersion[0] * 10000) + (numericVersion[1] * 100) + (numericVersion[2].split('-')[0] * 1);
  var minVersion = 160000;
  if (numericVersion < 160000) {
    throw new Error('This emscripten-generated code requires node v16.0.0 (detected v' + nodeVersion + ')');
  }

  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');
  var nodePath = require('path');

  scriptDirectory = __dirname + '/';

// include: node_shell_read.js
readBinary = (filename) => {
  // We need to re-wrap `file://` strings to URLs. Normalizing isn't
  // necessary in that case, the path should already be absolute.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  var ret = fs.readFileSync(filename);
  assert(ret.buffer);
  return ret;
};

readAsync = (filename, binary = true) => {
  // See the comment in the `readBinary` function.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return new Promise((resolve, reject) => {
    fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(binary ? data.buffer : data);
    });
  });
};
// end include: node_shell_read.js
  if (!Module['thisProgram'] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  if (typeof module != 'undefined') {
    module['exports'] = Module;
  }

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else
if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof importScripts == 'function') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.startsWith('blob:')) {
    scriptDirectory = '';
  } else {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, '').lastIndexOf('/')+1);
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  {
// include: web_or_worker_shell_read.js
if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url) => {
    // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
    // See https://github.com/github/fetch/pull/92#issuecomment-140665932
    // Cordova or Electron apps are typically loaded from a file:// url.
    // So use XHR on webview if URL is a file URL.
    if (isFileURI(url)) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            resolve(xhr.response);
            return;
          }
          reject(xhr.status);
        };
        xhr.onerror = reject;
        xhr.send(null);
      });
    }
    return fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (response.ok) {
          return response.arrayBuffer();
        }
        return Promise.reject(new Error(response.status + ' : ' + response.url));
      })
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('asm', 'wasmExports');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');

if (typeof WebAssembly != 'object') {
  err('no native wasm support detected');
}

// include: base64Utils.js
// Converts a string of base64 into a byte array (Uint8Array).
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE != 'undefined' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }

  var decoded = atob(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0 ; i < decoded.length ; ++i) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}
// end include: base64Utils.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

// include: runtime_shared.js
function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
}

// end include: runtime_shared.js
assert(!Module['STACK_SIZE'], 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')

assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
assert(!Module['INITIAL_MEMORY'], 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  
if (!Module['noFSInit'] && !FS.initialized)
  FS.init();
FS.ignorePermissions = false;

TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  
  callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */
var isDataURI = (filename) => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');
// end include: URIUtils.js
function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

// include: runtime_exceptions.js
// end include: runtime_exceptions.js
function findWasmBinary() {
    var f = 'index.wasm';
    if (!isDataURI(f)) {
      return locateFile(f);
    }
    return f;
}

var wasmBinaryFile;

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw 'both async and sync fetching of the wasm failed';
}

function getBinaryPromise(binaryFile) {
  // If we don't have the binary yet, load it asynchronously using readAsync.
  if (!wasmBinary
      ) {
    // Fetch the binary using readAsync
    return readAsync(binaryFile).then(
      (response) => new Uint8Array(/** @type{!ArrayBuffer} */(response)),
      // Fall back to getBinarySync if readAsync fails
      () => getBinarySync(binaryFile)
    );
  }

  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then((binary) => {
    return WebAssembly.instantiate(binary, imports);
  }).then(receiver, (reason) => {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary &&
      typeof WebAssembly.instantiateStreaming == 'function' &&
      !isDataURI(binaryFile) &&
      // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
      !isFileURI(binaryFile) &&
      // Avoid instantiateStreaming() on Node.js environment for now, as while
      // Node.js v18.1.0 implements it, it does not have a full fetch()
      // implementation yet.
      //
      // Reference:
      //   https://github.com/emscripten-core/emscripten/pull/16917
      !ENVIRONMENT_IS_NODE &&
      typeof fetch == 'function') {
    return fetch(binaryFile, { credentials: 'same-origin' }).then((response) => {
      // Suppress closure warning here since the upstream definition for
      // instantiateStreaming only allows Promise<Repsponse> rather than
      // an actual Response.
      // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
      /** @suppress {checkTypes} */
      var result = WebAssembly.instantiateStreaming(response, imports);

      return result.then(
        callback,
        function(reason) {
          // We expect the most common failure cause to be a bad MIME type for the binary,
          // in which case falling back to ArrayBuffer instantiation should work.
          err(`wasm streaming compile failed: ${reason}`);
          err('falling back to ArrayBuffer instantiation');
          return instantiateArrayBuffer(binaryFile, imports, callback);
        });
    });
  }
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

function getWasmImports() {
  // prepare imports
  return {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  }
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  var info = getWasmImports();
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    

    wasmMemory = wasmExports['memory'];
    
    assert(wasmMemory, 'memory not found in wasm exports');
    updateMemoryViews();

    wasmTable = wasmExports['__indirect_function_table'];
    
    assert(wasmTable, 'table not found in wasm exports');

    addOnInit(wasmExports['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
        return false;
    }
  }

  wasmBinaryFile ??= findWasmBinary();

  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult);
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// include: runtime_debug.js
// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

function legacyModuleProp(prop, newName, incoming=true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incoming ? ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)' : '';
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);

      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

/**
 * Intercept access to a global symbol.  This enables us to give informative
 * warnings/errors when folks attempt to use symbols they did not include in
 * their build, or no symbols that no longer exist.
 */
function hookGlobalSymbolAccess(sym, func) {
  if (typeof globalThis != 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        func();
        return undefined;
      }
    });
  }
}

function missingGlobal(sym, msg) {
  hookGlobalSymbolAccess(sym, () => {
    warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
  });
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');
missingGlobal('asm', 'Please use wasmExports instead');

function missingLibrarySymbol(sym) {
  hookGlobalSymbolAccess(sym, () => {
    // Can't `abort()` here because it would break code that does runtime
    // checks.  e.g. `if (typeof SDL === 'undefined')`.
    var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
    // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
    // library.js, which means $name for a JS name with no prefix, or name
    // for a JS name like _name.
    var librarySymbol = sym;
    if (!librarySymbol.startsWith('_')) {
      librarySymbol = '$' + sym;
    }
    msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
    if (isExportedByForceFilesystem(sym)) {
      msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
    }
    warnOnce(msg);
  });

  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}
// end include: runtime_debug.js
// === Body ===

var ASM_CONSTS = {
  651220: ($0) => { var str = UTF8ToString($0) + '\n\n' + 'Abort/Retry/Ignore/AlwaysIgnore? [ariA] :'; var reply = window.prompt(str, "i"); if (reply === null) { reply = "i"; } return allocate(intArrayFromString(reply), 'i8', ALLOC_NORMAL); },  
 651445: () => { if (typeof(AudioContext) !== 'undefined') { return true; } else if (typeof(webkitAudioContext) !== 'undefined') { return true; } return false; },  
 651592: () => { if ((typeof(navigator.mediaDevices) !== 'undefined') && (typeof(navigator.mediaDevices.getUserMedia) !== 'undefined')) { return true; } else if (typeof(navigator.webkitGetUserMedia) !== 'undefined') { return true; } return false; },  
 651826: ($0) => { if(typeof(Module['SDL2']) === 'undefined') { Module['SDL2'] = {}; } var SDL2 = Module['SDL2']; if (!$0) { SDL2.audio = {}; } else { SDL2.capture = {}; } if (!SDL2.audioContext) { if (typeof(AudioContext) !== 'undefined') { SDL2.audioContext = new AudioContext(); } else if (typeof(webkitAudioContext) !== 'undefined') { SDL2.audioContext = new webkitAudioContext(); } if (SDL2.audioContext) { autoResumeAudioContext(SDL2.audioContext); } } return SDL2.audioContext === undefined ? -1 : 0; },  
 652319: () => { var SDL2 = Module['SDL2']; return SDL2.audioContext.sampleRate; },  
 652387: ($0, $1, $2, $3) => { var SDL2 = Module['SDL2']; var have_microphone = function(stream) { if (SDL2.capture.silenceTimer !== undefined) { clearTimeout(SDL2.capture.silenceTimer); SDL2.capture.silenceTimer = undefined; } SDL2.capture.mediaStreamNode = SDL2.audioContext.createMediaStreamSource(stream); SDL2.capture.scriptProcessorNode = SDL2.audioContext.createScriptProcessor($1, $0, 1); SDL2.capture.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) { if ((SDL2 === undefined) || (SDL2.capture === undefined)) { return; } audioProcessingEvent.outputBuffer.getChannelData(0).fill(0.0); SDL2.capture.currentCaptureBuffer = audioProcessingEvent.inputBuffer; dynCall('vi', $2, [$3]); }; SDL2.capture.mediaStreamNode.connect(SDL2.capture.scriptProcessorNode); SDL2.capture.scriptProcessorNode.connect(SDL2.audioContext.destination); SDL2.capture.stream = stream; }; var no_microphone = function(error) { }; SDL2.capture.silenceBuffer = SDL2.audioContext.createBuffer($0, $1, SDL2.audioContext.sampleRate); SDL2.capture.silenceBuffer.getChannelData(0).fill(0.0); var silence_callback = function() { SDL2.capture.currentCaptureBuffer = SDL2.capture.silenceBuffer; dynCall('vi', $2, [$3]); }; SDL2.capture.silenceTimer = setTimeout(silence_callback, ($1 / SDL2.audioContext.sampleRate) * 1000); if ((navigator.mediaDevices !== undefined) && (navigator.mediaDevices.getUserMedia !== undefined)) { navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(have_microphone).catch(no_microphone); } else if (navigator.webkitGetUserMedia !== undefined) { navigator.webkitGetUserMedia({ audio: true, video: false }, have_microphone, no_microphone); } },  
 654039: ($0, $1, $2, $3) => { var SDL2 = Module['SDL2']; SDL2.audio.scriptProcessorNode = SDL2.audioContext['createScriptProcessor']($1, 0, $0); SDL2.audio.scriptProcessorNode['onaudioprocess'] = function (e) { if ((SDL2 === undefined) || (SDL2.audio === undefined)) { return; } SDL2.audio.currentOutputBuffer = e['outputBuffer']; dynCall('vi', $2, [$3]); }; SDL2.audio.scriptProcessorNode['connect'](SDL2.audioContext['destination']); },  
 654449: ($0, $1) => { var SDL2 = Module['SDL2']; var numChannels = SDL2.capture.currentCaptureBuffer.numberOfChannels; for (var c = 0; c < numChannels; ++c) { var channelData = SDL2.capture.currentCaptureBuffer.getChannelData(c); if (channelData.length != $1) { throw 'Web Audio capture buffer length mismatch! Destination size: ' + channelData.length + ' samples vs expected ' + $1 + ' samples!'; } if (numChannels == 1) { for (var j = 0; j < $1; ++j) { setValue($0 + (j * 4), channelData[j], 'float'); } } else { for (var j = 0; j < $1; ++j) { setValue($0 + (((j * numChannels) + c) * 4), channelData[j], 'float'); } } } },  
 655054: ($0, $1) => { var SDL2 = Module['SDL2']; var numChannels = SDL2.audio.currentOutputBuffer['numberOfChannels']; for (var c = 0; c < numChannels; ++c) { var channelData = SDL2.audio.currentOutputBuffer['getChannelData'](c); if (channelData.length != $1) { throw 'Web Audio output buffer length mismatch! Destination size: ' + channelData.length + ' samples vs expected ' + $1 + ' samples!'; } for (var j = 0; j < $1; ++j) { channelData[j] = HEAPF32[$0 + ((j*numChannels + c) << 2) >> 2]; } } },  
 655534: ($0) => { var SDL2 = Module['SDL2']; if ($0) { if (SDL2.capture.silenceTimer !== undefined) { clearTimeout(SDL2.capture.silenceTimer); } if (SDL2.capture.stream !== undefined) { var tracks = SDL2.capture.stream.getAudioTracks(); for (var i = 0; i < tracks.length; i++) { SDL2.capture.stream.removeTrack(tracks[i]); } SDL2.capture.stream = undefined; } if (SDL2.capture.scriptProcessorNode !== undefined) { SDL2.capture.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {}; SDL2.capture.scriptProcessorNode.disconnect(); SDL2.capture.scriptProcessorNode = undefined; } if (SDL2.capture.mediaStreamNode !== undefined) { SDL2.capture.mediaStreamNode.disconnect(); SDL2.capture.mediaStreamNode = undefined; } if (SDL2.capture.silenceBuffer !== undefined) { SDL2.capture.silenceBuffer = undefined } SDL2.capture = undefined; } else { if (SDL2.audio.scriptProcessorNode != undefined) { SDL2.audio.scriptProcessorNode.disconnect(); SDL2.audio.scriptProcessorNode = undefined; } SDL2.audio = undefined; } if ((SDL2.audioContext !== undefined) && (SDL2.audio === undefined) && (SDL2.capture === undefined)) { SDL2.audioContext.close(); SDL2.audioContext = undefined; } },  
 656706: ($0, $1, $2) => { var w = $0; var h = $1; var pixels = $2; if (!Module['SDL2']) Module['SDL2'] = {}; var SDL2 = Module['SDL2']; if (SDL2.ctxCanvas !== Module['canvas']) { SDL2.ctx = Module['createContext'](Module['canvas'], false, true); SDL2.ctxCanvas = Module['canvas']; } if (SDL2.w !== w || SDL2.h !== h || SDL2.imageCtx !== SDL2.ctx) { SDL2.image = SDL2.ctx.createImageData(w, h); SDL2.w = w; SDL2.h = h; SDL2.imageCtx = SDL2.ctx; } var data = SDL2.image.data; var src = pixels >> 2; var dst = 0; var num; if (typeof CanvasPixelArray !== 'undefined' && data instanceof CanvasPixelArray) { num = data.length; while (dst < num) { var val = HEAP32[src]; data[dst ] = val & 0xff; data[dst+1] = (val >> 8) & 0xff; data[dst+2] = (val >> 16) & 0xff; data[dst+3] = 0xff; src++; dst += 4; } } else { if (SDL2.data32Data !== data) { SDL2.data32 = new Int32Array(data.buffer); SDL2.data8 = new Uint8Array(data.buffer); SDL2.data32Data = data; } var data32 = SDL2.data32; num = data32.length; data32.set(HEAP32.subarray(src, src + num)); var data8 = SDL2.data8; var i = 3; var j = i + 4*num; if (num % 8 == 0) { while (i < j) { data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; } } else { while (i < j) { data8[i] = 0xff; i = i + 4 | 0; } } } SDL2.ctx.putImageData(SDL2.image, 0, 0); },  
 658175: ($0, $1, $2, $3, $4) => { var w = $0; var h = $1; var hot_x = $2; var hot_y = $3; var pixels = $4; var canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h; var ctx = canvas.getContext("2d"); var image = ctx.createImageData(w, h); var data = image.data; var src = pixels >> 2; var dst = 0; var num; if (typeof CanvasPixelArray !== 'undefined' && data instanceof CanvasPixelArray) { num = data.length; while (dst < num) { var val = HEAP32[src]; data[dst ] = val & 0xff; data[dst+1] = (val >> 8) & 0xff; data[dst+2] = (val >> 16) & 0xff; data[dst+3] = (val >> 24) & 0xff; src++; dst += 4; } } else { var data32 = new Int32Array(data.buffer); num = data32.length; data32.set(HEAP32.subarray(src, src + num)); } ctx.putImageData(image, 0, 0); var url = hot_x === 0 && hot_y === 0 ? "url(" + canvas.toDataURL() + "), auto" : "url(" + canvas.toDataURL() + ") " + hot_x + " " + hot_y + ", auto"; var urlBuf = _malloc(url.length + 1); stringToUTF8(url, urlBuf, url.length + 1); return urlBuf; },  
 659164: ($0) => { if (Module['canvas']) { Module['canvas'].style['cursor'] = UTF8ToString($0); } },  
 659247: () => { if (Module['canvas']) { Module['canvas'].style['cursor'] = 'none'; } },  
 659316: () => { return window.innerWidth; },  
 659346: () => { return window.innerHeight; },  
 659377: ($0, $1) => { var buf = $0; var buflen = $1; var list = undefined; if (navigator.languages && navigator.languages.length) { list = navigator.languages; } else { var oneOfThese = navigator.userLanguage || navigator.language || navigator.browserLanguage || navigator.systemLanguage; if (oneOfThese !== undefined) { list = [ oneOfThese ]; } } if (list === undefined) { return; } var str = ""; for (var i = 0; i < list.length; i++) { var item = list[i]; if ((str.length + item.length + 1) > buflen) { break; } if (str.length > 0) { str += ","; } str += item; } str = str.replace(/-/g, "_"); if (buflen > str.length) { buflen = str.length; } for (var i = 0; i < buflen; i++) { setValue(buf + i, str.charCodeAt(i), "i8"); } },  
 660085: ($0) => { window.open(UTF8ToString($0), "_blank") },  
 660125: ($0, $1) => { alert(UTF8ToString($0) + "\n\n" + UTF8ToString($1)); }
};

// end include: preamble.js


  /** @constructor */
  function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
  Module['ExitStatus'] = ExitStatus;

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };
  Module['callRuntimeCallbacks'] = callRuntimeCallbacks;

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': abort('to do getValue(i64) use WASM_BIGINT');
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }
  Module['getValue'] = getValue;

  var noExitRuntime = Module['noExitRuntime'] || true;
  Module['noExitRuntime'] = noExitRuntime;

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };
  Module['ptrToString'] = ptrToString;

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': abort('to do setValue(i64) use WASM_BIGINT');
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }
  Module['setValue'] = setValue;

  var stackRestore = (val) => __emscripten_stack_restore(val);
  Module['stackRestore'] = stackRestore;

  var stackSave = () => _emscripten_stack_get_current();
  Module['stackSave'] = stackSave;

  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };
  Module['warnOnce'] = warnOnce;

  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder() : undefined;
  Module['UTF8Decoder'] = UTF8Decoder;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  Module['UTF8ArrayToString'] = UTF8ArrayToString;
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  Module['UTF8ToString'] = UTF8ToString;
  var ___assert_fail = (condition, filename, line, func) => {
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    };
  Module['___assert_fail'] = ___assert_fail;

  var wasmTableMirror = [];
  Module['wasmTableMirror'] = wasmTableMirror;
  
  /** @type {WebAssembly.Table} */
  var wasmTable;
  Module['wasmTable'] = wasmTable;
  var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      assert(wasmTable.get(funcPtr) == func, 'JavaScript-side Wasm function table mirror is out of date!');
      return func;
    };
  Module['getWasmTableEntry'] = getWasmTableEntry;
  var ___call_sighandler = (fp, sig) => getWasmTableEntry(fp)(sig);
  Module['___call_sighandler'] = ___call_sighandler;

  class ExceptionInfo {
      // excPtr - Thrown object pointer to wrap. Metadata pointer is calculated from it.
      constructor(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
      }
  
      set_type(type) {
        HEAPU32[(((this.ptr)+(4))>>2)] = type;
      }
  
      get_type() {
        return HEAPU32[(((this.ptr)+(4))>>2)];
      }
  
      set_destructor(destructor) {
        HEAPU32[(((this.ptr)+(8))>>2)] = destructor;
      }
  
      get_destructor() {
        return HEAPU32[(((this.ptr)+(8))>>2)];
      }
  
      set_caught(caught) {
        caught = caught ? 1 : 0;
        HEAP8[(this.ptr)+(12)] = caught;
      }
  
      get_caught() {
        return HEAP8[(this.ptr)+(12)] != 0;
      }
  
      set_rethrown(rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[(this.ptr)+(13)] = rethrown;
      }
  
      get_rethrown() {
        return HEAP8[(this.ptr)+(13)] != 0;
      }
  
      // Initialize native structure fields. Should be called once after allocated.
      init(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
  
      set_adjusted_ptr(adjustedPtr) {
        HEAPU32[(((this.ptr)+(16))>>2)] = adjustedPtr;
      }
  
      get_adjusted_ptr() {
        return HEAPU32[(((this.ptr)+(16))>>2)];
      }
    }
  Module['ExceptionInfo'] = ExceptionInfo;
  
  var exceptionLast = 0;
  Module['exceptionLast'] = exceptionLast;
  
  var uncaughtExceptionCount = 0;
  Module['uncaughtExceptionCount'] = uncaughtExceptionCount;
  var ___cxa_throw = (ptr, type, destructor) => {
      var info = new ExceptionInfo(ptr);
      // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
      info.init(type, destructor);
      exceptionLast = ptr;
      uncaughtExceptionCount++;
      assert(false, 'Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.');
    };
  Module['___cxa_throw'] = ___cxa_throw;

  /** @suppress {duplicate } */
  function syscallGetVarargI() {
      assert(SYSCALLS.varargs != undefined);
      // the `+` prepended here is necessary to convince the JSCompiler that varargs is indeed a number.
      var ret = HEAP32[((+SYSCALLS.varargs)>>2)];
      SYSCALLS.varargs += 4;
      return ret;
    }
  Module['syscallGetVarargI'] = syscallGetVarargI;
  var syscallGetVarargP = syscallGetVarargI;
  Module['syscallGetVarargP'] = syscallGetVarargP;
  
  
  var PATH = {
  isAbs:(path) => path.charAt(0) === '/',
  splitPath:(filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
  normalizeArray:(parts, allowAboveRoot) => {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },
  normalize:(path) => {
        var isAbsolute = PATH.isAbs(path),
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter((p) => !!p), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },
  dirname:(path) => {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
  basename:(path) => {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },
  join:(...paths) => PATH.normalize(paths.join('/')),
  join2:(l, r) => PATH.normalize(l + '/' + r),
  };
  Module['PATH'] = PATH;
  
  var initRandomFill = () => {
      if (typeof crypto == 'object' && typeof crypto['getRandomValues'] == 'function') {
        // for modern web browsers
        return (view) => crypto.getRandomValues(view);
      } else
      if (ENVIRONMENT_IS_NODE) {
        // for nodejs with or without crypto support included
        try {
          var crypto_module = require('crypto');
          var randomFillSync = crypto_module['randomFillSync'];
          if (randomFillSync) {
            // nodejs with LTS crypto support
            return (view) => crypto_module['randomFillSync'](view);
          }
          // very old nodejs with the original crypto API
          var randomBytes = crypto_module['randomBytes'];
          return (view) => (
            view.set(randomBytes(view.byteLength)),
            // Return the original view to match modern native implementations.
            view
          );
        } catch (e) {
          // nodejs doesn't have crypto support
        }
      }
      // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
      abort('no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };');
    };
  Module['initRandomFill'] = initRandomFill;
  var randomFill = (view) => {
      // Lazily init on the first invocation.
      return (randomFill = initRandomFill())(view);
    };
  Module['randomFill'] = randomFill;
  
  
  
  var PATH_FS = {
  resolve:(...args) => {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? args[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter((p) => !!p), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },
  relative:(from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      },
  };
  Module['PATH_FS'] = PATH_FS;
  
  
  
  var FS_stdin_getChar_buffer = [];
  Module['FS_stdin_getChar_buffer'] = FS_stdin_getChar_buffer;
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  Module['lengthBytesUTF8'] = lengthBytesUTF8;
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  Module['stringToUTF8Array'] = stringToUTF8Array;
  /** @type {function(string, boolean=, number=)} */
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  Module['intArrayFromString'] = intArrayFromString;
  var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
          // we will read data by chunks of BUFSIZE
          var BUFSIZE = 256;
          var buf = Buffer.alloc(BUFSIZE);
          var bytesRead = 0;
  
          // For some reason we must suppress a closure warning here, even though
          // fd definitely exists on process.stdin, and is even the proper way to
          // get the fd of stdin,
          // https://github.com/nodejs/help/issues/2136#issuecomment-523649904
          // This started to happen after moving this logic out of library_tty.js,
          // so it is related to the surrounding code in some unclear manner.
          /** @suppress {missingProperties} */
          var fd = process.stdin.fd;
  
          try {
            bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
          } catch(e) {
            // Cross-platform differences: on Windows, reading EOF throws an
            // exception, but on other OSes, reading EOF returns 0. Uniformize
            // behavior by treating the EOF exception to return 0.
            if (e.toString().includes('EOF')) bytesRead = 0;
            else throw e;
          }
  
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString('utf-8');
          }
        } else
        if (typeof window != 'undefined' &&
          typeof window.prompt == 'function') {
          // Browser.
          result = window.prompt('Input: ');  // returns null on cancel
          if (result !== null) {
            result += '\n';
          }
        } else
        {}
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
  Module['FS_stdin_getChar'] = FS_stdin_getChar;
  var TTY = {
  ttys:[],
  init() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process.stdin.setEncoding('utf8');
        // }
      },
  shutdown() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process.stdin.pause();
        // }
      },
  register(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
  stream_ops:{
  open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
  close(stream) {
          // flush any pending line data
          stream.tty.ops.fsync(stream.tty);
        },
  fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
  read(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
  write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        },
  },
  default_tty_ops:{
  get_char(tty) {
          return FS_stdin_getChar();
        },
  put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  ioctl_tcgets(tty) {
          // typical setting
          return {
            c_iflag: 25856,
            c_oflag: 5,
            c_cflag: 191,
            c_lflag: 35387,
            c_cc: [
              0x03, 0x1c, 0x7f, 0x15, 0x04, 0x00, 0x01, 0x00, 0x11, 0x13, 0x1a, 0x00,
              0x12, 0x0f, 0x17, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            ]
          };
        },
  ioctl_tcsets(tty, optional_actions, data) {
          // currently just ignore
          return 0;
        },
  ioctl_tiocgwinsz(tty) {
          return [24, 80];
        },
  },
  default_tty1_ops:{
  put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  },
  };
  Module['TTY'] = TTY;
  
  
  var zeroMemory = (address, size) => {
      HEAPU8.fill(0, address, address + size);
      return address;
    };
  Module['zeroMemory'] = zeroMemory;
  
  var alignMemory = (size, alignment) => {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    };
  Module['alignMemory'] = alignMemory;
  var mmapAlloc = (size) => {
      size = alignMemory(size, 65536);
      var ptr = _emscripten_builtin_memalign(65536, size);
      if (!ptr) return 0;
      return zeroMemory(ptr, size);
    };
  Module['mmapAlloc'] = mmapAlloc;
  var MEMFS = {
  ops_table:null,
  mount(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },
  createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        MEMFS.ops_table ||= {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek
            }
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync
            }
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink
            },
            stream: {}
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: FS.chrdev_stream_ops
          }
        };
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },
  getFileDataAsTypedArray(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },
  expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },
  resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },
  node_ops:{
  getattr(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
  setattr(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
  lookup(parent, name) {
          throw FS.genericErrors[44];
        },
  mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
  rename(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now()
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
        },
  unlink(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  readdir(node) {
          var entries = ['.', '..'];
          for (var key of Object.keys(node.contents)) {
            entries.push(key);
          }
          return entries;
        },
  symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },
  readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        },
  },
  stream_ops:{
  read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },
  write(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
  llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
  allocate(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },
  mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the
            // buffer we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            if (contents) {
              // Try to avoid unnecessary slices.
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(contents, position, position + length);
                }
              }
              HEAP8.set(contents, ptr);
            }
          }
          return { ptr, allocated };
        },
  msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        },
  },
  };
  Module['MEMFS'] = MEMFS;
  
  /** @param {boolean=} noRunDep */
  var asyncLoad = (url, onload, onerror, noRunDep) => {
      var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : '';
      readAsync(url).then(
        (arrayBuffer) => {
          assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
          onload(new Uint8Array(arrayBuffer));
          if (dep) removeRunDependency(dep);
        },
        (err) => {
          if (onerror) {
            onerror();
          } else {
            throw `Loading data file "${url}" failed.`;
          }
        }
      );
      if (dep) addRunDependency(dep);
    };
  Module['asyncLoad'] = asyncLoad;
  
  
  var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
      FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
    };
  Module['FS_createDataFile'] = FS_createDataFile;
  
  var preloadPlugins = Module['preloadPlugins'] || [];
  Module['preloadPlugins'] = preloadPlugins;
  var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
      // Ensure plugins are ready.
      if (typeof Browser != 'undefined') Browser.init();
  
      var handled = false;
      preloadPlugins.forEach((plugin) => {
        if (handled) return;
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    };
  Module['FS_handledByPreloadPlugin'] = FS_handledByPreloadPlugin;
  var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      // TODO we should allow people to just pass in a complete filename instead
      // of parent and name being that we just join them anyways
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`); // might have several active requests for the same fullname
      function processData(byteArray) {
        function finish(byteArray) {
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
          onload?.();
          removeRunDependency(dep);
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          onerror?.();
          removeRunDependency(dep);
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == 'string') {
        asyncLoad(url, processData, onerror);
      } else {
        processData(url);
      }
    };
  Module['FS_createPreloadedFile'] = FS_createPreloadedFile;
  
  var FS_modeStringToFlags = (str) => {
      var flagModes = {
        'r': 0,
        'r+': 2,
        'w': 512 | 64 | 1,
        'w+': 512 | 64 | 2,
        'a': 1024 | 64 | 1,
        'a+': 1024 | 64 | 2,
      };
      var flags = flagModes[str];
      if (typeof flags == 'undefined') {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
  Module['FS_modeStringToFlags'] = FS_modeStringToFlags;
  
  var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    };
  Module['FS_getMode'] = FS_getMode;
  
  
  
  
  
  
  var strError = (errno) => {
      return UTF8ToString(_strerror(errno));
    };
  Module['strError'] = strError;
  
  var ERRNO_CODES = {
      'EPERM': 63,
      'ENOENT': 44,
      'ESRCH': 71,
      'EINTR': 27,
      'EIO': 29,
      'ENXIO': 60,
      'E2BIG': 1,
      'ENOEXEC': 45,
      'EBADF': 8,
      'ECHILD': 12,
      'EAGAIN': 6,
      'EWOULDBLOCK': 6,
      'ENOMEM': 48,
      'EACCES': 2,
      'EFAULT': 21,
      'ENOTBLK': 105,
      'EBUSY': 10,
      'EEXIST': 20,
      'EXDEV': 75,
      'ENODEV': 43,
      'ENOTDIR': 54,
      'EISDIR': 31,
      'EINVAL': 28,
      'ENFILE': 41,
      'EMFILE': 33,
      'ENOTTY': 59,
      'ETXTBSY': 74,
      'EFBIG': 22,
      'ENOSPC': 51,
      'ESPIPE': 70,
      'EROFS': 69,
      'EMLINK': 34,
      'EPIPE': 64,
      'EDOM': 18,
      'ERANGE': 68,
      'ENOMSG': 49,
      'EIDRM': 24,
      'ECHRNG': 106,
      'EL2NSYNC': 156,
      'EL3HLT': 107,
      'EL3RST': 108,
      'ELNRNG': 109,
      'EUNATCH': 110,
      'ENOCSI': 111,
      'EL2HLT': 112,
      'EDEADLK': 16,
      'ENOLCK': 46,
      'EBADE': 113,
      'EBADR': 114,
      'EXFULL': 115,
      'ENOANO': 104,
      'EBADRQC': 103,
      'EBADSLT': 102,
      'EDEADLOCK': 16,
      'EBFONT': 101,
      'ENOSTR': 100,
      'ENODATA': 116,
      'ETIME': 117,
      'ENOSR': 118,
      'ENONET': 119,
      'ENOPKG': 120,
      'EREMOTE': 121,
      'ENOLINK': 47,
      'EADV': 122,
      'ESRMNT': 123,
      'ECOMM': 124,
      'EPROTO': 65,
      'EMULTIHOP': 36,
      'EDOTDOT': 125,
      'EBADMSG': 9,
      'ENOTUNIQ': 126,
      'EBADFD': 127,
      'EREMCHG': 128,
      'ELIBACC': 129,
      'ELIBBAD': 130,
      'ELIBSCN': 131,
      'ELIBMAX': 132,
      'ELIBEXEC': 133,
      'ENOSYS': 52,
      'ENOTEMPTY': 55,
      'ENAMETOOLONG': 37,
      'ELOOP': 32,
      'EOPNOTSUPP': 138,
      'EPFNOSUPPORT': 139,
      'ECONNRESET': 15,
      'ENOBUFS': 42,
      'EAFNOSUPPORT': 5,
      'EPROTOTYPE': 67,
      'ENOTSOCK': 57,
      'ENOPROTOOPT': 50,
      'ESHUTDOWN': 140,
      'ECONNREFUSED': 14,
      'EADDRINUSE': 3,
      'ECONNABORTED': 13,
      'ENETUNREACH': 40,
      'ENETDOWN': 38,
      'ETIMEDOUT': 73,
      'EHOSTDOWN': 142,
      'EHOSTUNREACH': 23,
      'EINPROGRESS': 26,
      'EALREADY': 7,
      'EDESTADDRREQ': 17,
      'EMSGSIZE': 35,
      'EPROTONOSUPPORT': 66,
      'ESOCKTNOSUPPORT': 137,
      'EADDRNOTAVAIL': 4,
      'ENETRESET': 39,
      'EISCONN': 30,
      'ENOTCONN': 53,
      'ETOOMANYREFS': 141,
      'EUSERS': 136,
      'EDQUOT': 19,
      'ESTALE': 72,
      'ENOTSUP': 138,
      'ENOMEDIUM': 148,
      'EILSEQ': 25,
      'EOVERFLOW': 61,
      'ECANCELED': 11,
      'ENOTRECOVERABLE': 56,
      'EOWNERDEAD': 62,
      'ESTRPIPE': 135,
    };
  Module['ERRNO_CODES'] = ERRNO_CODES;
  var FS = {
  root:null,
  mounts:[],
  devices:{
  },
  streams:[],
  nextInode:1,
  nameTable:null,
  currentPath:"/",
  initialized:false,
  ignorePermissions:true,
  ErrnoError:class extends Error {
        // We set the `name` property to be able to identify `FS.ErrnoError`
        // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
        // - when using PROXYFS, an error can come from an underlying FS
        // as different FS objects have their own FS.ErrnoError each,
        // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
        // we'll use the reliable test `err.name == "ErrnoError"` instead
        constructor(errno) {
          super(runtimeInitialized ? strError(errno) : '');
          // TODO(sbc): Use the inline member declaration syntax once we
          // support it in acorn and closure.
          this.name = 'ErrnoError';
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
        }
      },
  genericErrors:{
  },
  filesystems:null,
  syncFSRequests:0,
  readFiles:{
  },
  FSStream:class {
        constructor() {
          // TODO(https://github.com/emscripten-core/emscripten/issues/21414):
          // Use inline field declarations.
          this.shared = {};
        }
        get object() {
          return this.node;
        }
        set object(val) {
          this.node = val;
        }
        get isRead() {
          return (this.flags & 2097155) !== 1;
        }
        get isWrite() {
          return (this.flags & 2097155) !== 0;
        }
        get isAppend() {
          return (this.flags & 1024);
        }
        get flags() {
          return this.shared.flags;
        }
        set flags(val) {
          this.shared.flags = val;
        }
        get position() {
          return this.shared.position;
        }
        set position(val) {
          this.shared.position = val;
        }
      },
  FSNode:class {
        constructor(parent, name, mode, rdev) {
          if (!parent) {
            parent = this;  // root node sets parent to itself
          }
          this.parent = parent;
          this.mount = parent.mount;
          this.mounted = null;
          this.id = FS.nextInode++;
          this.name = name;
          this.mode = mode;
          this.node_ops = {};
          this.stream_ops = {};
          this.rdev = rdev;
          this.readMode = 292 | 73;
          this.writeMode = 146;
        }
        get read() {
          return (this.mode & this.readMode) === this.readMode;
        }
        set read(val) {
          val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
        }
        get write() {
          return (this.mode & this.writeMode) === this.writeMode;
        }
        set write(val) {
          val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
        }
        get isFolder() {
          return FS.isDir(this.mode);
        }
        get isDevice() {
          return FS.isChrdev(this.mode);
        }
      },
  lookupPath(path, opts = {}) {
        path = PATH_FS.resolve(path);
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        opts = Object.assign(defaults, opts)
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the absolute path
        var parts = path.split('/').filter((p) => !!p);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },
  getPath(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? `${mount}/${path}` : mount + path;
          }
          path = path ? `${node.name}/${path}` : node.name;
          node = node.parent;
        }
      },
  hashName(parentid, name) {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },
  hashAddNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
  hashRemoveNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
  lookupNode(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },
  createNode(parent, name, mode, rdev) {
        assert(typeof parent == 'object')
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },
  destroyNode(node) {
        FS.hashRemoveNode(node);
      },
  isRoot(node) {
        return node === node.parent;
      },
  isMountpoint(node) {
        return !!node.mounted;
      },
  isFile(mode) {
        return (mode & 61440) === 32768;
      },
  isDir(mode) {
        return (mode & 61440) === 16384;
      },
  isLink(mode) {
        return (mode & 61440) === 40960;
      },
  isChrdev(mode) {
        return (mode & 61440) === 8192;
      },
  isBlkdev(mode) {
        return (mode & 61440) === 24576;
      },
  isFIFO(mode) {
        return (mode & 61440) === 4096;
      },
  isSocket(mode) {
        return (mode & 49152) === 49152;
      },
  flagsToPermissionString(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },
  nodePermissions(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
  mayLookup(dir) {
        if (!FS.isDir(dir.mode)) return 54;
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
  mayCreate(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },
  mayDelete(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
  mayOpen(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
  MAX_OPEN_FDS:4096,
  nextfd() {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
  getStreamChecked(fd) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        return stream;
      },
  getStream:(fd) => FS.streams[fd],
  createStream(stream, fd = -1) {
        assert(fd >= -1);
  
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        if (fd == -1) {
          fd = FS.nextfd();
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
  closeStream(fd) {
        FS.streams[fd] = null;
      },
  dupStream(origStream, fd = -1) {
        var stream = FS.createStream(origStream, fd);
        stream.stream_ops?.dup?.(stream);
        return stream;
      },
  chrdev_stream_ops:{
  open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          stream.stream_ops.open?.(stream);
        },
  llseek() {
          throw new FS.ErrnoError(70);
        },
  },
  major:(dev) => ((dev) >> 8),
  minor:(dev) => ((dev) & 0xff),
  makedev:(ma, mi) => ((ma) << 8 | (mi)),
  registerDevice(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },
  getDevice:(dev) => FS.devices[dev],
  getMounts(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push(...m.mounts);
        }
  
        return mounts;
      },
  syncfs(populate, callback) {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
  mount(type, opts, mountpoint) {
        if (typeof type == 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },
  unmount(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },
  lookup(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
  mknod(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
  create(path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
  mkdir(path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
  mkdirTree(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },
  mkdev(path, mode, dev) {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
  symlink(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
  rename(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existent directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
          // update old node (we do this here to avoid each backend 
          // needing to)
          old_node.parent = new_dir;
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },
  rmdir(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
  readdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
  unlink(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
  readlink(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },
  stat(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
  lstat(path) {
        return FS.stat(path, true);
      },
  chmod(path, mode, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },
  lchmod(path, mode) {
        FS.chmod(path, mode, true);
      },
  fchmod(fd, mode) {
        var stream = FS.getStreamChecked(fd);
        FS.chmod(stream.node, mode);
      },
  chown(path, uid, gid, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },
  lchown(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
  fchown(fd, uid, gid) {
        var stream = FS.getStreamChecked(fd);
        FS.chown(stream.node, uid, gid);
      },
  truncate(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },
  ftruncate(fd, len) {
        var stream = FS.getStreamChecked(fd);
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
  utime(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },
  open(path, flags, mode) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS_modeStringToFlags(flags) : flags;
        if ((flags & 64)) {
          mode = typeof mode == 'undefined' ? 438 /* 0666 */ : mode;
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512) && !created) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
  close(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
  isClosed(stream) {
        return stream.fd === null;
      },
  llseek(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
  read(stream, buffer, offset, length, position) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
  write(stream, buffer, offset, length, position, canOwn) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
  allocate(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },
  mmap(stream, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        if (!length) {
          throw new FS.ErrnoError(28);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
  msync(stream, buffer, offset, length, mmapFlags) {
        assert(offset >= 0);
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },
  ioctl(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
  readFile(path, opts = {}) {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error(`Invalid encoding type "${opts.encoding}"`);
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
  writeFile(path, data, opts = {}) {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },
  cwd:() => FS.currentPath,
  chdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
  createDefaultDirectories() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },
  createDefaultDevices() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        // use a buffer to avoid overhead of individual crypto calls per byte
        var randomBuffer = new Uint8Array(1024), randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomLeft = randomFill(randomBuffer).byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },
  createSpecialDirectories() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount() {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup(parent, name) {
                var fd = +name;
                var stream = FS.getStreamChecked(fd);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },
  createStandardStreams(input, output, error) {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (input) {
          FS.createDevice('/dev', 'stdin', input);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (output) {
          FS.createDevice('/dev', 'stdout', null, output);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (error) {
          FS.createDevice('/dev', 'stderr', null, error);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
        assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
        assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
        assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
      },
  staticInit() {
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },
  init(input, output, error) {
        assert(!FS.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.initialized = true;
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        input ??= Module['stdin'];
        output ??= Module['stdout'];
        error ??= Module['stderr'];
  
        FS.createStandardStreams(input, output, error);
      },
  quit() {
        FS.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        _fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
  findObject(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
  analyzePath(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },
  createPath(parent, path, canRead, canWrite) {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },
  createFile(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
      },
  createDevice(parent, name, input, output) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(!!input, !!output);
        FS.createDevice.major ??= 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open(stream) {
            stream.seekable = false;
          },
          close(stream) {
            // flush any pending line data
            if (output?.buffer?.length) {
              output(10);
            }
          },
          read(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
  forceLoadFile(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else { // Command-line.
          try {
            obj.contents = readBinary(obj.url);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
      },
  createLazyFile(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array).
        // Actual getting is abstracted away for eventual reuse.
        class LazyUint8Array {
          constructor() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = (idx / this.chunkSize)|0;
            return this.getter(chunkNum)[chunkOffset];
          }
          setDataGetter(getter) {
            this.getter = getter;
          }
          cacheLength() {
            // Find length
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, false);
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            var datalength = Number(xhr.getResponseHeader("Content-length"));
            var header;
            var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
            var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
            var chunkSize = 1024*1024; // Chunk size in bytes
  
            if (!hasByteServing) chunkSize = datalength;
  
            // Function to get a range from the remote URL.
            var doXHR = (from, to) => {
              if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
              if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
              // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, false);
              if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
              // Some hints to the browser that we want binary data.
              xhr.responseType = 'arraybuffer';
              if (xhr.overrideMimeType) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
              }
  
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              if (xhr.response !== undefined) {
                return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
              }
              return intArrayFromString(xhr.responseText || '', true);
            };
            var lazyArray = this;
            lazyArray.setDataGetter((chunkNum) => {
              var start = chunkNum * chunkSize;
              var end = (chunkNum+1) * chunkSize - 1; // including this byte
              end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
              }
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
              return lazyArray.chunks[chunkNum];
            });
  
            if (usesGzip || !datalength) {
              // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
              chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
              datalength = this.getter(0).length;
              chunkSize = datalength;
              out("LazyFiles on gzip forces download of the whole file when length is accessed");
            }
  
            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
          }
          get length() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._length;
          }
          get chunkSize() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._chunkSize;
          }
        }
  
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = (...args) => {
            FS.forceLoadFile(node);
            return fn(...args);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position)
        };
        // use a custom mmap function
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },
  absolutePath() {
        abort('FS.absolutePath has been removed; use PATH_FS.resolve instead');
      },
  createFolder() {
        abort('FS.createFolder has been removed; use FS.mkdir instead');
      },
  createLink() {
        abort('FS.createLink has been removed; use FS.symlink instead');
      },
  joinPath() {
        abort('FS.joinPath has been removed; use PATH.join instead');
      },
  mmapAlloc() {
        abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc');
      },
  standardizePath() {
        abort('FS.standardizePath has been removed; use PATH.normalize instead');
      },
  };
  Module['FS'] = FS;
  
  var SYSCALLS = {
  DEFAULT_POLLMASK:5,
  calculateAt(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },
  doStat(func, path, buf) {
        var stat = func(path);
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(4))>>2)] = stat.mode;
        HEAPU32[(((buf)+(8))>>2)] = stat.nlink;
        HEAP32[(((buf)+(12))>>2)] = stat.uid;
        HEAP32[(((buf)+(16))>>2)] = stat.gid;
        HEAP32[(((buf)+(20))>>2)] = stat.rdev;
        (tempI64 = [stat.size>>>0,(tempDouble = stat.size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(24))>>2)] = tempI64[0],HEAP32[(((buf)+(28))>>2)] = tempI64[1]);
        HEAP32[(((buf)+(32))>>2)] = 4096;
        HEAP32[(((buf)+(36))>>2)] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        (tempI64 = [Math.floor(atime / 1000)>>>0,(tempDouble = Math.floor(atime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(40))>>2)] = tempI64[0],HEAP32[(((buf)+(44))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(48))>>2)] = (atime % 1000) * 1000 * 1000;
        (tempI64 = [Math.floor(mtime / 1000)>>>0,(tempDouble = Math.floor(mtime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(56))>>2)] = tempI64[0],HEAP32[(((buf)+(60))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(64))>>2)] = (mtime % 1000) * 1000 * 1000;
        (tempI64 = [Math.floor(ctime / 1000)>>>0,(tempDouble = Math.floor(ctime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(72))>>2)] = tempI64[0],HEAP32[(((buf)+(76))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(80))>>2)] = (ctime % 1000) * 1000 * 1000;
        (tempI64 = [stat.ino>>>0,(tempDouble = stat.ino,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(88))>>2)] = tempI64[0],HEAP32[(((buf)+(92))>>2)] = tempI64[1]);
        return 0;
      },
  doMsync(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          // MAP_PRIVATE calls need not to be synced back to underlying fs
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
  getStreamFromFD(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream;
      },
  varargs:undefined,
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  Module['SYSCALLS'] = SYSCALLS;
  function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = syscallGetVarargI();
          if (arg < 0) {
            return -28;
          }
          while (FS.streams[arg]) {
            arg++;
          }
          var newStream;
          newStream = FS.dupStream(stream, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = syscallGetVarargI();
          stream.flags |= arg;
          return 0;
        }
        case 12: {
          var arg = syscallGetVarargP();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)] = 2;
          return 0;
        }
        case 13:
        case 14:
          return 0; // Pretend that the locking is successful.
      }
      return -28;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  Module['___syscall_fcntl64'] = ___syscall_fcntl64;

  function ___syscall_fstat64(fd, buf) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      return SYSCALLS.doStat(FS.stat, stream.path, buf);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  Module['___syscall_fstat64'] = ___syscall_fstat64;

  
  function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21505: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcgets) {
            var termios = stream.tty.ops.ioctl_tcgets(stream);
            var argp = syscallGetVarargP();
            HEAP32[((argp)>>2)] = termios.c_iflag || 0;
            HEAP32[(((argp)+(4))>>2)] = termios.c_oflag || 0;
            HEAP32[(((argp)+(8))>>2)] = termios.c_cflag || 0;
            HEAP32[(((argp)+(12))>>2)] = termios.c_lflag || 0;
            for (var i = 0; i < 32; i++) {
              HEAP8[(argp + i)+(17)] = termios.c_cc[i] || 0;
            }
            return 0;
          }
          return 0;
        }
        case 21510:
        case 21511:
        case 21512: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcsets) {
            var argp = syscallGetVarargP();
            var c_iflag = HEAP32[((argp)>>2)];
            var c_oflag = HEAP32[(((argp)+(4))>>2)];
            var c_cflag = HEAP32[(((argp)+(8))>>2)];
            var c_lflag = HEAP32[(((argp)+(12))>>2)];
            var c_cc = []
            for (var i = 0; i < 32; i++) {
              c_cc.push(HEAP8[(argp + i)+(17)]);
            }
            return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
          }
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = syscallGetVarargP();
          HEAP32[((argp)>>2)] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = syscallGetVarargP();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tiocgwinsz) {
            var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
            var argp = syscallGetVarargP();
            HEAP16[((argp)>>1)] = winsize[0];
            HEAP16[(((argp)+(2))>>1)] = winsize[1];
          }
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        case 21515: {
          if (!stream.tty) return -59;
          return 0;
        }
        default: return -28; // not supported
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  Module['___syscall_ioctl'] = ___syscall_ioctl;

  function ___syscall_lstat64(path, buf) {
  try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doStat(FS.lstat, path, buf);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  Module['___syscall_lstat64'] = ___syscall_lstat64;

  function ___syscall_mkdirat(dirfd, path, mode) {
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      // remove a trailing slash, if one - /a/b/ has basename of '', but
      // we want to create b in the context of this function
      path = PATH.normalize(path);
      if (path[path.length-1] === '/') path = path.substr(0, path.length-1);
      FS.mkdir(path, mode, 0);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  Module['___syscall_mkdirat'] = ___syscall_mkdirat;

  function ___syscall_newfstatat(dirfd, path, buf, flags) {
  try {
  
      path = SYSCALLS.getStr(path);
      var nofollow = flags & 256;
      var allowEmpty = flags & 4096;
      flags = flags & (~6400);
      assert(!flags, `unknown flags in __syscall_newfstatat: ${flags}`);
      path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
      return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  Module['___syscall_newfstatat'] = ___syscall_newfstatat;

  
  function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      var mode = varargs ? syscallGetVarargI() : 0;
      return FS.open(path, flags, mode).fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  Module['___syscall_openat'] = ___syscall_openat;

  function ___syscall_stat64(path, buf) {
  try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doStat(FS.stat, path, buf);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  Module['___syscall_stat64'] = ___syscall_stat64;

  var __abort_js = () => {
      abort('native code called abort()');
    };
  Module['__abort_js'] = __abort_js;

  var nowIsMonotonic = 1;
  Module['nowIsMonotonic'] = nowIsMonotonic;
  var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;
  Module['__emscripten_get_now_is_monotonic'] = __emscripten_get_now_is_monotonic;

  var getExecutableName = () => {
      return thisProgram || './this.program';
    };
  Module['getExecutableName'] = getExecutableName;
  
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  Module['stringToUTF8'] = stringToUTF8;
  var __emscripten_get_progname = (str, len) => {
      stringToUTF8(getExecutableName(), str, len);
    };
  Module['__emscripten_get_progname'] = __emscripten_get_progname;

  var __emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);
  Module['__emscripten_memcpy_js'] = __emscripten_memcpy_js;

  var __emscripten_runtime_keepalive_clear = () => {
      noExitRuntime = false;
      runtimeKeepaliveCounter = 0;
    };
  Module['__emscripten_runtime_keepalive_clear'] = __emscripten_runtime_keepalive_clear;

  var __emscripten_throw_longjmp = () => {
      throw Infinity;
    };
  Module['__emscripten_throw_longjmp'] = __emscripten_throw_longjmp;

  
  
  
  
  
  var convertI32PairToI53Checked = (lo, hi) => {
      assert(lo == (lo >>> 0) || lo == (lo|0)); // lo should either be a i32 or a u32
      assert(hi === (hi|0));                    // hi should be a i32
      return ((hi + 0x200000) >>> 0 < 0x400001 - !!lo) ? (lo >>> 0) + hi * 4294967296 : NaN;
    };
  Module['convertI32PairToI53Checked'] = convertI32PairToI53Checked;
  function __mmap_js(len,prot,flags,fd,offset_low, offset_high,allocated,addr) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      var res = FS.mmap(stream, len, offset, prot, flags);
      var ptr = res.ptr;
      HEAP32[((allocated)>>2)] = res.allocated;
      HEAPU32[((addr)>>2)] = ptr;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  ;
  }
  Module['__mmap_js'] = __mmap_js;

  
  function __munmap_js(addr,len,prot,flags,fd,offset_low, offset_high) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);
  
    
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      if (prot & 2) {
        SYSCALLS.doMsync(addr, stream, len, flags, offset);
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  ;
  }
  Module['__munmap_js'] = __munmap_js;

  var timers = {
  };
  Module['timers'] = timers;
  
  var handleException = (e) => {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      checkStackCookie();
      if (e instanceof WebAssembly.RuntimeError) {
        if (_emscripten_stack_get_current() <= 0) {
          err('Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)');
        }
      }
      quit_(1, e);
    };
  Module['handleException'] = handleException;
  
  
  var runtimeKeepaliveCounter = 0;
  Module['runtimeKeepaliveCounter'] = runtimeKeepaliveCounter;
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  Module['keepRuntimeAlive'] = keepRuntimeAlive;
  var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
  Module['_proc_exit'] = _proc_exit;
  
  /** @suppress {duplicate } */
  /** @param {boolean|number=} implicit */
  var exitJS = (status, implicit) => {
      EXITSTATUS = status;
  
      checkUnflushedContent();
  
      // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
      if (keepRuntimeAlive() && !implicit) {
        var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
        err(msg);
      }
  
      _proc_exit(status);
    };
  Module['exitJS'] = exitJS;
  var _exit = exitJS;
  Module['_exit'] = _exit;
  
  
  var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
  Module['maybeExit'] = maybeExit;
  var callUserCallback = (func) => {
      if (ABORT) {
        err('user callback triggered after runtime exited or application aborted.  Ignoring.');
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
  Module['callUserCallback'] = callUserCallback;
  
  
  var _emscripten_get_now = () => performance.now();
  Module['_emscripten_get_now'] = _emscripten_get_now;
  var __setitimer_js = (which, timeout_ms) => {
      // First, clear any existing timer.
      if (timers[which]) {
        clearTimeout(timers[which].id);
        delete timers[which];
      }
  
      // A timeout of zero simply cancels the current timeout so we have nothing
      // more to do.
      if (!timeout_ms) return 0;
  
      var id = setTimeout(() => {
        assert(which in timers);
        delete timers[which];
        callUserCallback(() => __emscripten_timeout(which, _emscripten_get_now()));
      }, timeout_ms);
      timers[which] = { id, timeout_ms };
      return 0;
    };
  Module['__setitimer_js'] = __setitimer_js;

  
  var __tzset_js = (timezone, daylight, std_name, dst_name) => {
      // TODO: Use (malleable) environment variables instead of system settings.
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
  
      // Local standard timezone offset. Local standard time is not adjusted for
      // daylight savings.  This code uses the fact that getTimezoneOffset returns
      // a greater value during Standard Time versus Daylight Saving Time (DST).
      // Thus it determines the expected output during Standard Time, and it
      // compares whether the output of the given date the same (Standard) or less
      // (DST).
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  
      // timezone is specified as seconds west of UTC ("The external variable
      // `timezone` shall be set to the difference, in seconds, between
      // Coordinated Universal Time (UTC) and local standard time."), the same
      // as returned by stdTimezoneOffset.
      // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
      HEAPU32[((timezone)>>2)] = stdTimezoneOffset * 60;
  
      HEAP32[((daylight)>>2)] = Number(winterOffset != summerOffset);
  
      var extractZone = (timezoneOffset) => {
        // Why inverse sign?
        // Read here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
        var sign = timezoneOffset >= 0 ? "-" : "+";
  
        var absOffset = Math.abs(timezoneOffset)
        var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
        var minutes = String(absOffset % 60).padStart(2, "0");
  
        return `UTC${sign}${hours}${minutes}`;
      }
  
      var winterName = extractZone(winterOffset);
      var summerName = extractZone(summerOffset);
      assert(winterName);
      assert(summerName);
      assert(lengthBytesUTF8(winterName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${winterName})`);
      assert(lengthBytesUTF8(summerName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${summerName})`);
      if (summerOffset < winterOffset) {
        // Northern hemisphere
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    };
  Module['__tzset_js'] = __tzset_js;

  
  /** @param {number=} timeout */
  var safeSetTimeout = (func, timeout) => {
      
      return setTimeout(() => {
        
        callUserCallback(func);
      }, timeout);
    };
  Module['safeSetTimeout'] = safeSetTimeout;
  
  
  
  var Browser = {
  useWebGL:false,
  isFullscreen:false,
  pointerLock:false,
  moduleContextCreatedCallbacks:[],
  workers:[],
  init() {
        if (Browser.initted) return;
        Browser.initted = true;
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module['noImageDecoding'] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          if (b.size !== byteArray.length) { // Safari bug #118630
            // Safari's Blob can only take an ArrayBuffer
            b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
          }
          var url = URL.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = () => {
            assert(img.complete, `Image ${name} could not be decoded`);
            var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement('canvas'));
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            preloadedImages[name] = canvas;
            URL.revokeObjectURL(url);
            onload?.(byteArray);
          };
          img.onerror = (event) => {
            err(`Image ${url} could not be decoded`);
            onerror?.();
          };
          img.src = url;
        };
        preloadPlugins.push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module['noAudioDecoding'] && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            preloadedAudios[name] = audio;
            onload?.(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            preloadedAudios[name] = new Audio(); // empty shim
            onerror?.();
          }
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          var url = URL.createObjectURL(b); // XXX we never revoke this!
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var audio = new Audio();
          audio.addEventListener('canplaythrough', () => finish(audio), false); // use addEventListener due to chromium bug 124926
          audio.onerror = function audio_onerror(event) {
            if (done) return;
            err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
            function encode64(data) {
              var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
              var PAD = '=';
              var ret = '';
              var leftchar = 0;
              var leftbits = 0;
              for (var i = 0; i < data.length; i++) {
                leftchar = (leftchar << 8) | data[i];
                leftbits += 8;
                while (leftbits >= 6) {
                  var curr = (leftchar >> (leftbits-6)) & 0x3f;
                  leftbits -= 6;
                  ret += BASE[curr];
                }
              }
              if (leftbits == 2) {
                ret += BASE[(leftchar&3) << 4];
                ret += PAD + PAD;
              } else if (leftbits == 4) {
                ret += BASE[(leftchar&0xf) << 2];
                ret += PAD;
              }
              return ret;
            }
            audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
            finish(audio); // we don't wait for confirmation this worked - but it's worth trying
          };
          audio.src = url;
          // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
          safeSetTimeout(() => {
            finish(audio); // try to use it even though it is not necessarily ready to play
          }, 10000);
        };
        preloadPlugins.push(audioPlugin);
  
        // Canvas event setup
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === Module['canvas'] ||
                                document['mozPointerLockElement'] === Module['canvas'] ||
                                document['webkitPointerLockElement'] === Module['canvas'] ||
                                document['msPointerLockElement'] === Module['canvas'];
        }
        var canvas = Module['canvas'];
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
  
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      (() => {});
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   (() => {}); // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", (ev) => {
              if (!Browser.pointerLock && Module['canvas'].requestPointerLock) {
                Module['canvas'].requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },
  createContext(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false,
            majorVersion: 1,
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          // This check of existence of GL is here to satisfy Closure compiler, which yells if variable GL is referenced below but GL object is not
          // actually compiled in because application is not doing any GL operations. TODO: Ideally if GL is not being used, this function
          // Browser.createContext() should not even be emitted.
          if (typeof GL != 'undefined') {
            contextHandle = GL.createContext(canvas, contextAttributes);
            if (contextHandle) {
              ctx = GL.getContext(contextHandle).GLctx;
            }
          }
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          if (!useWebGL) assert(typeof GLctx == 'undefined', 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it');
          Module.ctx = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Browser.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
          Browser.init();
        }
        return ctx;
      },
  fullscreenHandlersInstalled:false,
  lockPointer:undefined,
  resizeCanvas:undefined,
  requestFullscreen(lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer == 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas == 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        function fullscreenChange() {
          Browser.isFullscreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['fullscreenElement'] || document['mozFullScreenElement'] ||
               document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.exitFullscreen = Browser.exitFullscreen;
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullscreen = true;
            if (Browser.resizeCanvas) {
              Browser.setFullscreenCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          } else {
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
  
            if (Browser.resizeCanvas) {
              Browser.setWindowedCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          }
          Module['onFullScreen']?.(Browser.isFullscreen);
          Module['onFullscreen']?.(Browser.isFullscreen);
        }
  
        if (!Browser.fullscreenHandlersInstalled) {
          Browser.fullscreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullscreenChange, false);
          document.addEventListener('mozfullscreenchange', fullscreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullscreenChange, false);
          document.addEventListener('MSFullscreenChange', fullscreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
  
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullscreen = canvasContainer['requestFullscreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullscreen'] ? () => canvasContainer['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT']) : null) ||
                                           (canvasContainer['webkitRequestFullScreen'] ? () => canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) : null);
  
        canvasContainer.requestFullscreen();
      },
  requestFullScreen() {
        abort('Module.requestFullScreen has been replaced by Module.requestFullscreen (without a capital S)');
      },
  exitFullscreen() {
        // This is workaround for chrome. Trying to exit from fullscreen
        // not in fullscreen state will cause "TypeError: Document not active"
        // in chrome. See https://github.com/emscripten-core/emscripten/pull/8236
        if (!Browser.isFullscreen) {
          return false;
        }
  
        var CFS = document['exitFullscreen'] ||
                  document['cancelFullScreen'] ||
                  document['mozCancelFullScreen'] ||
                  document['msExitFullscreen'] ||
                  document['webkitCancelFullScreen'] ||
            (() => {});
        CFS.apply(document, []);
        return true;
      },
  safeSetTimeout(func, timeout) {
        // Legacy function, this is used by the SDL2 port so we need to keep it
        // around at least until that is updated.
        // See https://github.com/libsdl-org/SDL/pull/6304
        return safeSetTimeout(func, timeout);
      },
  getMimetype(name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },
  getUserMedia(func) {
        window.getUserMedia ||= navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        window.getUserMedia(func);
      },
  getMovementX(event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },
  getMovementY(event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },
  getMouseWheelDelta(event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll':
            // 3 lines make up a step
            delta = event.detail / 3;
            break;
          case 'mousewheel':
            // 120 units make up a step
            delta = event.wheelDelta / 120;
            break;
          case 'wheel':
            delta = event.deltaY
            switch (event.deltaMode) {
              case 0:
                // DOM_DELTA_PIXEL: 100 pixels make up a step
                delta /= 100;
                break;
              case 1:
                // DOM_DELTA_LINE: 3 lines make up a step
                delta /= 3;
                break;
              case 2:
                // DOM_DELTA_PAGE: A page makes up 80 steps
                delta *= 80;
                break;
              default:
                throw 'unrecognized mouse wheel delta mode: ' + event.deltaMode;
            }
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },
  mouseX:0,
  mouseY:0,
  mouseMovementX:0,
  mouseMovementY:0,
  touches:{
  },
  lastTouches:{
  },
  calculateMouseCoords(pageX, pageY) {
        // Calculate the movement based on the changes
        // in the coordinates.
        var rect = Module["canvas"].getBoundingClientRect();
        var cw = Module["canvas"].width;
        var ch = Module["canvas"].height;
  
        // Neither .scrollX or .pageXOffset are defined in a spec, but
        // we prefer .scrollX because it is currently in a spec draft.
        // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
        var scrollX = ((typeof window.scrollX != 'undefined') ? window.scrollX : window.pageXOffset);
        var scrollY = ((typeof window.scrollY != 'undefined') ? window.scrollY : window.pageYOffset);
        // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
        // and we have no viable fallback.
        assert((typeof scrollX != 'undefined') && (typeof scrollY != 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
        var adjustedX = pageX - (scrollX + rect.left);
        var adjustedY = pageY - (scrollY + rect.top);
  
        // the canvas might be CSS-scaled compared to its backbuffer;
        // SDL-using content will want mouse coordinates in terms
        // of backbuffer units.
        adjustedX = adjustedX * (cw / rect.width);
        adjustedY = adjustedY * (ch / rect.height);
  
        return { x: adjustedX, y: adjustedY };
      },
  setMouseCoords(pageX, pageY) {
        const {x, y} = Browser.calculateMouseCoords(pageX, pageY);
        Browser.mouseMovementX = x - Browser.mouseX;
        Browser.mouseMovementY = y - Browser.mouseY;
        Browser.mouseX = x;
        Browser.mouseY = y;
      },
  calculateMouseEvent(event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
  
          // add the mouse delta to the current absolute mouse position
          Browser.mouseX += Browser.mouseMovementX;
          Browser.mouseY += Browser.mouseMovementY;
        } else {
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
  
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier];
              last ||= coords;
              Browser.lastTouches[touch.identifier] = last;
              Browser.touches[touch.identifier] = coords;
            }
            return;
          }
  
          Browser.setMouseCoords(event.pageX, event.pageY);
        }
      },
  resizeListeners:[],
  updateResizeListeners() {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach((listener) => listener(canvas.width, canvas.height));
      },
  setCanvasSize(width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },
  windowedWidth:0,
  windowedHeight:0,
  setFullscreenCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },
  setWindowedCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },
  updateCanvasDimensions(canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['fullscreenElement'] || document['mozFullScreenElement'] ||
             document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      },
  };
  Module['Browser'] = Browser;
  
  var EGL = {
  errorCode:12288,
  defaultDisplayInitialized:false,
  currentContext:0,
  currentReadSurface:0,
  currentDrawSurface:0,
  contextAttributes:{
  alpha:false,
  depth:false,
  stencil:false,
  antialias:false,
  },
  stringCache:{
  },
  setErrorCode(code) {
        EGL.errorCode = code;
      },
  chooseConfig(display, attribList, config, config_size, numConfigs) {
        if (display != 62000) {
          EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
          return 0;
        }
  
        if (attribList) {
          // read attribList if it is non-null
          for (;;) {
            var param = HEAP32[((attribList)>>2)];
            if (param == 0x3021 /*EGL_ALPHA_SIZE*/) {
              var alphaSize = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.alpha = (alphaSize > 0);
            } else if (param == 0x3025 /*EGL_DEPTH_SIZE*/) {
              var depthSize = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.depth = (depthSize > 0);
            } else if (param == 0x3026 /*EGL_STENCIL_SIZE*/) {
              var stencilSize = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.stencil = (stencilSize > 0);
            } else if (param == 0x3031 /*EGL_SAMPLES*/) {
              var samples = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.antialias = (samples > 0);
            } else if (param == 0x3032 /*EGL_SAMPLE_BUFFERS*/) {
              var samples = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.antialias = (samples == 1);
            } else if (param == 0x3100 /*EGL_CONTEXT_PRIORITY_LEVEL_IMG*/) {
              var requestedPriority = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.lowLatency = (requestedPriority != 0x3103 /*EGL_CONTEXT_PRIORITY_LOW_IMG*/);
            } else if (param == 0x3038 /*EGL_NONE*/) {
                break;
            }
            attribList += 8;
          }
        }
  
        if ((!config || !config_size) && !numConfigs) {
          EGL.setErrorCode(0x300C /* EGL_BAD_PARAMETER */);
          return 0;
        }
        if (numConfigs) {
          HEAP32[((numConfigs)>>2)] = 1; // Total number of supported configs: 1.
        }
        if (config && config_size > 0) {
          HEAPU32[((config)>>2)] = 62002;
        }
  
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
        return 1;
      },
  };
  Module['EGL'] = EGL;
  var _eglBindAPI = (api) => {
      if (api == 0x30A0 /* EGL_OPENGL_ES_API */) {
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
        return 1;
      }
      // if (api == 0x30A1 /* EGL_OPENVG_API */ || api == 0x30A2 /* EGL_OPENGL_API */) {
      EGL.setErrorCode(0x300C /* EGL_BAD_PARAMETER */);
      return 0;
    };
  Module['_eglBindAPI'] = _eglBindAPI;

  var _eglChooseConfig = (display, attrib_list, configs, config_size, numConfigs) => {
      return EGL.chooseConfig(display, attrib_list, configs, config_size, numConfigs);
    };
  Module['_eglChooseConfig'] = _eglChooseConfig;

  var GLctx;
  Module['GLctx'] = GLctx;
  
  var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
      // Extension available in WebGL 1 from Firefox 26 and Google Chrome 30 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('ANGLE_instanced_arrays');
      // Because this extension is a core function in WebGL 2, assign the extension entry points in place of
      // where the core functions will reside in WebGL 2. This way the calling code can call these without
      // having to dynamically branch depending if running against WebGL 1 or WebGL 2.
      if (ext) {
        ctx['vertexAttribDivisor'] = (index, divisor) => ext['vertexAttribDivisorANGLE'](index, divisor);
        ctx['drawArraysInstanced'] = (mode, first, count, primcount) => ext['drawArraysInstancedANGLE'](mode, first, count, primcount);
        ctx['drawElementsInstanced'] = (mode, count, type, indices, primcount) => ext['drawElementsInstancedANGLE'](mode, count, type, indices, primcount);
        return 1;
      }
    };
  Module['webgl_enable_ANGLE_instanced_arrays'] = webgl_enable_ANGLE_instanced_arrays;
  
  var webgl_enable_OES_vertex_array_object = (ctx) => {
      // Extension available in WebGL 1 from Firefox 25 and WebKit 536.28/desktop Safari 6.0.3 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('OES_vertex_array_object');
      if (ext) {
        ctx['createVertexArray'] = () => ext['createVertexArrayOES']();
        ctx['deleteVertexArray'] = (vao) => ext['deleteVertexArrayOES'](vao);
        ctx['bindVertexArray'] = (vao) => ext['bindVertexArrayOES'](vao);
        ctx['isVertexArray'] = (vao) => ext['isVertexArrayOES'](vao);
        return 1;
      }
    };
  Module['webgl_enable_OES_vertex_array_object'] = webgl_enable_OES_vertex_array_object;
  
  var webgl_enable_WEBGL_draw_buffers = (ctx) => {
      // Extension available in WebGL 1 from Firefox 28 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('WEBGL_draw_buffers');
      if (ext) {
        ctx['drawBuffers'] = (n, bufs) => ext['drawBuffersWEBGL'](n, bufs);
        return 1;
      }
    };
  Module['webgl_enable_WEBGL_draw_buffers'] = webgl_enable_WEBGL_draw_buffers;
  
  var webgl_enable_EXT_polygon_offset_clamp = (ctx) => {
      return !!(ctx.extPolygonOffsetClamp = ctx.getExtension('EXT_polygon_offset_clamp'));
    };
  Module['webgl_enable_EXT_polygon_offset_clamp'] = webgl_enable_EXT_polygon_offset_clamp;
  
  var webgl_enable_EXT_clip_control = (ctx) => {
      return !!(ctx.extClipControl = ctx.getExtension('EXT_clip_control'));
    };
  Module['webgl_enable_EXT_clip_control'] = webgl_enable_EXT_clip_control;
  
  var webgl_enable_WEBGL_polygon_mode = (ctx) => {
      return !!(ctx.webglPolygonMode = ctx.getExtension('WEBGL_polygon_mode'));
    };
  Module['webgl_enable_WEBGL_polygon_mode'] = webgl_enable_WEBGL_polygon_mode;
  
  var webgl_enable_WEBGL_multi_draw = (ctx) => {
      // Closure is expected to be allowed to minify the '.multiDrawWebgl' property, so not accessing it quoted.
      return !!(ctx.multiDrawWebgl = ctx.getExtension('WEBGL_multi_draw'));
    };
  Module['webgl_enable_WEBGL_multi_draw'] = webgl_enable_WEBGL_multi_draw;
  
  var getEmscriptenSupportedExtensions = (ctx) => {
      // Restrict the list of advertised extensions to those that we actually
      // support.
      var supportedExtensions = [
        // WebGL 1 extensions
        'ANGLE_instanced_arrays',
        'EXT_blend_minmax',
        'EXT_disjoint_timer_query',
        'EXT_frag_depth',
        'EXT_shader_texture_lod',
        'EXT_sRGB',
        'OES_element_index_uint',
        'OES_fbo_render_mipmap',
        'OES_standard_derivatives',
        'OES_texture_float',
        'OES_texture_half_float',
        'OES_texture_half_float_linear',
        'OES_vertex_array_object',
        'WEBGL_color_buffer_float',
        'WEBGL_depth_texture',
        'WEBGL_draw_buffers',
        // WebGL 1 and WebGL 2 extensions
        'EXT_clip_control',
        'EXT_color_buffer_half_float',
        'EXT_depth_clamp',
        'EXT_float_blend',
        'EXT_polygon_offset_clamp',
        'EXT_texture_compression_bptc',
        'EXT_texture_compression_rgtc',
        'EXT_texture_filter_anisotropic',
        'KHR_parallel_shader_compile',
        'OES_texture_float_linear',
        'WEBGL_blend_func_extended',
        'WEBGL_compressed_texture_astc',
        'WEBGL_compressed_texture_etc',
        'WEBGL_compressed_texture_etc1',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_compressed_texture_s3tc_srgb',
        'WEBGL_debug_renderer_info',
        'WEBGL_debug_shaders',
        'WEBGL_lose_context',
        'WEBGL_multi_draw',
        'WEBGL_polygon_mode'
      ];
      // .getSupportedExtensions() can return null if context is lost, so coerce to empty array.
      return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext));
    };
  Module['getEmscriptenSupportedExtensions'] = getEmscriptenSupportedExtensions;
  
  
  var GL = {
  counter:1,
  buffers:[],
  programs:[],
  framebuffers:[],
  renderbuffers:[],
  textures:[],
  shaders:[],
  vaos:[],
  contexts:[],
  offscreenCanvases:{
  },
  queries:[],
  stringCache:{
  },
  unpackAlignment:4,
  unpackRowLength:0,
  recordError:(errorCode) => {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },
  getNewId:(table) => {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },
  genObject:(n, buffers, createFunction, objectTable
        ) => {
        for (var i = 0; i < n; i++) {
          var buffer = GLctx[createFunction]();
          var id = buffer && GL.getNewId(objectTable);
          if (buffer) {
            buffer.name = id;
            objectTable[id] = buffer;
          } else {
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
          }
          HEAP32[(((buffers)+(i*4))>>2)] = id;
        }
      },
  getSource:(shader, count, string, length) => {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAPU32[(((length)+(i*4))>>2)] : undefined;
          source += UTF8ToString(HEAPU32[(((string)+(i*4))>>2)], len);
        }
        return source;
      },
  createContext:(/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
  
        // BUG: Workaround Safari WebGL issue: After successfully acquiring WebGL
        // context on a canvas, calling .getContext() will always return that
        // context independent of which 'webgl' or 'webgl2'
        // context version was passed. See:
        //   https://bugs.webkit.org/show_bug.cgi?id=222758
        // and:
        //   https://github.com/emscripten-core/emscripten/issues/13295.
        // TODO: Once the bug is fixed and shipped in Safari, adjust the Safari
        // version field in above check.
        if (!canvas.getContextSafariWebGL2Fixed) {
          canvas.getContextSafariWebGL2Fixed = canvas.getContext;
          /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (Object|null)} */
          function fixedGetContext(ver, attrs) {
            var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
            return ((ver == 'webgl') == (gl instanceof WebGLRenderingContext)) ? gl : null;
          }
          canvas.getContext = fixedGetContext;
        }
  
        var ctx =
          (canvas.getContext("webgl", webGLContextAttributes)
            // https://caniuse.com/#feat=webgl
            );
  
        if (!ctx) return 0;
  
        var handle = GL.registerContext(ctx, webGLContextAttributes);
  
        return handle;
      },
  registerContext:(ctx, webGLContextAttributes) => {
        // without pthreads a context is just an integer ID
        var handle = GL.getNewId(GL.contexts);
  
        var context = {
          handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx
        };
  
        // Store the created context object so that we can access the context
        // given a canvas without having to pass the parameters again.
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault == 'undefined' || webGLContextAttributes.enableExtensionsByDefault) {
          GL.initExtensions(context);
        }
  
        return handle;
      },
  makeContextCurrent:(contextHandle) => {
  
        // Active Emscripten GL layer context object.
        GL.currentContext = GL.contexts[contextHandle];
        // Active WebGL context object.
        Module.ctx = GLctx = GL.currentContext?.GLctx;
        return !(contextHandle && !GLctx);
      },
  getContext:(contextHandle) => {
        return GL.contexts[contextHandle];
      },
  deleteContext:(contextHandle) => {
        if (GL.currentContext === GL.contexts[contextHandle]) {
          GL.currentContext = null;
        }
        if (typeof JSEvents == 'object') {
          // Release all JS event handlers on the DOM element that the GL context is
          // associated with since the context is now deleted.
          JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
        }
        // Make sure the canvas object no longer refers to the context object so
        // there are no GC surprises.
        if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) {
          GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
        }
        GL.contexts[contextHandle] = null;
      },
  initExtensions:(context) => {
        // If this function is called without a specific context object, init the
        // extensions of the currently active context.
        context ||= GL.currentContext;
  
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
  
        var GLctx = context.GLctx;
  
        // Detect the presence of a few extensions manually, ction GL interop
        // layer itself will need to know if they exist.
  
        // Extensions that are available in both WebGL 1 and WebGL 2
        webgl_enable_WEBGL_multi_draw(GLctx);
        webgl_enable_EXT_polygon_offset_clamp(GLctx);
        webgl_enable_EXT_clip_control(GLctx);
        webgl_enable_WEBGL_polygon_mode(GLctx);
        // Extensions that are only available in WebGL 1 (the calls will be no-ops
        // if called on a WebGL 2 context active)
        webgl_enable_ANGLE_instanced_arrays(GLctx);
        webgl_enable_OES_vertex_array_object(GLctx);
        webgl_enable_WEBGL_draw_buffers(GLctx);
        {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
        }
  
        getEmscriptenSupportedExtensions(GLctx).forEach((ext) => {
          // WEBGL_lose_context, WEBGL_debug_renderer_info and WEBGL_debug_shaders
          // are not enabled by default.
          if (!ext.includes('lose_context') && !ext.includes('debug')) {
            // Call .getExtension() to enable that extension permanently.
            GLctx.getExtension(ext);
          }
        });
      },
  };
  Module['GL'] = GL;
  
  var _eglCreateContext = (display, config, hmm, contextAttribs) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
  
      // EGL 1.4 spec says default EGL_CONTEXT_CLIENT_VERSION is GLES1, but this is not supported by Emscripten.
      // So user must pass EGL_CONTEXT_CLIENT_VERSION == 2 to initialize EGL.
      var glesContextVersion = 1;
      for (;;) {
        var param = HEAP32[((contextAttribs)>>2)];
        if (param == 0x3098 /*EGL_CONTEXT_CLIENT_VERSION*/) {
          glesContextVersion = HEAP32[(((contextAttribs)+(4))>>2)];
        } else if (param == 0x3038 /*EGL_NONE*/) {
          break;
        } else {
          /* EGL1.4 specifies only EGL_CONTEXT_CLIENT_VERSION as supported attribute */
          EGL.setErrorCode(0x3004 /*EGL_BAD_ATTRIBUTE*/);
          return 0;
        }
        contextAttribs += 8;
      }
      if (glesContextVersion != 2) {
        EGL.setErrorCode(0x3005 /* EGL_BAD_CONFIG */);
        return 0; /* EGL_NO_CONTEXT */
      }
  
      EGL.contextAttributes.majorVersion = glesContextVersion - 1; // WebGL 1 is GLES 2, WebGL2 is GLES3
      EGL.contextAttributes.minorVersion = 0;
  
      EGL.context = GL.createContext(Module['canvas'], EGL.contextAttributes);
  
      if (EGL.context != 0) {
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
  
        // Run callbacks so that GL emulation works
        GL.makeContextCurrent(EGL.context);
        Browser.useWebGL = true;
        Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
  
        // Note: This function only creates a context, but it shall not make it active.
        GL.makeContextCurrent(null);
        return 62004;
      } else {
        EGL.setErrorCode(0x3009 /* EGL_BAD_MATCH */); // By the EGL 1.4 spec, an implementation that does not support GLES2 (WebGL in this case), this error code is set.
        return 0; /* EGL_NO_CONTEXT */
      }
    };
  Module['_eglCreateContext'] = _eglCreateContext;

  var _eglCreateWindowSurface = (display, config, win, attrib_list) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (config != 62002) {
        EGL.setErrorCode(0x3005 /* EGL_BAD_CONFIG */);
        return 0;
      }
      // TODO: Examine attrib_list! Parameters that can be present there are:
      // - EGL_RENDER_BUFFER (must be EGL_BACK_BUFFER)
      // - EGL_VG_COLORSPACE (can't be set)
      // - EGL_VG_ALPHA_FORMAT (can't be set)
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 62006; /* Magic ID for Emscripten 'default surface' */
    };
  Module['_eglCreateWindowSurface'] = _eglCreateWindowSurface;

  
  var _eglDestroyContext = (display, context) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (context != 62004) {
        EGL.setErrorCode(0x3006 /* EGL_BAD_CONTEXT */);
        return 0;
      }
  
      GL.deleteContext(EGL.context);
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      if (EGL.currentContext == context) {
        EGL.currentContext = 0;
      }
      return 1 /* EGL_TRUE */;
    };
  Module['_eglDestroyContext'] = _eglDestroyContext;

  var _eglDestroySurface = (display, surface) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (surface != 62006 /* Magic ID for the only EGLSurface supported by Emscripten */) {
        EGL.setErrorCode(0x300D /* EGL_BAD_SURFACE */);
        return 1;
      }
      if (EGL.currentReadSurface == surface) {
        EGL.currentReadSurface = 0;
      }
      if (EGL.currentDrawSurface == surface) {
        EGL.currentDrawSurface = 0;
      }
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1; /* Magic ID for Emscripten 'default surface' */
    };
  Module['_eglDestroySurface'] = _eglDestroySurface;

  var _eglGetConfigAttrib = (display, config, attribute, value) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (config != 62002) {
        EGL.setErrorCode(0x3005 /* EGL_BAD_CONFIG */);
        return 0;
      }
      if (!value) {
        EGL.setErrorCode(0x300C /* EGL_BAD_PARAMETER */);
        return 0;
      }
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      switch (attribute) {
      case 0x3020: // EGL_BUFFER_SIZE
        HEAP32[((value)>>2)] = EGL.contextAttributes.alpha ? 32 : 24;
        return 1;
      case 0x3021: // EGL_ALPHA_SIZE
        HEAP32[((value)>>2)] = EGL.contextAttributes.alpha ? 8 : 0;
        return 1;
      case 0x3022: // EGL_BLUE_SIZE
        HEAP32[((value)>>2)] = 8;
        return 1;
      case 0x3023: // EGL_GREEN_SIZE
        HEAP32[((value)>>2)] = 8;
        return 1;
      case 0x3024: // EGL_RED_SIZE
        HEAP32[((value)>>2)] = 8;
        return 1;
      case 0x3025: // EGL_DEPTH_SIZE
        HEAP32[((value)>>2)] = EGL.contextAttributes.depth ? 24 : 0;
        return 1;
      case 0x3026: // EGL_STENCIL_SIZE
        HEAP32[((value)>>2)] = EGL.contextAttributes.stencil ? 8 : 0;
        return 1;
      case 0x3027: // EGL_CONFIG_CAVEAT
        // We can return here one of EGL_NONE (0x3038), EGL_SLOW_CONFIG (0x3050) or EGL_NON_CONFORMANT_CONFIG (0x3051).
        HEAP32[((value)>>2)] = 0x3038;
        return 1;
      case 0x3028: // EGL_CONFIG_ID
        HEAP32[((value)>>2)] = 62002;
        return 1;
      case 0x3029: // EGL_LEVEL
        HEAP32[((value)>>2)] = 0;
        return 1;
      case 0x302A: // EGL_MAX_PBUFFER_HEIGHT
        HEAP32[((value)>>2)] = 4096;
        return 1;
      case 0x302B: // EGL_MAX_PBUFFER_PIXELS
        HEAP32[((value)>>2)] = 16777216;
        return 1;
      case 0x302C: // EGL_MAX_PBUFFER_WIDTH
        HEAP32[((value)>>2)] = 4096;
        return 1;
      case 0x302D: // EGL_NATIVE_RENDERABLE
        HEAP32[((value)>>2)] = 0;
        return 1;
      case 0x302E: // EGL_NATIVE_VISUAL_ID
        HEAP32[((value)>>2)] = 0;
        return 1;
      case 0x302F: // EGL_NATIVE_VISUAL_TYPE
        HEAP32[((value)>>2)] = 0x3038;
        return 1;
      case 0x3031: // EGL_SAMPLES
        HEAP32[((value)>>2)] = EGL.contextAttributes.antialias ? 4 : 0;
        return 1;
      case 0x3032: // EGL_SAMPLE_BUFFERS
        HEAP32[((value)>>2)] = EGL.contextAttributes.antialias ? 1 : 0;
        return 1;
      case 0x3033: // EGL_SURFACE_TYPE
        HEAP32[((value)>>2)] = 0x4;
        return 1;
      case 0x3034: // EGL_TRANSPARENT_TYPE
        // If this returns EGL_TRANSPARENT_RGB (0x3052), transparency is used through color-keying. No such thing applies to Emscripten canvas.
        HEAP32[((value)>>2)] = 0x3038;
        return 1;
      case 0x3035: // EGL_TRANSPARENT_BLUE_VALUE
      case 0x3036: // EGL_TRANSPARENT_GREEN_VALUE
      case 0x3037: // EGL_TRANSPARENT_RED_VALUE
        // "If EGL_TRANSPARENT_TYPE is EGL_NONE, then the values for EGL_TRANSPARENT_RED_VALUE, EGL_TRANSPARENT_GREEN_VALUE, and EGL_TRANSPARENT_BLUE_VALUE are undefined."
        HEAP32[((value)>>2)] = -1;
        return 1;
      case 0x3039: // EGL_BIND_TO_TEXTURE_RGB
      case 0x303A: // EGL_BIND_TO_TEXTURE_RGBA
        HEAP32[((value)>>2)] = 0;
        return 1;
      case 0x303B: // EGL_MIN_SWAP_INTERVAL
        HEAP32[((value)>>2)] = 0;
        return 1;
      case 0x303C: // EGL_MAX_SWAP_INTERVAL
        HEAP32[((value)>>2)] = 1;
        return 1;
      case 0x303D: // EGL_LUMINANCE_SIZE
      case 0x303E: // EGL_ALPHA_MASK_SIZE
        HEAP32[((value)>>2)] = 0;
        return 1;
      case 0x303F: // EGL_COLOR_BUFFER_TYPE
        // EGL has two types of buffers: EGL_RGB_BUFFER and EGL_LUMINANCE_BUFFER.
        HEAP32[((value)>>2)] = 0x308E;
        return 1;
      case 0x3040: // EGL_RENDERABLE_TYPE
        // A bit combination of EGL_OPENGL_ES_BIT,EGL_OPENVG_BIT,EGL_OPENGL_ES2_BIT and EGL_OPENGL_BIT.
        HEAP32[((value)>>2)] = 0x4;
        return 1;
      case 0x3042: // EGL_CONFORMANT
        // "EGL_CONFORMANT is a mask indicating if a client API context created with respect to the corresponding EGLConfig will pass the required conformance tests for that API."
        HEAP32[((value)>>2)] = 0;
        return 1;
      default:
        EGL.setErrorCode(0x3004 /* EGL_BAD_ATTRIBUTE */);
        return 0;
      }
    };
  Module['_eglGetConfigAttrib'] = _eglGetConfigAttrib;

  var _eglGetDisplay = (nativeDisplayType) => {
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      // Emscripten EGL implementation "emulates" X11, and eglGetDisplay is
      // expected to accept/receive a pointer to an X11 Display object (or
      // EGL_DEFAULT_DISPLAY).
      if (nativeDisplayType != 0 /* EGL_DEFAULT_DISPLAY */ && nativeDisplayType != 1 /* see library_xlib.js */) {
        return 0; // EGL_NO_DISPLAY
      }
      return 62000;
    };
  Module['_eglGetDisplay'] = _eglGetDisplay;

  var _eglGetError = () => EGL.errorCode;
  Module['_eglGetError'] = _eglGetError;

  var _eglInitialize = (display, majorVersion, minorVersion) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (majorVersion) {
        HEAP32[((majorVersion)>>2)] = 1; // Advertise EGL Major version: '1'
      }
      if (minorVersion) {
        HEAP32[((minorVersion)>>2)] = 4; // Advertise EGL Minor version: '4'
      }
      EGL.defaultDisplayInitialized = true;
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    };
  Module['_eglInitialize'] = _eglInitialize;

  
  var _eglMakeCurrent = (display, draw, read, context) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0 /* EGL_FALSE */;
      }
      //\todo An EGL_NOT_INITIALIZED error is generated if EGL is not initialized for dpy.
      if (context != 0 && context != 62004) {
        EGL.setErrorCode(0x3006 /* EGL_BAD_CONTEXT */);
        return 0;
      }
      if ((read != 0 && read != 62006) || (draw != 0 && draw != 62006 /* Magic ID for Emscripten 'default surface' */)) {
        EGL.setErrorCode(0x300D /* EGL_BAD_SURFACE */);
        return 0;
      }
  
      GL.makeContextCurrent(context ? EGL.context : null);
  
      EGL.currentContext = context;
      EGL.currentDrawSurface = draw;
      EGL.currentReadSurface = read;
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1 /* EGL_TRUE */;
    };
  Module['_eglMakeCurrent'] = _eglMakeCurrent;

  
  
  var stringToNewUTF8 = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8(str, ret, size);
      return ret;
    };
  Module['stringToNewUTF8'] = stringToNewUTF8;
  
  var _eglQueryString = (display, name) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      //\todo An EGL_NOT_INITIALIZED error is generated if EGL is not initialized for dpy.
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      if (EGL.stringCache[name]) return EGL.stringCache[name];
      var ret;
      switch (name) {
        case 0x3053 /* EGL_VENDOR */: ret = stringToNewUTF8("Emscripten"); break;
        case 0x3054 /* EGL_VERSION */: ret = stringToNewUTF8("1.4 Emscripten EGL"); break;
        case 0x3055 /* EGL_EXTENSIONS */:  ret = stringToNewUTF8(""); break; // Currently not supporting any EGL extensions.
        case 0x308D /* EGL_CLIENT_APIS */: ret = stringToNewUTF8("OpenGL_ES"); break;
        default:
          EGL.setErrorCode(0x300C /* EGL_BAD_PARAMETER */);
          return 0;
      }
      EGL.stringCache[name] = ret;
      return ret;
    };
  Module['_eglQueryString'] = _eglQueryString;

  var _eglSwapBuffers = (dpy, surface) => {
  
      if (!EGL.defaultDisplayInitialized) {
        EGL.setErrorCode(0x3001 /* EGL_NOT_INITIALIZED */);
      } else if (!Module.ctx) {
        EGL.setErrorCode(0x3002 /* EGL_BAD_ACCESS */);
      } else if (Module.ctx.isContextLost()) {
        EGL.setErrorCode(0x300E /* EGL_CONTEXT_LOST */);
      } else {
        // According to documentation this does an implicit flush.
        // Due to discussion at https://github.com/emscripten-core/emscripten/pull/1871
        // the flush was removed since this _may_ result in slowing code down.
        //_glFlush();
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
        return 1 /* EGL_TRUE */;
      }
      return 0 /* EGL_FALSE */;
    };
  Module['_eglSwapBuffers'] = _eglSwapBuffers;

  
  
  
  
    /**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */
  var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
      assert(!MainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
      MainLoop.func = iterFunc;
      MainLoop.arg = arg;
  
      var thisMainLoopId = MainLoop.currentlyRunningMainloop;
      function checkIsRunning() {
        if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
          
          maybeExit();
          return false;
        }
        return true;
      }
  
      // We create the loop runner here but it is not actually running until
      // _emscripten_set_main_loop_timing is called (which might happen a
      // later time).  This member signifies that the current runner has not
      // yet been started so that we can call runtimeKeepalivePush when it
      // gets it timing set for the first time.
      MainLoop.running = false;
      MainLoop.runner = function MainLoop_runner() {
        if (ABORT) return;
        if (MainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = MainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (MainLoop.remainingBlockers) {
            var remaining = MainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              MainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              MainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          MainLoop.updateStatus();
  
          // catches pause/resume main loop from blocker execution
          if (!checkIsRunning()) return;
  
          setTimeout(MainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (!checkIsRunning()) return;
  
        // Implement very basic swap interval control
        MainLoop.currentFrameNumber = MainLoop.currentFrameNumber + 1 | 0;
        if (MainLoop.timingMode == 1 && MainLoop.timingValue > 1 && MainLoop.currentFrameNumber % MainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          MainLoop.scheduler();
          return;
        } else if (MainLoop.timingMode == 0) {
          MainLoop.tickStartTime = _emscripten_get_now();
        }
  
        if (MainLoop.method === 'timeout' && Module.ctx) {
          warnOnce('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          MainLoop.method = ''; // just warn once per call to set main loop
        }
  
        MainLoop.runIter(iterFunc);
  
        // catch pauses from the main loop itself
        if (!checkIsRunning()) return;
  
        MainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps && fps > 0) {
          _emscripten_set_main_loop_timing(0, 1000.0 / fps);
        } else {
          // Do rAF by rendering each frame (no decimating)
          _emscripten_set_main_loop_timing(1, 1);
        }
  
        MainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'unwind';
      }
    };
  Module['setMainLoop'] = setMainLoop;
  
  
  var MainLoop = {
  running:false,
  scheduler:null,
  method:"",
  currentlyRunningMainloop:0,
  func:null,
  arg:0,
  timingMode:0,
  timingValue:0,
  currentFrameNumber:0,
  queue:[],
  preMainLoop:[],
  postMainLoop:[],
  pause() {
        MainLoop.scheduler = null;
        // Incrementing this signals the previous main loop that it's now become old, and it must return.
        MainLoop.currentlyRunningMainloop++;
      },
  resume() {
        MainLoop.currentlyRunningMainloop++;
        var timingMode = MainLoop.timingMode;
        var timingValue = MainLoop.timingValue;
        var func = MainLoop.func;
        MainLoop.func = null;
        // do not set timing and call scheduler, we will do it on the next lines
        setMainLoop(func, 0, false, MainLoop.arg, true);
        _emscripten_set_main_loop_timing(timingMode, timingValue);
        MainLoop.scheduler();
      },
  updateStatus() {
        if (Module['setStatus']) {
          var message = Module['statusMessage'] || 'Please wait...';
          var remaining = MainLoop.remainingBlockers ?? 0;
          var expected = MainLoop.expectedBlockers ?? 0;
          if (remaining) {
            if (remaining < expected) {
              Module['setStatus'](`{message} ({expected - remaining}/{expected})`);
            } else {
              Module['setStatus'](message);
            }
          } else {
            Module['setStatus']('');
          }
        }
      },
  init() {
        Module['preMainLoop'] && MainLoop.preMainLoop.push(Module['preMainLoop']);
        Module['postMainLoop'] && MainLoop.postMainLoop.push(Module['postMainLoop']);
      },
  runIter(func) {
        if (ABORT) return;
        for (var pre of MainLoop.preMainLoop) {
          if (pre() === false) {
            return; // |return false| skips a frame
          }
        }
        callUserCallback(func);
        for (var post of MainLoop.postMainLoop) {
          post();
        }
        checkStackCookie();
      },
  nextRAF:0,
  fakeRequestAnimationFrame(func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (MainLoop.nextRAF === 0) {
          MainLoop.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= MainLoop.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            MainLoop.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(MainLoop.nextRAF - now, 0);
        setTimeout(func, delay);
      },
  requestAnimationFrame(func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func);
          return;
        }
        var RAF = MainLoop.fakeRequestAnimationFrame;
        RAF(func);
      },
  };
  Module['MainLoop'] = MainLoop;
  var _emscripten_set_main_loop_timing = (mode, value) => {
      MainLoop.timingMode = mode;
      MainLoop.timingValue = value;
  
      if (!MainLoop.func) {
        err('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (!MainLoop.running) {
        
        MainLoop.running = true;
      }
      if (mode == 0) {
        MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now())|0;
          setTimeout(MainLoop.runner, timeUntilNextTick); // doing this each time means that on exception, we stop
        };
        MainLoop.method = 'timeout';
      } else if (mode == 1) {
        MainLoop.scheduler = function MainLoop_scheduler_rAF() {
          MainLoop.requestAnimationFrame(MainLoop.runner);
        };
        MainLoop.method = 'rAF';
      } else if (mode == 2) {
        if (typeof MainLoop.setImmediate == 'undefined') {
          if (typeof setImmediate == 'undefined') {
            // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
            var setImmediates = [];
            var emscriptenMainLoopMessageId = 'setimmediate';
            /** @param {Event} event */
            var MainLoop_setImmediate_messageHandler = (event) => {
              // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
              // so check for both cases.
              if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                event.stopPropagation();
                setImmediates.shift()();
              }
            };
            addEventListener("message", MainLoop_setImmediate_messageHandler, true);
            MainLoop.setImmediate = /** @type{function(function(): ?, ...?): number} */((func) => {
              setImmediates.push(func);
              if (ENVIRONMENT_IS_WORKER) {
                Module['setImmediates'] ??= [];
                Module['setImmediates'].push(func);
                postMessage({target: emscriptenMainLoopMessageId}); // In --proxy-to-worker, route the message via proxyClient.js
              } else postMessage(emscriptenMainLoopMessageId, "*"); // On the main thread, can just send the message to itself.
            });
          } else {
            MainLoop.setImmediate = setImmediate;
          }
        }
        MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
          MainLoop.setImmediate(MainLoop.runner);
        };
        MainLoop.method = 'immediate';
      }
      return 0;
    };
  Module['_emscripten_set_main_loop_timing'] = _emscripten_set_main_loop_timing;
  
  var _eglSwapInterval = (display, interval) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (interval == 0) _emscripten_set_main_loop_timing(0, 0);
      else _emscripten_set_main_loop_timing(1, interval);
  
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    };
  Module['_eglSwapInterval'] = _eglSwapInterval;

  var _eglTerminate = (display) => {
      if (display != 62000) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      EGL.currentContext = 0;
      EGL.currentReadSurface = 0;
      EGL.currentDrawSurface = 0;
      EGL.defaultDisplayInitialized = false;
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    };
  Module['_eglTerminate'] = _eglTerminate;

  
  /** @suppress {duplicate } */
  var _eglWaitClient = () => {
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    };
  Module['_eglWaitClient'] = _eglWaitClient;
  var _eglWaitGL = _eglWaitClient;
  Module['_eglWaitGL'] = _eglWaitGL;

  var _eglWaitNative = (nativeEngineId) => {
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    };
  Module['_eglWaitNative'] = _eglWaitNative;

  var readEmAsmArgsArray = [];
  Module['readEmAsmArgsArray'] = readEmAsmArgsArray;
  var readEmAsmArgs = (sigPtr, buf) => {
      // Nobody should have mutated _readEmAsmArgsArray underneath us to be something else than an array.
      assert(Array.isArray(readEmAsmArgsArray));
      // The input buffer is allocated on the stack, so it must be stack-aligned.
      assert(buf % 16 == 0);
      readEmAsmArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      while (ch = HEAPU8[sigPtr++]) {
        var chr = String.fromCharCode(ch);
        var validChars = ['d', 'f', 'i', 'p'];
        assert(validChars.includes(chr), `Invalid character ${ch}("${chr}") in readEmAsmArgs! Use only [${validChars}], and do not specify "v" for void return argument.`);
        // Floats are always passed as doubles, so all types except for 'i'
        // are 8 bytes and require alignment.
        var wide = (ch != 105);
        wide &= (ch != 112);
        buf += wide && (buf % 8) ? 4 : 0;
        readEmAsmArgsArray.push(
          // Special case for pointers under wasm64 or CAN_ADDRESS_2GB mode.
          ch == 112 ? HEAPU32[((buf)>>2)] :
          ch == 105 ?
            HEAP32[((buf)>>2)] :
            HEAPF64[((buf)>>3)]
        );
        buf += wide ? 8 : 4;
      }
      return readEmAsmArgsArray;
    };
  Module['readEmAsmArgs'] = readEmAsmArgs;
  var runEmAsmFunction = (code, sigPtr, argbuf) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      assert(ASM_CONSTS.hasOwnProperty(code), `No EM_ASM constant found at address ${code}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
      return ASM_CONSTS[code](...args);
    };
  Module['runEmAsmFunction'] = runEmAsmFunction;
  var _emscripten_asm_const_int = (code, sigPtr, argbuf) => {
      return runEmAsmFunction(code, sigPtr, argbuf);
    };
  Module['_emscripten_asm_const_int'] = _emscripten_asm_const_int;

  var runMainThreadEmAsm = (emAsmAddr, sigPtr, argbuf, sync) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      assert(ASM_CONSTS.hasOwnProperty(emAsmAddr), `No EM_ASM constant found at address ${emAsmAddr}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
      return ASM_CONSTS[emAsmAddr](...args);
    };
  Module['runMainThreadEmAsm'] = runMainThreadEmAsm;
  var _emscripten_asm_const_int_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
  Module['_emscripten_asm_const_int_sync_on_main_thread'] = _emscripten_asm_const_int_sync_on_main_thread;

  var _emscripten_asm_const_ptr_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
  Module['_emscripten_asm_const_ptr_sync_on_main_thread'] = _emscripten_asm_const_ptr_sync_on_main_thread;

  var _emscripten_cancel_main_loop = () => {
      MainLoop.pause();
      MainLoop.func = null;
    };
  Module['_emscripten_cancel_main_loop'] = _emscripten_cancel_main_loop;

  var _emscripten_clear_timeout = clearTimeout;
  Module['_emscripten_clear_timeout'] = _emscripten_clear_timeout;

  var _emscripten_date_now = () => Date.now();
  Module['_emscripten_date_now'] = _emscripten_date_now;

  var _emscripten_err = (str) => err(UTF8ToString(str));
  Module['_emscripten_err'] = _emscripten_err;

  var JSEvents = {
  removeAllEventListeners() {
        while (JSEvents.eventHandlers.length) {
          JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
        }
        JSEvents.deferredCalls = [];
      },
  inEventHandler:0,
  deferredCalls:[],
  deferCall(targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false;
  
          for (var i in arrA) {
            if (arrA[i] != arrB[i]) return false;
          }
          return true;
        }
        // Test if the given call was already queued, and if so, don't add it again.
        for (var call of JSEvents.deferredCalls) {
          if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
            return;
          }
        }
        JSEvents.deferredCalls.push({
          targetFunction,
          precedence,
          argsList
        });
  
        JSEvents.deferredCalls.sort((x,y) => x.precedence < y.precedence);
      },
  removeDeferredCalls(targetFunction) {
        JSEvents.deferredCalls = JSEvents.deferredCalls.filter((call) => call.targetFunction != targetFunction);
      },
  canPerformEventHandlerRequests() {
        if (navigator.userActivation) {
          // Verify against transient activation status from UserActivation API
          // whether it is possible to perform a request here without needing to defer. See
          // https://developer.mozilla.org/en-US/docs/Web/Security/User_activation#transient_activation
          // and https://caniuse.com/mdn-api_useractivation
          // At the time of writing, Firefox does not support this API: https://bugzilla.mozilla.org/show_bug.cgi?id=1791079
          return navigator.userActivation.isActive;
        }
  
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
      },
  runDeferredCalls() {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return;
        }
        var deferredCalls = JSEvents.deferredCalls;
        JSEvents.deferredCalls = [];
        for (var call of deferredCalls) {
          call.targetFunction(...call.argsList);
        }
      },
  eventHandlers:[],
  removeAllHandlersOnTarget:(target, eventTypeString) => {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (JSEvents.eventHandlers[i].target == target &&
            (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
             JSEvents._removeHandler(i--);
           }
        }
      },
  _removeHandler(i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
        JSEvents.eventHandlers.splice(i, 1);
      },
  registerOrRemoveHandler(eventHandler) {
        if (!eventHandler.target) {
          err('registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:');
          console.dir(eventHandler);
          return -4;
        }
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = function(event) {
            // Increment nesting count for the event handler.
            ++JSEvents.inEventHandler;
            JSEvents.currentEventHandler = eventHandler;
            // Process any old deferred calls the user has placed.
            JSEvents.runDeferredCalls();
            // Process the actual event, calls back to user C code handler.
            eventHandler.handlerFunc(event);
            // Process any new deferred calls that were placed right now from this event handler.
            JSEvents.runDeferredCalls();
            // Out of event handler - restore nesting count.
            --JSEvents.inEventHandler;
          };
  
          eventHandler.target.addEventListener(eventHandler.eventTypeString,
                                               eventHandler.eventListenerFunc,
                                               eventHandler.useCapture);
          JSEvents.eventHandlers.push(eventHandler);
        } else {
          for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (JSEvents.eventHandlers[i].target == eventHandler.target
             && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
               JSEvents._removeHandler(i--);
             }
          }
        }
        return 0;
      },
  getNodeNameForTarget(target) {
        if (!target) return '';
        if (target == window) return '#window';
        if (target == screen) return '#screen';
        return target?.nodeName || '';
      },
  fullscreenEnabled() {
        return document.fullscreenEnabled
        // Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitFullscreenEnabled.
        // TODO: If Safari at some point ships with unprefixed version, update the version check above.
        || document.webkitFullscreenEnabled
         ;
      },
  };
  Module['JSEvents'] = JSEvents;
  
  var currentFullscreenStrategy = {
  };
  Module['currentFullscreenStrategy'] = currentFullscreenStrategy;
  
  
  
  
  var maybeCStringToJsString = (cString) => {
      // "cString > 2" checks if the input is a number, and isn't of the special
      // values we accept here, EMSCRIPTEN_EVENT_TARGET_* (which map to 0, 1, 2).
      // In other words, if cString > 2 then it's a pointer to a valid place in
      // memory, and points to a C string.
      return cString > 2 ? UTF8ToString(cString) : cString;
    };
  Module['maybeCStringToJsString'] = maybeCStringToJsString;
  
  /** @type {Object} */
  var specialHTMLTargets = [0, typeof document != 'undefined' ? document : 0, typeof window != 'undefined' ? window : 0];
  Module['specialHTMLTargets'] = specialHTMLTargets;
  /** @suppress {duplicate } */
  var findEventTarget = (target) => {
      target = maybeCStringToJsString(target);
      var domElement = specialHTMLTargets[target] || (typeof document != 'undefined' ? document.querySelector(target) : undefined);
      return domElement;
    };
  Module['findEventTarget'] = findEventTarget;
  var findCanvasEventTarget = findEventTarget;
  Module['findCanvasEventTarget'] = findCanvasEventTarget;
  var _emscripten_get_canvas_element_size = (target, width, height) => {
      var canvas = findCanvasEventTarget(target);
      if (!canvas) return -4;
      HEAP32[((width)>>2)] = canvas.width;
      HEAP32[((height)>>2)] = canvas.height;
    };
  Module['_emscripten_get_canvas_element_size'] = _emscripten_get_canvas_element_size;
  
  
  
  
  
  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
  Module['stackAlloc'] = stackAlloc;
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };
  Module['stringToUTF8OnStack'] = stringToUTF8OnStack;
  var getCanvasElementSize = (target) => {
      var sp = stackSave();
      var w = stackAlloc(8);
      var h = w + 4;
  
      var targetInt = stringToUTF8OnStack(target.id);
      var ret = _emscripten_get_canvas_element_size(targetInt, w, h);
      var size = [HEAP32[((w)>>2)], HEAP32[((h)>>2)]];
      stackRestore(sp);
      return size;
    };
  Module['getCanvasElementSize'] = getCanvasElementSize;
  
  
  var _emscripten_set_canvas_element_size = (target, width, height) => {
      var canvas = findCanvasEventTarget(target);
      if (!canvas) return -4;
      canvas.width = width;
      canvas.height = height;
      return 0;
    };
  Module['_emscripten_set_canvas_element_size'] = _emscripten_set_canvas_element_size;
  
  
  
  var setCanvasElementSize = (target, width, height) => {
      if (!target.controlTransferredOffscreen) {
        target.width = width;
        target.height = height;
      } else {
        // This function is being called from high-level JavaScript code instead of asm.js/Wasm,
        // and it needs to synchronously proxy over to another thread, so marshal the string onto the heap to do the call.
        var sp = stackSave();
        var targetInt = stringToUTF8OnStack(target.id);
        _emscripten_set_canvas_element_size(targetInt, width, height);
        stackRestore(sp);
      }
    };
  Module['setCanvasElementSize'] = setCanvasElementSize;
  
  var registerRestoreOldStyle = (canvas) => {
      var canvasSize = getCanvasElementSize(canvas);
      var oldWidth = canvasSize[0];
      var oldHeight = canvasSize[1];
      var oldCssWidth = canvas.style.width;
      var oldCssHeight = canvas.style.height;
      var oldBackgroundColor = canvas.style.backgroundColor; // Chrome reads color from here.
      var oldDocumentBackgroundColor = document.body.style.backgroundColor; // IE11 reads color from here.
      // Firefox always has black background color.
      var oldPaddingLeft = canvas.style.paddingLeft; // Chrome, FF, Safari
      var oldPaddingRight = canvas.style.paddingRight;
      var oldPaddingTop = canvas.style.paddingTop;
      var oldPaddingBottom = canvas.style.paddingBottom;
      var oldMarginLeft = canvas.style.marginLeft; // IE11
      var oldMarginRight = canvas.style.marginRight;
      var oldMarginTop = canvas.style.marginTop;
      var oldMarginBottom = canvas.style.marginBottom;
      var oldDocumentBodyMargin = document.body.style.margin;
      var oldDocumentOverflow = document.documentElement.style.overflow; // Chrome, Firefox
      var oldDocumentScroll = document.body.scroll; // IE
      var oldImageRendering = canvas.style.imageRendering;
  
      function restoreOldStyle() {
        var fullscreenElement = document.fullscreenElement
          || document.webkitFullscreenElement
          ;
        if (!fullscreenElement) {
          document.removeEventListener('fullscreenchange', restoreOldStyle);
  
          // Unprefixed Fullscreen API shipped in Chromium 71 (https://bugs.chromium.org/p/chromium/issues/detail?id=383813)
          // As of Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitfullscreenchange. TODO: revisit this check once Safari ships unprefixed version.
          document.removeEventListener('webkitfullscreenchange', restoreOldStyle);
  
          setCanvasElementSize(canvas, oldWidth, oldHeight);
  
          canvas.style.width = oldCssWidth;
          canvas.style.height = oldCssHeight;
          canvas.style.backgroundColor = oldBackgroundColor; // Chrome
          // IE11 hack: assigning 'undefined' or an empty string to document.body.style.backgroundColor has no effect, so first assign back the default color
          // before setting the undefined value. Setting undefined value is also important, or otherwise we would later treat that as something that the user
          // had explicitly set so subsequent fullscreen transitions would not set background color properly.
          if (!oldDocumentBackgroundColor) document.body.style.backgroundColor = 'white';
          document.body.style.backgroundColor = oldDocumentBackgroundColor; // IE11
          canvas.style.paddingLeft = oldPaddingLeft; // Chrome, FF, Safari
          canvas.style.paddingRight = oldPaddingRight;
          canvas.style.paddingTop = oldPaddingTop;
          canvas.style.paddingBottom = oldPaddingBottom;
          canvas.style.marginLeft = oldMarginLeft; // IE11
          canvas.style.marginRight = oldMarginRight;
          canvas.style.marginTop = oldMarginTop;
          canvas.style.marginBottom = oldMarginBottom;
          document.body.style.margin = oldDocumentBodyMargin;
          document.documentElement.style.overflow = oldDocumentOverflow; // Chrome, Firefox
          document.body.scroll = oldDocumentScroll; // IE
          canvas.style.imageRendering = oldImageRendering;
          if (canvas.GLctxObject) canvas.GLctxObject.GLctx.viewport(0, 0, oldWidth, oldHeight);
  
          if (currentFullscreenStrategy.canvasResizedCallback) {
            getWasmTableEntry(currentFullscreenStrategy.canvasResizedCallback)(37, 0, currentFullscreenStrategy.canvasResizedCallbackUserData);
          }
        }
      }
      document.addEventListener('fullscreenchange', restoreOldStyle);
      // Unprefixed Fullscreen API shipped in Chromium 71 (https://bugs.chromium.org/p/chromium/issues/detail?id=383813)
      // As of Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitfullscreenchange. TODO: revisit this check once Safari ships unprefixed version.
      document.addEventListener('webkitfullscreenchange', restoreOldStyle);
      return restoreOldStyle;
    };
  Module['registerRestoreOldStyle'] = registerRestoreOldStyle;
  
  
  var setLetterbox = (element, topBottom, leftRight) => {
      // Cannot use margin to specify letterboxes in FF or Chrome, since those ignore margins in fullscreen mode.
      element.style.paddingLeft = element.style.paddingRight = leftRight + 'px';
      element.style.paddingTop = element.style.paddingBottom = topBottom + 'px';
    };
  Module['setLetterbox'] = setLetterbox;
  
  
  var getBoundingClientRect = (e) => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {'left':0,'top':0};
  Module['getBoundingClientRect'] = getBoundingClientRect;
  var JSEvents_resizeCanvasForFullscreen = (target, strategy) => {
      var restoreOldStyle = registerRestoreOldStyle(target);
      var cssWidth = strategy.softFullscreen ? innerWidth : screen.width;
      var cssHeight = strategy.softFullscreen ? innerHeight : screen.height;
      var rect = getBoundingClientRect(target);
      var windowedCssWidth = rect.width;
      var windowedCssHeight = rect.height;
      var canvasSize = getCanvasElementSize(target);
      var windowedRttWidth = canvasSize[0];
      var windowedRttHeight = canvasSize[1];
  
      if (strategy.scaleMode == 3) {
        setLetterbox(target, (cssHeight - windowedCssHeight) / 2, (cssWidth - windowedCssWidth) / 2);
        cssWidth = windowedCssWidth;
        cssHeight = windowedCssHeight;
      } else if (strategy.scaleMode == 2) {
        if (cssWidth*windowedRttHeight < windowedRttWidth*cssHeight) {
          var desiredCssHeight = windowedRttHeight * cssWidth / windowedRttWidth;
          setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0);
          cssHeight = desiredCssHeight;
        } else {
          var desiredCssWidth = windowedRttWidth * cssHeight / windowedRttHeight;
          setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2);
          cssWidth = desiredCssWidth;
        }
      }
  
      // If we are adding padding, must choose a background color or otherwise Chrome will give the
      // padding a default white color. Do it only if user has not customized their own background color.
      target.style.backgroundColor ||= 'black';
      // IE11 does the same, but requires the color to be set in the document body.
      document.body.style.backgroundColor ||= 'black'; // IE11
      // Firefox always shows black letterboxes independent of style color.
  
      target.style.width = cssWidth + 'px';
      target.style.height = cssHeight + 'px';
  
      if (strategy.filteringMode == 1) {
        target.style.imageRendering = 'optimizeSpeed';
        target.style.imageRendering = '-moz-crisp-edges';
        target.style.imageRendering = '-o-crisp-edges';
        target.style.imageRendering = '-webkit-optimize-contrast';
        target.style.imageRendering = 'optimize-contrast';
        target.style.imageRendering = 'crisp-edges';
        target.style.imageRendering = 'pixelated';
      }
  
      var dpiScale = (strategy.canvasResolutionScaleMode == 2) ? devicePixelRatio : 1;
      if (strategy.canvasResolutionScaleMode != 0) {
        var newWidth = (cssWidth * dpiScale)|0;
        var newHeight = (cssHeight * dpiScale)|0;
        setCanvasElementSize(target, newWidth, newHeight);
        if (target.GLctxObject) target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight);
      }
      return restoreOldStyle;
    };
  Module['JSEvents_resizeCanvasForFullscreen'] = JSEvents_resizeCanvasForFullscreen;
  
  var JSEvents_requestFullscreen = (target, strategy) => {
      // EMSCRIPTEN_FULLSCREEN_SCALE_DEFAULT + EMSCRIPTEN_FULLSCREEN_CANVAS_SCALE_NONE is a mode where no extra logic is performed to the DOM elements.
      if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) {
        JSEvents_resizeCanvasForFullscreen(target, strategy);
      }
  
      if (target.requestFullscreen) {
        target.requestFullscreen();
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else {
        return JSEvents.fullscreenEnabled() ? -3 : -1;
      }
  
      currentFullscreenStrategy = strategy;
  
      if (strategy.canvasResizedCallback) {
        getWasmTableEntry(strategy.canvasResizedCallback)(37, 0, strategy.canvasResizedCallbackUserData);
      }
  
      return 0;
    };
  Module['JSEvents_requestFullscreen'] = JSEvents_requestFullscreen;
  
  var _emscripten_exit_fullscreen = () => {
      if (!JSEvents.fullscreenEnabled()) return -1;
      // Make sure no queued up calls will fire after this.
      JSEvents.removeDeferredCalls(JSEvents_requestFullscreen);
  
      var d = specialHTMLTargets[1];
      if (d.exitFullscreen) {
        d.fullscreenElement && d.exitFullscreen();
      } else if (d.webkitExitFullscreen) {
        d.webkitFullscreenElement && d.webkitExitFullscreen();
      } else {
        return -1;
      }
  
      return 0;
    };
  Module['_emscripten_exit_fullscreen'] = _emscripten_exit_fullscreen;

  
  var requestPointerLock = (target) => {
      if (target.requestPointerLock) {
        target.requestPointerLock();
      } else {
        // document.body is known to accept pointer lock, so use that to differentiate if the user passed a bad element,
        // or if the whole browser just doesn't support the feature.
        if (document.body.requestPointerLock
          ) {
          return -3;
        }
        return -1;
      }
      return 0;
    };
  Module['requestPointerLock'] = requestPointerLock;
  var _emscripten_exit_pointerlock = () => {
      // Make sure no queued up calls will fire after this.
      JSEvents.removeDeferredCalls(requestPointerLock);
  
      if (document.exitPointerLock) {
        document.exitPointerLock();
      } else {
        return -1;
      }
      return 0;
    };
  Module['_emscripten_exit_pointerlock'] = _emscripten_exit_pointerlock;

  
  
  
  var _emscripten_force_exit = (status) => {
      warnOnce('emscripten_force_exit cannot actually shut down the runtime, as the build does not have EXIT_RUNTIME set');
      __emscripten_runtime_keepalive_clear();
      _exit(status);
    };
  Module['_emscripten_force_exit'] = _emscripten_force_exit;

  var fillBatteryEventData = (eventStruct, e) => {
      HEAPF64[((eventStruct)>>3)] = e.chargingTime;
      HEAPF64[(((eventStruct)+(8))>>3)] = e.dischargingTime;
      HEAPF64[(((eventStruct)+(16))>>3)] = e.level;
      HEAP8[(eventStruct)+(24)] = e.charging;
    };
  Module['fillBatteryEventData'] = fillBatteryEventData;
  
  var battery = () => navigator.battery || navigator.mozBattery || navigator.webkitBattery;
  Module['battery'] = battery;
  var _emscripten_get_battery_status = (batteryState) => {
      if (!battery()) return -1;
      fillBatteryEventData(batteryState, battery());
      return 0;
    };
  Module['_emscripten_get_battery_status'] = _emscripten_get_battery_status;

  var _emscripten_get_device_pixel_ratio = () => {
      return (typeof devicePixelRatio == 'number' && devicePixelRatio) || 1.0;
    };
  Module['_emscripten_get_device_pixel_ratio'] = _emscripten_get_device_pixel_ratio;

  
  
  var _emscripten_get_element_css_size = (target, width, height) => {
      target = findEventTarget(target);
      if (!target) return -4;
  
      var rect = getBoundingClientRect(target);
      HEAPF64[((width)>>3)] = rect.width;
      HEAPF64[((height)>>3)] = rect.height;
  
      return 0;
    };
  Module['_emscripten_get_element_css_size'] = _emscripten_get_element_css_size;

  
  var fillGamepadEventData = (eventStruct, e) => {
      HEAPF64[((eventStruct)>>3)] = e.timestamp;
      for (var i = 0; i < e.axes.length; ++i) {
        HEAPF64[(((eventStruct+i*8)+(16))>>3)] = e.axes[i];
      }
      for (var i = 0; i < e.buttons.length; ++i) {
        if (typeof e.buttons[i] == 'object') {
          HEAPF64[(((eventStruct+i*8)+(528))>>3)] = e.buttons[i].value;
        } else {
          HEAPF64[(((eventStruct+i*8)+(528))>>3)] = e.buttons[i];
        }
      }
      for (var i = 0; i < e.buttons.length; ++i) {
        if (typeof e.buttons[i] == 'object') {
          HEAP8[(eventStruct+i)+(1040)] = e.buttons[i].pressed;
        } else {
          // Assigning a boolean to HEAP32, that's ok, but Closure would like to warn about it:
          /** @suppress {checkTypes} */
          HEAP8[(eventStruct+i)+(1040)] = e.buttons[i] == 1;
        }
      }
      HEAP8[(eventStruct)+(1104)] = e.connected;
      HEAP32[(((eventStruct)+(1108))>>2)] = e.index;
      HEAP32[(((eventStruct)+(8))>>2)] = e.axes.length;
      HEAP32[(((eventStruct)+(12))>>2)] = e.buttons.length;
      stringToUTF8(e.id, eventStruct + 1112, 64);
      stringToUTF8(e.mapping, eventStruct + 1176, 64);
    };
  Module['fillGamepadEventData'] = fillGamepadEventData;
  var _emscripten_get_gamepad_status = (index, gamepadState) => {
      if (!JSEvents.lastGamepadState) throw 'emscripten_get_gamepad_status() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!';
      // INVALID_PARAM is returned on a Gamepad index that never was there.
      if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5;
  
      // NO_DATA is returned on a Gamepad index that was removed.
      // For previously disconnected gamepads there should be an empty slot (null/undefined/false) at the index.
      // This is because gamepads must keep their original position in the array.
      // For example, removing the first of two gamepads produces [null/undefined/false, gamepad].
      if (!JSEvents.lastGamepadState[index]) return -7;
  
      fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
      return 0;
    };
  Module['_emscripten_get_gamepad_status'] = _emscripten_get_gamepad_status;

  var getHeapMax = () =>
      HEAPU8.length;
  Module['getHeapMax'] = getHeapMax;
  var _emscripten_get_heap_max = () => getHeapMax();
  Module['_emscripten_get_heap_max'] = _emscripten_get_heap_max;


  var _emscripten_get_num_gamepads = () => {
      if (!JSEvents.lastGamepadState) throw 'emscripten_get_num_gamepads() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!';
      // N.B. Do not call emscripten_get_num_gamepads() unless having first called emscripten_sample_gamepad_data(), and that has returned EMSCRIPTEN_RESULT_SUCCESS.
      // Otherwise the following line will throw an exception.
      return JSEvents.lastGamepadState.length;
    };
  Module['_emscripten_get_num_gamepads'] = _emscripten_get_num_gamepads;

  var getPreloadedImageData = (path, w, h) => {
      path = PATH_FS.resolve(path);
  
      var canvas = /** @type {HTMLCanvasElement} */(preloadedImages[path]);
      if (!canvas) return 0;
  
      var ctx = canvas.getContext("2d");
      var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var buf = _malloc(canvas.width * canvas.height * 4);
  
      HEAPU8.set(image.data, buf);
  
      HEAP32[((w)>>2)] = canvas.width;
      HEAP32[((h)>>2)] = canvas.height;
      return buf;
    };
  Module['getPreloadedImageData'] = getPreloadedImageData;
  
  
  
  var _emscripten_get_preloaded_image_data = (path, w, h) => getPreloadedImageData(UTF8ToString(path), w, h);
  Module['_emscripten_get_preloaded_image_data'] = _emscripten_get_preloaded_image_data;

  
  
  var _emscripten_get_preloaded_image_data_from_FILE = (file, w, h) => {
      var fd = _fileno(file);
      var stream = FS.getStream(fd);
      if (stream) {
        return getPreloadedImageData(stream.path, w, h);
      }
  
      return 0;
    };
  Module['_emscripten_get_preloaded_image_data_from_FILE'] = _emscripten_get_preloaded_image_data_from_FILE;

  var _emscripten_get_screen_size = (width, height) => {
      HEAP32[((width)>>2)] = screen.width;
      HEAP32[((height)>>2)] = screen.height;
    };
  Module['_emscripten_get_screen_size'] = _emscripten_get_screen_size;

  /** @suppress {duplicate } */
  var _glActiveTexture = (x0) => GLctx.activeTexture(x0);
  Module['_glActiveTexture'] = _glActiveTexture;
  var _emscripten_glActiveTexture = _glActiveTexture;
  Module['_emscripten_glActiveTexture'] = _emscripten_glActiveTexture;

  /** @suppress {duplicate } */
  var _glAttachShader = (program, shader) => {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
    };
  Module['_glAttachShader'] = _glAttachShader;
  var _emscripten_glAttachShader = _glAttachShader;
  Module['_emscripten_glAttachShader'] = _emscripten_glAttachShader;

  /** @suppress {duplicate } */
  var _glBeginQueryEXT = (target, id) => {
      GLctx.disjointTimerQueryExt['beginQueryEXT'](target, GL.queries[id]);
    };
  Module['_glBeginQueryEXT'] = _glBeginQueryEXT;
  var _emscripten_glBeginQueryEXT = _glBeginQueryEXT;
  Module['_emscripten_glBeginQueryEXT'] = _emscripten_glBeginQueryEXT;

  
  /** @suppress {duplicate } */
  var _glBindAttribLocation = (program, index, name) => {
      GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
    };
  Module['_glBindAttribLocation'] = _glBindAttribLocation;
  var _emscripten_glBindAttribLocation = _glBindAttribLocation;
  Module['_emscripten_glBindAttribLocation'] = _emscripten_glBindAttribLocation;

  /** @suppress {duplicate } */
  var _glBindBuffer = (target, buffer) => {
  
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    };
  Module['_glBindBuffer'] = _glBindBuffer;
  var _emscripten_glBindBuffer = _glBindBuffer;
  Module['_emscripten_glBindBuffer'] = _emscripten_glBindBuffer;

  /** @suppress {duplicate } */
  var _glBindFramebuffer = (target, framebuffer) => {
  
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
  
    };
  Module['_glBindFramebuffer'] = _glBindFramebuffer;
  var _emscripten_glBindFramebuffer = _glBindFramebuffer;
  Module['_emscripten_glBindFramebuffer'] = _emscripten_glBindFramebuffer;

  /** @suppress {duplicate } */
  var _glBindRenderbuffer = (target, renderbuffer) => {
      GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
    };
  Module['_glBindRenderbuffer'] = _glBindRenderbuffer;
  var _emscripten_glBindRenderbuffer = _glBindRenderbuffer;
  Module['_emscripten_glBindRenderbuffer'] = _emscripten_glBindRenderbuffer;

  /** @suppress {duplicate } */
  var _glBindTexture = (target, texture) => {
      GLctx.bindTexture(target, GL.textures[texture]);
    };
  Module['_glBindTexture'] = _glBindTexture;
  var _emscripten_glBindTexture = _glBindTexture;
  Module['_emscripten_glBindTexture'] = _emscripten_glBindTexture;

  
  /** @suppress {duplicate } */
  var _glBindVertexArray = (vao) => {
      GLctx.bindVertexArray(GL.vaos[vao]);
    };
  Module['_glBindVertexArray'] = _glBindVertexArray;
  /** @suppress {duplicate } */
  var _glBindVertexArrayOES = _glBindVertexArray;
  Module['_glBindVertexArrayOES'] = _glBindVertexArrayOES;
  var _emscripten_glBindVertexArrayOES = _glBindVertexArrayOES;
  Module['_emscripten_glBindVertexArrayOES'] = _emscripten_glBindVertexArrayOES;

  /** @suppress {duplicate } */
  var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);
  Module['_glBlendColor'] = _glBlendColor;
  var _emscripten_glBlendColor = _glBlendColor;
  Module['_emscripten_glBlendColor'] = _emscripten_glBlendColor;

  /** @suppress {duplicate } */
  var _glBlendEquation = (x0) => GLctx.blendEquation(x0);
  Module['_glBlendEquation'] = _glBlendEquation;
  var _emscripten_glBlendEquation = _glBlendEquation;
  Module['_emscripten_glBlendEquation'] = _emscripten_glBlendEquation;

  /** @suppress {duplicate } */
  var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);
  Module['_glBlendEquationSeparate'] = _glBlendEquationSeparate;
  var _emscripten_glBlendEquationSeparate = _glBlendEquationSeparate;
  Module['_emscripten_glBlendEquationSeparate'] = _emscripten_glBlendEquationSeparate;

  /** @suppress {duplicate } */
  var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);
  Module['_glBlendFunc'] = _glBlendFunc;
  var _emscripten_glBlendFunc = _glBlendFunc;
  Module['_emscripten_glBlendFunc'] = _emscripten_glBlendFunc;

  /** @suppress {duplicate } */
  var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);
  Module['_glBlendFuncSeparate'] = _glBlendFuncSeparate;
  var _emscripten_glBlendFuncSeparate = _glBlendFuncSeparate;
  Module['_emscripten_glBlendFuncSeparate'] = _emscripten_glBlendFuncSeparate;

  /** @suppress {duplicate } */
  var _glBufferData = (target, size, data, usage) => {
  
      // N.b. here first form specifies a heap subarray, second form an integer
      // size, so the ?: code here is polymorphic. It is advised to avoid
      // randomly mixing both uses in calling code, to avoid any potential JS
      // engine JIT issues.
      GLctx.bufferData(target, data ? HEAPU8.subarray(data, data+size) : size, usage);
    };
  Module['_glBufferData'] = _glBufferData;
  var _emscripten_glBufferData = _glBufferData;
  Module['_emscripten_glBufferData'] = _emscripten_glBufferData;

  /** @suppress {duplicate } */
  var _glBufferSubData = (target, offset, size, data) => {
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data+size));
    };
  Module['_glBufferSubData'] = _glBufferSubData;
  var _emscripten_glBufferSubData = _glBufferSubData;
  Module['_emscripten_glBufferSubData'] = _emscripten_glBufferSubData;

  /** @suppress {duplicate } */
  var _glCheckFramebufferStatus = (x0) => GLctx.checkFramebufferStatus(x0);
  Module['_glCheckFramebufferStatus'] = _glCheckFramebufferStatus;
  var _emscripten_glCheckFramebufferStatus = _glCheckFramebufferStatus;
  Module['_emscripten_glCheckFramebufferStatus'] = _emscripten_glCheckFramebufferStatus;

  /** @suppress {duplicate } */
  var _glClear = (x0) => GLctx.clear(x0);
  Module['_glClear'] = _glClear;
  var _emscripten_glClear = _glClear;
  Module['_emscripten_glClear'] = _emscripten_glClear;

  /** @suppress {duplicate } */
  var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);
  Module['_glClearColor'] = _glClearColor;
  var _emscripten_glClearColor = _glClearColor;
  Module['_emscripten_glClearColor'] = _emscripten_glClearColor;

  /** @suppress {duplicate } */
  var _glClearDepthf = (x0) => GLctx.clearDepth(x0);
  Module['_glClearDepthf'] = _glClearDepthf;
  var _emscripten_glClearDepthf = _glClearDepthf;
  Module['_emscripten_glClearDepthf'] = _emscripten_glClearDepthf;

  /** @suppress {duplicate } */
  var _glClearStencil = (x0) => GLctx.clearStencil(x0);
  Module['_glClearStencil'] = _glClearStencil;
  var _emscripten_glClearStencil = _glClearStencil;
  Module['_emscripten_glClearStencil'] = _emscripten_glClearStencil;

  /** @suppress {duplicate } */
  var _glClipControlEXT = (origin, depth) => {
      GLctx.extClipControl['clipControlEXT'](origin, depth);
    };
  Module['_glClipControlEXT'] = _glClipControlEXT;
  var _emscripten_glClipControlEXT = _glClipControlEXT;
  Module['_emscripten_glClipControlEXT'] = _emscripten_glClipControlEXT;

  /** @suppress {duplicate } */
  var _glColorMask = (red, green, blue, alpha) => {
      GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
    };
  Module['_glColorMask'] = _glColorMask;
  var _emscripten_glColorMask = _glColorMask;
  Module['_emscripten_glColorMask'] = _emscripten_glColorMask;

  /** @suppress {duplicate } */
  var _glCompileShader = (shader) => {
      GLctx.compileShader(GL.shaders[shader]);
    };
  Module['_glCompileShader'] = _glCompileShader;
  var _emscripten_glCompileShader = _glCompileShader;
  Module['_emscripten_glCompileShader'] = _emscripten_glCompileShader;

  /** @suppress {duplicate } */
  var _glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
      // `data` may be null here, which means "allocate uniniitalized space but
      // don't upload" in GLES parlance, but `compressedTexImage2D` requires the
      // final data parameter, so we simply pass a heap view starting at zero
      // effectively uploading whatever happens to be near address zero.  See
      // https://github.com/emscripten-core/emscripten/issues/19300.
      GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8.subarray((data), data+imageSize));
    };
  Module['_glCompressedTexImage2D'] = _glCompressedTexImage2D;
  var _emscripten_glCompressedTexImage2D = _glCompressedTexImage2D;
  Module['_emscripten_glCompressedTexImage2D'] = _emscripten_glCompressedTexImage2D;

  /** @suppress {duplicate } */
  var _glCompressedTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, imageSize, data) => {
      GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8.subarray((data), data+imageSize));
    };
  Module['_glCompressedTexSubImage2D'] = _glCompressedTexSubImage2D;
  var _emscripten_glCompressedTexSubImage2D = _glCompressedTexSubImage2D;
  Module['_emscripten_glCompressedTexSubImage2D'] = _emscripten_glCompressedTexSubImage2D;

  /** @suppress {duplicate } */
  var _glCopyTexImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
  Module['_glCopyTexImage2D'] = _glCopyTexImage2D;
  var _emscripten_glCopyTexImage2D = _glCopyTexImage2D;
  Module['_emscripten_glCopyTexImage2D'] = _emscripten_glCopyTexImage2D;

  /** @suppress {duplicate } */
  var _glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
  Module['_glCopyTexSubImage2D'] = _glCopyTexSubImage2D;
  var _emscripten_glCopyTexSubImage2D = _glCopyTexSubImage2D;
  Module['_emscripten_glCopyTexSubImage2D'] = _emscripten_glCopyTexSubImage2D;

  /** @suppress {duplicate } */
  var _glCreateProgram = () => {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      // Store additional information needed for each shader program:
      program.name = id;
      // Lazy cache results of
      // glGetProgramiv(GL_ACTIVE_UNIFORM_MAX_LENGTH/GL_ACTIVE_ATTRIBUTE_MAX_LENGTH/GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH)
      program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
      program.uniformIdCounter = 1;
      GL.programs[id] = program;
      return id;
    };
  Module['_glCreateProgram'] = _glCreateProgram;
  var _emscripten_glCreateProgram = _glCreateProgram;
  Module['_emscripten_glCreateProgram'] = _emscripten_glCreateProgram;

  /** @suppress {duplicate } */
  var _glCreateShader = (shaderType) => {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
  
      return id;
    };
  Module['_glCreateShader'] = _glCreateShader;
  var _emscripten_glCreateShader = _glCreateShader;
  Module['_emscripten_glCreateShader'] = _emscripten_glCreateShader;

  /** @suppress {duplicate } */
  var _glCullFace = (x0) => GLctx.cullFace(x0);
  Module['_glCullFace'] = _glCullFace;
  var _emscripten_glCullFace = _glCullFace;
  Module['_emscripten_glCullFace'] = _emscripten_glCullFace;

  /** @suppress {duplicate } */
  var _glDeleteBuffers = (n, buffers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((buffers)+(i*4))>>2)];
        var buffer = GL.buffers[id];
  
        // From spec: "glDeleteBuffers silently ignores 0's and names that do not
        // correspond to existing buffer objects."
        if (!buffer) continue;
  
        GLctx.deleteBuffer(buffer);
        buffer.name = 0;
        GL.buffers[id] = null;
  
      }
    };
  Module['_glDeleteBuffers'] = _glDeleteBuffers;
  var _emscripten_glDeleteBuffers = _glDeleteBuffers;
  Module['_emscripten_glDeleteBuffers'] = _emscripten_glDeleteBuffers;

  /** @suppress {duplicate } */
  var _glDeleteFramebuffers = (n, framebuffers) => {
      for (var i = 0; i < n; ++i) {
        var id = HEAP32[(((framebuffers)+(i*4))>>2)];
        var framebuffer = GL.framebuffers[id];
        if (!framebuffer) continue; // GL spec: "glDeleteFramebuffers silently ignores 0s and names that do not correspond to existing framebuffer objects".
        GLctx.deleteFramebuffer(framebuffer);
        framebuffer.name = 0;
        GL.framebuffers[id] = null;
      }
    };
  Module['_glDeleteFramebuffers'] = _glDeleteFramebuffers;
  var _emscripten_glDeleteFramebuffers = _glDeleteFramebuffers;
  Module['_emscripten_glDeleteFramebuffers'] = _emscripten_glDeleteFramebuffers;

  /** @suppress {duplicate } */
  var _glDeleteProgram = (id) => {
      if (!id) return;
      var program = GL.programs[id];
      if (!program) {
        // glDeleteProgram actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteProgram(program);
      program.name = 0;
      GL.programs[id] = null;
    };
  Module['_glDeleteProgram'] = _glDeleteProgram;
  var _emscripten_glDeleteProgram = _glDeleteProgram;
  Module['_emscripten_glDeleteProgram'] = _emscripten_glDeleteProgram;

  /** @suppress {duplicate } */
  var _glDeleteQueriesEXT = (n, ids) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((ids)+(i*4))>>2)];
        var query = GL.queries[id];
        if (!query) continue; // GL spec: "unused names in ids are ignored, as is the name zero."
        GLctx.disjointTimerQueryExt['deleteQueryEXT'](query);
        GL.queries[id] = null;
      }
    };
  Module['_glDeleteQueriesEXT'] = _glDeleteQueriesEXT;
  var _emscripten_glDeleteQueriesEXT = _glDeleteQueriesEXT;
  Module['_emscripten_glDeleteQueriesEXT'] = _emscripten_glDeleteQueriesEXT;

  /** @suppress {duplicate } */
  var _glDeleteRenderbuffers = (n, renderbuffers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((renderbuffers)+(i*4))>>2)];
        var renderbuffer = GL.renderbuffers[id];
        if (!renderbuffer) continue; // GL spec: "glDeleteRenderbuffers silently ignores 0s and names that do not correspond to existing renderbuffer objects".
        GLctx.deleteRenderbuffer(renderbuffer);
        renderbuffer.name = 0;
        GL.renderbuffers[id] = null;
      }
    };
  Module['_glDeleteRenderbuffers'] = _glDeleteRenderbuffers;
  var _emscripten_glDeleteRenderbuffers = _glDeleteRenderbuffers;
  Module['_emscripten_glDeleteRenderbuffers'] = _emscripten_glDeleteRenderbuffers;

  /** @suppress {duplicate } */
  var _glDeleteShader = (id) => {
      if (!id) return;
      var shader = GL.shaders[id];
      if (!shader) {
        // glDeleteShader actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteShader(shader);
      GL.shaders[id] = null;
    };
  Module['_glDeleteShader'] = _glDeleteShader;
  var _emscripten_glDeleteShader = _glDeleteShader;
  Module['_emscripten_glDeleteShader'] = _emscripten_glDeleteShader;

  /** @suppress {duplicate } */
  var _glDeleteTextures = (n, textures) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((textures)+(i*4))>>2)];
        var texture = GL.textures[id];
        // GL spec: "glDeleteTextures silently ignores 0s and names that do not
        // correspond to existing textures".
        if (!texture) continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
      }
    };
  Module['_glDeleteTextures'] = _glDeleteTextures;
  var _emscripten_glDeleteTextures = _glDeleteTextures;
  Module['_emscripten_glDeleteTextures'] = _emscripten_glDeleteTextures;

  
  /** @suppress {duplicate } */
  var _glDeleteVertexArrays = (n, vaos) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((vaos)+(i*4))>>2)];
        GLctx.deleteVertexArray(GL.vaos[id]);
        GL.vaos[id] = null;
      }
    };
  Module['_glDeleteVertexArrays'] = _glDeleteVertexArrays;
  /** @suppress {duplicate } */
  var _glDeleteVertexArraysOES = _glDeleteVertexArrays;
  Module['_glDeleteVertexArraysOES'] = _glDeleteVertexArraysOES;
  var _emscripten_glDeleteVertexArraysOES = _glDeleteVertexArraysOES;
  Module['_emscripten_glDeleteVertexArraysOES'] = _emscripten_glDeleteVertexArraysOES;

  /** @suppress {duplicate } */
  var _glDepthFunc = (x0) => GLctx.depthFunc(x0);
  Module['_glDepthFunc'] = _glDepthFunc;
  var _emscripten_glDepthFunc = _glDepthFunc;
  Module['_emscripten_glDepthFunc'] = _emscripten_glDepthFunc;

  /** @suppress {duplicate } */
  var _glDepthMask = (flag) => {
      GLctx.depthMask(!!flag);
    };
  Module['_glDepthMask'] = _glDepthMask;
  var _emscripten_glDepthMask = _glDepthMask;
  Module['_emscripten_glDepthMask'] = _emscripten_glDepthMask;

  /** @suppress {duplicate } */
  var _glDepthRangef = (x0, x1) => GLctx.depthRange(x0, x1);
  Module['_glDepthRangef'] = _glDepthRangef;
  var _emscripten_glDepthRangef = _glDepthRangef;
  Module['_emscripten_glDepthRangef'] = _emscripten_glDepthRangef;

  /** @suppress {duplicate } */
  var _glDetachShader = (program, shader) => {
      GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
    };
  Module['_glDetachShader'] = _glDetachShader;
  var _emscripten_glDetachShader = _glDetachShader;
  Module['_emscripten_glDetachShader'] = _emscripten_glDetachShader;

  /** @suppress {duplicate } */
  var _glDisable = (x0) => GLctx.disable(x0);
  Module['_glDisable'] = _glDisable;
  var _emscripten_glDisable = _glDisable;
  Module['_emscripten_glDisable'] = _emscripten_glDisable;

  /** @suppress {duplicate } */
  var _glDisableVertexAttribArray = (index) => {
      GLctx.disableVertexAttribArray(index);
    };
  Module['_glDisableVertexAttribArray'] = _glDisableVertexAttribArray;
  var _emscripten_glDisableVertexAttribArray = _glDisableVertexAttribArray;
  Module['_emscripten_glDisableVertexAttribArray'] = _emscripten_glDisableVertexAttribArray;

  /** @suppress {duplicate } */
  var _glDrawArrays = (mode, first, count) => {
  
      GLctx.drawArrays(mode, first, count);
  
    };
  Module['_glDrawArrays'] = _glDrawArrays;
  var _emscripten_glDrawArrays = _glDrawArrays;
  Module['_emscripten_glDrawArrays'] = _emscripten_glDrawArrays;

  
  /** @suppress {duplicate } */
  var _glDrawArraysInstanced = (mode, first, count, primcount) => {
      GLctx.drawArraysInstanced(mode, first, count, primcount);
    };
  Module['_glDrawArraysInstanced'] = _glDrawArraysInstanced;
  /** @suppress {duplicate } */
  var _glDrawArraysInstancedANGLE = _glDrawArraysInstanced;
  Module['_glDrawArraysInstancedANGLE'] = _glDrawArraysInstancedANGLE;
  var _emscripten_glDrawArraysInstancedANGLE = _glDrawArraysInstancedANGLE;
  Module['_emscripten_glDrawArraysInstancedANGLE'] = _emscripten_glDrawArraysInstancedANGLE;

  
  var tempFixedLengthArray = [];
  Module['tempFixedLengthArray'] = tempFixedLengthArray;
  
  /** @suppress {duplicate } */
  var _glDrawBuffers = (n, bufs) => {
  
      var bufArray = tempFixedLengthArray[n];
      for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(((bufs)+(i*4))>>2)];
      }
  
      GLctx.drawBuffers(bufArray);
    };
  Module['_glDrawBuffers'] = _glDrawBuffers;
  /** @suppress {duplicate } */
  var _glDrawBuffersWEBGL = _glDrawBuffers;
  Module['_glDrawBuffersWEBGL'] = _glDrawBuffersWEBGL;
  var _emscripten_glDrawBuffersWEBGL = _glDrawBuffersWEBGL;
  Module['_emscripten_glDrawBuffersWEBGL'] = _emscripten_glDrawBuffersWEBGL;

  /** @suppress {duplicate } */
  var _glDrawElements = (mode, count, type, indices) => {
  
      GLctx.drawElements(mode, count, type, indices);
  
    };
  Module['_glDrawElements'] = _glDrawElements;
  var _emscripten_glDrawElements = _glDrawElements;
  Module['_emscripten_glDrawElements'] = _emscripten_glDrawElements;

  
  /** @suppress {duplicate } */
  var _glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
      GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
    };
  Module['_glDrawElementsInstanced'] = _glDrawElementsInstanced;
  /** @suppress {duplicate } */
  var _glDrawElementsInstancedANGLE = _glDrawElementsInstanced;
  Module['_glDrawElementsInstancedANGLE'] = _glDrawElementsInstancedANGLE;
  var _emscripten_glDrawElementsInstancedANGLE = _glDrawElementsInstancedANGLE;
  Module['_emscripten_glDrawElementsInstancedANGLE'] = _emscripten_glDrawElementsInstancedANGLE;

  /** @suppress {duplicate } */
  var _glEnable = (x0) => GLctx.enable(x0);
  Module['_glEnable'] = _glEnable;
  var _emscripten_glEnable = _glEnable;
  Module['_emscripten_glEnable'] = _emscripten_glEnable;

  /** @suppress {duplicate } */
  var _glEnableVertexAttribArray = (index) => {
      GLctx.enableVertexAttribArray(index);
    };
  Module['_glEnableVertexAttribArray'] = _glEnableVertexAttribArray;
  var _emscripten_glEnableVertexAttribArray = _glEnableVertexAttribArray;
  Module['_emscripten_glEnableVertexAttribArray'] = _emscripten_glEnableVertexAttribArray;

  /** @suppress {duplicate } */
  var _glEndQueryEXT = (target) => {
      GLctx.disjointTimerQueryExt['endQueryEXT'](target);
    };
  Module['_glEndQueryEXT'] = _glEndQueryEXT;
  var _emscripten_glEndQueryEXT = _glEndQueryEXT;
  Module['_emscripten_glEndQueryEXT'] = _emscripten_glEndQueryEXT;

  /** @suppress {duplicate } */
  var _glFinish = () => GLctx.finish();
  Module['_glFinish'] = _glFinish;
  var _emscripten_glFinish = _glFinish;
  Module['_emscripten_glFinish'] = _emscripten_glFinish;

  /** @suppress {duplicate } */
  var _glFlush = () => GLctx.flush();
  Module['_glFlush'] = _glFlush;
  var _emscripten_glFlush = _glFlush;
  Module['_emscripten_glFlush'] = _emscripten_glFlush;

  /** @suppress {duplicate } */
  var _glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
      GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget,
                                         GL.renderbuffers[renderbuffer]);
    };
  Module['_glFramebufferRenderbuffer'] = _glFramebufferRenderbuffer;
  var _emscripten_glFramebufferRenderbuffer = _glFramebufferRenderbuffer;
  Module['_emscripten_glFramebufferRenderbuffer'] = _emscripten_glFramebufferRenderbuffer;

  /** @suppress {duplicate } */
  var _glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
      GLctx.framebufferTexture2D(target, attachment, textarget,
                                      GL.textures[texture], level);
    };
  Module['_glFramebufferTexture2D'] = _glFramebufferTexture2D;
  var _emscripten_glFramebufferTexture2D = _glFramebufferTexture2D;
  Module['_emscripten_glFramebufferTexture2D'] = _emscripten_glFramebufferTexture2D;

  /** @suppress {duplicate } */
  var _glFrontFace = (x0) => GLctx.frontFace(x0);
  Module['_glFrontFace'] = _glFrontFace;
  var _emscripten_glFrontFace = _glFrontFace;
  Module['_emscripten_glFrontFace'] = _emscripten_glFrontFace;

  /** @suppress {duplicate } */
  var _glGenBuffers = (n, buffers) => {
      GL.genObject(n, buffers, 'createBuffer', GL.buffers
        );
    };
  Module['_glGenBuffers'] = _glGenBuffers;
  var _emscripten_glGenBuffers = _glGenBuffers;
  Module['_emscripten_glGenBuffers'] = _emscripten_glGenBuffers;

  /** @suppress {duplicate } */
  var _glGenFramebuffers = (n, ids) => {
      GL.genObject(n, ids, 'createFramebuffer', GL.framebuffers
        );
    };
  Module['_glGenFramebuffers'] = _glGenFramebuffers;
  var _emscripten_glGenFramebuffers = _glGenFramebuffers;
  Module['_emscripten_glGenFramebuffers'] = _emscripten_glGenFramebuffers;

  /** @suppress {duplicate } */
  var _glGenQueriesEXT = (n, ids) => {
      for (var i = 0; i < n; i++) {
        var query = GLctx.disjointTimerQueryExt['createQueryEXT']();
        if (!query) {
          GL.recordError(0x502 /* GL_INVALID_OPERATION */);
          while (i < n) HEAP32[(((ids)+(i++*4))>>2)] = 0;
          return;
        }
        var id = GL.getNewId(GL.queries);
        query.name = id;
        GL.queries[id] = query;
        HEAP32[(((ids)+(i*4))>>2)] = id;
      }
    };
  Module['_glGenQueriesEXT'] = _glGenQueriesEXT;
  var _emscripten_glGenQueriesEXT = _glGenQueriesEXT;
  Module['_emscripten_glGenQueriesEXT'] = _emscripten_glGenQueriesEXT;

  /** @suppress {duplicate } */
  var _glGenRenderbuffers = (n, renderbuffers) => {
      GL.genObject(n, renderbuffers, 'createRenderbuffer', GL.renderbuffers
        );
    };
  Module['_glGenRenderbuffers'] = _glGenRenderbuffers;
  var _emscripten_glGenRenderbuffers = _glGenRenderbuffers;
  Module['_emscripten_glGenRenderbuffers'] = _emscripten_glGenRenderbuffers;

  /** @suppress {duplicate } */
  var _glGenTextures = (n, textures) => {
      GL.genObject(n, textures, 'createTexture', GL.textures
        );
    };
  Module['_glGenTextures'] = _glGenTextures;
  var _emscripten_glGenTextures = _glGenTextures;
  Module['_emscripten_glGenTextures'] = _emscripten_glGenTextures;

  
  /** @suppress {duplicate } */
  var _glGenVertexArrays = (n, arrays) => {
      GL.genObject(n, arrays, 'createVertexArray', GL.vaos
        );
    };
  Module['_glGenVertexArrays'] = _glGenVertexArrays;
  /** @suppress {duplicate } */
  var _glGenVertexArraysOES = _glGenVertexArrays;
  Module['_glGenVertexArraysOES'] = _glGenVertexArraysOES;
  var _emscripten_glGenVertexArraysOES = _glGenVertexArraysOES;
  Module['_emscripten_glGenVertexArraysOES'] = _emscripten_glGenVertexArraysOES;

  /** @suppress {duplicate } */
  var _glGenerateMipmap = (x0) => GLctx.generateMipmap(x0);
  Module['_glGenerateMipmap'] = _glGenerateMipmap;
  var _emscripten_glGenerateMipmap = _glGenerateMipmap;
  Module['_emscripten_glGenerateMipmap'] = _emscripten_glGenerateMipmap;

  
  var __glGetActiveAttribOrUniform = (funcName, program, index, bufSize, length, size, type, name) => {
      program = GL.programs[program];
      var info = GLctx[funcName](program, index);
      if (info) {
        // If an error occurs, nothing will be written to length, size and type and name.
        var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
        if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
        if (size) HEAP32[((size)>>2)] = info.size;
        if (type) HEAP32[((type)>>2)] = info.type;
      }
    };
  Module['__glGetActiveAttribOrUniform'] = __glGetActiveAttribOrUniform;
  
  /** @suppress {duplicate } */
  var _glGetActiveAttrib = (program, index, bufSize, length, size, type, name) => {
      __glGetActiveAttribOrUniform('getActiveAttrib', program, index, bufSize, length, size, type, name);
    };
  Module['_glGetActiveAttrib'] = _glGetActiveAttrib;
  var _emscripten_glGetActiveAttrib = _glGetActiveAttrib;
  Module['_emscripten_glGetActiveAttrib'] = _emscripten_glGetActiveAttrib;

  
  /** @suppress {duplicate } */
  var _glGetActiveUniform = (program, index, bufSize, length, size, type, name) => {
      __glGetActiveAttribOrUniform('getActiveUniform', program, index, bufSize, length, size, type, name);
    };
  Module['_glGetActiveUniform'] = _glGetActiveUniform;
  var _emscripten_glGetActiveUniform = _glGetActiveUniform;
  Module['_emscripten_glGetActiveUniform'] = _emscripten_glGetActiveUniform;

  /** @suppress {duplicate } */
  var _glGetAttachedShaders = (program, maxCount, count, shaders) => {
      var result = GLctx.getAttachedShaders(GL.programs[program]);
      var len = result.length;
      if (len > maxCount) {
        len = maxCount;
      }
      HEAP32[((count)>>2)] = len;
      for (var i = 0; i < len; ++i) {
        var id = GL.shaders.indexOf(result[i]);
        HEAP32[(((shaders)+(i*4))>>2)] = id;
      }
    };
  Module['_glGetAttachedShaders'] = _glGetAttachedShaders;
  var _emscripten_glGetAttachedShaders = _glGetAttachedShaders;
  Module['_emscripten_glGetAttachedShaders'] = _emscripten_glGetAttachedShaders;

  
  /** @suppress {duplicate } */
  var _glGetAttribLocation = (program, name) => {
      return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
    };
  Module['_glGetAttribLocation'] = _glGetAttribLocation;
  var _emscripten_glGetAttribLocation = _glGetAttribLocation;
  Module['_emscripten_glGetAttribLocation'] = _emscripten_glGetAttribLocation;

  var readI53FromI64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAP32[(((ptr)+(4))>>2)] * 4294967296;
    };
  Module['readI53FromI64'] = readI53FromI64;
  
  var readI53FromU64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAPU32[(((ptr)+(4))>>2)] * 4294967296;
    };
  Module['readI53FromU64'] = readI53FromU64;
  var writeI53ToI64 = (ptr, num) => {
      HEAPU32[((ptr)>>2)] = num;
      var lower = HEAPU32[((ptr)>>2)];
      HEAPU32[(((ptr)+(4))>>2)] = (num - lower)/4294967296;
      var deserialized = (num >= 0) ? readI53FromU64(ptr) : readI53FromI64(ptr);
      var offset = ((ptr)>>2);
      if (deserialized != num) warnOnce(`writeI53ToI64() out of range: serialized JS Number ${num} to Wasm heap as bytes lo=${ptrToString(HEAPU32[offset])}, hi=${ptrToString(HEAPU32[offset+1])}, which deserializes back to ${deserialized} instead!`);
    };
  Module['writeI53ToI64'] = writeI53ToI64;
  
  var emscriptenWebGLGet = (name_, p, type) => {
      // Guard against user passing a null pointer.
      // Note that GLES2 spec does not say anything about how passing a null
      // pointer should be treated.  Testing on desktop core GL 3, the application
      // crashes on glGetIntegerv to a null pointer, but better to report an error
      // instead of doing anything random.
      if (!p) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var ret = undefined;
      switch (name_) { // Handle a few trivial GLES values
        case 0x8DFA: // GL_SHADER_COMPILER
          ret = 1;
          break;
        case 0x8DF8: // GL_SHADER_BINARY_FORMATS
          if (type != 0 && type != 1) {
            GL.recordError(0x500); // GL_INVALID_ENUM
          }
          // Do not write anything to the out pointer, since no binary formats are
          // supported.
          return;
        case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
          ret = 0;
          break;
        case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
          // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete
          // since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be
          // queried for length), so implement it ourselves to allow C++ GLES2
          // code get the length.
          var formats = GLctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
          ret = formats ? formats.length : 0;
          break;
  
      }
  
      if (ret === undefined) {
        var result = GLctx.getParameter(name_);
        switch (typeof result) {
          case "number":
            ret = result;
            break;
          case "boolean":
            ret = result ? 1 : 0;
            break;
          case "string":
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          case "object":
            if (result === null) {
              // null is a valid result for some (e.g., which buffer is bound -
              // perhaps nothing is bound), but otherwise can mean an invalid
              // name_, which we need to report as an error
              switch (name_) {
                case 0x8894: // ARRAY_BUFFER_BINDING
                case 0x8B8D: // CURRENT_PROGRAM
                case 0x8895: // ELEMENT_ARRAY_BUFFER_BINDING
                case 0x8CA6: // FRAMEBUFFER_BINDING or DRAW_FRAMEBUFFER_BINDING
                case 0x8CA7: // RENDERBUFFER_BINDING
                case 0x8069: // TEXTURE_BINDING_2D
                case 0x85B5: // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
                case 0x8514: { // TEXTURE_BINDING_CUBE_MAP
                  ret = 0;
                  break;
                }
                default: {
                  GL.recordError(0x500); // GL_INVALID_ENUM
                  return;
                }
              }
            } else if (result instanceof Float32Array ||
                       result instanceof Uint32Array ||
                       result instanceof Int32Array ||
                       result instanceof Array) {
              for (var i = 0; i < result.length; ++i) {
                switch (type) {
                  case 0: HEAP32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 2: HEAPF32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 4: HEAP8[(p)+(i)] = result[i] ? 1 : 0; break;
                }
              }
              return;
            } else {
              try {
                ret = result.name | 0;
              } catch(e) {
                GL.recordError(0x500); // GL_INVALID_ENUM
                err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
                return;
              }
            }
            break;
          default:
            GL.recordError(0x500); // GL_INVALID_ENUM
            err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof(result)}!`);
            return;
        }
      }
  
      switch (type) {
        case 1: writeI53ToI64(p, ret); break;
        case 0: HEAP32[((p)>>2)] = ret; break;
        case 2:   HEAPF32[((p)>>2)] = ret; break;
        case 4: HEAP8[p] = ret ? 1 : 0; break;
      }
    };
  Module['emscriptenWebGLGet'] = emscriptenWebGLGet;
  
  /** @suppress {duplicate } */
  var _glGetBooleanv = (name_, p) => emscriptenWebGLGet(name_, p, 4);
  Module['_glGetBooleanv'] = _glGetBooleanv;
  var _emscripten_glGetBooleanv = _glGetBooleanv;
  Module['_emscripten_glGetBooleanv'] = _emscripten_glGetBooleanv;

  /** @suppress {duplicate } */
  var _glGetBufferParameteriv = (target, value, data) => {
      if (!data) {
        // GLES2 specification does not specify how to behave if data is a null
        // pointer. Since calling this function does not make sense if data ==
        // null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((data)>>2)] = GLctx.getBufferParameter(target, value);
    };
  Module['_glGetBufferParameteriv'] = _glGetBufferParameteriv;
  var _emscripten_glGetBufferParameteriv = _glGetBufferParameteriv;
  Module['_emscripten_glGetBufferParameteriv'] = _emscripten_glGetBufferParameteriv;

  /** @suppress {duplicate } */
  var _glGetError = () => {
      var error = GLctx.getError() || GL.lastError;
      GL.lastError = 0/*GL_NO_ERROR*/;
      return error;
    };
  Module['_glGetError'] = _glGetError;
  var _emscripten_glGetError = _glGetError;
  Module['_emscripten_glGetError'] = _emscripten_glGetError;

  
  /** @suppress {duplicate } */
  var _glGetFloatv = (name_, p) => emscriptenWebGLGet(name_, p, 2);
  Module['_glGetFloatv'] = _glGetFloatv;
  var _emscripten_glGetFloatv = _glGetFloatv;
  Module['_emscripten_glGetFloatv'] = _emscripten_glGetFloatv;

  /** @suppress {duplicate } */
  var _glGetFramebufferAttachmentParameteriv = (target, attachment, pname, params) => {
      var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
      if (result instanceof WebGLRenderbuffer ||
          result instanceof WebGLTexture) {
        result = result.name | 0;
      }
      HEAP32[((params)>>2)] = result;
    };
  Module['_glGetFramebufferAttachmentParameteriv'] = _glGetFramebufferAttachmentParameteriv;
  var _emscripten_glGetFramebufferAttachmentParameteriv = _glGetFramebufferAttachmentParameteriv;
  Module['_emscripten_glGetFramebufferAttachmentParameteriv'] = _emscripten_glGetFramebufferAttachmentParameteriv;

  
  /** @suppress {duplicate } */
  var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);
  Module['_glGetIntegerv'] = _glGetIntegerv;
  var _emscripten_glGetIntegerv = _glGetIntegerv;
  Module['_emscripten_glGetIntegerv'] = _emscripten_glGetIntegerv;

  /** @suppress {duplicate } */
  var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
      var log = GLctx.getProgramInfoLog(GL.programs[program]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };
  Module['_glGetProgramInfoLog'] = _glGetProgramInfoLog;
  var _emscripten_glGetProgramInfoLog = _glGetProgramInfoLog;
  Module['_emscripten_glGetProgramInfoLog'] = _emscripten_glGetProgramInfoLog;

  /** @suppress {duplicate } */
  var _glGetProgramiv = (program, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      if (program >= GL.counter) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      program = GL.programs[program];
  
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getProgramInfoLog(program);
        if (log === null) log = '(unknown error)';
        HEAP32[((p)>>2)] = log.length + 1;
      } else if (pname == 0x8B87 /* GL_ACTIVE_UNIFORM_MAX_LENGTH */) {
        if (!program.maxUniformLength) {
          var numActiveUniforms = GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
          for (var i = 0; i < numActiveUniforms; ++i) {
            program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformLength;
      } else if (pname == 0x8B8A /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */) {
        if (!program.maxAttributeLength) {
          var numActiveAttributes = GLctx.getProgramParameter(program, 0x8B89/*GL_ACTIVE_ATTRIBUTES*/);
          for (var i = 0; i < numActiveAttributes; ++i) {
            program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxAttributeLength;
      } else if (pname == 0x8A35 /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */) {
        if (!program.maxUniformBlockNameLength) {
          var numActiveUniformBlocks = GLctx.getProgramParameter(program, 0x8A36/*GL_ACTIVE_UNIFORM_BLOCKS*/);
          for (var i = 0; i < numActiveUniformBlocks; ++i) {
            program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformBlockNameLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getProgramParameter(program, pname);
      }
    };
  Module['_glGetProgramiv'] = _glGetProgramiv;
  var _emscripten_glGetProgramiv = _glGetProgramiv;
  Module['_emscripten_glGetProgramiv'] = _emscripten_glGetProgramiv;

  
  /** @suppress {duplicate } */
  var _glGetQueryObjecti64vEXT = (id, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var query = GL.queries[id];
      var param;
      {
        param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname);
      }
      var ret;
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0;
      } else {
        ret = param;
      }
      writeI53ToI64(params, ret);
    };
  Module['_glGetQueryObjecti64vEXT'] = _glGetQueryObjecti64vEXT;
  var _emscripten_glGetQueryObjecti64vEXT = _glGetQueryObjecti64vEXT;
  Module['_emscripten_glGetQueryObjecti64vEXT'] = _emscripten_glGetQueryObjecti64vEXT;

  /** @suppress {duplicate } */
  var _glGetQueryObjectivEXT = (id, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var query = GL.queries[id];
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname);
      var ret;
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0;
      } else {
        ret = param;
      }
      HEAP32[((params)>>2)] = ret;
    };
  Module['_glGetQueryObjectivEXT'] = _glGetQueryObjectivEXT;
  var _emscripten_glGetQueryObjectivEXT = _glGetQueryObjectivEXT;
  Module['_emscripten_glGetQueryObjectivEXT'] = _emscripten_glGetQueryObjectivEXT;

  
  /** @suppress {duplicate } */
  var _glGetQueryObjectui64vEXT = _glGetQueryObjecti64vEXT;
  Module['_glGetQueryObjectui64vEXT'] = _glGetQueryObjectui64vEXT;
  var _emscripten_glGetQueryObjectui64vEXT = _glGetQueryObjectui64vEXT;
  Module['_emscripten_glGetQueryObjectui64vEXT'] = _emscripten_glGetQueryObjectui64vEXT;

  
  /** @suppress {duplicate } */
  var _glGetQueryObjectuivEXT = _glGetQueryObjectivEXT;
  Module['_glGetQueryObjectuivEXT'] = _glGetQueryObjectuivEXT;
  var _emscripten_glGetQueryObjectuivEXT = _glGetQueryObjectuivEXT;
  Module['_emscripten_glGetQueryObjectuivEXT'] = _emscripten_glGetQueryObjectuivEXT;

  /** @suppress {duplicate } */
  var _glGetQueryivEXT = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)] = GLctx.disjointTimerQueryExt['getQueryEXT'](target, pname);
    };
  Module['_glGetQueryivEXT'] = _glGetQueryivEXT;
  var _emscripten_glGetQueryivEXT = _glGetQueryivEXT;
  Module['_emscripten_glGetQueryivEXT'] = _emscripten_glGetQueryivEXT;

  /** @suppress {duplicate } */
  var _glGetRenderbufferParameteriv = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if params == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)] = GLctx.getRenderbufferParameter(target, pname);
    };
  Module['_glGetRenderbufferParameteriv'] = _glGetRenderbufferParameteriv;
  var _emscripten_glGetRenderbufferParameteriv = _glGetRenderbufferParameteriv;
  Module['_emscripten_glGetRenderbufferParameteriv'] = _emscripten_glGetRenderbufferParameteriv;

  
  /** @suppress {duplicate } */
  var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };
  Module['_glGetShaderInfoLog'] = _glGetShaderInfoLog;
  var _emscripten_glGetShaderInfoLog = _glGetShaderInfoLog;
  Module['_emscripten_glGetShaderInfoLog'] = _emscripten_glGetShaderInfoLog;

  /** @suppress {duplicate } */
  var _glGetShaderPrecisionFormat = (shaderType, precisionType, range, precision) => {
      var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
      HEAP32[((range)>>2)] = result.rangeMin;
      HEAP32[(((range)+(4))>>2)] = result.rangeMax;
      HEAP32[((precision)>>2)] = result.precision;
    };
  Module['_glGetShaderPrecisionFormat'] = _glGetShaderPrecisionFormat;
  var _emscripten_glGetShaderPrecisionFormat = _glGetShaderPrecisionFormat;
  Module['_emscripten_glGetShaderPrecisionFormat'] = _emscripten_glGetShaderPrecisionFormat;

  /** @suppress {duplicate } */
  var _glGetShaderSource = (shader, bufSize, length, source) => {
      var result = GLctx.getShaderSource(GL.shaders[shader]);
      if (!result) return; // If an error occurs, nothing will be written to length or source.
      var numBytesWrittenExclNull = (bufSize > 0 && source) ? stringToUTF8(result, source, bufSize) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };
  Module['_glGetShaderSource'] = _glGetShaderSource;
  var _emscripten_glGetShaderSource = _glGetShaderSource;
  Module['_emscripten_glGetShaderSource'] = _emscripten_glGetShaderSource;

  /** @suppress {duplicate } */
  var _glGetShaderiv = (shader, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = '(unknown error)';
        // The GLES2 specification says that if the shader has an empty info log,
        // a value of 0 is returned. Otherwise the log has a null char appended.
        // (An empty string is falsey, so we can just check that instead of
        // looking at log.length.)
        var logLength = log ? log.length + 1 : 0;
        HEAP32[((p)>>2)] = logLength;
      } else if (pname == 0x8B88) { // GL_SHADER_SOURCE_LENGTH
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        // source may be a null, or the empty string, both of which are falsey
        // values that we report a 0 length for.
        var sourceLength = source ? source.length + 1 : 0;
        HEAP32[((p)>>2)] = sourceLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getShaderParameter(GL.shaders[shader], pname);
      }
    };
  Module['_glGetShaderiv'] = _glGetShaderiv;
  var _emscripten_glGetShaderiv = _glGetShaderiv;
  Module['_emscripten_glGetShaderiv'] = _emscripten_glGetShaderiv;

  
  
  var webglGetExtensions = function $webglGetExtensions() {
      var exts = getEmscriptenSupportedExtensions(GLctx);
      exts = exts.concat(exts.map((e) => "GL_" + e));
      return exts;
    };
  Module['webglGetExtensions'] = webglGetExtensions;
  
  /** @suppress {duplicate } */
  var _glGetString = (name_) => {
      var ret = GL.stringCache[name_];
      if (!ret) {
        switch (name_) {
          case 0x1F03 /* GL_EXTENSIONS */:
            ret = stringToNewUTF8(webglGetExtensions().join(' '));
            break;
          case 0x1F00 /* GL_VENDOR */:
          case 0x1F01 /* GL_RENDERER */:
          case 0x9245 /* UNMASKED_VENDOR_WEBGL */:
          case 0x9246 /* UNMASKED_RENDERER_WEBGL */:
            var s = GLctx.getParameter(name_);
            if (!s) {
              GL.recordError(0x500/*GL_INVALID_ENUM*/);
            }
            ret = s ? stringToNewUTF8(s) : 0;
            break;
  
          case 0x1F02 /* GL_VERSION */:
            var webGLVersion = GLctx.getParameter(0x1F02 /*GL_VERSION*/);
            // return GLES version string corresponding to the version of the WebGL context
            var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
            ret = stringToNewUTF8(glVersion);
            break;
          case 0x8B8C /* GL_SHADING_LANGUAGE_VERSION */:
            var glslVersion = GLctx.getParameter(0x8B8C /*GL_SHADING_LANGUAGE_VERSION*/);
            // extract the version number 'N.M' from the string 'WebGL GLSL ES N.M ...'
            var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
            var ver_num = glslVersion.match(ver_re);
            if (ver_num !== null) {
              if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + '0'; // ensure minor version has 2 digits
              glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
            }
            ret = stringToNewUTF8(glslVersion);
            break;
          default:
            GL.recordError(0x500/*GL_INVALID_ENUM*/);
            // fall through
        }
        GL.stringCache[name_] = ret;
      }
      return ret;
    };
  Module['_glGetString'] = _glGetString;
  var _emscripten_glGetString = _glGetString;
  Module['_emscripten_glGetString'] = _emscripten_glGetString;

  /** @suppress {duplicate } */
  var _glGetTexParameterfv = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAPF32[((params)>>2)] = GLctx.getTexParameter(target, pname);
    };
  Module['_glGetTexParameterfv'] = _glGetTexParameterfv;
  var _emscripten_glGetTexParameterfv = _glGetTexParameterfv;
  Module['_emscripten_glGetTexParameterfv'] = _emscripten_glGetTexParameterfv;

  /** @suppress {duplicate } */
  var _glGetTexParameteriv = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)] = GLctx.getTexParameter(target, pname);
    };
  Module['_glGetTexParameteriv'] = _glGetTexParameteriv;
  var _emscripten_glGetTexParameteriv = _glGetTexParameteriv;
  Module['_emscripten_glGetTexParameteriv'] = _emscripten_glGetTexParameteriv;

  /** @suppress {checkTypes} */
  var jstoi_q = (str) => parseInt(str);
  Module['jstoi_q'] = jstoi_q;
  
  /** @noinline */
  var webglGetLeftBracePos = (name) => name.slice(-1) == ']' && name.lastIndexOf('[');
  Module['webglGetLeftBracePos'] = webglGetLeftBracePos;
  
  var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
      var uniformLocsById = program.uniformLocsById, // Maps GLuint -> WebGLUniformLocation
        uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, // Maps name -> [uniform array length, GLuint]
        i, j;
  
      // On the first time invocation of glGetUniformLocation on this shader program:
      // initialize cache data structures and discover which uniforms are arrays.
      if (!uniformLocsById) {
        // maps GLint integer locations to WebGLUniformLocations
        program.uniformLocsById = uniformLocsById = {};
        // maps integer locations back to uniform name strings, so that we can lazily fetch uniform array locations
        program.uniformArrayNamesById = {};
  
        var numActiveUniforms = GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
        for (i = 0; i < numActiveUniforms; ++i) {
          var u = GLctx.getActiveUniform(program, i);
          var nm = u.name;
          var sz = u.size;
          var lb = webglGetLeftBracePos(nm);
          var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
  
          // Assign a new location.
          var id = program.uniformIdCounter;
          program.uniformIdCounter += sz;
          // Eagerly get the location of the uniformArray[0] base element.
          // The remaining indices >0 will be left for lazy evaluation to
          // improve performance. Those may never be needed to fetch, if the
          // application fills arrays always in full starting from the first
          // element of the array.
          uniformSizeAndIdsByName[arrayName] = [sz, id];
  
          // Store placeholder integers in place that highlight that these
          // >0 index locations are array indices pending population.
          for (j = 0; j < sz; ++j) {
            uniformLocsById[id] = j;
            program.uniformArrayNamesById[id++] = arrayName;
          }
        }
      }
    };
  Module['webglPrepareUniformLocationsBeforeFirstUse'] = webglPrepareUniformLocationsBeforeFirstUse;
  
  
  
  /** @suppress {duplicate } */
  var _glGetUniformLocation = (program, name) => {
  
      name = UTF8ToString(name);
  
      if (program = GL.programs[program]) {
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var uniformLocsById = program.uniformLocsById; // Maps GLuint -> WebGLUniformLocation
        var arrayIndex = 0;
        var uniformBaseName = name;
  
        // Invariant: when populating integer IDs for uniform locations, we must
        // maintain the precondition that arrays reside in contiguous addresses,
        // i.e. for a 'vec4 colors[10];', colors[4] must be at location
        // colors[0]+4.  However, user might call glGetUniformLocation(program,
        // "colors") for an array, so we cannot discover based on the user input
        // arguments whether the uniform we are dealing with is an array. The only
        // way to discover which uniforms are arrays is to enumerate over all the
        // active uniforms in the program.
        var leftBrace = webglGetLeftBracePos(name);
  
        // If user passed an array accessor "[index]", parse the array index off the accessor.
        if (leftBrace > 0) {
          arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0; // "index]", coerce parseInt(']') with >>>0 to treat "foo[]" as "foo[0]" and foo[-1] as unsigned out-of-bounds.
          uniformBaseName = name.slice(0, leftBrace);
        }
  
        // Have we cached the location of this uniform before?
        // A pair [array length, GLint of the uniform location]
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
  
        // If an uniform with this name exists, and if its index is within the
        // array limits (if it's even an array), query the WebGLlocation, or
        // return an existing cached location.
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
          arrayIndex += sizeAndId[1]; // Add the base location of the uniform to the array index offset.
          if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
            return arrayIndex;
          }
        }
      }
      else {
        // N.b. we are currently unable to distinguish between GL program IDs that
        // never existed vs GL program IDs that have been deleted, so report
        // GL_INVALID_VALUE in both cases.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
      }
      return -1;
    };
  Module['_glGetUniformLocation'] = _glGetUniformLocation;
  var _emscripten_glGetUniformLocation = _glGetUniformLocation;
  Module['_emscripten_glGetUniformLocation'] = _emscripten_glGetUniformLocation;

  var webglGetUniformLocation = (location) => {
      var p = GLctx.currentProgram;
  
      if (p) {
        var webglLoc = p.uniformLocsById[location];
        // p.uniformLocsById[location] stores either an integer, or a
        // WebGLUniformLocation.
        // If an integer, we have not yet bound the location, so do it now. The
        // integer value specifies the array index we should bind to.
        if (typeof webglLoc == 'number') {
          p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ''));
        }
        // Else an already cached WebGLUniformLocation, return it.
        return webglLoc;
      } else {
        GL.recordError(0x502/*GL_INVALID_OPERATION*/);
      }
    };
  Module['webglGetUniformLocation'] = webglGetUniformLocation;
  
  
  /** @suppress{checkTypes} */
  var emscriptenWebGLGetUniform = (program, location, params, type) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null
        // pointer. Since calling this function does not make sense if params ==
        // null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      program = GL.programs[program];
      webglPrepareUniformLocationsBeforeFirstUse(program);
      var data = GLctx.getUniform(program, webglGetUniformLocation(location));
      if (typeof data == 'number' || typeof data == 'boolean') {
        switch (type) {
          case 0: HEAP32[((params)>>2)] = data; break;
          case 2: HEAPF32[((params)>>2)] = data; break;
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          switch (type) {
            case 0: HEAP32[(((params)+(i*4))>>2)] = data[i]; break;
            case 2: HEAPF32[(((params)+(i*4))>>2)] = data[i]; break;
          }
        }
      }
    };
  Module['emscriptenWebGLGetUniform'] = emscriptenWebGLGetUniform;
  
  /** @suppress {duplicate } */
  var _glGetUniformfv = (program, location, params) => {
      emscriptenWebGLGetUniform(program, location, params, 2);
    };
  Module['_glGetUniformfv'] = _glGetUniformfv;
  var _emscripten_glGetUniformfv = _glGetUniformfv;
  Module['_emscripten_glGetUniformfv'] = _emscripten_glGetUniformfv;

  
  /** @suppress {duplicate } */
  var _glGetUniformiv = (program, location, params) => {
      emscriptenWebGLGetUniform(program, location, params, 0);
    };
  Module['_glGetUniformiv'] = _glGetUniformiv;
  var _emscripten_glGetUniformiv = _glGetUniformiv;
  Module['_emscripten_glGetUniformiv'] = _emscripten_glGetUniformiv;

  /** @suppress {duplicate } */
  var _glGetVertexAttribPointerv = (index, pname, pointer) => {
      if (!pointer) {
        // GLES2 specification does not specify how to behave if pointer is a null
        // pointer. Since calling this function does not make sense if pointer ==
        // null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((pointer)>>2)] = GLctx.getVertexAttribOffset(index, pname);
    };
  Module['_glGetVertexAttribPointerv'] = _glGetVertexAttribPointerv;
  var _emscripten_glGetVertexAttribPointerv = _glGetVertexAttribPointerv;
  Module['_emscripten_glGetVertexAttribPointerv'] = _emscripten_glGetVertexAttribPointerv;

  /** @suppress{checkTypes} */
  var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null
        // pointer. Since calling this function does not make sense if params ==
        // null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var data = GLctx.getVertexAttrib(index, pname);
      if (pname == 0x889F/*VERTEX_ATTRIB_ARRAY_BUFFER_BINDING*/) {
        HEAP32[((params)>>2)] = data && data["name"];
      } else if (typeof data == 'number' || typeof data == 'boolean') {
        switch (type) {
          case 0: HEAP32[((params)>>2)] = data; break;
          case 2: HEAPF32[((params)>>2)] = data; break;
          case 5: HEAP32[((params)>>2)] = Math.fround(data); break;
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          switch (type) {
            case 0: HEAP32[(((params)+(i*4))>>2)] = data[i]; break;
            case 2: HEAPF32[(((params)+(i*4))>>2)] = data[i]; break;
            case 5: HEAP32[(((params)+(i*4))>>2)] = Math.fround(data[i]); break;
          }
        }
      }
    };
  Module['emscriptenWebGLGetVertexAttrib'] = emscriptenWebGLGetVertexAttrib;
  
  /** @suppress {duplicate } */
  var _glGetVertexAttribfv = (index, pname, params) => {
      // N.B. This function may only be called if the vertex attribute was
      // specified using the function glVertexAttrib*f(), otherwise the results
      // are undefined. (GLES3 spec 6.1.12)
      emscriptenWebGLGetVertexAttrib(index, pname, params, 2);
    };
  Module['_glGetVertexAttribfv'] = _glGetVertexAttribfv;
  var _emscripten_glGetVertexAttribfv = _glGetVertexAttribfv;
  Module['_emscripten_glGetVertexAttribfv'] = _emscripten_glGetVertexAttribfv;

  
  /** @suppress {duplicate } */
  var _glGetVertexAttribiv = (index, pname, params) => {
      // N.B. This function may only be called if the vertex attribute was
      // specified using the function glVertexAttrib*f(), otherwise the results
      // are undefined. (GLES3 spec 6.1.12)
      emscriptenWebGLGetVertexAttrib(index, pname, params, 5);
    };
  Module['_glGetVertexAttribiv'] = _glGetVertexAttribiv;
  var _emscripten_glGetVertexAttribiv = _glGetVertexAttribiv;
  Module['_emscripten_glGetVertexAttribiv'] = _emscripten_glGetVertexAttribiv;

  /** @suppress {duplicate } */
  var _glHint = (x0, x1) => GLctx.hint(x0, x1);
  Module['_glHint'] = _glHint;
  var _emscripten_glHint = _glHint;
  Module['_emscripten_glHint'] = _emscripten_glHint;

  /** @suppress {duplicate } */
  var _glIsBuffer = (buffer) => {
      var b = GL.buffers[buffer];
      if (!b) return 0;
      return GLctx.isBuffer(b);
    };
  Module['_glIsBuffer'] = _glIsBuffer;
  var _emscripten_glIsBuffer = _glIsBuffer;
  Module['_emscripten_glIsBuffer'] = _emscripten_glIsBuffer;

  /** @suppress {duplicate } */
  var _glIsEnabled = (x0) => GLctx.isEnabled(x0);
  Module['_glIsEnabled'] = _glIsEnabled;
  var _emscripten_glIsEnabled = _glIsEnabled;
  Module['_emscripten_glIsEnabled'] = _emscripten_glIsEnabled;

  /** @suppress {duplicate } */
  var _glIsFramebuffer = (framebuffer) => {
      var fb = GL.framebuffers[framebuffer];
      if (!fb) return 0;
      return GLctx.isFramebuffer(fb);
    };
  Module['_glIsFramebuffer'] = _glIsFramebuffer;
  var _emscripten_glIsFramebuffer = _glIsFramebuffer;
  Module['_emscripten_glIsFramebuffer'] = _emscripten_glIsFramebuffer;

  /** @suppress {duplicate } */
  var _glIsProgram = (program) => {
      program = GL.programs[program];
      if (!program) return 0;
      return GLctx.isProgram(program);
    };
  Module['_glIsProgram'] = _glIsProgram;
  var _emscripten_glIsProgram = _glIsProgram;
  Module['_emscripten_glIsProgram'] = _emscripten_glIsProgram;

  /** @suppress {duplicate } */
  var _glIsQueryEXT = (id) => {
      var query = GL.queries[id];
      if (!query) return 0;
      return GLctx.disjointTimerQueryExt['isQueryEXT'](query);
    };
  Module['_glIsQueryEXT'] = _glIsQueryEXT;
  var _emscripten_glIsQueryEXT = _glIsQueryEXT;
  Module['_emscripten_glIsQueryEXT'] = _emscripten_glIsQueryEXT;

  /** @suppress {duplicate } */
  var _glIsRenderbuffer = (renderbuffer) => {
      var rb = GL.renderbuffers[renderbuffer];
      if (!rb) return 0;
      return GLctx.isRenderbuffer(rb);
    };
  Module['_glIsRenderbuffer'] = _glIsRenderbuffer;
  var _emscripten_glIsRenderbuffer = _glIsRenderbuffer;
  Module['_emscripten_glIsRenderbuffer'] = _emscripten_glIsRenderbuffer;

  /** @suppress {duplicate } */
  var _glIsShader = (shader) => {
      var s = GL.shaders[shader];
      if (!s) return 0;
      return GLctx.isShader(s);
    };
  Module['_glIsShader'] = _glIsShader;
  var _emscripten_glIsShader = _glIsShader;
  Module['_emscripten_glIsShader'] = _emscripten_glIsShader;

  /** @suppress {duplicate } */
  var _glIsTexture = (id) => {
      var texture = GL.textures[id];
      if (!texture) return 0;
      return GLctx.isTexture(texture);
    };
  Module['_glIsTexture'] = _glIsTexture;
  var _emscripten_glIsTexture = _glIsTexture;
  Module['_emscripten_glIsTexture'] = _emscripten_glIsTexture;

  
  /** @suppress {duplicate } */
  var _glIsVertexArray = (array) => {
  
      var vao = GL.vaos[array];
      if (!vao) return 0;
      return GLctx.isVertexArray(vao);
    };
  Module['_glIsVertexArray'] = _glIsVertexArray;
  /** @suppress {duplicate } */
  var _glIsVertexArrayOES = _glIsVertexArray;
  Module['_glIsVertexArrayOES'] = _glIsVertexArrayOES;
  var _emscripten_glIsVertexArrayOES = _glIsVertexArrayOES;
  Module['_emscripten_glIsVertexArrayOES'] = _emscripten_glIsVertexArrayOES;

  /** @suppress {duplicate } */
  var _glLineWidth = (x0) => GLctx.lineWidth(x0);
  Module['_glLineWidth'] = _glLineWidth;
  var _emscripten_glLineWidth = _glLineWidth;
  Module['_emscripten_glLineWidth'] = _emscripten_glLineWidth;

  /** @suppress {duplicate } */
  var _glLinkProgram = (program) => {
      program = GL.programs[program];
      GLctx.linkProgram(program);
      // Invalidate earlier computed uniform->ID mappings, those have now become stale
      program.uniformLocsById = 0; // Mark as null-like so that glGetUniformLocation() knows to populate this again.
      program.uniformSizeAndIdsByName = {};
  
    };
  Module['_glLinkProgram'] = _glLinkProgram;
  var _emscripten_glLinkProgram = _glLinkProgram;
  Module['_emscripten_glLinkProgram'] = _emscripten_glLinkProgram;

  /** @suppress {duplicate } */
  var _glPixelStorei = (pname, param) => {
      if (pname == 3317) {
        GL.unpackAlignment = param;
      } else if (pname == 3314) {
        GL.unpackRowLength = param;
      }
      GLctx.pixelStorei(pname, param);
    };
  Module['_glPixelStorei'] = _glPixelStorei;
  var _emscripten_glPixelStorei = _glPixelStorei;
  Module['_emscripten_glPixelStorei'] = _emscripten_glPixelStorei;

  /** @suppress {duplicate } */
  var _glPolygonModeWEBGL = (face, mode) => {
      GLctx.webglPolygonMode['polygonModeWEBGL'](face, mode);
    };
  Module['_glPolygonModeWEBGL'] = _glPolygonModeWEBGL;
  var _emscripten_glPolygonModeWEBGL = _glPolygonModeWEBGL;
  Module['_emscripten_glPolygonModeWEBGL'] = _emscripten_glPolygonModeWEBGL;

  /** @suppress {duplicate } */
  var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);
  Module['_glPolygonOffset'] = _glPolygonOffset;
  var _emscripten_glPolygonOffset = _glPolygonOffset;
  Module['_emscripten_glPolygonOffset'] = _emscripten_glPolygonOffset;

  /** @suppress {duplicate } */
  var _glPolygonOffsetClampEXT = (factor, units, clamp) => {
      GLctx.extPolygonOffsetClamp['polygonOffsetClampEXT'](factor, units, clamp);
    };
  Module['_glPolygonOffsetClampEXT'] = _glPolygonOffsetClampEXT;
  var _emscripten_glPolygonOffsetClampEXT = _glPolygonOffsetClampEXT;
  Module['_emscripten_glPolygonOffsetClampEXT'] = _emscripten_glPolygonOffsetClampEXT;

  /** @suppress {duplicate } */
  var _glQueryCounterEXT = (id, target) => {
      GLctx.disjointTimerQueryExt['queryCounterEXT'](GL.queries[id], target);
    };
  Module['_glQueryCounterEXT'] = _glQueryCounterEXT;
  var _emscripten_glQueryCounterEXT = _glQueryCounterEXT;
  Module['_emscripten_glQueryCounterEXT'] = _emscripten_glQueryCounterEXT;

  var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
      function roundedToNextMultipleOf(x, y) {
        return (x + y - 1) & -y;
      }
      var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
      var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
      return height * alignedRowSize;
    };
  Module['computeUnpackAlignedImageSize'] = computeUnpackAlignedImageSize;
  
  var colorChannelsInGlTextureFormat = (format) => {
      // Micro-optimizations for size: map format to size by subtracting smallest
      // enum value (0x1902) from all values first.  Also omit the most common
      // size value (1) from the list, which is assumed by formats not on the
      // list.
      var colorChannels = {
        // 0x1902 /* GL_DEPTH_COMPONENT */ - 0x1902: 1,
        // 0x1906 /* GL_ALPHA */ - 0x1902: 1,
        5: 3,
        6: 4,
        // 0x1909 /* GL_LUMINANCE */ - 0x1902: 1,
        8: 2,
        29502: 3,
        29504: 4,
      };
      return colorChannels[format - 0x1902]||1;
    };
  Module['colorChannelsInGlTextureFormat'] = colorChannelsInGlTextureFormat;
  
  var heapObjectForWebGLType = (type) => {
      // Micro-optimization for size: Subtract lowest GL enum number (0x1400/* GL_BYTE */) from type to compare
      // smaller values for the heap, for shorter generated code size.
      // Also the type HEAPU16 is not tested for explicitly, but any unrecognized type will return out HEAPU16.
      // (since most types are HEAPU16)
      type -= 0x1400;
  
      if (type == 1) return HEAPU8;
  
      if (type == 4) return HEAP32;
  
      if (type == 6) return HEAPF32;
  
      if (type == 5
        || type == 28922
        )
        return HEAPU32;
  
      return HEAPU16;
    };
  Module['heapObjectForWebGLType'] = heapObjectForWebGLType;
  
  var toTypedArrayIndex = (pointer, heap) =>
      pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));
  Module['toTypedArrayIndex'] = toTypedArrayIndex;
  
  var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
      var heap = heapObjectForWebGLType(type);
      var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
      var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
      return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
    };
  Module['emscriptenWebGLGetTexPixelData'] = emscriptenWebGLGetTexPixelData;
  
  /** @suppress {duplicate } */
  var _glReadPixels = (x, y, width, height, format, type, pixels) => {
      var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
      if (!pixelData) {
        GL.recordError(0x500/*GL_INVALID_ENUM*/);
        return;
      }
      GLctx.readPixels(x, y, width, height, format, type, pixelData);
    };
  Module['_glReadPixels'] = _glReadPixels;
  var _emscripten_glReadPixels = _glReadPixels;
  Module['_emscripten_glReadPixels'] = _emscripten_glReadPixels;

  /** @suppress {duplicate } */
  var _glReleaseShaderCompiler = () => {
      // NOP (as allowed by GLES 2.0 spec)
    };
  Module['_glReleaseShaderCompiler'] = _glReleaseShaderCompiler;
  var _emscripten_glReleaseShaderCompiler = _glReleaseShaderCompiler;
  Module['_emscripten_glReleaseShaderCompiler'] = _emscripten_glReleaseShaderCompiler;

  /** @suppress {duplicate } */
  var _glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);
  Module['_glRenderbufferStorage'] = _glRenderbufferStorage;
  var _emscripten_glRenderbufferStorage = _glRenderbufferStorage;
  Module['_emscripten_glRenderbufferStorage'] = _emscripten_glRenderbufferStorage;

  /** @suppress {duplicate } */
  var _glSampleCoverage = (value, invert) => {
      GLctx.sampleCoverage(value, !!invert);
    };
  Module['_glSampleCoverage'] = _glSampleCoverage;
  var _emscripten_glSampleCoverage = _glSampleCoverage;
  Module['_emscripten_glSampleCoverage'] = _emscripten_glSampleCoverage;

  /** @suppress {duplicate } */
  var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);
  Module['_glScissor'] = _glScissor;
  var _emscripten_glScissor = _glScissor;
  Module['_emscripten_glScissor'] = _emscripten_glScissor;

  /** @suppress {duplicate } */
  var _glShaderBinary = (count, shaders, binaryformat, binary, length) => {
      GL.recordError(0x500/*GL_INVALID_ENUM*/);
    };
  Module['_glShaderBinary'] = _glShaderBinary;
  var _emscripten_glShaderBinary = _glShaderBinary;
  Module['_emscripten_glShaderBinary'] = _emscripten_glShaderBinary;

  /** @suppress {duplicate } */
  var _glShaderSource = (shader, count, string, length) => {
      var source = GL.getSource(shader, count, string, length);
  
      GLctx.shaderSource(GL.shaders[shader], source);
    };
  Module['_glShaderSource'] = _glShaderSource;
  var _emscripten_glShaderSource = _glShaderSource;
  Module['_emscripten_glShaderSource'] = _emscripten_glShaderSource;

  /** @suppress {duplicate } */
  var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);
  Module['_glStencilFunc'] = _glStencilFunc;
  var _emscripten_glStencilFunc = _glStencilFunc;
  Module['_emscripten_glStencilFunc'] = _emscripten_glStencilFunc;

  /** @suppress {duplicate } */
  var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);
  Module['_glStencilFuncSeparate'] = _glStencilFuncSeparate;
  var _emscripten_glStencilFuncSeparate = _glStencilFuncSeparate;
  Module['_emscripten_glStencilFuncSeparate'] = _emscripten_glStencilFuncSeparate;

  /** @suppress {duplicate } */
  var _glStencilMask = (x0) => GLctx.stencilMask(x0);
  Module['_glStencilMask'] = _glStencilMask;
  var _emscripten_glStencilMask = _glStencilMask;
  Module['_emscripten_glStencilMask'] = _emscripten_glStencilMask;

  /** @suppress {duplicate } */
  var _glStencilMaskSeparate = (x0, x1) => GLctx.stencilMaskSeparate(x0, x1);
  Module['_glStencilMaskSeparate'] = _glStencilMaskSeparate;
  var _emscripten_glStencilMaskSeparate = _glStencilMaskSeparate;
  Module['_emscripten_glStencilMaskSeparate'] = _emscripten_glStencilMaskSeparate;

  /** @suppress {duplicate } */
  var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);
  Module['_glStencilOp'] = _glStencilOp;
  var _emscripten_glStencilOp = _glStencilOp;
  Module['_emscripten_glStencilOp'] = _emscripten_glStencilOp;

  /** @suppress {duplicate } */
  var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);
  Module['_glStencilOpSeparate'] = _glStencilOpSeparate;
  var _emscripten_glStencilOpSeparate = _glStencilOpSeparate;
  Module['_emscripten_glStencilOpSeparate'] = _emscripten_glStencilOpSeparate;

  
  /** @suppress {duplicate } */
  var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
      var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
    };
  Module['_glTexImage2D'] = _glTexImage2D;
  var _emscripten_glTexImage2D = _glTexImage2D;
  Module['_emscripten_glTexImage2D'] = _emscripten_glTexImage2D;

  /** @suppress {duplicate } */
  var _glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);
  Module['_glTexParameterf'] = _glTexParameterf;
  var _emscripten_glTexParameterf = _glTexParameterf;
  Module['_emscripten_glTexParameterf'] = _emscripten_glTexParameterf;

  /** @suppress {duplicate } */
  var _glTexParameterfv = (target, pname, params) => {
      var param = HEAPF32[((params)>>2)];
      GLctx.texParameterf(target, pname, param);
    };
  Module['_glTexParameterfv'] = _glTexParameterfv;
  var _emscripten_glTexParameterfv = _glTexParameterfv;
  Module['_emscripten_glTexParameterfv'] = _emscripten_glTexParameterfv;

  /** @suppress {duplicate } */
  var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);
  Module['_glTexParameteri'] = _glTexParameteri;
  var _emscripten_glTexParameteri = _glTexParameteri;
  Module['_emscripten_glTexParameteri'] = _emscripten_glTexParameteri;

  /** @suppress {duplicate } */
  var _glTexParameteriv = (target, pname, params) => {
      var param = HEAP32[((params)>>2)];
      GLctx.texParameteri(target, pname, param);
    };
  Module['_glTexParameteriv'] = _glTexParameteriv;
  var _emscripten_glTexParameteriv = _glTexParameteriv;
  Module['_emscripten_glTexParameteriv'] = _emscripten_glTexParameteriv;

  
  /** @suppress {duplicate } */
  var _glTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, type, pixels) => {
      var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0) : null;
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
    };
  Module['_glTexSubImage2D'] = _glTexSubImage2D;
  var _emscripten_glTexSubImage2D = _glTexSubImage2D;
  Module['_emscripten_glTexSubImage2D'] = _emscripten_glTexSubImage2D;

  
  /** @suppress {duplicate } */
  var _glUniform1f = (location, v0) => {
      GLctx.uniform1f(webglGetUniformLocation(location), v0);
    };
  Module['_glUniform1f'] = _glUniform1f;
  var _emscripten_glUniform1f = _glUniform1f;
  Module['_emscripten_glUniform1f'] = _emscripten_glUniform1f;

  
  var miniTempWebGLFloatBuffers = [];
  Module['miniTempWebGLFloatBuffers'] = miniTempWebGLFloatBuffers;
  
  /** @suppress {duplicate } */
  var _glUniform1fv = (location, count, value) => {
  
      if (count <= 288) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; ++i) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*4)>>2));
      }
      GLctx.uniform1fv(webglGetUniformLocation(location), view);
    };
  Module['_glUniform1fv'] = _glUniform1fv;
  var _emscripten_glUniform1fv = _glUniform1fv;
  Module['_emscripten_glUniform1fv'] = _emscripten_glUniform1fv;

  
  /** @suppress {duplicate } */
  var _glUniform1i = (location, v0) => {
      GLctx.uniform1i(webglGetUniformLocation(location), v0);
    };
  Module['_glUniform1i'] = _glUniform1i;
  var _emscripten_glUniform1i = _glUniform1i;
  Module['_emscripten_glUniform1i'] = _emscripten_glUniform1i;

  
  var miniTempWebGLIntBuffers = [];
  Module['miniTempWebGLIntBuffers'] = miniTempWebGLIntBuffers;
  
  /** @suppress {duplicate } */
  var _glUniform1iv = (location, count, value) => {
  
      if (count <= 288) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; ++i) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*4)>>2));
      }
      GLctx.uniform1iv(webglGetUniformLocation(location), view);
    };
  Module['_glUniform1iv'] = _glUniform1iv;
  var _emscripten_glUniform1iv = _glUniform1iv;
  Module['_emscripten_glUniform1iv'] = _emscripten_glUniform1iv;

  
  /** @suppress {duplicate } */
  var _glUniform2f = (location, v0, v1) => {
      GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
    };
  Module['_glUniform2f'] = _glUniform2f;
  var _emscripten_glUniform2f = _glUniform2f;
  Module['_emscripten_glUniform2f'] = _emscripten_glUniform2f;

  
  
  /** @suppress {duplicate } */
  var _glUniform2fv = (location, count, value) => {
  
      if (count <= 144) {
        // avoid allocation when uploading few enough uniforms
        count *= 2;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 2) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*8)>>2));
      }
      GLctx.uniform2fv(webglGetUniformLocation(location), view);
    };
  Module['_glUniform2fv'] = _glUniform2fv;
  var _emscripten_glUniform2fv = _glUniform2fv;
  Module['_emscripten_glUniform2fv'] = _emscripten_glUniform2fv;

  
  /** @suppress {duplicate } */
  var _glUniform2i = (location, v0, v1) => {
      GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
    };
  Module['_glUniform2i'] = _glUniform2i;
  var _emscripten_glUniform2i = _glUniform2i;
  Module['_emscripten_glUniform2i'] = _emscripten_glUniform2i;

  
  
  /** @suppress {duplicate } */
  var _glUniform2iv = (location, count, value) => {
  
      if (count <= 144) {
        // avoid allocation when uploading few enough uniforms
        count *= 2;
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; i += 2) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
          view[i+1] = HEAP32[(((value)+(4*i+4))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*8)>>2));
      }
      GLctx.uniform2iv(webglGetUniformLocation(location), view);
    };
  Module['_glUniform2iv'] = _glUniform2iv;
  var _emscripten_glUniform2iv = _glUniform2iv;
  Module['_emscripten_glUniform2iv'] = _emscripten_glUniform2iv;

  
  /** @suppress {duplicate } */
  var _glUniform3f = (location, v0, v1, v2) => {
      GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
    };
  Module['_glUniform3f'] = _glUniform3f;
  var _emscripten_glUniform3f = _glUniform3f;
  Module['_emscripten_glUniform3f'] = _emscripten_glUniform3f;

  
  
  /** @suppress {duplicate } */
  var _glUniform3fv = (location, count, value) => {
  
      if (count <= 96) {
        // avoid allocation when uploading few enough uniforms
        count *= 3;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 3) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*12)>>2));
      }
      GLctx.uniform3fv(webglGetUniformLocation(location), view);
    };
  Module['_glUniform3fv'] = _glUniform3fv;
  var _emscripten_glUniform3fv = _glUniform3fv;
  Module['_emscripten_glUniform3fv'] = _emscripten_glUniform3fv;

  
  /** @suppress {duplicate } */
  var _glUniform3i = (location, v0, v1, v2) => {
      GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
    };
  Module['_glUniform3i'] = _glUniform3i;
  var _emscripten_glUniform3i = _glUniform3i;
  Module['_emscripten_glUniform3i'] = _emscripten_glUniform3i;

  
  
  /** @suppress {duplicate } */
  var _glUniform3iv = (location, count, value) => {
  
      if (count <= 96) {
        // avoid allocation when uploading few enough uniforms
        count *= 3;
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; i += 3) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
          view[i+1] = HEAP32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAP32[(((value)+(4*i+8))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*12)>>2));
      }
      GLctx.uniform3iv(webglGetUniformLocation(location), view);
    };
  Module['_glUniform3iv'] = _glUniform3iv;
  var _emscripten_glUniform3iv = _glUniform3iv;
  Module['_emscripten_glUniform3iv'] = _emscripten_glUniform3iv;

  
  /** @suppress {duplicate } */
  var _glUniform4f = (location, v0, v1, v2, v3) => {
      GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
    };
  Module['_glUniform4f'] = _glUniform4f;
  var _emscripten_glUniform4f = _glUniform4f;
  Module['_emscripten_glUniform4f'] = _emscripten_glUniform4f;

  
  
  /** @suppress {duplicate } */
  var _glUniform4fv = (location, count, value) => {
  
      if (count <= 72) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[4*count];
        // hoist the heap out of the loop for size and for pthreads+growth.
        var heap = HEAPF32;
        value = ((value)>>2);
        count *= 4;
        for (var i = 0; i < count; i += 4) {
          var dst = value + i;
          view[i] = heap[dst];
          view[i + 1] = heap[dst + 1];
          view[i + 2] = heap[dst + 2];
          view[i + 3] = heap[dst + 3];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*16)>>2));
      }
      GLctx.uniform4fv(webglGetUniformLocation(location), view);
    };
  Module['_glUniform4fv'] = _glUniform4fv;
  var _emscripten_glUniform4fv = _glUniform4fv;
  Module['_emscripten_glUniform4fv'] = _emscripten_glUniform4fv;

  
  /** @suppress {duplicate } */
  var _glUniform4i = (location, v0, v1, v2, v3) => {
      GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
    };
  Module['_glUniform4i'] = _glUniform4i;
  var _emscripten_glUniform4i = _glUniform4i;
  Module['_emscripten_glUniform4i'] = _emscripten_glUniform4i;

  
  
  /** @suppress {duplicate } */
  var _glUniform4iv = (location, count, value) => {
  
      if (count <= 72) {
        // avoid allocation when uploading few enough uniforms
        count *= 4;
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; i += 4) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
          view[i+1] = HEAP32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAP32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAP32[(((value)+(4*i+12))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*16)>>2));
      }
      GLctx.uniform4iv(webglGetUniformLocation(location), view);
    };
  Module['_glUniform4iv'] = _glUniform4iv;
  var _emscripten_glUniform4iv = _glUniform4iv;
  Module['_emscripten_glUniform4iv'] = _emscripten_glUniform4iv;

  
  
  /** @suppress {duplicate } */
  var _glUniformMatrix2fv = (location, count, transpose, value) => {
  
      if (count <= 72) {
        // avoid allocation when uploading few enough uniforms
        count *= 4;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 4) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAPF32[(((value)+(4*i+12))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*16)>>2));
      }
      GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view);
    };
  Module['_glUniformMatrix2fv'] = _glUniformMatrix2fv;
  var _emscripten_glUniformMatrix2fv = _glUniformMatrix2fv;
  Module['_emscripten_glUniformMatrix2fv'] = _emscripten_glUniformMatrix2fv;

  
  
  /** @suppress {duplicate } */
  var _glUniformMatrix3fv = (location, count, transpose, value) => {
  
      if (count <= 32) {
        // avoid allocation when uploading few enough uniforms
        count *= 9;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 9) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAPF32[(((value)+(4*i+12))>>2)];
          view[i+4] = HEAPF32[(((value)+(4*i+16))>>2)];
          view[i+5] = HEAPF32[(((value)+(4*i+20))>>2)];
          view[i+6] = HEAPF32[(((value)+(4*i+24))>>2)];
          view[i+7] = HEAPF32[(((value)+(4*i+28))>>2)];
          view[i+8] = HEAPF32[(((value)+(4*i+32))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*36)>>2));
      }
      GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
    };
  Module['_glUniformMatrix3fv'] = _glUniformMatrix3fv;
  var _emscripten_glUniformMatrix3fv = _glUniformMatrix3fv;
  Module['_emscripten_glUniformMatrix3fv'] = _emscripten_glUniformMatrix3fv;

  
  
  /** @suppress {duplicate } */
  var _glUniformMatrix4fv = (location, count, transpose, value) => {
  
      if (count <= 18) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[16*count];
        // hoist the heap out of the loop for size and for pthreads+growth.
        var heap = HEAPF32;
        value = ((value)>>2);
        count *= 16;
        for (var i = 0; i < count; i += 16) {
          var dst = value + i;
          view[i] = heap[dst];
          view[i + 1] = heap[dst + 1];
          view[i + 2] = heap[dst + 2];
          view[i + 3] = heap[dst + 3];
          view[i + 4] = heap[dst + 4];
          view[i + 5] = heap[dst + 5];
          view[i + 6] = heap[dst + 6];
          view[i + 7] = heap[dst + 7];
          view[i + 8] = heap[dst + 8];
          view[i + 9] = heap[dst + 9];
          view[i + 10] = heap[dst + 10];
          view[i + 11] = heap[dst + 11];
          view[i + 12] = heap[dst + 12];
          view[i + 13] = heap[dst + 13];
          view[i + 14] = heap[dst + 14];
          view[i + 15] = heap[dst + 15];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*64)>>2));
      }
      GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
    };
  Module['_glUniformMatrix4fv'] = _glUniformMatrix4fv;
  var _emscripten_glUniformMatrix4fv = _glUniformMatrix4fv;
  Module['_emscripten_glUniformMatrix4fv'] = _emscripten_glUniformMatrix4fv;

  /** @suppress {duplicate } */
  var _glUseProgram = (program) => {
      program = GL.programs[program];
      GLctx.useProgram(program);
      // Record the currently active program so that we can access the uniform
      // mapping table of that program.
      GLctx.currentProgram = program;
    };
  Module['_glUseProgram'] = _glUseProgram;
  var _emscripten_glUseProgram = _glUseProgram;
  Module['_emscripten_glUseProgram'] = _emscripten_glUseProgram;

  /** @suppress {duplicate } */
  var _glValidateProgram = (program) => {
      GLctx.validateProgram(GL.programs[program]);
    };
  Module['_glValidateProgram'] = _glValidateProgram;
  var _emscripten_glValidateProgram = _glValidateProgram;
  Module['_emscripten_glValidateProgram'] = _emscripten_glValidateProgram;

  /** @suppress {duplicate } */
  var _glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);
  Module['_glVertexAttrib1f'] = _glVertexAttrib1f;
  var _emscripten_glVertexAttrib1f = _glVertexAttrib1f;
  Module['_emscripten_glVertexAttrib1f'] = _emscripten_glVertexAttrib1f;

  /** @suppress {duplicate } */
  var _glVertexAttrib1fv = (index, v) => {
  
      GLctx.vertexAttrib1f(index, HEAPF32[v>>2]);
    };
  Module['_glVertexAttrib1fv'] = _glVertexAttrib1fv;
  var _emscripten_glVertexAttrib1fv = _glVertexAttrib1fv;
  Module['_emscripten_glVertexAttrib1fv'] = _emscripten_glVertexAttrib1fv;

  /** @suppress {duplicate } */
  var _glVertexAttrib2f = (x0, x1, x2) => GLctx.vertexAttrib2f(x0, x1, x2);
  Module['_glVertexAttrib2f'] = _glVertexAttrib2f;
  var _emscripten_glVertexAttrib2f = _glVertexAttrib2f;
  Module['_emscripten_glVertexAttrib2f'] = _emscripten_glVertexAttrib2f;

  /** @suppress {duplicate } */
  var _glVertexAttrib2fv = (index, v) => {
  
      GLctx.vertexAttrib2f(index, HEAPF32[v>>2], HEAPF32[v+4>>2]);
    };
  Module['_glVertexAttrib2fv'] = _glVertexAttrib2fv;
  var _emscripten_glVertexAttrib2fv = _glVertexAttrib2fv;
  Module['_emscripten_glVertexAttrib2fv'] = _emscripten_glVertexAttrib2fv;

  /** @suppress {duplicate } */
  var _glVertexAttrib3f = (x0, x1, x2, x3) => GLctx.vertexAttrib3f(x0, x1, x2, x3);
  Module['_glVertexAttrib3f'] = _glVertexAttrib3f;
  var _emscripten_glVertexAttrib3f = _glVertexAttrib3f;
  Module['_emscripten_glVertexAttrib3f'] = _emscripten_glVertexAttrib3f;

  /** @suppress {duplicate } */
  var _glVertexAttrib3fv = (index, v) => {
  
      GLctx.vertexAttrib3f(index, HEAPF32[v>>2], HEAPF32[v+4>>2], HEAPF32[v+8>>2]);
    };
  Module['_glVertexAttrib3fv'] = _glVertexAttrib3fv;
  var _emscripten_glVertexAttrib3fv = _glVertexAttrib3fv;
  Module['_emscripten_glVertexAttrib3fv'] = _emscripten_glVertexAttrib3fv;

  /** @suppress {duplicate } */
  var _glVertexAttrib4f = (x0, x1, x2, x3, x4) => GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);
  Module['_glVertexAttrib4f'] = _glVertexAttrib4f;
  var _emscripten_glVertexAttrib4f = _glVertexAttrib4f;
  Module['_emscripten_glVertexAttrib4f'] = _emscripten_glVertexAttrib4f;

  /** @suppress {duplicate } */
  var _glVertexAttrib4fv = (index, v) => {
  
      GLctx.vertexAttrib4f(index, HEAPF32[v>>2], HEAPF32[v+4>>2], HEAPF32[v+8>>2], HEAPF32[v+12>>2]);
    };
  Module['_glVertexAttrib4fv'] = _glVertexAttrib4fv;
  var _emscripten_glVertexAttrib4fv = _glVertexAttrib4fv;
  Module['_emscripten_glVertexAttrib4fv'] = _emscripten_glVertexAttrib4fv;

  
  /** @suppress {duplicate } */
  var _glVertexAttribDivisor = (index, divisor) => {
      GLctx.vertexAttribDivisor(index, divisor);
    };
  Module['_glVertexAttribDivisor'] = _glVertexAttribDivisor;
  /** @suppress {duplicate } */
  var _glVertexAttribDivisorANGLE = _glVertexAttribDivisor;
  Module['_glVertexAttribDivisorANGLE'] = _glVertexAttribDivisorANGLE;
  var _emscripten_glVertexAttribDivisorANGLE = _glVertexAttribDivisorANGLE;
  Module['_emscripten_glVertexAttribDivisorANGLE'] = _emscripten_glVertexAttribDivisorANGLE;

  /** @suppress {duplicate } */
  var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    };
  Module['_glVertexAttribPointer'] = _glVertexAttribPointer;
  var _emscripten_glVertexAttribPointer = _glVertexAttribPointer;
  Module['_emscripten_glVertexAttribPointer'] = _emscripten_glVertexAttribPointer;

  /** @suppress {duplicate } */
  var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);
  Module['_glViewport'] = _glViewport;
  var _emscripten_glViewport = _glViewport;
  Module['_emscripten_glViewport'] = _emscripten_glViewport;

  var _emscripten_has_asyncify = () => 0;
  Module['_emscripten_has_asyncify'] = _emscripten_has_asyncify;

  
  
  
  
  
  
  
  var doRequestFullscreen = (target, strategy) => {
      if (!JSEvents.fullscreenEnabled()) return -1;
      target = findEventTarget(target);
      if (!target) return -4;
  
      if (!target.requestFullscreen
        && !target.webkitRequestFullscreen
        ) {
        return -3;
      }
  
      // Queue this function call if we're not currently in an event handler and
      // the user saw it appropriate to do so.
      if (!JSEvents.canPerformEventHandlerRequests()) {
        if (strategy.deferUntilInEventHandler) {
          JSEvents.deferCall(JSEvents_requestFullscreen, 1 /* priority over pointer lock */, [target, strategy]);
          return 1;
        }
        return -2;
      }
  
      return JSEvents_requestFullscreen(target, strategy);
    };
  Module['doRequestFullscreen'] = doRequestFullscreen;
  
  
  var _emscripten_request_fullscreen_strategy = (target, deferUntilInEventHandler, fullscreenStrategy) => {
      var strategy = {
        scaleMode: HEAP32[((fullscreenStrategy)>>2)],
        canvasResolutionScaleMode: HEAP32[(((fullscreenStrategy)+(4))>>2)],
        filteringMode: HEAP32[(((fullscreenStrategy)+(8))>>2)],
        deferUntilInEventHandler,
        canvasResizedCallback: HEAP32[(((fullscreenStrategy)+(12))>>2)],
        canvasResizedCallbackUserData: HEAP32[(((fullscreenStrategy)+(16))>>2)]
      };
  
      return doRequestFullscreen(target, strategy);
    };
  Module['_emscripten_request_fullscreen_strategy'] = _emscripten_request_fullscreen_strategy;

  
  
  var _emscripten_request_pointerlock = (target, deferUntilInEventHandler) => {
      target = findEventTarget(target);
      if (!target) return -4;
      if (!target.requestPointerLock
        ) {
        return -1;
      }
  
      // Queue this function call if we're not currently in an event handler and
      // the user saw it appropriate to do so.
      if (!JSEvents.canPerformEventHandlerRequests()) {
        if (deferUntilInEventHandler) {
          JSEvents.deferCall(requestPointerLock, 2 /* priority below fullscreen */, [target]);
          return 1;
        }
        return -2;
      }
  
      return requestPointerLock(target);
    };
  Module['_emscripten_request_pointerlock'] = _emscripten_request_pointerlock;

  
  
  var abortOnCannotGrowMemory = (requestedSize) => {
      abort(`Cannot enlarge memory arrays to size ${requestedSize} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${HEAP8.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
    };
  Module['abortOnCannotGrowMemory'] = abortOnCannotGrowMemory;
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      abortOnCannotGrowMemory(requestedSize);
    };
  Module['_emscripten_resize_heap'] = _emscripten_resize_heap;

  var _emscripten_run_script = (ptr) => {
      eval(UTF8ToString(ptr));
    };
  Module['_emscripten_run_script'] = _emscripten_run_script;

  /** @suppress {checkTypes} */
  var _emscripten_sample_gamepad_data = () => {
      try {
        if (navigator.getGamepads) return (JSEvents.lastGamepadState = navigator.getGamepads())
          ? 0 : -1;
      } catch(e) {
        err(`navigator.getGamepads() exists, but failed to execute with exception ${e}. Disabling Gamepad access.`);
        navigator.getGamepads = null; // Disable getGamepads() so that it won't be attempted to be used again.
      }
      return -1;
    };
  Module['_emscripten_sample_gamepad_data'] = _emscripten_sample_gamepad_data;

  
  
  
  var registerBeforeUnloadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString) => {
      var beforeUnloadEventHandlerFunc = (e = event) => {
        // Note: This is always called on the main browser thread, since it needs synchronously return a value!
        var confirmationMessage = getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData);
  
        if (confirmationMessage) {
          confirmationMessage = UTF8ToString(confirmationMessage);
        }
        if (confirmationMessage) {
          e.preventDefault();
          e.returnValue = confirmationMessage;
          return confirmationMessage;
        }
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: beforeUnloadEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  Module['registerBeforeUnloadEventCallback'] = registerBeforeUnloadEventCallback;
  var _emscripten_set_beforeunload_callback_on_thread = (userData, callbackfunc, targetThread) => {
      if (typeof onbeforeunload == 'undefined') return -1;
      // beforeunload callback can only be registered on the main browser thread, because the page will go away immediately after returning from the handler,
      // and there is no time to start proxying it anywhere.
      if (targetThread !== 1) return -5;
      return registerBeforeUnloadEventCallback(2, userData, true, callbackfunc, 28, "beforeunload");
    };
  Module['_emscripten_set_beforeunload_callback_on_thread'] = _emscripten_set_beforeunload_callback_on_thread;

  
  
  
  
  var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.focusEvent ||= _malloc(256);
  
      var focusEventHandlerFunc = (e = event) => {
        var nodeName = JSEvents.getNodeNameForTarget(e.target);
        var id = e.target.id ? e.target.id : '';
  
        var focusEvent = JSEvents.focusEvent;
        stringToUTF8(nodeName, focusEvent + 0, 128);
        stringToUTF8(id, focusEvent + 128, 128);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: focusEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  Module['registerFocusEventCallback'] = registerFocusEventCallback;
  var _emscripten_set_blur_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);
  Module['_emscripten_set_blur_callback_on_thread'] = _emscripten_set_blur_callback_on_thread;


  
  var _emscripten_set_element_css_size = (target, width, height) => {
      target = findEventTarget(target);
      if (!target) return -4;
  
      target.style.width = width + "px";
      target.style.height = height + "px";
  
      return 0;
    };
  Module['_emscripten_set_element_css_size'] = _emscripten_set_element_css_size;

  var _emscripten_set_focus_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);
  Module['_emscripten_set_focus_callback_on_thread'] = _emscripten_set_focus_callback_on_thread;

  
  
  
  var fillFullscreenChangeEventData = (eventStruct) => {
      var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      var isFullscreen = !!fullscreenElement;
      // Assigning a boolean to HEAP32 with expected type coercion.
      /** @suppress{checkTypes} */
      HEAP8[eventStruct] = isFullscreen;
      HEAP8[(eventStruct)+(1)] = JSEvents.fullscreenEnabled();
      // If transitioning to fullscreen, report info about the element that is now fullscreen.
      // If transitioning to windowed mode, report info about the element that just was fullscreen.
      var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
      var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
      var id = reportedElement?.id || '';
      stringToUTF8(nodeName, eventStruct + 2, 128);
      stringToUTF8(id, eventStruct + 130, 128);
      HEAP32[(((eventStruct)+(260))>>2)] = reportedElement ? reportedElement.clientWidth : 0;
      HEAP32[(((eventStruct)+(264))>>2)] = reportedElement ? reportedElement.clientHeight : 0;
      HEAP32[(((eventStruct)+(268))>>2)] = screen.width;
      HEAP32[(((eventStruct)+(272))>>2)] = screen.height;
      if (isFullscreen) {
        JSEvents.previousFullscreenElement = fullscreenElement;
      }
    };
  Module['fillFullscreenChangeEventData'] = fillFullscreenChangeEventData;
  
  
  
  var registerFullscreenChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.fullscreenChangeEvent ||= _malloc(276);
  
      var fullscreenChangeEventhandlerFunc = (e = event) => {
        var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent;
  
        fillFullscreenChangeEventData(fullscreenChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, fullscreenChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: fullscreenChangeEventhandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  Module['registerFullscreenChangeEventCallback'] = registerFullscreenChangeEventCallback;
  
  
  var _emscripten_set_fullscreenchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      if (!JSEvents.fullscreenEnabled()) return -1;
      target = findEventTarget(target);
      if (!target) return -4;
  
      // Unprefixed Fullscreen API shipped in Chromium 71 (https://bugs.chromium.org/p/chromium/issues/detail?id=383813)
      // As of Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitfullscreenchange. TODO: revisit this check once Safari ships unprefixed version.
      registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "webkitfullscreenchange", targetThread);
  
      return registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "fullscreenchange", targetThread);
    };
  Module['_emscripten_set_fullscreenchange_callback_on_thread'] = _emscripten_set_fullscreenchange_callback_on_thread;

  
  
  
  
  var registerGamepadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.gamepadEvent ||= _malloc(1240);
  
      var gamepadEventHandlerFunc = (e = event) => {
        var gamepadEvent = JSEvents.gamepadEvent;
        fillGamepadEventData(gamepadEvent, e["gamepad"]);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, gamepadEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        allowsDeferredCalls: true,
        eventTypeString,
        callbackfunc,
        handlerFunc: gamepadEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  Module['registerGamepadEventCallback'] = registerGamepadEventCallback;
  
  var _emscripten_set_gamepadconnected_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
      if (_emscripten_sample_gamepad_data()) return -1;
      return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 26, "gamepadconnected", targetThread);
    };
  Module['_emscripten_set_gamepadconnected_callback_on_thread'] = _emscripten_set_gamepadconnected_callback_on_thread;

  
  var _emscripten_set_gamepaddisconnected_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
      if (_emscripten_sample_gamepad_data()) return -1;
      return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 27, "gamepaddisconnected", targetThread);
    };
  Module['_emscripten_set_gamepaddisconnected_callback_on_thread'] = _emscripten_set_gamepaddisconnected_callback_on_thread;

  
  
  
  
  var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.keyEvent ||= _malloc(160);
  
      var keyEventHandlerFunc = (e) => {
        assert(e);
  
        var keyEventData = JSEvents.keyEvent;
        HEAPF64[((keyEventData)>>3)] = e.timeStamp;
  
        var idx = ((keyEventData)>>2);
  
        HEAP32[idx + 2] = e.location;
        HEAP8[keyEventData + 12] = e.ctrlKey;
        HEAP8[keyEventData + 13] = e.shiftKey;
        HEAP8[keyEventData + 14] = e.altKey;
        HEAP8[keyEventData + 15] = e.metaKey;
        HEAP8[keyEventData + 16] = e.repeat;
        HEAP32[idx + 5] = e.charCode;
        HEAP32[idx + 6] = e.keyCode;
        HEAP32[idx + 7] = e.which;
        stringToUTF8(e.key || '', keyEventData + 32, 32);
        stringToUTF8(e.code || '', keyEventData + 64, 32);
        stringToUTF8(e.char || '', keyEventData + 96, 32);
        stringToUTF8(e.locale || '', keyEventData + 128, 32);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  Module['registerKeyEventCallback'] = registerKeyEventCallback;
  var _emscripten_set_keydown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);
  Module['_emscripten_set_keydown_callback_on_thread'] = _emscripten_set_keydown_callback_on_thread;

  var _emscripten_set_keypress_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);
  Module['_emscripten_set_keypress_callback_on_thread'] = _emscripten_set_keypress_callback_on_thread;

  var _emscripten_set_keyup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);
  Module['_emscripten_set_keyup_callback_on_thread'] = _emscripten_set_keyup_callback_on_thread;

  
  var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
      var iterFunc = getWasmTableEntry(func);
      setMainLoop(iterFunc, fps, simulateInfiniteLoop);
    };
  Module['_emscripten_set_main_loop'] = _emscripten_set_main_loop;

  
  
  
  var fillMouseEventData = (eventStruct, e, target) => {
      assert(eventStruct % 4 == 0);
      HEAPF64[((eventStruct)>>3)] = e.timeStamp;
      var idx = ((eventStruct)>>2);
      HEAP32[idx + 2] = e.screenX;
      HEAP32[idx + 3] = e.screenY;
      HEAP32[idx + 4] = e.clientX;
      HEAP32[idx + 5] = e.clientY;
      HEAP8[eventStruct + 24] = e.ctrlKey;
      HEAP8[eventStruct + 25] = e.shiftKey;
      HEAP8[eventStruct + 26] = e.altKey;
      HEAP8[eventStruct + 27] = e.metaKey;
      HEAP16[idx*2 + 14] = e.button;
      HEAP16[idx*2 + 15] = e.buttons;
  
      HEAP32[idx + 8] = e["movementX"]
        ;
  
      HEAP32[idx + 9] = e["movementY"]
        ;
  
      // Note: rect contains doubles (truncated to placate SAFE_HEAP, which is the same behaviour when writing to HEAP32 anyway)
      var rect = getBoundingClientRect(target);
      HEAP32[idx + 10] = e.clientX - (rect.left | 0);
      HEAP32[idx + 11] = e.clientY - (rect.top  | 0);
  
    };
  Module['fillMouseEventData'] = fillMouseEventData;
  
  
  
  var registerMouseEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.mouseEvent ||= _malloc(64);
      target = findEventTarget(target);
  
      var mouseEventHandlerFunc = (e = event) => {
        // TODO: Make this access thread safe, or this could update live while app is reading it.
        fillMouseEventData(JSEvents.mouseEvent, e, target);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString != 'mousemove' && eventTypeString != 'mouseenter' && eventTypeString != 'mouseleave', // Mouse move events do not allow fullscreen/pointer lock requests to be handled in them!
        eventTypeString,
        callbackfunc,
        handlerFunc: mouseEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  Module['registerMouseEventCallback'] = registerMouseEventCallback;
  var _emscripten_set_mousedown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);
  Module['_emscripten_set_mousedown_callback_on_thread'] = _emscripten_set_mousedown_callback_on_thread;

  var _emscripten_set_mouseenter_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, "mouseenter", targetThread);
  Module['_emscripten_set_mouseenter_callback_on_thread'] = _emscripten_set_mouseenter_callback_on_thread;

  var _emscripten_set_mouseleave_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, "mouseleave", targetThread);
  Module['_emscripten_set_mouseleave_callback_on_thread'] = _emscripten_set_mouseleave_callback_on_thread;

  var _emscripten_set_mousemove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);
  Module['_emscripten_set_mousemove_callback_on_thread'] = _emscripten_set_mousemove_callback_on_thread;

  var _emscripten_set_mouseup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);
  Module['_emscripten_set_mouseup_callback_on_thread'] = _emscripten_set_mouseup_callback_on_thread;

  
  
  
  var fillPointerlockChangeEventData = (eventStruct) => {
      var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
      var isPointerlocked = !!pointerLockElement;
      // Assigning a boolean to HEAP32 with expected type coercion.
      /** @suppress{checkTypes} */
      HEAP8[eventStruct] = isPointerlocked;
      var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
      var id = pointerLockElement?.id || '';
      stringToUTF8(nodeName, eventStruct + 1, 128);
      stringToUTF8(id, eventStruct + 129, 128);
    };
  Module['fillPointerlockChangeEventData'] = fillPointerlockChangeEventData;
  
  
  
  var registerPointerlockChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.pointerlockChangeEvent ||= _malloc(257);
  
      var pointerlockChangeEventHandlerFunc = (e = event) => {
        var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
        fillPointerlockChangeEventData(pointerlockChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: pointerlockChangeEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  Module['registerPointerlockChangeEventCallback'] = registerPointerlockChangeEventCallback;
  
  
  /** @suppress {missingProperties} */
  var _emscripten_set_pointerlockchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      // TODO: Currently not supported in pthreads or in --proxy-to-worker mode. (In pthreads mode, document object is not defined)
      if (!document || !document.body || (!document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock)) {
        return -1;
      }
  
      target = findEventTarget(target);
      if (!target) return -4;
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mozpointerlockchange", targetThread);
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "webkitpointerlockchange", targetThread);
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mspointerlockchange", targetThread);
      return registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread);
    };
  Module['_emscripten_set_pointerlockchange_callback_on_thread'] = _emscripten_set_pointerlockchange_callback_on_thread;

  
  
  
  var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.uiEvent ||= _malloc(36);
  
      target = findEventTarget(target);
  
      var uiEventHandlerFunc = (e = event) => {
        if (e.target != target) {
          // Never take ui events such as scroll via a 'bubbled' route, but always from the direct element that
          // was targeted. Otherwise e.g. if app logs a message in response to a page scroll, the Emscripten log
          // message box could cause to scroll, generating a new (bubbled) scroll message, causing a new log print,
          // causing a new scroll, etc..
          return;
        }
        var b = document.body; // Take document.body to a variable, Closure compiler does not outline access to it on its own.
        if (!b) {
          // During a page unload 'body' can be null, with "Cannot read property 'clientWidth' of null" being thrown
          return;
        }
        var uiEvent = JSEvents.uiEvent;
        HEAP32[((uiEvent)>>2)] = 0; // always zero for resize and scroll
        HEAP32[(((uiEvent)+(4))>>2)] = b.clientWidth;
        HEAP32[(((uiEvent)+(8))>>2)] = b.clientHeight;
        HEAP32[(((uiEvent)+(12))>>2)] = innerWidth;
        HEAP32[(((uiEvent)+(16))>>2)] = innerHeight;
        HEAP32[(((uiEvent)+(20))>>2)] = outerWidth;
        HEAP32[(((uiEvent)+(24))>>2)] = outerHeight;
        HEAP32[(((uiEvent)+(28))>>2)] = pageXOffset | 0; // scroll offsets are float
        HEAP32[(((uiEvent)+(32))>>2)] = pageYOffset | 0;
        if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: uiEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  Module['registerUiEventCallback'] = registerUiEventCallback;
  var _emscripten_set_resize_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);
  Module['_emscripten_set_resize_callback_on_thread'] = _emscripten_set_resize_callback_on_thread;

  
  var _emscripten_set_timeout = (cb, msecs, userData) =>
      safeSetTimeout(() => getWasmTableEntry(cb)(userData), msecs);
  Module['_emscripten_set_timeout'] = _emscripten_set_timeout;

  
  
  
  
  var registerTouchEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.touchEvent ||= _malloc(1552);
  
      target = findEventTarget(target);
  
      var touchEventHandlerFunc = (e) => {
        assert(e);
        var t, touches = {}, et = e.touches;
        // To ease marshalling different kinds of touches that browser reports (all touches are listed in e.touches,
        // only changed touches in e.changedTouches, and touches on target at a.targetTouches), mark a boolean in
        // each Touch object so that we can later loop only once over all touches we see to marshall over to Wasm.
  
        for (let t of et) {
          // Browser might recycle the generated Touch objects between each frame (Firefox on Android), so reset any
          // changed/target states we may have set from previous frame.
          t.isChanged = t.onTarget = 0;
          touches[t.identifier] = t;
        }
        // Mark which touches are part of the changedTouches list.
        for (let t of e.changedTouches) {
          t.isChanged = 1;
          touches[t.identifier] = t;
        }
        // Mark which touches are part of the targetTouches list.
        for (let t of e.targetTouches) {
          touches[t.identifier].onTarget = 1;
        }
  
        var touchEvent = JSEvents.touchEvent;
        HEAPF64[((touchEvent)>>3)] = e.timeStamp;
        HEAP8[touchEvent + 12] = e.ctrlKey;
        HEAP8[touchEvent + 13] = e.shiftKey;
        HEAP8[touchEvent + 14] = e.altKey;
        HEAP8[touchEvent + 15] = e.metaKey;
        var idx = touchEvent + 16;
        var targetRect = getBoundingClientRect(target);
        var numTouches = 0;
        for (let t of Object.values(touches)) {
          var idx32 = ((idx)>>2); // Pre-shift the ptr to index to HEAP32 to save code size
          HEAP32[idx32 + 0] = t.identifier;
          HEAP32[idx32 + 1] = t.screenX;
          HEAP32[idx32 + 2] = t.screenY;
          HEAP32[idx32 + 3] = t.clientX;
          HEAP32[idx32 + 4] = t.clientY;
          HEAP32[idx32 + 5] = t.pageX;
          HEAP32[idx32 + 6] = t.pageY;
          HEAP8[idx + 28] = t.isChanged;
          HEAP8[idx + 29] = t.onTarget;
          HEAP32[idx32 + 8] = t.clientX - (targetRect.left | 0);
          HEAP32[idx32 + 9] = t.clientY - (targetRect.top  | 0);
  
          idx += 48;
  
          if (++numTouches > 31) {
            break;
          }
        }
        HEAP32[(((touchEvent)+(8))>>2)] = numTouches;
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, touchEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString == 'touchstart' || eventTypeString == 'touchend',
        eventTypeString,
        callbackfunc,
        handlerFunc: touchEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  Module['registerTouchEventCallback'] = registerTouchEventCallback;
  var _emscripten_set_touchcancel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread);
  Module['_emscripten_set_touchcancel_callback_on_thread'] = _emscripten_set_touchcancel_callback_on_thread;

  var _emscripten_set_touchend_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread);
  Module['_emscripten_set_touchend_callback_on_thread'] = _emscripten_set_touchend_callback_on_thread;

  var _emscripten_set_touchmove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread);
  Module['_emscripten_set_touchmove_callback_on_thread'] = _emscripten_set_touchmove_callback_on_thread;

  var _emscripten_set_touchstart_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread);
  Module['_emscripten_set_touchstart_callback_on_thread'] = _emscripten_set_touchstart_callback_on_thread;

  
  var fillVisibilityChangeEventData = (eventStruct) => {
      var visibilityStates = [ "hidden", "visible", "prerender", "unloaded" ];
      var visibilityState = visibilityStates.indexOf(document.visibilityState);
  
      // Assigning a boolean to HEAP32 with expected type coercion.
      /** @suppress{checkTypes} */
      HEAP8[eventStruct] = document.hidden;
      HEAP32[(((eventStruct)+(4))>>2)] = visibilityState;
    };
  Module['fillVisibilityChangeEventData'] = fillVisibilityChangeEventData;
  
  
  
  var registerVisibilityChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.visibilityChangeEvent ||= _malloc(8);
  
      var visibilityChangeEventHandlerFunc = (e = event) => {
        var visibilityChangeEvent = JSEvents.visibilityChangeEvent;
  
        fillVisibilityChangeEventData(visibilityChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, visibilityChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: visibilityChangeEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  Module['registerVisibilityChangeEventCallback'] = registerVisibilityChangeEventCallback;
  
  var _emscripten_set_visibilitychange_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
    if (!specialHTMLTargets[1]) {
      return -4;
    }
      return registerVisibilityChangeEventCallback(specialHTMLTargets[1], userData, useCapture, callbackfunc, 21, "visibilitychange", targetThread);
    };
  Module['_emscripten_set_visibilitychange_callback_on_thread'] = _emscripten_set_visibilitychange_callback_on_thread;

  
  
  
  
  
  var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.wheelEvent ||= _malloc(96);
  
      // The DOM Level 3 events spec event 'wheel'
      var wheelHandlerFunc = (e = event) => {
        var wheelEvent = JSEvents.wheelEvent;
        fillMouseEventData(wheelEvent, e, target);
        HEAPF64[(((wheelEvent)+(64))>>3)] = e["deltaX"];
        HEAPF64[(((wheelEvent)+(72))>>3)] = e["deltaY"];
        HEAPF64[(((wheelEvent)+(80))>>3)] = e["deltaZ"];
        HEAP32[(((wheelEvent)+(88))>>2)] = e["deltaMode"];
        if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: true,
        eventTypeString,
        callbackfunc,
        handlerFunc: wheelHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  Module['registerWheelEventCallback'] = registerWheelEventCallback;
  
  var _emscripten_set_wheel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      target = findEventTarget(target);
      if (!target) return -4;
      if (typeof target.onwheel != 'undefined') {
        return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
      } else {
        return -1;
      }
    };
  Module['_emscripten_set_wheel_callback_on_thread'] = _emscripten_set_wheel_callback_on_thread;

  
  var _emscripten_set_window_title = (title) => document.title = UTF8ToString(title);
  Module['_emscripten_set_window_title'] = _emscripten_set_window_title;

  var _emscripten_sleep = () => {
      throw 'Please compile your program with async support in order to use asynchronous operations like emscripten_sleep';
    };
  Module['_emscripten_sleep'] = _emscripten_sleep;

  var ENV = {
  };
  Module['ENV'] = ENV;
  
  var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        // Default values.
        // Browser language detection #8751
        var lang = ((typeof navigator == 'object' && navigator.languages && navigator.languages[0]) || 'C').replace('-', '_') + '.UTF-8';
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          'LANG': lang,
          '_': getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          // x is a key in ENV; if ENV[x] is undefined, that means it was
          // explicitly set to be so. We allow user code to do that to
          // force variables with default values to remain unset.
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
  Module['getEnvStrings'] = getEnvStrings;
  
  var stringToAscii = (str, buffer) => {
      for (var i = 0; i < str.length; ++i) {
        assert(str.charCodeAt(i) === (str.charCodeAt(i) & 0xff));
        HEAP8[buffer++] = str.charCodeAt(i);
      }
      // Null-terminate the string
      HEAP8[buffer] = 0;
    };
  Module['stringToAscii'] = stringToAscii;
  var _environ_get = (__environ, environ_buf) => {
      var bufSize = 0;
      getEnvStrings().forEach((string, i) => {
        var ptr = environ_buf + bufSize;
        HEAPU32[(((__environ)+(i*4))>>2)] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    };
  Module['_environ_get'] = _environ_get;

  var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[((penviron_count)>>2)] = strings.length;
      var bufSize = 0;
      strings.forEach((string) => bufSize += string.length + 1);
      HEAPU32[((penviron_buf_size)>>2)] = bufSize;
      return 0;
    };
  Module['_environ_sizes_get'] = _environ_sizes_get;


  function _fd_close(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }
  Module['_fd_close'] = _fd_close;

  /** @param {number=} offset */
  var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break; // nothing more to read
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  Module['doReadv'] = doReadv;
  
  function _fd_read(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }
  Module['_fd_read'] = _fd_read;

  
  function _fd_seek(fd,offset_low, offset_high,whence,newOffset) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble = stream.position,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[((newOffset)>>2)] = tempI64[0],HEAP32[(((newOffset)+(4))>>2)] = tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  ;
  }
  Module['_fd_seek'] = _fd_seek;

  /** @param {number=} offset */
  var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) {
          // No more space to write.
          break;
        }
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  Module['doWritev'] = doWritev;
  
  function _fd_write(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }
  Module['_fd_write'] = _fd_write;





  var listenOnce = (object, event, func) => {
      object.addEventListener(event, func, { 'once': true });
    };
  Module['listenOnce'] = listenOnce;
  /** @param {Object=} elements */
  var autoResumeAudioContext = (ctx, elements) => {
      if (!elements) {
        elements = [document, document.getElementById('canvas')];
      }
      ['keydown', 'mousedown', 'touchstart'].forEach((event) => {
        elements.forEach((element) => {
          if (element) {
            listenOnce(element, event, () => {
              if (ctx.state === 'suspended') ctx.resume();
            });
          }
        });
      });
    };
  Module['autoResumeAudioContext'] = autoResumeAudioContext;

  var dynCallLegacy = (sig, ptr, args) => {
      sig = sig.replace(/p/g, 'i')
      assert(('dynCall_' + sig) in Module, `bad function pointer type - dynCall function not found for sig '${sig}'`);
      if (args?.length) {
        // j (64-bit integer) must be passed in as two numbers [low 32, high 32].
        assert(args.length === sig.substring(1).replace(/j/g, '--').length);
      } else {
        assert(sig.length == 1);
      }
      var f = Module['dynCall_' + sig];
      return f(ptr, ...args);
    };
  Module['dynCallLegacy'] = dynCallLegacy;
  
  
  var dynCall = (sig, ptr, args = []) => {
      // Without WASM_BIGINT support we cannot directly call function with i64 as
      // part of their signature, so we rely on the dynCall functions generated by
      // wasm-emscripten-finalize
      if (sig.includes('j')) {
        return dynCallLegacy(sig, ptr, args);
      }
      assert(getWasmTableEntry(ptr), `missing table entry in dynCall: ${ptr}`);
      var rtn = getWasmTableEntry(ptr)(...args);
      return rtn;
    };
  Module['dynCall'] = dynCall;






  var getCFunc = (ident) => {
      var func = Module['_' + ident]; // closure exported function
      assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
      return func;
    };
  Module['getCFunc'] = getCFunc;
  
  
  var writeArrayToMemory = (array, buffer) => {
      assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
      HEAP8.set(array, buffer);
    };
  Module['writeArrayToMemory'] = writeArrayToMemory;
  
  
  
  
  
  
    /**
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {Arguments|Array=} args
     * @param {Object=} opts
     */
  var ccall = (ident, returnType, argTypes, args, opts) => {
      // For fast lookup of conversion functions
      var toC = {
        'string': (str) => {
          var ret = 0;
          if (str !== null && str !== undefined && str !== 0) { // null string
            ret = stringToUTF8OnStack(str);
          }
          return ret;
        },
        'array': (arr) => {
          var ret = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret);
          return ret;
        }
      };
  
      function convertReturnValue(ret) {
        if (returnType === 'string') {
          return UTF8ToString(ret);
        }
        if (returnType === 'boolean') return Boolean(ret);
        return ret;
      }
  
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      assert(returnType !== 'array', 'Return type should not be "array".');
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func(...cArgs);
      function onDone(ret) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
      }
  
      ret = onDone(ret);
      return ret;
    };
  Module['ccall'] = ccall;
  
    /**
     * @param {string=} returnType
     * @param {Array=} argTypes
     * @param {Object=} opts
     */
  var cwrap = (ident, returnType, argTypes, opts) => {
      return (...args) => ccall(ident, returnType, argTypes, args, opts);
    };
  Module['cwrap'] = cwrap;


  var FS_createPath = FS.createPath;
  Module['FS_createPath'] = FS_createPath;



  var FS_unlink = (path) => FS.unlink(path);
  Module['FS_unlink'] = FS_unlink;

  var FS_createLazyFile = FS.createLazyFile;
  Module['FS_createLazyFile'] = FS_createLazyFile;

  var FS_createDevice = FS.createDevice;
  Module['FS_createDevice'] = FS_createDevice;






  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.staticInit();
  // Set module methods based on EXPORTED_RUNTIME_METHODS
  Module["FS_createPath"] = FS.createPath;
  Module["FS_createDataFile"] = FS.createDataFile;
  Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
  Module["FS_unlink"] = FS.unlink;
  Module["FS_createLazyFile"] = FS.createLazyFile;
  Module["FS_createDevice"] = FS.createDevice;
  ;

      // exports
      Module["requestFullscreen"] = Browser.requestFullscreen;
      Module["requestFullScreen"] = Browser.requestFullScreen;
      Module["setCanvasSize"] = Browser.setCanvasSize;
      Module["getUserMedia"] = Browser.getUserMedia;
      Module["createContext"] = Browser.createContext;
      var preloadedImages = {};
      var preloadedAudios = {};;

      Module["requestAnimationFrame"] = MainLoop.requestAnimationFrame;
      Module["pauseMainLoop"] = MainLoop.pause;
      Module["resumeMainLoop"] = MainLoop.resume;
      MainLoop.init();;
for (var i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));;
var miniTempWebGLFloatBuffersStorage = new Float32Array(288);
  // Create GL_POOL_TEMP_BUFFERS_SIZE+1 temporary buffers, for uploads of size 0 through GL_POOL_TEMP_BUFFERS_SIZE inclusive
  for (/**@suppress{duplicate}*/var i = 0; i <= 288; ++i) {
    miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i);
  };
var miniTempWebGLIntBuffersStorage = new Int32Array(288);
  // Create GL_POOL_TEMP_BUFFERS_SIZE+1 temporary buffers, for uploads of size 0 through GL_POOL_TEMP_BUFFERS_SIZE inclusive
  for (/**@suppress{duplicate}*/var i = 0; i <= 288; ++i) {
    miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i);
  };
function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var wasmImports = {
  /** @export */
  __assert_fail: ___assert_fail,
  /** @export */
  __call_sighandler: ___call_sighandler,
  /** @export */
  __cxa_throw: ___cxa_throw,
  /** @export */
  __syscall_fcntl64: ___syscall_fcntl64,
  /** @export */
  __syscall_fstat64: ___syscall_fstat64,
  /** @export */
  __syscall_ioctl: ___syscall_ioctl,
  /** @export */
  __syscall_lstat64: ___syscall_lstat64,
  /** @export */
  __syscall_mkdirat: ___syscall_mkdirat,
  /** @export */
  __syscall_newfstatat: ___syscall_newfstatat,
  /** @export */
  __syscall_openat: ___syscall_openat,
  /** @export */
  __syscall_stat64: ___syscall_stat64,
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
  /** @export */
  _emscripten_get_progname: __emscripten_get_progname,
  /** @export */
  _emscripten_memcpy_js: __emscripten_memcpy_js,
  /** @export */
  _emscripten_runtime_keepalive_clear: __emscripten_runtime_keepalive_clear,
  /** @export */
  _emscripten_throw_longjmp: __emscripten_throw_longjmp,
  /** @export */
  _mmap_js: __mmap_js,
  /** @export */
  _munmap_js: __munmap_js,
  /** @export */
  _setitimer_js: __setitimer_js,
  /** @export */
  _tzset_js: __tzset_js,
  /** @export */
  eglBindAPI: _eglBindAPI,
  /** @export */
  eglChooseConfig: _eglChooseConfig,
  /** @export */
  eglCreateContext: _eglCreateContext,
  /** @export */
  eglCreateWindowSurface: _eglCreateWindowSurface,
  /** @export */
  eglDestroyContext: _eglDestroyContext,
  /** @export */
  eglDestroySurface: _eglDestroySurface,
  /** @export */
  eglGetConfigAttrib: _eglGetConfigAttrib,
  /** @export */
  eglGetDisplay: _eglGetDisplay,
  /** @export */
  eglGetError: _eglGetError,
  /** @export */
  eglInitialize: _eglInitialize,
  /** @export */
  eglMakeCurrent: _eglMakeCurrent,
  /** @export */
  eglQueryString: _eglQueryString,
  /** @export */
  eglSwapBuffers: _eglSwapBuffers,
  /** @export */
  eglSwapInterval: _eglSwapInterval,
  /** @export */
  eglTerminate: _eglTerminate,
  /** @export */
  eglWaitGL: _eglWaitGL,
  /** @export */
  eglWaitNative: _eglWaitNative,
  /** @export */
  emscripten_asm_const_int: _emscripten_asm_const_int,
  /** @export */
  emscripten_asm_const_int_sync_on_main_thread: _emscripten_asm_const_int_sync_on_main_thread,
  /** @export */
  emscripten_asm_const_ptr_sync_on_main_thread: _emscripten_asm_const_ptr_sync_on_main_thread,
  /** @export */
  emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
  /** @export */
  emscripten_clear_timeout: _emscripten_clear_timeout,
  /** @export */
  emscripten_date_now: _emscripten_date_now,
  /** @export */
  emscripten_err: _emscripten_err,
  /** @export */
  emscripten_exit_fullscreen: _emscripten_exit_fullscreen,
  /** @export */
  emscripten_exit_pointerlock: _emscripten_exit_pointerlock,
  /** @export */
  emscripten_force_exit: _emscripten_force_exit,
  /** @export */
  emscripten_get_battery_status: _emscripten_get_battery_status,
  /** @export */
  emscripten_get_device_pixel_ratio: _emscripten_get_device_pixel_ratio,
  /** @export */
  emscripten_get_element_css_size: _emscripten_get_element_css_size,
  /** @export */
  emscripten_get_gamepad_status: _emscripten_get_gamepad_status,
  /** @export */
  emscripten_get_heap_max: _emscripten_get_heap_max,
  /** @export */
  emscripten_get_now: _emscripten_get_now,
  /** @export */
  emscripten_get_num_gamepads: _emscripten_get_num_gamepads,
  /** @export */
  emscripten_get_preloaded_image_data: _emscripten_get_preloaded_image_data,
  /** @export */
  emscripten_get_preloaded_image_data_from_FILE: _emscripten_get_preloaded_image_data_from_FILE,
  /** @export */
  emscripten_get_screen_size: _emscripten_get_screen_size,
  /** @export */
  emscripten_glActiveTexture: _emscripten_glActiveTexture,
  /** @export */
  emscripten_glAttachShader: _emscripten_glAttachShader,
  /** @export */
  emscripten_glBeginQueryEXT: _emscripten_glBeginQueryEXT,
  /** @export */
  emscripten_glBindAttribLocation: _emscripten_glBindAttribLocation,
  /** @export */
  emscripten_glBindBuffer: _emscripten_glBindBuffer,
  /** @export */
  emscripten_glBindFramebuffer: _emscripten_glBindFramebuffer,
  /** @export */
  emscripten_glBindRenderbuffer: _emscripten_glBindRenderbuffer,
  /** @export */
  emscripten_glBindTexture: _emscripten_glBindTexture,
  /** @export */
  emscripten_glBindVertexArrayOES: _emscripten_glBindVertexArrayOES,
  /** @export */
  emscripten_glBlendColor: _emscripten_glBlendColor,
  /** @export */
  emscripten_glBlendEquation: _emscripten_glBlendEquation,
  /** @export */
  emscripten_glBlendEquationSeparate: _emscripten_glBlendEquationSeparate,
  /** @export */
  emscripten_glBlendFunc: _emscripten_glBlendFunc,
  /** @export */
  emscripten_glBlendFuncSeparate: _emscripten_glBlendFuncSeparate,
  /** @export */
  emscripten_glBufferData: _emscripten_glBufferData,
  /** @export */
  emscripten_glBufferSubData: _emscripten_glBufferSubData,
  /** @export */
  emscripten_glCheckFramebufferStatus: _emscripten_glCheckFramebufferStatus,
  /** @export */
  emscripten_glClear: _emscripten_glClear,
  /** @export */
  emscripten_glClearColor: _emscripten_glClearColor,
  /** @export */
  emscripten_glClearDepthf: _emscripten_glClearDepthf,
  /** @export */
  emscripten_glClearStencil: _emscripten_glClearStencil,
  /** @export */
  emscripten_glClipControlEXT: _emscripten_glClipControlEXT,
  /** @export */
  emscripten_glColorMask: _emscripten_glColorMask,
  /** @export */
  emscripten_glCompileShader: _emscripten_glCompileShader,
  /** @export */
  emscripten_glCompressedTexImage2D: _emscripten_glCompressedTexImage2D,
  /** @export */
  emscripten_glCompressedTexSubImage2D: _emscripten_glCompressedTexSubImage2D,
  /** @export */
  emscripten_glCopyTexImage2D: _emscripten_glCopyTexImage2D,
  /** @export */
  emscripten_glCopyTexSubImage2D: _emscripten_glCopyTexSubImage2D,
  /** @export */
  emscripten_glCreateProgram: _emscripten_glCreateProgram,
  /** @export */
  emscripten_glCreateShader: _emscripten_glCreateShader,
  /** @export */
  emscripten_glCullFace: _emscripten_glCullFace,
  /** @export */
  emscripten_glDeleteBuffers: _emscripten_glDeleteBuffers,
  /** @export */
  emscripten_glDeleteFramebuffers: _emscripten_glDeleteFramebuffers,
  /** @export */
  emscripten_glDeleteProgram: _emscripten_glDeleteProgram,
  /** @export */
  emscripten_glDeleteQueriesEXT: _emscripten_glDeleteQueriesEXT,
  /** @export */
  emscripten_glDeleteRenderbuffers: _emscripten_glDeleteRenderbuffers,
  /** @export */
  emscripten_glDeleteShader: _emscripten_glDeleteShader,
  /** @export */
  emscripten_glDeleteTextures: _emscripten_glDeleteTextures,
  /** @export */
  emscripten_glDeleteVertexArraysOES: _emscripten_glDeleteVertexArraysOES,
  /** @export */
  emscripten_glDepthFunc: _emscripten_glDepthFunc,
  /** @export */
  emscripten_glDepthMask: _emscripten_glDepthMask,
  /** @export */
  emscripten_glDepthRangef: _emscripten_glDepthRangef,
  /** @export */
  emscripten_glDetachShader: _emscripten_glDetachShader,
  /** @export */
  emscripten_glDisable: _emscripten_glDisable,
  /** @export */
  emscripten_glDisableVertexAttribArray: _emscripten_glDisableVertexAttribArray,
  /** @export */
  emscripten_glDrawArrays: _emscripten_glDrawArrays,
  /** @export */
  emscripten_glDrawArraysInstancedANGLE: _emscripten_glDrawArraysInstancedANGLE,
  /** @export */
  emscripten_glDrawBuffersWEBGL: _emscripten_glDrawBuffersWEBGL,
  /** @export */
  emscripten_glDrawElements: _emscripten_glDrawElements,
  /** @export */
  emscripten_glDrawElementsInstancedANGLE: _emscripten_glDrawElementsInstancedANGLE,
  /** @export */
  emscripten_glEnable: _emscripten_glEnable,
  /** @export */
  emscripten_glEnableVertexAttribArray: _emscripten_glEnableVertexAttribArray,
  /** @export */
  emscripten_glEndQueryEXT: _emscripten_glEndQueryEXT,
  /** @export */
  emscripten_glFinish: _emscripten_glFinish,
  /** @export */
  emscripten_glFlush: _emscripten_glFlush,
  /** @export */
  emscripten_glFramebufferRenderbuffer: _emscripten_glFramebufferRenderbuffer,
  /** @export */
  emscripten_glFramebufferTexture2D: _emscripten_glFramebufferTexture2D,
  /** @export */
  emscripten_glFrontFace: _emscripten_glFrontFace,
  /** @export */
  emscripten_glGenBuffers: _emscripten_glGenBuffers,
  /** @export */
  emscripten_glGenFramebuffers: _emscripten_glGenFramebuffers,
  /** @export */
  emscripten_glGenQueriesEXT: _emscripten_glGenQueriesEXT,
  /** @export */
  emscripten_glGenRenderbuffers: _emscripten_glGenRenderbuffers,
  /** @export */
  emscripten_glGenTextures: _emscripten_glGenTextures,
  /** @export */
  emscripten_glGenVertexArraysOES: _emscripten_glGenVertexArraysOES,
  /** @export */
  emscripten_glGenerateMipmap: _emscripten_glGenerateMipmap,
  /** @export */
  emscripten_glGetActiveAttrib: _emscripten_glGetActiveAttrib,
  /** @export */
  emscripten_glGetActiveUniform: _emscripten_glGetActiveUniform,
  /** @export */
  emscripten_glGetAttachedShaders: _emscripten_glGetAttachedShaders,
  /** @export */
  emscripten_glGetAttribLocation: _emscripten_glGetAttribLocation,
  /** @export */
  emscripten_glGetBooleanv: _emscripten_glGetBooleanv,
  /** @export */
  emscripten_glGetBufferParameteriv: _emscripten_glGetBufferParameteriv,
  /** @export */
  emscripten_glGetError: _emscripten_glGetError,
  /** @export */
  emscripten_glGetFloatv: _emscripten_glGetFloatv,
  /** @export */
  emscripten_glGetFramebufferAttachmentParameteriv: _emscripten_glGetFramebufferAttachmentParameteriv,
  /** @export */
  emscripten_glGetIntegerv: _emscripten_glGetIntegerv,
  /** @export */
  emscripten_glGetProgramInfoLog: _emscripten_glGetProgramInfoLog,
  /** @export */
  emscripten_glGetProgramiv: _emscripten_glGetProgramiv,
  /** @export */
  emscripten_glGetQueryObjecti64vEXT: _emscripten_glGetQueryObjecti64vEXT,
  /** @export */
  emscripten_glGetQueryObjectivEXT: _emscripten_glGetQueryObjectivEXT,
  /** @export */
  emscripten_glGetQueryObjectui64vEXT: _emscripten_glGetQueryObjectui64vEXT,
  /** @export */
  emscripten_glGetQueryObjectuivEXT: _emscripten_glGetQueryObjectuivEXT,
  /** @export */
  emscripten_glGetQueryivEXT: _emscripten_glGetQueryivEXT,
  /** @export */
  emscripten_glGetRenderbufferParameteriv: _emscripten_glGetRenderbufferParameteriv,
  /** @export */
  emscripten_glGetShaderInfoLog: _emscripten_glGetShaderInfoLog,
  /** @export */
  emscripten_glGetShaderPrecisionFormat: _emscripten_glGetShaderPrecisionFormat,
  /** @export */
  emscripten_glGetShaderSource: _emscripten_glGetShaderSource,
  /** @export */
  emscripten_glGetShaderiv: _emscripten_glGetShaderiv,
  /** @export */
  emscripten_glGetString: _emscripten_glGetString,
  /** @export */
  emscripten_glGetTexParameterfv: _emscripten_glGetTexParameterfv,
  /** @export */
  emscripten_glGetTexParameteriv: _emscripten_glGetTexParameteriv,
  /** @export */
  emscripten_glGetUniformLocation: _emscripten_glGetUniformLocation,
  /** @export */
  emscripten_glGetUniformfv: _emscripten_glGetUniformfv,
  /** @export */
  emscripten_glGetUniformiv: _emscripten_glGetUniformiv,
  /** @export */
  emscripten_glGetVertexAttribPointerv: _emscripten_glGetVertexAttribPointerv,
  /** @export */
  emscripten_glGetVertexAttribfv: _emscripten_glGetVertexAttribfv,
  /** @export */
  emscripten_glGetVertexAttribiv: _emscripten_glGetVertexAttribiv,
  /** @export */
  emscripten_glHint: _emscripten_glHint,
  /** @export */
  emscripten_glIsBuffer: _emscripten_glIsBuffer,
  /** @export */
  emscripten_glIsEnabled: _emscripten_glIsEnabled,
  /** @export */
  emscripten_glIsFramebuffer: _emscripten_glIsFramebuffer,
  /** @export */
  emscripten_glIsProgram: _emscripten_glIsProgram,
  /** @export */
  emscripten_glIsQueryEXT: _emscripten_glIsQueryEXT,
  /** @export */
  emscripten_glIsRenderbuffer: _emscripten_glIsRenderbuffer,
  /** @export */
  emscripten_glIsShader: _emscripten_glIsShader,
  /** @export */
  emscripten_glIsTexture: _emscripten_glIsTexture,
  /** @export */
  emscripten_glIsVertexArrayOES: _emscripten_glIsVertexArrayOES,
  /** @export */
  emscripten_glLineWidth: _emscripten_glLineWidth,
  /** @export */
  emscripten_glLinkProgram: _emscripten_glLinkProgram,
  /** @export */
  emscripten_glPixelStorei: _emscripten_glPixelStorei,
  /** @export */
  emscripten_glPolygonModeWEBGL: _emscripten_glPolygonModeWEBGL,
  /** @export */
  emscripten_glPolygonOffset: _emscripten_glPolygonOffset,
  /** @export */
  emscripten_glPolygonOffsetClampEXT: _emscripten_glPolygonOffsetClampEXT,
  /** @export */
  emscripten_glQueryCounterEXT: _emscripten_glQueryCounterEXT,
  /** @export */
  emscripten_glReadPixels: _emscripten_glReadPixels,
  /** @export */
  emscripten_glReleaseShaderCompiler: _emscripten_glReleaseShaderCompiler,
  /** @export */
  emscripten_glRenderbufferStorage: _emscripten_glRenderbufferStorage,
  /** @export */
  emscripten_glSampleCoverage: _emscripten_glSampleCoverage,
  /** @export */
  emscripten_glScissor: _emscripten_glScissor,
  /** @export */
  emscripten_glShaderBinary: _emscripten_glShaderBinary,
  /** @export */
  emscripten_glShaderSource: _emscripten_glShaderSource,
  /** @export */
  emscripten_glStencilFunc: _emscripten_glStencilFunc,
  /** @export */
  emscripten_glStencilFuncSeparate: _emscripten_glStencilFuncSeparate,
  /** @export */
  emscripten_glStencilMask: _emscripten_glStencilMask,
  /** @export */
  emscripten_glStencilMaskSeparate: _emscripten_glStencilMaskSeparate,
  /** @export */
  emscripten_glStencilOp: _emscripten_glStencilOp,
  /** @export */
  emscripten_glStencilOpSeparate: _emscripten_glStencilOpSeparate,
  /** @export */
  emscripten_glTexImage2D: _emscripten_glTexImage2D,
  /** @export */
  emscripten_glTexParameterf: _emscripten_glTexParameterf,
  /** @export */
  emscripten_glTexParameterfv: _emscripten_glTexParameterfv,
  /** @export */
  emscripten_glTexParameteri: _emscripten_glTexParameteri,
  /** @export */
  emscripten_glTexParameteriv: _emscripten_glTexParameteriv,
  /** @export */
  emscripten_glTexSubImage2D: _emscripten_glTexSubImage2D,
  /** @export */
  emscripten_glUniform1f: _emscripten_glUniform1f,
  /** @export */
  emscripten_glUniform1fv: _emscripten_glUniform1fv,
  /** @export */
  emscripten_glUniform1i: _emscripten_glUniform1i,
  /** @export */
  emscripten_glUniform1iv: _emscripten_glUniform1iv,
  /** @export */
  emscripten_glUniform2f: _emscripten_glUniform2f,
  /** @export */
  emscripten_glUniform2fv: _emscripten_glUniform2fv,
  /** @export */
  emscripten_glUniform2i: _emscripten_glUniform2i,
  /** @export */
  emscripten_glUniform2iv: _emscripten_glUniform2iv,
  /** @export */
  emscripten_glUniform3f: _emscripten_glUniform3f,
  /** @export */
  emscripten_glUniform3fv: _emscripten_glUniform3fv,
  /** @export */
  emscripten_glUniform3i: _emscripten_glUniform3i,
  /** @export */
  emscripten_glUniform3iv: _emscripten_glUniform3iv,
  /** @export */
  emscripten_glUniform4f: _emscripten_glUniform4f,
  /** @export */
  emscripten_glUniform4fv: _emscripten_glUniform4fv,
  /** @export */
  emscripten_glUniform4i: _emscripten_glUniform4i,
  /** @export */
  emscripten_glUniform4iv: _emscripten_glUniform4iv,
  /** @export */
  emscripten_glUniformMatrix2fv: _emscripten_glUniformMatrix2fv,
  /** @export */
  emscripten_glUniformMatrix3fv: _emscripten_glUniformMatrix3fv,
  /** @export */
  emscripten_glUniformMatrix4fv: _emscripten_glUniformMatrix4fv,
  /** @export */
  emscripten_glUseProgram: _emscripten_glUseProgram,
  /** @export */
  emscripten_glValidateProgram: _emscripten_glValidateProgram,
  /** @export */
  emscripten_glVertexAttrib1f: _emscripten_glVertexAttrib1f,
  /** @export */
  emscripten_glVertexAttrib1fv: _emscripten_glVertexAttrib1fv,
  /** @export */
  emscripten_glVertexAttrib2f: _emscripten_glVertexAttrib2f,
  /** @export */
  emscripten_glVertexAttrib2fv: _emscripten_glVertexAttrib2fv,
  /** @export */
  emscripten_glVertexAttrib3f: _emscripten_glVertexAttrib3f,
  /** @export */
  emscripten_glVertexAttrib3fv: _emscripten_glVertexAttrib3fv,
  /** @export */
  emscripten_glVertexAttrib4f: _emscripten_glVertexAttrib4f,
  /** @export */
  emscripten_glVertexAttrib4fv: _emscripten_glVertexAttrib4fv,
  /** @export */
  emscripten_glVertexAttribDivisorANGLE: _emscripten_glVertexAttribDivisorANGLE,
  /** @export */
  emscripten_glVertexAttribPointer: _emscripten_glVertexAttribPointer,
  /** @export */
  emscripten_glViewport: _emscripten_glViewport,
  /** @export */
  emscripten_has_asyncify: _emscripten_has_asyncify,
  /** @export */
  emscripten_request_fullscreen_strategy: _emscripten_request_fullscreen_strategy,
  /** @export */
  emscripten_request_pointerlock: _emscripten_request_pointerlock,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  emscripten_run_script: _emscripten_run_script,
  /** @export */
  emscripten_sample_gamepad_data: _emscripten_sample_gamepad_data,
  /** @export */
  emscripten_set_beforeunload_callback_on_thread: _emscripten_set_beforeunload_callback_on_thread,
  /** @export */
  emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
  /** @export */
  emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
  /** @export */
  emscripten_set_element_css_size: _emscripten_set_element_css_size,
  /** @export */
  emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
  /** @export */
  emscripten_set_fullscreenchange_callback_on_thread: _emscripten_set_fullscreenchange_callback_on_thread,
  /** @export */
  emscripten_set_gamepadconnected_callback_on_thread: _emscripten_set_gamepadconnected_callback_on_thread,
  /** @export */
  emscripten_set_gamepaddisconnected_callback_on_thread: _emscripten_set_gamepaddisconnected_callback_on_thread,
  /** @export */
  emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
  /** @export */
  emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
  /** @export */
  emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
  /** @export */
  emscripten_set_main_loop: _emscripten_set_main_loop,
  /** @export */
  emscripten_set_mousedown_callback_on_thread: _emscripten_set_mousedown_callback_on_thread,
  /** @export */
  emscripten_set_mouseenter_callback_on_thread: _emscripten_set_mouseenter_callback_on_thread,
  /** @export */
  emscripten_set_mouseleave_callback_on_thread: _emscripten_set_mouseleave_callback_on_thread,
  /** @export */
  emscripten_set_mousemove_callback_on_thread: _emscripten_set_mousemove_callback_on_thread,
  /** @export */
  emscripten_set_mouseup_callback_on_thread: _emscripten_set_mouseup_callback_on_thread,
  /** @export */
  emscripten_set_pointerlockchange_callback_on_thread: _emscripten_set_pointerlockchange_callback_on_thread,
  /** @export */
  emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
  /** @export */
  emscripten_set_timeout: _emscripten_set_timeout,
  /** @export */
  emscripten_set_touchcancel_callback_on_thread: _emscripten_set_touchcancel_callback_on_thread,
  /** @export */
  emscripten_set_touchend_callback_on_thread: _emscripten_set_touchend_callback_on_thread,
  /** @export */
  emscripten_set_touchmove_callback_on_thread: _emscripten_set_touchmove_callback_on_thread,
  /** @export */
  emscripten_set_touchstart_callback_on_thread: _emscripten_set_touchstart_callback_on_thread,
  /** @export */
  emscripten_set_visibilitychange_callback_on_thread: _emscripten_set_visibilitychange_callback_on_thread,
  /** @export */
  emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
  /** @export */
  emscripten_set_window_title: _emscripten_set_window_title,
  /** @export */
  emscripten_sleep: _emscripten_sleep,
  /** @export */
  environ_get: _environ_get,
  /** @export */
  environ_sizes_get: _environ_sizes_get,
  /** @export */
  exit: _exit,
  /** @export */
  fd_close: _fd_close,
  /** @export */
  fd_read: _fd_read,
  /** @export */
  fd_seek: _fd_seek,
  /** @export */
  fd_write: _fd_write,
  /** @export */
  invoke_i,
  /** @export */
  invoke_ii,
  /** @export */
  invoke_iii,
  /** @export */
  invoke_iiii,
  /** @export */
  invoke_iiiii,
  /** @export */
  invoke_iiiiii,
  /** @export */
  invoke_iiiiiiiii,
  /** @export */
  invoke_iiiiiiiiii,
  /** @export */
  invoke_ji,
  /** @export */
  invoke_jiji,
  /** @export */
  invoke_v,
  /** @export */
  invoke_vi,
  /** @export */
  invoke_vii,
  /** @export */
  invoke_viii,
  /** @export */
  invoke_viiii,
  /** @export */
  invoke_viiiii,
  /** @export */
  invoke_viiiiiiiii,
  /** @export */
  proc_exit: _proc_exit
};
var wasmExports = createWasm();
var ___wasm_call_ctors = createExportWrapper('__wasm_call_ctors', 0);
var __ZN6SquareC1Eiiiiii = Module['__ZN6SquareC1Eiiiiii'] = createExportWrapper('_ZN6SquareC1Eiiiiii', 7);
var __ZNSt3__217__compressed_pairIP10ProjectileNS_9allocatorIS1_EEEC2B8ne180100IDnNS_18__default_init_tagEEEOT_OT0_ = Module['__ZNSt3__217__compressed_pairIP10ProjectileNS_9allocatorIS1_EEEC2B8ne180100IDnNS_18__default_init_tagEEEOT_OT0_'] = createExportWrapper('_ZNSt3__217__compressed_pairIP10ProjectileNS_9allocatorIS1_EEEC2B8ne180100IDnNS_18__default_init_tagEEEOT_OT0_', 3);
var __ZNSt3__217__compressed_pairIP5EnemyNS_9allocatorIS1_EEEC2B8ne180100IDnNS_18__default_init_tagEEEOT_OT0_ = Module['__ZNSt3__217__compressed_pairIP5EnemyNS_9allocatorIS1_EEEC2B8ne180100IDnNS_18__default_init_tagEEEOT_OT0_'] = createExportWrapper('_ZNSt3__217__compressed_pairIP5EnemyNS_9allocatorIS1_EEEC2B8ne180100IDnNS_18__default_init_tagEEEOT_OT0_', 3);
var __ZN4BossC2Ev = Module['__ZN4BossC2Ev'] = createExportWrapper('_ZN4BossC2Ev', 1);
var _pauseMusic = Module['_pauseMusic'] = createExportWrapper('pauseMusic', 0);
var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC2B8ne180100ILi0EEEPKc = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC2B8ne180100ILi0EEEPKc'] = createExportWrapper('_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC2B8ne180100ILi0EEEPKc', 2);
var __Z12logToBrowserRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__Z12logToBrowserRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = createExportWrapper('_Z12logToBrowserRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE', 1);
var _Mix_PauseMusic = Module['_Mix_PauseMusic'] = createExportWrapper('Mix_PauseMusic', 0);
var __ZNSt3__217__compressed_pairINS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE5__repES5_EC2B8ne180100INS_18__default_init_tagESA_EEOT_OT0_ = Module['__ZNSt3__217__compressed_pairINS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE5__repES5_EC2B8ne180100INS_18__default_init_tagESA_EEOT_OT0_'] = createExportWrapper('_ZNSt3__217__compressed_pairINS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE5__repES5_EC2B8ne180100INS_18__default_init_tagESA_EEOT_OT0_', 3);
var _playMusic = Module['_playMusic'] = createExportWrapper('playMusic', 0);
var _Mix_PlayMusic = Module['_Mix_PlayMusic'] = createExportWrapper('Mix_PlayMusic', 2);
var _SDL_GetError = Module['_SDL_GetError'] = createExportWrapper('SDL_GetError', 0);
var _stopMusic = Module['_stopMusic'] = createExportWrapper('stopMusic', 0);
var _Mix_HaltMusic = Module['_Mix_HaltMusic'] = createExportWrapper('Mix_HaltMusic', 0);
var _toggleMusicVolume = Module['_toggleMusicVolume'] = createExportWrapper('toggleMusicVolume', 0);
var _Mix_VolumeMusic = Module['_Mix_VolumeMusic'] = createExportWrapper('Mix_VolumeMusic', 1);
var _Mix_Volume = Module['_Mix_Volume'] = createExportWrapper('Mix_Volume', 2);
var __Z11loadTextureRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEP12SDL_Renderer = Module['__Z11loadTextureRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEP12SDL_Renderer'] = createExportWrapper('_Z11loadTextureRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEEP12SDL_Renderer', 2);
var _IMG_Load = Module['_IMG_Load'] = createExportWrapper('IMG_Load', 1);
var _SDL_CreateTextureFromSurface = Module['_SDL_CreateTextureFromSurface'] = createExportWrapper('SDL_CreateTextureFromSurface', 2);
var _SDL_FreeSurface = Module['_SDL_FreeSurface'] = createExportWrapper('SDL_FreeSurface', 1);
var __Z10renderTextRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE9SDL_ColorP12SDL_RendererP9_TTF_Font = Module['__Z10renderTextRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE9SDL_ColorP12SDL_RendererP9_TTF_Font'] = createExportWrapper('_Z10renderTextRKNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE9SDL_ColorP12SDL_RendererP9_TTF_Font', 4);
var _TTF_RenderText_Blended = Module['_TTF_RenderText_Blended'] = createExportWrapper('TTF_RenderText_Blended', 3);
var __Z14checkCollisionRK8SDL_RectS1_ = Module['__Z14checkCollisionRK8SDL_RectS1_'] = createExportWrapper('_Z14checkCollisionRK8SDL_RectS1_', 2);
var __Z16handleCollisionsR6SquareRNSt3__26vectorI10ProjectileNS1_9allocatorIS3_EEEE = Module['__Z16handleCollisionsR6SquareRNSt3__26vectorI10ProjectileNS1_9allocatorIS3_EEEE'] = createExportWrapper('_Z16handleCollisionsR6SquareRNSt3__26vectorI10ProjectileNS1_9allocatorIS3_EEEE', 2);
var __ZNK6Square4getXEv = Module['__ZNK6Square4getXEv'] = createExportWrapper('_ZNK6Square4getXEv', 1);
var __ZNK6Square4getYEv = Module['__ZNK6Square4getYEv'] = createExportWrapper('_ZNK6Square4getYEv', 1);
var __ZNK6Square7getSizeEv = Module['__ZNK6Square7getSizeEv'] = createExportWrapper('_ZNK6Square7getSizeEv', 1);
var __ZNK10Projectile4getXEv = Module['__ZNK10Projectile4getXEv'] = createExportWrapper('_ZNK10Projectile4getXEv', 1);
var __ZNK10Projectile4getYEv = Module['__ZNK10Projectile4getYEv'] = createExportWrapper('_ZNK10Projectile4getYEv', 1);
var __ZNK10Projectile8getWidthEv = Module['__ZNK10Projectile8getWidthEv'] = createExportWrapper('_ZNK10Projectile8getWidthEv', 1);
var __ZNK10Projectile9getHeightEv = Module['__ZNK10Projectile9getHeightEv'] = createExportWrapper('_ZNK10Projectile9getHeightEv', 1);
var _Mix_PlayChannel = Module['_Mix_PlayChannel'] = createExportWrapper('Mix_PlayChannel', 3);
var __ZN6Square14decreaseHealthEi = Module['__ZN6Square14decreaseHealthEi'] = createExportWrapper('_ZN6Square14decreaseHealthEi', 2);
var __ZNSt3__211__wrap_iterIPK10ProjectileEC2B8ne180100IPS1_TnNS_9enable_ifIXsr14is_convertibleIT_S3_EE5valueEiE4typeELi0EEERKNS0_IS8_EE = Module['__ZNSt3__211__wrap_iterIPK10ProjectileEC2B8ne180100IPS1_TnNS_9enable_ifIXsr14is_convertibleIT_S3_EE5valueEiE4typeELi0EEERKNS0_IS8_EE'] = createExportWrapper('_ZNSt3__211__wrap_iterIPK10ProjectileEC2B8ne180100IPS1_TnNS_9enable_ifIXsr14is_convertibleIT_S3_EE5valueEiE4typeELi0EEERKNS0_IS8_EE', 2);
var __Z12renderCenterffPKcP9_TTF_Font9SDL_Color = Module['__Z12renderCenterffPKcP9_TTF_Font9SDL_Color'] = createExportWrapper('_Z12renderCenterffPKcP9_TTF_Font9SDL_Color', 5);
var _SDL_RenderCopy = Module['_SDL_RenderCopy'] = createExportWrapper('SDL_RenderCopy', 4);
var _SDL_DestroyTexture = Module['_SDL_DestroyTexture'] = createExportWrapper('SDL_DestroyTexture', 1);
var __Z11renderScoreP12SDL_Rendereri = Module['__Z11renderScoreP12SDL_Rendereri'] = createExportWrapper('_Z11renderScoreP12SDL_Rendereri', 2);
var _SDL_QueryTexture = Module['_SDL_QueryTexture'] = createExportWrapper('SDL_QueryTexture', 5);
var __Z15renderHealthBarP12SDL_Rendererii = Module['__Z15renderHealthBarP12SDL_Rendererii'] = createExportWrapper('_Z15renderHealthBarP12SDL_Rendererii', 3);
var _SDL_SetRenderDrawColor = Module['_SDL_SetRenderDrawColor'] = createExportWrapper('SDL_SetRenderDrawColor', 5);
var _SDL_RenderFillRect = Module['_SDL_RenderFillRect'] = createExportWrapper('SDL_RenderFillRect', 2);
var __Z14renderGameOverNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__Z14renderGameOverNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = createExportWrapper('_Z14renderGameOverNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE', 1);
var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC2ERKS5_ = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC2ERKS5_'] = createExportWrapper('_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC2ERKS5_', 2);
var __ZNSt3__216allocator_traitsINS_9allocatorIcEEE37select_on_container_copy_constructionB8ne180100IS2_vvEES2_RKS2_ = Module['__ZNSt3__216allocator_traitsINS_9allocatorIcEEE37select_on_container_copy_constructionB8ne180100IS2_vvEES2_RKS2_'] = createExportWrapper('_ZNSt3__216allocator_traitsINS_9allocatorIcEEE37select_on_container_copy_constructionB8ne180100IS2_vvEES2_RKS2_', 1);
var __ZNSt3__217__compressed_pairINS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE5__repES5_EC2B8ne180100INS_18__default_init_tagES5_EEOT_OT0_ = Module['__ZNSt3__217__compressed_pairINS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE5__repES5_EC2B8ne180100INS_18__default_init_tagES5_EEOT_OT0_'] = createExportWrapper('_ZNSt3__217__compressed_pairINS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE5__repES5_EC2B8ne180100INS_18__default_init_tagES5_EEOT_OT0_', 3);
var __Z17initializeEnemiesN5Enemy15MovementPatternEii = Module['__Z17initializeEnemiesN5Enemy15MovementPatternEii'] = createExportWrapper('_Z17initializeEnemiesN5Enemy15MovementPatternEii', 3);
var __ZN5EnemyC1EiiiiiiNS_15MovementPatternEi = Module['__ZN5EnemyC1EiiiiiiNS_15MovementPatternEi'] = createExportWrapper('_ZN5EnemyC1EiiiiiiNS_15MovementPatternEi', 9);
var __ZNSt3__26vectorI5EnemyNS_9allocatorIS1_EEE22__construct_one_at_endB8ne180100IJS1_EEEvDpOT_ = Module['__ZNSt3__26vectorI5EnemyNS_9allocatorIS1_EEE22__construct_one_at_endB8ne180100IJS1_EEEvDpOT_'] = createExportWrapper('_ZNSt3__26vectorI5EnemyNS_9allocatorIS1_EEE22__construct_one_at_endB8ne180100IJS1_EEEvDpOT_', 2);
var __ZNSt3__26vectorI5EnemyNS_9allocatorIS1_EEE21__push_back_slow_pathIS1_EEPS1_OT_ = Module['__ZNSt3__26vectorI5EnemyNS_9allocatorIS1_EEE21__push_back_slow_pathIS1_EEPS1_OT_'] = createExportWrapper('_ZNSt3__26vectorI5EnemyNS_9allocatorIS1_EEE21__push_back_slow_pathIS1_EEPS1_OT_', 2);
var __Z9main_loopv = Module['__Z9main_loopv'] = createExportWrapper('_Z9main_loopv', 0);
var _SDL_PollEvent = Module['_SDL_PollEvent'] = createExportWrapper('SDL_PollEvent', 1);
var __ZN6Square7setVelYEi = Module['__ZN6Square7setVelYEi'] = createExportWrapper('_ZN6Square7setVelYEi', 2);
var __ZN6Square7setVelXEi = Module['__ZN6Square7setVelXEi'] = createExportWrapper('_ZN6Square7setVelXEi', 2);
var __ZNK6Square7getRectEv = Module['__ZNK6Square7getRectEv'] = createExportWrapper('_ZNK6Square7getRectEv', 2);
var __ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE12emplace_backIJiiiiiiEEERS1_DpOT_ = Module['__ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE12emplace_backIJiiiiiiEEERS1_DpOT_'] = createExportWrapper('_ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE12emplace_backIJiiiiiiEEERS1_DpOT_', 7);
var __ZN6Square9setHealthEi = Module['__ZN6Square9setHealthEi'] = createExportWrapper('_ZN6Square9setHealthEi', 2);
var _SDL_RenderClear = Module['_SDL_RenderClear'] = createExportWrapper('SDL_RenderClear', 1);
var _SDL_RenderPresent = Module['_SDL_RenderPresent'] = createExportWrapper('SDL_RenderPresent', 1);
var __ZN6Square14updatePositionEii = Module['__ZN6Square14updatePositionEii'] = createExportWrapper('_ZN6Square14updatePositionEii', 3);
var __ZN10Projectile6updateEv = Module['__ZN10Projectile6updateEv'] = createExportWrapper('_ZN10Projectile6updateEv', 1);
var __ZNK10Projectile7getRectEv = Module['__ZNK10Projectile7getRectEv'] = createExportWrapper('_ZNK10Projectile7getRectEv', 2);
var __ZNK5Enemy7getRectEv = Module['__ZNK5Enemy7getRectEv'] = createExportWrapper('_ZNK5Enemy7getRectEv', 2);
var _SDL_HasIntersection = Module['_SDL_HasIntersection'] = createExportWrapper('SDL_HasIntersection', 2);
var __ZN5Enemy14decreaseHealthEi = Module['__ZN5Enemy14decreaseHealthEi'] = createExportWrapper('_ZN5Enemy14decreaseHealthEi', 2);
var __ZNK5Enemy9getHealthEv = Module['__ZNK5Enemy9getHealthEv'] = createExportWrapper('_ZNK5Enemy9getHealthEv', 1);
var __ZNSt3__211__wrap_iterIPK5EnemyEC2B8ne180100IPS1_TnNS_9enable_ifIXsr14is_convertibleIT_S3_EE5valueEiE4typeELi0EEERKNS0_IS8_EE = Module['__ZNSt3__211__wrap_iterIPK5EnemyEC2B8ne180100IPS1_TnNS_9enable_ifIXsr14is_convertibleIT_S3_EE5valueEiE4typeELi0EEERKNS0_IS8_EE'] = createExportWrapper('_ZNSt3__211__wrap_iterIPK5EnemyEC2B8ne180100IPS1_TnNS_9enable_ifIXsr14is_convertibleIT_S3_EE5valueEiE4typeELi0EEERKNS0_IS8_EE', 2);
var __ZN5Enemy6updateERNSt3__26vectorI10ProjectileNS0_9allocatorIS2_EEEE6Square = Module['__ZN5Enemy6updateERNSt3__26vectorI10ProjectileNS0_9allocatorIS2_EEEE6Square'] = createExportWrapper('_ZN5Enemy6updateERNSt3__26vectorI10ProjectileNS0_9allocatorIS2_EEEE6Square', 3);
var __ZN6Square6renderEP12SDL_RendererP11SDL_Texture = Module['__ZN6Square6renderEP12SDL_RendererP11SDL_Texture'] = createExportWrapper('_ZN6Square6renderEP12SDL_RendererP11SDL_Texture', 3);
var __ZNK6Square9getHealthEv = Module['__ZNK6Square9getHealthEv'] = createExportWrapper('_ZNK6Square9getHealthEv', 1);
var __ZN10Projectile6renderEP12SDL_RendererP11SDL_Texture = Module['__ZN10Projectile6renderEP12SDL_RendererP11SDL_Texture'] = createExportWrapper('_ZN10Projectile6renderEP12SDL_RendererP11SDL_Texture', 3);
var __ZNK5Enemy6renderEP12SDL_RendererP11SDL_Texture = Module['__ZNK5Enemy6renderEP12SDL_RendererP11SDL_Texture'] = createExportWrapper('_ZNK5Enemy6renderEP12SDL_RendererP11SDL_Texture', 3);
var __ZNK6Square12getMaxHealthEv = Module['__ZNK6Square12getMaxHealthEv'] = createExportWrapper('_ZNK6Square12getMaxHealthEv', 1);
var _SDL_GetTicks = Module['_SDL_GetTicks'] = createExportWrapper('SDL_GetTicks', 0);
var __ZN4Boss4moveEv = Module['__ZN4Boss4moveEv'] = createExportWrapper('_ZN4Boss4moveEv', 1);
var __ZN4Boss5shootERNSt3__26vectorI10ProjectileNS0_9allocatorIS2_EEEE = Module['__ZN4Boss5shootERNSt3__26vectorI10ProjectileNS0_9allocatorIS2_EEEE'] = createExportWrapper('_ZN4Boss5shootERNSt3__26vectorI10ProjectileNS0_9allocatorIS2_EEEE', 2);
var __ZN4Boss13displayHealthEP12SDL_Renderer = Module['__ZN4Boss13displayHealthEP12SDL_Renderer'] = createExportWrapper('_ZN4Boss13displayHealthEP12SDL_Renderer', 2);
var __ZN6Square9addHealthEi = Module['__ZN6Square9addHealthEi'] = createExportWrapper('_ZN6Square9addHealthEi', 2);
var __ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE22__construct_one_at_endB8ne180100IJiiiiiiEEEvDpOT_ = Module['__ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE22__construct_one_at_endB8ne180100IJiiiiiiEEEvDpOT_'] = createExportWrapper('_ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE22__construct_one_at_endB8ne180100IJiiiiiiEEEvDpOT_', 7);
var __ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE24__emplace_back_slow_pathIJiiiiiiEEEPS1_DpOT_ = Module['__ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE24__emplace_back_slow_pathIJiiiiiiEEEPS1_DpOT_'] = createExportWrapper('_ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE24__emplace_back_slow_pathIJiiiiiiEEEPS1_DpOT_', 7);
var __ZN10ProjectileC1Eiiiiii = Module['__ZN10ProjectileC1Eiiiiii'] = createExportWrapper('_ZN10ProjectileC1Eiiiiii', 7);
var _main = Module['_main'] = createExportWrapper('__main_argc_argv', 2);
var _SDL_Init = Module['_SDL_Init'] = createExportWrapper('SDL_Init', 1);
var _IMG_Init = Module['_IMG_Init'] = createExportWrapper('IMG_Init', 1);
var _SDL_Quit = Module['_SDL_Quit'] = createExportWrapper('SDL_Quit', 0);
var _TTF_Init = Module['_TTF_Init'] = createExportWrapper('TTF_Init', 0);
var _TTF_OpenFont = Module['_TTF_OpenFont'] = createExportWrapper('TTF_OpenFont', 2);
var _TTF_Quit = Module['_TTF_Quit'] = createExportWrapper('TTF_Quit', 0);
var _Mix_OpenAudio = Module['_Mix_OpenAudio'] = createExportWrapper('Mix_OpenAudio', 4);
var _Mix_LoadMUS = Module['_Mix_LoadMUS'] = createExportWrapper('Mix_LoadMUS', 1);
var _Mix_LoadWAV = Module['_Mix_LoadWAV'] = createExportWrapper('Mix_LoadWAV', 1);
var _SDL_CreateWindow = Module['_SDL_CreateWindow'] = createExportWrapper('SDL_CreateWindow', 6);
var _SDL_CreateRenderer = Module['_SDL_CreateRenderer'] = createExportWrapper('SDL_CreateRenderer', 3);
var _SDL_DestroyWindow = Module['_SDL_DestroyWindow'] = createExportWrapper('SDL_DestroyWindow', 1);
var _TTF_CloseFont = Module['_TTF_CloseFont'] = createExportWrapper('TTF_CloseFont', 1);
var _SDL_DestroyRenderer = Module['_SDL_DestroyRenderer'] = createExportWrapper('SDL_DestroyRenderer', 1);
var _Mix_FreeMusic = Module['_Mix_FreeMusic'] = createExportWrapper('Mix_FreeMusic', 1);
var _Mix_FreeChunk = Module['_Mix_FreeChunk'] = createExportWrapper('Mix_FreeChunk', 1);
var _Mix_CloseAudio = Module['_Mix_CloseAudio'] = createExportWrapper('Mix_CloseAudio', 0);
var _IMG_Quit = Module['_IMG_Quit'] = createExportWrapper('IMG_Quit', 0);
var __ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE22__construct_one_at_endB8ne180100IJS1_EEEvDpOT_ = Module['__ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE22__construct_one_at_endB8ne180100IJS1_EEEvDpOT_'] = createExportWrapper('_ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE22__construct_one_at_endB8ne180100IJS1_EEEvDpOT_', 2);
var __ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE21__push_back_slow_pathIS1_EEPS1_OT_ = Module['__ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE21__push_back_slow_pathIS1_EEPS1_OT_'] = createExportWrapper('_ZNSt3__26vectorI10ProjectileNS_9allocatorIS1_EEE21__push_back_slow_pathIS1_EEPS1_OT_', 2);
var __ZNSt3__216allocator_traitsINS_9allocatorI10ProjectileEEE9constructB8ne180100IS2_JS2_EvEEvRS3_PT_DpOT0_ = Module['__ZNSt3__216allocator_traitsINS_9allocatorI10ProjectileEEE9constructB8ne180100IS2_JS2_EvEEvRS3_PT_DpOT0_'] = createExportWrapper('_ZNSt3__216allocator_traitsINS_9allocatorI10ProjectileEEE9constructB8ne180100IS2_JS2_EvEEvRS3_PT_DpOT0_', 3);
var __ZNSt3__29allocatorI10ProjectileE9constructB8ne180100IS1_JS1_EEEvPT_DpOT0_ = Module['__ZNSt3__29allocatorI10ProjectileE9constructB8ne180100IS1_JS1_EEEvPT_DpOT0_'] = createExportWrapper('_ZNSt3__29allocatorI10ProjectileE9constructB8ne180100IS1_JS1_EEEvPT_DpOT0_', 3);
var __ZNSt3__217__compressed_pairIP10ProjectileRNS_9allocatorIS1_EEEC2B8ne180100IDnS5_EEOT_OT0_ = Module['__ZNSt3__217__compressed_pairIP10ProjectileRNS_9allocatorIS1_EEEC2B8ne180100IDnS5_EEOT_OT0_'] = createExportWrapper('_ZNSt3__217__compressed_pairIP10ProjectileRNS_9allocatorIS1_EEEC2B8ne180100IDnS5_EEOT_OT0_', 3);
var __ZNSt3__216allocator_traitsINS_9allocatorI10ProjectileEEE8max_sizeB8ne180100IS3_vEEmRKS3_ = Module['__ZNSt3__216allocator_traitsINS_9allocatorI10ProjectileEEE8max_sizeB8ne180100IS3_vEEmRKS3_'] = createExportWrapper('_ZNSt3__216allocator_traitsINS_9allocatorI10ProjectileEEE8max_sizeB8ne180100IS3_vEEmRKS3_', 1);
var ___cxa_allocate_exception = Module['___cxa_allocate_exception'] = createExportWrapper('__cxa_allocate_exception', 1);
var __ZNSt12length_errorD1Ev = Module['__ZNSt12length_errorD1Ev'] = createExportWrapper('_ZNSt12length_errorD1Ev', 1);
var __ZNSt3__222__compressed_pair_elemIP10ProjectileLi0ELb0EEC2B8ne180100IDnvEEOT_ = Module['__ZNSt3__222__compressed_pair_elemIP10ProjectileLi0ELb0EEC2B8ne180100IDnvEEOT_'] = createExportWrapper('_ZNSt3__222__compressed_pair_elemIP10ProjectileLi0ELb0EEC2B8ne180100IDnvEEOT_', 2);
var __ZNSt3__222__compressed_pair_elemIRNS_9allocatorI10ProjectileEELi1ELb0EEC2B8ne180100IS4_vEEOT_ = Module['__ZNSt3__222__compressed_pair_elemIRNS_9allocatorI10ProjectileEELi1ELb0EEC2B8ne180100IS4_vEEOT_'] = createExportWrapper('_ZNSt3__222__compressed_pair_elemIRNS_9allocatorI10ProjectileEELi1ELb0EEC2B8ne180100IS4_vEEOT_', 2);
var __ZNSt20bad_array_new_lengthC1Ev = Module['__ZNSt20bad_array_new_lengthC1Ev'] = createExportWrapper('_ZNSt20bad_array_new_lengthC1Ev', 1);
var __ZNSt20bad_array_new_lengthD1Ev = Module['__ZNSt20bad_array_new_lengthD1Ev'] = createExportWrapper('_ZNSt20bad_array_new_lengthD1Ev', 1);
var __ZnwmSt11align_val_t = Module['__ZnwmSt11align_val_t'] = createExportWrapper('_ZnwmSt11align_val_t', 2);
var __Znwm = Module['__Znwm'] = createExportWrapper('_Znwm', 1);
var __ZNKSt3__211__move_loopINS_17_ClassicAlgPolicyEEclB8ne180100INS_16reverse_iteratorIP10ProjectileEES7_S7_EENS_4pairIT_T1_EES9_T0_SA_ = Module['__ZNKSt3__211__move_loopINS_17_ClassicAlgPolicyEEclB8ne180100INS_16reverse_iteratorIP10ProjectileEES7_S7_EENS_4pairIT_T1_EES9_T0_SA_'] = createExportWrapper('_ZNKSt3__211__move_loopINS_17_ClassicAlgPolicyEEclB8ne180100INS_16reverse_iteratorIP10ProjectileEES7_S7_EENS_4pairIT_T1_EES9_T0_SA_', 5);
var __ZNSt3__24pairINS_16reverse_iteratorIP10ProjectileEES4_EC2B8ne180100IS4_S4_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS8_OS9_ = Module['__ZNSt3__24pairINS_16reverse_iteratorIP10ProjectileEES4_EC2B8ne180100IS4_S4_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS8_OS9_'] = createExportWrapper('_ZNSt3__24pairINS_16reverse_iteratorIP10ProjectileEES4_EC2B8ne180100IS4_S4_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS8_OS9_', 3);
var __ZNSt3__216allocator_traitsINS_9allocatorI10ProjectileEEE7destroyB8ne180100IS2_vEEvRS3_PT_ = Module['__ZNSt3__216allocator_traitsINS_9allocatorI10ProjectileEEE7destroyB8ne180100IS2_vEEvRS3_PT_'] = createExportWrapper('_ZNSt3__216allocator_traitsINS_9allocatorI10ProjectileEEE7destroyB8ne180100IS2_vEEvRS3_PT_', 2);
var __ZdlPvmSt11align_val_t = Module['__ZdlPvmSt11align_val_t'] = createExportWrapper('_ZdlPvmSt11align_val_t', 3);
var __ZdlPvm = Module['__ZdlPvm'] = createExportWrapper('_ZdlPvm', 2);
var __ZNSt3__222__compressed_pair_elemIP5EnemyLi0ELb0EEC2B8ne180100IDnvEEOT_ = Module['__ZNSt3__222__compressed_pair_elemIP5EnemyLi0ELb0EEC2B8ne180100IDnvEEOT_'] = createExportWrapper('_ZNSt3__222__compressed_pair_elemIP5EnemyLi0ELb0EEC2B8ne180100IDnvEEOT_', 2);
var __ZNSt3__216allocator_traitsINS_9allocatorI5EnemyEEE7destroyB8ne180100IS2_vEEvRS3_PT_ = Module['__ZNSt3__216allocator_traitsINS_9allocatorI5EnemyEEE7destroyB8ne180100IS2_vEEvRS3_PT_'] = createExportWrapper('_ZNSt3__216allocator_traitsINS_9allocatorI5EnemyEEE7destroyB8ne180100IS2_vEEvRS3_PT_', 2);
var __ZNSt3__24pairIP10ProjectileS2_EC2B8ne180100IS2_S2_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS6_OS7_ = Module['__ZNSt3__24pairIP10ProjectileS2_EC2B8ne180100IS2_S2_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS6_OS7_'] = createExportWrapper('_ZNSt3__24pairIP10ProjectileS2_EC2B8ne180100IS2_S2_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS6_OS7_', 3);
var __ZNSt3__24pairIP10ProjectileS2_EC2B8ne180100IRS2_S2_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS7_OS8_ = Module['__ZNSt3__24pairIP10ProjectileS2_EC2B8ne180100IRS2_S2_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS7_OS8_'] = createExportWrapper('_ZNSt3__24pairIP10ProjectileS2_EC2B8ne180100IRS2_S2_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS7_OS8_', 3);
var __ZNSt3__222__compressed_pair_elemINS_9allocatorIcEELi1ELb1EEC2B8ne180100IS2_vEEOT_ = Module['__ZNSt3__222__compressed_pair_elemINS_9allocatorIcEELi1ELb1EEC2B8ne180100IS2_vEEOT_'] = createExportWrapper('_ZNSt3__222__compressed_pair_elemINS_9allocatorIcEELi1ELb1EEC2B8ne180100IS2_vEEOT_', 2);
var __ZNSt3__216allocator_traitsINS_9allocatorI5EnemyEEE9constructB8ne180100IS2_JS2_EvEEvRS3_PT_DpOT0_ = Module['__ZNSt3__216allocator_traitsINS_9allocatorI5EnemyEEE9constructB8ne180100IS2_JS2_EvEEvRS3_PT_DpOT0_'] = createExportWrapper('_ZNSt3__216allocator_traitsINS_9allocatorI5EnemyEEE9constructB8ne180100IS2_JS2_EvEEvRS3_PT_DpOT0_', 3);
var __ZNSt3__29allocatorI5EnemyE9constructB8ne180100IS1_JS1_EEEvPT_DpOT0_ = Module['__ZNSt3__29allocatorI5EnemyE9constructB8ne180100IS1_JS1_EEEvPT_DpOT0_'] = createExportWrapper('_ZNSt3__29allocatorI5EnemyE9constructB8ne180100IS1_JS1_EEEvPT_DpOT0_', 3);
var _memcpy = createExportWrapper('memcpy', 3);
var __ZNSt3__217__compressed_pairIP5EnemyRNS_9allocatorIS1_EEEC2B8ne180100IDnS5_EEOT_OT0_ = Module['__ZNSt3__217__compressed_pairIP5EnemyRNS_9allocatorIS1_EEEC2B8ne180100IDnS5_EEOT_OT0_'] = createExportWrapper('_ZNSt3__217__compressed_pairIP5EnemyRNS_9allocatorIS1_EEEC2B8ne180100IDnS5_EEOT_OT0_', 3);
var __ZNSt3__216allocator_traitsINS_9allocatorI5EnemyEEE8max_sizeB8ne180100IS3_vEEmRKS3_ = Module['__ZNSt3__216allocator_traitsINS_9allocatorI5EnemyEEE8max_sizeB8ne180100IS3_vEEmRKS3_'] = createExportWrapper('_ZNSt3__216allocator_traitsINS_9allocatorI5EnemyEEE8max_sizeB8ne180100IS3_vEEmRKS3_', 1);
var __ZNSt3__222__compressed_pair_elemIRNS_9allocatorI5EnemyEELi1ELb0EEC2B8ne180100IS4_vEEOT_ = Module['__ZNSt3__222__compressed_pair_elemIRNS_9allocatorI5EnemyEELi1ELb0EEC2B8ne180100IS4_vEEOT_'] = createExportWrapper('_ZNSt3__222__compressed_pair_elemIRNS_9allocatorI5EnemyEELi1ELb0EEC2B8ne180100IS4_vEEOT_', 2);
var __ZNKSt3__211__move_loopINS_17_ClassicAlgPolicyEEclB8ne180100INS_16reverse_iteratorIP5EnemyEES7_S7_EENS_4pairIT_T1_EES9_T0_SA_ = Module['__ZNKSt3__211__move_loopINS_17_ClassicAlgPolicyEEclB8ne180100INS_16reverse_iteratorIP5EnemyEES7_S7_EENS_4pairIT_T1_EES9_T0_SA_'] = createExportWrapper('_ZNKSt3__211__move_loopINS_17_ClassicAlgPolicyEEclB8ne180100INS_16reverse_iteratorIP5EnemyEES7_S7_EENS_4pairIT_T1_EES9_T0_SA_', 5);
var __ZNSt3__24pairINS_16reverse_iteratorIP5EnemyEES4_EC2B8ne180100IS4_S4_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS8_OS9_ = Module['__ZNSt3__24pairINS_16reverse_iteratorIP5EnemyEES4_EC2B8ne180100IS4_S4_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS8_OS9_'] = createExportWrapper('_ZNSt3__24pairINS_16reverse_iteratorIP5EnemyEES4_EC2B8ne180100IS4_S4_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS8_OS9_', 3);
var __ZNSt3__216allocator_traitsINS_9allocatorI10ProjectileEEE9constructB8ne180100IS2_JiiiiiiEvEEvRS3_PT_DpOT0_ = Module['__ZNSt3__216allocator_traitsINS_9allocatorI10ProjectileEEE9constructB8ne180100IS2_JiiiiiiEvEEvRS3_PT_DpOT0_'] = createExportWrapper('_ZNSt3__216allocator_traitsINS_9allocatorI10ProjectileEEE9constructB8ne180100IS2_JiiiiiiEvEEvRS3_PT_DpOT0_', 8);
var __ZNSt3__29allocatorI10ProjectileE9constructB8ne180100IS1_JiiiiiiEEEvPT_DpOT0_ = Module['__ZNSt3__29allocatorI10ProjectileE9constructB8ne180100IS1_JiiiiiiEEEvPT_DpOT0_'] = createExportWrapper('_ZNSt3__29allocatorI10ProjectileE9constructB8ne180100IS1_JiiiiiiEEEvPT_DpOT0_', 8);
var __ZNSt3__24pairIP5EnemyS2_EC2B8ne180100IS2_S2_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS6_OS7_ = Module['__ZNSt3__24pairIP5EnemyS2_EC2B8ne180100IS2_S2_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS6_OS7_'] = createExportWrapper('_ZNSt3__24pairIP5EnemyS2_EC2B8ne180100IS2_S2_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS6_OS7_', 3);
var __ZNSt3__24pairIP5EnemyS2_EC2B8ne180100IRS2_S2_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS7_OS8_ = Module['__ZNSt3__24pairIP5EnemyS2_EC2B8ne180100IRS2_S2_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS7_OS8_'] = createExportWrapper('_ZNSt3__24pairIP5EnemyS2_EC2B8ne180100IRS2_S2_TnNS_9enable_ifIXclsr10_CheckArgsE17__enable_implicitIT_T0_EEEiE4typeELi0EEEOS7_OS8_', 3);
var __ZN6SquareC2Eiiiiii = Module['__ZN6SquareC2Eiiiiii'] = createExportWrapper('_ZN6SquareC2Eiiiiii', 7);
var __ZN10ProjectileC2Eiiiiii = Module['__ZN10ProjectileC2Eiiiiii'] = createExportWrapper('_ZN10ProjectileC2Eiiiiii', 7);
var __ZN5EnemyC2EiiiiiiNS_15MovementPatternEi = Module['__ZN5EnemyC2EiiiiiiNS_15MovementPatternEi'] = createExportWrapper('_ZN5EnemyC2EiiiiiiNS_15MovementPatternEi', 9);
var __ZN5Enemy5shootERNSt3__26vectorI10ProjectileNS0_9allocatorIS2_EEEE = Module['__ZN5Enemy5shootERNSt3__26vectorI10ProjectileNS0_9allocatorIS2_EEEE'] = createExportWrapper('_ZN5Enemy5shootERNSt3__26vectorI10ProjectileNS0_9allocatorIS2_EEEE', 2);
var __ZNSt3__26chrono8durationIxNS_5ratioILx1ELx1000000000EEEEC2B8ne180100IxTnNS_9enable_ifIXaasr14is_convertibleIRKT_xEE5valueooL_ZNS_17integral_constantIbLb0EE5valueEEntsr23treat_as_floating_pointIS7_EE5valueEiE4typeELi0EEES9_ = Module['__ZNSt3__26chrono8durationIxNS_5ratioILx1ELx1000000000EEEEC2B8ne180100IxTnNS_9enable_ifIXaasr14is_convertibleIRKT_xEE5valueooL_ZNS_17integral_constantIbLb0EE5valueEEntsr23treat_as_floating_pointIS7_EE5valueEiE4typeELi0EEES9_'] = createExportWrapper('_ZNSt3__26chrono8durationIxNS_5ratioILx1ELx1000000000EEEEC2B8ne180100IxTnNS_9enable_ifIXaasr14is_convertibleIRKT_xEE5valueooL_ZNS_17integral_constantIbLb0EE5valueEEntsr23treat_as_floating_pointIS7_EE5valueEiE4typeELi0EEES9_', 2);
var __ZNSt3__26chrono8durationIxNS_5ratioILx1ELx1EEEEC2B8ne180100IxTnNS_9enable_ifIXaasr14is_convertibleIRKT_xEE5valueooL_ZNS_17integral_constantIbLb0EE5valueEEntsr23treat_as_floating_pointIS7_EE5valueEiE4typeELi0EEES9_ = Module['__ZNSt3__26chrono8durationIxNS_5ratioILx1ELx1EEEEC2B8ne180100IxTnNS_9enable_ifIXaasr14is_convertibleIRKT_xEE5valueooL_ZNS_17integral_constantIbLb0EE5valueEEntsr23treat_as_floating_pointIS7_EE5valueEiE4typeELi0EEES9_'] = createExportWrapper('_ZNSt3__26chrono8durationIxNS_5ratioILx1ELx1EEEEC2B8ne180100IxTnNS_9enable_ifIXaasr14is_convertibleIRKT_xEE5valueooL_ZNS_17integral_constantIbLb0EE5valueEEntsr23treat_as_floating_pointIS7_EE5valueEiE4typeELi0EEES9_', 2);
var __ZNSt3__26chrono8durationIxNS_5ratioILx1ELx1000EEEEC2B8ne180100IxTnNS_9enable_ifIXaasr14is_convertibleIRKT_xEE5valueooL_ZNS_17integral_constantIbLb0EE5valueEEntsr23treat_as_floating_pointIS7_EE5valueEiE4typeELi0EEES9_ = Module['__ZNSt3__26chrono8durationIxNS_5ratioILx1ELx1000EEEEC2B8ne180100IxTnNS_9enable_ifIXaasr14is_convertibleIRKT_xEE5valueooL_ZNS_17integral_constantIbLb0EE5valueEEntsr23treat_as_floating_pointIS7_EE5valueEiE4typeELi0EEES9_'] = createExportWrapper('_ZNSt3__26chrono8durationIxNS_5ratioILx1ELx1000EEEEC2B8ne180100IxTnNS_9enable_ifIXaasr14is_convertibleIRKT_xEE5valueooL_ZNS_17integral_constantIbLb0EE5valueEEntsr23treat_as_floating_pointIS7_EE5valueEiE4typeELi0EEES9_', 2);
var _memcmp = createExportWrapper('memcmp', 3);
var _IMG_Linked_Version = Module['_IMG_Linked_Version'] = createExportWrapper('IMG_Linked_Version', 0);
var _SDL_CreateRGBSurface = Module['_SDL_CreateRGBSurface'] = createExportWrapper('SDL_CreateRGBSurface', 8);
var _free = createExportWrapper('free', 1);
var _SDL_RWFromFile = Module['_SDL_RWFromFile'] = createExportWrapper('SDL_RWFromFile', 2);
var _SDL_strrchr = Module['_SDL_strrchr'] = createExportWrapper('SDL_strrchr', 2);
var _IMG_LoadTyped_RW = Module['_IMG_LoadTyped_RW'] = createExportWrapper('IMG_LoadTyped_RW', 3);
var _SDL_SetError = Module['_SDL_SetError'] = createExportWrapper('SDL_SetError', 2);
var _SDL_RWseek = Module['_SDL_RWseek'] = createExportWrapper('SDL_RWseek', 4);
var _SDL_RWclose = Module['_SDL_RWclose'] = createExportWrapper('SDL_RWclose', 1);
var _SDL_toupper = Module['_SDL_toupper'] = createExportWrapper('SDL_toupper', 1);
var _IMG_Load_RW = Module['_IMG_Load_RW'] = createExportWrapper('IMG_Load_RW', 2);
var _IMG_LoadTexture = Module['_IMG_LoadTexture'] = createExportWrapper('IMG_LoadTexture', 2);
var _IMG_LoadTexture_RW = Module['_IMG_LoadTexture_RW'] = createExportWrapper('IMG_LoadTexture_RW', 3);
var _IMG_LoadTextureTyped_RW = Module['_IMG_LoadTextureTyped_RW'] = createExportWrapper('IMG_LoadTextureTyped_RW', 4);
var _IMG_LoadAnimation = Module['_IMG_LoadAnimation'] = createExportWrapper('IMG_LoadAnimation', 1);
var _IMG_LoadAnimationTyped_RW = Module['_IMG_LoadAnimationTyped_RW'] = createExportWrapper('IMG_LoadAnimationTyped_RW', 3);
var _IMG_isGIF = Module['_IMG_isGIF'] = createExportWrapper('IMG_isGIF', 1);
var _IMG_LoadGIFAnimation_RW = Module['_IMG_LoadGIFAnimation_RW'] = createExportWrapper('IMG_LoadGIFAnimation_RW', 1);
var _SDL_malloc = Module['_SDL_malloc'] = createExportWrapper('SDL_malloc', 1);
var _SDL_calloc = Module['_SDL_calloc'] = createExportWrapper('SDL_calloc', 2);
var _SDL_free = Module['_SDL_free'] = createExportWrapper('SDL_free', 1);
var _SDL_Error = Module['_SDL_Error'] = createExportWrapper('SDL_Error', 1);
var _IMG_LoadAnimation_RW = Module['_IMG_LoadAnimation_RW'] = createExportWrapper('IMG_LoadAnimation_RW', 2);
var _IMG_FreeAnimation = Module['_IMG_FreeAnimation'] = createExportWrapper('IMG_FreeAnimation', 1);
var _IMG_LoadTGA_RW = Module['_IMG_LoadTGA_RW'] = createExportWrapper('IMG_LoadTGA_RW', 1);
var _IMG_isAVIF = Module['_IMG_isAVIF'] = createExportWrapper('IMG_isAVIF', 1);
var _IMG_LoadAVIF_RW = Module['_IMG_LoadAVIF_RW'] = createExportWrapper('IMG_LoadAVIF_RW', 1);
var _IMG_isCUR = Module['_IMG_isCUR'] = createExportWrapper('IMG_isCUR', 1);
var _IMG_LoadCUR_RW = Module['_IMG_LoadCUR_RW'] = createExportWrapper('IMG_LoadCUR_RW', 1);
var _IMG_isICO = Module['_IMG_isICO'] = createExportWrapper('IMG_isICO', 1);
var _IMG_LoadICO_RW = Module['_IMG_LoadICO_RW'] = createExportWrapper('IMG_LoadICO_RW', 1);
var _IMG_isBMP = Module['_IMG_isBMP'] = createExportWrapper('IMG_isBMP', 1);
var _IMG_LoadBMP_RW = Module['_IMG_LoadBMP_RW'] = createExportWrapper('IMG_LoadBMP_RW', 1);
var _IMG_LoadGIF_RW = Module['_IMG_LoadGIF_RW'] = createExportWrapper('IMG_LoadGIF_RW', 1);
var _IMG_isJPG = Module['_IMG_isJPG'] = createExportWrapper('IMG_isJPG', 1);
var _IMG_LoadJPG_RW = Module['_IMG_LoadJPG_RW'] = createExportWrapper('IMG_LoadJPG_RW', 1);
var _IMG_isJXL = Module['_IMG_isJXL'] = createExportWrapper('IMG_isJXL', 1);
var _IMG_LoadJXL_RW = Module['_IMG_LoadJXL_RW'] = createExportWrapper('IMG_LoadJXL_RW', 1);
var _IMG_isLBM = Module['_IMG_isLBM'] = createExportWrapper('IMG_isLBM', 1);
var _IMG_LoadLBM_RW = Module['_IMG_LoadLBM_RW'] = createExportWrapper('IMG_LoadLBM_RW', 1);
var _IMG_isPCX = Module['_IMG_isPCX'] = createExportWrapper('IMG_isPCX', 1);
var _IMG_LoadPCX_RW = Module['_IMG_LoadPCX_RW'] = createExportWrapper('IMG_LoadPCX_RW', 1);
var _IMG_isPNG = Module['_IMG_isPNG'] = createExportWrapper('IMG_isPNG', 1);
var _IMG_LoadPNG_RW = Module['_IMG_LoadPNG_RW'] = createExportWrapper('IMG_LoadPNG_RW', 1);
var _IMG_isPNM = Module['_IMG_isPNM'] = createExportWrapper('IMG_isPNM', 1);
var _IMG_LoadPNM_RW = Module['_IMG_LoadPNM_RW'] = createExportWrapper('IMG_LoadPNM_RW', 1);
var _IMG_isSVG = Module['_IMG_isSVG'] = createExportWrapper('IMG_isSVG', 1);
var _IMG_LoadSVG_RW = Module['_IMG_LoadSVG_RW'] = createExportWrapper('IMG_LoadSVG_RW', 1);
var _IMG_isTIF = Module['_IMG_isTIF'] = createExportWrapper('IMG_isTIF', 1);
var _IMG_LoadTIF_RW = Module['_IMG_LoadTIF_RW'] = createExportWrapper('IMG_LoadTIF_RW', 1);
var _IMG_isXCF = Module['_IMG_isXCF'] = createExportWrapper('IMG_isXCF', 1);
var _IMG_LoadXCF_RW = Module['_IMG_LoadXCF_RW'] = createExportWrapper('IMG_LoadXCF_RW', 1);
var _IMG_isXPM = Module['_IMG_isXPM'] = createExportWrapper('IMG_isXPM', 1);
var _IMG_LoadXPM_RW = Module['_IMG_LoadXPM_RW'] = createExportWrapper('IMG_LoadXPM_RW', 1);
var _IMG_isXV = Module['_IMG_isXV'] = createExportWrapper('IMG_isXV', 1);
var _IMG_LoadXV_RW = Module['_IMG_LoadXV_RW'] = createExportWrapper('IMG_LoadXV_RW', 1);
var _IMG_isWEBP = Module['_IMG_isWEBP'] = createExportWrapper('IMG_isWEBP', 1);
var _IMG_LoadWEBP_RW = Module['_IMG_LoadWEBP_RW'] = createExportWrapper('IMG_LoadWEBP_RW', 1);
var _IMG_isQOI = Module['_IMG_isQOI'] = createExportWrapper('IMG_isQOI', 1);
var _IMG_LoadQOI_RW = Module['_IMG_LoadQOI_RW'] = createExportWrapper('IMG_LoadQOI_RW', 1);
var _IMG_SaveJPG = Module['_IMG_SaveJPG'] = createExportWrapper('IMG_SaveJPG', 3);
var _IMG_SaveJPG_RW = Module['_IMG_SaveJPG_RW'] = createExportWrapper('IMG_SaveJPG_RW', 4);
var _SDL_RWtell = Module['_SDL_RWtell'] = createExportWrapper('SDL_RWtell', 1);
var _SDL_RWread = Module['_SDL_RWread'] = createExportWrapper('SDL_RWread', 4);
var _setTempRet0 = Module['_setTempRet0'] = createExportWrapper('setTempRet0', 1);
var _getTempRet0 = Module['_getTempRet0'] = createExportWrapper('getTempRet0', 0);
var _SDL_MapRGB = Module['_SDL_MapRGB'] = createExportWrapper('SDL_MapRGB', 4);
var _SDL_SetColorKey = Module['_SDL_SetColorKey'] = createExportWrapper('SDL_SetColorKey', 3);
var _IMG_SavePNG = Module['_IMG_SavePNG'] = createExportWrapper('IMG_SavePNG', 2);
var _IMG_SavePNG_RW = Module['_IMG_SavePNG_RW'] = createExportWrapper('IMG_SavePNG_RW', 3);
var _SDL_ConvertSurfaceFormat = Module['_SDL_ConvertSurfaceFormat'] = createExportWrapper('SDL_ConvertSurfaceFormat', 3);
var _SDL_RWwrite = Module['_SDL_RWwrite'] = createExportWrapper('SDL_RWwrite', 4);
var _IMG_LoadSizedSVG_RW = Module['_IMG_LoadSizedSVG_RW'] = createExportWrapper('IMG_LoadSizedSVG_RW', 3);
var _IMG_ReadXPMFromArray = Module['_IMG_ReadXPMFromArray'] = createExportWrapper('IMG_ReadXPMFromArray', 1);
var _IMG_ReadXPMFromArrayToRGB888 = Module['_IMG_ReadXPMFromArrayToRGB888'] = createExportWrapper('IMG_ReadXPMFromArrayToRGB888', 1);
var _malloc = createExportWrapper('malloc', 1);
var ___errno_location = createExportWrapper('__errno_location', 0);
var _strerror = createExportWrapper('strerror', 1);
var _fflush = createExportWrapper('fflush', 1);
var _SDL_strlen = Module['_SDL_strlen'] = createExportWrapper('SDL_strlen', 1);
var _SDL_memcpy = Module['_SDL_memcpy'] = createExportWrapper('SDL_memcpy', 3);
var _SDL_strlcpy = Module['_SDL_strlcpy'] = createExportWrapper('SDL_strlcpy', 3);
var _Mix_SetPanning = Module['_Mix_SetPanning'] = createExportWrapper('Mix_SetPanning', 3);
var _Mix_QuerySpec = Module['_Mix_QuerySpec'] = createExportWrapper('Mix_QuerySpec', 3);
var _Mix_SetPosition = Module['_Mix_SetPosition'] = createExportWrapper('Mix_SetPosition', 3);
var _SDL_memset = Module['_SDL_memset'] = createExportWrapper('SDL_memset', 3);
var _SDL_realloc = Module['_SDL_realloc'] = createExportWrapper('SDL_realloc', 2);
var _Mix_SetDistance = Module['_Mix_SetDistance'] = createExportWrapper('Mix_SetDistance', 2);
var _Mix_SetReverseStereo = Module['_Mix_SetReverseStereo'] = createExportWrapper('Mix_SetReverseStereo', 2);
var _Mix_UnregisterEffect = Module['_Mix_UnregisterEffect'] = createExportWrapper('Mix_UnregisterEffect', 2);
var _Mix_RegisterEffect = Module['_Mix_RegisterEffect'] = createExportWrapper('Mix_RegisterEffect', 4);
var _SDL_getenv = Module['_SDL_getenv'] = createExportWrapper('SDL_getenv', 1);
var _SDL_snprintf = Module['_SDL_snprintf'] = createExportWrapper('SDL_snprintf', 4);
var _SDL_memcmp = Module['_SDL_memcmp'] = createExportWrapper('SDL_memcmp', 3);
var _SDL_ReadLE32 = Module['_SDL_ReadLE32'] = createExportWrapper('SDL_ReadLE32', 1);
var _SDL_ReadBE32 = Module['_SDL_ReadBE32'] = createExportWrapper('SDL_ReadBE32', 1);
var _SDL_ReadBE16 = Module['_SDL_ReadBE16'] = createExportWrapper('SDL_ReadBE16', 1);
var _SDL_sin = Module['_SDL_sin'] = createExportWrapper('SDL_sin', 1);
var _Mix_GetNumChunkDecoders = Module['_Mix_GetNumChunkDecoders'] = createExportWrapper('Mix_GetNumChunkDecoders', 0);
var _Mix_GetChunkDecoder = Module['_Mix_GetChunkDecoder'] = createExportWrapper('Mix_GetChunkDecoder', 1);
var _Mix_HasChunkDecoder = Module['_Mix_HasChunkDecoder'] = createExportWrapper('Mix_HasChunkDecoder', 1);
var _SDL_strcasecmp = Module['_SDL_strcasecmp'] = createExportWrapper('SDL_strcasecmp', 2);
var _SDL_strcmp = Module['_SDL_strcmp'] = createExportWrapper('SDL_strcmp', 2);
var _Mix_Linked_Version = Module['_Mix_Linked_Version'] = createExportWrapper('Mix_Linked_Version', 0);
var _Mix_Init = Module['_Mix_Init'] = createExportWrapper('Mix_Init', 1);
var _Mix_Quit = Module['_Mix_Quit'] = createExportWrapper('Mix_Quit', 0);
var _Mix_OpenAudioDevice = Module['_Mix_OpenAudioDevice'] = createExportWrapper('Mix_OpenAudioDevice', 6);
var _SDL_WasInit = Module['_SDL_WasInit'] = createExportWrapper('SDL_WasInit', 1);
var _SDL_InitSubSystem = Module['_SDL_InitSubSystem'] = createExportWrapper('SDL_InitSubSystem', 1);
var _SDL_OpenAudioDevice = Module['_SDL_OpenAudioDevice'] = createExportWrapper('SDL_OpenAudioDevice', 5);
var _SDL_PauseAudioDevice = Module['_SDL_PauseAudioDevice'] = createExportWrapper('SDL_PauseAudioDevice', 2);
var _Mix_UnregisterAllEffects = Module['_Mix_UnregisterAllEffects'] = createExportWrapper('Mix_UnregisterAllEffects', 1);
var _SDL_LockAudioDevice = Module['_SDL_LockAudioDevice'] = createExportWrapper('SDL_LockAudioDevice', 1);
var _SDL_UnlockAudioDevice = Module['_SDL_UnlockAudioDevice'] = createExportWrapper('SDL_UnlockAudioDevice', 1);
var _Mix_SetMusicCMD = Module['_Mix_SetMusicCMD'] = createExportWrapper('Mix_SetMusicCMD', 1);
var _SDL_CloseAudioDevice = Module['_SDL_CloseAudioDevice'] = createExportWrapper('SDL_CloseAudioDevice', 1);
var _SDL_AtomicGet = Module['_SDL_AtomicGet'] = createExportWrapper('SDL_AtomicGet', 1);
var _SDL_MixAudioFormat = Module['_SDL_MixAudioFormat'] = createExportWrapper('SDL_MixAudioFormat', 5);
var _Mix_PauseAudio = Module['_Mix_PauseAudio'] = createExportWrapper('Mix_PauseAudio', 1);
var _Mix_AllocateChannels = Module['_Mix_AllocateChannels'] = createExportWrapper('Mix_AllocateChannels', 1);
var _Mix_HaltChannel = Module['_Mix_HaltChannel'] = createExportWrapper('Mix_HaltChannel', 1);
var _Mix_LoadWAV_RW = Module['_Mix_LoadWAV_RW'] = createExportWrapper('Mix_LoadWAV_RW', 2);
var _SDL_LoadWAV_RW = Module['_SDL_LoadWAV_RW'] = createExportWrapper('SDL_LoadWAV_RW', 5);
var _SDL_BuildAudioCVT = Module['_SDL_BuildAudioCVT'] = createExportWrapper('SDL_BuildAudioCVT', 7);
var _SDL_FreeWAV = Module['_SDL_FreeWAV'] = createExportWrapper('SDL_FreeWAV', 1);
var _SDL_ConvertAudio = Module['_SDL_ConvertAudio'] = createExportWrapper('SDL_ConvertAudio', 1);
var _Mix_QuickLoad_WAV = Module['_Mix_QuickLoad_WAV'] = createExportWrapper('Mix_QuickLoad_WAV', 1);
var _Mix_QuickLoad_RAW = Module['_Mix_QuickLoad_RAW'] = createExportWrapper('Mix_QuickLoad_RAW', 2);
var _Mix_SetPostMix = Module['_Mix_SetPostMix'] = createExportWrapper('Mix_SetPostMix', 2);
var _Mix_HookMusic = Module['_Mix_HookMusic'] = createExportWrapper('Mix_HookMusic', 2);
var _Mix_GetMusicHookData = Module['_Mix_GetMusicHookData'] = createExportWrapper('Mix_GetMusicHookData', 0);
var _Mix_ChannelFinished = Module['_Mix_ChannelFinished'] = createExportWrapper('Mix_ChannelFinished', 1);
var _Mix_ReserveChannels = Module['_Mix_ReserveChannels'] = createExportWrapper('Mix_ReserveChannels', 1);
var _Mix_PlayChannelTimed = Module['_Mix_PlayChannelTimed'] = createExportWrapper('Mix_PlayChannelTimed', 4);
var _Mix_Playing = Module['_Mix_Playing'] = createExportWrapper('Mix_Playing', 1);
var _Mix_ExpireChannel = Module['_Mix_ExpireChannel'] = createExportWrapper('Mix_ExpireChannel', 2);
var _Mix_FadeInChannelTimed = Module['_Mix_FadeInChannelTimed'] = createExportWrapper('Mix_FadeInChannelTimed', 5);
var _Mix_FadeInChannel = Module['_Mix_FadeInChannel'] = createExportWrapper('Mix_FadeInChannel', 4);
var _Mix_VolumeChunk = Module['_Mix_VolumeChunk'] = createExportWrapper('Mix_VolumeChunk', 2);
var _Mix_HaltGroup = Module['_Mix_HaltGroup'] = createExportWrapper('Mix_HaltGroup', 1);
var _Mix_FadeOutChannel = Module['_Mix_FadeOutChannel'] = createExportWrapper('Mix_FadeOutChannel', 2);
var _Mix_FadeOutGroup = Module['_Mix_FadeOutGroup'] = createExportWrapper('Mix_FadeOutGroup', 2);
var _Mix_FadingChannel = Module['_Mix_FadingChannel'] = createExportWrapper('Mix_FadingChannel', 1);
var _Mix_GetChunk = Module['_Mix_GetChunk'] = createExportWrapper('Mix_GetChunk', 1);
var _Mix_Pause = Module['_Mix_Pause'] = createExportWrapper('Mix_Pause', 1);
var _Mix_Resume = Module['_Mix_Resume'] = createExportWrapper('Mix_Resume', 1);
var _Mix_Paused = Module['_Mix_Paused'] = createExportWrapper('Mix_Paused', 1);
var _Mix_GroupChannel = Module['_Mix_GroupChannel'] = createExportWrapper('Mix_GroupChannel', 2);
var _Mix_GroupChannels = Module['_Mix_GroupChannels'] = createExportWrapper('Mix_GroupChannels', 3);
var _Mix_GroupAvailable = Module['_Mix_GroupAvailable'] = createExportWrapper('Mix_GroupAvailable', 1);
var _Mix_GroupCount = Module['_Mix_GroupCount'] = createExportWrapper('Mix_GroupCount', 1);
var _Mix_GroupOldest = Module['_Mix_GroupOldest'] = createExportWrapper('Mix_GroupOldest', 1);
var _Mix_GroupNewer = Module['_Mix_GroupNewer'] = createExportWrapper('Mix_GroupNewer', 1);
var _Mix_MasterVolume = Module['_Mix_MasterVolume'] = createExportWrapper('Mix_MasterVolume', 1);
var _SDL_AtomicSet = Module['_SDL_AtomicSet'] = createExportWrapper('SDL_AtomicSet', 2);
var _SDL_strtol = Module['_SDL_strtol'] = createExportWrapper('SDL_strtol', 3);
var _SDL_Log = Module['_SDL_Log'] = createExportWrapper('SDL_Log', 2);
var _SDL_strncasecmp = Module['_SDL_strncasecmp'] = createExportWrapper('SDL_strncasecmp', 3);
var _SDL_RWFromConstMem = Module['_SDL_RWFromConstMem'] = createExportWrapper('SDL_RWFromConstMem', 2);
var _SDL_iconv_string = Module['_SDL_iconv_string'] = createExportWrapper('SDL_iconv_string', 4);
var _SDL_isdigit = Module['_SDL_isdigit'] = createExportWrapper('SDL_isdigit', 1);
var _Mix_GetNumMusicDecoders = Module['_Mix_GetNumMusicDecoders'] = createExportWrapper('Mix_GetNumMusicDecoders', 0);
var _Mix_GetMusicDecoder = Module['_Mix_GetMusicDecoder'] = createExportWrapper('Mix_GetMusicDecoder', 1);
var _Mix_HasMusicDecoder = Module['_Mix_HasMusicDecoder'] = createExportWrapper('Mix_HasMusicDecoder', 1);
var _Mix_HookMusicFinished = Module['_Mix_HookMusicFinished'] = createExportWrapper('Mix_HookMusicFinished', 1);
var _SDL_GetHintBoolean = Module['_SDL_GetHintBoolean'] = createExportWrapper('SDL_GetHintBoolean', 2);
var _Mix_LoadMUSType_RW = Module['_Mix_LoadMUSType_RW'] = createExportWrapper('Mix_LoadMUSType_RW', 3);
var _SDL_ClearError = Module['_SDL_ClearError'] = createExportWrapper('SDL_ClearError', 0);
var _Mix_LoadMUS_RW = Module['_Mix_LoadMUS_RW'] = createExportWrapper('Mix_LoadMUS_RW', 2);
var _SDL_Delay = Module['_SDL_Delay'] = createExportWrapper('SDL_Delay', 1);
var _Mix_GetMusicType = Module['_Mix_GetMusicType'] = createExportWrapper('Mix_GetMusicType', 1);
var _Mix_GetMusicTitleTag = Module['_Mix_GetMusicTitleTag'] = createExportWrapper('Mix_GetMusicTitleTag', 1);
var _Mix_GetMusicTitle = Module['_Mix_GetMusicTitle'] = createExportWrapper('Mix_GetMusicTitle', 1);
var _Mix_GetMusicArtistTag = Module['_Mix_GetMusicArtistTag'] = createExportWrapper('Mix_GetMusicArtistTag', 1);
var _Mix_GetMusicAlbumTag = Module['_Mix_GetMusicAlbumTag'] = createExportWrapper('Mix_GetMusicAlbumTag', 1);
var _Mix_GetMusicCopyrightTag = Module['_Mix_GetMusicCopyrightTag'] = createExportWrapper('Mix_GetMusicCopyrightTag', 1);
var _Mix_FadeInMusicPos = Module['_Mix_FadeInMusicPos'] = createExportWrapper('Mix_FadeInMusicPos', 4);
var _Mix_FadeInMusic = Module['_Mix_FadeInMusic'] = createExportWrapper('Mix_FadeInMusic', 3);
var _Mix_ModMusicJumpToOrder = Module['_Mix_ModMusicJumpToOrder'] = createExportWrapper('Mix_ModMusicJumpToOrder', 1);
var _Mix_SetMusicPosition = Module['_Mix_SetMusicPosition'] = createExportWrapper('Mix_SetMusicPosition', 1);
var _Mix_GetMusicPosition = Module['_Mix_GetMusicPosition'] = createExportWrapper('Mix_GetMusicPosition', 1);
var _Mix_MusicDuration = Module['_Mix_MusicDuration'] = createExportWrapper('Mix_MusicDuration', 1);
var _Mix_GetMusicLoopStartTime = Module['_Mix_GetMusicLoopStartTime'] = createExportWrapper('Mix_GetMusicLoopStartTime', 1);
var _Mix_GetMusicLoopEndTime = Module['_Mix_GetMusicLoopEndTime'] = createExportWrapper('Mix_GetMusicLoopEndTime', 1);
var _Mix_GetMusicLoopLengthTime = Module['_Mix_GetMusicLoopLengthTime'] = createExportWrapper('Mix_GetMusicLoopLengthTime', 1);
var _Mix_GetMusicVolume = Module['_Mix_GetMusicVolume'] = createExportWrapper('Mix_GetMusicVolume', 1);
var _Mix_FadeOutMusic = Module['_Mix_FadeOutMusic'] = createExportWrapper('Mix_FadeOutMusic', 1);
var _Mix_FadingMusic = Module['_Mix_FadingMusic'] = createExportWrapper('Mix_FadingMusic', 0);
var _Mix_ResumeMusic = Module['_Mix_ResumeMusic'] = createExportWrapper('Mix_ResumeMusic', 0);
var _Mix_RewindMusic = Module['_Mix_RewindMusic'] = createExportWrapper('Mix_RewindMusic', 0);
var _Mix_PausedMusic = Module['_Mix_PausedMusic'] = createExportWrapper('Mix_PausedMusic', 0);
var _Mix_StartTrack = Module['_Mix_StartTrack'] = createExportWrapper('Mix_StartTrack', 2);
var _Mix_GetNumTracks = Module['_Mix_GetNumTracks'] = createExportWrapper('Mix_GetNumTracks', 1);
var _Mix_PlayingMusic = Module['_Mix_PlayingMusic'] = createExportWrapper('Mix_PlayingMusic', 0);
var _Mix_SetSynchroValue = Module['_Mix_SetSynchroValue'] = createExportWrapper('Mix_SetSynchroValue', 1);
var _Mix_GetSynchroValue = Module['_Mix_GetSynchroValue'] = createExportWrapper('Mix_GetSynchroValue', 0);
var _Mix_SetTimidityCfg = Module['_Mix_SetTimidityCfg'] = createExportWrapper('Mix_SetTimidityCfg', 1);
var _SDL_strdup = Module['_SDL_strdup'] = createExportWrapper('SDL_strdup', 1);
var _Mix_GetTimidityCfg = Module['_Mix_GetTimidityCfg'] = createExportWrapper('Mix_GetTimidityCfg', 0);
var _Mix_SetSoundFonts = Module['_Mix_SetSoundFonts'] = createExportWrapper('Mix_SetSoundFonts', 1);
var _Mix_GetSoundFonts = Module['_Mix_GetSoundFonts'] = createExportWrapper('Mix_GetSoundFonts', 0);
var _Mix_EachSoundFont = Module['_Mix_EachSoundFont'] = createExportWrapper('Mix_EachSoundFont', 2);
var _SDL_strtokr = Module['_SDL_strtokr'] = createExportWrapper('SDL_strtokr', 3);
var _SDL_strchr = Module['_SDL_strchr'] = createExportWrapper('SDL_strchr', 2);
var _SDL_memmove = Module['_SDL_memmove'] = createExportWrapper('SDL_memmove', 3);
var _SDL_strtoll = Module['_SDL_strtoll'] = createExportWrapper('SDL_strtoll', 3);
var _SDL_AudioStreamClear = Module['_SDL_AudioStreamClear'] = createExportWrapper('SDL_AudioStreamClear', 1);
var _SDL_FreeAudioStream = Module['_SDL_FreeAudioStream'] = createExportWrapper('SDL_FreeAudioStream', 1);
var _SDL_NewAudioStream = Module['_SDL_NewAudioStream'] = createExportWrapper('SDL_NewAudioStream', 6);
var _SDL_AudioStreamGet = Module['_SDL_AudioStreamGet'] = createExportWrapper('SDL_AudioStreamGet', 3);
var _SDL_AudioStreamFlush = Module['_SDL_AudioStreamFlush'] = createExportWrapper('SDL_AudioStreamFlush', 1);
var _SDL_AudioStreamPut = Module['_SDL_AudioStreamPut'] = createExportWrapper('SDL_AudioStreamPut', 3);
var _SDL_strncmp = Module['_SDL_strncmp'] = createExportWrapper('SDL_strncmp', 3);
var _SDL_RWsize = Module['_SDL_RWsize'] = createExportWrapper('SDL_RWsize', 1);
var _SDL_atoi = Module['_SDL_atoi'] = createExportWrapper('SDL_atoi', 1);
var _SDL_atof = Module['_SDL_atof'] = createExportWrapper('SDL_atof', 1);
var _TTF_SetDirection = Module['_TTF_SetDirection'] = createExportWrapper('TTF_SetDirection', 1);
var _TTF_SetScript = Module['_TTF_SetScript'] = createExportWrapper('TTF_SetScript', 1);
var _TTF_Linked_Version = Module['_TTF_Linked_Version'] = createExportWrapper('TTF_Linked_Version', 0);
var _TTF_ByteSwappedUNICODE = Module['_TTF_ByteSwappedUNICODE'] = createExportWrapper('TTF_ByteSwappedUNICODE', 1);
var _FT_Init_FreeType = Module['_FT_Init_FreeType'] = createExportWrapper('FT_Init_FreeType', 1);
var _TTF_GetFreeTypeVersion = Module['_TTF_GetFreeTypeVersion'] = createExportWrapper('TTF_GetFreeTypeVersion', 3);
var _FT_Library_Version = Module['_FT_Library_Version'] = createExportWrapper('FT_Library_Version', 4);
var _TTF_GetHarfBuzzVersion = Module['_TTF_GetHarfBuzzVersion'] = createExportWrapper('TTF_GetHarfBuzzVersion', 3);
var _TTF_OpenFontIndexDPIRW = Module['_TTF_OpenFontIndexDPIRW'] = createExportWrapper('TTF_OpenFontIndexDPIRW', 6);
var _FT_Open_Face = Module['_FT_Open_Face'] = createExportWrapper('FT_Open_Face', 4);
var _FT_Set_Charmap = Module['_FT_Set_Charmap'] = createExportWrapper('FT_Set_Charmap', 2);
var _TTF_SetFontSizeDPI = Module['_TTF_SetFontSizeDPI'] = createExportWrapper('TTF_SetFontSizeDPI', 4);
var _FT_Done_Face = Module['_FT_Done_Face'] = createExportWrapper('FT_Done_Face', 1);
var _TTF_SetFontKerning = Module['_TTF_SetFontKerning'] = createExportWrapper('TTF_SetFontKerning', 2);
var _FT_Set_Char_Size = Module['_FT_Set_Char_Size'] = createExportWrapper('FT_Set_Char_Size', 5);
var _FT_Select_Size = Module['_FT_Select_Size'] = createExportWrapper('FT_Select_Size', 2);
var _FT_MulFix = Module['_FT_MulFix'] = createExportWrapper('FT_MulFix', 2);
var _TTF_SetFontSize = Module['_TTF_SetFontSize'] = createExportWrapper('TTF_SetFontSize', 2);
var _TTF_OpenFontDPIRW = Module['_TTF_OpenFontDPIRW'] = createExportWrapper('TTF_OpenFontDPIRW', 5);
var _TTF_OpenFontIndexRW = Module['_TTF_OpenFontIndexRW'] = createExportWrapper('TTF_OpenFontIndexRW', 4);
var _TTF_OpenFontIndexDPI = Module['_TTF_OpenFontIndexDPI'] = createExportWrapper('TTF_OpenFontIndexDPI', 5);
var _TTF_OpenFontRW = Module['_TTF_OpenFontRW'] = createExportWrapper('TTF_OpenFontRW', 3);
var _TTF_OpenFontDPI = Module['_TTF_OpenFontDPI'] = createExportWrapper('TTF_OpenFontDPI', 4);
var _TTF_OpenFontIndex = Module['_TTF_OpenFontIndex'] = createExportWrapper('TTF_OpenFontIndex', 3);
var _TTF_FontHeight = Module['_TTF_FontHeight'] = createExportWrapper('TTF_FontHeight', 1);
var _TTF_FontAscent = Module['_TTF_FontAscent'] = createExportWrapper('TTF_FontAscent', 1);
var _TTF_FontDescent = Module['_TTF_FontDescent'] = createExportWrapper('TTF_FontDescent', 1);
var _TTF_FontLineSkip = Module['_TTF_FontLineSkip'] = createExportWrapper('TTF_FontLineSkip', 1);
var _TTF_GetFontKerning = Module['_TTF_GetFontKerning'] = createExportWrapper('TTF_GetFontKerning', 1);
var _TTF_FontFaces = Module['_TTF_FontFaces'] = createExportWrapper('TTF_FontFaces', 1);
var _TTF_FontFaceIsFixedWidth = Module['_TTF_FontFaceIsFixedWidth'] = createExportWrapper('TTF_FontFaceIsFixedWidth', 1);
var _TTF_FontFaceFamilyName = Module['_TTF_FontFaceFamilyName'] = createExportWrapper('TTF_FontFaceFamilyName', 1);
var _TTF_FontFaceStyleName = Module['_TTF_FontFaceStyleName'] = createExportWrapper('TTF_FontFaceStyleName', 1);
var _TTF_GlyphIsProvided = Module['_TTF_GlyphIsProvided'] = createExportWrapper('TTF_GlyphIsProvided', 2);
var _FT_Get_Char_Index = Module['_FT_Get_Char_Index'] = createExportWrapper('FT_Get_Char_Index', 2);
var _TTF_GlyphIsProvided32 = Module['_TTF_GlyphIsProvided32'] = createExportWrapper('TTF_GlyphIsProvided32', 2);
var _TTF_GlyphMetrics = Module['_TTF_GlyphMetrics'] = createExportWrapper('TTF_GlyphMetrics', 7);
var _TTF_GlyphMetrics32 = Module['_TTF_GlyphMetrics32'] = createExportWrapper('TTF_GlyphMetrics32', 7);
var _TTF_SetFontDirection = Module['_TTF_SetFontDirection'] = createExportWrapper('TTF_SetFontDirection', 2);
var _TTF_SetFontScriptName = Module['_TTF_SetFontScriptName'] = createExportWrapper('TTF_SetFontScriptName', 2);
var _TTF_SizeText = Module['_TTF_SizeText'] = createExportWrapper('TTF_SizeText', 4);
var _SDL_utf8strlen = Module['_SDL_utf8strlen'] = createExportWrapper('SDL_utf8strlen', 1);
var _TTF_SizeUTF8 = Module['_TTF_SizeUTF8'] = createExportWrapper('TTF_SizeUTF8', 4);
var _TTF_SizeUNICODE = Module['_TTF_SizeUNICODE'] = createExportWrapper('TTF_SizeUNICODE', 4);
var _TTF_MeasureText = Module['_TTF_MeasureText'] = createExportWrapper('TTF_MeasureText', 5);
var _TTF_MeasureUTF8 = Module['_TTF_MeasureUTF8'] = createExportWrapper('TTF_MeasureUTF8', 5);
var _TTF_MeasureUNICODE = Module['_TTF_MeasureUNICODE'] = createExportWrapper('TTF_MeasureUNICODE', 5);
var _TTF_RenderText_Solid = Module['_TTF_RenderText_Solid'] = createExportWrapper('TTF_RenderText_Solid', 3);
var _SDL_SetSurfaceBlendMode = Module['_SDL_SetSurfaceBlendMode'] = createExportWrapper('SDL_SetSurfaceBlendMode', 2);
var _TTF_RenderUTF8_Solid = Module['_TTF_RenderUTF8_Solid'] = createExportWrapper('TTF_RenderUTF8_Solid', 3);
var _TTF_RenderUNICODE_Solid = Module['_TTF_RenderUNICODE_Solid'] = createExportWrapper('TTF_RenderUNICODE_Solid', 3);
var _TTF_RenderGlyph_Solid = Module['_TTF_RenderGlyph_Solid'] = createExportWrapper('TTF_RenderGlyph_Solid', 3);
var _TTF_RenderGlyph32_Solid = Module['_TTF_RenderGlyph32_Solid'] = createExportWrapper('TTF_RenderGlyph32_Solid', 3);
var _TTF_RenderText_Shaded = Module['_TTF_RenderText_Shaded'] = createExportWrapper('TTF_RenderText_Shaded', 4);
var _TTF_RenderUTF8_Shaded = Module['_TTF_RenderUTF8_Shaded'] = createExportWrapper('TTF_RenderUTF8_Shaded', 4);
var _TTF_RenderUNICODE_Shaded = Module['_TTF_RenderUNICODE_Shaded'] = createExportWrapper('TTF_RenderUNICODE_Shaded', 4);
var _TTF_RenderGlyph_Shaded = Module['_TTF_RenderGlyph_Shaded'] = createExportWrapper('TTF_RenderGlyph_Shaded', 4);
var _TTF_RenderGlyph32_Shaded = Module['_TTF_RenderGlyph32_Shaded'] = createExportWrapper('TTF_RenderGlyph32_Shaded', 4);
var _TTF_RenderUTF8_Blended = Module['_TTF_RenderUTF8_Blended'] = createExportWrapper('TTF_RenderUTF8_Blended', 3);
var _TTF_RenderUNICODE_Blended = Module['_TTF_RenderUNICODE_Blended'] = createExportWrapper('TTF_RenderUNICODE_Blended', 3);
var _TTF_RenderText_LCD = Module['_TTF_RenderText_LCD'] = createExportWrapper('TTF_RenderText_LCD', 4);
var _TTF_RenderUTF8_LCD = Module['_TTF_RenderUTF8_LCD'] = createExportWrapper('TTF_RenderUTF8_LCD', 4);
var _TTF_RenderUNICODE_LCD = Module['_TTF_RenderUNICODE_LCD'] = createExportWrapper('TTF_RenderUNICODE_LCD', 4);
var _TTF_RenderGlyph_LCD = Module['_TTF_RenderGlyph_LCD'] = createExportWrapper('TTF_RenderGlyph_LCD', 4);
var _TTF_RenderGlyph32_LCD = Module['_TTF_RenderGlyph32_LCD'] = createExportWrapper('TTF_RenderGlyph32_LCD', 4);
var _TTF_RenderText_Solid_Wrapped = Module['_TTF_RenderText_Solid_Wrapped'] = createExportWrapper('TTF_RenderText_Solid_Wrapped', 4);
var _TTF_RenderUTF8_Solid_Wrapped = Module['_TTF_RenderUTF8_Solid_Wrapped'] = createExportWrapper('TTF_RenderUTF8_Solid_Wrapped', 4);
var _TTF_RenderUNICODE_Solid_Wrapped = Module['_TTF_RenderUNICODE_Solid_Wrapped'] = createExportWrapper('TTF_RenderUNICODE_Solid_Wrapped', 4);
var _TTF_RenderText_Shaded_Wrapped = Module['_TTF_RenderText_Shaded_Wrapped'] = createExportWrapper('TTF_RenderText_Shaded_Wrapped', 5);
var _TTF_RenderUTF8_Shaded_Wrapped = Module['_TTF_RenderUTF8_Shaded_Wrapped'] = createExportWrapper('TTF_RenderUTF8_Shaded_Wrapped', 5);
var _TTF_RenderUNICODE_Shaded_Wrapped = Module['_TTF_RenderUNICODE_Shaded_Wrapped'] = createExportWrapper('TTF_RenderUNICODE_Shaded_Wrapped', 5);
var _TTF_RenderText_Blended_Wrapped = Module['_TTF_RenderText_Blended_Wrapped'] = createExportWrapper('TTF_RenderText_Blended_Wrapped', 4);
var _TTF_RenderUTF8_Blended_Wrapped = Module['_TTF_RenderUTF8_Blended_Wrapped'] = createExportWrapper('TTF_RenderUTF8_Blended_Wrapped', 4);
var _TTF_RenderUNICODE_Blended_Wrapped = Module['_TTF_RenderUNICODE_Blended_Wrapped'] = createExportWrapper('TTF_RenderUNICODE_Blended_Wrapped', 4);
var _TTF_RenderText_LCD_Wrapped = Module['_TTF_RenderText_LCD_Wrapped'] = createExportWrapper('TTF_RenderText_LCD_Wrapped', 5);
var _TTF_RenderUTF8_LCD_Wrapped = Module['_TTF_RenderUTF8_LCD_Wrapped'] = createExportWrapper('TTF_RenderUTF8_LCD_Wrapped', 5);
var _TTF_RenderUNICODE_LCD_Wrapped = Module['_TTF_RenderUNICODE_LCD_Wrapped'] = createExportWrapper('TTF_RenderUNICODE_LCD_Wrapped', 5);
var _TTF_RenderGlyph_Blended = Module['_TTF_RenderGlyph_Blended'] = createExportWrapper('TTF_RenderGlyph_Blended', 3);
var _TTF_RenderGlyph32_Blended = Module['_TTF_RenderGlyph32_Blended'] = createExportWrapper('TTF_RenderGlyph32_Blended', 3);
var _TTF_SetFontStyle = Module['_TTF_SetFontStyle'] = createExportWrapper('TTF_SetFontStyle', 2);
var _TTF_GetFontStyle = Module['_TTF_GetFontStyle'] = createExportWrapper('TTF_GetFontStyle', 1);
var _TTF_SetFontOutline = Module['_TTF_SetFontOutline'] = createExportWrapper('TTF_SetFontOutline', 2);
var _TTF_GetFontOutline = Module['_TTF_GetFontOutline'] = createExportWrapper('TTF_GetFontOutline', 1);
var _TTF_SetFontHinting = Module['_TTF_SetFontHinting'] = createExportWrapper('TTF_SetFontHinting', 2);
var _TTF_GetFontHinting = Module['_TTF_GetFontHinting'] = createExportWrapper('TTF_GetFontHinting', 1);
var _TTF_SetFontSDF = Module['_TTF_SetFontSDF'] = createExportWrapper('TTF_SetFontSDF', 2);
var _TTF_GetFontSDF = Module['_TTF_GetFontSDF'] = createExportWrapper('TTF_GetFontSDF', 1);
var _TTF_SetFontWrappedAlign = Module['_TTF_SetFontWrappedAlign'] = createExportWrapper('TTF_SetFontWrappedAlign', 2);
var _TTF_GetFontWrappedAlign = Module['_TTF_GetFontWrappedAlign'] = createExportWrapper('TTF_GetFontWrappedAlign', 1);
var _FT_Done_FreeType = Module['_FT_Done_FreeType'] = createExportWrapper('FT_Done_FreeType', 1);
var _TTF_WasInit = Module['_TTF_WasInit'] = createExportWrapper('TTF_WasInit', 0);
var _TTF_GetFontKerningSize = Module['_TTF_GetFontKerningSize'] = createExportWrapper('TTF_GetFontKerningSize', 3);
var _FT_Get_Kerning = Module['_FT_Get_Kerning'] = createExportWrapper('FT_Get_Kerning', 5);
var _TTF_GetFontKerningSizeGlyphs = Module['_TTF_GetFontKerningSizeGlyphs'] = createExportWrapper('TTF_GetFontKerningSizeGlyphs', 3);
var _TTF_GetFontKerningSizeGlyphs32 = Module['_TTF_GetFontKerningSizeGlyphs32'] = createExportWrapper('TTF_GetFontKerningSizeGlyphs32', 3);
var _FT_Load_Glyph = Module['_FT_Load_Glyph'] = createExportWrapper('FT_Load_Glyph', 3);
var _FT_Outline_Translate = Module['_FT_Outline_Translate'] = createExportWrapper('FT_Outline_Translate', 3);
var _FT_Outline_Transform = Module['_FT_Outline_Transform'] = createExportWrapper('FT_Outline_Transform', 2);
var _FT_Get_Glyph = Module['_FT_Get_Glyph'] = createExportWrapper('FT_Get_Glyph', 2);
var _FT_Stroker_New = Module['_FT_Stroker_New'] = createExportWrapper('FT_Stroker_New', 2);
var _FT_Stroker_Set = Module['_FT_Stroker_Set'] = createExportWrapper('FT_Stroker_Set', 5);
var _FT_Glyph_Stroke = Module['_FT_Glyph_Stroke'] = createExportWrapper('FT_Glyph_Stroke', 3);
var _FT_Stroker_Done = Module['_FT_Stroker_Done'] = createExportWrapper('FT_Stroker_Done', 1);
var _FT_Glyph_To_Bitmap = Module['_FT_Glyph_To_Bitmap'] = createExportWrapper('FT_Glyph_To_Bitmap', 4);
var _FT_Done_Glyph = Module['_FT_Done_Glyph'] = createExportWrapper('FT_Done_Glyph', 1);
var _FT_Render_Glyph = Module['_FT_Render_Glyph'] = createExportWrapper('FT_Render_Glyph', 2);
var _SDL_CreateRGBSurfaceWithFormatFrom = Module['_SDL_CreateRGBSurfaceWithFormatFrom'] = createExportWrapper('SDL_CreateRGBSurfaceWithFormatFrom', 6);
var _FT_Load_Sfnt_Table = Module['_FT_Load_Sfnt_Table'] = createExportWrapper('FT_Load_Sfnt_Table', 5);
var _FT_Reference_Face = Module['_FT_Reference_Face'] = createExportWrapper('FT_Reference_Face', 1);
var _FT_New_Memory_Face = Module['_FT_New_Memory_Face'] = createExportWrapper('FT_New_Memory_Face', 5);
var _FT_Select_Charmap = Module['_FT_Select_Charmap'] = createExportWrapper('FT_Select_Charmap', 2);
var _FT_Set_Transform = Module['_FT_Set_Transform'] = createExportWrapper('FT_Set_Transform', 3);
var _FT_Face_GetCharVariantIndex = Module['_FT_Face_GetCharVariantIndex'] = createExportWrapper('FT_Face_GetCharVariantIndex', 3);
var _FT_Get_Advance = Module['_FT_Get_Advance'] = createExportWrapper('FT_Get_Advance', 4);
var _FT_Get_Glyph_Name = Module['_FT_Get_Glyph_Name'] = createExportWrapper('FT_Get_Glyph_Name', 4);
var _FT_Get_Name_Index = Module['_FT_Get_Name_Index'] = createExportWrapper('FT_Get_Name_Index', 2);
var _SDL_SetMainReady = Module['_SDL_SetMainReady'] = createExportWrapper('SDL_SetMainReady', 0);
var _SDL_VideoInit = Module['_SDL_VideoInit'] = createExportWrapper('SDL_VideoInit', 1);
var _SDL_AudioInit = Module['_SDL_AudioInit'] = createExportWrapper('SDL_AudioInit', 1);
var _SDL_QuitSubSystem = Module['_SDL_QuitSubSystem'] = createExportWrapper('SDL_QuitSubSystem', 1);
var _SDL_AudioQuit = Module['_SDL_AudioQuit'] = createExportWrapper('SDL_AudioQuit', 0);
var _SDL_VideoQuit = Module['_SDL_VideoQuit'] = createExportWrapper('SDL_VideoQuit', 0);
var _SDL_ClearHints = Module['_SDL_ClearHints'] = createExportWrapper('SDL_ClearHints', 0);
var _SDL_TLSCleanup = Module['_SDL_TLSCleanup'] = createExportWrapper('SDL_TLSCleanup', 0);
var _SDL_GetVersion = Module['_SDL_GetVersion'] = createExportWrapper('SDL_GetVersion', 1);
var _SDL_GetRevision = Module['_SDL_GetRevision'] = createExportWrapper('SDL_GetRevision', 0);
var _SDL_GetRevisionNumber = Module['_SDL_GetRevisionNumber'] = createExportWrapper('SDL_GetRevisionNumber', 0);
var _SDL_GetPlatform = Module['_SDL_GetPlatform'] = createExportWrapper('SDL_GetPlatform', 0);
var _SDL_IsTablet = Module['_SDL_IsTablet'] = createExportWrapper('SDL_IsTablet', 0);
var _SDL_SIMDAlloc = Module['_SDL_SIMDAlloc'] = createExportWrapper('SDL_SIMDAlloc', 1);
var _SDL_FillRect = Module['_SDL_FillRect'] = createExportWrapper('SDL_FillRect', 3);
var _SDL_SIMDFree = Module['_SDL_SIMDFree'] = createExportWrapper('SDL_SIMDFree', 1);
var _SDL_LockSurface = Module['_SDL_LockSurface'] = createExportWrapper('SDL_LockSurface', 1);
var _SDL_UnlockSurface = Module['_SDL_UnlockSurface'] = createExportWrapper('SDL_UnlockSurface', 1);
var _SDL_ReportAssertion = Module['_SDL_ReportAssertion'] = createExportWrapper('SDL_ReportAssertion', 4);
var _SDL_SetAssertionHandler = Module['_SDL_SetAssertionHandler'] = createExportWrapper('SDL_SetAssertionHandler', 2);
var _SDL_GetWindowFlags = Module['_SDL_GetWindowFlags'] = createExportWrapper('SDL_GetWindowFlags', 1);
var _SDL_MinimizeWindow = Module['_SDL_MinimizeWindow'] = createExportWrapper('SDL_MinimizeWindow', 1);
var _SDL_ShowMessageBox = Module['_SDL_ShowMessageBox'] = createExportWrapper('SDL_ShowMessageBox', 2);
var _SDL_RestoreWindow = Module['_SDL_RestoreWindow'] = createExportWrapper('SDL_RestoreWindow', 1);
var _SDL_GetAssertionReport = Module['_SDL_GetAssertionReport'] = createExportWrapper('SDL_GetAssertionReport', 0);
var _SDL_ResetAssertionReport = Module['_SDL_ResetAssertionReport'] = createExportWrapper('SDL_ResetAssertionReport', 0);
var _SDL_GetDefaultAssertionHandler = Module['_SDL_GetDefaultAssertionHandler'] = createExportWrapper('SDL_GetDefaultAssertionHandler', 0);
var _SDL_GetAssertionHandler = Module['_SDL_GetAssertionHandler'] = createExportWrapper('SDL_GetAssertionHandler', 1);
var _SDL_LogMessageV = Module['_SDL_LogMessageV'] = createExportWrapper('SDL_LogMessageV', 4);
var _SDL_AtomicCAS = Module['_SDL_AtomicCAS'] = createExportWrapper('SDL_AtomicCAS', 3);
var _SDL_AtomicCASPtr = Module['_SDL_AtomicCASPtr'] = createExportWrapper('SDL_AtomicCASPtr', 3);
var _SDL_AtomicSetPtr = Module['_SDL_AtomicSetPtr'] = createExportWrapper('SDL_AtomicSetPtr', 2);
var _SDL_AtomicAdd = Module['_SDL_AtomicAdd'] = createExportWrapper('SDL_AtomicAdd', 2);
var _SDL_AtomicGetPtr = Module['_SDL_AtomicGetPtr'] = createExportWrapper('SDL_AtomicGetPtr', 1);
var _SDL_MemoryBarrierReleaseFunction = Module['_SDL_MemoryBarrierReleaseFunction'] = createExportWrapper('SDL_MemoryBarrierReleaseFunction', 0);
var _SDL_AtomicLock = Module['_SDL_AtomicLock'] = createExportWrapper('SDL_AtomicLock', 1);
var _SDL_AtomicUnlock = Module['_SDL_AtomicUnlock'] = createExportWrapper('SDL_AtomicUnlock', 1);
var _SDL_MemoryBarrierAcquireFunction = Module['_SDL_MemoryBarrierAcquireFunction'] = createExportWrapper('SDL_MemoryBarrierAcquireFunction', 0);
var _SDL_EventState = Module['_SDL_EventState'] = createExportWrapper('SDL_EventState', 2);
var _SDL_PushEvent = Module['_SDL_PushEvent'] = createExportWrapper('SDL_PushEvent', 1);
var _SDL_LockMutex = Module['_SDL_LockMutex'] = createExportWrapper('SDL_LockMutex', 1);
var _SDL_UnlockMutex = Module['_SDL_UnlockMutex'] = createExportWrapper('SDL_UnlockMutex', 1);
var _SDL_QueueAudio = Module['_SDL_QueueAudio'] = createExportWrapper('SDL_QueueAudio', 3);
var _SDL_DequeueAudio = Module['_SDL_DequeueAudio'] = createExportWrapper('SDL_DequeueAudio', 3);
var _SDL_GetQueuedAudioSize = Module['_SDL_GetQueuedAudioSize'] = createExportWrapper('SDL_GetQueuedAudioSize', 1);
var _SDL_ClearQueuedAudio = Module['_SDL_ClearQueuedAudio'] = createExportWrapper('SDL_ClearQueuedAudio', 1);
var _SDL_GetNumAudioDrivers = Module['_SDL_GetNumAudioDrivers'] = createExportWrapper('SDL_GetNumAudioDrivers', 0);
var _SDL_GetAudioDriver = Module['_SDL_GetAudioDriver'] = createExportWrapper('SDL_GetAudioDriver', 1);
var _SDL_GetHint = Module['_SDL_GetHint'] = createExportWrapper('SDL_GetHint', 1);
var _SDL_CreateMutex = Module['_SDL_CreateMutex'] = createExportWrapper('SDL_CreateMutex', 0);
var _SDL_GetCurrentAudioDriver = Module['_SDL_GetCurrentAudioDriver'] = createExportWrapper('SDL_GetCurrentAudioDriver', 0);
var _SDL_DestroyMutex = Module['_SDL_DestroyMutex'] = createExportWrapper('SDL_DestroyMutex', 1);
var _SDL_GetNumAudioDevices = Module['_SDL_GetNumAudioDevices'] = createExportWrapper('SDL_GetNumAudioDevices', 1);
var _SDL_GetAudioDeviceName = Module['_SDL_GetAudioDeviceName'] = createExportWrapper('SDL_GetAudioDeviceName', 2);
var _SDL_GetAudioDeviceSpec = Module['_SDL_GetAudioDeviceSpec'] = createExportWrapper('SDL_GetAudioDeviceSpec', 3);
var _SDL_GetDefaultAudioInfo = Module['_SDL_GetDefaultAudioInfo'] = createExportWrapper('SDL_GetDefaultAudioInfo', 3);
var _SDL_OpenAudio = Module['_SDL_OpenAudio'] = createExportWrapper('SDL_OpenAudio', 2);
var _SDL_GetAudioDeviceStatus = Module['_SDL_GetAudioDeviceStatus'] = createExportWrapper('SDL_GetAudioDeviceStatus', 1);
var _SDL_GetAudioStatus = Module['_SDL_GetAudioStatus'] = createExportWrapper('SDL_GetAudioStatus', 0);
var _SDL_PauseAudio = Module['_SDL_PauseAudio'] = createExportWrapper('SDL_PauseAudio', 1);
var _SDL_LockAudio = Module['_SDL_LockAudio'] = createExportWrapper('SDL_LockAudio', 0);
var _SDL_UnlockAudio = Module['_SDL_UnlockAudio'] = createExportWrapper('SDL_UnlockAudio', 0);
var _SDL_WaitThread = Module['_SDL_WaitThread'] = createExportWrapper('SDL_WaitThread', 2);
var _SDL_CloseAudio = Module['_SDL_CloseAudio'] = createExportWrapper('SDL_CloseAudio', 0);
var _SDL_MixAudio = Module['_SDL_MixAudio'] = createExportWrapper('SDL_MixAudio', 4);
var _SDL_ThreadID = Module['_SDL_ThreadID'] = createExportWrapper('SDL_ThreadID', 0);
var _SDL_SetThreadPriority = Module['_SDL_SetThreadPriority'] = createExportWrapper('SDL_SetThreadPriority', 1);
var _SDL_AudioStreamAvailable = Module['_SDL_AudioStreamAvailable'] = createExportWrapper('SDL_AudioStreamAvailable', 1);
var _SDL_ceil = Module['_SDL_ceil'] = createExportWrapper('SDL_ceil', 1);
var _SDL_IntersectRect = Module['_SDL_IntersectRect'] = createExportWrapper('SDL_IntersectRect', 3);
var _SDL_IntersectRectAndLine = Module['_SDL_IntersectRectAndLine'] = createExportWrapper('SDL_IntersectRectAndLine', 5);
var _SDL_sscanf = Module['_SDL_sscanf'] = createExportWrapper('SDL_sscanf', 3);
var _SDL_HasMMX = Module['_SDL_HasMMX'] = createExportWrapper('SDL_HasMMX', 0);
var _SDL_Has3DNow = Module['_SDL_Has3DNow'] = createExportWrapper('SDL_Has3DNow', 0);
var _SDL_HasSSE = Module['_SDL_HasSSE'] = createExportWrapper('SDL_HasSSE', 0);
var _SDL_HasSSE2 = Module['_SDL_HasSSE2'] = createExportWrapper('SDL_HasSSE2', 0);
var _SDL_HasAltiVec = Module['_SDL_HasAltiVec'] = createExportWrapper('SDL_HasAltiVec', 0);
var _SDL_HasARMSIMD = Module['_SDL_HasARMSIMD'] = createExportWrapper('SDL_HasARMSIMD', 0);
var _SDL_LoadBMP_RW = Module['_SDL_LoadBMP_RW'] = createExportWrapper('SDL_LoadBMP_RW', 2);
var _SDL_ReadLE16 = Module['_SDL_ReadLE16'] = createExportWrapper('SDL_ReadLE16', 1);
var _SDL_SaveBMP_RW = Module['_SDL_SaveBMP_RW'] = createExportWrapper('SDL_SaveBMP_RW', 3);
var _SDL_ConvertSurface = Module['_SDL_ConvertSurface'] = createExportWrapper('SDL_ConvertSurface', 3);
var _SDL_WriteLE32 = Module['_SDL_WriteLE32'] = createExportWrapper('SDL_WriteLE32', 2);
var _SDL_WriteLE16 = Module['_SDL_WriteLE16'] = createExportWrapper('SDL_WriteLE16', 2);
var _SDL_SetClipboardText = Module['_SDL_SetClipboardText'] = createExportWrapper('SDL_SetClipboardText', 1);
var _SDL_SetPrimarySelectionText = Module['_SDL_SetPrimarySelectionText'] = createExportWrapper('SDL_SetPrimarySelectionText', 1);
var _SDL_GetClipboardText = Module['_SDL_GetClipboardText'] = createExportWrapper('SDL_GetClipboardText', 0);
var _SDL_GetPrimarySelectionText = Module['_SDL_GetPrimarySelectionText'] = createExportWrapper('SDL_GetPrimarySelectionText', 0);
var _SDL_HasClipboardText = Module['_SDL_HasClipboardText'] = createExportWrapper('SDL_HasClipboardText', 0);
var _SDL_HasPrimarySelectionText = Module['_SDL_HasPrimarySelectionText'] = createExportWrapper('SDL_HasPrimarySelectionText', 0);
var _SDL_GetCPUCount = Module['_SDL_GetCPUCount'] = createExportWrapper('SDL_GetCPUCount', 0);
var _SDL_GetCPUCacheLineSize = Module['_SDL_GetCPUCacheLineSize'] = createExportWrapper('SDL_GetCPUCacheLineSize', 0);
var _SDL_HasRDTSC = Module['_SDL_HasRDTSC'] = createExportWrapper('SDL_HasRDTSC', 0);
var _SDL_HasSSE3 = Module['_SDL_HasSSE3'] = createExportWrapper('SDL_HasSSE3', 0);
var _SDL_HasSSE41 = Module['_SDL_HasSSE41'] = createExportWrapper('SDL_HasSSE41', 0);
var _SDL_HasSSE42 = Module['_SDL_HasSSE42'] = createExportWrapper('SDL_HasSSE42', 0);
var _SDL_HasAVX = Module['_SDL_HasAVX'] = createExportWrapper('SDL_HasAVX', 0);
var _SDL_HasAVX2 = Module['_SDL_HasAVX2'] = createExportWrapper('SDL_HasAVX2', 0);
var _SDL_HasAVX512F = Module['_SDL_HasAVX512F'] = createExportWrapper('SDL_HasAVX512F', 0);
var _SDL_HasNEON = Module['_SDL_HasNEON'] = createExportWrapper('SDL_HasNEON', 0);
var _SDL_HasLSX = Module['_SDL_HasLSX'] = createExportWrapper('SDL_HasLSX', 0);
var _SDL_HasLASX = Module['_SDL_HasLASX'] = createExportWrapper('SDL_HasLASX', 0);
var _SDL_GetSystemRAM = Module['_SDL_GetSystemRAM'] = createExportWrapper('SDL_GetSystemRAM', 0);
var _SDL_SIMDGetAlignment = Module['_SDL_SIMDGetAlignment'] = createExportWrapper('SDL_SIMDGetAlignment', 0);
var _SDL_SIMDRealloc = Module['_SDL_SIMDRealloc'] = createExportWrapper('SDL_SIMDRealloc', 2);
var _SDL_crc16 = Module['_SDL_crc16'] = createExportWrapper('SDL_crc16', 3);
var _SDL_crc32 = Module['_SDL_crc32'] = createExportWrapper('SDL_crc32', 3);
var _SDL_LogCritical = Module['_SDL_LogCritical'] = createExportWrapper('SDL_LogCritical', 3);
var _SDL_GetRGBA = Module['_SDL_GetRGBA'] = createExportWrapper('SDL_GetRGBA', 6);
var _SDL_strstr = Module['_SDL_strstr'] = createExportWrapper('SDL_strstr', 2);
var _SDL_UnloadObject = Module['_SDL_UnloadObject'] = createExportWrapper('SDL_UnloadObject', 1);
var _SDL_LoadObject = Module['_SDL_LoadObject'] = createExportWrapper('SDL_LoadObject', 1);
var _SDL_LoadFunction = Module['_SDL_LoadFunction'] = createExportWrapper('SDL_LoadFunction', 2);
var _SDL_LogWarn = Module['_SDL_LogWarn'] = createExportWrapper('SDL_LogWarn', 3);
var _SDL_GL_GetCurrentContext = Module['_SDL_GL_GetCurrentContext'] = createExportWrapper('SDL_GL_GetCurrentContext', 0);
var _SDL_GL_ExtensionSupported = Module['_SDL_GL_ExtensionSupported'] = createExportWrapper('SDL_GL_ExtensionSupported', 1);
var _SDL_ResetKeyboard = Module['_SDL_ResetKeyboard'] = createExportWrapper('SDL_ResetKeyboard', 0);
var _SDL_PixelFormatEnumToMasks = Module['_SDL_PixelFormatEnumToMasks'] = createExportWrapper('SDL_PixelFormatEnumToMasks', 6);
var _SDL_GetWindowSizeInPixels = Module['_SDL_GetWindowSizeInPixels'] = createExportWrapper('SDL_GetWindowSizeInPixels', 3);
var _SDL_GetMouseFocus = Module['_SDL_GetMouseFocus'] = createExportWrapper('SDL_GetMouseFocus', 0);
var _SDL_SetHint = Module['_SDL_SetHint'] = createExportWrapper('SDL_SetHint', 2);
var _SDL_floor = Module['_SDL_floor'] = createExportWrapper('SDL_floor', 1);
var _SDL_GL_LoadLibrary = Module['_SDL_GL_LoadLibrary'] = createExportWrapper('SDL_GL_LoadLibrary', 1);
var _SDL_vsnprintf = Module['_SDL_vsnprintf'] = createExportWrapper('SDL_vsnprintf', 4);
var _SDL_LogGetPriority = Module['_SDL_LogGetPriority'] = createExportWrapper('SDL_LogGetPriority', 1);
var _SDL_LogDebug = Module['_SDL_LogDebug'] = createExportWrapper('SDL_LogDebug', 3);
var _SDL_GetErrorMsg = Module['_SDL_GetErrorMsg'] = createExportWrapper('SDL_GetErrorMsg', 2);
var _SDL_FlushEvents = Module['_SDL_FlushEvents'] = createExportWrapper('SDL_FlushEvents', 2);
var _SDL_JoystickEventState = Module['_SDL_JoystickEventState'] = createExportWrapper('SDL_JoystickEventState', 1);
var _SDL_PeepEvents = Module['_SDL_PeepEvents'] = createExportWrapper('SDL_PeepEvents', 5);
var _SDL_HasEvent = Module['_SDL_HasEvent'] = createExportWrapper('SDL_HasEvent', 1);
var _SDL_HasEvents = Module['_SDL_HasEvents'] = createExportWrapper('SDL_HasEvents', 2);
var _SDL_FlushEvent = Module['_SDL_FlushEvent'] = createExportWrapper('SDL_FlushEvent', 1);
var _SDL_PumpEvents = Module['_SDL_PumpEvents'] = createExportWrapper('SDL_PumpEvents', 0);
var _SDL_JoystickUpdate = Module['_SDL_JoystickUpdate'] = createExportWrapper('SDL_JoystickUpdate', 0);
var _SDL_SensorUpdate = Module['_SDL_SensorUpdate'] = createExportWrapper('SDL_SensorUpdate', 0);
var _SDL_WaitEventTimeout = Module['_SDL_WaitEventTimeout'] = createExportWrapper('SDL_WaitEventTimeout', 2);
var _SDL_NumJoysticks = Module['_SDL_NumJoysticks'] = createExportWrapper('SDL_NumJoysticks', 0);
var _SDL_NumSensors = Module['_SDL_NumSensors'] = createExportWrapper('SDL_NumSensors', 0);
var _SDL_WaitEvent = Module['_SDL_WaitEvent'] = createExportWrapper('SDL_WaitEvent', 1);
var _SDL_SetEventFilter = Module['_SDL_SetEventFilter'] = createExportWrapper('SDL_SetEventFilter', 2);
var _SDL_GetEventFilter = Module['_SDL_GetEventFilter'] = createExportWrapper('SDL_GetEventFilter', 2);
var _SDL_AddEventWatch = Module['_SDL_AddEventWatch'] = createExportWrapper('SDL_AddEventWatch', 2);
var _SDL_DelEventWatch = Module['_SDL_DelEventWatch'] = createExportWrapper('SDL_DelEventWatch', 2);
var _SDL_FilterEvents = Module['_SDL_FilterEvents'] = createExportWrapper('SDL_FilterEvents', 2);
var _SDL_RegisterEvents = Module['_SDL_RegisterEvents'] = createExportWrapper('SDL_RegisterEvents', 1);
var _SDL_AddHintCallback = Module['_SDL_AddHintCallback'] = createExportWrapper('SDL_AddHintCallback', 3);
var _SDL_DelHintCallback = Module['_SDL_DelHintCallback'] = createExportWrapper('SDL_DelHintCallback', 3);
var _SDL_FillRects = Module['_SDL_FillRects'] = createExportWrapper('SDL_FillRects', 4);
var _SDL_GameControllerGetAxisFromString = Module['_SDL_GameControllerGetAxisFromString'] = createExportWrapper('SDL_GameControllerGetAxisFromString', 1);
var _SDL_GameControllerGetStringForAxis = Module['_SDL_GameControllerGetStringForAxis'] = createExportWrapper('SDL_GameControllerGetStringForAxis', 1);
var _SDL_GameControllerGetButtonFromString = Module['_SDL_GameControllerGetButtonFromString'] = createExportWrapper('SDL_GameControllerGetButtonFromString', 1);
var _SDL_GameControllerGetStringForButton = Module['_SDL_GameControllerGetStringForButton'] = createExportWrapper('SDL_GameControllerGetStringForButton', 1);
var _SDL_GameControllerAddMappingsFromRW = Module['_SDL_GameControllerAddMappingsFromRW'] = createExportWrapper('SDL_GameControllerAddMappingsFromRW', 2);
var _SDL_LockJoysticks = Module['_SDL_LockJoysticks'] = createExportWrapper('SDL_LockJoysticks', 0);
var _SDL_UnlockJoysticks = Module['_SDL_UnlockJoysticks'] = createExportWrapper('SDL_UnlockJoysticks', 0);
var _SDL_GameControllerAddMapping = Module['_SDL_GameControllerAddMapping'] = createExportWrapper('SDL_GameControllerAddMapping', 1);
var _SDL_JoystickGetGUIDFromString = Module['_SDL_JoystickGetGUIDFromString'] = createExportWrapper('SDL_JoystickGetGUIDFromString', 2);
var _SDL_GameControllerNumMappings = Module['_SDL_GameControllerNumMappings'] = createExportWrapper('SDL_GameControllerNumMappings', 0);
var _SDL_GameControllerMappingForIndex = Module['_SDL_GameControllerMappingForIndex'] = createExportWrapper('SDL_GameControllerMappingForIndex', 1);
var _SDL_JoystickGetGUIDString = Module['_SDL_JoystickGetGUIDString'] = createExportWrapper('SDL_JoystickGetGUIDString', 3);
var _SDL_strlcat = Module['_SDL_strlcat'] = createExportWrapper('SDL_strlcat', 3);
var _SDL_GameControllerMappingForGUID = Module['_SDL_GameControllerMappingForGUID'] = createExportWrapper('SDL_GameControllerMappingForGUID', 1);
var _SDL_GetJoystickGUIDInfo = Module['_SDL_GetJoystickGUIDInfo'] = createExportWrapper('SDL_GetJoystickGUIDInfo', 5);
var _SDL_GameControllerMapping = Module['_SDL_GameControllerMapping'] = createExportWrapper('SDL_GameControllerMapping', 1);
var _SDL_GameControllerGetButton = Module['_SDL_GameControllerGetButton'] = createExportWrapper('SDL_GameControllerGetButton', 2);
var _SDL_GameControllerGetAxis = Module['_SDL_GameControllerGetAxis'] = createExportWrapper('SDL_GameControllerGetAxis', 2);
var _SDL_IsGameController = Module['_SDL_IsGameController'] = createExportWrapper('SDL_IsGameController', 1);
var _SDL_GameControllerNameForIndex = Module['_SDL_GameControllerNameForIndex'] = createExportWrapper('SDL_GameControllerNameForIndex', 1);
var _SDL_JoystickNameForIndex = Module['_SDL_JoystickNameForIndex'] = createExportWrapper('SDL_JoystickNameForIndex', 1);
var _SDL_JoystickGetDeviceGUID = Module['_SDL_JoystickGetDeviceGUID'] = createExportWrapper('SDL_JoystickGetDeviceGUID', 2);
var _SDL_GameControllerPathForIndex = Module['_SDL_GameControllerPathForIndex'] = createExportWrapper('SDL_GameControllerPathForIndex', 1);
var _SDL_JoystickPathForIndex = Module['_SDL_JoystickPathForIndex'] = createExportWrapper('SDL_JoystickPathForIndex', 1);
var _SDL_GameControllerTypeForIndex = Module['_SDL_GameControllerTypeForIndex'] = createExportWrapper('SDL_GameControllerTypeForIndex', 1);
var _SDL_GameControllerMappingForDeviceIndex = Module['_SDL_GameControllerMappingForDeviceIndex'] = createExportWrapper('SDL_GameControllerMappingForDeviceIndex', 1);
var _SDL_GameControllerOpen = Module['_SDL_GameControllerOpen'] = createExportWrapper('SDL_GameControllerOpen', 1);
var _SDL_JoystickGetDeviceInstanceID = Module['_SDL_JoystickGetDeviceInstanceID'] = createExportWrapper('SDL_JoystickGetDeviceInstanceID', 1);
var _SDL_JoystickOpen = Module['_SDL_JoystickOpen'] = createExportWrapper('SDL_JoystickOpen', 1);
var _SDL_JoystickClose = Module['_SDL_JoystickClose'] = createExportWrapper('SDL_JoystickClose', 1);
var _SDL_GameControllerUpdate = Module['_SDL_GameControllerUpdate'] = createExportWrapper('SDL_GameControllerUpdate', 0);
var _SDL_GameControllerHasAxis = Module['_SDL_GameControllerHasAxis'] = createExportWrapper('SDL_GameControllerHasAxis', 2);
var _SDL_GameControllerGetBindForAxis = Module['_SDL_GameControllerGetBindForAxis'] = createExportWrapper('SDL_GameControllerGetBindForAxis', 3);
var _SDL_JoystickGetAxis = Module['_SDL_JoystickGetAxis'] = createExportWrapper('SDL_JoystickGetAxis', 2);
var _SDL_JoystickGetButton = Module['_SDL_JoystickGetButton'] = createExportWrapper('SDL_JoystickGetButton', 2);
var _SDL_JoystickGetHat = Module['_SDL_JoystickGetHat'] = createExportWrapper('SDL_JoystickGetHat', 2);
var _SDL_GameControllerHasButton = Module['_SDL_GameControllerHasButton'] = createExportWrapper('SDL_GameControllerHasButton', 2);
var _SDL_GameControllerGetBindForButton = Module['_SDL_GameControllerGetBindForButton'] = createExportWrapper('SDL_GameControllerGetBindForButton', 3);
var _SDL_GameControllerGetNumTouchpads = Module['_SDL_GameControllerGetNumTouchpads'] = createExportWrapper('SDL_GameControllerGetNumTouchpads', 1);
var _SDL_GameControllerGetJoystick = Module['_SDL_GameControllerGetJoystick'] = createExportWrapper('SDL_GameControllerGetJoystick', 1);
var _SDL_GameControllerGetNumTouchpadFingers = Module['_SDL_GameControllerGetNumTouchpadFingers'] = createExportWrapper('SDL_GameControllerGetNumTouchpadFingers', 2);
var _SDL_GameControllerGetTouchpadFinger = Module['_SDL_GameControllerGetTouchpadFinger'] = createExportWrapper('SDL_GameControllerGetTouchpadFinger', 7);
var _SDL_GameControllerHasSensor = Module['_SDL_GameControllerHasSensor'] = createExportWrapper('SDL_GameControllerHasSensor', 2);
var _SDL_GameControllerSetSensorEnabled = Module['_SDL_GameControllerSetSensorEnabled'] = createExportWrapper('SDL_GameControllerSetSensorEnabled', 3);
var _SDL_GameControllerIsSensorEnabled = Module['_SDL_GameControllerIsSensorEnabled'] = createExportWrapper('SDL_GameControllerIsSensorEnabled', 2);
var _SDL_GameControllerGetSensorDataRate = Module['_SDL_GameControllerGetSensorDataRate'] = createExportWrapper('SDL_GameControllerGetSensorDataRate', 2);
var _SDL_GameControllerGetSensorData = Module['_SDL_GameControllerGetSensorData'] = createExportWrapper('SDL_GameControllerGetSensorData', 4);
var _SDL_GameControllerGetSensorDataWithTimestamp = Module['_SDL_GameControllerGetSensorDataWithTimestamp'] = createExportWrapper('SDL_GameControllerGetSensorDataWithTimestamp', 5);
var _SDL_GameControllerName = Module['_SDL_GameControllerName'] = createExportWrapper('SDL_GameControllerName', 1);
var _SDL_JoystickName = Module['_SDL_JoystickName'] = createExportWrapper('SDL_JoystickName', 1);
var _SDL_GameControllerPath = Module['_SDL_GameControllerPath'] = createExportWrapper('SDL_GameControllerPath', 1);
var _SDL_JoystickPath = Module['_SDL_JoystickPath'] = createExportWrapper('SDL_JoystickPath', 1);
var _SDL_GameControllerGetType = Module['_SDL_GameControllerGetType'] = createExportWrapper('SDL_GameControllerGetType', 1);
var _SDL_JoystickGetGUID = Module['_SDL_JoystickGetGUID'] = createExportWrapper('SDL_JoystickGetGUID', 2);
var _SDL_GameControllerGetPlayerIndex = Module['_SDL_GameControllerGetPlayerIndex'] = createExportWrapper('SDL_GameControllerGetPlayerIndex', 1);
var _SDL_JoystickGetPlayerIndex = Module['_SDL_JoystickGetPlayerIndex'] = createExportWrapper('SDL_JoystickGetPlayerIndex', 1);
var _SDL_GameControllerSetPlayerIndex = Module['_SDL_GameControllerSetPlayerIndex'] = createExportWrapper('SDL_GameControllerSetPlayerIndex', 2);
var _SDL_JoystickSetPlayerIndex = Module['_SDL_JoystickSetPlayerIndex'] = createExportWrapper('SDL_JoystickSetPlayerIndex', 2);
var _SDL_GameControllerGetVendor = Module['_SDL_GameControllerGetVendor'] = createExportWrapper('SDL_GameControllerGetVendor', 1);
var _SDL_JoystickGetVendor = Module['_SDL_JoystickGetVendor'] = createExportWrapper('SDL_JoystickGetVendor', 1);
var _SDL_GameControllerGetProduct = Module['_SDL_GameControllerGetProduct'] = createExportWrapper('SDL_GameControllerGetProduct', 1);
var _SDL_JoystickGetProduct = Module['_SDL_JoystickGetProduct'] = createExportWrapper('SDL_JoystickGetProduct', 1);
var _SDL_GameControllerGetProductVersion = Module['_SDL_GameControllerGetProductVersion'] = createExportWrapper('SDL_GameControllerGetProductVersion', 1);
var _SDL_JoystickGetProductVersion = Module['_SDL_JoystickGetProductVersion'] = createExportWrapper('SDL_JoystickGetProductVersion', 1);
var _SDL_GameControllerGetFirmwareVersion = Module['_SDL_GameControllerGetFirmwareVersion'] = createExportWrapper('SDL_GameControllerGetFirmwareVersion', 1);
var _SDL_JoystickGetFirmwareVersion = Module['_SDL_JoystickGetFirmwareVersion'] = createExportWrapper('SDL_JoystickGetFirmwareVersion', 1);
var _SDL_GameControllerGetSerial = Module['_SDL_GameControllerGetSerial'] = createExportWrapper('SDL_GameControllerGetSerial', 1);
var _SDL_JoystickGetSerial = Module['_SDL_JoystickGetSerial'] = createExportWrapper('SDL_JoystickGetSerial', 1);
var _SDL_GameControllerGetAttached = Module['_SDL_GameControllerGetAttached'] = createExportWrapper('SDL_GameControllerGetAttached', 1);
var _SDL_JoystickGetAttached = Module['_SDL_JoystickGetAttached'] = createExportWrapper('SDL_JoystickGetAttached', 1);
var _SDL_GameControllerFromInstanceID = Module['_SDL_GameControllerFromInstanceID'] = createExportWrapper('SDL_GameControllerFromInstanceID', 1);
var _SDL_GameControllerFromPlayerIndex = Module['_SDL_GameControllerFromPlayerIndex'] = createExportWrapper('SDL_GameControllerFromPlayerIndex', 1);
var _SDL_JoystickFromPlayerIndex = Module['_SDL_JoystickFromPlayerIndex'] = createExportWrapper('SDL_JoystickFromPlayerIndex', 1);
var _SDL_GameControllerRumble = Module['_SDL_GameControllerRumble'] = createExportWrapper('SDL_GameControllerRumble', 4);
var _SDL_JoystickRumble = Module['_SDL_JoystickRumble'] = createExportWrapper('SDL_JoystickRumble', 4);
var _SDL_GameControllerRumbleTriggers = Module['_SDL_GameControllerRumbleTriggers'] = createExportWrapper('SDL_GameControllerRumbleTriggers', 4);
var _SDL_JoystickRumbleTriggers = Module['_SDL_JoystickRumbleTriggers'] = createExportWrapper('SDL_JoystickRumbleTriggers', 4);
var _SDL_GameControllerHasLED = Module['_SDL_GameControllerHasLED'] = createExportWrapper('SDL_GameControllerHasLED', 1);
var _SDL_JoystickHasLED = Module['_SDL_JoystickHasLED'] = createExportWrapper('SDL_JoystickHasLED', 1);
var _SDL_GameControllerHasRumble = Module['_SDL_GameControllerHasRumble'] = createExportWrapper('SDL_GameControllerHasRumble', 1);
var _SDL_JoystickHasRumble = Module['_SDL_JoystickHasRumble'] = createExportWrapper('SDL_JoystickHasRumble', 1);
var _SDL_GameControllerHasRumbleTriggers = Module['_SDL_GameControllerHasRumbleTriggers'] = createExportWrapper('SDL_GameControllerHasRumbleTriggers', 1);
var _SDL_JoystickHasRumbleTriggers = Module['_SDL_JoystickHasRumbleTriggers'] = createExportWrapper('SDL_JoystickHasRumbleTriggers', 1);
var _SDL_GameControllerSetLED = Module['_SDL_GameControllerSetLED'] = createExportWrapper('SDL_GameControllerSetLED', 4);
var _SDL_JoystickSetLED = Module['_SDL_JoystickSetLED'] = createExportWrapper('SDL_JoystickSetLED', 4);
var _SDL_GameControllerSendEffect = Module['_SDL_GameControllerSendEffect'] = createExportWrapper('SDL_GameControllerSendEffect', 3);
var _SDL_JoystickSendEffect = Module['_SDL_JoystickSendEffect'] = createExportWrapper('SDL_JoystickSendEffect', 3);
var _SDL_GameControllerClose = Module['_SDL_GameControllerClose'] = createExportWrapper('SDL_GameControllerClose', 1);
var _SDL_GameControllerEventState = Module['_SDL_GameControllerEventState'] = createExportWrapper('SDL_GameControllerEventState', 1);
var _SDL_GameControllerGetAppleSFSymbolsNameForButton = Module['_SDL_GameControllerGetAppleSFSymbolsNameForButton'] = createExportWrapper('SDL_GameControllerGetAppleSFSymbolsNameForButton', 2);
var _SDL_GameControllerGetAppleSFSymbolsNameForAxis = Module['_SDL_GameControllerGetAppleSFSymbolsNameForAxis'] = createExportWrapper('SDL_GameControllerGetAppleSFSymbolsNameForAxis', 2);
var _SDL_asprintf = Module['_SDL_asprintf'] = createExportWrapper('SDL_asprintf', 3);
var _SDL_LoadFile = Module['_SDL_LoadFile'] = createExportWrapper('SDL_LoadFile', 2);
var _SDL_RecordGesture = Module['_SDL_RecordGesture'] = createExportWrapper('SDL_RecordGesture', 2);
var _SDL_SaveAllDollarTemplates = Module['_SDL_SaveAllDollarTemplates'] = createExportWrapper('SDL_SaveAllDollarTemplates', 1);
var _SDL_SaveDollarTemplate = Module['_SDL_SaveDollarTemplate'] = createExportWrapper('SDL_SaveDollarTemplate', 3);
var _SDL_LoadDollarTemplates = Module['_SDL_LoadDollarTemplates'] = createExportWrapper('SDL_LoadDollarTemplates', 3);
var _SDL_fabs = Module['_SDL_fabs'] = createExportWrapper('SDL_fabs', 1);
var _SDL_sqrt = Module['_SDL_sqrt'] = createExportWrapper('SDL_sqrt', 1);
var _SDL_atan2 = Module['_SDL_atan2'] = createExportWrapper('SDL_atan2', 2);
var _SDL_cos = Module['_SDL_cos'] = createExportWrapper('SDL_cos', 1);
var _SDL_setenv = Module['_SDL_setenv'] = createExportWrapper('SDL_setenv', 3);
var _SDL_GUIDToString = Module['_SDL_GUIDToString'] = createExportWrapper('SDL_GUIDToString', 3);
var _SDL_GUIDFromString = Module['_SDL_GUIDFromString'] = createExportWrapper('SDL_GUIDFromString', 2);
var _SDL_NumHaptics = Module['_SDL_NumHaptics'] = createExportWrapper('SDL_NumHaptics', 0);
var _SDL_HapticName = Module['_SDL_HapticName'] = createExportWrapper('SDL_HapticName', 1);
var _SDL_HapticOpen = Module['_SDL_HapticOpen'] = createExportWrapper('SDL_HapticOpen', 1);
var _SDL_HapticSetGain = Module['_SDL_HapticSetGain'] = createExportWrapper('SDL_HapticSetGain', 2);
var _SDL_HapticSetAutocenter = Module['_SDL_HapticSetAutocenter'] = createExportWrapper('SDL_HapticSetAutocenter', 2);
var _SDL_HapticOpened = Module['_SDL_HapticOpened'] = createExportWrapper('SDL_HapticOpened', 1);
var _SDL_HapticIndex = Module['_SDL_HapticIndex'] = createExportWrapper('SDL_HapticIndex', 1);
var _SDL_MouseIsHaptic = Module['_SDL_MouseIsHaptic'] = createExportWrapper('SDL_MouseIsHaptic', 0);
var _SDL_HapticOpenFromMouse = Module['_SDL_HapticOpenFromMouse'] = createExportWrapper('SDL_HapticOpenFromMouse', 0);
var _SDL_JoystickIsHaptic = Module['_SDL_JoystickIsHaptic'] = createExportWrapper('SDL_JoystickIsHaptic', 1);
var _SDL_HapticOpenFromJoystick = Module['_SDL_HapticOpenFromJoystick'] = createExportWrapper('SDL_HapticOpenFromJoystick', 1);
var _SDL_HapticClose = Module['_SDL_HapticClose'] = createExportWrapper('SDL_HapticClose', 1);
var _SDL_HapticDestroyEffect = Module['_SDL_HapticDestroyEffect'] = createExportWrapper('SDL_HapticDestroyEffect', 2);
var _SDL_HapticNumEffects = Module['_SDL_HapticNumEffects'] = createExportWrapper('SDL_HapticNumEffects', 1);
var _SDL_HapticNumEffectsPlaying = Module['_SDL_HapticNumEffectsPlaying'] = createExportWrapper('SDL_HapticNumEffectsPlaying', 1);
var _SDL_HapticQuery = Module['_SDL_HapticQuery'] = createExportWrapper('SDL_HapticQuery', 1);
var _SDL_HapticNumAxes = Module['_SDL_HapticNumAxes'] = createExportWrapper('SDL_HapticNumAxes', 1);
var _SDL_HapticEffectSupported = Module['_SDL_HapticEffectSupported'] = createExportWrapper('SDL_HapticEffectSupported', 2);
var _SDL_HapticNewEffect = Module['_SDL_HapticNewEffect'] = createExportWrapper('SDL_HapticNewEffect', 2);
var _SDL_HapticUpdateEffect = Module['_SDL_HapticUpdateEffect'] = createExportWrapper('SDL_HapticUpdateEffect', 3);
var _SDL_HapticRunEffect = Module['_SDL_HapticRunEffect'] = createExportWrapper('SDL_HapticRunEffect', 3);
var _SDL_HapticStopEffect = Module['_SDL_HapticStopEffect'] = createExportWrapper('SDL_HapticStopEffect', 2);
var _SDL_HapticGetEffectStatus = Module['_SDL_HapticGetEffectStatus'] = createExportWrapper('SDL_HapticGetEffectStatus', 2);
var _SDL_HapticPause = Module['_SDL_HapticPause'] = createExportWrapper('SDL_HapticPause', 1);
var _SDL_HapticUnpause = Module['_SDL_HapticUnpause'] = createExportWrapper('SDL_HapticUnpause', 1);
var _SDL_HapticStopAll = Module['_SDL_HapticStopAll'] = createExportWrapper('SDL_HapticStopAll', 1);
var _SDL_HapticRumbleSupported = Module['_SDL_HapticRumbleSupported'] = createExportWrapper('SDL_HapticRumbleSupported', 1);
var _SDL_HapticRumbleInit = Module['_SDL_HapticRumbleInit'] = createExportWrapper('SDL_HapticRumbleInit', 1);
var _SDL_HapticRumblePlay = Module['_SDL_HapticRumblePlay'] = createExportWrapper('SDL_HapticRumblePlay', 3);
var _SDL_HapticRumbleStop = Module['_SDL_HapticRumbleStop'] = createExportWrapper('SDL_HapticRumbleStop', 1);
var _SDL_SetHintWithPriority = Module['_SDL_SetHintWithPriority'] = createExportWrapper('SDL_SetHintWithPriority', 3);
var _SDL_ResetHint = Module['_SDL_ResetHint'] = createExportWrapper('SDL_ResetHint', 1);
var _SDL_ResetHints = Module['_SDL_ResetHints'] = createExportWrapper('SDL_ResetHints', 0);
var _SDL_iconv_open = Module['_SDL_iconv_open'] = createExportWrapper('SDL_iconv_open', 2);
var _SDL_iconv_close = Module['_SDL_iconv_close'] = createExportWrapper('SDL_iconv_close', 1);
var _SDL_iconv = Module['_SDL_iconv'] = createExportWrapper('SDL_iconv', 5);
var _SDL_JoystickGetDevicePlayerIndex = Module['_SDL_JoystickGetDevicePlayerIndex'] = createExportWrapper('SDL_JoystickGetDevicePlayerIndex', 1);
var _SDL_JoystickAttachVirtual = Module['_SDL_JoystickAttachVirtual'] = createExportWrapper('SDL_JoystickAttachVirtual', 4);
var _SDL_JoystickAttachVirtualEx = Module['_SDL_JoystickAttachVirtualEx'] = createExportWrapper('SDL_JoystickAttachVirtualEx', 1);
var _SDL_JoystickDetachVirtual = Module['_SDL_JoystickDetachVirtual'] = createExportWrapper('SDL_JoystickDetachVirtual', 1);
var _SDL_JoystickIsVirtual = Module['_SDL_JoystickIsVirtual'] = createExportWrapper('SDL_JoystickIsVirtual', 1);
var _SDL_JoystickSetVirtualAxis = Module['_SDL_JoystickSetVirtualAxis'] = createExportWrapper('SDL_JoystickSetVirtualAxis', 3);
var _SDL_JoystickSetVirtualButton = Module['_SDL_JoystickSetVirtualButton'] = createExportWrapper('SDL_JoystickSetVirtualButton', 3);
var _SDL_JoystickSetVirtualHat = Module['_SDL_JoystickSetVirtualHat'] = createExportWrapper('SDL_JoystickSetVirtualHat', 3);
var _SDL_JoystickNumAxes = Module['_SDL_JoystickNumAxes'] = createExportWrapper('SDL_JoystickNumAxes', 1);
var _SDL_JoystickNumHats = Module['_SDL_JoystickNumHats'] = createExportWrapper('SDL_JoystickNumHats', 1);
var _SDL_JoystickNumBalls = Module['_SDL_JoystickNumBalls'] = createExportWrapper('SDL_JoystickNumBalls', 1);
var _SDL_JoystickNumButtons = Module['_SDL_JoystickNumButtons'] = createExportWrapper('SDL_JoystickNumButtons', 1);
var _SDL_JoystickGetAxisInitialState = Module['_SDL_JoystickGetAxisInitialState'] = createExportWrapper('SDL_JoystickGetAxisInitialState', 3);
var _SDL_JoystickGetBall = Module['_SDL_JoystickGetBall'] = createExportWrapper('SDL_JoystickGetBall', 4);
var _SDL_JoystickInstanceID = Module['_SDL_JoystickInstanceID'] = createExportWrapper('SDL_JoystickInstanceID', 1);
var _SDL_JoystickFromInstanceID = Module['_SDL_JoystickFromInstanceID'] = createExportWrapper('SDL_JoystickFromInstanceID', 1);
var _SDL_abs = Module['_SDL_abs'] = createExportWrapper('SDL_abs', 1);
var _SDL_GetKeyboardFocus = Module['_SDL_GetKeyboardFocus'] = createExportWrapper('SDL_GetKeyboardFocus', 0);
var _SDL_tolower = Module['_SDL_tolower'] = createExportWrapper('SDL_tolower', 1);
var _SDL_JoystickGetDeviceVendor = Module['_SDL_JoystickGetDeviceVendor'] = createExportWrapper('SDL_JoystickGetDeviceVendor', 1);
var _SDL_JoystickGetDeviceProduct = Module['_SDL_JoystickGetDeviceProduct'] = createExportWrapper('SDL_JoystickGetDeviceProduct', 1);
var _SDL_JoystickGetDeviceProductVersion = Module['_SDL_JoystickGetDeviceProductVersion'] = createExportWrapper('SDL_JoystickGetDeviceProductVersion', 1);
var _SDL_JoystickGetDeviceType = Module['_SDL_JoystickGetDeviceType'] = createExportWrapper('SDL_JoystickGetDeviceType', 1);
var _SDL_JoystickGetType = Module['_SDL_JoystickGetType'] = createExportWrapper('SDL_JoystickGetType', 1);
var _SDL_JoystickCurrentPowerLevel = Module['_SDL_JoystickCurrentPowerLevel'] = createExportWrapper('SDL_JoystickCurrentPowerLevel', 1);
var _SDL_CaptureMouse = Module['_SDL_CaptureMouse'] = createExportWrapper('SDL_CaptureMouse', 1);
var _SDL_utf8strlcpy = Module['_SDL_utf8strlcpy'] = createExportWrapper('SDL_utf8strlcpy', 3);
var _SDL_GetKeyboardState = Module['_SDL_GetKeyboardState'] = createExportWrapper('SDL_GetKeyboardState', 1);
var _SDL_GetModState = Module['_SDL_GetModState'] = createExportWrapper('SDL_GetModState', 0);
var _SDL_SetModState = Module['_SDL_SetModState'] = createExportWrapper('SDL_SetModState', 1);
var _SDL_GetKeyFromScancode = Module['_SDL_GetKeyFromScancode'] = createExportWrapper('SDL_GetKeyFromScancode', 1);
var _SDL_GetScancodeFromKey = Module['_SDL_GetScancodeFromKey'] = createExportWrapper('SDL_GetScancodeFromKey', 1);
var _SDL_GetScancodeName = Module['_SDL_GetScancodeName'] = createExportWrapper('SDL_GetScancodeName', 1);
var _SDL_GetScancodeFromName = Module['_SDL_GetScancodeFromName'] = createExportWrapper('SDL_GetScancodeFromName', 1);
var _SDL_GetKeyName = Module['_SDL_GetKeyName'] = createExportWrapper('SDL_GetKeyName', 1);
var _SDL_GetKeyFromName = Module['_SDL_GetKeyFromName'] = createExportWrapper('SDL_GetKeyFromName', 1);
var _SDL_GetPreferredLocales = Module['_SDL_GetPreferredLocales'] = createExportWrapper('SDL_GetPreferredLocales', 0);
var _SDL_LogResetPriorities = Module['_SDL_LogResetPriorities'] = createExportWrapper('SDL_LogResetPriorities', 0);
var _SDL_LogSetAllPriority = Module['_SDL_LogSetAllPriority'] = createExportWrapper('SDL_LogSetAllPriority', 1);
var _SDL_LogSetPriority = Module['_SDL_LogSetPriority'] = createExportWrapper('SDL_LogSetPriority', 2);
var _SDL_LogVerbose = Module['_SDL_LogVerbose'] = createExportWrapper('SDL_LogVerbose', 3);
var _SDL_LogInfo = Module['_SDL_LogInfo'] = createExportWrapper('SDL_LogInfo', 3);
var _SDL_LogError = Module['_SDL_LogError'] = createExportWrapper('SDL_LogError', 3);
var _SDL_LogMessage = Module['_SDL_LogMessage'] = createExportWrapper('SDL_LogMessage', 4);
var _SDL_LogGetOutputFunction = Module['_SDL_LogGetOutputFunction'] = createExportWrapper('SDL_LogGetOutputFunction', 2);
var _SDL_LogSetOutputFunction = Module['_SDL_LogSetOutputFunction'] = createExportWrapper('SDL_LogSetOutputFunction', 2);
var _SDL_GetOriginalMemoryFunctions = Module['_SDL_GetOriginalMemoryFunctions'] = createExportWrapper('SDL_GetOriginalMemoryFunctions', 4);
var _SDL_GetMemoryFunctions = Module['_SDL_GetMemoryFunctions'] = createExportWrapper('SDL_GetMemoryFunctions', 4);
var _SDL_SetMemoryFunctions = Module['_SDL_SetMemoryFunctions'] = createExportWrapper('SDL_SetMemoryFunctions', 4);
var _SDL_GetNumAllocations = Module['_SDL_GetNumAllocations'] = createExportWrapper('SDL_GetNumAllocations', 0);
var _SDL_SetCursor = Module['_SDL_SetCursor'] = createExportWrapper('SDL_SetCursor', 1);
var _SDL_GetWindowSize = Module['_SDL_GetWindowSize'] = createExportWrapper('SDL_GetWindowSize', 3);
var _SDL_sqrtf = Module['_SDL_sqrtf'] = createExportWrapper('SDL_sqrtf', 1);
var _SDL_GetWindowMouseRect = Module['_SDL_GetWindowMouseRect'] = createExportWrapper('SDL_GetWindowMouseRect', 1);
var _SDL_SetRelativeMouseMode = Module['_SDL_SetRelativeMouseMode'] = createExportWrapper('SDL_SetRelativeMouseMode', 1);
var _SDL_ShowCursor = Module['_SDL_ShowCursor'] = createExportWrapper('SDL_ShowCursor', 1);
var _SDL_FreeCursor = Module['_SDL_FreeCursor'] = createExportWrapper('SDL_FreeCursor', 1);
var _SDL_GetMouseState = Module['_SDL_GetMouseState'] = createExportWrapper('SDL_GetMouseState', 2);
var _SDL_GetRelativeMouseState = Module['_SDL_GetRelativeMouseState'] = createExportWrapper('SDL_GetRelativeMouseState', 2);
var _SDL_GetGlobalMouseState = Module['_SDL_GetGlobalMouseState'] = createExportWrapper('SDL_GetGlobalMouseState', 2);
var _SDL_WarpMouseInWindow = Module['_SDL_WarpMouseInWindow'] = createExportWrapper('SDL_WarpMouseInWindow', 3);
var _SDL_WarpMouseGlobal = Module['_SDL_WarpMouseGlobal'] = createExportWrapper('SDL_WarpMouseGlobal', 2);
var _SDL_GetRelativeMouseMode = Module['_SDL_GetRelativeMouseMode'] = createExportWrapper('SDL_GetRelativeMouseMode', 0);
var _SDL_CreateCursor = Module['_SDL_CreateCursor'] = createExportWrapper('SDL_CreateCursor', 6);
var _SDL_CreateColorCursor = Module['_SDL_CreateColorCursor'] = createExportWrapper('SDL_CreateColorCursor', 3);
var _SDL_CreateSystemCursor = Module['_SDL_CreateSystemCursor'] = createExportWrapper('SDL_CreateSystemCursor', 1);
var _SDL_GetCursor = Module['_SDL_GetCursor'] = createExportWrapper('SDL_GetCursor', 0);
var _SDL_GetDefaultCursor = Module['_SDL_GetDefaultCursor'] = createExportWrapper('SDL_GetDefaultCursor', 0);
var _SDL_GetPixelFormatName = Module['_SDL_GetPixelFormatName'] = createExportWrapper('SDL_GetPixelFormatName', 1);
var _SDL_MasksToPixelFormatEnum = Module['_SDL_MasksToPixelFormatEnum'] = createExportWrapper('SDL_MasksToPixelFormatEnum', 5);
var _SDL_AllocFormat = Module['_SDL_AllocFormat'] = createExportWrapper('SDL_AllocFormat', 1);
var _SDL_FreeFormat = Module['_SDL_FreeFormat'] = createExportWrapper('SDL_FreeFormat', 1);
var _SDL_FreePalette = Module['_SDL_FreePalette'] = createExportWrapper('SDL_FreePalette', 1);
var _SDL_AllocPalette = Module['_SDL_AllocPalette'] = createExportWrapper('SDL_AllocPalette', 1);
var _SDL_SetPixelFormatPalette = Module['_SDL_SetPixelFormatPalette'] = createExportWrapper('SDL_SetPixelFormatPalette', 2);
var _SDL_SetPaletteColors = Module['_SDL_SetPaletteColors'] = createExportWrapper('SDL_SetPaletteColors', 4);
var _SDL_MapRGBA = Module['_SDL_MapRGBA'] = createExportWrapper('SDL_MapRGBA', 5);
var _SDL_GetRGB = Module['_SDL_GetRGB'] = createExportWrapper('SDL_GetRGB', 5);
var _SDL_CalculateGammaRamp = Module['_SDL_CalculateGammaRamp'] = createExportWrapper('SDL_CalculateGammaRamp', 2);
var _SDL_pow = Module['_SDL_pow'] = createExportWrapper('SDL_pow', 2);
var _SDL_GetPowerInfo = Module['_SDL_GetPowerInfo'] = createExportWrapper('SDL_GetPowerInfo', 2);
var _SDL_qsort = Module['_SDL_qsort'] = createExportWrapper('SDL_qsort', 4);
var _SDL_bsearch = Module['_SDL_bsearch'] = createExportWrapper('SDL_bsearch', 5);
var _SDL_UnionRect = Module['_SDL_UnionRect'] = createExportWrapper('SDL_UnionRect', 3);
var _SDL_EnclosePoints = Module['_SDL_EnclosePoints'] = createExportWrapper('SDL_EnclosePoints', 4);
var _SDL_HasIntersectionF = Module['_SDL_HasIntersectionF'] = createExportWrapper('SDL_HasIntersectionF', 2);
var _SDL_IntersectFRect = Module['_SDL_IntersectFRect'] = createExportWrapper('SDL_IntersectFRect', 3);
var _SDL_UnionFRect = Module['_SDL_UnionFRect'] = createExportWrapper('SDL_UnionFRect', 3);
var _SDL_EncloseFPoints = Module['_SDL_EncloseFPoints'] = createExportWrapper('SDL_EncloseFPoints', 4);
var _SDL_IntersectFRectAndLine = Module['_SDL_IntersectFRectAndLine'] = createExportWrapper('SDL_IntersectFRectAndLine', 5);
var _SDL_RenderFlush = Module['_SDL_RenderFlush'] = createExportWrapper('SDL_RenderFlush', 1);
var _SDL_GetNumRenderDrivers = Module['_SDL_GetNumRenderDrivers'] = createExportWrapper('SDL_GetNumRenderDrivers', 0);
var _SDL_GetRenderDriverInfo = Module['_SDL_GetRenderDriverInfo'] = createExportWrapper('SDL_GetRenderDriverInfo', 2);
var _SDL_CreateWindowAndRenderer = Module['_SDL_CreateWindowAndRenderer'] = createExportWrapper('SDL_CreateWindowAndRenderer', 5);
var _SDL_HasWindowSurface = Module['_SDL_HasWindowSurface'] = createExportWrapper('SDL_HasWindowSurface', 1);
var _SDL_GetWindowData = Module['_SDL_GetWindowData'] = createExportWrapper('SDL_GetWindowData', 2);
var _SDL_GetWindowDisplayIndex = Module['_SDL_GetWindowDisplayIndex'] = createExportWrapper('SDL_GetWindowDisplayIndex', 1);
var _SDL_GetDesktopDisplayMode = Module['_SDL_GetDesktopDisplayMode'] = createExportWrapper('SDL_GetDesktopDisplayMode', 2);
var _SDL_SetWindowData = Module['_SDL_SetWindowData'] = createExportWrapper('SDL_SetWindowData', 3);
var _SDL_RenderSetViewport = Module['_SDL_RenderSetViewport'] = createExportWrapper('SDL_RenderSetViewport', 2);
var _SDL_GetRenderer = Module['_SDL_GetRenderer'] = createExportWrapper('SDL_GetRenderer', 1);
var _SDL_GetRendererOutputSize = Module['_SDL_GetRendererOutputSize'] = createExportWrapper('SDL_GetRendererOutputSize', 3);
var _SDL_GetWindowFromID = Module['_SDL_GetWindowFromID'] = createExportWrapper('SDL_GetWindowFromID', 1);
var _SDL_SetRenderTarget = Module['_SDL_SetRenderTarget'] = createExportWrapper('SDL_SetRenderTarget', 2);
var _SDL_truncf = Module['_SDL_truncf'] = createExportWrapper('SDL_truncf', 1);
var _SDL_CreateSoftwareRenderer = Module['_SDL_CreateSoftwareRenderer'] = createExportWrapper('SDL_CreateSoftwareRenderer', 1);
var _SDL_RenderGetWindow = Module['_SDL_RenderGetWindow'] = createExportWrapper('SDL_RenderGetWindow', 1);
var _SDL_GetRendererInfo = Module['_SDL_GetRendererInfo'] = createExportWrapper('SDL_GetRendererInfo', 2);
var _SDL_CreateTexture = Module['_SDL_CreateTexture'] = createExportWrapper('SDL_CreateTexture', 5);
var _SDL_HasColorKey = Module['_SDL_HasColorKey'] = createExportWrapper('SDL_HasColorKey', 1);
var _SDL_UpdateTexture = Module['_SDL_UpdateTexture'] = createExportWrapper('SDL_UpdateTexture', 4);
var _SDL_GetSurfaceColorMod = Module['_SDL_GetSurfaceColorMod'] = createExportWrapper('SDL_GetSurfaceColorMod', 4);
var _SDL_GetSurfaceAlphaMod = Module['_SDL_GetSurfaceAlphaMod'] = createExportWrapper('SDL_GetSurfaceAlphaMod', 2);
var _SDL_GetSurfaceBlendMode = Module['_SDL_GetSurfaceBlendMode'] = createExportWrapper('SDL_GetSurfaceBlendMode', 2);
var _SDL_SetTextureBlendMode = Module['_SDL_SetTextureBlendMode'] = createExportWrapper('SDL_SetTextureBlendMode', 2);
var _SDL_LockTexture = Module['_SDL_LockTexture'] = createExportWrapper('SDL_LockTexture', 4);
var _SDL_UnlockTexture = Module['_SDL_UnlockTexture'] = createExportWrapper('SDL_UnlockTexture', 1);
var _SDL_SetTextureColorMod = Module['_SDL_SetTextureColorMod'] = createExportWrapper('SDL_SetTextureColorMod', 4);
var _SDL_SetTextureAlphaMod = Module['_SDL_SetTextureAlphaMod'] = createExportWrapper('SDL_SetTextureAlphaMod', 2);
var _SDL_GetTextureColorMod = Module['_SDL_GetTextureColorMod'] = createExportWrapper('SDL_GetTextureColorMod', 4);
var _SDL_GetTextureAlphaMod = Module['_SDL_GetTextureAlphaMod'] = createExportWrapper('SDL_GetTextureAlphaMod', 2);
var _SDL_GetTextureBlendMode = Module['_SDL_GetTextureBlendMode'] = createExportWrapper('SDL_GetTextureBlendMode', 2);
var _SDL_SetTextureScaleMode = Module['_SDL_SetTextureScaleMode'] = createExportWrapper('SDL_SetTextureScaleMode', 2);
var _SDL_GetTextureScaleMode = Module['_SDL_GetTextureScaleMode'] = createExportWrapper('SDL_GetTextureScaleMode', 2);
var _SDL_SetTextureUserData = Module['_SDL_SetTextureUserData'] = createExportWrapper('SDL_SetTextureUserData', 2);
var _SDL_GetTextureUserData = Module['_SDL_GetTextureUserData'] = createExportWrapper('SDL_GetTextureUserData', 1);
var _SDL_ConvertPixels = Module['_SDL_ConvertPixels'] = createExportWrapper('SDL_ConvertPixels', 8);
var _SDL_UpdateYUVTexture = Module['_SDL_UpdateYUVTexture'] = createExportWrapper('SDL_UpdateYUVTexture', 8);
var _SDL_UpdateNVTexture = Module['_SDL_UpdateNVTexture'] = createExportWrapper('SDL_UpdateNVTexture', 6);
var _SDL_LockTextureToSurface = Module['_SDL_LockTextureToSurface'] = createExportWrapper('SDL_LockTextureToSurface', 3);
var _SDL_RenderTargetSupported = Module['_SDL_RenderTargetSupported'] = createExportWrapper('SDL_RenderTargetSupported', 1);
var _SDL_GetRenderTarget = Module['_SDL_GetRenderTarget'] = createExportWrapper('SDL_GetRenderTarget', 1);
var _SDL_RenderSetLogicalSize = Module['_SDL_RenderSetLogicalSize'] = createExportWrapper('SDL_RenderSetLogicalSize', 3);
var _SDL_RenderSetScale = Module['_SDL_RenderSetScale'] = createExportWrapper('SDL_RenderSetScale', 3);
var _SDL_RenderGetLogicalSize = Module['_SDL_RenderGetLogicalSize'] = createExportWrapper('SDL_RenderGetLogicalSize', 3);
var _SDL_RenderSetIntegerScale = Module['_SDL_RenderSetIntegerScale'] = createExportWrapper('SDL_RenderSetIntegerScale', 2);
var _SDL_RenderGetIntegerScale = Module['_SDL_RenderGetIntegerScale'] = createExportWrapper('SDL_RenderGetIntegerScale', 1);
var _SDL_RenderGetViewport = Module['_SDL_RenderGetViewport'] = createExportWrapper('SDL_RenderGetViewport', 2);
var _SDL_RenderSetClipRect = Module['_SDL_RenderSetClipRect'] = createExportWrapper('SDL_RenderSetClipRect', 2);
var _SDL_RenderGetClipRect = Module['_SDL_RenderGetClipRect'] = createExportWrapper('SDL_RenderGetClipRect', 2);
var _SDL_RenderIsClipEnabled = Module['_SDL_RenderIsClipEnabled'] = createExportWrapper('SDL_RenderIsClipEnabled', 1);
var _SDL_RenderGetScale = Module['_SDL_RenderGetScale'] = createExportWrapper('SDL_RenderGetScale', 3);
var _SDL_RenderWindowToLogical = Module['_SDL_RenderWindowToLogical'] = createExportWrapper('SDL_RenderWindowToLogical', 5);
var _SDL_RenderLogicalToWindow = Module['_SDL_RenderLogicalToWindow'] = createExportWrapper('SDL_RenderLogicalToWindow', 5);
var _SDL_GetRenderDrawColor = Module['_SDL_GetRenderDrawColor'] = createExportWrapper('SDL_GetRenderDrawColor', 5);
var _SDL_SetRenderDrawBlendMode = Module['_SDL_SetRenderDrawBlendMode'] = createExportWrapper('SDL_SetRenderDrawBlendMode', 2);
var _SDL_GetRenderDrawBlendMode = Module['_SDL_GetRenderDrawBlendMode'] = createExportWrapper('SDL_GetRenderDrawBlendMode', 2);
var _SDL_RenderDrawPoint = Module['_SDL_RenderDrawPoint'] = createExportWrapper('SDL_RenderDrawPoint', 3);
var _SDL_RenderDrawPointsF = Module['_SDL_RenderDrawPointsF'] = createExportWrapper('SDL_RenderDrawPointsF', 3);
var _SDL_RenderDrawPointF = Module['_SDL_RenderDrawPointF'] = createExportWrapper('SDL_RenderDrawPointF', 3);
var _SDL_RenderDrawPoints = Module['_SDL_RenderDrawPoints'] = createExportWrapper('SDL_RenderDrawPoints', 3);
var _SDL_RenderDrawLine = Module['_SDL_RenderDrawLine'] = createExportWrapper('SDL_RenderDrawLine', 5);
var _SDL_RenderDrawLinesF = Module['_SDL_RenderDrawLinesF'] = createExportWrapper('SDL_RenderDrawLinesF', 3);
var _SDL_RenderDrawLineF = Module['_SDL_RenderDrawLineF'] = createExportWrapper('SDL_RenderDrawLineF', 5);
var _SDL_RenderDrawLines = Module['_SDL_RenderDrawLines'] = createExportWrapper('SDL_RenderDrawLines', 3);
var _SDL_roundf = Module['_SDL_roundf'] = createExportWrapper('SDL_roundf', 1);
var _SDL_RenderDrawRect = Module['_SDL_RenderDrawRect'] = createExportWrapper('SDL_RenderDrawRect', 2);
var _SDL_RenderDrawRectF = Module['_SDL_RenderDrawRectF'] = createExportWrapper('SDL_RenderDrawRectF', 2);
var _SDL_RenderDrawRects = Module['_SDL_RenderDrawRects'] = createExportWrapper('SDL_RenderDrawRects', 3);
var _SDL_RenderDrawRectsF = Module['_SDL_RenderDrawRectsF'] = createExportWrapper('SDL_RenderDrawRectsF', 3);
var _SDL_RenderFillRectsF = Module['_SDL_RenderFillRectsF'] = createExportWrapper('SDL_RenderFillRectsF', 3);
var _SDL_RenderFillRectF = Module['_SDL_RenderFillRectF'] = createExportWrapper('SDL_RenderFillRectF', 2);
var _SDL_RenderFillRects = Module['_SDL_RenderFillRects'] = createExportWrapper('SDL_RenderFillRects', 3);
var _SDL_RenderCopyF = Module['_SDL_RenderCopyF'] = createExportWrapper('SDL_RenderCopyF', 4);
var _SDL_RenderCopyEx = Module['_SDL_RenderCopyEx'] = createExportWrapper('SDL_RenderCopyEx', 7);
var _SDL_RenderCopyExF = Module['_SDL_RenderCopyExF'] = createExportWrapper('SDL_RenderCopyExF', 7);
var _SDL_sinf = Module['_SDL_sinf'] = createExportWrapper('SDL_sinf', 1);
var _SDL_cosf = Module['_SDL_cosf'] = createExportWrapper('SDL_cosf', 1);
var _SDL_RenderGeometry = Module['_SDL_RenderGeometry'] = createExportWrapper('SDL_RenderGeometry', 6);
var _SDL_RenderGeometryRaw = Module['_SDL_RenderGeometryRaw'] = createExportWrapper('SDL_RenderGeometryRaw', 12);
var _SDL_RenderReadPixels = Module['_SDL_RenderReadPixels'] = createExportWrapper('SDL_RenderReadPixels', 5);
var _SDL_GetWindowPixelFormat = Module['_SDL_GetWindowPixelFormat'] = createExportWrapper('SDL_GetWindowPixelFormat', 1);
var _SDL_GL_BindTexture = Module['_SDL_GL_BindTexture'] = createExportWrapper('SDL_GL_BindTexture', 3);
var _SDL_GL_UnbindTexture = Module['_SDL_GL_UnbindTexture'] = createExportWrapper('SDL_GL_UnbindTexture', 1);
var _SDL_RenderGetMetalLayer = Module['_SDL_RenderGetMetalLayer'] = createExportWrapper('SDL_RenderGetMetalLayer', 1);
var _SDL_RenderGetMetalCommandEncoder = Module['_SDL_RenderGetMetalCommandEncoder'] = createExportWrapper('SDL_RenderGetMetalCommandEncoder', 1);
var _SDL_ComposeCustomBlendMode = Module['_SDL_ComposeCustomBlendMode'] = createExportWrapper('SDL_ComposeCustomBlendMode', 6);
var _SDL_RenderSetVSync = Module['_SDL_RenderSetVSync'] = createExportWrapper('SDL_RenderSetVSync', 2);
var _SDL_GL_GetAttribute = Module['_SDL_GL_GetAttribute'] = createExportWrapper('SDL_GL_GetAttribute', 2);
var _SDL_GL_SetAttribute = Module['_SDL_GL_SetAttribute'] = createExportWrapper('SDL_GL_SetAttribute', 2);
var _SDL_GL_CreateContext = Module['_SDL_GL_CreateContext'] = createExportWrapper('SDL_GL_CreateContext', 1);
var _SDL_GL_MakeCurrent = Module['_SDL_GL_MakeCurrent'] = createExportWrapper('SDL_GL_MakeCurrent', 2);
var _SDL_GL_DeleteContext = Module['_SDL_GL_DeleteContext'] = createExportWrapper('SDL_GL_DeleteContext', 1);
var _SDL_GL_GetProcAddress = Module['_SDL_GL_GetProcAddress'] = createExportWrapper('SDL_GL_GetProcAddress', 1);
var _SDL_GL_SetSwapInterval = Module['_SDL_GL_SetSwapInterval'] = createExportWrapper('SDL_GL_SetSwapInterval', 1);
var _SDL_GL_GetSwapInterval = Module['_SDL_GL_GetSwapInterval'] = createExportWrapper('SDL_GL_GetSwapInterval', 0);
var _SDL_GL_GetDrawableSize = Module['_SDL_GL_GetDrawableSize'] = createExportWrapper('SDL_GL_GetDrawableSize', 3);
var _SDL_atan2f = Module['_SDL_atan2f'] = createExportWrapper('SDL_atan2f', 2);
var _SDL_GetYUVConversionModeForResolution = Module['_SDL_GetYUVConversionModeForResolution'] = createExportWrapper('SDL_GetYUVConversionModeForResolution', 2);
var _SDL_GetWindowSurface = Module['_SDL_GetWindowSurface'] = createExportWrapper('SDL_GetWindowSurface', 1);
var _SDL_SetSurfaceColorMod = Module['_SDL_SetSurfaceColorMod'] = createExportWrapper('SDL_SetSurfaceColorMod', 4);
var _SDL_SetSurfaceAlphaMod = Module['_SDL_SetSurfaceAlphaMod'] = createExportWrapper('SDL_SetSurfaceAlphaMod', 2);
var _SDL_SetSurfaceRLE = Module['_SDL_SetSurfaceRLE'] = createExportWrapper('SDL_SetSurfaceRLE', 2);
var _SDL_SetClipRect = Module['_SDL_SetClipRect'] = createExportWrapper('SDL_SetClipRect', 2);
var _SDL_UpperBlit = Module['_SDL_UpperBlit'] = createExportWrapper('SDL_UpperBlit', 4);
var _SDL_CreateRGBSurfaceWithFormat = Module['_SDL_CreateRGBSurfaceWithFormat'] = createExportWrapper('SDL_CreateRGBSurfaceWithFormat', 5);
var _SDL_CreateRGBSurfaceFrom = Module['_SDL_CreateRGBSurfaceFrom'] = createExportWrapper('SDL_CreateRGBSurfaceFrom', 9);
var _SDL_UpdateWindowSurface = Module['_SDL_UpdateWindowSurface'] = createExportWrapper('SDL_UpdateWindowSurface', 1);
var _SDL_GetColorKey = Module['_SDL_GetColorKey'] = createExportWrapper('SDL_GetColorKey', 2);
var _SDL_RWFromFP = Module['_SDL_RWFromFP'] = createExportWrapper('SDL_RWFromFP', 2);
var _SDL_AllocRW = Module['_SDL_AllocRW'] = createExportWrapper('SDL_AllocRW', 0);
var _SDL_RWFromMem = Module['_SDL_RWFromMem'] = createExportWrapper('SDL_RWFromMem', 2);
var _SDL_FreeRW = Module['_SDL_FreeRW'] = createExportWrapper('SDL_FreeRW', 1);
var _SDL_LoadFile_RW = Module['_SDL_LoadFile_RW'] = createExportWrapper('SDL_LoadFile_RW', 3);
var _SDL_ReadU8 = Module['_SDL_ReadU8'] = createExportWrapper('SDL_ReadU8', 1);
var _SDL_ReadLE64 = Module['_SDL_ReadLE64'] = createExportWrapper('SDL_ReadLE64', 1);
var _SDL_ReadBE64 = Module['_SDL_ReadBE64'] = createExportWrapper('SDL_ReadBE64', 1);
var _SDL_WriteU8 = Module['_SDL_WriteU8'] = createExportWrapper('SDL_WriteU8', 2);
var _SDL_WriteBE16 = Module['_SDL_WriteBE16'] = createExportWrapper('SDL_WriteBE16', 2);
var _SDL_WriteBE32 = Module['_SDL_WriteBE32'] = createExportWrapper('SDL_WriteBE32', 2);
var _SDL_WriteLE64 = Module['_SDL_WriteLE64'] = createExportWrapper('SDL_WriteLE64', 3);
var _SDL_WriteBE64 = Module['_SDL_WriteBE64'] = createExportWrapper('SDL_WriteBE64', 3);
var _SDL_LockSensors = Module['_SDL_LockSensors'] = createExportWrapper('SDL_LockSensors', 0);
var _SDL_UnlockSensors = Module['_SDL_UnlockSensors'] = createExportWrapper('SDL_UnlockSensors', 0);
var _SDL_SensorGetDeviceName = Module['_SDL_SensorGetDeviceName'] = createExportWrapper('SDL_SensorGetDeviceName', 1);
var _SDL_SensorGetDeviceType = Module['_SDL_SensorGetDeviceType'] = createExportWrapper('SDL_SensorGetDeviceType', 1);
var _SDL_SensorGetDeviceNonPortableType = Module['_SDL_SensorGetDeviceNonPortableType'] = createExportWrapper('SDL_SensorGetDeviceNonPortableType', 1);
var _SDL_SensorGetDeviceInstanceID = Module['_SDL_SensorGetDeviceInstanceID'] = createExportWrapper('SDL_SensorGetDeviceInstanceID', 1);
var _SDL_SensorOpen = Module['_SDL_SensorOpen'] = createExportWrapper('SDL_SensorOpen', 1);
var _SDL_SensorFromInstanceID = Module['_SDL_SensorFromInstanceID'] = createExportWrapper('SDL_SensorFromInstanceID', 1);
var _SDL_SensorGetName = Module['_SDL_SensorGetName'] = createExportWrapper('SDL_SensorGetName', 1);
var _SDL_SensorGetType = Module['_SDL_SensorGetType'] = createExportWrapper('SDL_SensorGetType', 1);
var _SDL_SensorGetNonPortableType = Module['_SDL_SensorGetNonPortableType'] = createExportWrapper('SDL_SensorGetNonPortableType', 1);
var _SDL_SensorGetInstanceID = Module['_SDL_SensorGetInstanceID'] = createExportWrapper('SDL_SensorGetInstanceID', 1);
var _SDL_SensorGetData = Module['_SDL_SensorGetData'] = createExportWrapper('SDL_SensorGetData', 3);
var _SDL_SensorGetDataWithTimestamp = Module['_SDL_SensorGetDataWithTimestamp'] = createExportWrapper('SDL_SensorGetDataWithTimestamp', 4);
var _SDL_SensorClose = Module['_SDL_SensorClose'] = createExportWrapper('SDL_SensorClose', 1);
var _SDL_CreateShapedWindow = Module['_SDL_CreateShapedWindow'] = createExportWrapper('SDL_CreateShapedWindow', 6);
var _SDL_IsShapedWindow = Module['_SDL_IsShapedWindow'] = createExportWrapper('SDL_IsShapedWindow', 1);
var _SDL_SetWindowShape = Module['_SDL_SetWindowShape'] = createExportWrapper('SDL_SetWindowShape', 3);
var _SDL_GetDisplayBounds = Module['_SDL_GetDisplayBounds'] = createExportWrapper('SDL_GetDisplayBounds', 2);
var _SDL_SetWindowPosition = Module['_SDL_SetWindowPosition'] = createExportWrapper('SDL_SetWindowPosition', 3);
var _SDL_GetShapedWindowMode = Module['_SDL_GetShapedWindowMode'] = createExportWrapper('SDL_GetShapedWindowMode', 2);
var _SDL_AtomicTryLock = Module['_SDL_AtomicTryLock'] = createExportWrapper('SDL_AtomicTryLock', 1);
var _SDL_atan = Module['_SDL_atan'] = createExportWrapper('SDL_atan', 1);
var _SDL_atanf = Module['_SDL_atanf'] = createExportWrapper('SDL_atanf', 1);
var _SDL_acos = Module['_SDL_acos'] = createExportWrapper('SDL_acos', 1);
var _SDL_acosf = Module['_SDL_acosf'] = createExportWrapper('SDL_acosf', 1);
var _SDL_asin = Module['_SDL_asin'] = createExportWrapper('SDL_asin', 1);
var _SDL_asinf = Module['_SDL_asinf'] = createExportWrapper('SDL_asinf', 1);
var _SDL_ceilf = Module['_SDL_ceilf'] = createExportWrapper('SDL_ceilf', 1);
var _SDL_copysign = Module['_SDL_copysign'] = createExportWrapper('SDL_copysign', 2);
var _SDL_copysignf = Module['_SDL_copysignf'] = createExportWrapper('SDL_copysignf', 2);
var _SDL_exp = Module['_SDL_exp'] = createExportWrapper('SDL_exp', 1);
var _SDL_expf = Module['_SDL_expf'] = createExportWrapper('SDL_expf', 1);
var _SDL_fabsf = Module['_SDL_fabsf'] = createExportWrapper('SDL_fabsf', 1);
var _SDL_floorf = Module['_SDL_floorf'] = createExportWrapper('SDL_floorf', 1);
var _SDL_trunc = Module['_SDL_trunc'] = createExportWrapper('SDL_trunc', 1);
var _SDL_fmod = Module['_SDL_fmod'] = createExportWrapper('SDL_fmod', 2);
var _SDL_fmodf = Module['_SDL_fmodf'] = createExportWrapper('SDL_fmodf', 2);
var _SDL_log = Module['_SDL_log'] = createExportWrapper('SDL_log', 1);
var _SDL_logf = Module['_SDL_logf'] = createExportWrapper('SDL_logf', 1);
var _SDL_log10 = Module['_SDL_log10'] = createExportWrapper('SDL_log10', 1);
var _SDL_log10f = Module['_SDL_log10f'] = createExportWrapper('SDL_log10f', 1);
var _SDL_powf = Module['_SDL_powf'] = createExportWrapper('SDL_powf', 2);
var _SDL_round = Module['_SDL_round'] = createExportWrapper('SDL_round', 1);
var _SDL_lround = Module['_SDL_lround'] = createExportWrapper('SDL_lround', 1);
var _SDL_lroundf = Module['_SDL_lroundf'] = createExportWrapper('SDL_lroundf', 1);
var _SDL_scalbn = Module['_SDL_scalbn'] = createExportWrapper('SDL_scalbn', 2);
var _SDL_scalbnf = Module['_SDL_scalbnf'] = createExportWrapper('SDL_scalbnf', 2);
var _SDL_tan = Module['_SDL_tan'] = createExportWrapper('SDL_tan', 1);
var _SDL_tanf = Module['_SDL_tanf'] = createExportWrapper('SDL_tanf', 1);
var _SDL_isalpha = Module['_SDL_isalpha'] = createExportWrapper('SDL_isalpha', 1);
var _SDL_isalnum = Module['_SDL_isalnum'] = createExportWrapper('SDL_isalnum', 1);
var _SDL_isxdigit = Module['_SDL_isxdigit'] = createExportWrapper('SDL_isxdigit', 1);
var _SDL_ispunct = Module['_SDL_ispunct'] = createExportWrapper('SDL_ispunct', 1);
var _SDL_isspace = Module['_SDL_isspace'] = createExportWrapper('SDL_isspace', 1);
var _SDL_isupper = Module['_SDL_isupper'] = createExportWrapper('SDL_isupper', 1);
var _SDL_islower = Module['_SDL_islower'] = createExportWrapper('SDL_islower', 1);
var _SDL_isprint = Module['_SDL_isprint'] = createExportWrapper('SDL_isprint', 1);
var _SDL_isgraph = Module['_SDL_isgraph'] = createExportWrapper('SDL_isgraph', 1);
var _SDL_iscntrl = Module['_SDL_iscntrl'] = createExportWrapper('SDL_iscntrl', 1);
var _SDL_isblank = Module['_SDL_isblank'] = createExportWrapper('SDL_isblank', 1);
var _SDL_SoftStretch = Module['_SDL_SoftStretch'] = createExportWrapper('SDL_SoftStretch', 4);
var _SDL_SoftStretchLinear = Module['_SDL_SoftStretchLinear'] = createExportWrapper('SDL_SoftStretchLinear', 4);
var _SDL_wcslen = Module['_SDL_wcslen'] = createExportWrapper('SDL_wcslen', 1);
var _SDL_wcslcpy = Module['_SDL_wcslcpy'] = createExportWrapper('SDL_wcslcpy', 3);
var _SDL_wcslcat = Module['_SDL_wcslcat'] = createExportWrapper('SDL_wcslcat', 3);
var _SDL_wcsdup = Module['_SDL_wcsdup'] = createExportWrapper('SDL_wcsdup', 1);
var _SDL_wcsstr = Module['_SDL_wcsstr'] = createExportWrapper('SDL_wcsstr', 2);
var _SDL_wcscmp = Module['_SDL_wcscmp'] = createExportWrapper('SDL_wcscmp', 2);
var _SDL_wcsncmp = Module['_SDL_wcsncmp'] = createExportWrapper('SDL_wcsncmp', 3);
var _SDL_wcscasecmp = Module['_SDL_wcscasecmp'] = createExportWrapper('SDL_wcscasecmp', 2);
var _SDL_wcsncasecmp = Module['_SDL_wcsncasecmp'] = createExportWrapper('SDL_wcsncasecmp', 3);
var _SDL_utf8strnlen = Module['_SDL_utf8strnlen'] = createExportWrapper('SDL_utf8strnlen', 2);
var _SDL_strrev = Module['_SDL_strrev'] = createExportWrapper('SDL_strrev', 1);
var _SDL_strupr = Module['_SDL_strupr'] = createExportWrapper('SDL_strupr', 1);
var _SDL_strlwr = Module['_SDL_strlwr'] = createExportWrapper('SDL_strlwr', 1);
var _SDL_strcasestr = Module['_SDL_strcasestr'] = createExportWrapper('SDL_strcasestr', 2);
var _SDL_itoa = Module['_SDL_itoa'] = createExportWrapper('SDL_itoa', 3);
var _SDL_ltoa = Module['_SDL_ltoa'] = createExportWrapper('SDL_ltoa', 3);
var _SDL_uitoa = Module['_SDL_uitoa'] = createExportWrapper('SDL_uitoa', 3);
var _SDL_ultoa = Module['_SDL_ultoa'] = createExportWrapper('SDL_ultoa', 3);
var _SDL_lltoa = Module['_SDL_lltoa'] = createExportWrapper('SDL_lltoa', 4);
var _SDL_ulltoa = Module['_SDL_ulltoa'] = createExportWrapper('SDL_ulltoa', 4);
var _SDL_strtoul = Module['_SDL_strtoul'] = createExportWrapper('SDL_strtoul', 3);
var _SDL_strtoull = Module['_SDL_strtoull'] = createExportWrapper('SDL_strtoull', 3);
var _SDL_strtod = Module['_SDL_strtod'] = createExportWrapper('SDL_strtod', 2);
var _SDL_vsscanf = Module['_SDL_vsscanf'] = createExportWrapper('SDL_vsscanf', 3);
var _SDL_vasprintf = Module['_SDL_vasprintf'] = createExportWrapper('SDL_vasprintf', 3);
var _SDL_SetSurfacePalette = Module['_SDL_SetSurfacePalette'] = createExportWrapper('SDL_SetSurfacePalette', 2);
var _SDL_HasSurfaceRLE = Module['_SDL_HasSurfaceRLE'] = createExportWrapper('SDL_HasSurfaceRLE', 1);
var _SDL_GetClipRect = Module['_SDL_GetClipRect'] = createExportWrapper('SDL_GetClipRect', 2);
var _SDL_LowerBlit = Module['_SDL_LowerBlit'] = createExportWrapper('SDL_LowerBlit', 4);
var _SDL_UpperBlitScaled = Module['_SDL_UpperBlitScaled'] = createExportWrapper('SDL_UpperBlitScaled', 4);
var _SDL_LowerBlitScaled = Module['_SDL_LowerBlitScaled'] = createExportWrapper('SDL_LowerBlitScaled', 4);
var _SDL_DuplicateSurface = Module['_SDL_DuplicateSurface'] = createExportWrapper('SDL_DuplicateSurface', 1);
var _SDL_PremultiplyAlpha = Module['_SDL_PremultiplyAlpha'] = createExportWrapper('SDL_PremultiplyAlpha', 8);
var _SDL_CreateCond = Module['_SDL_CreateCond'] = createExportWrapper('SDL_CreateCond', 0);
var _SDL_CreateSemaphore = Module['_SDL_CreateSemaphore'] = createExportWrapper('SDL_CreateSemaphore', 1);
var _SDL_DestroySemaphore = Module['_SDL_DestroySemaphore'] = createExportWrapper('SDL_DestroySemaphore', 1);
var _SDL_DestroyCond = Module['_SDL_DestroyCond'] = createExportWrapper('SDL_DestroyCond', 1);
var _SDL_CondSignal = Module['_SDL_CondSignal'] = createExportWrapper('SDL_CondSignal', 1);
var _SDL_SemPost = Module['_SDL_SemPost'] = createExportWrapper('SDL_SemPost', 1);
var _SDL_SemWait = Module['_SDL_SemWait'] = createExportWrapper('SDL_SemWait', 1);
var _SDL_CondBroadcast = Module['_SDL_CondBroadcast'] = createExportWrapper('SDL_CondBroadcast', 1);
var _SDL_CondWaitTimeout = Module['_SDL_CondWaitTimeout'] = createExportWrapper('SDL_CondWaitTimeout', 3);
var _SDL_SemWaitTimeout = Module['_SDL_SemWaitTimeout'] = createExportWrapper('SDL_SemWaitTimeout', 2);
var _SDL_CondWait = Module['_SDL_CondWait'] = createExportWrapper('SDL_CondWait', 2);
var _SDL_GetBasePath = Module['_SDL_GetBasePath'] = createExportWrapper('SDL_GetBasePath', 0);
var _SDL_GetPrefPath = Module['_SDL_GetPrefPath'] = createExportWrapper('SDL_GetPrefPath', 2);
var _SDL_TryLockMutex = Module['_SDL_TryLockMutex'] = createExportWrapper('SDL_TryLockMutex', 1);
var _SDL_SemTryWait = Module['_SDL_SemTryWait'] = createExportWrapper('SDL_SemTryWait', 1);
var _SDL_SemValue = Module['_SDL_SemValue'] = createExportWrapper('SDL_SemValue', 1);
var _SDL_GetTicks64 = Module['_SDL_GetTicks64'] = createExportWrapper('SDL_GetTicks64', 0);
var _SDL_GetPerformanceCounter = Module['_SDL_GetPerformanceCounter'] = createExportWrapper('SDL_GetPerformanceCounter', 0);
var _SDL_GetPerformanceFrequency = Module['_SDL_GetPerformanceFrequency'] = createExportWrapper('SDL_GetPerformanceFrequency', 0);
var _SDL_TLSCreate = Module['_SDL_TLSCreate'] = createExportWrapper('SDL_TLSCreate', 0);
var _SDL_TLSGet = Module['_SDL_TLSGet'] = createExportWrapper('SDL_TLSGet', 1);
var _SDL_TLSSet = Module['_SDL_TLSSet'] = createExportWrapper('SDL_TLSSet', 3);
var _SDL_CreateThreadWithStackSize = Module['_SDL_CreateThreadWithStackSize'] = createExportWrapper('SDL_CreateThreadWithStackSize', 4);
var _SDL_CreateThread = Module['_SDL_CreateThread'] = createExportWrapper('SDL_CreateThread', 3);
var _SDL_GetThreadID = Module['_SDL_GetThreadID'] = createExportWrapper('SDL_GetThreadID', 1);
var _SDL_GetThreadName = Module['_SDL_GetThreadName'] = createExportWrapper('SDL_GetThreadName', 1);
var _SDL_DetachThread = Module['_SDL_DetachThread'] = createExportWrapper('SDL_DetachThread', 1);
var _SDL_AddTimer = Module['_SDL_AddTimer'] = createExportWrapper('SDL_AddTimer', 3);
var _SDL_RemoveTimer = Module['_SDL_RemoveTimer'] = createExportWrapper('SDL_RemoveTimer', 1);
var _SDL_GetNumTouchDevices = Module['_SDL_GetNumTouchDevices'] = createExportWrapper('SDL_GetNumTouchDevices', 0);
var _SDL_GetTouchDevice = Module['_SDL_GetTouchDevice'] = createExportWrapper('SDL_GetTouchDevice', 1);
var _SDL_GetTouchName = Module['_SDL_GetTouchName'] = createExportWrapper('SDL_GetTouchName', 1);
var _SDL_GetTouchDeviceType = Module['_SDL_GetTouchDeviceType'] = createExportWrapper('SDL_GetTouchDeviceType', 2);
var _SDL_GetNumTouchFingers = Module['_SDL_GetNumTouchFingers'] = createExportWrapper('SDL_GetNumTouchFingers', 2);
var _SDL_GetTouchFinger = Module['_SDL_GetTouchFinger'] = createExportWrapper('SDL_GetTouchFinger', 3);
var _SDL_GetWindowID = Module['_SDL_GetWindowID'] = createExportWrapper('SDL_GetWindowID', 1);
var _SDL_OpenURL = Module['_SDL_OpenURL'] = createExportWrapper('SDL_OpenURL', 1);
var _SDL_GetNumVideoDrivers = Module['_SDL_GetNumVideoDrivers'] = createExportWrapper('SDL_GetNumVideoDrivers', 0);
var _SDL_GetVideoDriver = Module['_SDL_GetVideoDriver'] = createExportWrapper('SDL_GetVideoDriver', 1);
var _SDL_StartTextInput = Module['_SDL_StartTextInput'] = createExportWrapper('SDL_StartTextInput', 0);
var _SDL_GL_ResetAttributes = Module['_SDL_GL_ResetAttributes'] = createExportWrapper('SDL_GL_ResetAttributes', 0);
var _SDL_DisableScreenSaver = Module['_SDL_DisableScreenSaver'] = createExportWrapper('SDL_DisableScreenSaver', 0);
var _SDL_HasScreenKeyboardSupport = Module['_SDL_HasScreenKeyboardSupport'] = createExportWrapper('SDL_HasScreenKeyboardSupport', 0);
var _SDL_GetCurrentVideoDriver = Module['_SDL_GetCurrentVideoDriver'] = createExportWrapper('SDL_GetCurrentVideoDriver', 0);
var _SDL_GetNumVideoDisplays = Module['_SDL_GetNumVideoDisplays'] = createExportWrapper('SDL_GetNumVideoDisplays', 0);
var _SDL_GetDisplayName = Module['_SDL_GetDisplayName'] = createExportWrapper('SDL_GetDisplayName', 1);
var _SDL_GetDisplayUsableBounds = Module['_SDL_GetDisplayUsableBounds'] = createExportWrapper('SDL_GetDisplayUsableBounds', 2);
var _SDL_GetDisplayDPI = Module['_SDL_GetDisplayDPI'] = createExportWrapper('SDL_GetDisplayDPI', 4);
var _SDL_GetDisplayOrientation = Module['_SDL_GetDisplayOrientation'] = createExportWrapper('SDL_GetDisplayOrientation', 1);
var _SDL_GetNumDisplayModes = Module['_SDL_GetNumDisplayModes'] = createExportWrapper('SDL_GetNumDisplayModes', 1);
var _SDL_GetDisplayMode = Module['_SDL_GetDisplayMode'] = createExportWrapper('SDL_GetDisplayMode', 3);
var _SDL_GetCurrentDisplayMode = Module['_SDL_GetCurrentDisplayMode'] = createExportWrapper('SDL_GetCurrentDisplayMode', 2);
var _SDL_GetClosestDisplayMode = Module['_SDL_GetClosestDisplayMode'] = createExportWrapper('SDL_GetClosestDisplayMode', 3);
var _SDL_GetPointDisplayIndex = Module['_SDL_GetPointDisplayIndex'] = createExportWrapper('SDL_GetPointDisplayIndex', 1);
var _SDL_GetRectDisplayIndex = Module['_SDL_GetRectDisplayIndex'] = createExportWrapper('SDL_GetRectDisplayIndex', 1);
var _SDL_SetWindowDisplayMode = Module['_SDL_SetWindowDisplayMode'] = createExportWrapper('SDL_SetWindowDisplayMode', 2);
var _SDL_GetWindowDisplayMode = Module['_SDL_GetWindowDisplayMode'] = createExportWrapper('SDL_GetWindowDisplayMode', 2);
var _SDL_GetWindowICCProfile = Module['_SDL_GetWindowICCProfile'] = createExportWrapper('SDL_GetWindowICCProfile', 2);
var _SDL_SetWindowTitle = Module['_SDL_SetWindowTitle'] = createExportWrapper('SDL_SetWindowTitle', 2);
var _SDL_Vulkan_LoadLibrary = Module['_SDL_Vulkan_LoadLibrary'] = createExportWrapper('SDL_Vulkan_LoadLibrary', 1);
var _SDL_SetWindowFullscreen = Module['_SDL_SetWindowFullscreen'] = createExportWrapper('SDL_SetWindowFullscreen', 2);
var _SDL_SetWindowGrab = Module['_SDL_SetWindowGrab'] = createExportWrapper('SDL_SetWindowGrab', 2);
var _SDL_CreateWindowFrom = Module['_SDL_CreateWindowFrom'] = createExportWrapper('SDL_CreateWindowFrom', 1);
var _SDL_HideWindow = Module['_SDL_HideWindow'] = createExportWrapper('SDL_HideWindow', 1);
var _SDL_GL_UnloadLibrary = Module['_SDL_GL_UnloadLibrary'] = createExportWrapper('SDL_GL_UnloadLibrary', 0);
var _SDL_Vulkan_UnloadLibrary = Module['_SDL_Vulkan_UnloadLibrary'] = createExportWrapper('SDL_Vulkan_UnloadLibrary', 0);
var _SDL_DestroyWindowSurface = Module['_SDL_DestroyWindowSurface'] = createExportWrapper('SDL_DestroyWindowSurface', 1);
var _SDL_GetWindowTitle = Module['_SDL_GetWindowTitle'] = createExportWrapper('SDL_GetWindowTitle', 1);
var _SDL_SetWindowIcon = Module['_SDL_SetWindowIcon'] = createExportWrapper('SDL_SetWindowIcon', 2);
var _SDL_GetWindowPosition = Module['_SDL_GetWindowPosition'] = createExportWrapper('SDL_GetWindowPosition', 3);
var _SDL_SetWindowBordered = Module['_SDL_SetWindowBordered'] = createExportWrapper('SDL_SetWindowBordered', 2);
var _SDL_SetWindowResizable = Module['_SDL_SetWindowResizable'] = createExportWrapper('SDL_SetWindowResizable', 2);
var _SDL_SetWindowAlwaysOnTop = Module['_SDL_SetWindowAlwaysOnTop'] = createExportWrapper('SDL_SetWindowAlwaysOnTop', 2);
var _SDL_SetWindowSize = Module['_SDL_SetWindowSize'] = createExportWrapper('SDL_SetWindowSize', 3);
var _SDL_GetWindowBordersSize = Module['_SDL_GetWindowBordersSize'] = createExportWrapper('SDL_GetWindowBordersSize', 5);
var _SDL_SetWindowMinimumSize = Module['_SDL_SetWindowMinimumSize'] = createExportWrapper('SDL_SetWindowMinimumSize', 3);
var _SDL_GetWindowMinimumSize = Module['_SDL_GetWindowMinimumSize'] = createExportWrapper('SDL_GetWindowMinimumSize', 3);
var _SDL_SetWindowMaximumSize = Module['_SDL_SetWindowMaximumSize'] = createExportWrapper('SDL_SetWindowMaximumSize', 3);
var _SDL_GetWindowMaximumSize = Module['_SDL_GetWindowMaximumSize'] = createExportWrapper('SDL_GetWindowMaximumSize', 3);
var _SDL_ShowWindow = Module['_SDL_ShowWindow'] = createExportWrapper('SDL_ShowWindow', 1);
var _SDL_RaiseWindow = Module['_SDL_RaiseWindow'] = createExportWrapper('SDL_RaiseWindow', 1);
var _SDL_MaximizeWindow = Module['_SDL_MaximizeWindow'] = createExportWrapper('SDL_MaximizeWindow', 1);
var _SDL_UpdateWindowSurfaceRects = Module['_SDL_UpdateWindowSurfaceRects'] = createExportWrapper('SDL_UpdateWindowSurfaceRects', 3);
var _SDL_SetWindowBrightness = Module['_SDL_SetWindowBrightness'] = createExportWrapper('SDL_SetWindowBrightness', 2);
var _SDL_SetWindowGammaRamp = Module['_SDL_SetWindowGammaRamp'] = createExportWrapper('SDL_SetWindowGammaRamp', 4);
var _SDL_GetWindowGammaRamp = Module['_SDL_GetWindowGammaRamp'] = createExportWrapper('SDL_GetWindowGammaRamp', 4);
var _SDL_GetWindowBrightness = Module['_SDL_GetWindowBrightness'] = createExportWrapper('SDL_GetWindowBrightness', 1);
var _SDL_SetWindowOpacity = Module['_SDL_SetWindowOpacity'] = createExportWrapper('SDL_SetWindowOpacity', 2);
var _SDL_GetWindowOpacity = Module['_SDL_GetWindowOpacity'] = createExportWrapper('SDL_GetWindowOpacity', 2);
var _SDL_SetWindowModalFor = Module['_SDL_SetWindowModalFor'] = createExportWrapper('SDL_SetWindowModalFor', 2);
var _SDL_SetWindowInputFocus = Module['_SDL_SetWindowInputFocus'] = createExportWrapper('SDL_SetWindowInputFocus', 1);
var _SDL_SetWindowMouseGrab = Module['_SDL_SetWindowMouseGrab'] = createExportWrapper('SDL_SetWindowMouseGrab', 2);
var _SDL_SetWindowKeyboardGrab = Module['_SDL_SetWindowKeyboardGrab'] = createExportWrapper('SDL_SetWindowKeyboardGrab', 2);
var _SDL_GetWindowGrab = Module['_SDL_GetWindowGrab'] = createExportWrapper('SDL_GetWindowGrab', 1);
var _SDL_GetWindowKeyboardGrab = Module['_SDL_GetWindowKeyboardGrab'] = createExportWrapper('SDL_GetWindowKeyboardGrab', 1);
var _SDL_GetWindowMouseGrab = Module['_SDL_GetWindowMouseGrab'] = createExportWrapper('SDL_GetWindowMouseGrab', 1);
var _SDL_GetGrabbedWindow = Module['_SDL_GetGrabbedWindow'] = createExportWrapper('SDL_GetGrabbedWindow', 0);
var _SDL_SetWindowMouseRect = Module['_SDL_SetWindowMouseRect'] = createExportWrapper('SDL_SetWindowMouseRect', 2);
var _SDL_FlashWindow = Module['_SDL_FlashWindow'] = createExportWrapper('SDL_FlashWindow', 2);
var _SDL_IsScreenSaverEnabled = Module['_SDL_IsScreenSaverEnabled'] = createExportWrapper('SDL_IsScreenSaverEnabled', 0);
var _SDL_EnableScreenSaver = Module['_SDL_EnableScreenSaver'] = createExportWrapper('SDL_EnableScreenSaver', 0);
var _SDL_GL_GetCurrentWindow = Module['_SDL_GL_GetCurrentWindow'] = createExportWrapper('SDL_GL_GetCurrentWindow', 0);
var _SDL_GL_SwapWindow = Module['_SDL_GL_SwapWindow'] = createExportWrapper('SDL_GL_SwapWindow', 1);
var _SDL_GetWindowWMInfo = Module['_SDL_GetWindowWMInfo'] = createExportWrapper('SDL_GetWindowWMInfo', 2);
var _SDL_ClearComposition = Module['_SDL_ClearComposition'] = createExportWrapper('SDL_ClearComposition', 0);
var _SDL_IsTextInputShown = Module['_SDL_IsTextInputShown'] = createExportWrapper('SDL_IsTextInputShown', 0);
var _SDL_IsTextInputActive = Module['_SDL_IsTextInputActive'] = createExportWrapper('SDL_IsTextInputActive', 0);
var _SDL_StopTextInput = Module['_SDL_StopTextInput'] = createExportWrapper('SDL_StopTextInput', 0);
var _SDL_SetTextInputRect = Module['_SDL_SetTextInputRect'] = createExportWrapper('SDL_SetTextInputRect', 1);
var _SDL_IsScreenKeyboardShown = Module['_SDL_IsScreenKeyboardShown'] = createExportWrapper('SDL_IsScreenKeyboardShown', 1);
var _SDL_ShowSimpleMessageBox = Module['_SDL_ShowSimpleMessageBox'] = createExportWrapper('SDL_ShowSimpleMessageBox', 4);
var _SDL_SetWindowHitTest = Module['_SDL_SetWindowHitTest'] = createExportWrapper('SDL_SetWindowHitTest', 3);
var _SDL_OnApplicationWillTerminate = Module['_SDL_OnApplicationWillTerminate'] = createExportWrapper('SDL_OnApplicationWillTerminate', 0);
var _SDL_OnApplicationDidReceiveMemoryWarning = Module['_SDL_OnApplicationDidReceiveMemoryWarning'] = createExportWrapper('SDL_OnApplicationDidReceiveMemoryWarning', 0);
var _SDL_OnApplicationWillResignActive = Module['_SDL_OnApplicationWillResignActive'] = createExportWrapper('SDL_OnApplicationWillResignActive', 0);
var _SDL_OnApplicationDidEnterBackground = Module['_SDL_OnApplicationDidEnterBackground'] = createExportWrapper('SDL_OnApplicationDidEnterBackground', 0);
var _SDL_OnApplicationWillEnterForeground = Module['_SDL_OnApplicationWillEnterForeground'] = createExportWrapper('SDL_OnApplicationWillEnterForeground', 0);
var _SDL_OnApplicationDidBecomeActive = Module['_SDL_OnApplicationDidBecomeActive'] = createExportWrapper('SDL_OnApplicationDidBecomeActive', 0);
var _SDL_Vulkan_GetVkGetInstanceProcAddr = Module['_SDL_Vulkan_GetVkGetInstanceProcAddr'] = createExportWrapper('SDL_Vulkan_GetVkGetInstanceProcAddr', 0);
var _SDL_Vulkan_GetInstanceExtensions = Module['_SDL_Vulkan_GetInstanceExtensions'] = createExportWrapper('SDL_Vulkan_GetInstanceExtensions', 3);
var _SDL_Vulkan_CreateSurface = Module['_SDL_Vulkan_CreateSurface'] = createExportWrapper('SDL_Vulkan_CreateSurface', 3);
var _SDL_Vulkan_GetDrawableSize = Module['_SDL_Vulkan_GetDrawableSize'] = createExportWrapper('SDL_Vulkan_GetDrawableSize', 3);
var _SDL_Metal_CreateView = Module['_SDL_Metal_CreateView'] = createExportWrapper('SDL_Metal_CreateView', 1);
var _SDL_Metal_DestroyView = Module['_SDL_Metal_DestroyView'] = createExportWrapper('SDL_Metal_DestroyView', 1);
var _SDL_Metal_GetLayer = Module['_SDL_Metal_GetLayer'] = createExportWrapper('SDL_Metal_GetLayer', 1);
var _SDL_Metal_GetDrawableSize = Module['_SDL_Metal_GetDrawableSize'] = createExportWrapper('SDL_Metal_GetDrawableSize', 3);
var _SDL_SetYUVConversionMode = Module['_SDL_SetYUVConversionMode'] = createExportWrapper('SDL_SetYUVConversionMode', 1);
var _SDL_GetYUVConversionMode = Module['_SDL_GetYUVConversionMode'] = createExportWrapper('SDL_GetYUVConversionMode', 0);
var _FT_MulDiv = Module['_FT_MulDiv'] = createExportWrapper('FT_MulDiv', 3);
var _FT_Matrix_Invert = Module['_FT_Matrix_Invert'] = createExportWrapper('FT_Matrix_Invert', 1);
var _FT_Vector_Transform = Module['_FT_Vector_Transform'] = createExportWrapper('FT_Vector_Transform', 2);
var _FT_Outline_Get_CBox = Module['_FT_Outline_Get_CBox'] = createExportWrapper('FT_Outline_Get_CBox', 2);
var _FT_Outline_Get_Orientation = Module['_FT_Outline_Get_Orientation'] = createExportWrapper('FT_Outline_Get_Orientation', 1);
var _FT_DivFix = Module['_FT_DivFix'] = createExportWrapper('FT_DivFix', 2);
var _FT_Outline_EmboldenXY = Module['_FT_Outline_EmboldenXY'] = createExportWrapper('FT_Outline_EmboldenXY', 3);
var _FT_Get_Next_Char = Module['_FT_Get_Next_Char'] = createExportWrapper('FT_Get_Next_Char', 3);
var _FT_Get_Module = Module['_FT_Get_Module'] = createExportWrapper('FT_Get_Module', 2);
var _FT_Set_Named_Instance = Module['_FT_Set_Named_Instance'] = createExportWrapper('FT_Set_Named_Instance', 2);
var _FT_RoundFix = Module['_FT_RoundFix'] = createExportWrapper('FT_RoundFix', 1);
var _FT_Get_Advances = Module['_FT_Get_Advances'] = createExportWrapper('FT_Get_Advances', 5);
var _FT_CeilFix = Module['_FT_CeilFix'] = createExportWrapper('FT_CeilFix', 1);
var _FT_FloorFix = Module['_FT_FloorFix'] = createExportWrapper('FT_FloorFix', 1);
var _FT_Vector_Length = Module['_FT_Vector_Length'] = createExportWrapper('FT_Vector_Length', 1);
var _FT_Matrix_Multiply = Module['_FT_Matrix_Multiply'] = createExportWrapper('FT_Matrix_Multiply', 2);
var _FT_Palette_Data_Get = Module['_FT_Palette_Data_Get'] = createExportWrapper('FT_Palette_Data_Get', 2);
var _FT_Palette_Select = Module['_FT_Palette_Select'] = createExportWrapper('FT_Palette_Select', 3);
var _FT_Palette_Set_Foreground_Color = Module['_FT_Palette_Set_Foreground_Color'] = createExportWrapper('FT_Palette_Set_Foreground_Color', 2);
var _FT_Error_String = Module['_FT_Error_String'] = createExportWrapper('FT_Error_String', 1);
var _FT_Get_Font_Format = Module['_FT_Get_Font_Format'] = createExportWrapper('FT_Get_Font_Format', 1);
var _FT_Get_X11_Font_Format = Module['_FT_Get_X11_Font_Format'] = createExportWrapper('FT_Get_X11_Font_Format', 1);
var _FT_Library_SetLcdFilterWeights = Module['_FT_Library_SetLcdFilterWeights'] = createExportWrapper('FT_Library_SetLcdFilterWeights', 2);
var _FT_Library_SetLcdFilter = Module['_FT_Library_SetLcdFilter'] = createExportWrapper('FT_Library_SetLcdFilter', 2);
var _FT_Library_SetLcdGeometry = Module['_FT_Library_SetLcdGeometry'] = createExportWrapper('FT_Library_SetLcdGeometry', 2);
var _FT_Get_Transform = Module['_FT_Get_Transform'] = createExportWrapper('FT_Get_Transform', 3);
var _FT_Outline_Check = Module['_FT_Outline_Check'] = createExportWrapper('FT_Outline_Check', 1);
var _FT_Load_Char = Module['_FT_Load_Char'] = createExportWrapper('FT_Load_Char', 3);
var _FT_New_Face = Module['_FT_New_Face'] = createExportWrapper('FT_New_Face', 4);
var _FT_New_Size = Module['_FT_New_Size'] = createExportWrapper('FT_New_Size', 2);
var _FT_Attach_File = Module['_FT_Attach_File'] = createExportWrapper('FT_Attach_File', 2);
var _FT_Attach_Stream = Module['_FT_Attach_Stream'] = createExportWrapper('FT_Attach_Stream', 2);
var _FT_List_Find = Module['_FT_List_Find'] = createExportWrapper('FT_List_Find', 2);
var _FT_List_Remove = Module['_FT_List_Remove'] = createExportWrapper('FT_List_Remove', 2);
var _FT_List_Add = Module['_FT_List_Add'] = createExportWrapper('FT_List_Add', 2);
var _FT_Done_Size = Module['_FT_Done_Size'] = createExportWrapper('FT_Done_Size', 1);
var _FT_Request_Size = Module['_FT_Request_Size'] = createExportWrapper('FT_Request_Size', 2);
var _FT_Set_Pixel_Sizes = Module['_FT_Set_Pixel_Sizes'] = createExportWrapper('FT_Set_Pixel_Sizes', 3);
var _FT_Get_Track_Kerning = Module['_FT_Get_Track_Kerning'] = createExportWrapper('FT_Get_Track_Kerning', 4);
var _FT_Get_CMap_Format = Module['_FT_Get_CMap_Format'] = createExportWrapper('FT_Get_CMap_Format', 1);
var _FT_Get_Charmap_Index = Module['_FT_Get_Charmap_Index'] = createExportWrapper('FT_Get_Charmap_Index', 1);
var _FT_Get_First_Char = Module['_FT_Get_First_Char'] = createExportWrapper('FT_Get_First_Char', 2);
var _FT_Face_Properties = Module['_FT_Face_Properties'] = createExportWrapper('FT_Face_Properties', 3);
var _FT_Face_GetCharVariantIsDefault = Module['_FT_Face_GetCharVariantIsDefault'] = createExportWrapper('FT_Face_GetCharVariantIsDefault', 3);
var _FT_Face_GetVariantSelectors = Module['_FT_Face_GetVariantSelectors'] = createExportWrapper('FT_Face_GetVariantSelectors', 1);
var _FT_Face_GetVariantsOfChar = Module['_FT_Face_GetVariantsOfChar'] = createExportWrapper('FT_Face_GetVariantsOfChar', 2);
var _FT_Face_GetCharsOfVariant = Module['_FT_Face_GetCharsOfVariant'] = createExportWrapper('FT_Face_GetCharsOfVariant', 2);
var _FT_Get_Postscript_Name = Module['_FT_Get_Postscript_Name'] = createExportWrapper('FT_Get_Postscript_Name', 1);
var _FT_Get_Sfnt_Table = Module['_FT_Get_Sfnt_Table'] = createExportWrapper('FT_Get_Sfnt_Table', 2);
var _FT_Sfnt_Table_Info = Module['_FT_Sfnt_Table_Info'] = createExportWrapper('FT_Sfnt_Table_Info', 4);
var _FT_Get_CMap_Language_ID = Module['_FT_Get_CMap_Language_ID'] = createExportWrapper('FT_Get_CMap_Language_ID', 1);
var _FT_Activate_Size = Module['_FT_Activate_Size'] = createExportWrapper('FT_Activate_Size', 1);
var _FT_Get_Renderer = Module['_FT_Get_Renderer'] = createExportWrapper('FT_Get_Renderer', 2);
var _FT_Set_Renderer = Module['_FT_Set_Renderer'] = createExportWrapper('FT_Set_Renderer', 4);
var _FT_List_Up = Module['_FT_List_Up'] = createExportWrapper('FT_List_Up', 2);
var _FT_Get_Color_Glyph_Layer = Module['_FT_Get_Color_Glyph_Layer'] = createExportWrapper('FT_Get_Color_Glyph_Layer', 5);
var _FT_Add_Module = Module['_FT_Add_Module'] = createExportWrapper('FT_Add_Module', 2);
var _FT_Remove_Module = Module['_FT_Remove_Module'] = createExportWrapper('FT_Remove_Module', 2);
var _FT_Property_Set = Module['_FT_Property_Set'] = createExportWrapper('FT_Property_Set', 4);
var _FT_Property_Get = Module['_FT_Property_Get'] = createExportWrapper('FT_Property_Get', 4);
var _FT_Reference_Library = Module['_FT_Reference_Library'] = createExportWrapper('FT_Reference_Library', 1);
var _FT_New_Library = Module['_FT_New_Library'] = createExportWrapper('FT_New_Library', 2);
var _FT_Done_Library = Module['_FT_Done_Library'] = createExportWrapper('FT_Done_Library', 1);
var _FT_Set_Debug_Hook = Module['_FT_Set_Debug_Hook'] = createExportWrapper('FT_Set_Debug_Hook', 3);
var _FT_Get_TrueType_Engine_Type = Module['_FT_Get_TrueType_Engine_Type'] = createExportWrapper('FT_Get_TrueType_Engine_Type', 1);
var _FT_Get_SubGlyph_Info = Module['_FT_Get_SubGlyph_Info'] = createExportWrapper('FT_Get_SubGlyph_Info', 7);
var _FT_Get_Color_Glyph_Paint = Module['_FT_Get_Color_Glyph_Paint'] = createExportWrapper('FT_Get_Color_Glyph_Paint', 4);
var _FT_Get_Color_Glyph_ClipBox = Module['_FT_Get_Color_Glyph_ClipBox'] = createExportWrapper('FT_Get_Color_Glyph_ClipBox', 3);
var _FT_Get_Paint_Layers = Module['_FT_Get_Paint_Layers'] = createExportWrapper('FT_Get_Paint_Layers', 3);
var _FT_Get_Paint = Module['_FT_Get_Paint'] = createExportWrapper('FT_Get_Paint', 3);
var _FT_Get_Colorline_Stops = Module['_FT_Get_Colorline_Stops'] = createExportWrapper('FT_Get_Colorline_Stops', 3);
var _FT_Outline_Decompose = Module['_FT_Outline_Decompose'] = createExportWrapper('FT_Outline_Decompose', 3);
var _FT_Outline_New = Module['_FT_Outline_New'] = createExportWrapper('FT_Outline_New', 4);
var _FT_Outline_Done = Module['_FT_Outline_Done'] = createExportWrapper('FT_Outline_Done', 2);
var _FT_Outline_Copy = Module['_FT_Outline_Copy'] = createExportWrapper('FT_Outline_Copy', 2);
var _FT_Outline_Reverse = Module['_FT_Outline_Reverse'] = createExportWrapper('FT_Outline_Reverse', 1);
var _FT_Outline_Render = Module['_FT_Outline_Render'] = createExportWrapper('FT_Outline_Render', 3);
var _FT_Outline_Get_Bitmap = Module['_FT_Outline_Get_Bitmap'] = createExportWrapper('FT_Outline_Get_Bitmap', 3);
var _FT_Outline_Embolden = Module['_FT_Outline_Embolden'] = createExportWrapper('FT_Outline_Embolden', 2);
var _FT_Get_Sfnt_Name_Count = Module['_FT_Get_Sfnt_Name_Count'] = createExportWrapper('FT_Get_Sfnt_Name_Count', 1);
var _FT_Get_Sfnt_Name = Module['_FT_Get_Sfnt_Name'] = createExportWrapper('FT_Get_Sfnt_Name', 3);
var _FT_Get_Sfnt_LangTag = Module['_FT_Get_Sfnt_LangTag'] = createExportWrapper('FT_Get_Sfnt_LangTag', 3);
var _FT_Cos = Module['_FT_Cos'] = createExportWrapper('FT_Cos', 1);
var _FT_Vector_Unit = Module['_FT_Vector_Unit'] = createExportWrapper('FT_Vector_Unit', 2);
var _FT_Sin = Module['_FT_Sin'] = createExportWrapper('FT_Sin', 1);
var _FT_Tan = Module['_FT_Tan'] = createExportWrapper('FT_Tan', 1);
var _FT_Atan2 = Module['_FT_Atan2'] = createExportWrapper('FT_Atan2', 2);
var _FT_Vector_Rotate = Module['_FT_Vector_Rotate'] = createExportWrapper('FT_Vector_Rotate', 2);
var _FT_Vector_Polarize = Module['_FT_Vector_Polarize'] = createExportWrapper('FT_Vector_Polarize', 3);
var _FT_Vector_From_Polar = Module['_FT_Vector_From_Polar'] = createExportWrapper('FT_Vector_From_Polar', 3);
var _FT_Angle_Diff = Module['_FT_Angle_Diff'] = createExportWrapper('FT_Angle_Diff', 2);
var _FT_List_Insert = Module['_FT_List_Insert'] = createExportWrapper('FT_List_Insert', 2);
var _FT_List_Iterate = Module['_FT_List_Iterate'] = createExportWrapper('FT_List_Iterate', 3);
var _FT_List_Finalize = Module['_FT_List_Finalize'] = createExportWrapper('FT_List_Finalize', 4);
var _FT_Outline_Get_BBox = Module['_FT_Outline_Get_BBox'] = createExportWrapper('FT_Outline_Get_BBox', 2);
var _FT_Get_BDF_Charset_ID = Module['_FT_Get_BDF_Charset_ID'] = createExportWrapper('FT_Get_BDF_Charset_ID', 3);
var _FT_Get_BDF_Property = Module['_FT_Get_BDF_Property'] = createExportWrapper('FT_Get_BDF_Property', 3);
var _FT_Bitmap_Init = Module['_FT_Bitmap_Init'] = createExportWrapper('FT_Bitmap_Init', 1);
var _FT_Bitmap_New = Module['_FT_Bitmap_New'] = createExportWrapper('FT_Bitmap_New', 1);
var _FT_Bitmap_Copy = Module['_FT_Bitmap_Copy'] = createExportWrapper('FT_Bitmap_Copy', 3);
var _FT_Bitmap_Embolden = Module['_FT_Bitmap_Embolden'] = createExportWrapper('FT_Bitmap_Embolden', 4);
var _FT_Bitmap_Convert = Module['_FT_Bitmap_Convert'] = createExportWrapper('FT_Bitmap_Convert', 4);
var _FT_Bitmap_Done = Module['_FT_Bitmap_Done'] = createExportWrapper('FT_Bitmap_Done', 2);
var _FT_Bitmap_Blend = Module['_FT_Bitmap_Blend'] = createExportWrapper('FT_Bitmap_Blend', 6);
var _FT_GlyphSlot_Own_Bitmap = Module['_FT_GlyphSlot_Own_Bitmap'] = createExportWrapper('FT_GlyphSlot_Own_Bitmap', 1);
var _FT_Stream_OpenBzip2 = Module['_FT_Stream_OpenBzip2'] = createExportWrapper('FT_Stream_OpenBzip2', 2);
var _FTC_ImageCache_New = Module['_FTC_ImageCache_New'] = createExportWrapper('FTC_ImageCache_New', 2);
var _FTC_ImageCache_Lookup = Module['_FTC_ImageCache_Lookup'] = createExportWrapper('FTC_ImageCache_Lookup', 5);
var _FTC_ImageCache_LookupScaler = Module['_FTC_ImageCache_LookupScaler'] = createExportWrapper('FTC_ImageCache_LookupScaler', 6);
var _FTC_SBitCache_New = Module['_FTC_SBitCache_New'] = createExportWrapper('FTC_SBitCache_New', 2);
var _FTC_SBitCache_Lookup = Module['_FTC_SBitCache_Lookup'] = createExportWrapper('FTC_SBitCache_Lookup', 5);
var _FTC_SBitCache_LookupScaler = Module['_FTC_SBitCache_LookupScaler'] = createExportWrapper('FTC_SBitCache_LookupScaler', 6);
var _FTC_CMapCache_New = Module['_FTC_CMapCache_New'] = createExportWrapper('FTC_CMapCache_New', 2);
var _FTC_CMapCache_Lookup = Module['_FTC_CMapCache_Lookup'] = createExportWrapper('FTC_CMapCache_Lookup', 4);
var _FTC_Manager_LookupFace = Module['_FTC_Manager_LookupFace'] = createExportWrapper('FTC_Manager_LookupFace', 3);
var _FTC_Manager_LookupSize = Module['_FTC_Manager_LookupSize'] = createExportWrapper('FTC_Manager_LookupSize', 3);
var _FTC_Manager_New = Module['_FTC_Manager_New'] = createExportWrapper('FTC_Manager_New', 7);
var _FTC_Manager_Done = Module['_FTC_Manager_Done'] = createExportWrapper('FTC_Manager_Done', 1);
var _FTC_Manager_Reset = Module['_FTC_Manager_Reset'] = createExportWrapper('FTC_Manager_Reset', 1);
var _FTC_Manager_RemoveFaceID = Module['_FTC_Manager_RemoveFaceID'] = createExportWrapper('FTC_Manager_RemoveFaceID', 2);
var _FTC_Node_Unref = Module['_FTC_Node_Unref'] = createExportWrapper('FTC_Node_Unref', 2);
var _FT_Get_CID_Registry_Ordering_Supplement = Module['_FT_Get_CID_Registry_Ordering_Supplement'] = createExportWrapper('FT_Get_CID_Registry_Ordering_Supplement', 4);
var _FT_Get_CID_Is_Internally_CID_Keyed = Module['_FT_Get_CID_Is_Internally_CID_Keyed'] = createExportWrapper('FT_Get_CID_Is_Internally_CID_Keyed', 2);
var _FT_Get_CID_From_Glyph_Index = Module['_FT_Get_CID_From_Glyph_Index'] = createExportWrapper('FT_Get_CID_From_Glyph_Index', 3);
var _FT_Trace_Set_Level = Module['_FT_Trace_Set_Level'] = createExportWrapper('FT_Trace_Set_Level', 1);
var _FT_Trace_Set_Default_Level = Module['_FT_Trace_Set_Default_Level'] = createExportWrapper('FT_Trace_Set_Default_Level', 0);
var _FT_Set_Log_Handler = Module['_FT_Set_Log_Handler'] = createExportWrapper('FT_Set_Log_Handler', 1);
var _FT_Set_Default_Log_Handler = Module['_FT_Set_Default_Log_Handler'] = createExportWrapper('FT_Set_Default_Log_Handler', 0);
var _FT_Get_FSType_Flags = Module['_FT_Get_FSType_Flags'] = createExportWrapper('FT_Get_FSType_Flags', 1);
var _FT_Get_Gasp = Module['_FT_Get_Gasp'] = createExportWrapper('FT_Get_Gasp', 2);
var _FT_Glyph_Copy = Module['_FT_Glyph_Copy'] = createExportWrapper('FT_Glyph_Copy', 2);
var _FT_New_Glyph = Module['_FT_New_Glyph'] = createExportWrapper('FT_New_Glyph', 3);
var _FT_Glyph_Transform = Module['_FT_Glyph_Transform'] = createExportWrapper('FT_Glyph_Transform', 3);
var _FT_Glyph_Get_CBox = Module['_FT_Glyph_Get_CBox'] = createExportWrapper('FT_Glyph_Get_CBox', 3);
var _FT_TrueTypeGX_Validate = Module['_FT_TrueTypeGX_Validate'] = createExportWrapper('FT_TrueTypeGX_Validate', 4);
var _FT_TrueTypeGX_Free = Module['_FT_TrueTypeGX_Free'] = createExportWrapper('FT_TrueTypeGX_Free', 2);
var _FT_ClassicKern_Validate = Module['_FT_ClassicKern_Validate'] = createExportWrapper('FT_ClassicKern_Validate', 3);
var _FT_ClassicKern_Free = Module['_FT_ClassicKern_Free'] = createExportWrapper('FT_ClassicKern_Free', 2);
var _FT_Stream_OpenGzip = Module['_FT_Stream_OpenGzip'] = createExportWrapper('FT_Stream_OpenGzip', 2);
var _FT_Gzip_Uncompress = Module['_FT_Gzip_Uncompress'] = createExportWrapper('FT_Gzip_Uncompress', 5);
var _FT_Add_Default_Modules = Module['_FT_Add_Default_Modules'] = createExportWrapper('FT_Add_Default_Modules', 1);
var _FT_Set_Default_Properties = Module['_FT_Set_Default_Properties'] = createExportWrapper('FT_Set_Default_Properties', 1);
var _FT_Stream_OpenLZW = Module['_FT_Stream_OpenLZW'] = createExportWrapper('FT_Stream_OpenLZW', 2);
var _FT_Get_Multi_Master = Module['_FT_Get_Multi_Master'] = createExportWrapper('FT_Get_Multi_Master', 2);
var _FT_Get_MM_Var = Module['_FT_Get_MM_Var'] = createExportWrapper('FT_Get_MM_Var', 2);
var _FT_Done_MM_Var = Module['_FT_Done_MM_Var'] = createExportWrapper('FT_Done_MM_Var', 2);
var _FT_Set_MM_Design_Coordinates = Module['_FT_Set_MM_Design_Coordinates'] = createExportWrapper('FT_Set_MM_Design_Coordinates', 3);
var _FT_Set_MM_WeightVector = Module['_FT_Set_MM_WeightVector'] = createExportWrapper('FT_Set_MM_WeightVector', 3);
var _FT_Get_MM_WeightVector = Module['_FT_Get_MM_WeightVector'] = createExportWrapper('FT_Get_MM_WeightVector', 3);
var _FT_Set_Var_Design_Coordinates = Module['_FT_Set_Var_Design_Coordinates'] = createExportWrapper('FT_Set_Var_Design_Coordinates', 3);
var _FT_Get_Var_Design_Coordinates = Module['_FT_Get_Var_Design_Coordinates'] = createExportWrapper('FT_Get_Var_Design_Coordinates', 3);
var _FT_Set_MM_Blend_Coordinates = Module['_FT_Set_MM_Blend_Coordinates'] = createExportWrapper('FT_Set_MM_Blend_Coordinates', 3);
var _FT_Set_Var_Blend_Coordinates = Module['_FT_Set_Var_Blend_Coordinates'] = createExportWrapper('FT_Set_Var_Blend_Coordinates', 3);
var _FT_Get_MM_Blend_Coordinates = Module['_FT_Get_MM_Blend_Coordinates'] = createExportWrapper('FT_Get_MM_Blend_Coordinates', 3);
var _FT_Get_Var_Blend_Coordinates = Module['_FT_Get_Var_Blend_Coordinates'] = createExportWrapper('FT_Get_Var_Blend_Coordinates', 3);
var _FT_Get_Var_Axis_Flags = Module['_FT_Get_Var_Axis_Flags'] = createExportWrapper('FT_Get_Var_Axis_Flags', 3);
var _FT_Get_Default_Named_Instance = Module['_FT_Get_Default_Named_Instance'] = createExportWrapper('FT_Get_Default_Named_Instance', 2);
var _FT_OpenType_Validate = Module['_FT_OpenType_Validate'] = createExportWrapper('FT_OpenType_Validate', 7);
var _FT_OpenType_Free = Module['_FT_OpenType_Free'] = createExportWrapper('FT_OpenType_Free', 2);
var _FT_Face_CheckTrueTypePatents = Module['_FT_Face_CheckTrueTypePatents'] = createExportWrapper('FT_Face_CheckTrueTypePatents', 1);
var _FT_Face_SetUnpatentedHinting = Module['_FT_Face_SetUnpatentedHinting'] = createExportWrapper('FT_Face_SetUnpatentedHinting', 2);
var _FT_Get_PFR_Metrics = Module['_FT_Get_PFR_Metrics'] = createExportWrapper('FT_Get_PFR_Metrics', 5);
var _FT_Get_PFR_Kerning = Module['_FT_Get_PFR_Kerning'] = createExportWrapper('FT_Get_PFR_Kerning', 4);
var _FT_Get_PFR_Advance = Module['_FT_Get_PFR_Advance'] = createExportWrapper('FT_Get_PFR_Advance', 3);
var _FT_Outline_GetInsideBorder = Module['_FT_Outline_GetInsideBorder'] = createExportWrapper('FT_Outline_GetInsideBorder', 1);
var _FT_Outline_GetOutsideBorder = Module['_FT_Outline_GetOutsideBorder'] = createExportWrapper('FT_Outline_GetOutsideBorder', 1);
var _FT_Stroker_Rewind = Module['_FT_Stroker_Rewind'] = createExportWrapper('FT_Stroker_Rewind', 1);
var _FT_Stroker_LineTo = Module['_FT_Stroker_LineTo'] = createExportWrapper('FT_Stroker_LineTo', 2);
var _FT_Stroker_ConicTo = Module['_FT_Stroker_ConicTo'] = createExportWrapper('FT_Stroker_ConicTo', 3);
var _FT_Stroker_CubicTo = Module['_FT_Stroker_CubicTo'] = createExportWrapper('FT_Stroker_CubicTo', 4);
var _FT_Stroker_BeginSubPath = Module['_FT_Stroker_BeginSubPath'] = createExportWrapper('FT_Stroker_BeginSubPath', 3);
var _FT_Stroker_EndSubPath = Module['_FT_Stroker_EndSubPath'] = createExportWrapper('FT_Stroker_EndSubPath', 1);
var _FT_Stroker_GetBorderCounts = Module['_FT_Stroker_GetBorderCounts'] = createExportWrapper('FT_Stroker_GetBorderCounts', 4);
var _FT_Stroker_GetCounts = Module['_FT_Stroker_GetCounts'] = createExportWrapper('FT_Stroker_GetCounts', 3);
var _FT_Stroker_ExportBorder = Module['_FT_Stroker_ExportBorder'] = createExportWrapper('FT_Stroker_ExportBorder', 3);
var _FT_Stroker_Export = Module['_FT_Stroker_Export'] = createExportWrapper('FT_Stroker_Export', 2);
var _FT_Stroker_ParseOutline = Module['_FT_Stroker_ParseOutline'] = createExportWrapper('FT_Stroker_ParseOutline', 3);
var _FT_Glyph_StrokeBorder = Module['_FT_Glyph_StrokeBorder'] = createExportWrapper('FT_Glyph_StrokeBorder', 4);
var _FT_GlyphSlot_Oblique = Module['_FT_GlyphSlot_Oblique'] = createExportWrapper('FT_GlyphSlot_Oblique', 1);
var _FT_GlyphSlot_Slant = Module['_FT_GlyphSlot_Slant'] = createExportWrapper('FT_GlyphSlot_Slant', 3);
var _FT_GlyphSlot_Embolden = Module['_FT_GlyphSlot_Embolden'] = createExportWrapper('FT_GlyphSlot_Embolden', 1);
var _FT_GlyphSlot_AdjustWeight = Module['_FT_GlyphSlot_AdjustWeight'] = createExportWrapper('FT_GlyphSlot_AdjustWeight', 3);
var _FT_Get_PS_Font_Info = Module['_FT_Get_PS_Font_Info'] = createExportWrapper('FT_Get_PS_Font_Info', 2);
var _FT_Has_PS_Glyph_Names = Module['_FT_Has_PS_Glyph_Names'] = createExportWrapper('FT_Has_PS_Glyph_Names', 1);
var _FT_Get_PS_Font_Private = Module['_FT_Get_PS_Font_Private'] = createExportWrapper('FT_Get_PS_Font_Private', 2);
var _FT_Get_PS_Font_Value = Module['_FT_Get_PS_Font_Value'] = createExportWrapper('FT_Get_PS_Font_Value', 5);
var _FT_Get_WinFNT_Header = Module['_FT_Get_WinFNT_Header'] = createExportWrapper('FT_Get_WinFNT_Header', 2);
var _TT_RunIns = Module['_TT_RunIns'] = createExportWrapper('TT_RunIns', 1);
var _TT_New_Context = Module['_TT_New_Context'] = createExportWrapper('TT_New_Context', 1);
var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'])();
var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'])();
var _emscripten_builtin_memalign = createExportWrapper('emscripten_builtin_memalign', 2);
var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'])();
var _fileno = createExportWrapper('fileno', 1);
var _htons = createExportWrapper('htons', 1);
var _ntohs = createExportWrapper('ntohs', 1);
var _htonl = createExportWrapper('htonl', 1);
var __emscripten_timeout = createExportWrapper('_emscripten_timeout', 2);
var _setThrew = createExportWrapper('setThrew', 2);
var __emscripten_tempret_set = createExportWrapper('_emscripten_tempret_set', 1);
var __emscripten_tempret_get = createExportWrapper('_emscripten_tempret_get', 0);
var ___emutls_get_address = Module['___emutls_get_address'] = createExportWrapper('__emutls_get_address', 1);
var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports['emscripten_stack_init'])();
var _emscripten_stack_set_limits = Module['_emscripten_stack_set_limits'] = (a0, a1) => (_emscripten_stack_set_limits = Module['_emscripten_stack_set_limits'] = wasmExports['emscripten_stack_set_limits'])(a0, a1);
var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'])();
var __emscripten_stack_restore = (a0) => (__emscripten_stack_restore = wasmExports['_emscripten_stack_restore'])(a0);
var __emscripten_stack_alloc = (a0) => (__emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'])(a0);
var __ZNSt8bad_castD2Ev = Module['__ZNSt8bad_castD2Ev'] = createExportWrapper('_ZNSt8bad_castD2Ev', 1);
var __ZnamSt11align_val_t = Module['__ZnamSt11align_val_t'] = createExportWrapper('_ZnamSt11align_val_t', 2);
var __ZdaPvSt11align_val_t = Module['__ZdaPvSt11align_val_t'] = createExportWrapper('_ZdaPvSt11align_val_t', 2);
var ___cxa_pure_virtual = Module['___cxa_pure_virtual'] = createExportWrapper('__cxa_pure_virtual', 0);
var ___cxa_uncaught_exceptions = Module['___cxa_uncaught_exceptions'] = createExportWrapper('__cxa_uncaught_exceptions', 0);
var ___cxa_decrement_exception_refcount = createExportWrapper('__cxa_decrement_exception_refcount', 1);
var ___cxa_increment_exception_refcount = createExportWrapper('__cxa_increment_exception_refcount', 1);
var ___cxa_current_primary_exception = Module['___cxa_current_primary_exception'] = createExportWrapper('__cxa_current_primary_exception', 0);
var __ZSt9terminatev = Module['__ZSt9terminatev'] = createExportWrapper('_ZSt9terminatev', 0);
var ___cxa_rethrow_primary_exception = Module['___cxa_rethrow_primary_exception'] = createExportWrapper('__cxa_rethrow_primary_exception', 1);
var __ZNKSt13runtime_error4whatEv = Module['__ZNKSt13runtime_error4whatEv'] = createExportWrapper('_ZNKSt13runtime_error4whatEv', 1);
var __ZNSt9exceptionD2Ev = Module['__ZNSt9exceptionD2Ev'] = createExportWrapper('_ZNSt9exceptionD2Ev', 1);
var __ZNSt11logic_errorD2Ev = Module['__ZNSt11logic_errorD2Ev'] = createExportWrapper('_ZNSt11logic_errorD2Ev', 1);
var __ZNKSt11logic_error4whatEv = Module['__ZNKSt11logic_error4whatEv'] = createExportWrapper('_ZNKSt11logic_error4whatEv', 1);
var __ZdaPv = Module['__ZdaPv'] = createExportWrapper('_ZdaPv', 1);
var __Znam = Module['__Znam'] = createExportWrapper('_Znam', 1);
var __ZSt15get_new_handlerv = Module['__ZSt15get_new_handlerv'] = createExportWrapper('_ZSt15get_new_handlerv', 0);
var __ZdlPv = Module['__ZdlPv'] = createExportWrapper('_ZdlPv', 1);
var __ZdaPvm = Module['__ZdaPvm'] = createExportWrapper('_ZdaPvm', 2);
var __ZdlPvSt11align_val_t = Module['__ZdlPvSt11align_val_t'] = createExportWrapper('_ZdlPvSt11align_val_t', 2);
var __ZdaPvmSt11align_val_t = Module['__ZdaPvmSt11align_val_t'] = createExportWrapper('_ZdaPvmSt11align_val_t', 3);
var ___dynamic_cast = Module['___dynamic_cast'] = createExportWrapper('__dynamic_cast', 4);
var __ZNSt13runtime_errorD2Ev = Module['__ZNSt13runtime_errorD2Ev'] = createExportWrapper('_ZNSt13runtime_errorD2Ev', 1);
var ___cxa_bad_cast = Module['___cxa_bad_cast'] = createExportWrapper('__cxa_bad_cast', 0);
var ___cxa_bad_typeid = Module['___cxa_bad_typeid'] = createExportWrapper('__cxa_bad_typeid', 0);
var ___cxa_throw_bad_array_new_length = Module['___cxa_throw_bad_array_new_length'] = createExportWrapper('__cxa_throw_bad_array_new_length', 0);
var __ZSt14set_unexpectedPFvvE = Module['__ZSt14set_unexpectedPFvvE'] = createExportWrapper('_ZSt14set_unexpectedPFvvE', 1);
var __ZSt13set_terminatePFvvE = Module['__ZSt13set_terminatePFvvE'] = createExportWrapper('_ZSt13set_terminatePFvvE', 1);
var __ZSt15set_new_handlerPFvvE = Module['__ZSt15set_new_handlerPFvvE'] = createExportWrapper('_ZSt15set_new_handlerPFvvE', 1);
var ___cxa_demangle = createExportWrapper('__cxa_demangle', 4);
var ___cxa_guard_acquire = Module['___cxa_guard_acquire'] = createExportWrapper('__cxa_guard_acquire', 1);
var ___cxa_guard_release = Module['___cxa_guard_release'] = createExportWrapper('__cxa_guard_release', 1);
var ___cxa_guard_abort = Module['___cxa_guard_abort'] = createExportWrapper('__cxa_guard_abort', 1);
var __ZSt14get_unexpectedv = Module['__ZSt14get_unexpectedv'] = createExportWrapper('_ZSt14get_unexpectedv', 0);
var __ZSt10unexpectedv = Module['__ZSt10unexpectedv'] = createExportWrapper('_ZSt10unexpectedv', 0);
var __ZSt13get_terminatev = Module['__ZSt13get_terminatev'] = createExportWrapper('_ZSt13get_terminatev', 0);
var ___cxa_uncaught_exception = Module['___cxa_uncaught_exception'] = createExportWrapper('__cxa_uncaught_exception', 0);
var ___cxa_free_exception = Module['___cxa_free_exception'] = createExportWrapper('__cxa_free_exception', 1);
var ___cxa_init_primary_exception = Module['___cxa_init_primary_exception'] = createExportWrapper('__cxa_init_primary_exception', 3);
var ___cxa_thread_atexit = Module['___cxa_thread_atexit'] = createExportWrapper('__cxa_thread_atexit', 3);
var ___cxa_deleted_virtual = Module['___cxa_deleted_virtual'] = createExportWrapper('__cxa_deleted_virtual', 0);
var __ZNSt9type_infoD2Ev = Module['__ZNSt9type_infoD2Ev'] = createExportWrapper('_ZNSt9type_infoD2Ev', 1);
var ___cxa_can_catch = createExportWrapper('__cxa_can_catch', 3);
var ___cxa_get_exception_ptr = createExportWrapper('__cxa_get_exception_ptr', 1);
var __ZNSt9exceptionD0Ev = Module['__ZNSt9exceptionD0Ev'] = createExportWrapper('_ZNSt9exceptionD0Ev', 1);
var __ZNSt9exceptionD1Ev = Module['__ZNSt9exceptionD1Ev'] = createExportWrapper('_ZNSt9exceptionD1Ev', 1);
var __ZNKSt9exception4whatEv = Module['__ZNKSt9exception4whatEv'] = createExportWrapper('_ZNKSt9exception4whatEv', 1);
var __ZNSt13bad_exceptionD0Ev = Module['__ZNSt13bad_exceptionD0Ev'] = createExportWrapper('_ZNSt13bad_exceptionD0Ev', 1);
var __ZNSt13bad_exceptionD1Ev = Module['__ZNSt13bad_exceptionD1Ev'] = createExportWrapper('_ZNSt13bad_exceptionD1Ev', 1);
var __ZNKSt13bad_exception4whatEv = Module['__ZNKSt13bad_exception4whatEv'] = createExportWrapper('_ZNKSt13bad_exception4whatEv', 1);
var __ZNSt9bad_allocC2Ev = Module['__ZNSt9bad_allocC2Ev'] = createExportWrapper('_ZNSt9bad_allocC2Ev', 1);
var __ZNSt9bad_allocD0Ev = Module['__ZNSt9bad_allocD0Ev'] = createExportWrapper('_ZNSt9bad_allocD0Ev', 1);
var __ZNSt9bad_allocD1Ev = Module['__ZNSt9bad_allocD1Ev'] = createExportWrapper('_ZNSt9bad_allocD1Ev', 1);
var __ZNKSt9bad_alloc4whatEv = Module['__ZNKSt9bad_alloc4whatEv'] = createExportWrapper('_ZNKSt9bad_alloc4whatEv', 1);
var __ZNSt20bad_array_new_lengthC2Ev = Module['__ZNSt20bad_array_new_lengthC2Ev'] = createExportWrapper('_ZNSt20bad_array_new_lengthC2Ev', 1);
var __ZNSt20bad_array_new_lengthD0Ev = Module['__ZNSt20bad_array_new_lengthD0Ev'] = createExportWrapper('_ZNSt20bad_array_new_lengthD0Ev', 1);
var __ZNKSt20bad_array_new_length4whatEv = Module['__ZNKSt20bad_array_new_length4whatEv'] = createExportWrapper('_ZNKSt20bad_array_new_length4whatEv', 1);
var __ZNSt13bad_exceptionD2Ev = Module['__ZNSt13bad_exceptionD2Ev'] = createExportWrapper('_ZNSt13bad_exceptionD2Ev', 1);
var __ZNSt9bad_allocC1Ev = Module['__ZNSt9bad_allocC1Ev'] = createExportWrapper('_ZNSt9bad_allocC1Ev', 1);
var __ZNSt9bad_allocD2Ev = Module['__ZNSt9bad_allocD2Ev'] = createExportWrapper('_ZNSt9bad_allocD2Ev', 1);
var __ZNSt20bad_array_new_lengthD2Ev = Module['__ZNSt20bad_array_new_lengthD2Ev'] = createExportWrapper('_ZNSt20bad_array_new_lengthD2Ev', 1);
var __ZNSt11logic_errorD0Ev = Module['__ZNSt11logic_errorD0Ev'] = createExportWrapper('_ZNSt11logic_errorD0Ev', 1);
var __ZNSt11logic_errorD1Ev = Module['__ZNSt11logic_errorD1Ev'] = createExportWrapper('_ZNSt11logic_errorD1Ev', 1);
var __ZNSt13runtime_errorD0Ev = Module['__ZNSt13runtime_errorD0Ev'] = createExportWrapper('_ZNSt13runtime_errorD0Ev', 1);
var __ZNSt13runtime_errorD1Ev = Module['__ZNSt13runtime_errorD1Ev'] = createExportWrapper('_ZNSt13runtime_errorD1Ev', 1);
var __ZNSt12domain_errorD0Ev = Module['__ZNSt12domain_errorD0Ev'] = createExportWrapper('_ZNSt12domain_errorD0Ev', 1);
var __ZNSt12domain_errorD1Ev = Module['__ZNSt12domain_errorD1Ev'] = createExportWrapper('_ZNSt12domain_errorD1Ev', 1);
var __ZNSt16invalid_argumentD0Ev = Module['__ZNSt16invalid_argumentD0Ev'] = createExportWrapper('_ZNSt16invalid_argumentD0Ev', 1);
var __ZNSt16invalid_argumentD1Ev = Module['__ZNSt16invalid_argumentD1Ev'] = createExportWrapper('_ZNSt16invalid_argumentD1Ev', 1);
var __ZNSt12length_errorD0Ev = Module['__ZNSt12length_errorD0Ev'] = createExportWrapper('_ZNSt12length_errorD0Ev', 1);
var __ZNSt12out_of_rangeD0Ev = Module['__ZNSt12out_of_rangeD0Ev'] = createExportWrapper('_ZNSt12out_of_rangeD0Ev', 1);
var __ZNSt12out_of_rangeD1Ev = Module['__ZNSt12out_of_rangeD1Ev'] = createExportWrapper('_ZNSt12out_of_rangeD1Ev', 1);
var __ZNSt11range_errorD0Ev = Module['__ZNSt11range_errorD0Ev'] = createExportWrapper('_ZNSt11range_errorD0Ev', 1);
var __ZNSt11range_errorD1Ev = Module['__ZNSt11range_errorD1Ev'] = createExportWrapper('_ZNSt11range_errorD1Ev', 1);
var __ZNSt14overflow_errorD0Ev = Module['__ZNSt14overflow_errorD0Ev'] = createExportWrapper('_ZNSt14overflow_errorD0Ev', 1);
var __ZNSt14overflow_errorD1Ev = Module['__ZNSt14overflow_errorD1Ev'] = createExportWrapper('_ZNSt14overflow_errorD1Ev', 1);
var __ZNSt15underflow_errorD0Ev = Module['__ZNSt15underflow_errorD0Ev'] = createExportWrapper('_ZNSt15underflow_errorD0Ev', 1);
var __ZNSt15underflow_errorD1Ev = Module['__ZNSt15underflow_errorD1Ev'] = createExportWrapper('_ZNSt15underflow_errorD1Ev', 1);
var __ZNSt12domain_errorD2Ev = Module['__ZNSt12domain_errorD2Ev'] = createExportWrapper('_ZNSt12domain_errorD2Ev', 1);
var __ZNSt16invalid_argumentD2Ev = Module['__ZNSt16invalid_argumentD2Ev'] = createExportWrapper('_ZNSt16invalid_argumentD2Ev', 1);
var __ZNSt12length_errorD2Ev = Module['__ZNSt12length_errorD2Ev'] = createExportWrapper('_ZNSt12length_errorD2Ev', 1);
var __ZNSt12out_of_rangeD2Ev = Module['__ZNSt12out_of_rangeD2Ev'] = createExportWrapper('_ZNSt12out_of_rangeD2Ev', 1);
var __ZNSt11range_errorD2Ev = Module['__ZNSt11range_errorD2Ev'] = createExportWrapper('_ZNSt11range_errorD2Ev', 1);
var __ZNSt14overflow_errorD2Ev = Module['__ZNSt14overflow_errorD2Ev'] = createExportWrapper('_ZNSt14overflow_errorD2Ev', 1);
var __ZNSt15underflow_errorD2Ev = Module['__ZNSt15underflow_errorD2Ev'] = createExportWrapper('_ZNSt15underflow_errorD2Ev', 1);
var __ZNSt9type_infoD0Ev = Module['__ZNSt9type_infoD0Ev'] = createExportWrapper('_ZNSt9type_infoD0Ev', 1);
var __ZNSt9type_infoD1Ev = Module['__ZNSt9type_infoD1Ev'] = createExportWrapper('_ZNSt9type_infoD1Ev', 1);
var __ZNSt8bad_castC2Ev = Module['__ZNSt8bad_castC2Ev'] = createExportWrapper('_ZNSt8bad_castC2Ev', 1);
var __ZNSt8bad_castD0Ev = Module['__ZNSt8bad_castD0Ev'] = createExportWrapper('_ZNSt8bad_castD0Ev', 1);
var __ZNSt8bad_castD1Ev = Module['__ZNSt8bad_castD1Ev'] = createExportWrapper('_ZNSt8bad_castD1Ev', 1);
var __ZNKSt8bad_cast4whatEv = Module['__ZNKSt8bad_cast4whatEv'] = createExportWrapper('_ZNKSt8bad_cast4whatEv', 1);
var __ZNSt10bad_typeidC2Ev = Module['__ZNSt10bad_typeidC2Ev'] = createExportWrapper('_ZNSt10bad_typeidC2Ev', 1);
var __ZNSt10bad_typeidD2Ev = Module['__ZNSt10bad_typeidD2Ev'] = createExportWrapper('_ZNSt10bad_typeidD2Ev', 1);
var __ZNSt10bad_typeidD0Ev = Module['__ZNSt10bad_typeidD0Ev'] = createExportWrapper('_ZNSt10bad_typeidD0Ev', 1);
var __ZNSt10bad_typeidD1Ev = Module['__ZNSt10bad_typeidD1Ev'] = createExportWrapper('_ZNSt10bad_typeidD1Ev', 1);
var __ZNKSt10bad_typeid4whatEv = Module['__ZNKSt10bad_typeid4whatEv'] = createExportWrapper('_ZNKSt10bad_typeid4whatEv', 1);
var __ZNSt8bad_castC1Ev = Module['__ZNSt8bad_castC1Ev'] = createExportWrapper('_ZNSt8bad_castC1Ev', 1);
var __ZNSt10bad_typeidC1Ev = Module['__ZNSt10bad_typeidC1Ev'] = createExportWrapper('_ZNSt10bad_typeidC1Ev', 1);
var dynCall_ji = Module['dynCall_ji'] = createExportWrapper('dynCall_ji', 2);
var dynCall_jiji = Module['dynCall_jiji'] = createExportWrapper('dynCall_jiji', 5);
var dynCall_iiji = Module['dynCall_iiji'] = createExportWrapper('dynCall_iiji', 5);
var dynCall_viijii = Module['dynCall_viijii'] = createExportWrapper('dynCall_viijii', 7);
var dynCall_iiiiij = Module['dynCall_iiiiij'] = createExportWrapper('dynCall_iiiiij', 7);
var dynCall_iiiiijj = Module['dynCall_iiiiijj'] = createExportWrapper('dynCall_iiiiijj', 9);
var dynCall_iiiiiijj = Module['dynCall_iiiiiijj'] = createExportWrapper('dynCall_iiiiiijj', 10);
var _square = Module['_square'] = 660368;
var _projectiles = Module['_projectiles'] = 660412;
var _enemies = Module['_enemies'] = 660424;
var _enemyProjectiles = Module['_enemyProjectiles'] = 660436;
var _bossProjectiles = Module['_bossProjectiles'] = 660448;
var _boss = Module['_boss'] = 660480;
var _music = Module['_music'] = 660316;
var _isMusicMuted = Module['_isMusicMuted'] = 660476;
var _playerHitMusic = Module['_playerHitMusic'] = 660328;
var _renderer = Module['_renderer'] = 660276;
var _subfont = Module['_subfont'] = 660400;
var _font = Module['_font'] = 660404;
var _phase = Module['_phase'] = 643712;
var _currentState = Module['_currentState'] = 660396;
var _firingBulletMusic = Module['_firingBulletMusic'] = 660332;
var _score = Module['_score'] = 660460;
var _currentWave = Module['_currentWave'] = 660464;
var _techMusic = Module['_techMusic'] = 660320;
var _galaxyTexture = Module['_galaxyTexture'] = 660284;
var _titleSpeed = Module['_titleSpeed'] = 643724;
var _titleTime = Module['_titleTime'] = 660472;
var _titleAmplitude = Module['_titleAmplitude'] = 643728;
var _titleY = Module['_titleY'] = 660468;
var _bigfont = Module['_bigfont'] = 660408;
var _textTexture = Module['_textTexture'] = 660288;
var _moreTexture = Module['_moreTexture'] = 660292;
var _enemyHitMusic = Module['_enemyHitMusic'] = 660324;
var _scrollSpeed = Module['_scrollSpeed'] = 643732;
var _scrollPosition1 = Module['_scrollPosition1'] = 660516;
var _scrollPosition2 = Module['_scrollPosition2'] = 643736;
var _backgroundTexture = Module['_backgroundTexture'] = 660280;
var _playerTexture = Module['_playerTexture'] = 660296;
var _bulletTexture2 = Module['_bulletTexture2'] = 660304;
var _bulletTexture = Module['_bulletTexture'] = 660300;
var _enemyTexture = Module['_enemyTexture'] = 660308;
var _heart = Module['_heart'] = 660340;
var _heartVisible = Module['_heartVisible'] = 660356;
var _heartSpawnTime = Module['_heartSpawnTime'] = 660360;
var _bossTexture = Module['_bossTexture'] = 660312;
var _heartCollected = Module['_heartCollected'] = 660364;
var _heartDuration = Module['_heartDuration'] = 643716;
var _heartTexture = Module['_heartTexture'] = 660336;
var _window = Module['_window'] = 660272;
var __ZTISt12length_error = Module['__ZTISt12length_error'] = 643320;
var __ZTVSt12length_error = Module['__ZTVSt12length_error'] = 643280;
var __ZTISt20bad_array_new_length = Module['__ZTISt20bad_array_new_length'] = 643092;
var _playerHealth = Module['_playerHealth'] = 643720;
var __ZTVN10__cxxabiv120__si_class_type_infoE = Module['__ZTVN10__cxxabiv120__si_class_type_infoE'] = 642632;
var __ZTISt8bad_cast = Module['__ZTISt8bad_cast'] = 643660;
var __ZTVN10__cxxabiv117__class_type_infoE = Module['__ZTVN10__cxxabiv117__class_type_infoE'] = 642592;
var __ZTISt9exception = Module['__ZTISt9exception'] = 642976;
var __ZTISt11logic_error = Module['__ZTISt11logic_error'] = 643200;
var __ZTVN10__cxxabiv121__vmi_class_type_infoE = Module['__ZTVN10__cxxabiv121__vmi_class_type_infoE'] = 642724;
var __ZTISt13runtime_error = Module['__ZTISt13runtime_error'] = 643440;
var __ZTVSt11logic_error = Module['__ZTVSt11logic_error'] = 643104;
var __ZTVSt9exception = Module['__ZTVSt9exception'] = 642940;
var __ZTVSt13runtime_error = Module['__ZTVSt13runtime_error'] = 643124;
var ___cxa_unexpected_handler = Module['___cxa_unexpected_handler'] = 651216;
var ___cxa_terminate_handler = Module['___cxa_terminate_handler'] = 651212;
var ___cxa_new_handler = Module['___cxa_new_handler'] = 686732;
var __ZTIN10__cxxabiv116__shim_type_infoE = Module['__ZTIN10__cxxabiv116__shim_type_infoE'] = 640704;
var __ZTIN10__cxxabiv117__class_type_infoE = Module['__ZTIN10__cxxabiv117__class_type_infoE'] = 640752;
var __ZTIN10__cxxabiv117__pbase_type_infoE = Module['__ZTIN10__cxxabiv117__pbase_type_infoE'] = 640800;
var __ZTIDn = Module['__ZTIDn'] = 641148;
var __ZTIN10__cxxabiv119__pointer_type_infoE = Module['__ZTIN10__cxxabiv119__pointer_type_infoE'] = 640848;
var __ZTIv = Module['__ZTIv'] = 641096;
var __ZTIN10__cxxabiv120__function_type_infoE = Module['__ZTIN10__cxxabiv120__function_type_infoE'] = 640900;
var __ZTIN10__cxxabiv129__pointer_to_member_type_infoE = Module['__ZTIN10__cxxabiv129__pointer_to_member_type_infoE'] = 640960;
var __ZTISt9type_info = Module['__ZTISt9type_info'] = 643640;
var __ZTSN10__cxxabiv116__shim_type_infoE = Module['__ZTSN10__cxxabiv116__shim_type_infoE'] = 640668;
var __ZTSN10__cxxabiv117__class_type_infoE = Module['__ZTSN10__cxxabiv117__class_type_infoE'] = 640716;
var __ZTSN10__cxxabiv117__pbase_type_infoE = Module['__ZTSN10__cxxabiv117__pbase_type_infoE'] = 640764;
var __ZTSN10__cxxabiv119__pointer_type_infoE = Module['__ZTSN10__cxxabiv119__pointer_type_infoE'] = 640812;
var __ZTSN10__cxxabiv120__function_type_infoE = Module['__ZTSN10__cxxabiv120__function_type_infoE'] = 640860;
var __ZTSN10__cxxabiv129__pointer_to_member_type_infoE = Module['__ZTSN10__cxxabiv129__pointer_to_member_type_infoE'] = 640912;
var __ZTVN10__cxxabiv116__shim_type_infoE = Module['__ZTVN10__cxxabiv116__shim_type_infoE'] = 640984;
var __ZTVN10__cxxabiv123__fundamental_type_infoE = Module['__ZTVN10__cxxabiv123__fundamental_type_infoE'] = 641012;
var __ZTIN10__cxxabiv123__fundamental_type_infoE = Module['__ZTIN10__cxxabiv123__fundamental_type_infoE'] = 641080;
var __ZTSN10__cxxabiv123__fundamental_type_infoE = Module['__ZTSN10__cxxabiv123__fundamental_type_infoE'] = 641040;
var __ZTSv = Module['__ZTSv'] = 641092;
var __ZTSPv = Module['__ZTSPv'] = 641104;
var __ZTIPv = Module['__ZTIPv'] = 641108;
var __ZTVN10__cxxabiv119__pointer_type_infoE = Module['__ZTVN10__cxxabiv119__pointer_type_infoE'] = 642844;
var __ZTSPKv = Module['__ZTSPKv'] = 641124;
var __ZTIPKv = Module['__ZTIPKv'] = 641128;
var __ZTSDn = Module['__ZTSDn'] = 641144;
var __ZTSPDn = Module['__ZTSPDn'] = 641156;
var __ZTIPDn = Module['__ZTIPDn'] = 641160;
var __ZTSPKDn = Module['__ZTSPKDn'] = 641176;
var __ZTIPKDn = Module['__ZTIPKDn'] = 641184;
var __ZTSb = Module['__ZTSb'] = 641200;
var __ZTIb = Module['__ZTIb'] = 641204;
var __ZTSPb = Module['__ZTSPb'] = 641212;
var __ZTIPb = Module['__ZTIPb'] = 641216;
var __ZTSPKb = Module['__ZTSPKb'] = 641232;
var __ZTIPKb = Module['__ZTIPKb'] = 641236;
var __ZTSw = Module['__ZTSw'] = 641252;
var __ZTIw = Module['__ZTIw'] = 641256;
var __ZTSPw = Module['__ZTSPw'] = 641264;
var __ZTIPw = Module['__ZTIPw'] = 641268;
var __ZTSPKw = Module['__ZTSPKw'] = 641284;
var __ZTIPKw = Module['__ZTIPKw'] = 641288;
var __ZTSc = Module['__ZTSc'] = 641304;
var __ZTIc = Module['__ZTIc'] = 641308;
var __ZTSPc = Module['__ZTSPc'] = 641316;
var __ZTIPc = Module['__ZTIPc'] = 641320;
var __ZTSPKc = Module['__ZTSPKc'] = 641336;
var __ZTIPKc = Module['__ZTIPKc'] = 641340;
var __ZTSh = Module['__ZTSh'] = 641356;
var __ZTIh = Module['__ZTIh'] = 641360;
var __ZTSPh = Module['__ZTSPh'] = 641368;
var __ZTIPh = Module['__ZTIPh'] = 641372;
var __ZTSPKh = Module['__ZTSPKh'] = 641388;
var __ZTIPKh = Module['__ZTIPKh'] = 641392;
var __ZTSa = Module['__ZTSa'] = 641408;
var __ZTIa = Module['__ZTIa'] = 641412;
var __ZTSPa = Module['__ZTSPa'] = 641420;
var __ZTIPa = Module['__ZTIPa'] = 641424;
var __ZTSPKa = Module['__ZTSPKa'] = 641440;
var __ZTIPKa = Module['__ZTIPKa'] = 641444;
var __ZTSs = Module['__ZTSs'] = 641460;
var __ZTIs = Module['__ZTIs'] = 641464;
var __ZTSPs = Module['__ZTSPs'] = 641472;
var __ZTIPs = Module['__ZTIPs'] = 641476;
var __ZTSPKs = Module['__ZTSPKs'] = 641492;
var __ZTIPKs = Module['__ZTIPKs'] = 641496;
var __ZTSt = Module['__ZTSt'] = 641512;
var __ZTIt = Module['__ZTIt'] = 641516;
var __ZTSPt = Module['__ZTSPt'] = 641524;
var __ZTIPt = Module['__ZTIPt'] = 641528;
var __ZTSPKt = Module['__ZTSPKt'] = 641544;
var __ZTIPKt = Module['__ZTIPKt'] = 641548;
var __ZTSi = Module['__ZTSi'] = 641564;
var __ZTIi = Module['__ZTIi'] = 641568;
var __ZTSPi = Module['__ZTSPi'] = 641576;
var __ZTIPi = Module['__ZTIPi'] = 641580;
var __ZTSPKi = Module['__ZTSPKi'] = 641596;
var __ZTIPKi = Module['__ZTIPKi'] = 641600;
var __ZTSj = Module['__ZTSj'] = 641616;
var __ZTIj = Module['__ZTIj'] = 641620;
var __ZTSPj = Module['__ZTSPj'] = 641628;
var __ZTIPj = Module['__ZTIPj'] = 641632;
var __ZTSPKj = Module['__ZTSPKj'] = 641648;
var __ZTIPKj = Module['__ZTIPKj'] = 641652;
var __ZTSl = Module['__ZTSl'] = 641668;
var __ZTIl = Module['__ZTIl'] = 641672;
var __ZTSPl = Module['__ZTSPl'] = 641680;
var __ZTIPl = Module['__ZTIPl'] = 641684;
var __ZTSPKl = Module['__ZTSPKl'] = 641700;
var __ZTIPKl = Module['__ZTIPKl'] = 641704;
var __ZTSm = Module['__ZTSm'] = 641720;
var __ZTIm = Module['__ZTIm'] = 641724;
var __ZTSPm = Module['__ZTSPm'] = 641732;
var __ZTIPm = Module['__ZTIPm'] = 641736;
var __ZTSPKm = Module['__ZTSPKm'] = 641752;
var __ZTIPKm = Module['__ZTIPKm'] = 641756;
var __ZTSx = Module['__ZTSx'] = 641772;
var __ZTIx = Module['__ZTIx'] = 641776;
var __ZTSPx = Module['__ZTSPx'] = 641784;
var __ZTIPx = Module['__ZTIPx'] = 641788;
var __ZTSPKx = Module['__ZTSPKx'] = 641804;
var __ZTIPKx = Module['__ZTIPKx'] = 641808;
var __ZTSy = Module['__ZTSy'] = 641824;
var __ZTIy = Module['__ZTIy'] = 641828;
var __ZTSPy = Module['__ZTSPy'] = 641836;
var __ZTIPy = Module['__ZTIPy'] = 641840;
var __ZTSPKy = Module['__ZTSPKy'] = 641856;
var __ZTIPKy = Module['__ZTIPKy'] = 641860;
var __ZTSn = Module['__ZTSn'] = 641876;
var __ZTIn = Module['__ZTIn'] = 641880;
var __ZTSPn = Module['__ZTSPn'] = 641888;
var __ZTIPn = Module['__ZTIPn'] = 641892;
var __ZTSPKn = Module['__ZTSPKn'] = 641908;
var __ZTIPKn = Module['__ZTIPKn'] = 641912;
var __ZTSo = Module['__ZTSo'] = 641928;
var __ZTIo = Module['__ZTIo'] = 641932;
var __ZTSPo = Module['__ZTSPo'] = 641940;
var __ZTIPo = Module['__ZTIPo'] = 641944;
var __ZTSPKo = Module['__ZTSPKo'] = 641960;
var __ZTIPKo = Module['__ZTIPKo'] = 641964;
var __ZTSDh = Module['__ZTSDh'] = 641980;
var __ZTIDh = Module['__ZTIDh'] = 641984;
var __ZTSPDh = Module['__ZTSPDh'] = 641992;
var __ZTIPDh = Module['__ZTIPDh'] = 641996;
var __ZTSPKDh = Module['__ZTSPKDh'] = 642012;
var __ZTIPKDh = Module['__ZTIPKDh'] = 642020;
var __ZTSf = Module['__ZTSf'] = 642036;
var __ZTIf = Module['__ZTIf'] = 642040;
var __ZTSPf = Module['__ZTSPf'] = 642048;
var __ZTIPf = Module['__ZTIPf'] = 642052;
var __ZTSPKf = Module['__ZTSPKf'] = 642068;
var __ZTIPKf = Module['__ZTIPKf'] = 642072;
var __ZTSd = Module['__ZTSd'] = 642088;
var __ZTId = Module['__ZTId'] = 642092;
var __ZTSPd = Module['__ZTSPd'] = 642100;
var __ZTIPd = Module['__ZTIPd'] = 642104;
var __ZTSPKd = Module['__ZTSPKd'] = 642120;
var __ZTIPKd = Module['__ZTIPKd'] = 642124;
var __ZTSe = Module['__ZTSe'] = 642140;
var __ZTIe = Module['__ZTIe'] = 642144;
var __ZTSPe = Module['__ZTSPe'] = 642152;
var __ZTIPe = Module['__ZTIPe'] = 642156;
var __ZTSPKe = Module['__ZTSPKe'] = 642172;
var __ZTIPKe = Module['__ZTIPKe'] = 642176;
var __ZTSg = Module['__ZTSg'] = 642192;
var __ZTIg = Module['__ZTIg'] = 642196;
var __ZTSPg = Module['__ZTSPg'] = 642204;
var __ZTIPg = Module['__ZTIPg'] = 642208;
var __ZTSPKg = Module['__ZTSPKg'] = 642224;
var __ZTIPKg = Module['__ZTIPKg'] = 642228;
var __ZTSDu = Module['__ZTSDu'] = 642244;
var __ZTIDu = Module['__ZTIDu'] = 642248;
var __ZTSPDu = Module['__ZTSPDu'] = 642256;
var __ZTIPDu = Module['__ZTIPDu'] = 642260;
var __ZTSPKDu = Module['__ZTSPKDu'] = 642276;
var __ZTIPKDu = Module['__ZTIPKDu'] = 642284;
var __ZTSDs = Module['__ZTSDs'] = 642300;
var __ZTIDs = Module['__ZTIDs'] = 642304;
var __ZTSPDs = Module['__ZTSPDs'] = 642312;
var __ZTIPDs = Module['__ZTIPDs'] = 642316;
var __ZTSPKDs = Module['__ZTSPKDs'] = 642332;
var __ZTIPKDs = Module['__ZTIPKDs'] = 642340;
var __ZTSDi = Module['__ZTSDi'] = 642356;
var __ZTIDi = Module['__ZTIDi'] = 642360;
var __ZTSPDi = Module['__ZTSPDi'] = 642368;
var __ZTIPDi = Module['__ZTIPDi'] = 642372;
var __ZTSPKDi = Module['__ZTSPKDi'] = 642388;
var __ZTIPKDi = Module['__ZTIPKDi'] = 642396;
var __ZTVN10__cxxabiv117__array_type_infoE = Module['__ZTVN10__cxxabiv117__array_type_infoE'] = 642412;
var __ZTIN10__cxxabiv117__array_type_infoE = Module['__ZTIN10__cxxabiv117__array_type_infoE'] = 642476;
var __ZTSN10__cxxabiv117__array_type_infoE = Module['__ZTSN10__cxxabiv117__array_type_infoE'] = 642440;
var __ZTVN10__cxxabiv120__function_type_infoE = Module['__ZTVN10__cxxabiv120__function_type_infoE'] = 642488;
var __ZTVN10__cxxabiv116__enum_type_infoE = Module['__ZTVN10__cxxabiv116__enum_type_infoE'] = 642516;
var __ZTIN10__cxxabiv116__enum_type_infoE = Module['__ZTIN10__cxxabiv116__enum_type_infoE'] = 642580;
var __ZTSN10__cxxabiv116__enum_type_infoE = Module['__ZTSN10__cxxabiv116__enum_type_infoE'] = 642544;
var __ZTIN10__cxxabiv120__si_class_type_infoE = Module['__ZTIN10__cxxabiv120__si_class_type_infoE'] = 642712;
var __ZTSN10__cxxabiv120__si_class_type_infoE = Module['__ZTSN10__cxxabiv120__si_class_type_infoE'] = 642672;
var __ZTIN10__cxxabiv121__vmi_class_type_infoE = Module['__ZTIN10__cxxabiv121__vmi_class_type_infoE'] = 642804;
var __ZTSN10__cxxabiv121__vmi_class_type_infoE = Module['__ZTSN10__cxxabiv121__vmi_class_type_infoE'] = 642764;
var __ZTVN10__cxxabiv117__pbase_type_infoE = Module['__ZTVN10__cxxabiv117__pbase_type_infoE'] = 642816;
var __ZTVN10__cxxabiv129__pointer_to_member_type_infoE = Module['__ZTVN10__cxxabiv129__pointer_to_member_type_infoE'] = 642872;
var __ZTVSt9bad_alloc = Module['__ZTVSt9bad_alloc'] = 642900;
var __ZTVSt20bad_array_new_length = Module['__ZTVSt20bad_array_new_length'] = 642920;
var __ZTISt9bad_alloc = Module['__ZTISt9bad_alloc'] = 643052;
var __ZTSSt9exception = Module['__ZTSSt9exception'] = 642960;
var __ZTVSt13bad_exception = Module['__ZTVSt13bad_exception'] = 642984;
var __ZTISt13bad_exception = Module['__ZTISt13bad_exception'] = 643024;
var __ZTSSt13bad_exception = Module['__ZTSSt13bad_exception'] = 643004;
var __ZTSSt9bad_alloc = Module['__ZTSSt9bad_alloc'] = 643036;
var __ZTSSt20bad_array_new_length = Module['__ZTSSt20bad_array_new_length'] = 643064;
var __ZTVSt12domain_error = Module['__ZTVSt12domain_error'] = 643144;
var __ZTISt12domain_error = Module['__ZTISt12domain_error'] = 643212;
var __ZTSSt12domain_error = Module['__ZTSSt12domain_error'] = 643164;
var __ZTSSt11logic_error = Module['__ZTSSt11logic_error'] = 643181;
var __ZTVSt16invalid_argument = Module['__ZTVSt16invalid_argument'] = 643224;
var __ZTISt16invalid_argument = Module['__ZTISt16invalid_argument'] = 643268;
var __ZTSSt16invalid_argument = Module['__ZTSSt16invalid_argument'] = 643244;
var __ZTSSt12length_error = Module['__ZTSSt12length_error'] = 643300;
var __ZTVSt12out_of_range = Module['__ZTVSt12out_of_range'] = 643332;
var __ZTISt12out_of_range = Module['__ZTISt12out_of_range'] = 643372;
var __ZTSSt12out_of_range = Module['__ZTSSt12out_of_range'] = 643352;
var __ZTVSt11range_error = Module['__ZTVSt11range_error'] = 643384;
var __ZTISt11range_error = Module['__ZTISt11range_error'] = 643452;
var __ZTSSt11range_error = Module['__ZTSSt11range_error'] = 643404;
var __ZTSSt13runtime_error = Module['__ZTSSt13runtime_error'] = 643420;
var __ZTVSt14overflow_error = Module['__ZTVSt14overflow_error'] = 643464;
var __ZTISt14overflow_error = Module['__ZTISt14overflow_error'] = 643504;
var __ZTSSt14overflow_error = Module['__ZTSSt14overflow_error'] = 643484;
var __ZTVSt15underflow_error = Module['__ZTVSt15underflow_error'] = 643516;
var __ZTISt15underflow_error = Module['__ZTISt15underflow_error'] = 643556;
var __ZTSSt15underflow_error = Module['__ZTSSt15underflow_error'] = 643536;
var __ZTVSt8bad_cast = Module['__ZTVSt8bad_cast'] = 643568;
var __ZTVSt10bad_typeid = Module['__ZTVSt10bad_typeid'] = 643588;
var __ZTISt10bad_typeid = Module['__ZTISt10bad_typeid'] = 643688;
var __ZTVSt9type_info = Module['__ZTVSt9type_info'] = 643608;
var __ZTSSt9type_info = Module['__ZTSSt9type_info'] = 643624;
var __ZTSSt8bad_cast = Module['__ZTSSt8bad_cast'] = 643648;
var __ZTSSt10bad_typeid = Module['__ZTSSt10bad_typeid'] = 643672;
function invoke_ii(index,a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vi(index,a1) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iii(index,a1,a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_i(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_v(index) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)();
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ji(index,a1) {
  var sp = stackSave();
  try {
    return dynCall_ji(index,a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jiji(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return dynCall_jiji(index,a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

Module['addRunDependency'] = addRunDependency;
Module['removeRunDependency'] = removeRunDependency;
Module['ccall'] = ccall;
Module['cwrap'] = cwrap;
Module['FS_createPreloadedFile'] = FS_createPreloadedFile;
Module['FS_unlink'] = FS_unlink;
Module['FS_createPath'] = FS_createPath;
Module['FS_createDevice'] = FS_createDevice;
Module['FS_createDataFile'] = FS_createDataFile;
Module['FS_createLazyFile'] = FS_createLazyFile;


var calledRun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain(args = []) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  var entryFunction = _main;

  args.unshift(thisProgram);

  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv;
  args.forEach((arg) => {
    HEAPU32[((argv_ptr)>>2)] = stringToUTF8OnStack(arg);
    argv_ptr += 4;
  });
  HEAPU32[((argv_ptr)>>2)] = 0;

  try {

    var ret = entryFunction(argc, argv);

    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  }
  catch (e) {
    return handleException(e);
  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run(args = arguments_) {

  if (runDependencies > 0) {
    return;
  }

    stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    Module['onRuntimeInitialized']?.();

    if (shouldRunNow) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(() => {
      setTimeout(() => Module['setStatus'](''), 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    _fflush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach((name) => {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty?.output?.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;

run();

// end include: postamble.js

