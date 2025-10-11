import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });


  const skills = [
    "Problem Solving", "Creative Thinking", "Team Collaboration", 
    "Continuous Learning", "Attention to Detail", "Innovation"
  ];

  return (
    <section id="about" className="relative py-20 px-4 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate about creating innovative solutions and pushing the boundaries of technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Profile Image and Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* 3D Profile Card */}
            <motion.div
              className="relative bg-gray-800/30 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 group"
              whileHover={{ 
                rotateY: 5,
                rotateX: 5,
                z: 50,
                scale: 1.02
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2), rgba(6, 182, 212, 0.2))',
                    'linear-gradient(225deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2), rgba(6, 182, 212, 0.2))',
                    'linear-gradient(315deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2), rgba(6, 182, 212, 0.2))',
                    'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2), rgba(6, 182, 212, 0.2))'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Profile Image Container */}
              <motion.div
                className="relative mb-8 flex justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
              >
                <motion.div
                  className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(168, 85, 247, 0.5)',
                      '0 0 40px rgba(236, 72, 153, 0.5)',
                      '0 0 20px rgba(6, 182, 212, 0.5)',
                      '0 0 20px rgba(168, 85, 247, 0.5)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                    <img
                      src="/updt profile photo.jpg"
                      alt="Tanishq Mehta"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Floating Particles around Image */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                    initial={{
                      x: Math.cos((i * Math.PI * 2) / 8) * 120,
                      y: Math.sin((i * Math.PI * 2) / 8) * 120,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{
                      x: Math.cos((i * Math.PI * 2) / 8 + Date.now() * 0.001) * 120,
                      y: Math.sin((i * Math.PI * 2) / 8 + Date.now() * 0.001) * 120,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>

              {/* Personal Info */}
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <h3 className="text-3xl font-bold text-white mb-2">Tanishq Mehta</h3>
                <p className="text-lg text-purple-300 font-medium mb-4">Full Stack Developer</p>
                <p className="text-gray-400 leading-relaxed">
                  Computer Science and Engineering Student passionate about AI/ML and creating innovative digital solutions. 
                  I love turning complex problems into elegant, user-friendly applications.
                </p>
              </motion.div>

              {/* Skills Tags */}
              <motion.div
                className="flex flex-wrap gap-2 justify-center mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 text-xs bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-purple-300 rounded-full border border-purple-500/30 hover:border-purple-400/50 transition-colors duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats and Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Main Description */}
            <motion.div
              className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.div
                className="flex items-center mb-6"
                whileHover={{ x: 10 }}
              >
                <Heart className="w-8 h-8 text-red-500 mr-4" />
                <h3 className="text-2xl font-bold text-white">My Passion</h3>
              </motion.div>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm currently pursuing my B.Tech in Computer Science and Engineering at Walchand Institute of Technology. 
                My journey in technology started with curiosity and has evolved into a deep passion for creating impactful solutions.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                I specialize in full-stack development with expertise in modern web technologies, AI/ML, and data visualization. 
                I believe in writing clean, efficient code and creating user experiences that make a difference.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community.
              </p>
            </motion.div>

            {/* Stats removed as requested */}

            {/* Call to Action */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.linkedin.com/in/tanishq-mehta-2052832b7/', '_blank')}
              >
                <span className="relative z-10">Let's Connect</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="about-button-hover"
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
