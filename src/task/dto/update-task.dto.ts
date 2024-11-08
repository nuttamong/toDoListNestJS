import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsMongoId()
    @IsOptional()
    readonly userId?: string

    @IsString()
    @IsOptional()
    readonly taskName?: string

    @IsString()
    @IsOptional()
    readonly taskDescription?: string

    @IsDateString()
    @IsOptional()
    readonly startDate?: Date

    @IsDateString()
    @IsOptional()
    readonly endDate?: Date

}
