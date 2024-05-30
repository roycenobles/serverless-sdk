import { DomainEvent } from './domain-event';
import { schemaValidator } from '../../validation/lib/schema-validator';
import { v4 as uuid } from 'uuid';

export class Entity<T> {
	private readonly _id: string;
	private readonly _created: string;
	private _events: DomainEvent[] = [];
	private _updated: string;

	protected props: T;

	public get id(): string {
		return this._id;
	}

	public get created(): string {
		return this._created;
	}

	public get updated(): string {
		return this._updated;
	}

	protected get domainEvents(): DomainEvent[] {
		return this._events;
	}

	constructor(props: T, id?: string, created?: string, updated?: string) {
		this._id = id ? id : this.getUniqueId();
		this._created = created ? created : this.getDateString();
		this._updated = updated ? updated : this.getDateString();

		this.props = {
			...props,
			id: this.id,
			created: this.created,
			updated: this.updated,
		};
	}

	public setUpdated(): void {
		this._updated = this.getDateString();
	}

	protected addDomainEvent(event: DomainEvent): void {
		this._events.push(event);
	}

	protected clearDomainEvents(): void {
		this._events = [];
	}

	protected getDateString(): string {
		return new Date().toISOString();
	}

	// enable override for id customization
	protected getUniqueId(): string {
		return uuid();
	}

	protected validate(schema: Record<string, unknown>): void {
		schemaValidator(schema, this.props);
	}
}
