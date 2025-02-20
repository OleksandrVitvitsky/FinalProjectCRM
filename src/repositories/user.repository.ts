import { IUser } from '../interfaces/user.interface';
import { User } from '../models/user.model';

class UserRepository {
  public async getByParams(params: Partial<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }

  //
  // public async getList(query: any): Promise<IUser[]> {
  //   return await User.find().limit(query.limit).skip(query.skip);
  // }
  //
  public async create(dto: IUser): Promise<IUser> {
    const lastUser = await User.findOne().sort({ internal_id: -1 });
    const newInternalId = lastUser ? lastUser.internal_id + 1 : 1;
    return await User.create({ ...dto, internal_id: newInternalId });
  }

  //
  // public async getById(userId: string): Promise<IUser> {
  //   return await User.findById(userId);
  // }
  //
  // public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
  //   return await User.findByIdAndUpdate(userId, dto, {
  //     returnDocument: "after",
  //   });
  // }
  //
  // public async findWithOutActivityAfter(date: Date): Promise<IUser[]> {
  //   return await User.aggregate([
  //     {
  //       $lookup: {
  //         from: Token.collection.name,
  //         let: { userId: "$_id" },
  //         pipeline: [
  //           { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
  //           { $match: { createdAt: { $gt: date } } },
  //         ],
  //         as: "tokens",
  //       },
  //     },
  //     {
  //       $match: { tokens: { $size: 0 } },
  //     },
  //     // {
  //     //   $project: {
  //     //     _id: 1,
  //     //     email: 1,
  //     //     name: 1,
  //     //   },
  //     // },
  //   ]);
  // }
  //
  // public async deleteById(userId: string): Promise<void> {
  //   await User.deleteOne({ _id: userId });
  // }
}

export const userRepository = new UserRepository();
