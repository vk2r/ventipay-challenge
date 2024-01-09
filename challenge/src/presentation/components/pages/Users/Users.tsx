import { Glow } from '@codaworks/react-glow';

// Services
import { useUser } from '../../../../infrastructure/providers/User';

// Components
import Card from '../../atoms/Card';
import Avatar from '../../atoms/Avatar';

const Users = () => {
  // Hooks
  const { users } = useUser();

  return (
    <div className="mt-8">
      <Glow color='#6366f1' className="min-w-96">
        <Card
          className="glow:ring-1 glow:border-glow glow:ring-glow glow:bg-glow/[.15]">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-white">Latest Users</h5>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y glow:divide-gray-200 dark:divide-gray-700">
              {!users && (
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar src={'https://ui-avatars.com/api/?name=not found&background=random'}/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium truncate text-white">
                        Not found
                      </p>
                    </div>
                  </div>
                </li>
              )}
              {users?.map((user, key) => {
                const { name, email } = user;
                const last = key === users.length - 1;
                const formatted = encodeURIComponent(name);
                const className = last ? 'pt-3 pb-0 sm:pt-4' : 'py-3 sm:py-4';
                return (
                  <li key={key} className={className}>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Avatar src={`https://ui-avatars.com/api/?name=${formatted}&background=random`}/>
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium truncate text-white">
                          {name}
                        </p>
                        <p className="text-sm truncate text-gray-400">
                          {email}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-white glow:text-glow">
                        #{key + 1}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>
      </Glow>
    </div>
  );
};

export default Users;