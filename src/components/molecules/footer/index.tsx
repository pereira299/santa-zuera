const Footer = () => {
  return (
    <footer className="items-center h-12 bg-zinc-900 text-white px-5 flex flex-row justify-between">
      <p className="text-center">
        Desenhado e desenvolvido com muito ❤️ e ☕️ por{" "}
        <a href="https://pereira299.dev" className="font-bold underline">Lucas Pereira</a>
      </p>
      <p className="text-center">© {new Date().getFullYear()} Santa Zuera</p>
    </footer>
  );
};

export default Footer;
