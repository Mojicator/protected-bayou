//PORT
// process.env.PORT = process.env.PORT || '3000';
export const PORT: number = <number | undefined>process.env.PORT || 3000;

//ENVIROMENT MODE
// process.env.ENVM = process.env.ENVM || 'dev';
export const ENVM: string = <string | undefined>process.env.ENVM || "dev";

//DATABASE
let urlDB: string;
process.env.ENVM === "dev"
  ? (urlDB = "mongodb://localhost:27017/shelteredbayou")
  : (urlDB = <string>process.env.MONGO_URI);
export const URLDB: string = urlDB;

//TOKEN EXPIRATION TIME
// process.env.TET = process.env.TET || "48h";
export const EXT: string = <string | undefined>process.env.EXT || '48h';

//SEED
// process.env.SEED = process.env.SEED || "Eres.Un.Juguete-No.puedes.Volar";
export const SEED: string = <string>process.env.SEED || "Eres.Un.Juguete-No.puedes.Volar";
