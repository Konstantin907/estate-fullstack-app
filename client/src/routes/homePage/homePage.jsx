import React, { useContext } from 'react'
import "./homePage.scss"
import SearchBar from '../../components/searchBar/SearchBar'
import { AuthContext } from '../../context/AuthContext'

const HomePage = () => {

  const {currentUser} = useContext(AuthContext);

  console.log(currentUser);

  return (
    <div className="homePage">
    <div className="textContainer">
      <div className="wrapper">
        <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
        <p>
          Welcome to our real estate world. Everything you need, rent, sell or looking
          for a quick run off from town, you are on the right place. We are here
          to give you the best experience possible! All your needs are here.
        </p>
        <SearchBar />
        <div className="boxes">
          <div className="box">
            <h1>16+</h1>
            <h2>Years of Experience</h2>
          </div>
          <div className="box">
            <h1>200</h1>
            <h2>Award Gained</h2>
          </div>
          <div className="box">
            <h1>2000+</h1>
            <h2>Property Ready</h2>
          </div>
        </div>
      </div>
    </div>
    <div className="imgContainer">
      <img src="/bg.png" alt="" />
    </div>
  </div>
  )
}

export default HomePage
