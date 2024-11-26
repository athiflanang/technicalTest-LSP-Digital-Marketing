const { User } = require('../models')
const { passwordCompare, passwordHash } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')
const { where } = require('sequelize')

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        throw { name: 'InvalidLogin' }
      }

      const loginUser = await User.findOne({
        where: {
          email
        }
      })

      if (!loginUser)
        throw { name: 'LoginError' }

      if (!passwordCompare(password, loginUser.password))
        throw { name: 'LoginError' }

      const payload = {
        id: loginUser.id,
        email: loginUser.email
      }

      const access_token = signToken(payload)
      res.status(200).json({
        message: "Login success",
        statusCode: 200,
        access_token
      })
    } catch (error) {
      next(error)
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const users = await User.findAll()
      res.status(200).json({
        message: "Succesfully fetch all user",
        statusCode: 200,
        users
      })
    } catch (error) {
      next(error)
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params
      console.log("ini data user berdasarkan id  >>>>>>> ", id);

      const user = await User.findByPk(id)

      if (!user) {
        throw { name: 'NotFound', id }
      }

      res.status(200).json({
        message: `Succesfully fetch user with id ${id}`,
        statusCode: 200,
        user
      })
    } catch (error) {
      next(error)
    }
  }

  static async addUser(req, res, next) {
    try {
      const { name, email, password } = req.body

      const newUser = await User.create({
        name,
        email,
        password
      })

      const newVerifiedUser = [newUser.name, newUser.email]

      res.status(201).json({
        message: "User has been created",
        statusCode: 201,
        newUser: newVerifiedUser
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params
      const { name, email, password, role } = req.body
      const loggedInUser = req.user

      const user = await User.findByPk(id)
      if (!user) {
        throw { name: 'NotFound', id }
      }

      user.name = name || user.name
      user.email = email || user.email
      if (password) {
        user.password = passwordHash(password)
      }

      if (loggedInUser.role === 'Admin' && role) {
        user.role = role
      }

      await user.save()

      res.status(200).json({
        message: `User with id ${user.id} has been updated`,
        statusCode: 200,
        user
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params
      const findUser = await User.findByPk(id)

      if (!findUser) {
        throw { name: 'NotFound', id }
      }

      await User.destroy({
        where: {
          id
        }
      })

      res.status(200).json({
        message: `User with id ${id} has been deleted`,
        statusCode: 200
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController