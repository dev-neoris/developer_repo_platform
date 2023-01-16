import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class organization{

    @PrimaryGeneratedColumn("uuid")
    id_organization: string

    @Column({type: "char",length: 60})
    name: string

    @Column()
    status: number

}