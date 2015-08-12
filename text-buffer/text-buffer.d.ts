// Type definitions for text-buffer 6.3.7
// Project: https://github.com/atom/text-buffer
// Definitions by: vvakame <https://github.com/vvakame/>, Vadim Macagon <https://github.com/enlight/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../serializable/serializable.d.ts" />
/// <reference path="../event-kit/event-kit.d.ts"/>

declare module AtomTextBuffer {

	type Disposable = AtomEventKit.Disposable;
	type ISerializable = AtomSerializable.ISerializable;
	/** A point, point-compatible array, or point-compatible object. */
	type PointOrArray = Point | Array<number> | { row: number; column: number };
	/** A range or range-compatible array. */
	type RangeOrArray = Range | Array<PointOrArray>;

	/** Static side of Point class. */
	interface PointStatic {
		/**
		 * Converts any point-compatible object to a [[Point]].
		 *
		 * @param copy Indicates whether to force the copying of the given object if it's already
		 *             a [[Point]].
		 */
		fromObject(object: PointOrArray, copy?: boolean): Point;
		/** @return The [[Point]] that is earlier in the buffer. */
		min(point1: PointOrArray, point2: PointOrArray): Point;
		max(point1: PointOrArray, point2: PointOrArray): Point;

		ZERO: Point;
		INFINITY: Point;

		prototype: Point;
		new (row?: number, column?: number): Point;
	}

	/** Instance side of Point class. */
	interface Point {
		constructor: PointStatic;
		/* A zero-indexed row. */
		row: number;
		/* A zero-indexed column. */
		column: number;

		/** @return A new [[Point]] with the same row and column. */
		copy(): Point;
		/** @return A new [[Point]] with the row and column negated. */
		negate(): Point;

		// Operations

		/**
		 * Makes this point immutable.
		 *
		 * @return `this`
		 */
		freeze(): Point;
		/**
		 * Builds a new point by adding the rows and columns of the given point to this one.
		 *
		 * @param other A point whose row and column will be added to this point.
		 * @return A new point.
		 */
		translate(other: PointOrArray): Point;
		/** Builds a new point by traversing the rows and columns of the given point. */
		traverse(other: PointOrArray): Point;

		splitAt(column: number): Point[];

		// Comparison

		/**
		 * @return `-1` if this point precedes `other`,
		 *         `0` if this point is equivalent to `other`,
		 *         `1` if this point follows `other`.
		 */
		compare(other: PointOrArray): number;
		isEqual(other: PointOrArray): boolean;
		isLessThan(other: PointOrArray): boolean;
		isLessThanOrEqual(other: PointOrArray): boolean;
		isGreaterThan(other: PointOrArray): boolean;
		isGreaterThanOrEqual(other: PointOrArray): boolean;

		// Conversion

		/** @return An array of this point's row and column. */
		toArray(): number[];
		/** @return An array of this point's row and column. */
		serialize(): number[];
	}

	/** Represents a point in a buffer in row/column coordinates. */
	var Point: PointStatic;

	/** Static side of Range class. */
	interface RangeStatic {
		/**
		 * Converts any range-compatible object to a [[Range]].
		 *
		 * @param copy Indicates whether to force the copying of the given object if it's already
		 *             a [[Range]].
		 */
		fromObject(object: RangeOrArray, copy?: boolean): Range;
		/**
		 * Creates a range based on an optional starting point and the given text.
		 *
		 * @param startPoint Start of the new range, defaults to `(0, 0)`.
		 * @param text String that should be used to determine the end of the new range.
		 *             The range will have as many rows as the text has lines, and an end column based
		 *             on the length of the last line.
		 */
		fromText(startPoint: PointOrArray, text: string): Range;
		fromText(text: string):Range;
		/**
		 * Creates a range that starts at the given point and ends at the start point plus the
		 * given row and column deltas.
		 */
		fromPointWithDelta(startPoint: PointOrArray, rowDelta: number, columnDelta: number): Range;
		/**
		 * Constructs a new range from a previously serialized one.
		 *
		 * @param array Result of [[Range.serialize]].
		 * @return A new range.
		 */
		deserialize(array: Array<number[]>): Range;

		prototype: Range;
		new (pointA: PointOrArray, pointB: PointOrArray): Range;
	}

	/** Instance side of Range class. */
	interface Range {
		constructor: RangeStatic;

		start: Point;
		end: Point;

		/** @return A new [[Range]] with the same start and end positions. */
		copy(): Range;
		/** @return A new range with the start and end positions negated. */
		negate(): Range;
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
		freeze(): Range;
		/** @return A new range that contains this range and the `otherRange`. */
		union(otherRange: Range): Range;
		/**
		 * Creates a new range by translating the this range by the given delta(s).
		 *
		 * @param startDelta A point by which the start of this range should be translated.
		 * @param endDelta A point by which the end of this range should be translated,
		 *                 by default this will be the same as `startDelta`.
		 */
		translate(startDelta: PointOrArray, endDelta?: PointOrArray): Range;
		/** @see [[Point.traverse]] on differences between traversal and translation. */
		traverse(delta: PointOrArray): Range;

		// Comparison

		/**
		 * @return `-1` if this range starts before `other` or contains it,
		 *         `0` if this range is equivalent to `other`,
		 *         `1` if this range starts after `other` or is contained by it.
		 */
		compare(other: RangeOrArray): number;
		isEqual(other: RangeOrArray): boolean;
		/** @return `true` if this range starts and ends on the same rows as the `other` range. */
		coversSameRows(other: Range): boolean;
		/**
		 * Checks if this range interesects with another.
		 *
		 * @param exclusive Set to `true` to exclude endpoints when testing for intersection,
		 *                  defaults to `false`.
		 */
		intersectsWith(otherRange: Range, exclusive?: boolean): boolean;
		/**
		 * Checks if this range contains another.
		 *
		 * @param exclusive Set to `true` to exclude range endpoints from the containment test,
		 *                  defaults to `false`.
		 * @return `true` if this range contains the given range.
		 */
		containsRange(otherRange: RangeOrArray, exclusive?: boolean): boolean;
		/** @return `true` if this range contains the given point. */
		containsPoint(point: PointOrArray, exclusive?: boolean): boolean;
		/** @return `true` if this range intersects the given row. */
		intersectsRow(row: number): boolean;
		/** @return `true` if this range intersects the given row range. */
		intersectsRowRange(startRow: number, endRow: number): boolean;

		toDelta(): Point;
	}

	/** Represents a region in a buffer in row/column coordinates. */
	var Range: RangeStatic;

	interface IMarkerChangeEvent {
		oldHeadPosition: Point;
		newHeadPosition: Point;
		oldTailPosition: Point;
		newTailPosition: Point;
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

	/** A buffer annotation that remains logically stationary even as the buffer contents change. */
	interface Marker {
		/** Invokes the given callback when the marker is destroyed. */
		onDidDestroy(callback: Function): Disposable;
		/** Invokes the given callback when the state of the marker changes. */
		onDidChange(callback: (event: IMarkerChangeEvent) => void): Disposable;

		/** @return The current range of the marker. Note that the object returned is immutable. */
		getRange(): Range;
		setRange(range: RangeOrArray, properties?: { reversed?: boolean }): boolean;
		getHeadPosition(): Point;
		setHeadPosition(position: PointOrArray, properties?: any): boolean;
		getTailPosition(): Point;
		setTailPosition(position: PointOrArray, properties?: any): boolean;
		getStartPosition(): Point;
		getEndPosition(): Point;
		clearTail(properties?: any): boolean;
		plantTail(properties?: any): boolean;
		isReversed(): boolean;
		hasTail(): boolean;
		isValid(): boolean;
		isDestroyed(): boolean;
		isEqual(other: Marker): boolean;
		getInvalidationStrategy(): string;
		getProperties(): any;
		setProperties(properties: any): boolean;
		copy(options?: any): Marker;
		destroy(): void;
		compare(other: Marker): number;
	}

	interface TextBufferStatic {
		version: number;
		Point: PointStatic;
		Range: RangeStatic;
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

	interface IBufferChangeEvent {
		/** Range of `oldText`. */
		oldRange: Range;
		/** Range of `newText`. */
		newRange: Range;
		/** Text that will be or was replaced. */
		oldText: string;
		/** Text that will be or was inserted. */
		newText: string;
	}

	interface IBufferSaveEvent {
		/** The path to which the buffer was saved. */
		path: string;
	}

	interface IThrowErrorEvent {
		error: Error;
		/**
		 * Call this to indicate the error has been handled.
		 * If this function is called the error will not be thrown.
		 */
		handle: Function;
	}

	interface ITextMutationOptions {
		normalizeLineEndings?: boolean;
		/** Set to `'skip'` to bypass the undo/redo system. */
		undo?: string;
	}

	interface IMarkerProperties {
		/** If `true` the marker will be created with a reversed orientation, defaults to `false`. */
		reversed?: boolean;
		/** If `true` the marker will be serialized when serializing the buffer, defaults to `true`. */
		persistent?: boolean;
		/**
		 * Determines the rules by which changes to the buffer invalidate the marker,
		 * defaults to `'overlap'`.
		 */
		invalidate?: string;
	}

	interface IMarkerSearchOptions {
		/** Only include markers that start at the given point. */
		startPosition?: PointOrArray;
		/** Only include markers that end at the given point. */
		endPosition?: PointOrArray;
		/** Only include markers that contain the given point (inclusive). */
		containsPoint?: PointOrArray;
		/** Only include markers that contain the given range (inclusive). */
		containsRange?: RangeOrArray;
		/** Only include markers that start at the given row. */
		startRow?: number;
		/** Only include markers that end at the given row. */
		endRow?: number;
		/** Only include markers that intersect the given row. */
		intersectsRow?: number;
		/** Only include markers that are contained in the given range. */
		containedInRange?: RangeOrArray;
	}

	interface IScanIteratorFunc {
		(arg: {
			match: RegExpExecArray,
			matchText: string,
			range: Range,
			stop: Function,
			replace: (replacement: string) => void
		}): void;
	}

	interface TextBuffer extends ISerializable {
		constructor: TextBufferStatic;

		// Event Subscription

		/** Invokes the given callback synchronously *before* the content of the buffer changes. */
		onWillChange(callback: (event: IBufferChangeEvent) => void): Disposable;
		/** Invokes the given callback synchronously *after* the content of the buffer changes. */
		onDidChange(callback: (event: IBufferChangeEvent) => void): Disposable;
		/**
		 * Invokes the given callback asynchronously following one or more changes,
		 * but only after [[getStoppedChangingDelay]] milliseconds elapse without any other changes
		 * occuring.
		 */
		onDidStopChanging(callback: Function): Disposable;
		/**
		 * Invokes the given callback when the in-memory contents of the buffer no longer match
		 * the contents of the file on disk.
		 */
		onDidConflict(callback: Function): Disposable;
		/** Invoke the given callback when the value of [[isModified]] changes. */
		onDidChangeModified(callback: (modified: boolean) => void): Disposable;
		/**
		 * Invokes the given callback when all [[Marker.onDidChange]] observers have been notified
		 * of a change to the buffer.
		 */
		onDidUpdateMarkers(callback: Function): Disposable;
		/** Invokes the given callback when a marker is created. */
		onDidCreateMarker(callback: (marker: Marker) => void): Disposable;
		/** Invokes the given callback when the value of [[getPath]] changes. */
		onDidChangePath(callback: (path: string) => void): Disposable;
		/** Invokes the given callback when the value of [[getEncoding]] changes. */
		onDidChangeEncoding(callback: (encoding: string) => void): Disposable;
		/** Invokes the given callback before the buffer is saved to disk. */
		onWillSave(callback: Function): Disposable;
		/** Invokes the given callback after the buffer is saved to disk. */
		onDidSave(callback: (event: IBufferSaveEvent) => void): Disposable;
		/** Invokes the given callback after the file backing the buffer is deleted. */
		onDidDelete(callback: Function): Disposable;
		/** Invokes the given callback *before* the buffer is reloaded from file. */
		onWillReload(callback: Function): Disposable;
		/** Invokes the given callback *after* the buffer is reloaded from file. */
		onDidReload(callback: Function): Disposable;
		/** Invokes the given callback when the buffer is destroyed. */
		onDidDestroy(callback: Function): Disposable;
		/** Invokes the given callback when an error occurs while watching the file. */
		onWillThrowWatchError(callback: (errorObject: IThrowErrorEvent) => void): Disposable;

		/**
		 * @return Number of milliseconds that should elapse without a change before
		 * [[onDidStopChanging]] observers are invoked.
		 */
		getStoppedChangingDelay(): number;

		// File Details

		isModified(): boolean;
		isInConflict(): boolean;
		/** @return The path of the associated file. */
		getPath(): string;
		/** Sets the path of the file associated with the buffer. */
		setPath(filePath: string): void;
		/**
		 * Sets the character encoding for this buffer.
		 *
		 * @param encoding Defaults to `'utf8'`.
		 */
		setEncoding(encoding: string): void;
		/** @return The character encoding of this buffer. */
		getEncoding(): string;
		/** @return The path of the associated file. */
		getUri(): string;
		/** @return The name of the associated file without path information. */
		getBaseName(): string;

		// Reading Text

		isEmpty(): boolean;
		getText(): string;
		getTextInRange(range: RangeOrArray): string;
		getLines(): string[];
		getLastLine(): string;
		lineForRow(row: number): string;
		lineEndingForRow(row: number): string;
		lineLengthForRow(row: number): number;
		getLineCount():number;
		getLastRow():number;
		isRowBlank(row: number): boolean;
		/** Finds the first preceding row that's not blank. */
		previousNonBlankRow(startRow: number): number;
		/** Finds the next row that's not blank. */
		nextNonBlankRow(startRow: number): number;

		// Mutating Text

		/**
		 * Replaces the entire contents of the buffer with the given text.
		 *
		 * @return A range spanning the new buffer contents.
		 */
		setText(text: string): Range;
		setTextViaDiff(text: string, skipUndo?: boolean): void;
		/**
		 * Sets the text in the given range.
		 *
		 * @param options.undo Set to 'skip' to bypass the undo/redo system.
		 * @return The range of the inserted text.
		 */
		setTextInRange(range: RangeOrArray, newText: string, options?: ITextMutationOptions): Range;
		/**
		 * Inserts text at the given position.
		 *
		 * @param options.undo Set to 'skip' to bypass the undo/redo system.
		 * @return The range of the inserted text.
		 */
		insert(position: Point, text: string, options?: ITextMutationOptions): Range;
		append(text: string, options?: ITextMutationOptions): Range;
		/**
		 * Deletes the text in the given range.
		 *
		 * @return An empty range that starts at the beginning of the deleted text.
		 */
		delete(range: Range): Range;
		/**
		 * Deletes the text line at the row.
		 *
		 * @return An empty range that starts at the beginning of the deleted text.
		 */
		deleteRow(row: number): Range;
		/**
		 * Deletes the text lines within the given range.
		 *
		 * @param startRow The first row of text to delete.
		 * @param endRow The last row (inclusive) of text to delete.
		 * @return An empty range that starts at the beginning of the deleted text.
		 */
		deleteRows(startRow: number, endRow: number): Range;

		// Markers

		markRange(range: RangeOrArray, properties: IMarkerProperties): Marker;
		markPosition(position: PointOrArray, properties: IMarkerProperties): Marker;
		getMarkers(): Marker[];
		getMarker(id: number): Marker;
		findMarkers(params: IMarkerSearchOptions): Marker[];
		getMarkerCount(): number;
		destroyMarker(id: number): void;

		// History

		/** Undoes the last operation, aborting the current transaction (if one is in progress). */
		undo(): void;
		/** Redoes the last operation. */
		redo(): void;
		transact<T>(groupingInterval: number, fn: () => T): T;
		transact<T>(fn: Function): any;
		clearUndoStack(): void;
		/**
		 * Creates a snapshot of the current state of the buffer, and a checkpoint that can be used
		 * to restore the state from the snapshot.
		 */
		createCheckpoint(): number;
		/** Reverts the buffer to the state it was in when the given checkpoint was created. */
		revertToCheckpoint(checkpoint: number): boolean;
		/** Groups all changes since the given checkpoint into a single transaction. */
		groupChangesSinceCheckpoint(checkpoint: number): boolean;

		// Search and Replace

		/**
		 * Scans the regular expression matches in the entire buffer, and calls the given iterator
		 * function on each match.
		 */
		scan(regex: RegExp, iterator: IScanIteratorFunc): void;
		/**
		 * Scans the regular expression matches in the entire buffer in reverse order, and calls the
		 * given iterator function on each match.
		 */
		backwardsScan(regex: RegExp, iterator: IScanIteratorFunc): void;
		/**
		 * Scans the regular expression matches in the given range, and calls the given iterator
		 * function on each match.
		 *
		 * @param reverse Defaults to `false`.
		 */
		scanInRange(regex: RegExp, range: RangeOrArray, iterator: IScanIteratorFunc, reverse?: boolean): void;
		/**
		 * Scans the regular expression matches in the given range in reverse order, and calls the
		 * given iterator function on each match.
		 */
		backwardsScanInRange(regex: RegExp, range: RangeOrArray, iterator: IScanIteratorFunc): void;
		/**
		 * Replaces all regular expression matches in this buffer with the given text.
		 *
		 * @return The number of replacements made.
		 */
		replace(regex: RegExp, replacementText: string): number;

		// Buffer Range Details

		/** @return A range spanning the entire buffer. */
		getRange(): Range;
		getLineCount(): number;
		getLastRow(): number;
		getFirstPosition(): Point;
		getEndPosition(): Point;
		/** @return The length of the buffer in characters. */
		getMaxCharacterIndex(): number;
		/**
		 * Obtains the range for the given row.
		 *
		 * @param includeNewline If `true` and `row` ends with a newline then the returned range will
		 *                       extend to the start of the next line.
		 */
		rangeForRow(row: number, includeNewline?: boolean): Range;
		/** Converts a buffer position to an absolute character offset, including newline characters. */
		characterIndexForPosition(position: PointOrArray): number;
		/** Convert an absolute character offset (including newlines) to a buffer position. */
		positionForCharacterIndex(offset: number): Point;
		/**
		 * Clips the given range so that it starts and ends at valid buffer positions.
		 *
		 * @return The clipped range. Note that the clipped range may be identical to `range`
		 *         if `range` is a [[Range]] object and is already in-bounds.
		 */
		clipRange(range: RangeOrArray): Range;
		/**
		 * Clips the given point so it is at a valid buffer position.
		 *
		 * @return The clipped position. Note that the clipped position may be identical to `position`
		 *         if `position` is a [[Point]] object and is already in-bounds.
		 */
		clipPosition(position: PointOrArray): Point;

		// Buffer Operations

		save(): void;
		saveAs(filePath: string): void;
		/**
		 * Reloads the buffer from file.
		 *
		 * @param skipUndo Defaults to `false`.
		 */
		reload(skipUndo?: boolean): void;
	}

	/**
	 * A mutable text container with undo/redo support and the ability to
	 * annotate logical regions in the text.
	 */
	var TextBuffer: TextBufferStatic;
}

declare module "text-buffer" {
	export = AtomTextBuffer;
}
