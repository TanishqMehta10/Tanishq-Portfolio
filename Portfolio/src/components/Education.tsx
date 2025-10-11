import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

const Education: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const educationData = [
    {
      id: 1,
      level: "School",
      institution: "Dnyandeep International School",
      grade: "78%",
      period: "2008 - 2021",
      location: "Maharashtra, India",
      description: "Foundation in core subjects with focus on holistic development",
      gradient: "from-blue-600 to-cyan-600",
      icon: GraduationCap,
      position: "left"
    },
    {
      id: 2,
      level: "Junior College",
      institution: "Sonai Junior College, Talsande",
      grade: "85%",
      period: "2021 - 2023",
      location: "Talsande, Maharashtra",
      description: "Specialized in Science stream with Mathematics and Computer Science",
      gradient: "from-purple-600 to-pink-600",
      icon: Award,
      position: "right"
    },
    {
      id: 3,
      level: "Graduation",
      institution: "Walchand Institute of Technology",
      grade: "Ongoing",
      period: "2023 - Present",
      location: "Solapur, Maharashtra",
      description: "B Tech in Computer Science and Engineering with Minors in Electronic and Telecommunication Engineering",
      gradient: "from-orange-600 to-red-600",
      icon: GraduationCap,
      position: "left",
      current: true
    }
  ];

  return (
    <section id="education" className="relative py-20 px-4 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Education Journey
          </h2>
        </motion.div>

        {/* 3D Timeline Container */}
        <div className="relative" style={{ perspective: '1000px' }}>
          {/* Central Timeline Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-600 via-pink-500 to-cyan-500 rounded-full"
            initial={{ height: 0, opacity: 0 }}
            animate={inView ? { height: '100%', opacity: 1 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
            style={{ 
              minHeight: '600px',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
            }}
          />

          {/* Floating Timeline Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                initial={{
                  x: Math.random() * 1000,
                  y: Math.random() * 600,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  y: [null, -50, -100],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Education Cards */}
          <div className="space-y-24">
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id}
                className={`relative flex items-center ${
                  edu.position === 'left' ? 'justify-start' : 'justify-end'
                }`}
                initial={{ 
                  opacity: 0, 
                  x: edu.position === 'left' ? -100 : 100,
                  rotateY: edu.position === 'left' ? -15 : 15,
                  z: -50
                }}
                animate={inView ? { 
                  opacity: 1, 
                  x: 0,
                  rotateY: 0,
                  z: 0
                } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.3 + 0.7,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Timeline Node */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 z-20"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={inView ? { scale: 1, rotate: 360 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.3 + 1,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${edu.gradient} rounded-full flex items-center justify-center border-4 border-gray-900 shadow-2xl`}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 10,
                      boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)'
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(168, 85, 247, 0.3)',
                        '0 0 30px rgba(168, 85, 247, 0.6)',
                        '0 0 20px rgba(168, 85, 247, 0.3)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <edu.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>

                {/* Education Card */}
                <motion.div
                  className={`relative max-w-lg ${
                    edu.position === 'left' 
                      ? 'mr-auto pr-20' 
                      : 'ml-auto pl-20'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: edu.position === 'left' ? 5 : -5,
                    z: 30
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="relative bg-gray-800/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 group"
                    style={{
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {/* Card Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${edu.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
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

                    {/* Current Badge */}
                    {edu.current && (
                      <motion.div
                        className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full"
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            '0 0 10px rgba(34, 197, 94, 0.5)',
                            '0 0 20px rgba(34, 197, 94, 0.8)',
                            '0 0 10px rgba(34, 197, 94, 0.5)'
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        CURRENT
                      </motion.div>
                    )}

                    {/* Header */}
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.3 + 1.2 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                        {edu.level}
                      </h3>
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">
                        {edu.institution}
                      </h4>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                      className="space-y-3 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.3 + 1.4 }}
                    >
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-300">
                          Grade: <span className="font-semibold text-white">{edu.grade}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <span className="text-gray-300">{edu.period}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">{edu.location}</span>
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      className="text-gray-400 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.3 + 1.6 }}
                    >
                      {edu.description}
                    </motion.p>

                    {/* 3D Depth Shadow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${edu.gradient} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity duration-500 pointer-events-none`}
                      style={{ 
                        transform: 'translateZ(-20px) translateY(10px)',
                        filter: 'blur(15px)'
                      }}
                    />

                    {/* Connection Line to Timeline */}
                    <motion.div
                      className={`absolute top-1/2 ${
                        edu.position === 'left' ? 'right-0' : 'left-0'
                      } w-16 h-0.5 bg-gradient-to-r ${edu.gradient} transform -translate-y-1/2`}
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.3 + 1.8 }}
                      style={{
                        transformOrigin: edu.position === 'left' ? 'left' : 'right'
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Timeline End Indicator */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.5 }}
          >
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 10px rgba(168, 85, 247, 0.5)',
                  '0 0 25px rgba(168, 85, 247, 0.8)',
                  '0 0 10px rgba(168, 85, 247, 0.5)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;