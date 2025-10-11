import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      };

      // send the email using EmailJS
      await emailjs.send('service_vxl559m', 'template_wmm3w19', templateParams, 'qE9Vgz0foePwiAsyY');

      // Create particle explosion effect on success
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 400,
        y: Math.random() * 400
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 2000);

      setFormData({ name: '', email: '', subject: '', message: '' });
      // Optionally show a toast or alert
      alert('Message sent successfully!');
    } catch (error) {
      // Show an error to the user
      console.error('Email send error:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: "Solapur, Maharashtra",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 9322166466",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Mail,
      title: "Email",
      content: "tanishq.tech10@gmail.com",
      gradient: "from-blue-500 to-purple-500"
    }
  ];

  return (
    <section id="contact" className="relative py-20 px-4 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate on something amazing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
            
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
              >
                <motion.div
                  className={`w-12 h-12 bg-gradient-to-br ${info.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 10 }}
                >
                  <info.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold">{info.title}</h4>
                  <p className="text-gray-400">{info.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <motion.form
              onSubmit={handleSubmit}
              className="relative bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50"
              style={{ perspective: '1000px' }}
            >
              {/* Particle Effects */}
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full pointer-events-none"
                  initial={{ x: particle.x, y: particle.y, scale: 0, opacity: 1 }}
                  animate={{ 
                    x: particle.x + (Math.random() - 0.5) * 200,
                    y: particle.y + (Math.random() - 0.5) * 200,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0]
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="Your Name"
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)"
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="your@email.com"
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)"
                    }}
                  />
                </motion.div>
              </div>

              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <label className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  placeholder="Project Collaboration"
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)"
                  }}
                />
              </motion.div>

              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)"
                  }}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="contact-button-hover"
                />
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;