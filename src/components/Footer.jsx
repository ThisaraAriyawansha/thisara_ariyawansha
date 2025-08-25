export default function Footer() {
  return (
    <footer className="bg-white text-black text-center py-6 transition-colors duration-300 dark:bg-black dark:text-white">
      <p>© {new Date().getFullYear()} Thisara. All rights reserved.</p>
    </footer>
  );
}