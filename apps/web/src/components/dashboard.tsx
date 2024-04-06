import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import prisma from '@repo/database/client';
import { AddApp } from './add-app';
import { Repo } from './repo';

export const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const username = session.user.name;

  const res = await prisma.repo.findMany({
    where: {
      ownerUsername: username,
    },
  });

  if (!res.length)
    return (
      <>
        <h1 className="text-center">
          You don't have any associated github repos yet
        </h1>
        <AddApp />
      </>
    );

  return (
    <section className="flex justify-center flex-col items-center">
      <div className="p-5">
        <div className="px-4 text-xs lg:text-base py-2 rounded-full bg-secondary text-primary">
          Handle your github repositories easily
        </div>
      </div>
      <div className="lg:text-5xl font-bold text-center text-4xl">
        Which repo do u want to monitor?
      </div>
      <div className="grid md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1 m-5 p-10 md:m-10 border-2 rounded-xl border-black dark:border-white">
        {res.map((repo: any) => {
          return (
            <Repo title={repo.name} owner={repo.ownerUsername} key={repo.id} />
          );
        })}
      </div>
      <div>Add more + </div>
      <AddApp />
    </section>
  );
};
