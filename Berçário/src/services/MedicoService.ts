import { PrismaClient } from "@prisma/client";

import Medico from "../models/medico";

const prisma = new PrismaClient();

class MedicoService {
    private static instance: MedicoService | null = null;

    private constructor() { }

    static getInstance(): MedicoService {
        if (MedicoService.instance === null)
            MedicoService.instance = new MedicoService();
        return MedicoService.instance;
    }

    async insert(medico: Medico) {
        try {
            await prisma.medico.create({
                data: {
                    crm: medico.getCrm(),
                    nome: medico.getNome(),
                    telefone: medico.getTelefone(),
                    especialidade: medico.getEspecialidade(),
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async retrieveAll() {
        try {
            const medicos = await prisma.medico.findMany();
            console.log(medicos);
        } catch (error) {
            console.log(error);
        }
    }

    async update(medico: Medico) {
        try {
            await prisma.medico.update({
                where: { crm: medico.getCrm() },
                data: {
                    nome: medico.getNome(),
                    telefone: medico.getTelefone(),
                    especialidade: medico.getEspecialidade(),
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async delete(medico: Medico) {
        try {
            await prisma.medico.delete({
                where: { crm: medico.getCrm() },
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default MedicoService;
