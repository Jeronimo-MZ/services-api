import { components } from "./componentsConfig";
import { paths } from "./pathsConfig";
import { schemas } from "./schemasConfig";

export default {
    openapi: "3.0.0",
    info: {
        title: "Services Api",
        description: "Api para gestão de clientes e serviços prestados",
        version: "1.0.0",
    },
    license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
    },
    servers: [
        {
            url: "/api",
        },
    ],
    tags: [{ name: "User" }, { name: "Customer" }, { name: "ServiceProvided" }],
    paths,
    schemas,
    components,
};
