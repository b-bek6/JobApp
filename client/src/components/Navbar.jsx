import { AiOutlineSearch } from "react-icons/ai"
import Link from "next/link"
export default function Navbar(){
    return (
        <>
            <header className="p-2 gap-2 bg-[#EEEFFB] flex items-center justify-around h-[78px] md:flex-col md:container md:h-full">
                <div>
                    <logo href={"/"} className='text-4xl font-bold text-[#0D0E43]'>Heko</logo>
                </div>
                <div>
                    <nav>
                        <ul className="flex p-2 justify-center align-middle gap-[4vw] font-light">
                            <li>Home</li>
                            <li>Pages</li>
                            <li>Products</li>
                            <li>Blog</li>
                            <li>Shop</li>
                            <li>Contact</li>
                        </ul>
                    </nav>
                </div>
                <form className="flex mt-3">
                    <input type="text" className="border w-full" />
                    <logo className="bg-secondary text-white p-2 inline">
                        <AiOutlineSearch className="inline"/>
                    </logo>
                </form>
            </header>
        </>
    )
}