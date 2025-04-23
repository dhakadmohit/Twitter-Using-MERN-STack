const mongoose = require("mongoose");

// ✅ URL-encoded password: Mdz3ix52Q%rAtJm => Mdz3ix52Q%25rAtJm
// ✅ Add a database name at the end (e.g., "twitterapp")

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

module.exports = mongoose.connection;
