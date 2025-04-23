import { NextResponse } from "next/server";
import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import { APIErrorResponse } from "@/types/global";
import { UserSchema } from "@/lib/validations";
import { ValidationError } from "@/lib/http-erros";

export async function GET(){
    try {
        await dbConnect();
        const users = await User.find();
        return NextResponse.json({success: true, data: users}, {status: 200});
    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }
}

// * Crear usuario
export async function POST(request: Request){
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData = UserSchema.safeParse(body);

        if(!validatedData.success){
            throw new ValidationError(validatedData.error.flatten().fieldErrors);
        }

        const {email, username} = validatedData.data;

        const existingEmail = await User.findOne({email});
        if(existingEmail) throw new Error("Este correo ya esta en uso.");

        const existingUsername = await User.findOne({username});
        if(existingUsername) throw new Error("Este usuario ya esta en uso.");

        const newUser = await User.create(validatedData.data);
        return NextResponse.json({success: true, data: newUser}, {status: 201});

    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }
}
