import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
    try {
        const { token, id, newPassword } = await request.json();
        if (!token || !id || !newPassword) {
            return NextResponse.json({
                message: "Missing fields",
                status: 400
            })
        }

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({
                message: "Invalid user",
                status: 400
            })
        }

        const secret = process.env.TOKEN_SECRET;
        jwt.verify(token, secret);

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ message: "Password reset successful" })


    } catch (error: any) {
        console.error("Reset password error:", error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}