import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/TanishqMehta10', label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/tanishq-mehta-2052832b7/', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Mail, href: 'mailto:tanishq.tech10@gmail.com', label: 'Email', color: 'hover:text-red-400' }
  ];

  return (
    <footer className="relative bg-gray-900/50 backdrop-blur-lg border-t border-gray-800 z-10">
      {/* Wave-like gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 opacity-60">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left Column - Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <motion.h3
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Tanishq Mehta
            </motion.h3>
            <p className="text-gray-400 leading-relaxed">
              Creating immersive digital experiences with cutting-edge technology and innovative design.
            </p>
          </motion.div>

          {/* Center Column - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center space-x-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`p-3 bg-gray-800/50 backdrop-blur-lg rounded-full text-gray-400 ${social.color} transition-all duration-300 group relative`}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)"
                }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => {
                  // Create light trail effect
                }}
              >
                <social.icon size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                
                {/* Light trail effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full opacity-0 group-hover:opacity-100 blur-sm"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.2, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Right Column - Back to Top */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <motion.button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-purple-400 font-medium rounded-full hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-cyan-600/30 transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Back to Top</span>
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Section - Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-400 flex items-center justify-center gap-2">
            © Tanishq Mehta Portfolio. 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={16} className="text-red-500 fill-current" />
            </motion.span>
            Glad too know that you visited my website , Feel free to collaborate.
          </p>
          
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: 100,
                  opacity: 0,
                }}
                animate={{
                  y: [100, -50],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;