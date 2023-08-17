import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToDo, ToDoDocument } from './schemas/todo.schemas';
import { CreateToDoDto } from './dto/create-todo.dto';

@Injectable()
export class ToDoService {
  constructor(
    @InjectModel(ToDo.name) private toDoModel: Model<ToDoDocument>,
  ) {}

  async findAll(): Promise<ToDo[]> {
    return this.toDoModel.find();
  }

  async findOne(id: string): Promise<ToDo> {
    return this.toDoModel.findOne({ _id: id });
  }

  async create(createToDoDto: CreateToDoDto): Promise<ToDo> {
    const createdCost = new this.toDoModel(createToDoDto);
    return createdCost.save();
  }

//   async update(updateCostDto: UpdateCostDto, id: string): Promise<ToDo> {
//     await this.costsModel.updateOne(
//       { _id: id },
//       {
//         $set: {
//           ...updateCostDto,
//         },
//       },
//     );

//     return this.findOne(id);
//   }

  async delete(id: string): Promise<void> {
    await this.toDoModel.deleteOne({ _id: id });
  }
}