import { motion } from 'framer-motion';

const Loader = () => {
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-[min(80vw,400px)] h-[min(80vw,400px)] max-w-[200px] max-h-[200px] sm:max-w-[300px] sm:max-h-[300px] md:max-w-[400px] md:max-h-[400px]">
        {/* Animated Z shape */}
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          initial="hidden"
          animate="visible"
          className="w-full h-full"
        >
          <motion.path
            d="M20 20 L80 20 L20 80 L80 80"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            variants={pathVariants}
            className="w-full h-full"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#C4B5FD" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 20px rgba(139, 92, 246, 0.2)",
              "0 0 40px rgba(139, 92, 246, 0.4)",
              "0 0 20px rgba(139, 92, 246, 0.2)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Additional glow effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
              "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(0, 0, 0, 0) 70%)",
              "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default Loader; 