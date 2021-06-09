import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Articles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    heading: string;
    
}