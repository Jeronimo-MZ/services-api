import faker from "faker";

import { LogErrorRepositorySpy } from "@/data/mocks";
import { LogControllerDecorator } from "@/main/decorators/Log";
import { ok, serverError } from "@/presentation/helpers/http/httpHelper";
import { Controller, HttpResponse } from "@/presentation/protocols";

class ControllerSpy implements Controller {
    httpResponse = ok(faker.random.objectElement());
    request: any;

    async handle(request: any): Promise<HttpResponse> {
        this.request = request;
        return this.httpResponse;
    }
}
const mockServerError = (): HttpResponse => {
    const fakeError = new Error();
    fakeError.stack = "any_stack";
    return serverError(fakeError);
};

type SutTypes = {
    sut: LogControllerDecorator;
    controllerSpy: ControllerSpy;
    logErrorRepositorySpy: LogErrorRepositorySpy;
};

const makeSut = (): SutTypes => {
    const controllerSpy = new ControllerSpy();
    const logErrorRepositorySpy = new LogErrorRepositorySpy();
    const sut = new LogControllerDecorator(
        controllerSpy,
        logErrorRepositorySpy,
    );
    return {
        sut,
        controllerSpy,
        logErrorRepositorySpy,
    };
};

describe("LogController Decorator", () => {
    it("should call controller handle", async () => {
        const { sut, controllerSpy } = makeSut();
        const request = faker.random.objectElement();
        await sut.handle(request);
        expect(controllerSpy.request).toEqual(request);
    });

    it("should return the same result of the controller", async () => {
        const { sut, controllerSpy } = makeSut();
        const httpResponse = await sut.handle(faker.lorem.sentence());
        expect(httpResponse).toEqual(controllerSpy.httpResponse);
    });

    it("should call LogErrorRepository with correct error if controller returns a server error", async () => {
        const { sut, controllerSpy, logErrorRepositorySpy } = makeSut();
        const serverError = mockServerError();
        controllerSpy.httpResponse = serverError;
        await sut.handle(faker.random.objectElement());
        expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack);
    });

    it("should not call LogErrorRepository if controller does not return a server error", async () => {
        const { sut, logErrorRepositorySpy } = makeSut();
        const logErrorSpy = jest.spyOn(logErrorRepositorySpy, "logError");
        await sut.handle(faker.lorem.sentence());
        expect(logErrorSpy).not.toHaveBeenCalled();
    });
});
