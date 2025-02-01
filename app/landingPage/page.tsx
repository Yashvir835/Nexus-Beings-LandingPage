"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  return (
    <AnimatePresence>
      <motion.div
        className="relative flex flex-col items-center justify-center min-h-screen p-2"
        initial={{ opacity: 0, filter: 'blur(10px)' }} // Initial blurred state
        animate={{ opacity: 1, filter: 'blur(0px)' }} // Animate to clear state
        transition={{ duration: 2.2, ease: 'easeInOut' }}
      >
        {/* Sign In Button - Hidden on devices with width less than 768px */}
        <motion.div
          className="hidden md:flex absolute top-0 z-20 right-4 mt-10 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 6 }}
        >
          <motion.button
            className="relative px-6 py-3 rounded-full bg-gray-200 dark:bg-neutral-400 flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mr-2">Sign In</span>

            {/* Arrow inside the button */}
            <motion.div
              className="relative w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              animate={{
                x: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
              }}
            >
              <motion.svg
                className="absolute text-gray-800 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </motion.svg>
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Video Container - Full Width and Height */}
        <motion.div className="absolute top-0 left-0 w-full h-full z-0">
          <video
            className="object-cover w-full h-full"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video/v3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Text Container */}
        <motion.div
          className="absolute z-20 flex flex-col bottom-16 left-1/2 transform -translate-x-1/2 items-center"
        >
          <motion.div
            className="space-y-4"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-xl w-full pl-4 md:text-2xl font-bold md:font-extrabold"
              variants={{ hidden: { y: 20 }, visible: { y: 0 } }}
              transition={{ delay: 2, ease: "easeInOut", duration: 2 }}
            >
              Nexus Beings
            </motion.h2>
            <motion.p className="text-sm w-full md:text-xl font-semibold text-gray-600">
              Beyond humanware.
            </motion.p>
          </motion.div>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
}
