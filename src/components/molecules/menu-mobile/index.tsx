import { Menu } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import Link from "next/link";
import Search from "../../organisms/search";

const MenuMobile = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"ghost"} className="md:hidden">
          <Menu className="w-7 h-fit" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle><h5 className="text-4xl text-center">Menu</h5></DrawerTitle>
          <DrawerClose />
        </DrawerHeader>
        <nav className="flex flex-col gap-y-4 px-4 py-14">
          <ul className="flex flex-col gap-y-8 text-center text-2xl 3xl:text-3xl">
            <li className="hover:text-zinc-300">
              <Link
                href="/#membros"
                aria-label="membros"
                className="underline-link"
              >
                Integrantes
              </Link>
            </li>
            <li className="hover:text-zinc-300">
              <Link
                href="/#episodes"
                aria-label="episódios"
                className="underline-link"
              >
                Últimos episódios
              </Link>
            </li>
            <li className="hover:text-zinc-300 flex items-center justify-center">
              <Search />
            </li>
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuMobile;
