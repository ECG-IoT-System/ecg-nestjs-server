import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Ecgdata } from '../ecgdata/entities/ecgdata.entity';
import { Mac } from '../macs/mac.entity';
import { Ecgdata12 } from 'src/ecgdata12/ecgdata12.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Mac)
    private readonly macRepository: Repository<Mac>,
    @InjectRepository(Ecgdata)
    private readonly EcgdataRepository: Repository<Ecgdata>,
    @InjectRepository(Ecgdata12)
    private readonly Ecgdata12Repository: Repository<Ecgdata12>,
    
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User[]> {
    return await this.userRepository.find({ username });
  }

  async createOne(user): Promise<User> {
    let Isuser = await this.userRepository.findOne({ username : user.username });
    console.log(Isuser);
    if (!Isuser) { 
      return await this.userRepository.save(user);
    }
  }

  async updateLasttime(param) {
    let user = await this.userRepository.findOne({id : param.id});
    if(param.lasttime && param.lasttime > user.lasttime){
      return await this.userRepository.update({ id :param.id },{lasttime:param.lasttime});
    }
      
    else if(param.lasttime_12L && param.lasttime_12L > user.lasttime_12L){
      return await this.userRepository.update({ id :param.id },{lasttime_12L:param.lasttime_12L});
    }

    else if(param.lasttime_afstat && param.lasttime_afstat > user.lasttime_afstat){
      return await this.userRepository.update({ id :param.id },{lasttime_afstat:param.lasttime_afstat});
    }  
    return;
  }

}