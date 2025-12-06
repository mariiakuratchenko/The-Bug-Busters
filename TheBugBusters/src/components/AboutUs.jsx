import React from "react";
import faizanImage from "../assets/Fairzan_Wasti.png";
import getiImage from "../assets/Geti_Rahmanoghli.jpg";
import jayaniImage from "../assets/Jayani_Yogarajah.jpg";
import mariiaImage from "../assets/Mariia_Kuratchenko.jpg";
import jayImage from "../assets/Jay_Louis.jpg";

function AboutUs() {
  const teamMembers = [
    {
      id: 1,
      name: "Faizan Wasti",
      role: "Project Manager",
      image: faizanImage
    },
    {
      id: 2,
      name: "Geti Rahmanoghli",
      role: "Lead Software Engineer",
      image: getiImage
    },
    {
      id: 3,
      name: "Jayani Yogarajah",
      role: "Web Designer",
      image: jayaniImage
    },
    {
      id: 4,
      name: "Mariia Kuratchenko",
      role: "Ui Programmer",
      image: mariiaImage
    },
    {
      id: 5,
      name: "Jay Louis",
      role: "Security Programmer",
      image: jayImage
    }
  ];

  return (
    <main className="team-page">
      <section className="team-section">
        <h1 className="team-title">Meet the Team</h1>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-photo-wrapper">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="team-photo"
                />
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AboutUs;

