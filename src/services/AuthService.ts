import { Errors } from "../constants";
import BadRequestError from "../errors/BadRequest";
import ResourceNotFound from "../errors/ResourceNotFound";
import { AuthUser } from "../models/AuthUser";
import { comparePassword } from "../utils/passwordEncoder";
import { ISessionRepository, IUserRepository } from "./../repositories/Interfaces";
export const AuthService = <T extends AuthUser>(
    userRepository: IUserRepository<T>,
    sessionRepository: ISessionRepository
) => ({
    login: async (userId: number, password: string) => {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ResourceNotFound(Errors.STUDENT_NOT_FOUNT);
        }

        if (await comparePassword(password, user.password)) {
            throw new BadRequestError(Errors.INVALID_CREDENTIALS);
        }

        const { id, sessionString } = (await sessionRepository.createSession(userId)) || {};

        return { id, sessionString };
    },
    verify: async (sessionString: string, userId: number) => {
        const session = await sessionRepository.getSession(sessionString);

        if (!session) {
            throw new BadRequestError(Errors.SESSION_NOT_FOUND);
        }

        if (session.alumnoId !== userId) {
            throw new BadRequestError(Errors.SESSION_USER_MISMATCH);
        }

        if (!session.active) {
            throw new BadRequestError(Errors.SESSION_EXPIRED);
        }

        return true;
    },
    logout: async (sessionString: string, userId: number) => {
        const session = await sessionRepository.getSession(sessionString);

        if (!session) {
            throw new BadRequestError(Errors.SESSION_NOT_FOUND);
        }

        if (session.alumnoId !== userId) {
            throw new BadRequestError(Errors.SESSION_USER_MISMATCH);
        }

        await sessionRepository.invalidSession(sessionString);
    },
});
