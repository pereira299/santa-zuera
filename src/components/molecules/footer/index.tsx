const Footer = () => {
  return (
    <footer className="min-h-12 h-fit py-2 bg-zinc-900 gap-3 text-white px-5 flex flex-col md:flex-row justify-between items-start">
      <p className="text-lg md:text-base">
        Desenhado e desenvolvido com muito ❤️ e ☕️ por{" "}
        <a href="https://pereira299.dev" className="font-bold underline">Lucas Pereira</a>
      </p>
      <p className="text-lg md:text-base">© {new Date().getFullYear()} Santa Zuera</p>
    </footer>
  );
};

export default Footer;
