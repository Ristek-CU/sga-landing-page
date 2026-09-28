<<<<<<< HEAD
import Button from "@/components/ui/button";
import SectionLabel from "@/components/ui/section-label";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRightIcon, ClockIcon, FlagIcon } from "lucide-react";
=======
// import { ClockIcon, FlagIcon, ArrowRightIcon } from "lucide-react";
// import Button from "@/components/ui/button";
// import useEmblaCarousel from "embla-carousel-react";
// import React from "react";

// export default function EventSection() {
//     const [emblaRef] = useEmblaCarousel({ loop: false, dragFree: true });

//     const carouselSlides = [
//         // Card 1: Cakrawala Festival 2026
//         <div
//             key="event-1"
//             className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full pointer-events-none"
//             style={{
//                 background: "linear-gradient(180deg, #063A4C 0%, #0A5C75 100%)",
//             }}
//         >
//             <div className="flex justify-center mb-1">
//                 <div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] bg-[#FCDD96]/15 backdrop-blur-md shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.15)] text-[18px] min-w-[160px]">
//                     <svg
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="url(#ongoing-gradient)"
//                         strokeWidth="2.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     >
//                         <defs>
//                             <linearGradient
//                                 id="ongoing-gradient"
//                                 x1="0"
//                                 y1="0"
//                                 x2="1"
//                                 y2="0"
//                             >
//                                 <stop offset="0%" stopColor="#FCDD96" />
//                                 <stop offset="100%" stopColor="#EBC05F" />
//                             </linearGradient>
//                         </defs>
//                         <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
//                     </svg>
//                     <span
//                         style={{
//                             background:
//                                 "linear-gradient(90deg, #FCDD96 0%, #EBC05F 100%)",
//                             WebkitBackgroundClip: "text",
//                             WebkitTextFillColor: "transparent",
//                             fontWeight: 600,
//                         }}
//                     >
//                         On Going
//                     </span>
//                 </div>
//             </div>

//             <div className="flex-1 flex flex-col">
//                 <div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
//                     <h3
//                         className="font-normal uppercase text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
//                         style={{
//                             color: "#EBC05F",
//                             textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50)",
//                             fontFamily: '"Pink and Crimson", sans-serif',
//                         }}
//                     >
//                         CAKRAWALA FESTIVAL 2026
//                     </h3>
//                 </div>

//                 <p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
//                     Lorem ipsum dolor sit amet consectetur. Lectus amet
//                     congue mauris ut. Sit non in sed tristique. Tempus
//                     faucibus enim nulla lorem bibendum in cursus.
//                 </p>
//             </div>

//             <div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
//                 <div className="flex items-center gap-3">
//                     <svg
//                         className="w-5 h-5 text-[#EBC05F] shrink-0"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                     <span>15 Desember 2006</span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                     <svg
//                         className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                     <span>Cakrawala University, Kampus Kemang</span>
//                 </div>
//             </div>

//             <Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#CEAE65] bg-[#CEAE65] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
//                 Join Now!
//             </Button>

//             <div className="flex justify-center items-center gap-2.5 mt-4">
//                 <div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//             </div>
//         </div>,

//         // Card 2: Cakrawala Arena 2026
//         <div
//             key="event-2"
//             className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full pointer-events-none"
//             style={{
//                 background: "linear-gradient(180deg, #063A4C 0%, #0A5C75 100%)",
//             }}
//         >
//             <div className="flex justify-center mb-1">
//                 <div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] bg-[#89d4e5]/20 backdrop-blur-md shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.15)] text-[18px] min-w-[160px]">
//                     <ClockIcon
//                         className="w-6 h-6 text-[#89d4e5]"
//                         strokeWidth={2.5}
//                     />
//                     <span className="text-[#89d4e5] font-semibold">
//                         Coming Soon
//                     </span>
//                 </div>
//             </div>

//             <div className="flex-1 flex flex-col">
//                 <div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
//                     <h3
//                         className="font-semibold text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
//                         style={{
//                             color: "#F4F4F4",
//                             textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50)",
//                             fontFamily: '"Plus Jakarta Sans", sans-serif',
//                         }}
//                     >
//                         Cakrawala Arena 2026
//                     </h3>
//                 </div>

//                 <p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
//                     Lorem ipsum dolor sit amet consectetur. Lectus amet
//                     congue mauris ut. Sit non in sed tristique. Tempus
//                     faucibus enim nulla lorem bibendum in cursus.
//                 </p>
//             </div>

//             <div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
//                 <div className="flex items-center gap-3">
//                     <svg
//                         className="w-5 h-5 text-[#EBC05F] shrink-0"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                     <span>15 Desember 2006</span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                     <svg
//                         className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                     <span>Cakrawala University, Kampus Kemang</span>
//                 </div>
//             </div>

//             <Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#A3A077] bg-[#A3A077] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
//                 Coming Soon
//             </Button>

//             <div className="flex justify-center items-center gap-2.5 mt-4">
//                 <div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//             </div>
//         </div>,

//         // Card 3: Hackatown Fest 2026
//         <div
//             key="event-3"
//             className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full pointer-events-none"
//             style={{
//                 background: "linear-gradient(180deg, #063A4C 0%, #0A5C75 100%)",
//             }}
//         >
//             <div className="flex justify-center mb-1">
//                 <div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] bg-[#EE6C6C]/20 backdrop-blur-md shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.15)] text-[18px] min-w-[160px]">
//                     <FlagIcon
//                         className="w-6 h-6 text-[#EE6C6C]"
//                         strokeWidth={2.5}
//                     />
//                     <span className="text-[#EE6C6C] font-semibold">
//                         Concluded
//                     </span>
//                 </div>
//             </div>

//             <div className="flex-1 flex flex-col">
//                 <div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
//                     <h3
//                         className="font-normal uppercase text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
//                         style={{
//                             color: "#CC68FA",
//                             textShadow:
//                                 "-1px -1px 0 #3F2A48, 1px -1px 0 #3F2A48, -1px 1px 0 #3F2A48, 1px 1px 0 #3F2A48, -2px 0 0 #3F2A48, 2px 0 0 #3F2A48, 0 -2px 0 #3F2A48, 0 2px 0 #3F2A48, 0px 4px 4px rgba(0, 0, 0, 0.50)",
//                             fontFamily: '"Planet Kosmos", sans-serif',
//                             letterSpacing: "4px",
//                         }}
//                     >
//                         HACKATOWN FEST 2026
//                     </h3>
//                 </div>

//                 <p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
//                     Lorem ipsum dolor sit amet consectetur. Lectus amet
//                     congue mauris ut. Sit non in sed tristique. Tempus
//                     faucibus enim nulla lorem bibendum in cursus.
//                 </p>
//             </div>

//             <div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
//                 <div className="flex items-center gap-3">
//                     <svg
//                         className="w-5 h-5 text-[#EBC05F] shrink-0"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                     <span>15 Desember 2006</span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                     <svg
//                         className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                     <span>Cakrawala University, Kampus Kemang</span>
//                 </div>
//             </div>

//             <Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#82886E] bg-[#82886E] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
//                 Closed
//             </Button>

//             <div className="flex justify-center items-center gap-2.5 mt-4">
//                 <div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//             </div>
//         </div>,

//         // Card 4: Cakrawala Camp 2026
//         <div
//             key="event-4"
//             className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full pointer-events-none"
//             style={{
//                 background: "linear-gradient(180deg, #063A4C 0%, #0A5C75 100%)",
//             }}
//         >
//             <div className="flex justify-center mb-1">
//                 <div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] bg-[#89d4e5]/20 backdrop-blur-md shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.15)] text-[18px] min-w-[160px]">
//                     <ClockIcon
//                         className="w-6 h-6 text-[#89d4e5]"
//                         strokeWidth={2.5}
//                     />
//                     <span className="text-[#89d4e5] font-semibold">
//                         Coming Soon
//                     </span>
//                 </div>
//             </div>

//             <div className="flex-1 flex flex-col">
//                 <div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
//                     <h3
//                         className="font-semibold text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
//                         style={{
//                             color: "#F4F4F4",
//                             textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50)",
//                             fontFamily: '"Plus Jakarta Sans", sans-serif',
//                         }}
//                     >
//                         Cakrawala Camp 2026
//                     </h3>
//                 </div>

//                 <p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
//                     Lorem ipsum dolor sit amet consectetur. Lectus amet
//                     congue mauris ut. Sit non in sed tristique. Tempus
//                     faucibus enim nulla lorem bibendum in.
//                 </p>
//             </div>

//             <div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
//                 <div className="flex items-center gap-3">
//                     <svg
//                         className="w-5 h-5 text-[#EBC05F] shrink-0"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                     <span>15 Desember 2006</span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                     <svg
//                         className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                     <span>Cakrawala University, Kampus Kemang</span>
//                 </div>
//             </div>

//             <Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#A3A077] bg-[#A3A077] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
//                 Coming Soon
//             </Button>

//             <div className="flex justify-center items-center gap-2.5 mt-4">
//                 <div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//             </div>
//         </div>,

//         // Card 5: Cakrawala Fair 2026
//         <div
//             key="event-5"
//             className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full pointer-events-none"
//             style={{
//                 background: "linear-gradient(180deg, #063A4C 0%, #0A5C75 100%)",
//             }}
//         >
//             <div className="flex justify-center mb-1">
//                 <div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] bg-[#FCDD96]/15 backdrop-blur-md shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.15)] text-[18px] min-w-[160px]">
//                     <svg
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="url(#ongoing-gradient-2)"
//                         strokeWidth="2.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     >
//                         <defs>
//                             <linearGradient
//                                 id="ongoing-gradient-2"
//                                 x1="0"
//                                 y1="0"
//                                 x2="1"
//                                 y2="0"
//                             >
//                                 <stop offset="0%" stopColor="#FCDD96" />
//                                 <stop offset="100%" stopColor="#EBC05F" />
//                             </linearGradient>
//                         </defs>
//                         <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
//                     </svg>
//                     <span
//                         style={{
//                             background:
//                                 "linear-gradient(90deg, #FCDD96 0%, #EBC05F 100%)",
//                             WebkitBackgroundClip: "text",
//                             WebkitTextFillColor: "transparent",
//                             fontWeight: 600,
//                         }}
//                     >
//                         On Going
//                     </span>
//                 </div>
//             </div>

//             <div className="flex-1 flex flex-col">
//                 <div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
//                     <h3
//                         className="font-normal uppercase text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
//                         style={{
//                             color: "#EBC05F",
//                             textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50)",
//                             fontFamily: '"Pink and Crimson", sans-serif',
//                         }}
//                     >
//                         CAKRAWALA FAIR 2026
//                     </h3>
//                 </div>

//                 <p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
//                     Lorem ipsum dolor sit amet consectetur. Lectus amet
//                     congue mauris ut. Sit non in sed tristique. Tempus
//                     faucibus.
//                 </p>
//             </div>

//             <div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
//                 <div className="flex items-center gap-3">
//                     <svg
//                         className="w-5 h-5 text-[#EBC05F] shrink-0"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                     <span>15 Desember 2006</span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                     <svg
//                         className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                     <span>Cakrawala University, Kampus Kemang</span>
//                 </div>
//             </div>

//             <Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#CEAE65] bg-[#CEAE65] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
//                 Join Now!
//             </Button>

//             <div className="flex justify-center items-center gap-2.5 mt-4">
//                 <div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//                 <div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
//             </div>
//         </div>,

//         // Card 6: "Lihat Lainnya"
//         <div
//             key="event-view-more"
//             className="rounded-[20px] flex flex-col items-center justify-center gap-4 sm:gap-5 h-full w-full pointer-events-none"
//             style={{ minHeight: "500px" }}
//         >
//             <Button className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full border-[3px] border-[#CEAE65]/20 bg-[#CEAE65] hover:bg-[#B3934F] text-white shadow-[0_4px_15px_0_rgba(206,174,101,0.4)] transition-transform hover:scale-105 pointer-events-auto flex items-center justify-center p-0 group">
//                 <ArrowRightIcon 
//                     className="group-hover:translate-x-2 transition-transform duration-300" 
//                     style={{ width: "48px", height: "48px" }}
//                     strokeWidth={2.5}
//                 />
//             </Button>
//             <span className="font-semibold font-sans text-[#06455B] text-[18px] sm:text-[22px]">
//                 Lihat Lainnya
//             </span>
//         </div>
//     ];

//     return (
//         /* pb-[100px] ditambahkan untuk memberi jarak rapi agar tidak mepet footer di mobile/desktop */
//         <section id="event" className="w-full bg-white pb-[80px] sm:pb-[100px]">
//             <div className="container px-5 pt-[50px] mx-auto text-center flex flex-col items-center">
//                 <div className="inline-flex items-center justify-center rounded-[30px] p-[2px] bg-linear-to-b from-[#CEAE65] to-[#685833] mb-5 shadow-sm">
//                     <div className="bg-white rounded-[30px] px-8 py-2.5 flex items-center justify-center">
//                         <span
//                             className="font-bold text-lg sm:text-[22px]"
//                             style={{
//                                 background:
//                                     "linear-gradient(180deg, #CEAE65 0%, #896A22 100%)",
//                                 WebkitBackgroundClip: "text",
//                                 WebkitTextFillColor: "transparent",
//                                 fontFamily: '"Plus Jakarta Sans", sans-serif',
//                             }}
//                         >
//                             Event & Kegiatan
//                         </span>
//                     </div>
//                 </div>
//                 <h2 className="mt-4 sm:mt-5 text-center font-sans font-semibold text-[#06455B] text-[20px] sm:text-[37px] leading-normal sm:leading-[56px] w-full max-w-6xl mx-auto px-4 sm:px-0">
//                     An experience beyond the ordinary. Be part of something truly{' '}
//                     <span
//                         className="text-[#CEAE65] font-normal text-[36px] sm:text-[70px] leading-[0.8] tracking-wider inline align-baseline"
//                         style={{ fontFamily: "Italianno, cursive" }}
//                     >
//                         remarkable.
//                     </span>
//                 </h2>

//                 <div 
//                     className="overflow-hidden mt-6 sm:mt-8 w-full max-w-6xl mx-auto px-4 sm:px-0 cursor-grab active:cursor-grabbing select-none" 
//                     ref={emblaRef}
//                 >
//                     <div className="flex -ml-6 items-stretch">
//                         {carouselSlides.map((slide, index) => (
//                             <div
//                                 key={index}
//                                 /* Responsive Size: w-[75%] untuk mobile agar lebih kecil, md:w-[48%] untuk tablet, lg:w-[33%] untuk desktop */
//                                 className="shrink-0 flex-none w-[75%] md:w-[48%] lg:w-[33.3333%] min-w-0 pl-6 h-auto"
//                             >
//                                 {React.cloneElement(slide as React.ReactElement, { key: `card-${index}` })}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

<<<<<<< HEAD
>>>>>>> df38789 (Halaman EventPage New)
=======
// 


>>>>>>> ce2ce3c (Page event & kegiatan, dan calendar)
import React from "react";

import ticketBg from "../../../assets/images/ticketevet-bg.png";

export default function EventSection() {
<<<<<<< HEAD
<<<<<<< HEAD
	const [emblaRef] = useEmblaCarousel({ loop: false, dragFree: true });

	const carouselSlides = [
		// Card 1: Cakrawala Festival 2026
		<div
			key="event-1"
			className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full transition-transform duration-300 hover:-translate-y-2"
			style={{
				background: "linear-gradient(180deg, #06455B 0%, #056282 100%)",
			}}
		>
			<div className="flex justify-center mb-1">
				<div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] border border-[#FCDD96]/45 bg-[#FCDD96]/15 backdrop-blur-xs shadow-[inset_0_-8px_10px_rgba(252,221,150,0.16)] text-[18px] min-w-[160px]">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="url(#ongoing-gradient)"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<defs>
							<linearGradient id="ongoing-gradient" x1="0" y1="0" x2="1" y2="0">
								<stop offset="0%" stopColor="#FCDD96" />
								<stop offset="100%" stopColor="#EBC05F" />
							</linearGradient>
						</defs>
						<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
					</svg>
					<span
						style={{
							background: "linear-gradient(90deg, #FCDD96 0%, #EBC05F 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							fontWeight: 600,
						}}
					>
						On Going
					</span>
				</div>
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
					<h3
						className="font-normal uppercase text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
						style={{
							color: "#EBC05F",
							textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50)",
							fontFamily: '"Pink and Crimson", sans-serif',
						}}
					>
						CAKRAWALA FESTIVAL 2026
					</h3>
				</div>

				<p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
					Lorem ipsum dolor sit amet consectetur. Lectus amet congue mauris ut.
					Sit non in sed tristique. Tempus faucibus enim nulla lorem bibendum in
					cursus.
				</p>
			</div>

			<div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
				<div className="flex items-center gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clipRule="evenodd"
						/>
					</svg>
					<span>15 Desember 2006</span>
				</div>
				<div className="flex items-start gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Cakrawala University, Kampus Kemang</span>
				</div>
			</div>

			<Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#CEAE65] bg-[#CEAE65] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
				Join Now!
			</Button>

			<div className="flex justify-center items-center gap-2.5 mt-4">
				<div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
			</div>
		</div>,

		// Card 2: Cakrawala Arena 2026
		<div
			key="event-2"
			className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full transition-transform duration-300 hover:-translate-y-2"
			style={{
				background: "linear-gradient(180deg, #06455B 0%, #056282 100%)",
			}}
		>
			<div className="flex justify-center mb-1">
				<div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] border border-[#89d4e5]/45 bg-[#89d4e5]/20 backdrop-blur-xs shadow-[inset_0_-8px_10px_rgba(137,212,229,0.16)] text-[18px] min-w-[160px]">
					<ClockIcon className="w-6 h-6 text-[#89d4e5]" strokeWidth={2.5} />
					<span className="text-[#89d4e5] font-semibold">Coming Soon</span>
				</div>
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
					<h3
						className="font-semibold text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
						style={{
							color: "#F4F4F4",
							textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50)",
							fontFamily: '"Plus Jakarta Sans", sans-serif',
						}}
					>
						Cakrawala Arena 2026
					</h3>
				</div>

				<p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
					Lorem ipsum dolor sit amet consectetur. Lectus amet congue mauris ut.
					Sit non in sed tristique. Tempus faucibus enim nulla lorem bibendum in
					cursus.
				</p>
			</div>

			<div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
				<div className="flex items-center gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clipRule="evenodd"
						/>
					</svg>
					<span>15 Desember 2006</span>
				</div>
				<div className="flex items-start gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Cakrawala University, Kampus Kemang</span>
				</div>
			</div>

			<Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#A3A077] bg-[#A3A077] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
				Coming Soon
			</Button>

			<div className="flex justify-center items-center gap-2.5 mt-4">
				<div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
			</div>
		</div>,

		// Card 3: Hackatown Fest 2026
		<div
			key="event-3"
			className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full transition-transform duration-300 hover:-translate-y-2"
			style={{
				background: "linear-gradient(180deg, #06455B 0%, #056282 100%)",
			}}
		>
			<div className="flex justify-center mb-1">
				<div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] border border-[#EE6C6C]/45 bg-[#EE6C6C]/20 backdrop-blur-xs shadow-[inset_0_-8px_10px_rgba(238,108,108,0.16)] text-[18px] min-w-[160px]">
					<FlagIcon className="w-6 h-6 text-[#EE6C6C]" strokeWidth={2.5} />
					<span className="text-[#EE6C6C] font-semibold">Concluded</span>
				</div>
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
					<h3
						className="font-normal uppercase text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
						style={{
							color: "#CC68FA",
							textShadow:
								"-1px -1px 0 #3F2A48, 1px -1px 0 #3F2A48, -1px 1px 0 #3F2A48, 1px 1px 0 #3F2A48, -2px 0 0 #3F2A48, 2px 0 0 #3F2A48, 0 -2px 0 #3F2A48, 0 2px 0 #3F2A48, 0px 4px 4px rgba(0, 0, 0, 0.50)",
							fontFamily: '"Planet Kosmos", sans-serif',
							letterSpacing: "4px",
						}}
					>
						HACKATOWN FEST 2026
					</h3>
				</div>

				<p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
					Lorem ipsum dolor sit amet consectetur. Lectus amet congue mauris ut.
					Sit non in sed tristique. Tempus faucibus enim nulla lorem bibendum in
					cursus.
				</p>
			</div>

			<div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
				<div className="flex items-center gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clipRule="evenodd"
						/>
					</svg>
					<span>15 Desember 2006</span>
				</div>
				<div className="flex items-start gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Cakrawala University, Kampus Kemang</span>
				</div>
			</div>

			<Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#82886E] bg-[#82886E] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
				Closed
			</Button>

			<div className="flex justify-center items-center gap-2.5 mt-4">
				<div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
			</div>
		</div>,

		// Card 4: Cakrawala Camp 2026
		<div
			key="event-4"
			className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full transition-transform duration-300 hover:-translate-y-2"
			style={{
				background: "linear-gradient(180deg, #06455B 0%, #056282 100%)",
			}}
		>
			<div className="flex justify-center mb-1">
				<div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] border border-[#89d4e5]/45 bg-[#89d4e5]/20 backdrop-blur-xs shadow-[inset_0_-8px_10px_rgba(137,212,229,0.16)] text-[18px] min-w-[160px]">
					<ClockIcon className="w-6 h-6 text-[#89d4e5]" strokeWidth={2.5} />
					<span className="text-[#89d4e5] font-semibold">Coming Soon</span>
				</div>
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
					<h3
						className="font-semibold text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
						style={{
							color: "#F4F4F4",
							textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50)",
							fontFamily: '"Plus Jakarta Sans", sans-serif',
						}}
					>
						Cakrawala Camp 2026
					</h3>
				</div>

				<p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
					Lorem ipsum dolor sit amet consectetur. Lectus amet congue mauris ut.
					Sit non in sed tristique. Tempus faucibus enim nulla lorem bibendum
					in.
				</p>
			</div>

			<div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
				<div className="flex items-center gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clipRule="evenodd"
						/>
					</svg>
					<span>15 Desember 2006</span>
				</div>
				<div className="flex items-start gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Cakrawala University, Kampus Kemang</span>
				</div>
			</div>

			<Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#A3A077] bg-[#A3A077] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
				Coming Soon
			</Button>

			<div className="flex justify-center items-center gap-2.5 mt-4">
				<div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
			</div>
		</div>,

		// Card 5: Cakrawala Fair 2026
		<div
			key="event-5"
			className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full transition-transform duration-300 hover:-translate-y-2"
			style={{
				background: "linear-gradient(180deg, #06455B 0%, #056282 100%)",
			}}
		>
			<div className="flex justify-center mb-1">
				<div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] border border-[#FCDD96]/45 bg-[#FCDD96]/15 backdrop-blur-xs shadow-[inset_0_-8px_10px_rgba(252,221,150,0.16)] text-[18px] min-w-[160px]">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="url(#ongoing-gradient-2)"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<defs>
							<linearGradient
								id="ongoing-gradient-2"
								x1="0"
								y1="0"
								x2="1"
								y2="0"
							>
								<stop offset="0%" stopColor="#FCDD96" />
								<stop offset="100%" stopColor="#EBC05F" />
							</linearGradient>
						</defs>
						<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
					</svg>
					<span
						style={{
							background: "linear-gradient(90deg, #FCDD96 0%, #EBC05F 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							fontWeight: 600,
						}}
					>
						On Going
					</span>
				</div>
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
					<h3
						className="font-normal uppercase text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
						style={{
							color: "#EBC05F",
							textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50)",
							fontFamily: '"Pink and Crimson", sans-serif',
						}}
					>
						CAKRAWALA FAIR 2026
					</h3>
				</div>

				<p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
					Lorem ipsum dolor sit amet consectetur. Lectus amet congue mauris ut.
					Sit non in sed tristique. Tempus faucibus.
				</p>
			</div>

			<div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
				<div className="flex items-center gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clipRule="evenodd"
						/>
					</svg>
					<span>15 Desember 2006</span>
				</div>
				<div className="flex items-start gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Cakrawala University, Kampus Kemang</span>
				</div>
			</div>

			<Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#CEAE65] bg-[#CEAE65] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
				Join Now!
			</Button>

			<div className="flex justify-center items-center gap-2.5 mt-4">
				<div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
			</div>
		</div>,

		// Card 6: "Lihat Lainnya"
		<div
			key="event-view-more"
			className="rounded-[20px] flex flex-col items-center justify-center gap-4 sm:gap-5 h-full w-full pointer-events-none"
			style={{ minHeight: "500px" }}
		>
			<Button className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full border-[3px] border-[#CEAE65]/20 bg-[#CEAE65] hover:bg-[#B3934F] text-white shadow-[0_4px_15px_0_rgba(206,174,101,0.4)] transition-transform hover:scale-105 pointer-events-auto flex items-center justify-center p-0 group">
				<ArrowRightIcon
					className="group-hover:translate-x-2 transition-transform duration-300"
					style={{ width: "48px", height: "48px" }}
					strokeWidth={2.5}
				/>
			</Button>
			<span className="font-semibold font-sans text-[#06455B] text-[18px] sm:text-[22px]">
				Lihat Lainnya
			</span>
		</div>,
	];

	return (
		/* pb-[100px] ditambahkan untuk memberi jarak rapi agar tidak mepet footer di mobile/desktop */
		<section
			id="event"
			className="w-full scroll-mt-24 bg-white pb-[80px] sm:pb-[100px]"
		>
			<div className="container px-5 pt-[50px] mx-auto text-center flex flex-col items-center">
				<SectionLabel className="mb-5">Event & Kegiatan</SectionLabel>
				<h2 className="mt-4 sm:mt-5 text-center font-sans font-semibold text-[#06455B] text-[20px] sm:text-[37px] leading-normal sm:leading-[56px] w-full max-w-6xl mx-auto px-4 sm:px-0">
					An experience beyond the ordinary. Be part of something truly{" "}
					<span
						className="text-[#CEAE65] font-normal text-[36px] sm:text-[70px] leading-[0.8] tracking-wider inline align-baseline"
						style={{ fontFamily: "Italianno, cursive" }}
					>
						remarkable.
					</span>
				</h2>

				<div
					className="overflow-hidden mt-3 sm:mt-5 w-full max-w-6xl mx-auto px-4 pt-5 sm:px-0 cursor-grab active:cursor-grabbing select-none"
					ref={emblaRef}
				>
					<div className="flex -ml-6 items-stretch">
						{carouselSlides.map((slide, index) => (
							<div
								key={index}
								/* Responsive Size: w-[75%] untuk mobile agar lebih kecil, md:w-[48%] untuk tablet, lg:w-[33%] untuk desktop */
								className="shrink-0 flex-none w-[75%] md:w-[48%] lg:w-[33.3333%] min-w-0 pl-6 h-auto"
							>
								{React.cloneElement(slide as React.ReactElement, {
									key: `card-${index}`,
								})}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
=======
  const navigate = useNavigate();
=======
  const handleNavigate = () => {
    window.location.href = "/events";
  };
>>>>>>> ce2ce3c (Page event & kegiatan, dan calendar)

  return (
    <section className="w-full bg-[#F8F9FA] py-16 px-4 flex flex-col items-center justify-center font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Header Section */}
      <div className="flex flex-col items-center text-center max-w-4xl mb-10">
        
        {/* Badge 'Event & Kegiatan' */}
        <div className="flex justify-center mb-8">
              <div className="inline-flex items-center justify-center p-[2px] rounded-[30px] bg-gradient-to-r from-[#CEAE65] to-[#685833] shadow-sm">
                <div className="px-[30px] py-[6px] rounded-[28px] bg-white flex items-center justify-center gap-[10px]">
                  <span className="text-[#CEAE65] font-semibold text-sm sm:text-base">
                    Event & Kegiatan
                  </span>
                </div>
              </div>
            </div>

        {/* Title Teks Utama */}
        <h2 className="text-2xl sm:text-[37px] font-semibold text-[#093B4C] leading-[40px] sm:leading-[48px] tracking-[0%] max-w-[1235px]">
          An experience beyond the ordinary. Be part of something truly
          <span className="font-italianno font-normal text-[#DDA835] text-5xl sm:text-[80px] leading-[60px] sm:leading-[66px] -mt-1 sm:-mt-2 block">
            remarkable
          </span>
        </h2>
      </div>

      {/* 2. Container Tiket Utama */}
      <div className="relative w-full max-w-[980px] ml-50 aspect-[760/260] drop-shadow-2xl transition-transform hover:scale-[1.01] duration-300">
        
        {/* Layer Gambar Background Tiket */}
        <img
          src={ticketBg}
          alt="SGA Event Ticket"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
        />

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex">
          
          {/* SISI KIRI: Terbatas hanya sampai sebelum garis putus-putus (w-[68%]) */}
          {/* Padding bottom (pb-8 sm:pb-10) memastikan tombol terangkat masuk ke dalam area hijau */}
          <div className="w-[78%] h-full pt-6 sm:pt-8 pl-6 sm:pl-8 pr-3 sm:pr-5 pb-8 sm:pb-22 flex flex-col justify-between box-border">
            
            {/* Teks Informasi Tiket */}
            <div className="pl-6 pt-6 space-y-1">
              <h3 className="text-lg sm:text-2xl md:text-[32px] font-bold text-white tracking-wide">
                Eksplorasi <span className="text-[#E3AF35]">Event</span>
              </h3>
              <p className="text-xs sm:text-base md:text-[20px] font-semibold text-[#E3AF35]">
                Student Government Association
              </p>
              <p className="text-[11px] sm:text-sm md:text-[17px] font-medium text-white/90">
                Cakrawala University
              </p>
            </div>

            {/* Tombol Discover Now (Aman di dalam area hijau & kiri garis putus-putus) */}
            <div className="w-full">
              <button
                onClick={handleNavigate}
                className="w-[87%] ml-4 h-9 sm:h-[44px] bg-[#EEBA41] hover:bg-[#D4A230] text-white font-bold text-xs sm:text-sm md:text-base rounded-xl shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Discover Now
              </button>
            </div>

          </div>

          {/* SISI KANAN: Area setelah garis putus-putus (32%) */}
          <div className="w-[32%] h-full" />
        </div>

      </div>
    </section>
  );
<<<<<<< HEAD
}
<<<<<<< HEAD
>>>>>>> df38789 (Halaman EventPage New)
=======
>>>>>>> 0bebab2 (feat: refine landing page layout and visual consistency)
=======
}
>>>>>>> ce2ce3c (Page event & kegiatan, dan calendar)
