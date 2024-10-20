"use server"

import { signIn } from 'next-auth/react'; // Correctly import signIn from next-auth
import DBConnection from "../utils/config/db";

export async function loginAction(loginDetails) {
    await DBConnection();

    console.log("sample login", loginDetails);

    try {
        const response = await signIn('credentials', {
            email: loginDetails.email,
            password: loginDetails.password,
            redirect: false
        });

        if (!response || response.error) {
            console.log("login failed", response?.error);
            throw new Error("login failed, Please Register");
        }
        
        return { success: true };
    } catch (error) {
        // This check seems specific to a certain type of error message
        if (error.message.includes("An error occurred in the Server Components render.")) {
            return { success: false, status: 400, message: "Please Register" };
        }

        console.log(error);
        return { success: false, status: 500, message: "An error occurred" };
    }
}


