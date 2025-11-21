import React from 'react';


function Mainpage(){
    return(
        <div className="hero">
            <div className="hero-content">
                <h1 className="title-font">Welcome To The Bug Busters</h1>
                <p>CONTINUE LIFE UNINTERRUPTED AND BUG-FREE</p>
                <button className="btn-primary">Explore Products</button>
            </div>
            <div className="hero-image">
                {}
                <div style={{ 
                    width: '100%', 
                    height: '400px', 
                    backgroundColor: 'var(--color-neutral-border)', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gunmetal)'
                }}>
                </div>
            </div>
        </div>
    )
}

export default Mainpage;