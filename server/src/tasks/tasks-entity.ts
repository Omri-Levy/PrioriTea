import { IsUUID, Length } from "class-validator";
import {
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
} from "typeorm";
import { User } from "../users/users-entity";

@Entity()
export class Task extends BaseEntity {
	@IsUUID()
	@PrimaryGeneratedColumn(`uuid`)
	id: string;

	@Length(1, 256)
	@Column()
	priority: string;

	@Length(1, 500)
	@Column()
	description: string;

	@Length(1, 256)
	@Column("varchar", { default: "Standby" })
	status: string;

	@ManyToOne(() => User, (user) => user.tasks, {
		onDelete: "CASCADE",
	})
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
