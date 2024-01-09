import { Glow } from '@codaworks/react-glow';

// Components
import Animation from '../../atoms/Animation';

const Home = () => {
  return (
    <Glow color='#6366f1'>
      <section className="flex justify-center items-center flex-col">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1
            className="mb-8 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
            VentiPay: Technical Challenge for Your Success
          </h1>
          <p className="mb-8 text-lg font-normal text-indigo-500/75 glow:text-glow lg:text-xl sm:px-16 lg:px-48">
            Are you ready to test your skills? Join us in the search for exceptional talent.
            Our technical test will challenge you, inspire you, and open the doors to a world of opportunities. Your
            future begins here.
          </p>
        </div>
        <div className="text-center p-0 m-0">
          <Animation src="/animations/space.json" style={{ height: 'auto', width: 'auto' }} autoplay loop/>
        </div>
      </section>
    </Glow>
  );
};

export default Home;