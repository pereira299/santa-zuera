import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-y-5">
      <h2 className="font-bitter text-8xl text-zinc-400">404</h2>
      <p className="text-2xl lg:text-xl font-lato">Oops! Essa página não existe</p>
      <Link href="/" className="text-xl lg:text-lg text-black bg-white rounded py-2 font-bold px-3">Ir para a página inicial</Link>
    </main>
  );
}