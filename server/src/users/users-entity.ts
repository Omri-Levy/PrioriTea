import { IsEmail, IsUUID, Length, Matches, Max } from "class-validator";
import {
	Column,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
	Entity,
	BaseEntity,
	BeforeInsert,
} from "typeorm";
import { Task } from "../tasks/tasks-entity";
import { PassUtils } from "../utils/pass-utils";
import { specialUpperLowerNum } from "./users-validation";

@Unique([`email`])
@Entity()
export class User extends BaseEntity {
	@IsUUID()
	@PrimaryGeneratedColumn(`uuid`)
	id: string;

	@Max(320)
	@IsEmail()
	@Column(`citext`)
	email: string;

	@Length(1, 70)
	@Column()
	fullName: string;

	// Ensure that an attacker can't DoS the server by programmatically
	// sending a string that is as long as possible.
	@Matches(specialUpperLowerNum)
	@Length(8, 256)
	@Column()
	password: string;

	@OneToMany(() => Task, (task) => task.user)
	tasks: Task[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@BeforeInsert()
	async setPassword() {
		this.password = await PassUtils.hash(this.password);
	}
}
