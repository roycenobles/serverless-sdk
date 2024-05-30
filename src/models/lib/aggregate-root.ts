import { DomainEvent } from './domain-event';
import { Entity } from './entity';

export abstract class AggregateRoot<T> extends Entity<T> {
	abstract retrieveDomainEvents(): DomainEvent[];
}
