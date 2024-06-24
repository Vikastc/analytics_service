import { Entity, PrimaryColumn, Column, BeforeInsert, Unique } from 'typeorm';
import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Event {
    @BeforeInsert()
    generateId() {
        if (!this.id) {
            this.id = 'e' + uuidv4();
        }
    }
    @PrimaryColumn()
    id?: string;

    @Column({ nullable: true })
    identifier?: string;

    @Column({ default: false })
    registry?: boolean;

    @Column()
    title?: string;

    @Column()
    description?: string;

    @Column()
    cordSchema?: string;

    @Column({ default: null, nullable: true })
    schemaProperties?: string;
}
