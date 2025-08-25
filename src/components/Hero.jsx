export default function Hero() {
  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center text-center min-h-screen bg-white text-black px-6 transition-colors duration-300 dark:bg-black dark:text-white"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 transition-colors duration-300">
        Hi, I’m <span className="text-black dark:text-white">Thisara</span>
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-8 transition-colors duration-300">
        A passionate Web Developer creating modern, responsive, and beautiful websites.
      </p>
      <a
        href="#projects"
        className="px-6 py-3 bg-black text-white rounded-lg text-lg font-medium transition-all duration-300 hover:opacity-80 dark:bg-white dark:text-white"
      >
        View My Work
      </a>
    </section>
  );
}