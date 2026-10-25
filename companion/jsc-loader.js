// Arcana Helper: load compiled-bytecode modules (.jsc). The released app ships its engine, solver and companion as V8
// bytecode instead of readable source, so the game logic isn't sitting in plain text on the player's PC. This file just
// teaches Node how to run a .jsc; the build that makes them is in release/build-release.js. Written by Timer.
//
// A .jsc is tied to the exact V8 version that made it, so the build compiles them with the same runtime the app runs
// (its Electron). If a .jsc ever can't be loaded (e.g. the app's Electron changed), rebuild with Build-Release.bat.
'use strict';
const vm = require('vm');
const v8 = require('v8');
const Module = require('module');
const fs = require('fs');
const path = require('path');

// The same V8 flag must be set when a .jsc is made and when it's loaded, or V8 rejects the bytecode.
v8.setFlagsFromString('--no-lazy');

const MAGIC = 0x41484243; // "AHBC": Arcana Helper ByteCode

/** Compile a module's source to a .jsc buffer. Used by the build, not at run time. */
function compile(source) {
  const wrapped = Module.wrap(source);
  const script = new vm.Script(wrapped, { produceCachedData: false });
  script.runInThisContext(); // run once so the snapshot holds the whole function, not just its outer shell
  const bytecode = script.createCachedData();
  const head = Buffer.alloc(8);
  head.writeUInt32LE(MAGIC, 0);
  head.writeUInt32LE(source.length, 4); // the original body length, to rebuild a matching placeholder on load
  return Buffer.concat([head, bytecode]);
}

if (!Module._extensions['.jsc']) {
  Module._extensions['.jsc'] = function (mod, filename) {
    const buf = fs.readFileSync(filename);
    if (buf.readUInt32LE(0) !== MAGIC) throw new Error('Not an Arcana Helper .jsc file: ' + path.basename(filename));
    const bodyLen = buf.readUInt32LE(4);
    const cachedData = buf.subarray(8);
    // A placeholder of the same byte length as the original wrapped source; the real code comes from the bytecode.
    const placeholder = Module.wrap(' '.repeat(bodyLen));
    const script = new vm.Script(placeholder, { filename, cachedData });
    if (script.cachedDataRejected) {
      throw new Error('Compiled code for ' + path.basename(filename) + " couldn't be loaded (the app's runtime changed). Rebuild with Build-Release.bat.");
    }
    const fn = script.runInThisContext();
    const req = Module.createRequire(filename);
    fn.call(mod.exports, mod.exports, req, mod, filename, path.dirname(filename));
  };
}

module.exports = { compile, MAGIC };
