import { IsNotEmpty } from "class-validator";


export class SignInDto  {

    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    password : string;
}
