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
                <img 
                    src="https://images.pexels.com/photos/19351513/pexels-photo-19351513.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop" 
                    alt="Family enjoying bug-free outdoor time"
                />
                <p className="image-credit">
                    Photo by{' '}
                    <a 
                        href="https://www.pexels.com/photo/man-and-woman-with-daughter-19351513/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'var(--color-olive)', textDecoration: 'underline' }}
                    >
                        Juliane Monari
                    </a>
                    {' '}
                </p>
            </div>
        </div>
    )
}

export default Mainpage;