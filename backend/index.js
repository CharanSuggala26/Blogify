const exp = require("express");
const app = exp();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const mongoClient = require("mongodb").MongoClient;

// CORS to allow frontend access
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

// Body parser
app.use(exp.json());

// Serve static files from React build (optional, for production only)
const publicPath = path.join(__dirname, '../my-react-tailwind/public');
app.use(exp.static(publicPath));

// Connect to MongoDB
mongoClient.connect(process.env.MONGODB_URI)
  .then((client) => {
    const blogDBobj = client.db("blogdbb2");
    const usersCollection = blogDBobj.collection("users");
    const authorsCollection = blogDBobj.collection("authors");
    const articlesCollection = blogDBobj.collection("articles");

    app.set("usersCollection", usersCollection);
    app.set("authorsCollection", authorsCollection);
    app.set("articlesCollection", articlesCollection);

    console.log("✅ DB connection success");
  })
  .catch((err) => {
    console.error("❌ Error connecting to DB:", err);
  });

// Import route modules
const userApp = require("./APIs/user-api");
const authorApp = require("./APIs/author-api");
const adminApp = require("./APIs/admin-api");

// Mount APIs
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);

// Handle refresh for React frontend (optional: only for production)
app.get('*', (req, res, next) => {
  try {
    res.sendFile(path.join(publicPath, 'index.html'));
  } catch (err) {
    console.error("❌ Error sending index.html:", err);
    next(err);
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Global error handler:", err);
  res.status(500).send({ status: "error", message: err.message });
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 HTTP server running on port ${port}`));
