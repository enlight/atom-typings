// Type definitions for text-buffer 6.3.7
// Project: https://github.com/atom/text-buffer
// Definitions by: vvakame <https://github.com/vvakame/>, Vadim Macagon <https://github.com/enlight/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../atom/atom.d.ts" />
/// <reference path="../q/Q.d.ts" />
/// <reference path="../serializable/serializable.d.ts" />

declare module AtomTextBuffer {

	type ISerializable = AtomSerializable.ISerializable;
	/** A point, point-compatible array, or point-compatible object. */
	type IPointOrArray = IPoint | Array<number> | { row: number; column: number };
	/** A range or range-compatible array. */
	type IRangeOrArray = IRange | Array<IPointOrArray>;

	/** Static side of Point class. */
	interface IPointStatic {
		/**
		 * Converts any point-compatible object to a [[Point]].
		 *
		 * @param copy Indicates whether to force the copying of the given object if it's already
		 *             a [[Point]].
		 */
		fromObject(object: IPointOrArray, copy?: boolean): IPoint;
		/** @return The [[Point]] that is earlier in the buffer. */
		min(point1: IPointOrArray, point2: IPointOrArray): IPoint;
		max(point1: IPointOrArray, point2: IPointOrArray): IPoint;

		ZERO: IPoint;
		INFINITY: IPoint;

		prototype: IPoint;
		new (row?: number, column?: number): IPoint;
	}

	/** Instance side of Point class. */
	interface IPoint {
		constructor: IPointStatic;
		/* A zero-indexed row. */
		row: number;
		/* A zero-indexed column. */
		column: number;

		/** @return A new [[Point]] with the same row and column. */
		copy(): IPoint;
		/** @return A new [[Point]] with the row and column negated. */
		negate(): IPoint;

		// Operations

		/**
		 * Makes this point immutable.
		 *
		 * @return `this`
		 */
		freeze(): IPoint;
		/**
		 * Builds a new point by adding the rows and columns of the given point to this one.
		 *
		 * @param other A point whose row and column will be added to this point.
		 * @return A new point.
		 */
		translate(other: IPointOrArray): IPoint;
		/** Builds a new point by traversing the rows and columns of the given point. */
		traverse(other: IPointOrArray): IPoint;

		splitAt(column: number): IPoint[];

		// Comparison

		/**
		 * @return `-1` if this point precedes `other`,
		 *         `0` if this point is equivalent to `other`,
		 *         `1` if this point follows `other`.
		 */
		compare(other: IPointOrArray): number;
		isEqual(other: IPointOrArray): boolean;
		isLessThan(other: IPointOrArray): boolean;
		isLessThanOrEqual(other: IPointOrArray): boolean;
		isGreaterThan(other: IPointOrArray): boolean;
		isGreaterThanOrEqual(other: IPointOrArray): boolean;

		// Conversion

		/** @return An array of this point's row and column. */
		toArray(): number[];
		/** @return An array of this point's row and column. */
		serialize(): number[];
	}

	/** Represents a point in a buffer in row/column coordinates. */
	var Point: IPointStatic;

	/** Static side of Range class. */
	interface IRangeStatic {
		/**
		 * Converts any range-compatible object to a [[Range]].
		 *
		 * @param copy Indicates whether to force the copying of the given object if it's already
		 *             a [[Range]].
		 */
		fromObject(object: IRangeOrArray, copy?: boolean): IRange;
		/**
		 * Creates a range based on an optional starting point and the given text.
		 *
		 * @param startPoint Start of the new range, defaults to `(0, 0)`.
		 * @param text String that should be used to determine the end of the new range.
		 *             The range will have as many rows as the text has lines, and an end column based
		 *             on the length of the last line.
		 */
		fromText(startPoint: IPointOrArray, text: string): IRange;
		fromText(text: string):IRange;
		/**
		 * Creates a range that starts at the given point and ends at the start point plus the
		 * given row and column deltas.
		 */
		fromPointWithDelta(startPoint: IPointOrArray, rowDelta: number, columnDelta: number): IRange;
		/**
		 * Constructs a new range from a previously serialized one.
		 *
		 * @param array Result of [[Range.serialize]].
		 * @return A new range.
		 */
		deserialize(array: Array<number[]>): IRange;

		prototype: IRange;
		new (pointA: IPointOrArray, pointB: IPointOrArray): IRange;
	}

	/** Instance side of Range class. */
	interface IRange {
		constructor: IRangeStatic;

		start: IPoint;
		end: IPoint;

		/** @return A new [[Range]] with the same start and end positions. */
		copy(): IRange;
		/** @return A new range with the start and end positions negated. */
		negate(): IRange;
		/** @return Serialized object that can be passed to [[Point.deserialize]]. */
		serialize(): Array<number[]>;

		// Range Details

		isEmpty(): boolean;
		isSingleLine(): boolean;
		getRowCount(): number;
		getRows(): number[];

		// Operations

		/**
		 * Makes this range immutable.
		 *
		 * @return `this`
		 */
		freeze(): IRange;
		/** @return A new range that contains this range and the `otherRange`. */
		union(otherRange: IRange): IRange;
		/**
		 * Creates a new range by translating the this range by the given delta(s).
		 *
		 * @param startDelta A point by which the start of this range should be translated.
		 * @param endDelta A point by which the end of this range should be translated,
		 *                 by default this will be the same as `startDelta`.
		 */
		translate(startDelta: IPointOrArray, endDelta?: IPointOrArray): IRange;
		/** @see [[Point.traverse]] on differences between traversal and translation. */
		traverse(delta: IPointOrArray): IRange;

		// Comparison

		/**
		 * @return `-1` if this range starts before `other` or contains it,
		 *         `0` if this range is equivalent to `other`,
		 *         `1` if this range starts after `other` or is contained by it.
		 */
		compare(other: IRangeOrArray): number;
		isEqual(other: IRangeOrArray): boolean;
		/** @return `true` if this range starts and ends on the same rows as the `other` range. */
		coversSameRows(other: IRange): boolean;
		/**
		 * Checks if this range interesects with another.
		 *
		 * @param exclusive Set to `true` to exclude endpoints when testing for intersection,
		 *                  defaults to `false`.
		 */
		intersectsWith(otherRange: IRange, exclusive?: boolean): boolean;
		/**
		 * Checks if this range contains another.
		 *
		 * @param exclusive Set to `true` to exclude range endpoints from the containment test,
		 *                  defaults to `false`.
		 * @return `true` if this range contains the given range.
		 */
		containsRange(otherRange: IRangeOrArray, exclusive?: boolean): boolean;
		/** @return `true` if this range contains the given point. */
		containsPoint(point: IPointOrArray, exclusive?: boolean): boolean;
		/** @return `true` if this range intersects the given row. */
		intersectsRow(row: number): boolean;
		/** @return `true` if this range intersects the given row range. */
		intersectsRowRange(startRow: number, endRow: number): boolean;

		toDelta(): IPoint;
	}

	/** Represents a region in a buffer in row/column coordinates. */
	var Range: IRangeStatic;

	/** Manages undo/redo for [[TextBuffer]]. */
	interface IHistory {
		// TBD
	}

	interface IMarkerManager {
		// TBD
	}

	interface IMarker {
		// TBD
	}

	interface IBufferPatch {
		// TBD
	}

	interface ITextBufferStatic {
		Point: IPointStatic;
		Range: IRangeStatic;
		newlineRegex: RegExp;
		prototype: TextBuffer;

		new (text: string): TextBuffer;
		new (params: {
			/** Initial text of the buffer. */
			text?: string;
			/** If `true` the buffer will be loaded asynchronously from disk after intialization. */
			load?: boolean;
		}): TextBuffer;
	}

	interface TextBuffer extends ISerializable {
		// Delegator.includeInto(TextBuffer);
		// Serializable.includeInto(TextBuffer);

		cachedText:string;
		stoppedChangingDelay:number;
		stoppedChangingTimeout:any;
		cachedDiskContents:string;
		conflict:boolean;
		file:any; // pathwatcher.IFile
		refcount:number;

		lines:string[];
		lineEndings:string[];
		offsetIndex:any; // span-skip-list.SpanSkipList
		history:IHistory;
		markers:IMarkerManager;
		loaded:boolean;
		digestWhenLastPersisted:string;
		modifiedWhenLastPersisted:boolean;
		useSerializedText:boolean;

		deserializeParams(params:any):any;
		serializeParams():any;

		getText():string;
		getLines():string;
		isEmpty():boolean;
		getLineCount():number;
		getLastRow():number;
		lineForRow(row:number):string;
		getLastLine():string;
		lineEndingForRow(row:number):string;
		lineLengthForRow(row:number):number;
		setText(text:string):IRange;
		setTextViaDiff(text:any):any[];
		setTextInRange(range:IRange, text:string, normalizeLineEndings?:boolean):IRange;
		setTextInRange(range:[[number,number],[number,number]], text:string, config?:{normalizeLineEndings?:boolean}):IRange;
		insert(position:IPoint, text:string, normalizeLineEndings?:boolean):IRange;
		append(text:string, normalizeLineEndings?:boolean):IRange;
		delete(range:IRange):IRange;
		deleteRow(row:number):IRange;
		deleteRows(startRow:number, endRow:number):IRange;
		buildPatch(oldRange:IRange, newText:string, normalizeLineEndings?:boolean):IBufferPatch;
		applyPatch(patch:IBufferPatch):any;
		getTextInRange(range:IRange):string;
		clipRange(range:IRange):IRange;
		clipPosition(position:IPoint):IPoint;
		getFirstPosition():IPoint;
		getEndPosition():IPoint;
		getRange():IRange;
		rangeForRow(row:number, includeNewline?:boolean):IRange;
		characterIndexForPosition(position:IPoint):number;
		characterIndexForPosition(position:[number,number]):number;
		positionForCharacterIndex(offset:number):IPoint;
		getMaxCharacterIndex():number;
		loadSync():TextBuffer;
		load():Q.IPromise<TextBuffer>;
		finishLoading():TextBuffer;
		handleTextChange(event:any):any;
		destroy():any;
		isAlive():boolean;
		isDestroyed():boolean;
		isRetained():boolean;
		retain():TextBuffer;
		release():TextBuffer;
		subscribeToFile():any;
		hasMultipleEditors():boolean;
		reload():any;
		updateCachedDiskContentsSync():string;
		updateCachedDiskContents():Q.IPromise<string>;
		getBaseName():string;
		getPath():string;
		getUri():string;
		setPath(filePath:string):any;
		save():void;
		saveAs(filePath:string):any;
		isModified():boolean;
		isInConflict():boolean;
		destroyMarker(id:any):any;
		matchesInCharacterRange(regex:any, startIndex:any, endIndex:any):any[];
		scan(regex:any, iterator:any):any;
		backwardsScan(regex:any, iterator:any):any;
		replace(regex:any, replacementText:any):any;
		scanInRange(regex:any, range:any, iterator:any, reverse:any):any;
		backwardsScanInRange(regex:any, range:any, iterator:any):any;
		isRowBlank(row:number):boolean;
		previousNonBlankRow(startRow:number):number;
		nextNonBlankRow(startRow:number):number;
		usesSoftTabs():boolean;
		cancelStoppedChangingTimeout():any;
		scheduleModifiedEvents():any;
		emitModifiedStatusChanged(modifiedStatus:any):any;
		logLines(start:number, end:number):void;

		// delegate to history property
		undo():any;
		redo():any;
		transact(fn:Function):any;
		beginTransaction():any;
		commitTransaction():any;
		abortTransaction():any;
		clearUndoStack():any;

		// delegate to markers property
		markRange(range:any, properties:any):any;
		markPosition(range:any, properties:any):any;
		getMarker(id:number):IMarker;
		getMarkers():IMarker[];
		getMarkerCount():number;
	}
}

declare module "text-buffer" {
	var TextBuffer: AtomTextBuffer.ITextBufferStatic;
	export = TextBuffer;
}
