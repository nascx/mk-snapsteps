import { Request, Response } from "express";
import { getPassword } from "../models/auth";

export const credentialCheck = async (req: Request, res: Response) => {
    try {
        const { sector, password } = req.query
        const crendials = await getPassword(sector as string) as {status: boolean, message: string}
        if (crendials.status) {
            if (crendials.message === password) {
                res.status(200).json({message: 'Credenciais válidas'})
            } else {
                res.status(400).json({message: 'Senha incorreta'})
                return
            }
        } else {
            res.status(404).json({message: 'Este setor não existe'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}