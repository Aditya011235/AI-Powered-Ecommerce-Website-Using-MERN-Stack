import User from "../model/UserModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken } from "../config/token.js";




export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: "Invalid email format" });
        }
        if(password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        let hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(201).json({ message: "User registered successfully", user, token });
    }catch (error) {
        console.log("Error in register");
        return res.status(500).json({ message: `Internal server error ${error}` });
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).json({ message: "Login successful", user, token });
    }catch (error) {
        console.log("Error in login");
        return res.status(500).json({ message: `Internal server error ${error}` });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log("Error in logout");
        return res.status(500).json({ message: `logout not done ! , server error ${error}` });
    }
}