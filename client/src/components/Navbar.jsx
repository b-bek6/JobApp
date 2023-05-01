export default function Navbar(){
    return (
        <>
            <header className="bg-[#EEEFFB] flex items-center justify-around h-[78px]">
                <div>
                    <logo className="font-sans text-[#0D0E43] ">Heko</logo>
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
                <div>
                    <input type="text"></input>
                    <logo><button>search</button></logo>
                </div>
            </header>
        </>
    )
}