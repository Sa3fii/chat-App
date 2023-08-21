import { IsNotEmpty } from "class-validator";

export class CreateMessageDto {
    @IsNotEmpty()
    sender: number;
    @IsNotEmpty()
    receiver: number;
    @IsNotEmpty()
    content: string;
    @IsNotEmpty()
    date: Date;
}
