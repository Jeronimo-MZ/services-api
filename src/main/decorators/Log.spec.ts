import faker from "faker";

import { LogControllerDecorator } from "@/main/decorators/Log";
import { ok } from "@/presentation/helpers/http/httpHelper";
import { Controller, HttpResponse } from "@/presentation/protocols";

class ControllerSpy implements Controller {
    httpResponse = ok(faker.random.objectElement());
    request: any;

    async handle(request: any): Promise<HttpResponse> {
        this.request = request;
        return this.httpResponse;
    }
}

type SutTypes = {
    sut: LogControllerDecorator;
    controllerSpy: ControllerSpy;
};

const makeSut = (): SutTypes => {
    const controllerSpy = new ControllerSpy();
    const sut = new LogControllerDecorator(controllerSpy);
    return {
        sut,
        controllerSpy,
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
});
