import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a new user', async () => {
    const user = new User();
    user.name = 'Test User';
    user.email = 'test@example.com';

    jest.spyOn(service, 'createUser').mockResolvedValue(user as any);

    expect(await resolver.createUser('Test User', 'test@example.com')).toEqual(user);
  });

  it('should find a user by id', async () => {
    const user = new User();
    user.id = 1;
    user.name = 'Test User';
    user.email = 'test@example.com';

    jest.spyOn(service, 'findUserById').mockResolvedValue(user as any);

    expect(await resolver.findUserById(1)).toEqual(user);
  });

  
});
