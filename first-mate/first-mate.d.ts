// Type definitions for first-mate v4.1.7
// Project: https://github.com/atom/first-mate/
// Definitions by: Vadim Macagon <https://github.com/enlight/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../event-kit/event-kit.d.ts" />

declare module AtomFirstMate {
  type Disposable = EventKit.Disposable;

  interface IToken {
    value: string;
    scopes: string[];
  }

  /** Instance side of TokenizeLineResult class. */
  interface TokenizeLineResult {
    tokens: IToken[];
  }

  // This is another possible result type for `Grammar.tokenizeLine()`,
  // not to be confused with `TokenizeLineResult`.
  interface ITokenizeLineResult {
    line: string;
    tags: any[];
    ruleStack: Rule[];
  }

  /** Instance side of Rule class. */
  interface Rule {
  }

  /** Static side of Grammar class. */
  interface GrammarStatic {
    prototype: Grammar;
    new (registry: GrammarRegistry, options?: any): Grammar;
  }

  /** Instance side of Grammar class. */
  interface Grammar {
    constructor: GrammarStatic;
    onDidUpdate(callback: Function): Disposable;
    tokenizeLines(text: string): Array<Array<IToken>>;
    tokenizeLine(
      line: string, ruleStack?: Rule[], firstLine?: boolean, compatibilityMode?: boolean
    ): ITokenizeLineResult | TokenizeLineResult;
  }

  /** Grammar that tokenizes lines of text. */
  var Grammar: GrammarStatic;

  /** Static side of GrammarRegistry class. */
  interface GrammarRegistryStatic {
    prototype: GrammarRegistry;
    new (options?: { maxTokensPerLine: number }): GrammarRegistry;
  }

  /** Instance side of GrammarRegistry class. */
  interface GrammarRegistry {
    constructor: GrammarRegistryStatic;

    // Event Subscription

    onDidAddGrammar(callback: (grammar: Grammar) => void): Disposable;
    onDidUpdateGrammar(callback: (grammar: Grammar) => void): Disposable;

    // Managing Grammars

    getGrammars(): Grammar[];
    grammarForScopeName(scopeName: string): Grammar;
    addGrammar(grammar: Grammar): Disposable;
    removeGrammarForScopeName(scopeName: string): Grammar;
    readGrammarSync(grammarPath: string): Grammar;
    readGrammar(grammarPath: string, callback: (error: Error, grammar: Grammar) => void): void;
    loadGrammarSync(grammarPath: string): Grammar;
    loadGrammar(grammarPath: string, callback: (error: Error, grammar: Grammar) => void): void;
    grammarOverrideForPath(filePath: string): Grammar;
    setGrammarOverrideForPath(filePath: string, scopeName: string): Grammar;
    clearGrammarOverrides(): void;
    selectGrammar(filePath: string, fileContents: string): Grammar;
  }

  /** Registry containing one or more grammars. */
  var GrammarRegistry: GrammarRegistryStatic;
}

declare module 'first-mate' {
  export = AtomFirstMate;
}
