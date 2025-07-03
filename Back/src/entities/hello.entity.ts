import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('hello')
export class HelloEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    name:string
}