import {IService} from "./interfaces";

export abstract class Service<TRepository> implements IService<TRepository> {
	public abstract _repository: TRepository;

	get repository() {
		return this._repository;
	}
}
