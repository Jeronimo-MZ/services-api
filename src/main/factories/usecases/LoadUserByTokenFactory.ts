import { DbLoadUserByToken } from "@/data/usecases";
import { LoadUserByToken } from "@/domain/usecases";
import { JwtAdapter } from "@/infra/cryptography";
import { UserMongoRepository } from "@/infra/database/mongodb";
import { env } from "@/main/config/env";

export const makeLoadUserByToken = (): LoadUserByToken => {
    const jwtAdapter = new JwtAdapter(env.secret);
    const userMongoRepository = new UserMongoRepository();
    return new DbLoadUserByToken(userMongoRepository, jwtAdapter);
};
