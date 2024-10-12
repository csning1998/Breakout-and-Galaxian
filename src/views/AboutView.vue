<script setup lang="ts">
import { reactive } from "vue";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInfoCircle, faPhone, faEnvelope, faMapMarkerAlt, faBriefcase,
          faGraduationCap, faTools, faCertificate, faMotorcycle }
          from '@fortawesome/free-solid-svg-icons';
library.add(faInfoCircle as any, faPhone as any, faEnvelope as any, faMapMarkerAlt as any, faBriefcase as any,
            faGraduationCap as any, faTools as any, faCertificate as any, faMotorcycle as any);


import "@/assets/GoogleMaterial.css";


interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  details: string[];
}

interface ExperienceEntry {
  position: string;
  location: string;
  duration: string;
  achievements: string[];
  subAchievements?: string[];
}


// Personal Information
const personalInfo = reactive({
  name: "ChingSan Ning",
  title: "Student in FJU MIIA",
  about: `Hi, It's CSNING, a Taiwanese university student majoring in Medical Informatics. I'm dedicating on becoming a MLE / DS on my enthusiasms.`,
  contact: [
    "(+886) 978-563-809",
    "410570554@m365.fju.edu.tw",
    "1111 S Grand Ave, LA, CA 90015",
  ],
  skills: [
    "Java | Spring Boot",
    "Python | Scikit-Learn | R",
    "OracleSQL | PostgresSQL",
    "Vue3 | TypeScript | Express.js",
    "Docker | Git",
  ],
  certifications: [
    "TOEIC 540 while Slept in Listening Section.",
    "CEFR C2 Advanced in English",
    "Average GPA 3.52",
    "Git Tutorial on W3School",
  ],
});

// Experiences
const experiences = reactive<ExperienceEntry[]>([
  {
    position: "Sales Representative for Large Displacement Motorcycle",
    location: "Taipei",
    duration: "2019 - 2023",
    achievements: [
      "Achieved a 40% increase in performance during the pandemic in 2022 compared to previous years, earning the Best Improvement Award.",
      "Proactively expanded customer base by leveraging social media platforms (FB) to develop potential clients, achieving the monthly sales target of 12 vehicles.",
      "Maintained strong long-term customer relationships and collaborated across departments to ensure stable performance.",
      "Marketing planning and performance tracking:",
    ],
    subAchievements: [
      "Managed a personal Facebook fan page, generating 20-30 meaningful interactions per month, resulting in a 20% increase in sales.",
      "Monitored market trends and social media discussions, collected public opinions, and optimized sales strategies accordingly.",
    ],
  },
]);

// Education
const education = reactive<EducationEntry[]>([
  {
    degree: "Bachelor's Degree in Medical Informatics",
    institution: "FuJen Catholic University",
    location: "New Taipei City",
    duration: "2023 - Present",
    details: [
      "Relevant Coursework in Java OOP, Algorithms, Web Design, and Machine Learning.",
      "Senior Project: 'FHIR Data Exchange Service in Prescription Scenario.'",
    ],
  },
  {
    degree: "Dropping out from Bachelor's Degree in Electrical Engineering",
    institution: "National Taipei University of Technology",
    location: "Taipei",
    duration: "2016 - 2019",
    details: [
      "Common Coursework in ODE, Laplace & Fourier Transform, Vector Differential Calculus, Linear Algebra System, etc.",
      "Relevant Coursework in Electric Circuit Analysis & Design, Microelectronic Design in Analogue Circuit, and Electric Machinery.",
    ],
  },
]);

</script>

<template>
  <main class="container">

    <div id="resume">
      <div class="header-content">
        <img src="@/assets/profile-picture.jpg" alt="Profile Picture" class="profile-picture">
        <h1>{{ personalInfo.name }}</h1>
        <h3>{{ personalInfo.title }}</h3>
      </div>
      <div class="d-flex">
        <div class="left-column">
          <div class="card">
            <section>
              <h3><font-awesome-icon :icon="['fas', 'info-circle']" /> About Me</h3>
              <p>{{ personalInfo.about }}</p>
            </section>
          </div>

          <div class="card">
            <section>
              <h3><font-awesome-icon :icon="['fas', 'phone']" /> Contact</h3>
              <ul>
                <li v-for="(contact, index) in personalInfo.contact" :key="index">
<!--                  <font-awesome-icon :icon="index === 0 ? ['fas', 'phone'] : index === 1 ? ['fas', 'envelope'] : ['fas', 'map-marker-alt']" />-->
                  {{ contact }}
                </li>
              </ul>
            </section>
          </div>

          <div class="card">
            <section>
              <h3><font-awesome-icon :icon="['fas', 'tools']" /> Skills</h3>
              <ul>
                <li v-for="(skill, index) in personalInfo.skills" :key="index">{{ skill }}</li>
              </ul>
            </section>
          </div>

          <div class="card">
            <section>
              <h3><font-awesome-icon :icon="['fas', 'certificate']" /> Certifications</h3>
              <ul>
                <li v-for="(certification, index) in personalInfo.certifications" :key="index">{{ certification }}</li>
              </ul>
            </section>
          </div>
        </div>

        <div class="right-column">
          <div class="card">
            <section>
              <h2><font-awesome-icon :icon="['fas', 'briefcase']" /> Experience</h2>
              <div v-for="(exp, index) in experiences" :key="index" class="experience-entry">
                <h3>
                  <font-awesome-icon :icon="exp.position.includes('Motorcycle') ? ['fas', 'motorcycle'] : ['fas', 'timeline']" />
                  {{ exp.position }}
                </h3>
                <p><strong>{{ exp.location }}</strong>, {{ exp.duration }}</p>
                <ul>
                  <li v-for="(achievement, idx) in exp.achievements" :key="idx">
                    {{ achievement }}
                    <ul v-if="idx === exp.achievements.length - 1 && exp.subAchievements">
                      <li v-for="(subAchievement, subIdx) in exp.subAchievements" :key="subIdx">
                        {{ subAchievement }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <div class="card">
            <section>
              <h2><font-awesome-icon :icon="['fas', 'graduation-cap']" /> Education</h2>
              <div v-for="(edu, index) in education" :key="index" class="education-entry">
                <h3>{{ edu.degree }}</h3> <!-- Fixed here -->
                <p><strong>{{ edu.institution }}</strong>, {{ edu.location }}, {{ edu.duration }}</p>
                <ul>
                  <li v-for="(detail, idx) in edu.details" :key="idx">{{ detail }}</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <iframe class="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1807.4990578560348!2d121.4301048092969!3d25.034138013214616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a7e8507ba8dd%3A0xdf4b8bcb6330096f!2sCollege%20of%20Science%20%26%20Engineering!5e0!3m2!1sen!2stw!4v1728747622231!5m2!1sen!2stw"
          height="750" width="1050"
          style="filter: invert(90%); max-width: 100%;"
          allowfullscreen="true"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </main>
</template>

<style scoped>
.profile-picture {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.container {
  width: 90%;
  max-width: 1200px;
  min-height: 29.7cm;
  padding: 1cm;
  margin: 1cm auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: var(--color-bg-light);
}

.left-column,
.right-column {
  padding: .5rem;
  text-align: left;
}

.left-column h3,
.right-column h2,
.right-column h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.05rem;
}

.left-column p,
.right-column p {
  font-size: 1.1rem;
  margin-bottom: 1.8rem;
  line-height: 1.9;
}

.left-column ul,
.right-column ul {
  list-style-type: none;
  padding-left: 5px;
  margin-bottom: 1.5rem;
}

.left-column li,
.right-column li {
  position: relative;
  margin-bottom: 1rem;
  line-height: 1.7rem;
  padding-left: 20px;
}

.left-column ul li::before,
.right-column ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: .8rem;
  transform: translateY(-50%);
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  border: 1px solid var(--color-border);
}

.card {
  background-color: var(--color-bg-light);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
  margin-bottom: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.map {
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

.d-flex {
  display: flex;
  gap: 0;
  flex-wrap: wrap;
}

.left-column, .right-column {
  padding: 1rem;
}

.left-column {
  width: 30%;
  max-width: 320px;
  margin-right: 20px;
}

.right-column {
  width: 70%;
  flex: 1;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .d-flex {
    flex-direction: column;
  }

  .left-column,
  .right-column {
    width: 100%;
    margin-right: 0;
    max-width: 100%;
  }

  .card {
    width: 100%;
    margin: 0 auto 1.5rem;
  }
}
</style>
