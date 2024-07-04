import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(returns => User)
  user(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(returns => User)
  createUser(@Args('name') name: string, @Args('email') email: string) {
    const user = new User();
    user.name = name;
    user.email = email;
    return this.userService.create(user);
  }

  @Mutation(returns => User)
  updateUser(
    @Args('id') id: number,
    @Args('name') name: string,
    @Args('email') email: string,
  ) {
    const user = new User();
    user.name = name;
    user.email = email;
    return this.userService.update(id, user);
  }

  @Mutation(returns => Boolean)
  deleteUser(@Args('id') id: number) {
    return this.userService.remove(id).then(() => true);
  }
}
