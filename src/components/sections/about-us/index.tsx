import { Badge } from '@/components/ui/badge'
import Photo from './Photo.png'

export default function AboutUsSection() {
    return (
        <section className='flex flex-col w-full h-full max-w-screen-xl gap-10 px-10 py-32 mx-auto bg-white lg:flex-row'>
            <div className='flex-1 space-y-6'>
                <Badge className='mb-2'>About Us</Badge>
                <h1 className='text-4xl font-semibold'>Kenali Lebih Dekat SGA{" "}
                    <span className='text-blue-500'>Cakrawala University</span>
                </h1>
                <p className='text-gray-300'>Student Government Association (SGA) Cakrawala University adalah wadah resmi bagi mahasiswa untuk berpartisipasi dalam pengambilan keputusan yang mempengaruhi kehidupan kampus. Kami berkomitmen untuk menjadi jembatan antara mahasiswa dan pihak universitas, serta mempromosikan kepemimpinan yang inklusif.</p>
            </div>
            <img src={Photo} />
        </section>
    )
}