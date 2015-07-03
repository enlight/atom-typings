// Type definitions for mixto 1.0.0
// Project: https://github.com/atom/mixto
// Definitions by: vvakame <https://github.com/vvakame/>, Vadim Macagon <https://github.com/enlight/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module Mixto {
	interface IMixinStatic {
		includeInto(constructor:any):void;
		extend(object:any):void;
	}

	export class Mixin {
		static includeInto(constructor: Function): void;
		static extend(object: any): void;
	}
}

declare module "mixto" {
	export = typeof Mixto.Mixin;
}
