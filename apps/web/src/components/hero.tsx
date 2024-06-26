import { GradientBackground } from './gradient-bg';

export const Hero = () => {
  return (
    <section className="flex flex-col gap-10 overflow-hidden">
      <GradientBackground />
      <h1 className="text-5xl text-center">Hey, Stranger!</h1>
      <p className="text-center text-3xl">Please login and join the platform</p>
    </section>
  );
};
