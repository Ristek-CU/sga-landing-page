import { Badge } from "@/components/ui/badge";
import photoSga from "@/assets/images/photoSga.png";

export default function VisionSection() {
    return (
        <section className='flex flex-col w-full h-full max-w-screen-xl gap-10 px-10 py-32 mx-auto bg-white lg:flex-row'>
            <img src={photoSga} />
            <div className='flex-1 space-y-6'>
                <Badge className='mb-2'>Vision</Badge>
                <h1 className='text-4xl font-semibold'>Inspirasi Kepemimpinan dan Inovasi di
                    <span className='text-green-500'>Lingkungan Kampus</span>
                </h1>
                <p className='text-gray-300'>Menjadi pelopor dalam pengembangan kepemimpinan mahasiswa yang berkelanjutan, dengan menciptakan lingkungan yang mendorong inovasi, kolaborasi, dan inklusivitas. Kami berkomitmen untuk memberdayakan setiap mahasiswa agar dapat menjadi pemimpin yang berintegritas, visioner, dan berkontribusi positif.</p>
            </div>
        </section>
    )
}
