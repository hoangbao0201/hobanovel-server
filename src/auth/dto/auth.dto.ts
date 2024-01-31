import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"


export class RegisterDTO {

    @IsString()
    @IsNotEmpty()
    @Length(5, 30, {
        // message: "Fullname từ 5 đến 30 kí tự"
    })
    name: string

    @IsString()
    @IsNotEmpty()
    @Length(5, 30, {
        // message: "Username từ 5 đến 30 kí tự"
    })
    username: string

    @IsEmail()
    @IsNotEmpty()
    @Length(5, 30, {
        // message: "Email từ 5 đến 30 kí tự"
    })
    email: string
    
    @IsString()
    @IsNotEmpty()
    @Length(5, 30, {
        // message: "Password từ 5 đến 30 kí tự"
    })
    password: string
} 

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    @Length(5, 30, {
        // message: "Email từ 5 đến 30 kí tự"
    })
    accout: string
    
    @IsString()
    @IsNotEmpty()
    @Length(5, 30, {
        // message: "Password từ 5 đến 30 kí tự"
    })
    password: string
} 