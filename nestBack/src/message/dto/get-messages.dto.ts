import { IsNotEmpty } from "class-validator";

export class getMessagesDto {
    @IsNotEmpty()
    user: number;
    @IsNotEmpty()
    friend: number;

}