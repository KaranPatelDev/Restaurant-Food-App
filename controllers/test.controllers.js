const testUserController = (req, res) => {
  try {
    return res.status(200).send({
      message: "Test User Route is working",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = { testUserController };
