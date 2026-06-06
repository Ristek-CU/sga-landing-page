import { useMemo, useState, useRef } from "react";
import heroPattern from "@/assets/images/sga-pattern.webp";
import membersData from "@/lib/data/members.json";
import { Badge } from "@/components/ui/badge";
import Particles from "@/components/ui/particles";
import DivisionSelectButton from "./partials/division-select-button";
import MemberCard from "./partials/member-card";

type Division = keyof typeof membersData;
const divisions = Object.keys(membersData) as Division[];

export default function DivisionSection() {
    const [selectedDivision, setSelectedDivision] = useState<Division>("Executive Board");

    const currentMembers = useMemo(
        () => membersData[selectedDivision],
        [selectedDivision],
    );

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => { setIsDragging(false); };
    const handleMouseUp = () => { setIsDragging(false); };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section
            id="division"
            className="relative w-full py-20 overflow-hidden bg-[#0f3d44] xl:py-28"
        >
            {/* Background & Particles tetap sama */}
            <div
                className="absolute inset-0 z-0 bg-fixed bg-center bg-cover opacity-50 pointer-events-none"
                style={{ backgroundImage: `url(${heroPattern})` }}
            />
            <Particles
                className="absolute inset-0 z-[1] pointer-events-none"
                quantity={100}
                ease={80}
                color="#F4CE6A"
                refresh
            />

            <div className="container relative z-10 flex flex-col items-center w-full h-full px-5 mx-auto">

                <div className="flex justify-center w-full mb-12 lg:mb-16">
                    <Badge variant="special">Meet Our Team!</Badge>
                </div>

                {/* Layout: flex-row (Menu Kiri, Card Kanan) */}
                <div className="flex flex-row w-full gap-x-4 lg:gap-x-16 gap-y-10 items-stretch">

                    {/* Sidebar Menu Divisi (Kiri) */}
                    <div className="flex flex-col gap-4 w-28 sm:w-32 lg:w-64 shrink-0 h-[340px] lg:h-auto overflow-y-auto lg:overflow-visible pb-4 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="flex flex-col gap-3 lg:gap-6 w-full px-1">
                            {divisions.map((division) => (
                                <DivisionSelectButton
                                    key={division}
                                    isActive={selectedDivision === division}
                                    onClick={() => setSelectedDivision(division)}
                                >
                                    {division}
                                </DivisionSelectButton>
                            ))}
                        </div>
                    </div>

                    {/* Area Card Member (Kanan) */}
                    <div
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        className={`flex flex-row flex-1 w-full gap-4 lg:gap-6 pb-8 pl-1 overflow-x-auto select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}`}
                    >
                        {currentMembers.map(({ name, role, imagePath, linkedInUrl }) => (
                            <div key={name} className="shrink-0 snap-start w-[160px] sm:w-[240px] lg:w-auto h-[320px] lg:h-full">
                                <MemberCard
                                    name={name}
                                    position={role}
                                    image={imagePath ?? null}
                                    linkedinUrl={linkedInUrl}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}