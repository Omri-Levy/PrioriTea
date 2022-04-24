export interface IService<TRepository> {
	_repository: TRepository;

	repository: TRepository;
}

export abstract class Service<TRepository> implements IService<TRepository> {
	public abstract _repository: TRepository;

	get repository() {
		return this._repository;
	}
}
