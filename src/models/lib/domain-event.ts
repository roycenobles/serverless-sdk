interface Constructor<M> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	new (...args: any[]): M;
}

export abstract class ADomainEvent<T> {
	public abstract readonly name: string;
	public abstract readonly version: string;
	private readonly _created: string;
	private readonly _source: string;
	private readonly _data: T;

	constructor(source: string, data: T) {
		this._created = new Date().toISOString();
		this._source = source;
		this._data = data;
	}

	public static detailType<T extends DomainEvent>(this: Constructor<T>): string {
		return new this().name;
	}

	public get created(): string {
		return this._created;
	}

	public get source(): string {
		return this._source;
	}

	public get data(): T {
		return this._data;
	}
}

export type EventDetail<T> = {
	metadata: {
		created: string;
		version: string;
	};
	data: T;
};

export type DomainEvent = ADomainEvent<Record<string, unknown>>;

export type DomainEventDetail = EventDetail<Record<string, unknown>>;
