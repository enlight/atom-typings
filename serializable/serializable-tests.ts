/// <reference path="./serializable.d.ts"/>

import { Serializable, ISerializable, ISerializedState, IParamsSerializer } from 'serializable';

// Easiest way to use the `Serializable` mixin is not to use it as a mixin, because mixins in
// TypeScript are a pain. Instead just subclass it.
class Pilot extends Serializable implements IParamsSerializer {
	constructor(public name: string, public rank: string) {
		super();
	}

	serializeParams(): any {
		return {
			name: this.name,
			rank: this.rank
		};
	}
}

interface PlaneParams {
	engines: number;
	pilot: any;
}

// When you can't just subclass `Serializable`, you'll have to use the `ISerializable` interface.
class Plane implements ISerializable {
	constructor(public engines: number, public pilot?: Pilot) {
		if (pilot === undefined) {
			this.pilot = new Pilot('John', 'Captain');
		}
	}

	serializeParams(): PlaneParams {
		return {
			engines: this.engines,
			pilot: this.pilot.serialize()
		};
	}

	deserializeParams(params: PlaneParams): PlaneParams {
		params.pilot = Pilot.deserialize(params.pilot);
		return params;
	}

	// these are declared here to satisfy the Serializable mixin interface,
	// but the implementation will actually be provided by the mixin itself
	static registerDeserializers: (...deserializers: Function[]) => void;
	static registerDeserializer: (deserializer: Function) => void;
	static deserialize: {<T>(state: ISerializedState, params?: any): T};
	serialize: () => ISerializedState;
}

Serializable.includeInto(Plane);

var plane1 = new Plane(4, new Pilot('Surely', 'Captain'));
var plane2 = Plane.deserialize(plane1.serialize());

// Polymorphic Deserialization
