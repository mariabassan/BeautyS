import { getRepository, Repository} from 'typeorm';

import ICreateEstablishmentDTO from '@modules/establishment/dtos/ICreateEstablishmentDTO';
import IFindAllEstablishmentDTO from '@modules/establishment/dtos/IFindAllEstablishmentDTO';

//import IEstablishmentRepository from '@modules/establishment/repositories/IEstablishmentRepository';
import IEstablishmentRepository from '@modules/establishment/infra/typeorm/repositories/EstablishmentRepository';

import Establishment from '@modules/establishment/infra/typeorm/entities/Establishment';

class EstablishmentRepository implements IEstablishmentRepository {
  private ormRepository: Repository<Establishment>;

  constructor() {
    this.ormRepository = getRepository(Establishment);
  }
  /*findByCNPJ(cnpj: string): Promise<Establishment | undefined> {
    throw new Error('Method not implemented.');
  }*/
  findAllEstablishment(data: IFindAllEstablishmentDTO): Promise<Establishment[]> {
    throw new Error('Method not implemented.');
  }
  save(name: Establishment): Promise<Establishment> {
    throw new Error('Method not implemented.');
  }

  public async findByName({
    id,
    nomeFantasia,
  }: IFindAllEstablishmentDTO): Promise<Establishment | undefined> {
    const findEstablishment = await this.ormRepository.findOne({
      where: { id, nomeFantasia },
    });
    return findEstablishment;
  }

  public async create({
    cnpj,
    nomeFantasia,
    razaoSocial,
    phone,
    cep,
    endereco,
    numero,
    cidade,
    uf,
    ramo
  }: ICreateEstablishmentDTO): Promise<Establishment> {
    const Establishment = this.ormRepository.create({
      cnpj,
      nomeFantasia,
      razaoSocial,
      phone,
      cep,
      endereco,
      numero,
      cidade,
      uf,
      ramo,
    });

    await this.ormRepository.save(Establishment);

    return Establishment;
  }
}

export default EstablishmentRepository;
