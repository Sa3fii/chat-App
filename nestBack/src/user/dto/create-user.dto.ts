import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  user: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}
