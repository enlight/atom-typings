// Type definitions for Atom 1.0 (based on typings from atom-typescript)
// Project: https://atom.io/
// Definitions by: vvakame <https://github.com/vvakame/>, Vadim Macagon <https://github.com/enlight/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../q/Q.d.ts" />
/// <reference path="../jquery/jquery.d.ts" />
/// <reference path="../space-pen/space-pen.d.ts" />
/// <reference path="../pathwatcher/pathwatcher.d.ts" />
/// <reference path="../text-buffer/text-buffer.d.ts" />
/// <reference path="../status-bar/status-bar.d.ts" />
/// <reference path="../event-kit/event-kit.d.ts" />
/// <reference path="../first-mate/first-mate.d.ts" />

// Policy: this definition file only declare element related to `atom`.
// if js file include to another npm package (e.g. "space-pen", "mixto" and "emissary").
// you should create a separate file.

interface Window {
	atom: AtomCore.IAtom;
	measure(description:string, fn:Function):any; // return fn result
	profile(description:string, fn:Function):any; // return fn result
}

declare module AtomCore {

	type IPoint = TextBuffer.IPoint;
	type IRange = TextBuffer.IRange;
	type IPointOrArray = TextBuffer.IPointOrArray;
	type IRangeOrArray = TextBuffer.IRangeOrArray;
	type Disposable = EventKit.Disposable;
	type IGrammar = FirstMate.IGrammar;

	interface IPanes {
		// TBD
	}

	// DONE
	interface ICommandRegistry {
    add(target: string, commands: Object): Disposable;
		add(target: string, commandName: string, callback: (e: Event) => void): Disposable;
		findCommands(params: { target: Element }): Array<{name: string; displayName: string}>;
		dispatch(target: string, commandName: string, detail: any): boolean;
  }

  interface ICommandPanel {
		// TBD
	}

	interface IDisplayBufferStatic {
		new(_arg?:any):IDisplayBuffer;
	}

	interface IDisplayBuffer /* extends Theorist.Model */ {
		constructor: IDisplayBufferStatic;

		verticalScrollMargin: number;
		horizontalScrollMargin: number;
		scopedCharacterWidthsChangeCount: number;

		tokenizedBuffer: ITokenizedBuffer;
		buffer: TextBuffer.ITextBuffer;
		charWidthsByScope: any;
		markers: any;
		foldsByMarkerId: any;
		decorationsById: any;
		decorationsByMarkerId: any;
		overlayDecorationsById: any;

		serializeParams():{id:number; softWrap:boolean; editorWidthInChars: number; scrollTop: number; scrollLeft: number; tokenizedBuffer: any; };
		deserializeParams(params:any):any;
		copy():IDisplayBuffer;
		updateAllScreenLines():any;
		emitChanged(eventProperties:any, refreshMarkers?:boolean):any;
		updateWrappedScreenLines():any;
		setVisible(visible:any):any;
		getVerticalScrollMargin():number;
		setVerticalScrollMargin(verticalScrollMargin:number):number;
		getHorizontalScrollMargin():number;
		setHorizontalScrollMargin(horizontalScrollMargin:number):number;
		getHeight():any;
		setHeight(height:any):any;
		getWidth():any;
		setWidth(newWidth:any):any;
		getScrollTop():number;
		setScrollTop(scrollTop:number):number;
		getScrollBottom():number;
		setScrollBottom(scrollBottom:number):number;
		getScrollLeft():number;
		setScrollLeft(scrollLeft:number):number;
		getScrollRight():number;
		setScrollRight(scrollRight:number):number;
		getLineHeight():any;
		setLineHeight(lineHeight:any):any;
		getDefaultCharWidth():any;
		setDefaultCharWidth(defaultCharWidth:any):any;
		getScopedCharWidth(scopeNames:any, char:any):any;
		getScopedCharWidths(scopeNames:any):any;
		setScopedCharWidth(scopeNames:any, char:any, width:any):any;
		setScopedCharWidths(scopeNames:any, charWidths:any):any;
		clearScopedCharWidths():any;
		getScrollHeight():number;
		getScrollWidth():number;
		getVisibleRowRange():number[];
		intersectsVisibleRowRange(startRow:any, endRow:any):any;
		selectionIntersectsVisibleRowRange(selection:any):any;
		scrollToScreenRange(screenRange:any):any;
		scrollToScreenPosition(screenPosition:any):any;
		scrollToBufferPosition(bufferPosition:any):any;
		pixelRectForScreenRange(screenRange:TextBuffer.IRange):any;
		getTabLength():number;
		setTabLength(tabLength:number):any;
		setSoftWrap(softWrap:boolean):boolean;
		getSoftWrap():boolean;
		setEditorWidthInChars(editorWidthInChars:number):any;
		getEditorWidthInChars():number;
		getSoftWrapColumn():number;
		lineForRow(row:number):any;
		linesForRows(startRow:number, endRow:number):any;
		getLines():any[];
		indentLevelForLine(line:any):any;
		bufferRowsForScreenRows(startScreenRow:any, endScreenRow:any):any;
		createFold(startRow:number, endRow:number):IFold;
		isFoldedAtBufferRow(bufferRow:number):boolean;
		isFoldedAtScreenRow(screenRow:number):boolean;
		destroyFoldWithId(id:number):any;
		unfoldBufferRow(bufferRow:number):any[];
		largestFoldStartingAtBufferRow(bufferRow:number):any;
		foldsStartingAtBufferRow(bufferRow:number):any;
		largestFoldStartingAtScreenRow(screenRow:any):any;
		largestFoldContainingBufferRow(bufferRow:any):any;
		outermostFoldsInBufferRowRange(startRow:any, endRow:any):any[];
		foldsContainingBufferRow(bufferRow:any):any[];
		screenRowForBufferRow(bufferRow:number):number;
		lastScreenRowForBufferRow(bufferRow:number):number;
		bufferRowForScreenRow(screenRow:number):number;

		screenRangeForBufferRange(bufferRange:TextBuffer.IPoint[]):TextBuffer.IRange;

		screenRangeForBufferRange(bufferRange:TextBuffer.IRange):TextBuffer.IRange;

		screenRangeForBufferRange(bufferRange:{start: TextBuffer.IPoint; end: TextBuffer.IPoint}):TextBuffer.IRange;
		screenRangeForBufferRange(bufferRange:{start: number[]; end: TextBuffer.IPoint}):TextBuffer.IRange;
		screenRangeForBufferRange(bufferRange:{start: {row:number; col:number;}; end: TextBuffer.IPoint}):TextBuffer.IRange;

		screenRangeForBufferRange(bufferRange:{start: TextBuffer.IPoint; end: number[]}):TextBuffer.IRange;
		screenRangeForBufferRange(bufferRange:{start: number[]; end: number[]}):TextBuffer.IRange;
		screenRangeForBufferRange(bufferRange:{start: {row:number; col:number;}; end: number[]}):TextBuffer.IRange;

		screenRangeForBufferRange(bufferRange:{start: TextBuffer.IPoint; end: {row:number; col:number;}}):TextBuffer.IRange;
		screenRangeForBufferRange(bufferRange:{start: number[]; end: {row:number; col:number;}}):TextBuffer.IRange;
		screenRangeForBufferRange(bufferRange:{start: {row:number; col:number;}; end: {row:number; col:number;}}):TextBuffer.IRange;

		bufferRangeForScreenRange(screenRange:TextBuffer.IPoint[]):TextBuffer.IRange;

		bufferRangeForScreenRange(screenRange:TextBuffer.IRange):TextBuffer.IRange;

		bufferRangeForScreenRange(screenRange:{start: TextBuffer.IPoint; end: TextBuffer.IPoint}):TextBuffer.IRange;
		bufferRangeForScreenRange(screenRange:{start: number[]; end: TextBuffer.IPoint}):TextBuffer.IRange;
		bufferRangeForScreenRange(screenRange:{start: {row:number; col:number;}; end: TextBuffer.IPoint}):TextBuffer.IRange;

		bufferRangeForScreenRange(screenRange:{start: TextBuffer.IPoint; end: number[]}):TextBuffer.IRange;
		bufferRangeForScreenRange(screenRange:{start: number[]; end: number[]}):TextBuffer.IRange;
		bufferRangeForScreenRange(screenRange:{start: {row:number; col:number;}; end: number[]}):TextBuffer.IRange;

		bufferRangeForScreenRange(screenRange:{start: TextBuffer.IPoint; end: {row:number; col:number;}}):TextBuffer.IRange;
		bufferRangeForScreenRange(screenRange:{start: number[]; end: {row:number; col:number;}}):TextBuffer.IRange;
		bufferRangeForScreenRange(screenRange:{start: {row:number; col:number;}; end: {row:number; col:number;}}):TextBuffer.IRange;

		pixelRangeForScreenRange(screenRange:TextBuffer.IPoint[], clip?:boolean):TextBuffer.IRange;

		pixelRangeForScreenRange(screenRange:TextBuffer.IRange, clip?:boolean):TextBuffer.IRange;

		pixelRangeForScreenRange(screenRange:{start: TextBuffer.IPoint; end: TextBuffer.IPoint}, clip?:boolean):TextBuffer.IRange;
		pixelRangeForScreenRange(screenRange:{start: number[]; end: TextBuffer.IPoint}, clip?:boolean):TextBuffer.IRange;
		pixelRangeForScreenRange(screenRange:{start: {row:number; col:number;}; end: TextBuffer.IPoint}, clip?:boolean):TextBuffer.IRange;

		pixelRangeForScreenRange(screenRange:{start: TextBuffer.IPoint; end: number[]}, clip?:boolean):TextBuffer.IRange;
		pixelRangeForScreenRange(screenRange:{start: number[]; end: number[]}, clip?:boolean):TextBuffer.IRange;
		pixelRangeForScreenRange(screenRange:{start: {row:number; col:number;}; end: number[]}, clip?:boolean):TextBuffer.IRange;

		pixelRangeForScreenRange(screenRange:{start: TextBuffer.IPoint; end: {row:number; col:number;}}, clip?:boolean):TextBuffer.IRange;
		pixelRangeForScreenRange(screenRange:{start: number[]; end: {row:number; col:number;}}, clip?:boolean):TextBuffer.IRange;
		pixelRangeForScreenRange(screenRange:{start: {row:number; col:number;}; end: {row:number; col:number;}}, clip?:boolean):TextBuffer.IRange;

		pixelPositionForScreenPosition(screenPosition:TextBuffer.IPoint, clip?:boolean):TextBuffer.IPoint;
		pixelPositionForScreenPosition(screenPosition:number[], clip?:boolean):TextBuffer.IPoint;
		pixelPositionForScreenPosition(screenPosition:{row:number; col:number;}, clip?:boolean):TextBuffer.IPoint;

		screenPositionForPixelPosition(pixelPosition:any):TextBuffer.IPoint;

		pixelPositionForBufferPosition(bufferPosition:any):any;
		getLineCount():number;
		getLastRow():number;
		getMaxLineLength():number;
		screenPositionForBufferPosition(bufferPosition:any, options:any):any;
		bufferPositionForScreenPosition(bufferPosition:any, options:any):any;
		scopesForBufferPosition(bufferPosition:any):any;
		bufferRangeForScopeAtPosition(selector:any, position:any):any;
		tokenForBufferPosition(bufferPosition:any):any;
		getGrammar():IGrammar;
		setGrammar(grammar:IGrammar):any;
		reloadGrammar():any;
		clipScreenPosition(screenPosition:any, options:any):any;
		findWrapColumn(line:any, softWrapColumn:any):any;
		rangeForAllLines():TextBuffer.IRange;
		/** Retrieves a marker by id. */
		getMarker(id: number): Marker;
		getMarkers(): Marker[];
		getMarkerCount(): number;
		/** Creates a new marker at the given screen range. */
		markScreenRange(range: IRangeOrArray, ...args: any[]): Marker;
		/** Creates a new marker at the given buffer range. */
		markBufferRange(range: IRangeOrArray, options?: any): Marker;
		/** Creates a new marker at the given screen position. */
		markScreenPosition(screenPosition: IPointOrArray, options?: any): Marker;
		/** Creates a new marker at the given buffer position. */
		markBufferPosition(bufferPosition: IPointOrArray, options?: any): Marker;
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

	interface IViewRegistry {
		getView(selector:any):any;
	}

	// DONE
	interface IScopeDescriptor {
		getScopesArray(): string[];
  }

	// DONE
	interface ICursorChangeEvent {
		oldBufferPosition: IPointOrArray;
		oldScreenPosition: IPointOrArray;
		newBufferPosition: IPointOrArray;
		newScreenPosition: IPointOrArray;
		textChanged: boolean;
		/** The cursor that triggered the event. */
		cursor: ICursor;
	}

	interface ICursorStatic {
		new (arg: { editor: ITextEditor; marker: Marker; id: number }): ICursor;
	}

	// DONE... but maybe ditch the constructor
	/** Interface for Cursor class in Atom. */
	interface ICursor /* extends Theorist.Model */ {
		editor: ITextEditor;
		id: number;

		constructor: ICursorStatic;
		destroy(): void;
		onDidChangePosition(callback: (e: ICursorChangeEvent) => void): EventKit.Disposable;
		onDidDestroy(callback: Function): EventKit.Disposable;
		onDidChangeVisibility(callback: (visibility: boolean) => void): EventKit.Disposable;

		setScreenPosition(screenPosition: IPointOrArray, options?: { autoscroll?: boolean }): void;
		getScreenPosition(): TextBuffer.IPoint;
		setBufferPosition(bufferPosition: IPointOrArray, options?: { autoscroll?: boolean }): void;
		getBufferPosition(): TextBuffer.IPoint;
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
		getScopeDescriptor(): IScopeDescriptor;
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

		getPreviousWordBoundaryBufferPosition(options?: { wordRegex: RegExp }): TextBuffer.IPoint;
		getNextWordBoundaryBufferPosition(options?: { wordRegex: RegExp }): TextBuffer.IPoint;
		getBeginningOfCurrentWordBufferPosition(options?: {
			wordRegex?: RegExp;
			includeNonWordCharacters?: boolean;
			allowPrevious: boolean;
		}): TextBuffer.IPoint;
		getEndOfCurrentWordBufferPosition(options?: {
			wordRegex?: RegExp;
			includeNonWordCharacters?: boolean;
		}): TextBuffer.IPoint;
		getBeginningOfNextWordBufferPosition(options?: { wordRegex: RegExp }): TextBuffer.IPoint;
		getCurrentWordBufferRange(options?: { wordRegex: RegExp }): TextBuffer.IPoint;
		getCurrentLineBufferRange(options?: { includeNewline: boolean }): TextBuffer.IPoint;
		getCurrentParagraphBufferRange(): TextBuffer.IRange;
		getCurrentWordPrefix(): string;

		setVisible(visible: boolean): void;
		isVisible(): boolean;
		updateVisibility(): void;

		/** Compares this cursor's buffer position to another cursor's. */
		compare(other: ICursor): boolean;

		/** Prevents the cursor from causing scrolling. */
		clearAutoscroll(): void;
		/** Deselects the current selection. */
		clearSelection(): void;
		/** Gets the RegExp used by the cursor to determine what is a "word". */
		wordRegExp(options?: { includeNonWordCharacters: boolean }): RegExp;
	}

	interface ILanguageMode {
		// TBD
	}

	// DONE
	interface ISelectionInsertTextOptions {
		select?: boolean;
		autoIndent?: boolean;
		autoIndentNewline?: boolean;
		autoDecreaseIndent?: boolean;
		normalizeLineEndings?: boolean;
		undo?: string;
	}

	/** Interface for Selection class in Atom. */
	interface ISelection /* extends Theorist.Model */ {
		cursor: ICursor;
		marker: Marker;
		editor: ITextEditor;
		initialScreenRange: any;
		wordwise: boolean;
		needsAutoscroll: boolean;
		retainSelection: boolean;

		destroy():any;
		finalize():any;
		clearAutoscroll():any;
		isEmpty():boolean;
		isReversed():boolean;
		isSingleScreenLine():boolean;
		getScreenRange():TextBuffer.IRange;
		setScreenRange(screenRange:any, options:any):any;
		getBufferRange():TextBuffer.IRange;
		setBufferRange(bufferRange:any, options:any):any;
		getBufferRowRange():number[];
		autoscroll():void;
		getText():string;
		clear():boolean;
		selectWord():TextBuffer.IRange;
		expandOverWord():any;
		selectLine(row?:any):TextBuffer.IRange;
		expandOverLine():boolean;
		selectToScreenPosition(position:any):any;
		selectToBufferPosition(position:any):any;
		selectRight():boolean;
		selectLeft():boolean;
		selectUp(rowCount?:any):boolean;
		selectDown(rowCount?:any):boolean;
		selectToTop():any;
		selectToBottom():any;
		selectAll():any;
		selectToBeginningOfLine():any;
		selectToFirstCharacterOfLine():any;
		selectToEndOfLine():any;
		selectToBeginningOfWord():any;
		selectToEndOfWord():any;
		selectToBeginningOfNextWord():any;
		selectToPreviousWordBoundary():any;
		selectToNextWordBoundary():any;
		addSelectionBelow():any;
		getGoalBufferRange():any;
		addSelectionAbove():any[];
		insertText(text:string, options?: ISelectionInsertTextOptions): TextBuffer.IRange;
		normalizeIndents(text:string, indentBasis:number):any;
		indent(_arg?:any):any;
		indentSelectedRows():TextBuffer.IRange[];
		setIndentationForLine(line:string, indentLevel:number):any;
		backspace():any;
		backspaceToBeginningOfWord():any;
		backspaceToBeginningOfLine():any;
		delete():any;
		deleteToEndOfWord():any;
		deleteSelectedText():any;
		deleteLine():any;
		joinLines():any;
		outdentSelectedRows():any[];
		autoIndentSelectedRows():any;
		toggleLineComments():any;
		cutToEndOfLine(maintainClipboard:any):any;
		cut(maintainClipboard:any):any;
		copy(maintainClipboard:any):any;
		fold():any;
		modifySelection(fn:()=>any):any;
		plantTail():any;
		intersectsBufferRange(bufferRange:any):any;
		intersectsWith(otherSelection:any):any;
		merge(otherSelection:any, options:any):any;
		compare(otherSelection:any):any;
		getRegionRects():any[];
		screenRangeChanged():any;
	}

	// DONE
	interface ISelectionChangeEvent {
		oldBufferRange: TextBuffer.IRange;
		oldScreenRange: TextBuffer.IRange;
		newBufferRange: TextBuffer.IRange;
		newScreenRange: TextBuffer.IRange;
		/** The selection that triggered the event. */
		selection: ISelection;
	}

	// DONE
	interface IDecorationParams {
		type: string;
		class: string;
		onlyHead?: boolean;
		onlyEmpty?: boolean;
		onlyNonEmpty?: boolean;
		position?: string;
		gutterName?: string;
	}

	// DONE
	interface IScanIteratorFunc {
		(arg: {
			match: RegExpExecArray,
			matchText: string,
			range: TextBuffer.IRange,
			stop: Function,
			replace: (replacement: string) => void
		}): void;
	}

	// DONE... but need to rename it to IDecoration and make it an interface
	/** A visual representation of a marker in the text editor. */
	export class Decoration {
		/** New instances should be constructed indirectly via the TextEditor class. */
		constructor(marker: Marker, displayBuffer: IDisplayBuffer, properties: IDecorationParams);
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

	// DONE... but need to rename it to IGutterContainer and make it an interface
	export class GutterContainer {
		constructor(textEditor: ITextEditor);
		destroy(): void;
		// all methods below are also currently available in ITextEditor
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

	// DONE... but need to rename it to IGutter and make it an interface
	/** A gutter within a text editor. */
	export class Gutter {
		name: string;
		gutterContainer: GutterContainer;

		constructor(gutterContainer: GutterContainer, options: {
			name: string;
			priority?: number;
			visible?: boolean;
		});
		destroy(): void;
		hide(): void;
		show(): void;
		isVisible(): boolean;
		decorateMarker(marker: Marker, options?: IDecorationParams): Decoration;
		onDidChangeVisible(callback: (gutter: Gutter) => void): Disposable;
		onDidDestroy(callback: Function): Disposable;
	}

	// DONE... but need to rename to TextEditor and make it a class
	/** Interface for TextEditor class in Atom. */
	interface ITextEditor {
		id: number;

		// Event Subscription

		onDidChangeTitle(callback: Function): EventKit.Disposable;
		onDidChangePath(callback: Function): EventKit.Disposable;
		onDidChange(callback: Function): EventKit.Disposable;
		onDidStopChanging(callback: Function): EventKit.Disposable;
		onDidChangeCursorPosition(callback: (e: ICursorChangeEvent) => void): EventKit.Disposable;
		onDidChangeSelectionRange(callback: (e: ISelectionChangeEvent) => void): EventKit.Disposable;
		onDidChangeSoftWrapped(callback: Function): EventKit.Disposable;
		onDidChangeEncoding(callback: Function): EventKit.Disposable;
		observeGrammar(callback: (grammar: IGrammar) => void): EventKit.Disposable;
		onDidChangeGrammar(callback: (grammar: IGrammar) => void): EventKit.Disposable;
		onDidChangeModified(callback: Function): EventKit.Disposable;
		onDidConflict(callback: Function): EventKit.Disposable;
		onWillInsertText(callback: (e: { text: string, cancel: Function }) => void): EventKit.Disposable;
		onDidInsertText(callback: (e: { text: string }) => void): EventKit.Disposable;
		onDidSave(callback: (e: { path: string }) => void): EventKit.Disposable;
		onDidDestroy(callback: Function): EventKit.Disposable;
		observeCursors(callback: (cursor: ICursor) => void): EventKit.Disposable;
		onDidAddCursor(callback: (cursor: ICursor) => void): EventKit.Disposable;
		onDidRemoveCursor(callback: (cursor: ICursor) => void): EventKit.Disposable;
		observeSelections(callback: (selection: ISelection) => void): EventKit.Disposable;
		onDidAddSelection(callback: (selection: ISelection) => void): EventKit.Disposable;
		onDidRemoveSelection(callback: (selection: ISelection) => void): EventKit.Disposable;
		observeDecorations(callback: (decoration: Decoration) => void): EventKit.Disposable;
		onDidAddDecoration(callback: (decoration: Decoration) => void): EventKit.Disposable;
		onDidRemoveDecoration(callback: (decoration: Decoration) => void): EventKit.Disposable;
		onDidChangePlaceholderText(callback: (placeholderText: string) => void): EventKit.Disposable;
		onDidChangeCharacterWidths(callback: Function): EventKit.Disposable;
		onDidChangeScrollTop(callback: Function): EventKit.Disposable;
		onDidChangeScrollLeft(callback: Function): EventKit.Disposable;
		onDidChangeIcon(callback: Function): EventKit.Disposable;
		onDidUpdateMarkers(callback: Function): EventKit.Disposable;

		getBuffer(): TextBuffer.ITextBuffer;
		getURI(): string;
		/** Creates a new text editor with an initial state based on this one. */
		copy(): ITextEditor;
		setVisible(visible: boolean): void;
		setLineNumberGutterVisible(visible: boolean): boolean;
		isLineNumberGutterVisible(): boolean;
		onDidChangeLineNumberGutterVisible(callback: (visible: boolean) => void): EventKit.Disposable;

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
		getTextInBufferRange(range: IRangeOrArray);
		getLineCount(): number;
		getScreenLineCount(): number;
		getLastBufferRow(): number;
		getLastScreenRow(): number;
		lineTextForBufferRow(bufferRow: number): string;
		lineTextForScreenRow(screenRow: number): string;
		tokenizedLineForScreenRow(screenRow: number): ITokenizedLine;
		tokenizedLinesForScreenRows(start: number, end: number): ITokenizedLine[];
		bufferRowForScreenRow(screenRow: number): number;
		bufferRowsForScreenRows(startRow, endRow): number[];
		screenRowForBufferRow(bufferRow: number): number;
		getMaxScreenLineLength(): number;
		getLongestScreenRow(): number;
		bufferRangeForBufferRow(row: number, options?: { includeNewline: boolean }): TextBuffer.IRange;
		getTextInRange(): string;
		isBufferRowBlank(): boolean;
		nextNonBlankBufferRow(): number;
		getEofBufferPosition(): number;
		getCurrentParagraphBufferRange(): IRange;

		// Mutating Text

		setText(text: string): void;
		setTextInBufferRange(range: IRangeOrArray, text: string, options?: {
			normalizeLineEndings?: boolean;
			skip?: string;
		}): IRange;
		/** Replaces each selection with the given text. */
		insertText(text: string, options?: ISelectionInsertTextOptions): IRange[] | boolean;
		/** Replaces each selection with a newline. */
		insertNewline(): IRange[] | boolean;
		delete(): void;
		backspace(): void;
		mutateSelectedText<T>(fn: (selection: ISelection, index: number) => T, groupingInterval: number): T[];
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

		undo();
		redo();
		/** Batch multiple operations into a transaction which can be undone/redone in a single step. */
		transact<T>(fn: () => T): T;
		abortTransaction(): void;
		createCheckpoint(): number;
		revertToCheckpoint(checkpoint: Object): boolean;
		groupChangesSinceCheckpoint(checkpoint: Object): boolean;

		// Coordinates

		screenPositionForBufferPosition(bufferPosition: IPointOrArray, options?: any): IPoint;
		bufferPositionForScreenPosition(screenPosition: IPointOrArray, options?: any): IPoint;
		screenRangeForBufferRange(bufferRange: IPointOrArray): IRange;
		bufferRangeForScreenRange(screenRange: IPointOrArray): IRange;
		clipBufferPosition(bufferPosition: IPointOrArray): IPoint;
		clipBufferRange(range: IRangeOrArray): IRange;
		clipScreenPosition(screenPosition: IPointOrArray, options?: {
			wrapBeyondNewlines: boolean,
			wrapAtSoftNewlines: boolean,
			screenLine: boolean
		}): IPoint;
		clipScreenRange(range: IRange, options?: any): IRange;

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

		markBufferRange(range: IRangeOrArray, options?: any): Marker;
		markScreenRange(range: IRangeOrArray, options?: any): Marker;
		markBufferPosition(bufferPosition: IPointOrArray, options?: any): Marker;
		markScreenPosition(screenPosition: IPointOrArray, options?: any): Marker;
		findMarkers(properties: any): Marker[];
		getMarker(id: number): Marker;
		getMarkers(): Marker[];
		getMarkerCount();
		destroyMarker(id: number): void;

		// Cursors

		getCursorBufferPosition(): IPoint;
		getCursorBufferPositions(): IPoint[];
		setCursorBufferPosition(position: IPointOrArray, options?: { autoscroll: boolean }): void;
		getCursorAtScreenPosition(position: IPointOrArray): ICursor;
		getCursorScreenPosition(): IPoint;
		getCursorScreenPositions(): IPoint[];
		setCursorScreenPosition(position: IPointOrArray, options?: { autoscroll: boolean }): void;
		addCursorAtBufferPosition(bufferPosition: IPointOrArray, options?: { autoscroll: boolean }): ICursor;
		addCursorAtScreenPosition(screenPosition: IPointOrArray, options?: { autoscroll: boolean }): ICursor;
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
		getLastCursor(): ICursor;
		getWordUnderCursor(options?: { wordRegex: RegEx }): string;
		getCursors(): ICursor[];
		getCursorsOrderedByBufferPosition(): ICursor[];
		addCursor(marker: Marker): ICursor;
		removeCursor(cursor: ICursor): void;
		moveCursors(fn: (cursor: ICursor) => void): void;
		mergeCursors(): void;
		preserveCursorPositionOnBufferReload(): void;

		// Selections

		getSelectedText(): string;
		getSelectedBufferRange(): IRange;
		getSelectedBufferRanges(): IRange[];
		setSelectedBufferRange(bufferRange: IRangeOrArray, options?: { reversed: boolean }): void;
		setSelectedBufferRanges(bufferRanges: IRangeOrArray[], options?: { reversed: boolean }): void;
		getSelectedScreenRange(): IRange;
		getSelectedScreenRanges(): IRange[];
		setSelectedScreenRange(screenRange: IRangeOrArray, options?: { reversed: boolean }): void;
		setSelectedScreenRanges(screenRanges: IRangeOrArray[], options?: { reversed: boolean }): void;
		addSelectionForBufferRange(bufferRange: IRangeOrArray, options?: { reversed: boolean }): ISelection;
		addSelectionForScreenRange(screenRange: IRangeOrArray, options?: { reversed: boolean }): ISelection;
		selectToBufferPosition(position: IPointOrArray): void;
		selectToScreenPosition(position: IPointOrArray): void;
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
		selectMarker(marker: Marker): IRange;
		getLastSelection(): ISelection;
		getSelections(): ISelection[];
		getSelectionsOrderedByBufferPosition(): ISelection[];
		selectionIntersectsBufferRange(bufferRange: IRangeOrArray): boolean;

		// Search and Replace

		scan(regex: RegEx, iterator: IScanIteratorFunc): void;
		scanInBufferRange(regex: RegEx, range: IRangeOrArray, iterator: IScanIteratorFunc): void;
		backwardsScanInBufferRange(regex: RegEx, range: IRangeOrArray, iterator: IScanIteratorFunc): void;

		// Tab Behavior

		getSoftTabs(): boolean;
		setSoftTabs(softTabs: boolean): void;
		toggleSoftTabs(): boolean;
		getTabLength(): number;
		setTabLength(): void;
		usesSoftTabs(): boolean;
		getTabText(): string;
		normalizeTabsInBufferRange(bufferRange: IRangeOrArray): void;

		// Soft Wrap Behavior

		isSoftWrapped(): boolean;
		setSoftWrapped(softWrapped: boolean): boolean;
		toggleSoftWrapped(): boolean;
		getSoftWrapColumn(): number;

		// Indentation

		indentationForBufferRow(bufferRow: number): number;
		setIndentationForBufferRow(bufferRow: number, newLevel: number, options?: { preserveLeadingWhitespace: boolean }): IRange;
		indentSelectedRows(): void;
		outdentSelectedRows(): void;
		indentLevelForLine(line: string): number;
		autoIndentSelectedRows(): void;
		indent(options?: { autoIndent: boolean }): void;
		buildIndentString(number: number, column?: number): string;

		// Grammars

		getGrammar(): IGrammar;
		setGrammar(grammar: IGrammar): void;
		reloadGrammar(): void;

		// Syntax Scopes

		getRootScopeDescriptor(): IScopeDescriptor;
		scopeDescriptorForBufferPosition(bufferPosition: IPointOrArray): IScopeDescriptor;
		bufferRangeForScopeAtCursor(scopeSelector: string): IRange;
		isBufferRowCommented(bufferRow: number): boolean;
		logCursorScope(): void;
		tokenForBufferPosition(bufferPosition: IPointOrArray): IToken;

		// Clipboard Operations

		copySelectedText(): void;
		cutSelectedText(): void;
		pasteText(options?: ISelectionInsertTextOptions): void;
		cutToEndOfLine(): void;

		// Folding

		foldCurrentRow(): IFold;
		unfoldCurrentRow(): void;
		foldBufferRow(bufferRow: number): IFold;
		unfoldBufferRow(bufferRow: number): void;
		foldSelectedLines(): void;
		foldAll(): void;
		unfoldAll(): void;
		foldAllAtIndentLevel(level: number): void;
		isFoldableAtBufferRow(bufferRow: number): boolean;
		isFoldableAtScreenRow(screenRow: number): boolean;
		toggleFoldAtBufferRow(bufferRow: number): IFold | void;
		isFoldedAtCursorRow(bufferRow: number): boolean;
		isFoldedAtScreenRow(screenRow: number): boolean;
		createFold(startRow: number, endRow: number): IFold;
		destroyFoldWithId(id: number): void;
		destroyFoldsIntersectingBufferRange(bufferRange: IRangeOrArray): void;
		destroyFoldsContainingBufferRange(bufferRange: IRangeOrArray): void;
		largestFoldContainingBufferRow(bufferRow: number): IFold;
		largestFoldStartingAtScreenRow(screenRow: number): IFold;
		outermostFoldsInBufferRowRange(startRow: number, endRow: number): IFold[];

		// Scrolling

		scrollToCursorPosition(options?: { center: boolean }): void;
		scrollToBufferPosition(bufferPosition: IPointOrArray, options: { center: boolean }): void;
		scrollToScreenPosition(screenPosition: IPointOrArray, options: { center: boolean }): void;
		scrollToTop(): number;
		scrollToBottom(): number;
		scrollToScreenRange(screenRange: IRangeOrArray, options?: {
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

	interface IPane /* extends Theorist.Model */ {
        itemForURI: (uri:string)=>ITextEditor;
		items:any[];
		activeItem:any;

		serializeParams():any;
		deserializeParams(params:any):any;
		getViewClass():any; // return type are PaneView
		isActive():boolean;
		isDestroyed():boolean;
		focus():void;
		blur():void;
		activate():void;
		getPanes():IPane[];
		getItems():any[];
		getActiveItem():any;
		getActiveEditor():any;
		itemAtIndex(index:number):any;
		activateNextItem():any;
		activatePreviousItem():any;
		getActiveItemIndex():number;
		activateItemAtIndex(index:number):any;
		activateItem(item:any):any;
		addItem(item:any, index:number):any;
		addItems(items:any[], index:number):any[];
		removeItem(item:any, destroying:any):void;
		moveItem(item:any, newIndex:number):void;
		moveItemToPane(item:any, pane:IPane, index:number):void;
		destroyActiveItem():boolean; // always return false
		destroyItem(item:any):boolean;
		destroyItems():any[];
		destroyInactiveItems():any[];
		destroy():void;
		destroyed():any[];
		promptToSaveItem(item:any):boolean;
		saveActiveItem():void;
		saveActiveItemAs():void;
		saveItem(item:any, nextAction:Function):void;
		saveItemAs(item:any, nextAction:Function):void;
		saveItems():any[];
		itemForUri(uri:any):any;
		activateItemForUri(uri:any):any;
		copyActiveItem():void;
		splitLeft(params:any):IPane;
		splitRight(params:any):IPane;
		splitUp(params:any):IPane;
		splitDown(params:any):IPane;
		split(orientation:string, side:string, params:any):IPane;
		findLeftmostSibling():IPane;
		findOrCreateRightmostSibling():IPane;
	}

// https://atom.io/docs/v0.84.0/advanced/serialization
	interface ISerializationStatic<T> {
		deserialize(data:ISerializationInfo):T;
		new (data:T): ISerialization;
	}

	interface ISerialization {
		serialize():ISerializationInfo;
	}

	interface ISerializationInfo {
		deserializer: string;
	}

	interface IBrowserWindow {
		getPosition():number[];
		getSize():number[];
	}

	interface IProjectStatic {
		pathForRepositoryUrl(repoUrl:string):string;

		new (arg?:{path:any; buffers:any[];}):IProject;
	}

	interface IProject /* extends Theorist.Model */ {
		// Serializable.includeInto(Project);

		path:string;
		/** deprecated */
		rootDirectory?:PathWatcher.IDirectory;
		rootDirectories:PathWatcher.IDirectory[];

		serializeParams():any;
		deserializeParams(params:any):any;
		destroyed():any;
		destroyRepo():any;
		destroyUnretainedBuffers():any;
		getRepo():IGit;
		getPath():string;
		setPath(projectPath:string):any;
		getRootDirectory():PathWatcher.IDirectory;
		resolve(uri:string):string;
		relativize(fullPath:string):string;
		contains(pathToCheck:string):boolean;
		open(filePath:string, options?:any):Q.Promise<ITextEditor>;
		openSync(filePath:string, options?:any):ITextEditor;
		getBuffers():TextBuffer.ITextBuffer;
		isPathModified(filePath:string):boolean;
		findBufferForPath(filePath:string):TextBuffer.ITextBuffer;
		bufferForPathSync(filePath:string):TextBuffer.ITextBuffer;
		bufferForPath(filePath:string):Q.Promise<TextBuffer.ITextBuffer>;
		bufferForId(id:any):TextBuffer.ITextBuffer;
		buildBufferSync(absoluteFilePath:string):TextBuffer.ITextBuffer;
		buildBuffer(absoluteFilePath:string):Q.Promise<TextBuffer.ITextBuffer>;
		addBuffer(buffer:TextBuffer.ITextBuffer, options?:any):any;
		addBufferAtIndex(buffer:TextBuffer.ITextBuffer, index:number, options?:any):any;
		scan(regex:any, options:any, iterator:any):Q.Promise<any>;
		replace(regex:any, replacementText:any, filePaths:any, iterator:any):Q.Promise<any>;
		buildEditorForBuffer(buffer:any, editorOptions:any):ITextEditor;
		eachBuffer(...args:any[]):any;

        onDidChangePaths(callback: Function): Disposable;
	}

	interface IWorkspaceStatic {
		new():IWorkspace;
	}

	interface IWorkspacePanelOptions{
		item:any;
		visible?:boolean;
		priority?:number;
	}

	interface Panel{
		getItem():any;
		getPriority():any;
		isVisible():boolean;
		show();
		hide();
	}

	interface IWorkspace {
		addBottomPanel(options:IWorkspacePanelOptions):Panel;
		addLeftPanel(options:IWorkspacePanelOptions):Panel;
		addRightPanel(options:IWorkspacePanelOptions):Panel;
		addTopPanel(options:IWorkspacePanelOptions):Panel;
		addModalPanel(options:IWorkspacePanelOptions):Panel;
        addOpener(opener: Function): any;

		deserializeParams(params:any):any;
		serializeParams():{paneContainer:any;fullScreen:boolean;};
        eachEditor(callback: Function): void;
		getTextEditors():ITextEditor[];
		open(uri:string, options:any):Q.Promise<View>;
		openLicense():void;
		openSync(uri:string, options:any):any;
        openUriInPane(uri: string, pane: any, options: any): Q.Promise<View>;
        observeTextEditors(callback: Function): Disposable;
		reopenItemSync():any;
		registerOpener(opener:(urlToOpen:string)=>any):void;
		unregisterOpener(opener:Function):void;
		getOpeners():any;
		getActivePane(): IPane;
		getActivePaneItem(): IPane;
		getActiveTextEditor(): ITextEditor;
		getPanes():any;
		saveAll():void;
		activateNextPane():any;
		activatePreviousPane():any;
		paneForURI: (uri:string) => IPane;
		saveActivePaneItem():any;
		saveActivePaneItemAs():any;
		destroyActivePaneItem():any;
		destroyActivePane():any;
		increaseFontSize():void;
		decreaseFontSize():void;
		resetFontSize():void;
		itemOpened(item:any):void;
		onPaneItemDestroyed(item:any):void;
		destroyed():void;

		onDidChangeActivePaneItem(item:any):Disposable;
	}

	interface IAtomSettings {
		appVersion: string;
		bootstrapScript: string;
		devMode: boolean;
		initialPath: string;
		pathToOpen: string;
		resourcePath: string;
		shellLoadTime: number;
		windowState:string;
	}

	interface IAtomState {
		mode:string;
		packageStates:any;
		project:any;
		syntax:any;
		version:number;
		windowDimensions:any;
		workspace:any;
	}

	interface IDeserializerManager {
		deserializers:Function;
		add:Function;
		remove:Function;
		deserialize:Function;
		get:Function;
	}

	interface IConfig {
		get(keyPath:string):any;
		// TBD
	}

	interface IKeymapManager {
		defaultTarget:HTMLElement;
		// TBD
	}

	// DONE
	// Interface for Package class in Atom
	interface IPackage {
		/** Is this package compatible with this version of Atom? */
		isCompatible(): boolean;
	}

	// DONE
	// Interface for PackageManager class in Atom
	interface IPackageManager {
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
		enablePackage(name: string): IPackage;
		/**
		 * Disable the package with the given name.
		 * @return The package that was disabled or null if it's not loaded.
		 */
		disablePackage(name: string): IPackage;
		/** Is the package with the given name disabled? */
		isPackageDisabled(name: string): boolean;

		/** Get an array of active packages. */
		getActivePackages(): IPackage[];
		/** Get an active package with the given name. */
		getActivePackage(name: string): IPackage;
		/** Is the package with the given name active? */
		isPackageActive(name: string): boolean;

		/** Get an array of all loaded packages. */
		getLoadedPackages(): IPackage[];
		/** Get all loaded packages of a certain type. */
		getLoadedPackagesForTypes(types: string[]): IPackage[];
		/** Get a loaded package matching the given name. */
		getLoadedPackage(name: string): IPackage;
		/** Is the package with the given name loaded? */
		isPackageLoaded(name: string): boolean;

		/** Get all the available package paths. */
		getAvailablePackagePaths(): string[];
		/** Get all the available package names. */
		getAvailablePackageNames(): string[];
		/** Get all the available package metadata. */
		getAvailablePackageMetadata(): any[];
	}

	interface IThemeManager {
		// TBD
	}

	interface IContextMenuManager {
		// TBD
	}

	interface IMenuManager {
		// TBD
	}

	interface IClipboard {
		write(text:string, metadata?:any):any;
		read():string;
	}

	// DONE
	interface IWindowDimensions {
		x: number;
		y: number;
		width: number;
		height: number;
	}

	// DONE
	interface IStorageFolder {
		store(name: string, value: any): void;
		load(name: string): any;
		pathForKey(name: string): string;
		getPath(): string;
	}

	// DONE
	interface ITooltipManager {
		add(target: HTMLElement, options: any): Disposable;
	}

	// DONE
	interface INotificationOptions {
		detail?: string;
		dismissable?: boolean;
		icon?: string;
	}

	// DONE
	export class Notification {
		constructor(type: string, message: string, options?: INotificationOptions);
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

	// DONE
	interface INotificationManager {
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

	// DONE
	interface IGrammarRegistry {
		selectGrammar(filePath: string, fileContents: string): IGrammar;
	}

	// DONE
	interface IAtomHTMLStyleElement extends HTMLStyleElement {
		sourcePath: string;
		context: string;
	}

  // DONE
	interface IStyleManager {
		observeStyleElements(callback: (styleElement: IAtomHTMLStyleElement) => void): Disposable;
		onDidAddStyleElement(callback): Disposable;
		onDidRemoveStyleElement(callback): Disposable;
		onDidUpdateStyleElement(callback): Disposable;
		getStyleElements(): IAtomHTMLStyleElement[];
		getUserStyleSheetPath(): string;
	}

	interface IBufferedNodeProcessStatic {
		new (arg:any):IBufferedNodeProcess;
	}

	interface IBufferedNodeProcess extends IBufferedProcess {
	}

	interface IBufferedProcessStatic {
		new (arg:any):IBufferedProcess;
	}

	interface IBufferedProcess {
		process:Function;
		killed:boolean;

		bufferStream:Function;
		kill:Function;
	}

	interface ITokenizedBuffer {
		// TBD
	}

	interface ITokenizedLine {
		// TBD
	}

	interface IToken {
		// TBD
	}

	interface IFoldStatic {
		new (displayBuffer:IDisplayBuffer, marker:Marker):IFold;
		// TBD
	}

	interface IFold {
		id:number;
		displayBuffer:IDisplayBuffer;
		marker:Marker;

		// TBD
	}

	// DONE
	interface IMarkerChangeEvent {
		oldHeadPosition: IPoint;
		newHeadPosition: IPoint;
		oldTailPosition: IPoint;
		newTailPosition: IPoint;
		wasValid: boolean;
		isValid: boolean;
		hadTail: boolean;
		hasTail: boolean;
		oldProperties: any;
		newProperties: any;
		/**
		* Indicates whether the change was caused by a textual change to the buffer, or whether
		* the marker was minpulated directly via its public API.
		*/
		textChanged: boolean;
	}

	// previously known as IDisplayBufferMarker
	export class Marker {
		id: number;
		bufferMarker: TextBuffer.IMarker;
		displayBuffer: IDisplayBuffer;

		/** New instances should be constructed indirectly via the TextEditor class. */
		constructor(args: { bufferMarker: TextBuffer.IMarker; displayBuffer: IDisplayBuffer });
		/** Destroys the marker after which the marker cannot be restored by undo/redo operations. */
		destroy(): void;
		/** Creates and returns a new marker with the same properties as this one. */
		copy(properties?: any): Marker;

		/** Invokes the given callback when the state of the marker changes. */
		onDidChange(callback: (e: IMarkerChangeEvent) => void): EventKit.Disposable;
		/** Invokes the given callback when the marker is destroyed. */
		onDidDestroy(callback: Function): EventKit.Disposable;

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

		getBufferRange(): IRange;
		setBufferRange(bufferRange: IRangeOrArray, properties?: any): void;
		getScreenRange(): IRange;
		setScreenRange(screenRange: IRangeOrArray, properties?: any): void;
		getStartBufferPosition(): IPoint;
		getStartScreenPosition(): IPoint;
		getEndBufferPosition(): IPoint;
		getEndScreenPosition(): IPoint;
		getHeadBufferPosition(): IPoint;
		setHeadBufferPosition(bufferPosition: IPointOrArray, properties?: any): void;
		getHeadScreenPosition(): IPoint;
		setHeadScreenPosition(screenPosition: IPointOrArray, properties?: any): void;
		getTailBufferPosition(): IPoint;
		setTailBufferPosition(bufferPosition: IPointOrArray): void;
		getTailScreenPosition(): IPoint;
		setTailScreenPosition(screenPosition: IPointOrArray, options?: any): void;
		hasTail(): boolean;
		plantTail(): boolean;
		clearTail(properties?: any): boolean;
	}

	interface ITransaction {
		// TBD
	}

	interface ITaskStatic {
		new(taskPath:any):ITask;
	}

	interface ITask {
		// TBD
	}

	// DONE
	interface IAtomStatic extends ISerializationStatic<IAtom> {
		version: number;
		loadOrCreate(mode: string): IAtom;
		loadState(mode: any): void;
		getStateKey(paths: string[], mode: string): string;
		getConfigDirPath(): string;
		getStorageFolder(): IStorageFolder;
		getLoadSettings(): IAtomSettings;
		updateLoadSettings(key: string, value: any): void;
		getCurrentWindow(): IBrowserWindow;

		new(state: IAtomState): IAtom;
	}

	// DONE
	interface IAtom {
		commands: ICommandRegistry;
		config: IConfig;
		clipboard: IClipboard;
		contextManu: IContextMenuManager;
		menu: IMenuManager;
		keymaps: IKeymapManager;
		tooltips: ITooltipManager;
		notifications: INotificationManager;
		project: IProject;
		grammars: IGrammarRegistry;
		packages: IPackageManager;
		themes: IThemeManager;
		styles: IStyleManager;
		deserializers: IDeserializerManager;
		views: IViewRegistry;
		workspace: IWorkspace;

		constructor: IAtomStatic;
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
		getCurrentWindow(): IBrowserWindow;
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

declare var atom: AtomCore.IAtom;

declare module "atom" {
	var BufferedNodeProcess: AtomCore.IBufferedNodeProcessStatic;
	var BufferedProcess: AtomCore.IBufferedProcessStatic;
	// TODO: var GitRepository
	var Notification: typeof AtomCore.Notification;
	var TextBuffer: TextBuffer.ITextBufferStatic;
	var Point: TextBuffer.IPointStatic;
	var Range: TextBuffer.IRangeStatic;
	// TODO: var File
	// TODO: var Directory
	var Emitter: typeof EventKit.Emitter;
  var Disposable: typeof EventKit.Disposable;
  var CompositeDisposable: typeof EventKit.CompositeDisposable;
	var Task: AtomCore.ITaskStatic;
	// TODO: var TextEditor
}
