import Button from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import Particles from "@/components/ui/particles";
import Foto from './Profile(1).png'
import FotoSuri from './WhatsApp Image 2025-02-02 at 09.44.23.jpeg'
import FotoKhidir from './Profile.png'

const damiData = [
    {
        img:Foto
    },
    {
        img:FotoSuri
    },
    {
        img:FotoKhidir
    }
]

export default function JoinUsSection (){
return(
    <section className="flex flex-col w-full h-full container gap-10 px-10 py-32 mx-auto bg-white lg:flex-row">
        <div className="relative rounded-[28px] flex w-full !h-[475px] justify-between overflow-hidden text-white bg-hero bg-hero-pattern">
            <div className="flex flex-col gap-y-[20px] p-[50px]">
                <div className="group relative flex max-w-fit flex-row items-center justify-center rounded-full bg-white/10 px-5 py-1 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-xs transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
                    <div className="absolute inset-0 block h-full w-full animate-gradient bg-linear-to-r from-blue-300/50 via-green-300/100 to-yellow-300/100 bg-[length:var(--bg-size)_100%] p-[1px] [mask-composite:subtract]! [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]" />
                    <span className="inline-block text-lg font-semibold text-center text-transparent text-max bg-linear-to-r from-blue-300 via-green-300 to-yellow-300 bg-clip-text">
                        SGA is Hiring	
                    </span>
                </div>
                <span className="font-bold text-[49px] flex w-[566px]">It's your turn to make ideas happen.</span>
                <p className="flex w-[566px] font-normal text-base mb-5">We're waiting for digital talents like you to join our team and help us to create an impact on society. Choose your desired path and start making changes through what you love.</p>
                <Button className="w-[566px]">Join Us</Button>
            </div>
            <div className="flex">
                <Marquee className="[--duration:15s]" pauseOnHover vertical>
                    {damiData.map((item,index)=>{
                        return(
                            <div key={index} className="flex items-center justify-around gap-4">
								<img
									src={item?.img}
									alt="Partner"
									className="w-[173px] h-[173px] aspect-video object-cover rounded-xl"
								/>
							</div>
                            )
                    })  
                  }
                </Marquee>
                <Marquee className="[--duration:15s]" pauseOnHover vertical reverse>
                     {damiData.map((item,index)=>{
                        return(
                            <div key={index} className="flex items-center justify-around gap-4">
								<img
									src={item?.img}
									alt="Partner"
									className="w-[173px] h-[173px] aspect-video object-cover rounded-xl"
								/>
							</div>
                            )
                    })  
                  }
                </Marquee>
                <Marquee className="[--duration:15s]" pauseOnHover vertical>
                     {damiData.map((item,index)=>{
                        return(
                            <div key={index} className="flex items-center justify-around gap-4">
								<img
									src={item?.img}
									alt="Partner"
									className="w-[173px] h-[173px] aspect-video object-cover rounded-xl"
								/>
							</div>
                            )
                    })  
                  }
                </Marquee>     
            </div>
            <Particles
				quantity={500}
				size={0.1}
				staticity={50}
				className="absolute w-full h-full overflow-clip"
			/>
        </div>
    </section>
)
}
