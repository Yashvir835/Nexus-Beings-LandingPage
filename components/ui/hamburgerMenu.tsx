import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface LinkType {
  href: string;
  icon: React.ReactNode;
  title: string;
}

interface HamburgerMenuProps {
  links: LinkType[];
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Menu slide-in animation
  const menuVariants = {
    hidden: { y: -50, opacity: 0, transition: { duration: 1.2 } },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  // Overlay fade-in animation (without blur affecting menu)
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Hamburger icon animations
  const topLine = {
    closed: { rotate: 0, y: -8 },
    open: { rotate: 45, y: 0 },
  };

  const bottomLine = {
    closed: { rotate: 0, y: 8 },
    open: { rotate: -45, y: 0 },
  };

  return (
    <div className="relative">
      {/* Hamburger Button - Set Higher Z-Index */}
      <motion.div
        className="fixed top-4 left-4 z-[60] flex flex-col items-center justify-center w-12 h-12 focus:outline-none"
      >
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <div className="relative w-8 h-8">
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-[2px] bg-neutral-800 dark:bg-neutral-500"
              animate={isOpen ? topLine.open : topLine.closed}
              style={{ originX: 0.5, originY: 0.5 }}
            />
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-[2px] bg-neutral-800 dark:bg-neutral-500"
              animate={isOpen ? bottomLine.open : bottomLine.closed}
              style={{ originX: 0.5, originY: 0.5 }}
            />
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay (behind the menu) */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 z-40 bg-black/30"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu container - Keep Z-Index Below Button */}
            <motion.nav
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed left-0 right-0 top-0 z-50 mx-4 p-6 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-100 dark:bg-neutral-900/95 dark:border-neutral-800"
            >
              <ul className="flex flex-col gap-2">
                {links.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`transition-all duration-300 p-1 rounded-lg ${
                      // If any item is hovered and this item is not the hovered one,
                      // add a blur and lower the opacity for a glassmorphism-like effect.
                      hoveredIndex !== null && hoveredIndex !== index
                        ? "blur-sm opacity-80"
                        : "blur-0 opacity-100"
                      }`}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="h-6 w-6">{link.icon}</div>
                      <span className="text-neutral-700 dark:text-neutral-300">
                        {link.title}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
