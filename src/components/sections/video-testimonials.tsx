"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Video, Quote } from "lucide-react";

type VideoTestimonial = {
    name: string;
    role: string;
    quote: string;
    thumbnail: string;
    duration: string;
};

// Add real client videos here. The section is hidden while this list is empty.
const videoTestimonials: VideoTestimonial[] = [];

export function VideoTestimonials() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    if (videoTestimonials.length === 0) return null;

    return (
        <section id="video-testimonials" className="py-20 md:py-32 relative z-10" aria-label="Video testimonials" ref={sectionRef}>
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C8FF00]/[0.03] blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <span className="text-[#C8FF00] text-[11px] font-mono tracking-[0.2em] uppercase mb-4 block">
                        <Video size={12} className="inline mr-1.5 -mt-0.5" />
                        Video Testimonials
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-4">
                        Don&apos;t Take Our<br />
                        <span className="text-white/25">Word For It.</span>
                    </h2>
                    <p className="text-white/30 text-sm">
                        Short videos from clients.
                    </p>
                </motion.div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {videoTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            className="group cursor-pointer"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
                        >
                            {/* Video Thumbnail */}
                            <div className="relative aspect-[9/12] rounded-2xl overflow-hidden mb-5 border border-white/[0.06] group-hover:border-[#C8FF00]/20 transition-all duration-500">
                                {/* Thumbnail Image */}
                                <div className="absolute inset-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={testimonial.thumbnail}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    {/* Dark overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/70 transition-all duration-500" />
                                </div>

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <motion.div
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#C8FF00]/20 backdrop-blur-md border border-[#C8FF00]/40 flex items-center justify-center shadow-[0_0_30px_rgba(200,255,0,0.2)] group-hover:bg-[#C8FF00]/30 group-hover:scale-110 transition-all duration-300"
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Play size={24} className="text-[#C8FF00] ml-1" fill="currentColor" />
                                    </motion.div>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute bottom-4 right-4 z-10">
                                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/70 text-[11px] font-mono">
                                        {testimonial.duration}
                                    </span>
                                </div>

                                {/* Quote on hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <Quote size={16} className="text-[#C8FF00]/40 mb-2" />
                                    <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                                        &quot;{testimonial.quote}&quot;
                                    </p>
                                </div>
                            </div>

                            {/* Info */}
                            <div>
                                <h4 className="text-white font-bold text-base group-hover:text-[#C8FF00] transition-colors duration-300">
                                    {testimonial.name}
                                </h4>
                                <p className="text-white/40 text-sm">{testimonial.role}</p>
                                <p className="text-white/60 text-xs mt-3 leading-relaxed md:hidden line-clamp-3">
                                    &quot;{testimonial.quote}&quot;
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Note */}
                <motion.p
                    className="text-center text-white/15 text-[11px] font-mono mt-10 tracking-wider"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    VIDEO TESTIMONIALS — AVAILABLE UPON REQUEST FOR PRIVACY
                </motion.p>
            </div>
        </section>
    );
}
