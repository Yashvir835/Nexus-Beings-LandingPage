"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";








const blurIn = {
  initial: { opacity: 0, filter: "blur(0px)" },
  whileInView: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1 },
  },
  viewport: { once: true },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { staggerChildren: 0.2 } },
  viewport: { once: true },
};



// ----------------------------------------------------------------
//  Variant for paragraph lines to create a staggered "ripple" effect
const paragraphLine = {
  hidden: { opacity: 0, y: -10 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom, // Each line uses a delay based on its index (custom value)
      type: "spring",
      stiffness: 70,
      damping: 20,
    },
  }),
};
// ----------------------------------------------------------------

export default function Page() {
  const arrowControls = useAnimation(); // Animation controls for the arrow


  // Handle arrow hover animation
  const handleArrowHover = async () => {
    await arrowControls.start({
      x: 15, // Make sure the arrow doesn't go beyond the border
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    });
    arrowControls.set({ x: -14, opacity: 1 }); // Reset to starting position
    await arrowControls.start({
      x: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    });
  };

  return (
    <div className="scrollbar-hide h-screen overflow-y-auto">
    {/* // Set a smaller base font size and normal font weight for the entire page */}
    <div className="min-h-screen bg-black p-4 md:p-6 lg:p-8 text-[0.75rem] font-normal">
      <div className="mx-auto md:mt-24 mt-32 max-w-6xl">
        {/* Our Progress Section */}
        <div className="grid md:pl-64 gap-8">
          <motion.span
            className="text-[32px] md:text-[8px] text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 100,
              delay: 0.3,
            }}
          >
            Our Progress
          </motion.span>

          {/* Use a 3‑column grid for all screen sizes */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-[72px] text-white">
            {/* Left Column */}
            <motion.div className="flex flex-col gap-2">
              <motion.h2
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                  hidden: {},
                }}
                className="text-sm md:text-md font-thin"
              >
                {Array.from("The new Method").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, filter: "blur(4px)", x: -40 },
                      visible: { opacity: 1, filter: "blur(0px)", x: 0 },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
              {/* Arrow and the go-to-update button */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(16px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{}}
                className="flex justify-center md:justify-start items-center gap-4 cursor-pointer self-start"
                onHoverStart={handleArrowHover}
              >
                <div className="w-8 h-4 mt-1 rounded-full border border-blue-500 flex items-center justify-center relative">
                  <motion.svg
                    animate={arrowControls}
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="blue"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </div>

                <motion.span
                  className="text-blue-500 text-[16px] md:text-[10px] font-extralight"
                  initial={{ filter: "blur(4px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{
                    filter: "blur(1px)",
                    transition: { duration: 0.1 },
                  }}
                >
                  Go to Updates
                </motion.span>
              </motion.div>
            </motion.div>

            {/* ----------------------------------------------------------------
                Middle Column for Mobile - Paragraphs 
            ---------------------------------------------------------------- */}
            <motion.div
              className="flex md:hidden block flex-col gap-4"
              {...blurIn}
            >
              <p className="md:text-[0.75rem] text-[1rem] leading-6">
                Where the future is wearable
              </p>

              <div className="flex flex-col gap-4">
                {/* First Paragraph */}
                <motion.div
                  className="flex flex-col text-[19px] font-sm text-white/80 space-y-[-0.15em]"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    "We blend innovation and insight to transform bold visions into reality, redefining the future of human enhancement with cutting-edge wearable technologies such as A¹ Sense, B¹ Eye, and A¹ Neuro.",
                  ].map((line, i) => (
                    <motion.span
                      key={i}
                      custom={i * 0.2}
                      variants={paragraphLine}
                      className="block leading-[1.4]"
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Second Paragraph */}
                <motion.div
                  className="flex flex-col text-[19px] font-sm text-white/80 space-y-[-0.15em]"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    "These devices are not merely products; they are keys to unparalleled human augmentation. With a mission focused on enhancing the human experience, our company leads in the fields of Invisible Sense, Spatial, and Neural Computing, aiming for a future where technology amplifies human potential and makes every moment extraordinary.",
                  ].map((line, i) => (
                    <motion.span
                      key={i}
                      custom={i * 0.2}
                      variants={paragraphLine}
                      className="block leading-[1.4]"
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* ----------------------------------------------------------------
                Middle Column for Desktop - Paragraphs with Ripple Effect on Each Line
            ---------------------------------------------------------------- */}
            <motion.div
              className="flex hidden md:block flex-col gap-4"
              {...blurIn}
            >
              <p className="md:text-[0.75rem] text-[1rem] leading-6">
                Where the future is wearable
              </p>

              <div className="grid gap-4">
                {/* First Paragraph */}
                <motion.div
                  className="grid md:text-[9px] text-[16px] font-sm text-white/80"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    "We blend innovation and",
                    "insight to transform bold",
                    "visions into reality, redefining",
                    "the future of human",
                    "enhancement with",
                    "cutting-edge wearable",
                    "technologies such as A¹",
                    "Sense, B¹ Eye, and A¹ Neuro.",
                  ].map((line, i) => (
                    <motion.span
                      key={i}
                      custom={i * 0.2}
                      variants={paragraphLine}
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Second Paragraph */}
                <motion.div
                  className="grid md:text-[9px] text-[16px] font-sm text-white/80"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    "These devices are not merely",
                    "products; they are keys to",
                    "unparalleled human",
                    "augmentation. With a mission",
                    "focused on enhancing the",
                    "human experience, our",
                    "company leads in the fields of",
                    "Invisible Sense, Spatial, and",
                    "Neural Computing, aiming for",
                    "a future where technology",
                    "amplifies human potential and",
                    "makes every moment",
                    "extraordinary.",
                  ].map((line, i) => (
                    <motion.span
                      key={i}
                      custom={i * 0.2}
                      variants={paragraphLine}
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* ----------------------------------------------------------------
                Right Column for Mobile
            ---------------------------------------------------------------- */}
            <motion.div
              className="flex md:hidden block items-start flex-col gap-2 text-[16px] text-white/60"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={paragraphLine}
            >
              <span className="text-white">*</span>
              <motion.div
                className="flex flex-col gap-1 text-[19px] font-sm text-white/80"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  "Committed to advancing Wearable & Neural Technologies for the Intelligence Age.",
                ].map((line, i) => (
                  <motion.span
                    key={i}
                    custom={i * 0.2}
                    variants={paragraphLine}
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* ----------------------------------------------------------------
                Right Column for Desktop
            ---------------------------------------------------------------- */}
            <motion.div
              className="flex hidden md:block items-start flex-col gap-2 md:text-[9px] text-[16px] text-white/60"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={paragraphLine}
            >
              <span className="text-white">*</span>
              <motion.div
                className="grid gap-1 md:text-[9px] text-[16px] font-sm text-white/80"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  "Committed to advancing",
                  "Wearable & Neural",
                  "Technologies for the",
                  "Intelligence Age.",
                ].map((line, i) => (
                  <motion.span
                    key={i}
                    custom={i * 0.2}
                    variants={paragraphLine}
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Aim */}

      {/* ___________________________________________________________________________________________________________________ */}

      <div className="mx-auto md:mt-24 mt-32 max-w-6xl">
        {/* Our Progress Section */}
        <div className="grid md:pl-64 gap-8">
          <motion.span
            className="text-[32px] md:text-[8px] text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 100,
              delay: 0.3,
            }}
          >
            Our Aim
          </motion.span>

          {/* Use a 3‑column grid for all screen sizes */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-[72px] text-white">
            {/* Left Column */}
            <motion.div className="flex flex-col gap-2">
              <motion.h2
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                  hidden: {},
                }}
                className="text-sm md:text-md font-thin"
              >
                {Array.from("A Radical Impact for Our Life").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, filter: "blur(4px)", x: -40 },
                      visible: { opacity: 1, filter: "blur(0px)", x: 0 },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
              {/* Arrow and the go-to-update button */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(16px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{}}
                className="flex justify-center md:justify-start items-center gap-4 cursor-pointer self-start"
                onHoverStart={handleArrowHover}
              >
                <div className="w-8 h-4 mt-1 rounded-full border border-blue-500 flex items-center justify-center relative">
                  <motion.svg
                    animate={arrowControls}
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="blue"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </div>

                <motion.span
                  className="text-blue-500 text-[16px] md:text-[10px] font-extralight"
                  initial={{ filter: "blur(4px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{
                    filter: "blur(1px)",
                    transition: { duration: 0.1 },
                  }}
                >
                  Go to Progress
                </motion.span>
              </motion.div>
            </motion.div>

            {/* ----------------------------------------------------------------
                Middle Column for Mobile - Paragraphs 
            ---------------------------------------------------------------- */}
            <motion.div
              className="flex md:hidden block flex-col gap-4"
              {...blurIn}
            >
              <p className="md:text-[0.75rem] text-[1rem] leading-6">
                The future lies in our hands
              </p>

              <div className="flex flex-col gap-4">
                {/* First Paragraph */}
                <motion.div
                  className="flex flex-col text-[19px] font-sm text-white/80 space-y-[-0.15em]"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    "We aim to create advanced technological devices that are seamlessly integrated with the human body,ensuring stability in their use.",
                  ].map((line, i) => (
                    <motion.span
                      key={i}
                      custom={i * 0.2}
                      variants={paragraphLine}
                      className="block leading-[1.4]"
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Second Paragraph */}
                <motion.div
                  className="flex flex-col text-[19px] font-sm text-white/80 space-y-[-0.15em]"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    "We always keep the end - users of our products in mind, prioritizing safety,accessibility, and reliability throughout our process.",
                  ].map((line, i) => (
                    <motion.span
                      key={i}
                      custom={i * 0.2}
                      variants={paragraphLine}
                      className="block leading-[1.4]"
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* ----------------------------------------------------------------
                Middle Column for Desktop - Paragraphs with Ripple Effect on Each Line
            ---------------------------------------------------------------- */}
            <motion.div
              className="flex hidden md:block flex-col gap-4"
              {...blurIn}
            >
              <p className="md:text-[0.75rem] text-[1rem] leading-6">
                The future lies in our hands
              </p>

              <div className="grid gap-4">
                {/* First Paragraph */}
                <motion.div
                  className="grid md:text-[9px] text-[16px] font-sm text-white/80"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    "We aim to create advanced",
                    "technological devices that",
                    "are seamlessly integrated",
                    "with the human body,",
                    "ensuring stability in their use.",
                  ].map((line, i) => (
                    <motion.span
                      key={i}
                      custom={i * 0.2}
                      variants={paragraphLine}
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Second Paragraph */}
                <motion.div
                  className="grid md:text-[9px] text-[16px] font-sm text-white/80"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    "We always keep the",
                    "end-users of our products in",
                    "mind, prioritizing safety,",
                    "accessibility, and reliability",
                    "throughout our engineering",
                    "process",
                  ].map((line, i) => (
                    <motion.span
                      key={i}
                      custom={i * 0.2}
                      variants={paragraphLine}
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* ----------------------------------------------------------------
                Right Column for Mobile
            ---------------------------------------------------------------- */}
            <motion.div
              className="flex md:hidden block items-start flex-col gap-2 text-[16px] text-white/60"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={paragraphLine}
            >
              <span className="text-white">*</span>
              <motion.div
                className="flex flex-col gap-1 text-[19px] font-sm text-white/80"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  "Envisioning the future with a Pro-Human approach.",
                ].map((line, i) => (
                  <motion.span
                    key={i}
                    custom={i * 0.2}
                    variants={paragraphLine}
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* ----------------------------------------------------------------
                Right Column for Desktop
            ---------------------------------------------------------------- */}
            <motion.div
              className="flex hidden md:block items-start flex-col gap-2 md:text-[9px] text-[16px] text-white/60"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={paragraphLine}
            >
              <span className="text-white">*</span>
              <motion.div
                className="grid gap-1 md:text-[9px] text-[16px] font-sm text-white/80"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  "Envisioning the future with a",
                  " Pro-Human approach.",
          
                ].map((line, i) => (
                  <motion.span
                    key={i}
                    custom={i * 0.2}
                    variants={paragraphLine}
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
