import { DbLoadUserByToken } from "@/data/usecases/LoadUser/DbLoadUserByToken";
import { LoadUserByToken } from "@/domain/usecases/LoadUserByToken";
import { JwtAdapter } from "@/infra/cryptography/JwtAdapter/JwtAdapter";
import { UserMongoRepository } from "@/infra/database/mongodb/repositories/User/User";
import { env } from "@/main/config/env";

export const makeLoadUserByToken = (): LoadUserByToken => {
    const jwtAdapter = new JwtAdapter(env.secret);
    const userMongoRepository = new UserMongoRepository();
    return new DbLoadUserByToken(userMongoRepository, jwtAdapter);
};
