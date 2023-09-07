import { Request, Response } from 'express'


export const HelloController = {
  get: async (req: Request, res: Response) => {
    try {
      return res.status(200).json({message: "Hello world!"})

    } catch (err:any) {
      return res.status(500).json({
        message: err.message || 'Internal Server Error',
      })
    }
  },
}
