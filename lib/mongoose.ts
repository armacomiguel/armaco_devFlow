import mongoose, {Mongoose} from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if(! MONGODB_URI){
    throw new Error("MONGODE_URI no esta definida.");
}

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache;
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

const dbConnect = async (): Promise<Mongoose> => {
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        cached.promise = mongoose
            .connect(MONGODB_URI,{
                dbName:"devflow",
            })
            .then((result) => {
                console.log("Conexión a MongoDB");
                return result;
            }).catch((error) => {
                console.error("Error al conectar a MongoDB", error);
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;