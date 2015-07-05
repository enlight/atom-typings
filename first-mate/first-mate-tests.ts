/// <reference path="./first-mate.d.ts" />

// The following line only works in TypeScript 1.5
//import { GrammarRegistry, Grammar } from "first-mate";
// DefinitelyTyped is still using TypeScript 1.4 to run tests
// so until they upgrade we have to do the following instead
import firstMate = require('first-mate');
var GrammarRegistry = firstMate.GrammarRegistry;
var Grammar = firstMate.GrammarRegistry;

var registry = new GrammarRegistry({ maxTokensPerLine: 100 });
var grammar = registry.loadGrammarSync("path/to/grammar");
var tokens = grammar.tokenizeLines("Just another line");
