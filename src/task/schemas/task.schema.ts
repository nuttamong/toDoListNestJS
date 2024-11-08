import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';


export type TaskDocument = Task & Document

@Schema()
export class Task {
    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    userId: Types.ObjectId

    @Prop({required: true})
    taskName: string

    @Prop()
    taskDescription: string

    @Prop()
    startDate: Date

    @Prop({required: true})
    endDate: Date
}

export const TaskSchema = SchemaFactory.createForClass(Task)