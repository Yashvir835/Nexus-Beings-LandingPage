"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ArrowButtonProps {
  nextPage: string;
}

export const ArrowButton = ({ nextPage }: ArrowButtonProps) => {
  const router = useRouter();

  return (
    < div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">

    <motion.button
      onClick={() => router.push(nextPage)}
      className="p-4 bg-gray-100/30 dark:bg-slate-800/30 rounded-full backdrop-blur-sm hover:backdrop-blur-md transition-all"
      initial={{ opacity: 0.7 }}
      whileHover={{
        scaleY: 1.3,
        scaleX: 1.3,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.9 }}
    >
     
          <motion.span
            className="text-xs font-medium text-gray-600 dark:text-gray-300"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            Scroll
          </motion.span>

          {/* Animated Arrow */}
          <motion.div
            className="w-6 h-6 pl-1 flex items-center justify-center"
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </motion.svg>
          </motion.div>
      
    </motion.button>
    </div>
  );
};