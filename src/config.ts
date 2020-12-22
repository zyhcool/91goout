
interface IConfig {
    port: number;
    debugLogging: boolean;
    databaseUrl: string;
    entities: string[];
}

const isDevMode = process.env.NODE_ENV === "dev";
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)

const Config: IConfig = {
    port: 9191,
    debugLogging: isDevMode,
    databaseUrl: isDevMode ? "mongodb://localhost:8625/91goout" : "mongodb://database/91goout",
    entities: isDevMode ? ["src/entities/*.ts"] : ["dist/entities/*.js"],
};

export { Config };
