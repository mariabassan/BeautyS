import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListEstablishmentService from '@modules/establishment/services/ListEstablishmentService';

import Establishment from '@modules/establishment/infra/typeorm/entities/Establishment';

export default class ListEstablishmentController {
  public async index(req: Request, res: Response): Promise<Response> {
    const establishment_id = req.user.id;

    const listEstablishment = container.resolve(ListEstablishmentService);

    const establishment = await listEstablishment.execute({ establishment_id });

    return res.json(classToClass(plainToClass(Establishment, establishment)));
  }
}
