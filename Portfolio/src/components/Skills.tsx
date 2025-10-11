import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Globe, BarChart3, Users } from 'lucide-react';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: "Programming Proficiency",
      icon: Code,
      gradient: "from-purple-600 via-violet-600 to-indigo-600",
      glowColor: "purple",
      skills: ["C", "C++", "Java", "Python"],
      description: "Strong foundation in core programming languages"
    },
    {
      title: "Web Development",
      icon: Globe,
      gradient: "from-cyan-600 via-blue-600 to-teal-600",
      glowColor: "cyan",
      skills: ["HTML/CSS", "Javascript", "React.js", "Node.js", "MySQL"],
      description: "Full-stack web development expertise"
    },
    {
      title: "Data Visualization",
      icon: BarChart3,
      gradient: "from-pink-600 via-rose-600 to-red-600",
      glowColor: "pink",
      skills: ["Numpy", "Pandas", "Matplotlib", "Scikit learn"],
      description: "Data analysis and machine learning tools"
    },
    {
      title: "Soft Skills",
      icon: Users,
      gradient: "from-orange-600 via-amber-600 to-yellow-600",
      glowColor: "orange",
      skills: ["PPT Creation", "Effective Communication", "Teamwork & Collaboration", "Vibe Coding", "Adaptability & Quick Learning"],
      description: "Essential interpersonal and professional skills"
    }
  ];

  return (
    <section id="skills" className="relative py-20 px-4 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50, rotateX: 15, z: -100 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0, z: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: categoryIndex * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="group relative"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className={`relative bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-${category.glowColor}-500/50 transition-all duration-500 transform-gpu`}
                whileHover={{ 
                  y: -15, 
                  rotateX: 5,
                  rotateY: 5,
                  z: 50,
                  scale: 1.02
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`
                }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                  animate={{
                    background: [
                      `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      `linear-gradient(225deg, var(--tw-gradient-stops))`,
                      `linear-gradient(315deg, var(--tw-gradient-stops))`,
                      `linear-gradient(135deg, var(--tw-gradient-stops))`
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${category.gradient} rounded-full opacity-0 group-hover:opacity-60`}
                      initial={{
                        x: Math.random() * 300,
                        y: Math.random() * 200,
                        scale: 0
                      }}
                      animate={{
                        y: [null, -50, -100],
                        scale: [0, 1, 0],
                        opacity: [0, 0.6, 0]
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Header */}
                <motion.div
                  className="flex items-center mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.2 + 0.3 }}
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {category.title}
                    </motion.h3>
                    <p className="text-gray-400 text-sm mt-1">{category.description}</p>
                  </div>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                  className="grid grid-cols-2 gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.2 + 0.5 }}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className={`relative p-3 bg-gray-700/30 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:border-${category.glowColor}-400/50 transition-all duration-300 group/skill`}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.7,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        boxShadow: `0 10px 25px rgba(168, 85, 247, 0.2)`
                      }}
                      style={{ transform: 'translateZ(10px)' }}
                    >
                      {/* Skill Glow Effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover/skill:opacity-20 rounded-lg blur-sm transition-opacity duration-300`}
                        style={{ transform: 'translateZ(-5px)' }}
                      />
                      
                      <motion.span
                        className="relative z-10 text-gray-300 group-hover/skill:text-white font-medium text-sm transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>

                      {/* Skill Progress Indicator */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* 3D Depth Shadow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-30 blur-2xl rounded-2xl transition-opacity duration-500 pointer-events-none`}
                  style={{ 
                    transform: 'translateZ(-30px) translateY(10px)',
                    filter: 'blur(20px)'
                  }}
                />

                {/* Corner Accent */}
                <motion.div
                  className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${category.gradient} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Floating Skill Indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 px-6 py-3 bg-gray-800/30 backdrop-blur-lg rounded-full border border-gray-700/50"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              className="w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-gray-400 text-sm font-medium">
              Continuously expanding skillset
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;