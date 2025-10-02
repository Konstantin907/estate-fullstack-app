import React, { useContext } from 'react'
import "./homePage.scss"
import SearchBar from '../../components/searchBar/SearchBar'
import { AuthContext } from '../../context/AuthContext'
import { motion } from "framer-motion";


const HomePage = () => {

  const {currentUser} = useContext(AuthContext);

    const containerVariants = {
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    };

    const staggerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.5 },
      }),
    };


  return (
    <div className="homePage">
      <motion.div
        className="textContainer"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="wrapper">
          <motion.h1 className="title" variants={staggerVariants} custom={0.2}>
            Find Real Estate & Get Your Dream Place
          </motion.h1>
          <motion.p variants={staggerVariants} custom={0.4}>
            Welcome to our real estate world. Everything you need, rent, sell or
            looking for a quick run off from town, you are on the right place.
            We are here to give you the best experience possible! All your needs
            are here.
          </motion.p>
          <motion.div variants={staggerVariants} custom={0.6}>
            <SearchBar />
          </motion.div>

          <div className="boxes">
            {[
              { num: "16+", text: "Years of Experience" },
              { num: "200", text: "Award Gained" },
              { num: "2000+", text: "Property Ready" },
            ].map((box, i) => (
              <motion.div
                key={i}
                className="box"
                variants={staggerVariants}
                custom={0.8 + i * 0.2}
              >
                <h1>{box.num}</h1>
                <h2>{box.text}</h2>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        className="imgContainer"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <img src="/bg.png" alt="" />
      </motion.div>
    </div>
  );
}

export default HomePage
