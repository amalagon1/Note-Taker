// Required dependencies
const express = require('express');
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require('./routes/apiRoutes');
// Initialize Express
const app = express();

// app.listen(3000, () => {
//     console.log(`API server now on port 3000!`);
// });

const PORT = process.env.PORT || 3000;

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Start the server
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));



console.log("hello world!")