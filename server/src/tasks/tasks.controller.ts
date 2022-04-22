import {
  auth,
  Controller,
  Delete,
  Get,
  Method,
  Post,
  restful,
  Service,
  Put,
  Use,
  BASE_URL,
  TasksService,
  Request,
  Response,
} from "..";

interface ITasksController {
  createTask(req: Request, res: Response): void;
  getTasks(req: Request, res: Response): void;
  getTask(req: Request, res: Response): void;
  updateTask(req: Request, res: Response): void;
  deleteTask(req: Request, res: Response): void;
}

@Use(restful([Method.GET, Method.POST, Method.PATCH, Method.DELETE]), auth)
@Controller(`${BASE_URL}/tasks`)
@Service()
export class TasksController implements ITasksController {
  constructor(private service: TasksService) {}

  /**
   * @path /api/tasks
   * @request post
   * @desc adds a new task to db using the body sent from the user input
   */
  @Post(`/`)
  public async createTask(req: Request, res: Response) {
    return this.service.createTask(req, res);
  }

  /**
   * @path /api/tasks
   * @request get
   * @desc sends back all the authenticated user's tasks from db
   */
  @Get(`/`)
  public async getTasks(req: Request, res: Response) {
    return this.service.getTasks(req, res);
  }

  /**
   * @path /api/tasks/:id
   * @request get
   * @desc sends back the authenticated user's task by id from db
   */
  @Get(`/:id`)
  public async getTask(req: Request, res: Response) {
    return this.service.getTask(req, res);
  }

  /**
   * @path /api/task/:id
   * @request put
   * @desc updates an existing authenticated user's task from db using an id param
   * sent from the user
   */
  @Put(`/:id`)
  public async updateTask(req: Request, res: Response) {
    return this.service.updateTask(req, res);
  }

  /**
   * @path /api/task/:id
   * @request delete
   * @desc deletes an existing authenticated user's task from db using an id param
   * sent from the user
   */
  @Delete(`/:id`)
  public async deleteTask(req: Request, res: Response) {
    return this.service.deleteTask(req, res);
  }
}
