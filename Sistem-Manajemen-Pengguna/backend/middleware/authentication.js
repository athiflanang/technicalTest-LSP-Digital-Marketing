const { where } = require("sequelize")
const { verifyToken } = require("../helper/jwt")
const { User } = require("../models")

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      throw { name: "Unauthorized" }
    }

    const access_token = authorization.split(" ")[1]

    const payload = verifyToken(access_token)

    const userVerified = await User.findOne({
      where: {
        email: payload.email
      }
    })

    if (!userVerified) {
      throw { name: "Unauthorized" }
    }

    req.user = {
      id: userVerified.id,
      name: userVerified.name,
      email: userVerified.email,
      role: userVerified.role
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication