import { getRepository, Repository} from 'typeorm';

import ICreateProcedureDTO from '@modules/procedure/dtos/ICreateProcedureDTO';
import IFindAllProcedureDTO from '@modules/procedure/dtos/IFindAllProcedureDTO';

import IProcedureRepository from '@modules/procedure/repositories/IProcedureRepository';

import Procedure from '@modules/procedure/infra/typeorm/entities/Procedure';

class ProcedureRepository implements IProcedureRepository {
  private ormRepository: Repository<Procedure>;

  constructor() {
    this.ormRepository = getRepository(Procedure);
  }
  findAllProcedure(data: IFindAllProcedureDTO): Promise<Procedure[]> {
    throw new Error('Method not implemented.');
  }
  save(name: Procedure): Promise<Procedure> {
    throw new Error('Method not implemented.');
  }

  public async findByName({
    id,
    name,
  }: IFindAllProcedureDTO): Promise<Procedure | undefined> {
    const findProcedure = await this.ormRepository.findOne({
      where: { id, name },
    });
    return findProcedure;
  }

  public async create({
    name,
    valor,
    duracao
  }: ICreateProcedureDTO): Promise<Procedure> {
    const Procedure = this.ormRepository.create({
      name,
      valor,
      duracao
    });

    await this.ormRepository.save(Procedure);

    return Procedure;
  }
}

export default ProcedureRepository;
