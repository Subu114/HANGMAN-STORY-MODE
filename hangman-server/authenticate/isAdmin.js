const User = require("../models/user");

exports.isAdmin = async (id) => {
    try {
        const check = await User.findById(id);
        
        if (!check) {
            console.log(`User not found for ID: ${id}`);
            return false;
        }

        console.log(`User found: ${check}`);
        console.log(`User role: ${check.role}`);

        if (check.role === "user") {
            console.log("User is not an admin");
            return false;
        }

        console.log("User is an admin");
        return true;
    } catch (error) {
        console.log("Error:", error);
        return false; // Ensure the function returns a value in case of error
    }
};
