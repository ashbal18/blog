
import Link from "next/link";
import Image from "next/image";
import Menu from "./menu";

export default function Navbar() {
  // const router = useRouter();
  // const user = userSelector((state: RootState) => state.user);
  return (
    <div className="h-[60px] w-screen bg-slate-50 max-sm:bg-orange-600 flex justify-between items-center text-black pr-10 pl-5">

      <Link href="/" className="flex items-center">
        <Image
          src="/blog.jpg" 
          alt="Logo Blog"
          width={50} 
          height={50} 
          className="mr-3" 
        />
        <span className="font-bold text-lg">Blog</span>
      </Link>
      <Menu />
      </div>
  );
}
        