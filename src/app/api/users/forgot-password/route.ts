import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";


connect();

export async function POST(request: NextRequest) {
    try {
       const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                {message: "Email is required"},
                {status: 400}
            );
        }

        const user = await User.findOne({email});

        if (!user) {
            return NextResponse.json({
                message: "If this email exists, we have sent a reset link."
            });
        }

        // Create a short-lived JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.TOKEN_SECRET!,
            { expiresIn: "15m" }
        );

        // Create a reset link
        const appUrl = process.env.DOMAIN || "http://localhost:3000";
        const link = `${appUrl}/reset-password?token=${token}&id=${user._id}`;
        console.log("RESET URL:", link)

        // Send email
        await sendEmail({
            to: user.email,
            subject: "Reset your password",
            html: `
                <p>Hello ${user.name || ""},</p>
                <p>You requested to reset your password. Click below to set a new one:</p>
                <a href="${link}" target="_blank" style="color:#2563eb;">Reset Password</a>
                <p>This link will expire in 15 minutes.</p>
            `,
            email: user.email,
            emailType: "RESET",
            userId: user._id
        });

        return NextResponse.json({
            message: "If this email exists, a reset link has been sent."
        });

    } catch (error: any) {
        console.error("Forgot password error:", error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}