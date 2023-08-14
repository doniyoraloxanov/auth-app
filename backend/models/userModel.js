import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },

        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 1,
        },

        // create status active/blocked
        status: {
            type: String,
            enum: ["active", "blocked"],
            default: "active",
        },

        // create registration time
        registrationTime: {
            type: Date,
            default: Date.now,
        },

        // create last login time
        lastLoginTime: {
            type: Date,
            default: Date.now,
        },
    },

    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
