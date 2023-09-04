"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Importa as classes dos modelos
const Medico_1 = __importDefault(require("./models/Medico"));
const Mae_1 = __importDefault(require("./models/Mae"));
const Bebe_1 = __importDefault(require("./models/Bebe"));
// Importa as classes de serviço de cada modelo
const MedicoService_1 = __importDefault(require("./services/MedicoService"));
const MaeService_1 = __importDefault(require("./services/MaeService"));
const BebeService_1 = __importDefault(require("./services/BebeService"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Instancia objetos para cada classe de serviço
        const medicoService = MedicoService_1.default.getInstance();
        const maeService = MaeService_1.default.getInstance();
        const bebeService = BebeService_1.default.getInstance();
        const medico = new Medico_1.default('Bruno', 1, '123456789', 'Rua A', 'Obstetra');
        const mae = new Mae_1.default(1, 'Vitoria', '1969-01-01', 'Rua B', '123456789');
        const bebe = new Bebe_1.default(1, 'Joao', '2023-08-28', 3.56, 55, medico, mae);
        try {
            /*
            Insere os objetos nas suas respectivas
            tabelas usando os métodos de cada classe
            de serviço correspondente
            */
            yield medicoService.insert(medico);
            yield maeService.insert(mae);
            yield bebeService.insert(bebe);
            /*
            Retorna no console as linhas inseridas
            de cada tabela em formato json
            */
            yield medicoService.retrieveAll();
            yield maeService.retrieveAll();
            yield bebeService.retrieveAll();
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
main();