// Type definitions for event-kit v1.2.0
// Project: https://github.com/atom/event-kit
// Definitions by: Vadim Macagon <https://github.com/enlight/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module EventKit {
    interface IDisposable {
        dispose(): void;
    }

    export class Disposable implements IDisposable {
        disposed: boolean;

        constructor(disposalAction: Function);
        dispose(): void;
    }

    export class CompositeDisposable {
        disposed: boolean;

        constructor(...disposables: IDisposable[]);
        dispose(): void;
        add(...disposables: IDisposable[]): void;
        remove(disposable: IDisposable): void;
        clear(): void;
    }

    export class Emitter {
        isDisposed: boolean;

        constructor();
        dispose(): void;
        /**
         * Registers a handler to be invoked whenever the given event is emitted.
         * @return An object that will unregister the handler when disposed.
         */
        on(eventName: string, handler: (value: any) => void, unshift?: boolean): Disposable;
        /**
         * Registers a handler to be invoked *before* all previously registered handlers for
         * the given event.
         * @return An object that will unregister the handler when disposed.
         */
        preempt(eventName: string, handler: (value: any) => void): Disposable;
        /** Invokes any registered handlers for the given event. */
        emit(eventName: string, value: any): void;
    }
}

declare module "event-kit" {
    export = EventKit;
}
