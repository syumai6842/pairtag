import Image from 'next/image';

export default function GameEnd() {
    return (
        <div className="h-[86vh]">
            <div className="flex items-center w-full whitespace-nowrap pt-12">
                <div className="h-[1px] bg-white w-[35vw]"></div>
                <h1 className="text-5xl tracking-tighter text-transparent [-webkit-text-stroke:0.75px_white] mx-4">ゲーム終了！</h1>
                <div className="h-[1px] bg-white w-[35vw]"></div>
            </div>
            <div className="h-full flex items-center justify-center gap-6 -mt-8 -ml-2">
                <Image 
                    src="/img/pairtaglogo.png" 
                    alt="Pairtag Logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                    className="w-[160px] h-auto"
                />
                <div className="h-20 w-[1px] bg-white"></div>
                <p className="text-white text-2xl text-center">
                    Thanks for<br />playing.
                </p>
            </div>
        </div>
    );
}