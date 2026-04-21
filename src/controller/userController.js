import { User} from "../models/userModel.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email, phoneNumber} = req.body;
        // User input validation
        if (!username || !password || !email || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }


        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({ message: "Username already exists" });
        }
        // Check if phone number already exists
        const existingphoneNumber = await User.findOne({ phoneNumber });
        if (existingphoneNumber) {
            return res.status(409).json({ message: "Phone number already exists" });
        }
        
        // Create new user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            phoneNumber,
            loggedIn: false,
        });

        res.status(201).json({ message: "User registered successfully", 
            user: { id: user._id, username: user.username, email: user.email } });

    } catch (error) {

        res.status(500).json({ message: error.message || "Server error", error: error.stack || error });
    }
};

// existing user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // User input validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Update loggedIn status
        user.loggedIn = true;
        await user.save();

        res.status(200).json({ message: "Login successful", 
            user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: error.message || "Server error", error: error.stack || error });        
    }
}

const logOut = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({
            email
        });
        if (!user) return res.json({
            message: "User not found"
        });
        res.status(200).json({
            message: "Logout Successful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}






export { registerUser, loginUser, logOut };