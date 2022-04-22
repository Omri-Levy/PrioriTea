import { IsUUID, Length } from "class-validator";
import {
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { User } from "../users/users.entity";

@Entity()
export class Task {
	@PrimaryGeneratedColumn(`uuid`)
	@IsUUID()
	id: string;

	@Length(1, 256)
	priority: string;

	@Length(1, 500)
	description: string;

	@Length(1, 256)
	status: string;

	@ManyToOne((_type) => User, (user) => user.tasks)
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
