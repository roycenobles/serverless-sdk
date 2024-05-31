export type NewModelProps<T> = Omit<T, keyof ModelProps>;

export type CreateModelProps<T> = NewModelProps<T> & {
	id?: string;
	created?: string;
	updated?: string;
};

export type ModelProps = {
	id: string;
	created: string;
	updated: string;
};
