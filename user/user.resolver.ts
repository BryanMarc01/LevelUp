import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}


  @Query(returns => User)
  async findUserById(@Args('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }
  @Query(returns => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(returns => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(returns => User)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
  ): Promise<User> {
    return this.userService.createUser(name, email);
  }

  @Mutation(returns => User)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
    @Args('email') email: string,
  ) {
    const updateUserInput = { name, email };
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(returns => Boolean)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id).then(() => true);
  }
}
