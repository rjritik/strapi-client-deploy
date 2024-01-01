import React, { useEffect, useRef, useState } from "react";
import ProjectHeader from "../../components/Projects/ProjectHeader";
import ProjectPaginatedItems from "../../components/Projects/ProjectPaginatedItems";

const Projects = () => {
  const [sticky, setSticky] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const isTouchingTop = rect.top <= 0;

        if (isTouchingTop) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ProjectHeader />

      <section ref={sectionRef} className="py-5 projects-section">
        <div className="container">
          <ProjectPaginatedItems itemsPerPage={10} sticky={sticky} />
        </div>
      </section>
    </>
  );
};

export default Projects;
