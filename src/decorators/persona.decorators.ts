import { createParamDecorator } from "@nestjs/common";

export const Persona = createParamDecorator((data: string, req) => {
    return data ? req.query[data] : req.query;
  });