import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import slugify from 'slugify'
@Entity()
export class Articles {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @CreateDateColumn()
    createdAt:Date
    @Column()
    description:string

    @Column()
    content:string
    @Column()
    slug:string

    @BeforeInsert()
    @BeforeUpdate()
    addSlug=()=>{
        this.slug = slugify(this.title,{lower:true,strict:true})
    }
}