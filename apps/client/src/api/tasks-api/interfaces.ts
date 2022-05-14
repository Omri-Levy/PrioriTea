import {IResponse, Tasks} from "@prioritea/types";

export interface ITasksResponse extends IResponse<{ tasks: Tasks }> {
}
