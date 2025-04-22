const jwt = require('jsonwebtoken');

// Middleware to verify JWT token from cookies
module.exports.isLoggedin = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    // Token not present
    return res.redirect('/auth/login'); // or respond with 401 if it's an API
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, "huihui"); 
    // console.log(decoded)// Same secret as used in login
    req.user = decoded; // Store decoded user data in request object
    next(); // Go to the next middleware or route
  } catch (error) {
    console.error("Invalid token:", error.message);
    res.clearCookie('token'); // Optional: Clear invalid token
    return res.redirect('/login'); // Or res.status(401).json({ message: 'Invalid Token' });
  }
};