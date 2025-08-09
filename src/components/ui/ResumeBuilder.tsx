import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import { useLanguage } from "@/contexts/LanguageContext"

// Extend jsPDF with autoTable
(jsPDF as any).autoTable = autoTable;

interface ResumeData {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: {
    title: string;
    company: string;
    period: string;
    description: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
  }[];
}

const mockResumeData: ResumeData = {
  name: "Fahad Khan",
  title: "Full-Stack Developer & UI/UX Designer",
  contact: {
    email: "fahadkhan233144@gmail.com",
    phone: "+92 (310) 477-9591",
    location: "Lahore, Pakistan",
  },
  summary:
    "Highly motivated Full-Stack Developer and UI/UX Designer with 5+ years of experience crafting robust web applications and intuitive user interfaces. Proficient in modern frontend and backend technologies, with a strong passion for clean code, innovative solutions, and collaborative development. Eager to contribute to impactful projects and continuously learn new technologies.",
  experience: [
    {
      title: "Senior Full-Stack Developer",
      company: "TechCorp",
      period: "Jan 2021 - Present",
      description: [
        "Led development of scalable web applications using React, Node.js, and PostgreSQL.",
        "Implemented RESTful APIs and integrated third-party services (e.g., Stripe).",
        "Mentored junior developers and conducted code reviews to ensure high code quality.",
      ],
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      period: "Mar 2019 - Dec 2020",
      description: [
        "Developed responsive user interfaces with React and TypeScript.",
        "Collaborated with design team to translate UI/UX wireframes into functional components.",
        "Optimized application performance and improved user experience.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of South Asia, Lahore",
      period: "2021 - 2025",
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
        "SASS",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Python",
        "Django",
        "PostgreSQL",
        "MongoDB",
        "REST APIs",
        "GraphQL",
      ],
    },
    {
      category: "Design",
      items: ["Figma", "Adobe XD", "UI/UX Design", "Responsive Design"],
    },
    {
      category: "Tools",
      items: ["Git", "Docker", "AWS", "Vercel", "Jest", "Cypress"],
    },
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      description:
        "Developed a full-stack e-commerce solution with real-time inventory and secure payment integration.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    },
    {
      title: "Task Management App",
      description:
        "Built a collaborative task management app with real-time updates and drag-and-drop features.",
      technologies: ["React", "TypeScript", "Firebase"],
    },
  ],
};

const ResumeBuilder: React.FC = () => {
  const [] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  //   const { t } = useLanguage()

  const generatePdf = async () => {
    setIsGenerating(true);
    setStatus("idle");

    try {
      // Simulate fetching data from a server action (replace with actual fetch if needed)
      // const resumeData = await fetchResumeDataFromServerAction();
      const resumeData = mockResumeData; // Using mock data for client-side demo

      const doc = new jsPDF();
      let yOffset = 20;
      const margin = 15;
      const lineHeight = 7;
      const sectionSpacing = 10;

      // Set font
      doc.setFont("helvetica");

      // Header
      doc.setFontSize(28);
      doc.setTextColor(40, 40, 40); // Dark gray
      doc.text(resumeData.name, margin, yOffset);
      yOffset += lineHeight;

      doc.setFontSize(16);
      doc.setTextColor(80, 80, 80); // Medium gray
      doc.text(resumeData.title, margin, yOffset);
      yOffset += lineHeight + 5;

      // Contact Info
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Email: ${resumeData.contact.email} | Phone: ${resumeData.contact.phone} | Location: ${resumeData.contact.location}`,
        margin,
        yOffset
      );
      yOffset += lineHeight + sectionSpacing;

      // Summary
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text("Summary", margin, yOffset);
      doc.line(
        margin,
        yOffset + 1,
        doc.internal.pageSize.width - margin,
        yOffset + 1
      ); // Underline
      yOffset += lineHeight + 2;

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const summaryLines = doc.splitTextToSize(
        resumeData.summary,
        doc.internal.pageSize.width - 2 * margin
      );
      doc.text(summaryLines, margin, yOffset);
      yOffset += summaryLines.length * lineHeight + sectionSpacing;

      // Experience
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text("Experience", margin, yOffset);
      doc.line(
        margin,
        yOffset + 1,
        doc.internal.pageSize.width - margin,
        yOffset + 1
      );
      yOffset += lineHeight + 2;

      resumeData.experience.forEach((exp) => {
        if (yOffset + 4 * lineHeight > doc.internal.pageSize.height - margin) {
          doc.addPage();
          yOffset = margin;
        }
        doc.setFontSize(12);
        doc.setTextColor(60, 60, 60);
        doc.text(`${exp.title} at ${exp.company}`, margin, yOffset);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(exp.period, doc.internal.pageSize.width - margin, yOffset, {
          align: "right",
        });
        yOffset += lineHeight;

        exp.description.forEach((desc) => {
          const descLines = doc.splitTextToSize(
            `• ${desc}`,
            doc.internal.pageSize.width - 2 * margin
          );
          doc.text(descLines, margin + 5, yOffset);
          yOffset += descLines.length * lineHeight;
        });
        yOffset += 5;
      });
      yOffset += sectionSpacing;

      // Education
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text("Education", margin, yOffset);
      doc.line(
        margin,
        yOffset + 1,
        doc.internal.pageSize.width - margin,
        yOffset + 1
      );
      yOffset += lineHeight + 2;

      resumeData.education.forEach((edu) => {
        if (yOffset + 2 * lineHeight > doc.internal.pageSize.height - margin) {
          doc.addPage();
          yOffset = margin;
        }
        doc.setFontSize(12);
        doc.setTextColor(60, 60, 60);
        doc.text(edu.degree, margin, yOffset);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `${edu.institution}, ${edu.period}`,
          doc.internal.pageSize.width - margin,
          yOffset,
          { align: "right" }
        );
        yOffset += lineHeight;
      });
      yOffset += sectionSpacing;

      // Skills
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text("Skills", margin, yOffset);
      doc.line(
        margin,
        yOffset + 1,
        doc.internal.pageSize.width - margin,
        yOffset + 1
      );
      yOffset += lineHeight + 2;

      resumeData.skills.forEach((skillCat) => {
        if (yOffset + 2 * lineHeight > doc.internal.pageSize.height - margin) {
          doc.addPage();
          yOffset = margin;
        }
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text(
          `${skillCat.category}: ${skillCat.items.join(", ")}`,
          margin,
          yOffset
        );
        yOffset += lineHeight;
      });
      yOffset += sectionSpacing;

      // Projects (Optional, can be added if space permits)
      if (yOffset + 3 * lineHeight < doc.internal.pageSize.height - margin) {
        doc.setFontSize(14);
        doc.setTextColor(40, 40, 40);
        doc.text("Projects", margin, yOffset);
        doc.line(
          margin,
          yOffset + 1,
          doc.internal.pageSize.width - margin,
          yOffset + 1
        );
        yOffset += lineHeight + 2;

        resumeData.projects.forEach((proj) => {
          if (
            yOffset + 3 * lineHeight >
            doc.internal.pageSize.height - margin
          ) {
            doc.addPage();
            yOffset = margin;
          }
          doc.setFontSize(12);
          doc.setTextColor(60, 60, 60);
          doc.text(proj.title, margin, yOffset);
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          doc.text(
            `Technologies: ${proj.technologies.join(", ")}`,
            doc.internal.pageSize.width - margin,
            yOffset,
            {
              align: "right",
            }
          );
          yOffset += lineHeight;
          const projDescLines = doc.splitTextToSize(
            proj.description,
            doc.internal.pageSize.width - 2 * margin
          );
          doc.text(projDescLines, margin + 5, yOffset);
          yOffset += projDescLines.length * lineHeight + 5;
        });
      }

      doc.save(`${resumeData.name.replace(/\s/g, "-")}-Resume.pdf`);
      setStatus("success");
    } catch (error) {
      console.error("Error generating PDF:", error);
      setStatus("error");
    } finally {
      setIsGenerating(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="resume"
    >

      <motion.button
        onClick={generatePdf}
        disabled={isGenerating}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="group relative px-8 py-4 transparent bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-xl transition-all duration-300 overflow-hidden hover:shadow-blue-500/25 text-sm sm:text-base">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>

        <span className="relative z-10 flex items-center space-x-2">
          {isGenerating ? (
            <>
              <Loader size={18} className="animate-spin" />
              <span>Generating...</span>
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle size={18} />
              <span>PDF Generated!</span>
            </>
          ) : status === "error" ? (
            <>
              <AlertCircle size={18} />
              <span>Error! Try Again</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>{"Resume"}</span>
            </>
          )}
        </span>
      </motion.button>
    </section>
  );
};

export default ResumeBuilder;
