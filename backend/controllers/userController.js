const getAllUsers = (req,res) => {
    res.send("Fetching all users");
}

const signup = (req,res) => {
    res.send("Signup");
}

const login = (req,res) => {
    res.send("Login");
}

const getUserProfile = (req,res) => {
    res.send("Profile fetched");
}

const updateUserProfile = (req,res) => {
    res.send("Profile updated");
}

const deleteUserProfile = (req,res) => {
    res.send("Profile deleted");
}

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
}