/// <reference path="./atom-keymap.d.ts" />

// The following line only works in TypeScript 1.5
//import { KeymapManager } from "atom-keymap";
// DefinitelyTyped is still using TypeScript 1.4 to run tests
// so until they upgrade we have to do the following instead
import atomKeymap = require('atom-keymap');
var KeymapManager = atomKeymap.KeymapManager;

var manager = new KeymapManager();
manager.add('some/unique/path', {
  '.workspace': {
    'ctrl-x': 'package:do-something',
    'ctrl-y': 'package:do-something-else'
  },
  '.mini.editor': {
    'enter': 'core:confirm'
  }
});

manager.onDidMatchBinding((event: AtomKeymap.ICompleteMatchEvent): void => {
  console.log(event.binding.command);
})

manager.destroy();
