import {IsMongoId, IsOptional, IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTaskDto {
    @IsMongoId()
    @IsNotEmpty()
    readonly userId: string

    @IsString()
    readonly taskName: string

    @IsString()
    @IsOptional()
    readonly taskDescription: string

    @IsDateString()
    readonly startDate: Date

    @IsDateString()
    readonly endDate: Date
}
