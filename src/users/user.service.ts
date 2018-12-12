import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Mac } from '../macs/mac.entity'


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,   
    @InjectRepository(Mac)
    private readonly macRepository: Repository<Mac>,
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
    //console.log(user);
    if(param.lasttime && param.lasttime > user.lasttime){
      var minlasttime = await this.macRepository.createQueryBuilder("mac")
      .select("min(mac.lasttime)","mintime")
      .where({user:param.id, status:true}).execute();
      console.log(param.lasttime , minlasttime[0].mintime);
      var updateinfo = await this.userRepository.update({ id :param.id },{lasttime:minlasttime[0].mintime});
      console.log(updateinfo);
      return;
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