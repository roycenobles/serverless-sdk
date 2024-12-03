import { Entity } from './entity';
import { ModelProps } from './properties';
import { ValueObject, ValueObjectProps } from './value-object';

/**
 * A DomainObject is any model object created, updated or deleted by the Unit of Work.
 * @type {AggregateRoot | Entity | ValueObject}
 */
type DomainObject = Entity<ModelProps> | ValueObject<ValueObjectProps>;

export interface IUnitOfWork {
	commit(): Promise<void>;
	registerCreated(object: DomainObject): void;
	registerDeleted(object: DomainObject): void;
	registerUpdated(object: DomainObject): void;
}

export abstract class AUnitOfWork implements IUnitOfWork {
	protected readonly toCreate: DomainObject[];
	protected readonly toDelete: DomainObject[];
	protected readonly toUpdate: DomainObject[];

	constructor() {
		this.toCreate = [];
		this.toDelete = [];
		this.toUpdate = [];
	}

	public abstract commit(): Promise<void>;

	public registerCreated(object: DomainObject): void {
		this.toCreate.push(object);
	}

	public registerDeleted(object: DomainObject): void {
		this.toDelete.push(object);
	}

	public registerUpdated(object: DomainObject): void {
		this.toUpdate.push(object);
	}
}
