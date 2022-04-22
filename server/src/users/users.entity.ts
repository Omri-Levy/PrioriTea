import { IsEmail, IsUUID, Length, Matches, Max } from "class-validator";
import {
	Column,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
	Entity,
	BeforeInsert,
} from "typeorm";
import { specialUpperLowerNum } from ".";
import { PassUtils, Task } from "..";

@Unique([`email`])
@Entity()
export class User {
	@PrimaryGeneratedColumn(`uuid`)
	@IsUUID()
	id: string;

	@IsEmail()
	@Column(`citext`)
	@Max(320)
	email: string;

	@Length(1, 70)
	fullName: string;

	// Ensure that an attacker can't DoS the server by programmatically
	// sending a string that is as long as possible.
	@Length(8, 256)
	@Matches(specialUpperLowerNum)
	password: string;

	@OneToMany(() => Task, (task) => task.user)
	tasks: Task[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@BeforeInsert()
	async setPassword(password: string) {
		this.password = await PassUtils.hash(password);
	}
}
