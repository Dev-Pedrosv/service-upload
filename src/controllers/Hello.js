import { Request, Response } from 'express'

export const HelloController = {
  get: async (req, res) => {
    try {
      return res.status(200).json({message: "Hello world!"})

    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Internal Server Error',
      })
    }
  },
}
