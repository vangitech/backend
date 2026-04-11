import { json } from "express";
import { User} from "../models/userModel.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email,} = req.body;

        // User input validation
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Create new user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });
        res.status(201).json({ message: "User registered successfully", 
            user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error})
    }
};

// existing user login
const loginUser = async (req, res) => {
    try {
        // check if user already exits
        const { email, password } = req.body;

        const user = await User.findOne({email: email.toLowerCase()});

        if (!user) return res.status(400).json({ message: "Invalid User not found !!!" });

        // compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
        
        // update loggedIn status
        res.status(200).json({ message: "Login successful", 
            user: { id: user._id, username: user.username, email: user.email } });  
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
        
    }
}






export { registerUser, loginUser };