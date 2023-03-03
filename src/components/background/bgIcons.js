import React from 'react'

const BackgroundIcon = ({icon, color}) => {

    return (
      <div className="background-icon" style={{background: (color || "rgba(255, 162, 66, 0.8)")}}>
        <div className="filter"></div>
        <ul className="background-icon-left">
          <li>
            <img className={color ? "invert" : ""} alt="logo" width="220px" src={"/assets/images/icons/" + (icon || "logo") + ".png"} />
          </li>
          <li>
            <img className={color ? "invert" : ""} alt="logo" width="280px" src={"/assets/images/icons/" + (icon || "logo") + ".png"} />
          </li>
          <li>
            <img className={color ? "invert" : ""} alt="logo" width="240px" src={"/assets/images/icons/" + (icon || "logo") + ".png"} />
          </li>
          <li>
            <img className={color ? "invert" : ""} alt="logo" width="260px" src={"/assets/images/icons/" + (icon || "logo") + ".png"} />
          </li>
        </ul>
        <ul className="background-icon-right">
          <li>
            <img className={color ? "invert" : ""} alt="logo" width="280px" src={"/assets/images/icons/" + (icon || "logo") + ".png"} />
          </li>
          <li>
            <img className={color ? "invert" : ""} alt="logo" width="220px" src={"/assets/images/icons/" + (icon || "logo") + ".png"} />
          </li>
          <li>
            <img className={color ? "invert" : ""} alt="logo" width="260px" src={"/assets/images/icons/" + (icon || "logo") + ".png"} />
          </li>
          <li>
            <img className={color ? "invert" : ""} alt="logo" width="240px" src={"/assets/images/icons/" + (icon || "logo") + ".png"} />
          </li>
        </ul>
      </div>
    )
  }
    
  export default BackgroundIcon