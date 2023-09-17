import { Request, Response } from "express";
import { User } from "../../models";
import { v4 as uuidv4 } from 'uuid';



export const getRecoveryEmail = async (req: Request, res: Response) => {

    try {

        const { email } = req.body;

        const posibleUser = await User.findOne({ where: { email } }) as any

        if (!posibleUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Error en la recuperación de contraseña',
                errors: [
                    {
                        msg: 'No hay ningun usuario registrado con ese email'
                    }
                ]

            })
        }

        const token = uuidv4();

        try {

            posibleUser.recoveryToken = token;
            await posibleUser.save();

            const recoveryUrl = `${process.env.APP_URL}/recovery/${token}`;

            return res.status(200).json({
                ok: true,
                msg: 'Email enviado correctamente',
                errors: []
            })

        } catch (error) {
            return res.status(400).json({
                ok: true,
                msg: 'Error el enviar el email',
                errors: []
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador',
            errors: []
        });
    }

}