import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const usersSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Use bcrypt to hash the password before saving
usersSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", usersSchema);

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Validate password on the client side
    if (password.length === 0) {
      return res.status(400).send("Password can't be empty!");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords don't matched");
    }

    const existingUser = await User.findOne({ email: username });

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const newUser = new User({
      email: username,
      password: password
    });

    await newUser.save();
    console.log("User successfully registered:", newUser);
    res.send("User successfully registered!");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Error while registering user");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ email: username });

    if (!foundUser) {
      return res.send("User not found");
    }

    const isPasswordValid = bcrypt.compare(password, foundUser.password);

    if (isPasswordValid) {
      res.send("Login successfully");
    } else {
      res.send("Error occured");
        }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

