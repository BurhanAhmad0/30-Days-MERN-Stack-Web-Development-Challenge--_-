// Index
// Packages
const dotenv = require("dotenv");
dotenv.config();
const app = require("./");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const connectDB = require("./lib/connectDB");
const rateLimit = require("express-rate-limit");

// Routes
const productRoutes = require("./Routes/Product/product.route");
const userRoutes = require("./Routes/User/user.route");

// Middlewares
const logger = require("./Middlewares/logger");
const errorHandler = require("./Middlewares/errorHandler");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const port = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

app.use(express.static("public"));
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDB();
app.set("view engine", "ejs");

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", productRoutes);
app.use("/api", userRoutes);

io.on("connection", (socket, req, res) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    io.emit("receive_message", {
      username: data.username,
      message: data.message,
      boxColor: data.boxColor,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
