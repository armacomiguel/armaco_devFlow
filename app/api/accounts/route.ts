import { NextResponse } from "next/server";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import { APIErrorResponse } from "@/types/global";
import { AccountSchema } from "@/lib/validations";
import { ForbiddenError } from "@/lib/http-errors";
import Account from "@/database/account.model";

export async function GET(){
    try {
        await dbConnect();
        const accounts = await Account.find();
        return NextResponse.json({success: true, data: accounts}, {status: 200});
    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }
}

// * Crear cuenta
export async function POST(request: Request){
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData = AccountSchema.parse(body);

        const existingAccount = await Account.findOne({
            provider: validatedData.provider,
            providerAccountId: validatedData.providerAccountId,
        });

        if(existingAccount) throw new ForbiddenError("Una cuenta con el mismo proveedor ya existe.");

        const newAccount = await Account.create(validatedData);
        return NextResponse.json({success: true, data: newAccount}, {status: 201});

    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }
}
