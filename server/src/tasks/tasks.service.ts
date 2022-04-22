import { Request, Response } from "express";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Service } from "typedi";
import { CreatedResponse, OkResponse } from "../responses";
import { Task } from "./tasks.entity";

@Service()
export interface ITasksService {
  createTask(req: Request, res: Response): void;
  getTasks(req: Request, res: Response): void;
  getTask(req: Request, res: Response): void;
  updateTask(req: Request, res: Response): void;
  deleteTask(req: Request, res: Response): void;
}

@Service()
export class TasksService implements ITasksService {
  @InjectRepository(Task)
  private repository: Repository<Task>;

  async createTask(req: Request, res: Response) {
    const task = new Task();

    task.priority = req.body.priority;
    task.description = req.body.description;
    task.status = req.body.status;

    this.repository.create(task);

    const tasks = await this.repository.find();

    return new CreatedResponse(res, { data: { tasks } });
  }

  async getTasks(_req: Request, res: Response) {
    const tasks = await this.repository.find();

    return new OkResponse(res, { data: { tasks } });
  }

  async getTask(req: Request, res: Response) {
    const task = await this.repository.findOneBy({ id: req.params.id });

    return new OkResponse(res, { data: { task } });
  }

  async updateTask(req: Request, res: Response) {
    await this.repository.update(req.params.id!, {
      priority: req.body.priority,
      description: req.body.description,
      status: req.body.status,
    });

    const tasks = await this.repository.find();

    return new OkResponse(res, { data: { tasks } });
  }

  async deleteTask(req: Request, _res: Response) {
    return this.repository.delete(req.params.id!);
  }
}
