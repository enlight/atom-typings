// Type definitions for Atom 1.0.1
// Project: https://atom.io/
// Definitions by: vvakame <https://github.com/vvakame/>, Vadim Macagon <https://github.com/enlight/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../q/Q.d.ts" />
/// <reference path="../jquery/jquery.d.ts" />
/// <reference path="../pathwatcher/pathwatcher.d.ts" />
/// <reference path="../text-buffer/text-buffer.d.ts" />
/// <reference path="../event-kit/event-kit.d.ts" />
/// <reference path="../first-mate/first-mate.d.ts" />
/// <reference path="../atom-keymap/atom-keymap.d.ts" />
/// <reference path="../serializable/serializable.d.ts" />
/// <reference path="../github-electron/github-electron.d.ts" />

// POLICY
// 1. This file should only declare types from Atom core,
//    any types from non-core Atom modules should be declared in separate files.
// 2. Decompose classes into instance and static interfaces as this allows users
//    to add extra static and instance members using declaration merging.
// 3. Do not prefix an `I` to the name of instance/static interfaces for decomposed classes.
// 4. Do prefix an `I` to all other interfaces declared in this file.

// The Window interface is already defined in TypeScript's lib.d.ts, so the interface below will
// be merged into the standard one. In Atom this stuff is implemented in window-bootstrap.coffee
// and window.coffee.
interface Window {
	atom: AtomCore.Atom;
	/** Measures how long a function takes to run. */
	measure<T>(description: string, fn: () => T): T;
	/** Creates a dev tools profile for a function. */
	profile<T>(description: string, fn: () => T): T;
}

declare module AtomCore {

	type Point = AtomTextBuffer.Point;
	type Range = AtomTextBuffer.Range;
	type PointOrArray = AtomTextBuffer.PointOrArray;
	type RangeOrArray = AtomTextBuffer.RangeOrArray;
	type TextBuffer = AtomTextBuffer.TextBuffer;
	type Disposable = AtomEventKit.Disposable;
	type Grammar = AtomFirstMate.Grammar;
	type KeymapManager = AtomKeymap.KeymapManager;
	type Directory = PathWatcher.IDirectory;
	type BrowserWindow = GitHubElectron.BrowserWindow;
	type ISerializable = AtomSerializable.ISerializable;
	type IScanIteratorFunc = AtomTextBuffer.IScanIteratorFunc;

	interface Model {
		id: number;

		destroy(): void;
		isAlive(): boolean;
		isDestroyed(): boolean;
	}

	interface CommandRegistry {
		add(target: string, commands: Object): Disposable;
		add(target: string, commandName: string, callback: (e: Event) => void): Disposable;
		findCommands(params: { target: Element }): Array<{name: string; displayName: string}>;
		dispatch(target: string, commandName: string, detail: any): boolean;
	}

	interface IPixelPosition {
		top: number;
		left: number;
	}

	interface IPixelRange {
		start: { top: number; left: number };
		end: { top: number;	left: number };
	}

	interface IPixelRect {
		top: number;
		left: number;
		width: number;
		height: number;
	}

	/**
	 * Interface for DisplayBuffer class in Atom.
	 * Note that much of the functionality provided by DisplayBuffer can be used indirectly via more
	 * public classes such as TextEditor.
	 */
	interface DisplayBuffer extends Model, ISerializable {
		copy(): DisplayBuffer;
		updateAllScreenLines(): void;

		// Event Subscription

		onDidChangeSoftWrapped(callback: (softWrapped: boolean) => void): Disposable;
		// ... many more, add as needed

		// Everything else

		emitChanged(eventProperties: any, refreshMarkers?: boolean): void;
		updateWrappedScreenLines(): void;
		setVisible(visible: boolean): void;
		getVerticalScrollMargin(): number;
		setVerticalScrollMargin(verticalScrollMargin: number): number;
		getHorizontalScrollMargin(): number;
		setHorizontalScrollMargin(horizontalScrollMargin: number): number;
		getHeight(): number;
		setHeight(height: number): number;
		getWidth(): number;
		setWidth(newWidth: number): number;
		getScrollTop(): number;
		setScrollTop(scrollTop: number): number;
		getScrollBottom(): number;
		setScrollBottom(scrollBottom: number): number;
		getScrollLeft(): number;
		setScrollLeft(scrollLeft: number): number;
		getScrollRight(): number;
		setScrollRight(scrollRight: number): number;
		getLineHeightInPixels(): number;
		setLineHeightInPixels(lineHeightInPixels: number): number;
		getDefaultCharWidth(): number;
		setDefaultCharWidth(defaultCharWidth: number): number;
		getScopedCharWidth(scopeNames: string[], char: string): number;
		getScopedCharWidths(scopeNames: string[]): any;
		setScopedCharWidth(scopeNames: string[], char: string, width: number): void;
		clearScopedCharWidths(): any;
		getScrollHeight(): number;
		getScrollWidth(): number;
		getVisibleRowRange(): number[];
		intersectsVisibleRowRange(startRow: number, endRow: number): boolean;
		selectionIntersectsVisibleRowRange(selection: Selection): boolean;
		scrollToScreenRange(screenRange: Range): number;
		scrollToScreenPosition(screenPosition: PointOrArray): number;
		scrollToBufferPosition(bufferPosition: PointOrArray): number;
		pixelRectForScreenRange(screenRange: Range): IPixelRect;
		getTabLength(): number;
		setTabLength(tabLength: number): void;
		setSoftWrap(softWrap: boolean): boolean;
		isSoftWrapped(): boolean;
		setEditorWidthInChars(editorWidthInChars: number): void;
		getEditorWidthInChars(): number;
		getSoftWrapColumn(): number;
		indentLevelForLine(line: string): number;
		bufferRowsForScreenRows(startScreenRow: number, endScreenRow: number): number[];
		createFold(startRow: number, endRow: number): Fold;
		isFoldedAtBufferRow(bufferRow: number): boolean;
		isFoldedAtScreenRow(screenRow: number): boolean;
		destroyFoldWithId(id: number): void;
		unfoldBufferRow(bufferRow: number): void;
		largestFoldStartingAtBufferRow(bufferRow: number): Fold;
		foldsStartingAtBufferRow(bufferRow: number): Fold[];
		largestFoldStartingAtScreenRow(screenRow: number): Fold;
		largestFoldContainingBufferRow(bufferRow: number): Fold;
		outermostFoldsInBufferRowRange(startRow: number, endRow: number): Fold[];
		foldsContainingBufferRow(bufferRow: any): Fold[];
		screenRowForBufferRow(bufferRow: number): number;
		lastScreenRowForBufferRow(bufferRow: number): number;
		bufferRowForScreenRow(screenRow: number): number;
		screenRangeForBufferRange(bufferRange: RangeOrArray): Range;
		bufferRangeForScreenRange(screenRange: RangeOrArray): Range;
		pixelRangeForScreenRange(screenRange: RangeOrArray, clip?: boolean): IPixelRange;
		pixelPositionForScreenPosition(screenPosition: PointOrArray, clip?: boolean): IPixelPosition;
		screenPositionForPixelPosition(pixelPosition: IPixelPosition): Point;
		pixelPositionForBufferPosition(bufferPosition: PointOrArray): IPixelPosition;
		getLineCount(): number;
		getLastRow(): number;
		getMaxLineLength(): number;
		screenPositionForBufferPosition(bufferPosition: PointOrArray, options: any): Point;
		bufferPositionForScreenPosition(screenPosition: PointOrArray, options: any): Point;
		bufferRangeForScopeAtPosition(selector: string, position: PointOrArray): Range;
		tokenForBufferPosition(bufferPosition: PointOrArray): Token;
		getGrammar(): Grammar;
		setGrammar(grammar: Grammar): void;
		reloadGrammar(): void;
		clipScreenPosition(screenPosition: PointOrArray, options: any): Point;
		rangeForAllLines(): Range;
		/** Retrieves a marker by id. */
		getMarker(id: number): Marker;
		getMarkers(): Marker[];
		getMarkerCount(): number;
		/** Creates a new marker at the given screen range. */
		markScreenRange(range: RangeOrArray, ...args: any[]): Marker;
		/** Creates a new marker at the given buffer range. */
		markBufferRange(range: RangeOrArray, options?: any): Marker;
		/** Creates a new marker at the given screen position. */
		markScreenPosition(screenPosition: PointOrArray, options?: any): Marker;
		/** Creates a new marker at the given buffer position. */
		markBufferPosition(bufferPosition: PointOrArray, options?: any): Marker;
		/** Removes a marker with the given id. */
		destroyMarker(id: number): void;
		/** Finds the first marker matching the given parameters. */
		findMarker(params?: any): Marker;
		/** Find all markers matching the given set of parameters. */
		findMarkers(params?: any): Marker[];
		findFoldMarker(attributes: any): Marker;
		findFoldMarkers(attributes: any): Marker[];
		getFoldMarkerAttributes(attributes?: any): any;
		refreshMarkerScreenPositions(): void;
	}

	/** Interface for ViewRegistry class in Atom. */
	interface ViewRegistry {
		addViewProvider(modelConstructor: Function, createView: (model: any) => HTMLElement): Disposable;
		getView(model: any): HTMLElement;
	}

	/** Interface for ScopeDescriptor class in Atom. */
	interface ScopeDescriptor {
		getScopesArray(): string[];
  }

	interface ICursorChangeEvent {
		oldBufferPosition: PointOrArray;
		oldScreenPosition: PointOrArray;
		newBufferPosition: PointOrArray;
		newScreenPosition: PointOrArray;
		textChanged: boolean;
		/** The cursor that triggered the event. */
		cursor: Cursor;
	}

	/** Interface for Cursor class in Atom. */
	interface Cursor extends Model {
		editor: TextEditor;

		onDidChangePosition(callback: (e: ICursorChangeEvent) => void): Disposable;
		onDidDestroy(callback: Function): Disposable;
		onDidChangeVisibility(callback: (visibility: boolean) => void): Disposable;

		setScreenPosition(screenPosition: PointOrArray, options?: { autoscroll?: boolean }): void;
		getScreenPosition(): Point;
		setBufferPosition(bufferPosition: PointOrArray, options?: { autoscroll?: boolean }): void;
		getBufferPosition(): Point;
		getScreenRow(): number;
		getScreenColumn(): number;
		getBufferRow(): number;
		getBufferColumn(): number;
		getCurrentBufferLine(): string;
		isAtBeginningOfLine(): boolean;
		isAtEndOfLine(): boolean;

		getMarker(): Marker;
		isSurroundedByWhitespace(): boolean;
		isBetweenWordAndNonWord(): boolean;
		isInsideWord(): boolean;
		getIndentLevel(): number;
		getScopeDescriptor(): ScopeDescriptor;
		hasPrecedingCharactersOnLine(): boolean;
		isLastCursor(): boolean;

		moveUp(rowCount?: number, options?: { moveToEndOfSelection: boolean }): void;
		moveDown(rowCount?: number, options?: { moveToEndOfSelection: boolean }): void;
		moveLeft(columnCount?: number, options?: { moveToEndOfSelection: boolean }): void;
		moveRight(columnCount?: number, options?:{ moveToEndOfSelection: boolean }): void;
		moveToTop(): void;
		moveToBottom(): void;
		moveToBeginningOfScreenLine(): void;
		moveToBeginningOfLine(): void;
		moveToFirstCharacterOfLine(): void;
		moveToEndOfScreenLine(): void;
		moveToEndOfLine(): void;
		moveToBeginningOfWord(): void;
		moveToEndOfWord(): void;
		moveToBeginningOfNextWord(): void;
		moveToPreviousWordBoundary(): void;
		moveToNextWordBoundary(): void;
		/** Moves the cursor to the beginning of the buffer line, skipping all whitespace. */
		skipLeadingWhitespace(): void;
		moveToBeginningOfNextParagraph(): void;
		moveToBeginningOfPreviousParagraph(): void;

		getPreviousWordBoundaryBufferPosition(options?: { wordRegex: RegExp }): Point;
		getNextWordBoundaryBufferPosition(options?: { wordRegex: RegExp }): Point;
		getBeginningOfCurrentWordBufferPosition(options?: {
			wordRegex?: RegExp;
			includeNonWordCharacters?: boolean;
			allowPrevious: boolean;
		}): Point;
		getEndOfCurrentWordBufferPosition(options?: {
			wordRegex?: RegExp;
			includeNonWordCharacters?: boolean;
		}): Point;
		getBeginningOfNextWordBufferPosition(options?: { wordRegex: RegExp }): Point;
		getCurrentWordBufferRange(options?: { wordRegex: RegExp }): Point;
		getCurrentLineBufferRange(options?: { includeNewline: boolean }): Point;
		getCurrentParagraphBufferRange(): Range;
		getCurrentWordPrefix(): string;

		setVisible(visible: boolean): void;
		isVisible(): boolean;
		updateVisibility(): void;

		/** Compares this cursor's buffer position to another cursor's. */
		compare(other: Cursor): boolean;

		/** Prevents the cursor from causing scrolling. */
		clearAutoscroll(): void;
		/** Deselects the current selection. */
		clearSelection(): void;
		/** Gets the RegExp used by the cursor to determine what is a "word". */
		wordRegExp(options?: { includeNonWordCharacters: boolean }): RegExp;
	}

	interface ISelectionInsertTextOptions {
		select?: boolean;
		autoIndent?: boolean;
		autoIndentNewline?: boolean;
		autoDecreaseIndent?: boolean;
		normalizeLineEndings?: boolean;
		undo?: string;
	}

	/** Represents a selection in the text editor. */
	interface Selection extends Model {
		cursor: Cursor;
		marker: Marker;
		editor: TextEditor;

		onDidChangeRange(callback: (event: ISelectionChangeEvent) => void): Disposable;
		onDidDestroy(callback: Function): Disposable;

		// Managing the selection range

		getScreenRange(): Range;
		setScreenRange(screenRange: RangeOrArray, options?: any): void;
		getBufferRange(): Range;
		setBufferRange(bufferRange: RangeOrArray, options?: {
			preserveFolds?: boolean;
			autoscroll?: boolean;
		}): void;
		getBufferRowRange(): number[];

		// Info about the selection

		isEmpty(): boolean;
		isReversed(): boolean;
		isSingleScreenLine(): boolean;
		getText(): string;
		intersectsBufferRange(bufferRange: RangeOrArray): boolean;
		intersectsWith(otherSelection: Selection, exclusive?: boolean): boolean;

		// Modifying the selected range

		clear(options?: { autoscroll: boolean }): void;
		selectToScreenPosition(position: PointOrArray): void;
		selectToBufferPosition(position: PointOrArray): void;
		selectRight(columnCount?: number): void;
		selectLeft(columnCount?: number): void;
		selectUp(rowCount?: number): void;
		selectDown(rowCount?: number): void;
		selectToTop(): void;
		selectToBottom(): void;
		selectAll(): void;
		selectToBeginningOfLine(): void;
		selectToFirstCharacterOfLine(): void;
		selectToEndOfLine(): void;
		selectToBeginningOfWord(): void;
		selectToEndOfWord(): void;
		selectToBeginningOfNextWord(): void;
		selectToPreviousWordBoundary(): void;
		selectToNextWordBoundary(): void;
		selectToBeginningOfNextParagraph(): void;
		selectToBeginningOfPreviousParagraph(): void;
		selectWord(): Range;
		expandOverWord(): void;
		selectLine(row: number): Range;
		expandOverLine(): void;

		// Modifying the selected text

		insertText(text: string, options?: ISelectionInsertTextOptions): Range;
		backspace(): void;
		deleteToPreviousWordBoundary(): void;
		deleteToNextWordBoundary(): void;
		deleteToBeginningOfWord(): void;
		deleteToBeginningOfLine(): void;
		delete(): void;
		deleteToEndOfLine(): void;
		deleteToEndOfWord(): void;
		deleteSelectedText(): void;
		deleteLine(): void;
		joinLines(): void;
		outdentSelectedRows(): void;
		autoIndentSelectedRows(): void;
		toggleLineComments(): void;
		cutToEndOfLine(maintainClipboard?: boolean): void;
		cut(maintainClipboard?: boolean, fullLine?: boolean): void;
		copy(maintainClipboard?: boolean, fullLine?: boolean): void;
		fold(): void;
		indent(options?: { autoIndent: boolean }): void;
		indentSelectedRows(): void;

		// Managing multiple selections

		addSelectionBelow(): void;
		addSelectionAbove(): void;
		merge(otherSelection: Selection, options?: {
			preserveFolds?: boolean;
			autoscroll?: boolean;
		}): void;

		// Comparing to other selections

		compare(otherSelection: Selection): number;
	}

	interface ISelectionChangeEvent {
		oldBufferRange: Range;
		oldScreenRange: Range;
		newBufferRange: Range;
		newScreenRange: Range;
		/** The selection that triggered the event. */
		selection: Selection;
	}

	interface IDecorationParams {
		type: string;
		class: string;
		onlyHead?: boolean;
		onlyEmpty?: boolean;
		onlyNonEmpty?: boolean;
		position?: string;
		gutterName?: string;
	}

	/** A visual representation of a marker in the text editor. */
	interface Decoration {
		/** Best practice is to destroy the decoration indirectly by destroying the marker. */
		destroy(): void;
		isDestroyed(): boolean;
		onDidChangeProperties(
			callback: (e: { oldProperties: IDecorationParams; newProperties: IDecorationParams }) => void
		): Disposable;
		onDidDestroy(callback: Function): Disposable;
		getId(): number;
		getMarker(): Marker;
		isType(type: string | string[]): boolean;
		getProperties(): IDecorationParams;
		setProperties(newProperties: IDecorationParams);
	}

	interface GutterContainer {
		destroy(): void;
		// all methods below are also currently available in TextEditor
		addGutter(options: {
			name: string;
			priority?: number;
			visible?: boolean;
		}): Gutter;
		getGutters(): Gutter[];
		gutterWithName(name: string): Gutter;
		observeGutters(callback: (gutter: Gutter) => void): Disposable;
		onDidAddGutter(callback: (gutter: Gutter) => void): Disposable;
		onDidRemoveGutter(callback: (name: string) => void): Disposable;
	}

	/** A gutter within a text editor. */
	interface Gutter {
		name: string;
		gutterContainer: GutterContainer;

		destroy(): void;
		hide(): void;
		show(): void;
		isVisible(): boolean;
		decorateMarker(marker: Marker, options?: IDecorationParams): Decoration;
		onDidChangeVisible(callback: (gutter: Gutter) => void): Disposable;
		onDidDestroy(callback: Function): Disposable;
	}

	/** Static side of the TextEditor class. */
	interface TextEditorStatic {
		prototype: TextEditor;
		new (params?: {
			softTabs: boolean;
			initialLine: number;
			initialColumn: number;
			tabLength: number;
			softWrapped: boolean;
			displayBuffer: DisplayBuffer;
			buffer: TextBuffer;
			registerEditor: boolean;
			suppressCursorCreation: boolean;
			mini: boolean;
			placeholderText: string;
			lineNumberGutterVisible: boolean;
			largeFileMode: boolean;
		}): TextEditor;
	}

	/**
	 * Represents all essential editing state for a single text buffer, including cursors,
	 * selections, folds, and soft wraps.
	 */
	interface TextEditor extends Model, ISerializable {
		constructor: TextEditorStatic;

		// Event Subscription

		onDidChangeTitle(callback: Function): Disposable;
		onDidChangePath(callback: Function): Disposable;
		onDidChange(callback: Function): Disposable;
		onDidStopChanging(callback: Function): Disposable;
		onDidChangeCursorPosition(callback: (e: ICursorChangeEvent) => void): Disposable;
		onDidChangeSelectionRange(callback: (e: ISelectionChangeEvent) => void): Disposable;
		onDidChangeSoftWrapped(callback: Function): Disposable;
		onDidChangeEncoding(callback: Function): Disposable;
		observeGrammar(callback: (grammar: Grammar) => void): Disposable;
		onDidChangeGrammar(callback: (grammar: Grammar) => void): Disposable;
		onDidChangeModified(callback: Function): Disposable;
		onDidConflict(callback: Function): Disposable;
		onWillInsertText(callback: (e: { text: string, cancel: Function }) => void): Disposable;
		onDidInsertText(callback: (e: { text: string }) => void): Disposable;
		onDidSave(callback: (e: { path: string }) => void): Disposable;
		onDidDestroy(callback: Function): Disposable;
		observeCursors(callback: (cursor: Cursor) => void): Disposable;
		onDidAddCursor(callback: (cursor: Cursor) => void): Disposable;
		onDidRemoveCursor(callback: (cursor: Cursor) => void): Disposable;
		observeSelections(callback: (selection: Selection) => void): Disposable;
		onDidAddSelection(callback: (selection: Selection) => void): Disposable;
		onDidRemoveSelection(callback: (selection: Selection) => void): Disposable;
		observeDecorations(callback: (decoration: Decoration) => void): Disposable;
		onDidAddDecoration(callback: (decoration: Decoration) => void): Disposable;
		onDidRemoveDecoration(callback: (decoration: Decoration) => void): Disposable;
		onDidChangePlaceholderText(callback: (placeholderText: string) => void): Disposable;
		onDidChangeCharacterWidths(callback: Function): Disposable;
		onDidChangeScrollTop(callback: Function): Disposable;
		onDidChangeScrollLeft(callback: Function): Disposable;
		onDidChangeIcon(callback: Function): Disposable;
		onDidUpdateMarkers(callback: Function): Disposable;

		getBuffer(): TextBuffer;
		getURI(): string;
		/** Creates a new text editor with an initial state based on this one. */
		copy(): TextEditor;
		setVisible(visible: boolean): void;
		setLineNumberGutterVisible(visible: boolean): boolean;
		isLineNumberGutterVisible(): boolean;
		onDidChangeLineNumberGutterVisible(callback: (visible: boolean) => void): Disposable;

		addGutter(options: {
			name: string;
			priority?: number;
			visible?: boolean;
		}): Gutter;
		getGutters(): Gutter[];
		gutterWithName(name: string): Gutter;
		observeGutters(callback: (gutter: Gutter) => void): Disposable;
		onDidAddGutter(callback: (gutter: Gutter) => void): Disposable;
		onDidRemoveGutter(callback: (name: string) => void): Disposable;

		setEditorWidthInChars(editorWidthInChars: number): void;

		// File Details

		getTitle(): string;
		getLongTitle(): string;
		getPath(): string;
		getEncoding(): string;
		setEncoding(encoding: string);
		isModified(): boolean;
		isEmpty(): boolean;
		copyPathToClipboard(): void;

		// File Operations

		save(): void;
		saveAs(filePath: string): void;
		shouldPromptToSave(options?: { windowCloseRequested: boolean }): boolean;
		getSaveDialogOptions(): any;

		// Reading Text

		getText(): string;
		getTextInBufferRange(range: RangeOrArray);
		getLineCount(): number;
		getScreenLineCount(): number;
		getLastBufferRow(): number;
		getLastScreenRow(): number;
		lineTextForBufferRow(bufferRow: number): string;
		lineTextForScreenRow(screenRow: number): string;
		tokenizedLineForScreenRow(screenRow: number): TokenizedLine;
		tokenizedLinesForScreenRows(start: number, end: number): TokenizedLine[];
		bufferRowForScreenRow(screenRow: number): number;
		bufferRowsForScreenRows(startRow, endRow): number[];
		screenRowForBufferRow(bufferRow: number): number;
		getMaxScreenLineLength(): number;
		getLongestScreenRow(): number;
		bufferRangeForBufferRow(row: number, options?: { includeNewline: boolean }): Range;
		getTextInRange(): string;
		isBufferRowBlank(): boolean;
		nextNonBlankBufferRow(): number;
		getEofBufferPosition(): number;
		getCurrentParagraphBufferRange(): Range;

		// Mutating Text

		setText(text: string): void;
		setTextInBufferRange(range: RangeOrArray, text: string, options?: {
			normalizeLineEndings?: boolean;
			skip?: string;
		}): Range;
		/** Replaces each selection with the given text. */
		insertText(text: string, options?: ISelectionInsertTextOptions): Range[] | boolean;
		/** Replaces each selection with a newline. */
		insertNewline(): Range[] | boolean;
		delete(): void;
		backspace(): void;
		mutateSelectedText<T>(fn: (selection: Selection, index: number) => T, groupingInterval: number): T[];
		moveLineUp(): void;
		moveLineDown(): void;
		duplicateLines(): void;
		splitSelectionsIntoLines(): void;
		transpose(): void;
		/** Converts the selected text to upper case. */
		upperCase(): void;
		/** Converts the selected text to lower case. */
		lowerCase(): void;
		toggleLineCommentsInSelection(): void;
		joinLines(): void;
		insertNewlineBelow(): void;
		insertNewlineAbove(): void;
		deleteToBeginningOfWord(): void;
		deleteToPreviousWordBoundary(): void;
		deleteToNextWordBoundary(): void;
		deleteToBeginningOfLine(): void;
		deleteToEndOfLine(): void;
		deleteToEndOfWord(): void;
		deleteLine(): void;

		// History

		undo(): void;
		redo(): void;
		/** Batch multiple operations into a transaction which can be undone/redone in a single step. */
		transact<T>(groupingInterval: number, fn: () => T): T;
		transact<T>(fn: () => T): T;
		abortTransaction(): void;
		createCheckpoint(): number;
		revertToCheckpoint(checkpoint: Object): boolean;
		groupChangesSinceCheckpoint(checkpoint: Object): boolean;

		// Coordinates

		screenPositionForBufferPosition(bufferPosition: PointOrArray, options?: any): Point;
		bufferPositionForScreenPosition(screenPosition: PointOrArray, options?: any): Point;
		screenRangeForBufferRange(bufferRange: PointOrArray): Range;
		bufferRangeForScreenRange(screenRange: PointOrArray): Range;
		clipBufferPosition(bufferPosition: PointOrArray): Point;
		clipBufferRange(range: RangeOrArray): Range;
		clipScreenPosition(screenPosition: PointOrArray, options?: {
			wrapBeyondNewlines: boolean,
			wrapAtSoftNewlines: boolean,
			screenLine: boolean
		}): Point;
		clipScreenRange(range: Range, options?: any): Range;

		// Decorations

		decorateMarker(marker: Marker, decorationParams: IDecorationParams): Decoration;
		decorationsForScreenRowRange(startScreenRow: number, endScreenRow: number): any;
		getDecorations(propertyFilter?: any): Decoration[];
		getLineNumberDecorations(propertyFilter?: any): Decoration[];
		getHighlightDecorations(propertyFilter?: any): Decoration[];
		getOverlayDecorations(propertyFilter?: any): Decoration[];
		decorationForId(id: number): Decoration;
		decorationsForMarkerId(id: number): Decoration[];

		// Markers

		markBufferRange(range: RangeOrArray, options?: any): Marker;
		markScreenRange(range: RangeOrArray, options?: any): Marker;
		markBufferPosition(bufferPosition: PointOrArray, options?: any): Marker;
		markScreenPosition(screenPosition: PointOrArray, options?: any): Marker;
		findMarkers(properties: any): Marker[];
		getMarker(id: number): Marker;
		getMarkers(): Marker[];
		getMarkerCount();
		destroyMarker(id: number): void;

		// Cursors

		getCursorBufferPosition(): Point;
		getCursorBufferPositions(): Point[];
		setCursorBufferPosition(position: PointOrArray, options?: { autoscroll: boolean }): void;
		getCursorAtScreenPosition(position: PointOrArray): Cursor;
		getCursorScreenPosition(): Point;
		getCursorScreenPositions(): Point[];
		setCursorScreenPosition(position: PointOrArray, options?: { autoscroll: boolean }): void;
		addCursorAtBufferPosition(bufferPosition: PointOrArray, options?: { autoscroll: boolean }): Cursor;
		addCursorAtScreenPosition(screenPosition: PointOrArray, options?: { autoscroll: boolean }): Cursor;
		hasMultipleCursors(): boolean;
		moveUp(lineCount?: number): void;
		moveDown(lineCount?: number): void;
		moveLeft(columnCount?: number): void;
		moveRight(columnCount?: number): void;
		moveToBeginningOfLine(): void;
		moveToBeginningOfScreenLine(): void;
		moveToFirstCharacterOfLine(): void;
		moveToEndOfLine(): void;
		moveToEndOfScreenLine(): void;
		moveToBeginningOfWord(): void;
		moveToEndOfWord(): void;
		moveToTop(): void;
		moveToBottom(): void;
		moveToBeginningOfNextWord(): void;
		moveToPreviousWordBoundary(): void;
		moveToNextWordBoundary(): void;
		moveToBeginningOfNextParagraph(): void;
		moveToBeginningOfPreviousParagraph(): void;
		getLastCursor(): Cursor;
		getWordUnderCursor(options?: { wordRegex: RegExp }): string;
		getCursors(): Cursor[];
		getCursorsOrderedByBufferPosition(): Cursor[];
		addCursor(marker: Marker): Cursor;
		removeCursor(cursor: Cursor): void;
		moveCursors(fn: (cursor: Cursor) => void): void;
		mergeCursors(): void;
		preserveCursorPositionOnBufferReload(): void;

		// Selections

		getSelectedText(): string;
		getSelectedBufferRange(): Range;
		getSelectedBufferRanges(): Range[];
		setSelectedBufferRange(bufferRange: RangeOrArray, options?: { reversed: boolean }): void;
		setSelectedBufferRanges(bufferRanges: RangeOrArray[], options?: { reversed: boolean }): void;
		getSelectedScreenRange(): Range;
		getSelectedScreenRanges(): Range[];
		setSelectedScreenRange(screenRange: RangeOrArray, options?: { reversed: boolean }): void;
		setSelectedScreenRanges(screenRanges: RangeOrArray[], options?: { reversed: boolean }): void;
		addSelectionForBufferRange(bufferRange: RangeOrArray, options?: { reversed: boolean }): Selection;
		addSelectionForScreenRange(screenRange: RangeOrArray, options?: { reversed: boolean }): Selection;
		selectToBufferPosition(position: PointOrArray): void;
		selectToScreenPosition(position: PointOrArray): void;
		selectUp(rowCount?: number): void;
		selectDown(rowCount?: number): void;
		selectLeft(columnCount?: number): void;
		selectRight(columnCount?: number): void;
		selectToTop(): void;
		selectToBottom(): void;
		selectAll(): void;
		selectToBeginningOfLine(): void;
		selectToFirstCharacterOfLine(): void;
		selectToEndOfLine(): void;
		selectToBeginningOfWord(): void;
		selectToEndOfWord(): void;
		selectLinesContainingCursors(): void;
		selectWordsContainingCursors(): void;
		selectToPreviousWordBoundary(): void;
		selectToNextWordBoundary(): void;
		selectToBeginningOfNextWord(): void;
		selectToBeginningOfNextParagraph(): void;
		selectToBeginningOfPreviousParagraph(): void;
		selectMarker(marker: Marker): Range;
		getLastSelection(): Selection;
		getSelections(): Selection[];
		getSelectionsOrderedByBufferPosition(): Selection[];
		selectionIntersectsBufferRange(bufferRange: RangeOrArray): boolean;

		// Search and Replace

		scan(regex: RegExp, iterator: IScanIteratorFunc): void;
		scanInBufferRange(regex: RegExp, range: RangeOrArray, iterator: IScanIteratorFunc): void;
		backwardsScanInBufferRange(regex: RegExp, range: RangeOrArray, iterator: IScanIteratorFunc): void;

		// Tab Behavior

		getSoftTabs(): boolean;
		setSoftTabs(softTabs: boolean): void;
		toggleSoftTabs(): boolean;
		getTabLength(): number;
		setTabLength(): void;
		usesSoftTabs(): boolean;
		getTabText(): string;
		normalizeTabsInBufferRange(bufferRange: RangeOrArray): void;

		// Soft Wrap Behavior

		isSoftWrapped(): boolean;
		setSoftWrapped(softWrapped: boolean): boolean;
		toggleSoftWrapped(): boolean;
		getSoftWrapColumn(): number;

		// Indentation

		indentationForBufferRow(bufferRow: number): number;
		setIndentationForBufferRow(bufferRow: number, newLevel: number, options?: { preserveLeadingWhitespace: boolean }): Range;
		indentSelectedRows(): void;
		outdentSelectedRows(): void;
		indentLevelForLine(line: string): number;
		autoIndentSelectedRows(): void;
		indent(options?: { autoIndent: boolean }): void;
		buildIndentString(number: number, column?: number): string;

		// Grammars

		getGrammar(): Grammar;
		setGrammar(grammar: Grammar): void;
		reloadGrammar(): void;

		// Syntax Scopes

		getRootScopeDescriptor(): ScopeDescriptor;
		scopeDescriptorForBufferPosition(bufferPosition: PointOrArray): ScopeDescriptor;
		bufferRangeForScopeAtCursor(scopeSelector: string): Range;
		isBufferRowCommented(bufferRow: number): boolean;
		logCursorScope(): void;
		tokenForBufferPosition(bufferPosition: PointOrArray): Token;

		// Clipboard Operations

		copySelectedText(): void;
		cutSelectedText(): void;
		pasteText(options?: ISelectionInsertTextOptions): void;
		cutToEndOfLine(): void;

		// Folding

		foldCurrentRow(): Fold;
		unfoldCurrentRow(): void;
		foldBufferRow(bufferRow: number): Fold;
		unfoldBufferRow(bufferRow: number): void;
		foldSelectedLines(): void;
		foldAll(): void;
		unfoldAll(): void;
		foldAllAtIndentLevel(level: number): void;
		isFoldableAtBufferRow(bufferRow: number): boolean;
		isFoldableAtScreenRow(screenRow: number): boolean;
		toggleFoldAtBufferRow(bufferRow: number): Fold | void;
		isFoldedAtCursorRow(bufferRow: number): boolean;
		isFoldedAtScreenRow(screenRow: number): boolean;
		createFold(startRow: number, endRow: number): Fold;
		destroyFoldWithId(id: number): void;
		destroyFoldsIntersectingBufferRange(bufferRange: RangeOrArray): void;
		destroyFoldsContainingBufferRange(bufferRange: RangeOrArray): void;
		largestFoldContainingBufferRow(bufferRow: number): Fold;
		largestFoldStartingAtScreenRow(screenRow: number): Fold;
		outermostFoldsInBufferRowRange(startRow: number, endRow: number): Fold[];

		// Scrolling

		scrollToCursorPosition(options?: { center: boolean }): void;
		scrollToBufferPosition(bufferPosition: PointOrArray, options: { center: boolean }): void;
		scrollToScreenPosition(screenPosition: PointOrArray, options: { center: boolean }): void;
		scrollToTop(): number;
		scrollToBottom(): number;
		scrollToScreenRange(screenRange: RangeOrArray, options?: {
			center: boolean;
			reversed: boolean;
		}): number;
		horizontallyScrollable(): boolean;
		verticallyScrollable(): boolean;
		getHorizontalScrollbarHeight(): number;
		setHorizontalScrollbarHeight(height: number): number;
		getVerticalScrollbarWidth(): number;
		setVerticalScrollbarWidth(width: number): number;
		pageUp(): number;
		pageDown(): number;
		selectPageUp(): void;
		selectPageDown(): void;
		getRowsPerPage(): number;

		// Config

		shouldAutoIndent(): boolean;
		shouldAutoIndentOnPaste(): boolean;

		// Event Handlers

		handleTokenization(): void;
		handleGrammarChange(): void;
		handleMarkerCreated(): void;

		// Rendering

		getPlaceholderText(): string;
		setPlaceholderText(placeholderText: string);

		// Utility

		inspect(): string;
		logScreenLines(start?: number, end?: number): void;
	}

	/** A container that displays content at the center of the workspace. */
	interface Pane extends Model, ISerializable {
		// Event Subscription

		onDidChangeFlexScale(callback: (flexScale: number) => void): Disposable;
		observeFlexScale(callback: (flexScale: number) => void): Disposable;
		onDidActivate(callback: Function): Disposable;
		onDidDestroy(callback: Function): Disposable;
		onDidChangeActive(callback: (active: boolean) => void): Disposable;
		observeActive(callback: (active: boolean) => void): Disposable;
		onDidAddItem(callback: (e: { item: any; index: number }) => void): Disposable;
		onDidRemoveItem(callback: (e: { item: any; index: number }) => void): Disposable;
		onDidMoveItem(callback: (e: { item: any; oldIndex: number; newIndex: number }) => void): Disposable;
		observeItems(callback: (item: any) => void): Disposable;
		onDidChangeActiveItem(callback: (activeItem: any) => void): Disposable;
		observeActiveItem(callback: (activeItem: any) => void): Disposable;
		onWillDestroyItem(callback: (e: { item: any; index: number }) => void): Disposable;

		// Items

		getItems(): any[];
		getActiveItem(): any;
		getActiveEditor(): TextEditor;
		itemAtIndex(index: number): any;
		activateNextItem(): any;
		activatePreviousItem(): any;
		moveItemRight(): void;
		moveItemLeft(): void;
		getActiveItemIndex(): number;
		activateItemAtIndex(index: number): any;
		activateItem(item: any): any;
		addItem(item: any, index?: number): any;
		addItems(items: any[], index?: number): any[];
		moveItem(item: any, index: number): void;
		moveItemToPane(item: any, pane: Pane, index: number): any;
		/** Note that the return value doesn't represent success/failure, just ignore it. */
		destroyActiveItem(): boolean;
		destroyItem(item: any): boolean;
		destroyItems(): void;
		destroyInactiveItems(): void;
		saveActiveItem(nextAction?: Function): any;
		saveActiveItemAs(nextAction?: Function): any;
		saveItem(item: any, nextAction?: Function): any;
		saveItemAs(item: any, nextAction?: Function): any;
		saveItems(): void;
		itemForURI(uri: string): any;
		activateItemForURI(uri: string): boolean;

		// Lifecycle

		isActive(): boolean;
		activate(): void;

		// Splitting

		splitLeft(params?: { items?: any[], copyActiveItem?: boolean }): Pane;
		splitRight(params?: { items?: any[], copyActiveItem?: boolean }): Pane;
		splitUp(params?: { items?: any[], copyActiveItem?: boolean }): Pane;
		splitDown(params?: { items?: any[], copyActiveItem?: boolean }): Pane;
	}

	/** Interface for Project class in Atom. */
	interface Project extends Model, ISerializable {
		onDidChangePaths(callback: (projectPaths: string[]) => void): Disposable;
		repositoryForDirectory(directory: Directory): Q.Promise<any /* Repository */>;
		getPaths(): string[];
		setPaths(projectPaths: string[]): void;
		addPath(projectPath: string): void;
		removePath(projectPath: string): boolean;
		getDirectories(): Directory[];
		relativizePath(fullPath: string): string[];
		contains(pathToCheck: string): boolean;
	}

	interface IWorkspacePanelOptions{
		item: any; // DOM element, JQuery element, or a model with a registered view
		visible?: boolean;
		priority?: number;
	}

	/** A container on the edge of an editor window. */
	interface Panel {
		destroy(): void;
		onDidChangeVisible(callback: (visible: boolean) => void): Disposable;
		onDidDestroy(callback: (panel: Panel) => void): Disposable;
		getItem(): any;
		getPriority(): number;
		isVisible(): boolean;
		hide(): void;
		show(): void;
	}

	interface IPaneItemEvent {
		item: any;
		pane: Pane;
		index: number;
	}

	interface IPaneItemOpenEvent extends IPaneItemEvent {
		uri?: string;
	}

	/** A promise that provides the ability to cancel the asynchronous operation it represents. */
	interface ICancellablePromise extends Q.Promise<string> {
		cancel(): void;
	}

	interface IWorkspaceScanIteratorFunc {
		(filePath: string): void;
		(arg: { filePath: string; matches: any[] }): void;
	}

	interface IWorkspaceScanResult {
		/** Path to the file within which a match was found. */
		filePath: string;
		matches: Array<{
			/** The text that matched the regex. */
			matchText: string;
			/** The full line of text within which the match was found (excluding eol). */
			lineText: string;
			lineTextOffset: number;
			/**
			 * The range the match was found in, either a range object or an array of the form:
			 * `[[lineNumber, matchStartIndex], [lineNumber, matchEndIndex]]`
			 */
			range: RangeOrArray;
		}>;
	}

	/** Interface for Workspace class in Atom. */
	interface Workspace extends Model, ISerializable {
		// Event Subscription

		observeTextEditors(callback: (editor: TextEditor) => void): Disposable;
		observePaneItems(callback: (item: Pane) => void): Disposable;
		onDidChangeActivePaneItem(callback: (item: Pane) => void): Disposable;
		observeActivePaneItem(callback: (item: Pane) => void): Disposable;
		onDidOpen(callback: (event: IPaneItemOpenEvent) => void): Disposable;
		onDidAddPane(callback: (event: { pane: Pane }) => void): Disposable;
		onDidDestroyPane(callback: (event: { pane: Pane }) => void): Disposable;
		observePanes(callback: (pane: Pane) => void): Disposable;
		onDidChangeActivePane(callback: (pane: Pane) => void): Disposable;
		observeActivePane(callback: (pane: Pane) => void): Disposable;
		onDidAddPaneItem(callback: (event: IPaneItemEvent) => void): Disposable;
		onWillDestroyPaneItem(callback: (event: IPaneItemEvent) => void): Disposable;
		onDidDestroyPaneItem(callback: (event: IPaneItemEvent) => void): Disposable;
		onDidAddTextEditor(callback: (event: {
			textEditor: TextEditor;
			pane: Pane;
			index: number;
		}) => void): Disposable;

		// Opening

		open(uri?: string, options?: {
			initialLine?: number;
			initialColumn?: number;
			split?: string;
			activatePane?: boolean;
			searchAllPanes?: boolean;
		}): Q.Promise<any>;
		openSync(uri?: string, options?: {
			initialLine?: number;
			initialColumn?: number;
			activatePane?: boolean;
		}): any;
		reopenItem(): Q.Promise<any>;
		addOpener(opener: (uri: string, options?: any) => any): Disposable;

		// Pane items

		getPaneItems(): any[];
		getActivePaneItem(): any;
		getTextEditors(): TextEditor[];
		getActiveTextEditor(): TextEditor;
		saveAll(): void;
		saveActivePaneItem(): void;
		saveActivePaneItemAs(): void;
		destroyActivePaneItem(): void;

		// Panes

		getPanes(): Pane[];
		getActivePane(): Pane;
		activateNextPane(): boolean;
		activatePreviousPane(): boolean;
		paneForURI(uri: string): Pane;
		paneForItem(item: any): Pane;
		destroyActivePane(): void;
		destroyActivePaneItemOrEmptyPane(): void;

		// Panels

		getBottomPanels(): Panel[];
		addBottomPanel(options: IWorkspacePanelOptions): Panel;
		getLeftPanels(): Panel[];
		addLeftPanel(options: IWorkspacePanelOptions): Panel;
		getRightPanels(): Panel[];
		addRightPanel(options: IWorkspacePanelOptions): Panel;
		getTopPanels(): Panel[];
		addTopPanel(options: IWorkspacePanelOptions): Panel;
		getModalPanels(): Panel[];
		addModalPanel(options: IWorkspacePanelOptions): Panel;
		panelForItem(item: any): Panel;

		// Search and Replace

		scan(
			regex: RegExp,
			iterator: (result: IWorkspaceScanResult, error: any) => void
		): ICancellablePromise;

		scan(
			regex: RegExp,
			options: {
				paths: string[];
				onPathsSearched: (numberOfPathsSearched: number) => void
			},
			iterator: (result: IWorkspaceScanResult, error: any) => void
		): ICancellablePromise;

		replace(
			regex: RegExp, replacementText: string, filePaths: string[],
			iterator: (arg: { filePath: string; replacements: number }) => void
		): Q.Promise<void>;
	}

	interface IAtomSettings {
		appVersion: string;
		bootstrapScript: string;
		devMode: boolean;
		safeMode: boolean;
		initialPath: string;
		pathToOpen: string;
		resourcePath: string;
		shellLoadTime: number;
		windowState: string;
	}

	interface IAtomState {
		version: number;
		// add more as needed...
	}

	interface ISerializedState {
		version?: number;
		deserializer: string;
	}

	interface IAtomSerializable {
		serialize(): ISerializedState;
	}

	interface IDeserializer {
		version?: number;
		name: string;
		deserialize(state: ISerializedState, params?: any): any;
	}

	/** Interface for DeserializerManager class in Atom. */
	interface DeserializerManager {
		add(...deserializers: IDeserializer[]): Disposable;
		deserialize(state: ISerializedState, params?: any): any;
		get(state: ISerializedState): IDeserializer;
	}

	interface IConfigChangeEvent {
		newValue: any;
		oldValue: any;
		keyPath: string;
	}

	/** Provides access to all Atom configuration details. */
	interface Config {
		// Event Subscription

		observe(keyPath: string, callback: (newValue: any) => void): Disposable;
		observe(keyPath: string, options: { scopeDescriptor: ScopeDescriptor }, callback: (newValue: any) => void): Disposable;
		onDidChange(callback: (e: IConfigChangeEvent) => void): Disposable;
		onDidChange(keyPath: string, callback: (e: IConfigChangeEvent) => void): Disposable;
		onDidChange(keyPath: string, options: { scopeDescriptor: ScopeDescriptor }, callback: (e: IConfigChangeEvent) => void): Disposable;

		// Settings Management

		get(keyPath: string, options?: {
			sources?: string[];
			excludeSources?: string[];
			scope?: ScopeDescriptor;
		}): any;
		getAll(keyPath: string, options?: {
			sources?: string[];
			excludeSources?: string[];
			scope?: ScopeDescriptor;
		}): Array<{ scopeDescriptor: ScopeDescriptor; value: any }>;
		set(keyPath: string, value: any, options?: {
			scopeSelector?: string;
			source?: string;
		}): boolean;
		unset(keyPath: string, options?: { scopeSelector?: string; source?: string }): void;
		getSources(): string[];
		getSchema(keyPath: string): any;
		getUserConfigPath(): string;
		transact(callback: Function): void;
	}

	/**
	 * Loads and activates an Atom package's main module and resources such as
	 * stylesheets, keymaps, grammar, editor properties, and menus.
	 */
	interface Package {
		/** Path to root directory of the package. */
		path: string;

		/** Is this package compatible with this version of Atom? */
		isCompatible(): boolean;
	}

	/** Interface for ThemePackage class in Atom. */
	interface ThemePackage extends Package {
	}

	/** Coordinates the lifecycle of Atom packages. */
	interface PackageManager {
		/** Invokes the given callback when all packages have been loaded. */
		onDidLoadInitialPackages(callback: Function): Disposable;
		/** Invokes the given callback when all packages have been activated. */
		onDidActivateInitialPackages(callback: Function): Disposable;
		/** Invokes the given callback when a package is activated. */
		onDidActivatePackage(callback: Function): Disposable;
		/** Invokes the given callback when a package is deactivated. */
		onDidDeactivatePackage(callback: Function): Disposable;
		/** Invokes the given callback when a package is laoded. */
		onDidLoadPackage(callback: Function): Disposable;
		/** Invokes the given callback when a package is unloaded. */
		onDidUnloadPackage(callback: Function): Disposable;

		/** Get the path to the apm command. */
		getApmPath(): string;
		/** Get the paths being used to look for packages. */
		getPackageDirPaths(): string[];

		/** Resolve the given package name to a path on disk. */
		resolvePackagePath(name: string): string;
		/** Is the package with the given name bundled with Atom? */
		isBundledPackage(name: string): boolean;

		/**
		 * Enable the package with the given name.
		 * @return The package that was enabled or null if it's not loaded.
		 */
		enablePackage(name: string): Package;
		/**
		 * Disable the package with the given name.
		 * @return The package that was disabled or null if it's not loaded.
		 */
		disablePackage(name: string): Package;
		/** Is the package with the given name disabled? */
		isPackageDisabled(name: string): boolean;

		/** Get an array of active packages. */
		getActivePackages(): Package[];
		/** Get an active package with the given name. */
		getActivePackage(name: string): Package;
		/** Is the package with the given name active? */
		isPackageActive(name: string): boolean;

		/** Get an array of all loaded packages. */
		getLoadedPackages(): Package[];
		/** Get all loaded packages of a certain type. */
		getLoadedPackagesForTypes(types: string[]): Package[];
		/** Get a loaded package matching the given name. */
		getLoadedPackage(name: string): Package;
		/** Is the package with the given name loaded? */
		isPackageLoaded(name: string): boolean;

		/** Get all the available package paths. */
		getAvailablePackagePaths(): string[];
		/** Get all the available package names. */
		getAvailablePackageNames(): string[];
		/** Get all the available package metadata. */
		getAvailablePackageMetadata(): any[];
	}

	/** Loads and activates Atom themes. */
	interface ThemeManager {
		onDidChangeActiveThemes(callback: Function): Disposable;

		getLoadedThemeNames(): string[];
		getLoadedThemes(): ThemePackage[];
		getActiveThemeNames(): string[];
		getActiveThemes(): ThemePackage[];

		getEnabledThemeNames(): string[];
	}

	/** A registry of commands that can be accessed via a context menu. */
	interface ContextMenuManager {
		add(itemsBySelector: any): Disposable;
	}

	/** Interface for items specified within the `itemsBySelector` argument of `ContextMenuManager.add()`. */
	interface IContextMenuItem {
		label?: string;
		command?: string;
		submenu?: IContextMenuItem[];
		type?: string;
		created?: (event: MouseEvent) => void;
		shouldDisplay?: (event: MouseEvent) => void;
	}

	/** Interface for items passed to `MenuManager.add()`. */
	interface IMenuItem {
		label: string;
		submenu?: IMenuItem[];
		command?: string;
	}

	/** A registry of commands that can be accessed via the application menu. */
	interface MenuManager {
		add(items: IMenuItem[]): Disposable;
		update(): void;
	}

	/** Provides access to the clipboard for copy/pasting. */
	interface Clipboard {
		md5(text: string): string;
		write(text: string, metadata?: any): void;
		read(): string;
		readWithMetadata(): { text: string; metadata: any };
	}

	interface IWindowDimensions {
		x: number;
		y: number;
		width: number;
		height: number;
	}

	/** Interface for StorageFolder class in Atom. */
	interface StorageFolder {
		store(name: string, value: any): void;
		load(name: string): any;
		pathForKey(name: string): string;
		getPath(): string;
	}

	/** Associates tooltips with HTML elements or selectors. */
	interface TooltipManager {
		add(target: HTMLElement, options: any): Disposable;
	}

	interface INotificationOptions {
		detail?: string;
		dismissable?: boolean;
		icon?: string;
	}

	interface NotificationStatic {
		prototype: Notification;
		new (type: string, message: string, options?: INotificationOptions): Notification;
	}

	/** A notification to the user containing a message and type. */
	interface Notification {
		constructor: NotificationStatic;

		onDidDismiss(callback: (notification: Notification) => void): Disposable;
		onDidDisplay(callback: (notification: Notification) => void): Disposable;
		getOptions(): INotificationOptions;
		getType(): string;
		getMessage(): string;
		getTimestamp(): Date;
		getDetail(): string;
		isEqual(other: Notification): boolean;
		dismiss(): void;
		isDismissed(): boolean;
		isDismissable(): boolean;
		wasDisplayed(): boolean;
		setDisplayed(displayed: boolean): void;
		getIcon(): string;
	}

	/** Creates notifications to be shown to the user. */
	interface NotificationManager {
		onDidAddNotification(callback: (notification: Notification) => void): Disposable;
		addSuccess(message: string, options?: INotificationOptions): Disposable;
		addInfo(message: string, options?: INotificationOptions): Disposable;
		addWarning(message: string, options?: INotificationOptions): Disposable;
		addError(message: string, options?: INotificationOptions): Disposable;
		addFatalError(message: string, options?: INotificationOptions): Disposable;

		add(type: string, message: string, options?: INotificationOptions): Disposable;
		addNotification(notification: Notification): Notification;

		getNotifications(): Notification[];
		clear(): void;
	}

	/** A registry of grammars used for tokenizing. */
	interface GrammarRegistry extends IAtomSerializable, AtomFirstMate.GrammarRegistry {
		selectGrammar(filePath: string, fileContents: string): Grammar;
	}

	interface IAtomHTMLStyleElement extends HTMLStyleElement {
		sourcePath: string;
		context: string;
	}

	/** Allows to query and observe the set of active style sheets. */
	interface StyleManager {
		observeStyleElements(callback: (styleElement: IAtomHTMLStyleElement) => void): Disposable;
		onDidAddStyleElement(callback): Disposable;
		onDidRemoveStyleElement(callback): Disposable;
		onDidUpdateStyleElement(callback): Disposable;

		getStyleElements(): IAtomHTMLStyleElement[];
		getUserStyleSheetPath(): string;
	}

	/** Static side of the BufferedProcess class. */
	interface BufferedProcessStatic {
		prototype: BufferedProcess;
		new (options: {
			command: string;
			args?: any[];
			options?: any;
			stdout?: (data: string) => void;
			stderr?: (data: string) => void;
			exit?: (code: number) => void;
		}): BufferedProcess;
	}

	/** Wraps a Node child process in order to provide standard error/output line buffering. */
	interface BufferedProcess {
		onWillThrowError(callback: (errorObject: {
			error: Error;
			handle: Function;
		}) => void): Disposable;
		kill(): void;
	}

	/** Static side of the BufferedNodeProcess class. */
	interface BufferedNodeProcessStatic {
		prototype: BufferedNodeProcess;
		new (options: {
			command: string;
			args?: any[];
			options?: any;
			stdout?: (data: string) => void;
			stderr?: (data: string) => void;
			exit?: (code: number) => void;
		}): BufferedNodeProcess;
	}

	/** Like [[BufferedProcess]] but accepts a Node script as the command to run. */
	interface BufferedNodeProcess extends BufferedProcess {
	}

	interface TokenizedBuffer extends Model, ISerializable {
		// TBD
	}

	interface TokenizedLine {
		tokens: Token[];

		getMaxScreenColumn(): number;
		getMaxBufferColumn(): number;
		isSoftWrapped(): boolean;
		isComment(): boolean;
		isOnlyWhitespace(): boolean;
		getTokenCount(): number;
	}

	interface Token {
		value: string;

		isEqual(other: Token): boolean;
		isBracket(): boolean;
		isOnlyWhitespace(): boolean;
		hasLeadingWhitespace(): boolean;
		hasTrailingWhitespace(): boolean;
	}

	/** Collapses multiple buffer lines into a single line on screen. */
	interface Fold {
		id: number;
		displayBuffer: DisplayBuffer;
		marker: Marker;

		isInsideLargerFold(): boolean;
		destroy();
		getBufferRange(options?: { includeNewline: boolean }): Range;
		/** @return Array with two elements: `[startRow, endRow]`. */
		getBufferRowRange(): Array<number>;
		getStartRow(): number;
		getEndRow(): number;
		inspect(): string;
		getBufferRowCount(): number;
		isContainedByFold(fold: Fold): boolean;
	}

	interface IGitStatusChangeEvent {
		path: string;
		pathStatus: number;
	}

	interface GitRepositoryStatic {
		prototype: GitRepository;
		new (path: string, options?: any): GitRepository;

		exists(path: string): boolean;
		open(path: string, options?: { refreshOnWindowFocus?: boolean }): GitRepository;
	}

	interface GitRepository {
		constructor: GitRepositoryStatic;

		destroy(): void;

		// Event Subscription

		onDidDestroy(callback: Function): Disposable;
		onDidChangeStatus(callback: (event: IGitStatusChangeEvent) => void): Disposable;
		onDidChangeStatuses(callback: Function): Disposable;

		// Repository Details

		getType(): string;
		getPath(): string;
		getWorkingDirectory(): string;
		isProjectAtRoot(): boolean;
		relativize(path: string): string;
		hasBranch(branch: string): boolean;
		getShortHead(path?: string): string;
		isSubmodule(path: string): boolean;
		getAheadBehindCount(branch: string, path?: string): { ahead: number; behind: number };
		getCachedUpstreamAheadBehindCount(path?: string): { ahead: number; behind: number };
		getConfigValue(key: string, path?: string): string;
		getOriginURL(path?: string): string;
		getUpstreamBranch(path?: string): string;
		getReferences(path?: string): { heads: string[]; remotes: string[]; tags: string[] };
		getReferenceTarget(reference: string, path?: string): string;

		// Reading Status

		isPathModified(path: string): boolean;
		isPathNew(path: string): boolean;
		isPathIgnored(path: string): boolean;
		getDirectoryStatus(directoryPath: string): number;
		getPathStatus(path: string): number;
		getCachedPathStatus(path: string): number;
		isStatusModified(status: number): boolean;
		isStatusNew(status: number): boolean;

		// Retrieving Diffs

		getDiffStats(path: string): { added: number; deleted: number };
		getLineDiffs(path: string, text: string): Array<{
			oldStart: number;
			newStart: number;
			oldLines: number;
			newLines: number;
		}>;

		// Checking Out

		checkoutHead(path: string): boolean;
		checkoutReference(reference: string, create: boolean): boolean;
	}

	interface IMarkerChangeEvent {
		oldHeadScreenPosition: Point;
		newHeadScreenPosition: Point;
		oldHeadBufferPosition: Point;
		newHeadBufferPosition: Point;
		oldTailScreenPosition: Point;
		newTailScreenPosition: Point;
		oldTailBufferPosition: Point;
		newTailBufferPosition: Point;
		/**
		* Indicates whether the change was caused by a textual change to the buffer, or whether
		* the marker was minpulated directly via its public API.
		*/
		textChanged: boolean;
		isValid: boolean;
	}

	// previously known as IDisplayBufferMarker
	/** A buffer annotation that remains logically stationary as the buffer changes. */
	interface Marker {
		id: number;
		bufferMarker: AtomTextBuffer.Marker;
		displayBuffer: DisplayBuffer;

		/** Destroys the marker after which the marker cannot be restored by undo/redo operations. */
		destroy(): void;
		/** Creates and returns a new marker with the same properties as this one. */
		copy(properties?: any): Marker;

		/** Invokes the given callback when the state of the marker changes. */
		onDidChange(callback: (e: IMarkerChangeEvent) => void): Disposable;
		/** Invokes the given callback when the marker is destroyed. */
		onDidDestroy(callback: Function): Disposable;

		isValid(): boolean;
		isDestroyed(): boolean;
		/** Does the head precede the tail? */
		isReversed(): boolean;
		getInvalidationStrategy(): string;
		/** Gets an object containing any custom properties associated with the marker. */
		getProperties(): any;
		/** Merges an object containing new properties into the marker's exisiting custom properties. */
		setProperties(properties: any): void;

		/** Checks if this marker is equivalent to another, meaning they have the same range and options. */
		isEqual(other: Marker): boolean;
		/** Compares this marker to another based on the range (and only the range). */
		compare(other: Marker): boolean;

		getBufferRange(): Range;
		setBufferRange(bufferRange: RangeOrArray, properties?: any): void;
		getScreenRange(): Range;
		setScreenRange(screenRange: RangeOrArray, properties?: any): void;
		getStartBufferPosition(): Point;
		getStartScreenPosition(): Point;
		getEndBufferPosition(): Point;
		getEndScreenPosition(): Point;
		getHeadBufferPosition(): Point;
		setHeadBufferPosition(bufferPosition: PointOrArray, properties?: any): void;
		getHeadScreenPosition(): Point;
		setHeadScreenPosition(screenPosition: PointOrArray, properties?: any): void;
		getTailBufferPosition(): Point;
		setTailBufferPosition(bufferPosition: PointOrArray): void;
		getTailScreenPosition(): Point;
		setTailScreenPosition(screenPosition: PointOrArray, options?: any): void;
		hasTail(): boolean;
		plantTail(): boolean;
		clearTail(properties?: any): boolean;
	}

	/** Static side of the Task class. */
	interface TaskStatic {
		prototype: Task;
		new (taskPath: string): Task;

		once(taskPath: string, ...args: any[]): Task;
	}

	/** Runs a Node script in a separate process. */
	interface Task {
		constructor: TaskStatic;
		/**
		 * Starts the task.
		 * @param args Arguments to pass to the function exported by this task's script.
		 *             Note that if the last argument is a function it will be called when the task
		 *             completes.
		 */
		start(...args: any[]): void;
		send(message: any): void;
		on(eventName: string, callback: Function): Disposable;
		terminate(): boolean;
	}

	interface AtomStatic {
		prototype: Atom;
		new (state: IAtomState): Atom;

		version: number;

		loadOrCreate(mode: string): Atom;
		deserialize(state: ISerializedState): Atom;
		loadState(mode: any): void;
		getStateKey(paths: string[], mode: string): string;
		getConfigDirPath(): string;
		getStorageFolder(): StorageFolder;
		getLoadSettings(): IAtomSettings;
		updateLoadSettings(key: string, value: any): void;
		getCurrentWindow(): BrowserWindow;
	}

	interface Atom extends Model {
		constructor: AtomStatic;

		commands: CommandRegistry;
		config: Config;
		clipboard: Clipboard;
		contextManu: ContextMenuManager;
		menu: MenuManager;
		keymaps: KeymapManager;
		tooltips: TooltipManager;
		notifications: NotificationManager;
		project: Project;
		grammars: GrammarRegistry;
		packages: PackageManager;
		themes: ThemeManager;
		styles: StyleManager;
		deserializers: DeserializerManager;
		views: ViewRegistry;
		workspace: Workspace;

		initialize(): void;

		// Event Subscription

		onDidBeep(callback: Function): Disposable;
		onWillThrowError(callback: (e: {
			originalError: any;
			message: string;
			url: string;
			line: number;
			column: number;
			preventDefault: Function;
		}) => void): Disposable;
		onDidThrowError(callback: (e: {
			originalError: any;
			message: string;
			url: string;
			line: number;
			column: number;
		}) => void): Disposable;

		// Atom Details

		inDevMode(): boolean;
		inSafeMode(): boolean;
		inSpecMode(): boolean;
		getVersion(): string;
		isReleasedVersion(): boolean;
		getConfigDirPath(): string;
		getWindowLoadTime(): number;
		getLoadSettings(): any;

		// Managing the Atom Window

		open(options: {
			pathsToOpen: string[];
			newWindow: boolean;
			devMode: boolean;
			safeMode: boolean;
		}): void;
		pickFolder(callback: (paths: string[]) => void): void;
		close(): void;
		getSize(): { width: number, height: number };
		setSize(width: number, height: number);
		getPosition(): { x: number, y: number };
		setPosition(x: number, y: number);
		getCurrentWindow(): BrowserWindow;
		center(): void;
		focus(): void;
		show(): void;
		hide(): void;
		reload(): void;
		isMaximized(): boolean;
		maximize();
		isFullScreen(): boolean;
		setFullScreen(fullScreen: boolean): void;
		toggleFullScreen(): void;
		displayWindow(): void;
		getWindowDimensions(): IWindowDimensions;
		setWindowDimensions(arg: { x: number, y: number, width?: number, height?: number }): void;
		isValidDimensions(arg: IWindowDimensions): boolean;
		storeDefaultWindowDimensions(): void;
		getDefaultWindowDimensions(): IWindowDimensions;
		restoreWindowDimensions(): IWindowDimensions;
		storeWindowDimensions(): void;
		storeWindowBackground(): void;
		startEditorWindow(): void;
		unloadEditorWindow(): void;
		removeEditorWindow(): void;
		openInitialEmptyEditorIfNecessary(): void;

		// Messaging the user

		beep(): void;
		confirm(options: {
			message: string;
			detailedMessage: string;
			buttons: Array<string> | Object;
		}): any;

		// Managing Dev Tools

		openDevTools(): void;
		toggleDevlTools(): void;
		executeJavaScriptInDevTools(code: string): void;
	}
} // AtomCore

declare var atom: AtomCore.Atom;

declare module "atom" {
	var BufferedNodeProcess: AtomCore.BufferedNodeProcessStatic;
	var BufferedProcess: AtomCore.BufferedProcessStatic;
	type GitRepository = AtomCore.GitRepository;
	var GitRepository: AtomCore.GitRepositoryStatic;
	var Notification: AtomCore.NotificationStatic;
	var TextBuffer: AtomTextBuffer.TextBufferStatic;
	var Point: AtomTextBuffer.PointStatic;
	var Range: AtomTextBuffer.RangeStatic;
	var File: PathWatcher.IFileStatic;
	var Directory: PathWatcher.IDirectoryStatic;
	type Emitter = AtomEventKit.Emitter;
	var Emitter: AtomEventKit.EmitterStatic;
	type Disposable = AtomEventKit.Disposable;
	var Disposable: AtomEventKit.DisposableStatic;
	type CompositeDisposable = AtomEventKit.CompositeDisposable;
	var CompositeDisposable: AtomEventKit.CompositeDisposableStatic;
	// More concise than the 6 lines above but requires TypeScript 1.5:
	//export { Emitter, Disposable, CompositeDisposable } from 'event-kit';
	// NOTE: The following are only available when NOT running as a child Node process.
	type Task = AtomCore.Task;
	var Task: AtomCore.TaskStatic;
	type TextEditor = AtomCore.TextEditor;
	var TextEditor: AtomCore.TextEditorStatic;
}
