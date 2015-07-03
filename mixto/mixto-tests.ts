/// <reference path="./mixto.d.ts" />

interface ISampleStatic extends Mixto.IMixinStatic {
	new ():ISample;
}

interface ISample {
	test():string;
}

declare var Sample: ISampleStatic;

Sample.includeInto(Function);
Sample.extend({});

class SampleMixin extends Mixto.Mixin {
}

class MixinTester {
}

SampleMixin.includeInto(MixinTester);
SampleMixin.extend({});
