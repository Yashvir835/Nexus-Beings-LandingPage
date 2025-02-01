import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "framer-motion";
import HamburgerMenu from "./ui/hamburgerMenu";
export function Navbar() {
  const logo = [
    {
      title: "Nexus Beings",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity"
        />
      ),
      href: "/landingPage"
    }
  ];

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/landingPage"
    },
    {
      title: "Over View",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/landingPage/overView"
    },
    {
      title: "Mission",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/landingPage/Mission"
    },
    {
      title: "Pricing",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity"
        />
      ),
      href: "/landingPage/Pricing"
    },
    {
      title: "Product",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/landingPage/product"
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#"
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#"
    }
  ];

  return (
    <motion.div
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: 0.5,
      }}
      className="flex items-center justify-between w-full shadow-md z-30 relative" // Updated z-index to ensure visibility
    >
      {/* Left Dock (Logo) */}
      <div className="absolute left-4 top-4">
        <FloatingDock
          desktopClassName="mt-6 ml-4 backdrop-blur-md"
          mobileClassName="hidden"
          items={logo}
        />
      </div>

      {/* Desktop Right Dock */}
      <div className="hidden md:block absolute left-1/2 top-4 transform -translate-x-1/2">
        <FloatingDock
          mobileClassName="hidden"
          desktopClassName="mt-6 backdrop-blur-md"
          items={links}
        />
      </div>

      {/* Mobile Right Dock Positioned at Top Left without margin */}
      <div className="md:hidden mt-8 fixed top-0  left-0 z-50">
           
        <HamburgerMenu links ={links}/>
      </div>
    </motion.div>
  );
}
