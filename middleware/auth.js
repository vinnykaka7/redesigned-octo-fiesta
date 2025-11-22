export const checkApiKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'Access denied. API key is required'
    });
  }
  
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({
      success: false,
      error: 'Access denied. Invalid API key'
    });
  }
  
  next();
};
