/* =====================================================
   PROJECT DATA
===================================================== */

const projects = [

    {
        id: 1,

        title: "CampusConnect",

        category: "Full Stack",

        image: "assets/images/campusconnect.jpg",

        description:
            "A college event and society management platform where students can explore events, join societies, register for activities, and interact with university communities.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Bootstrap",
            "PHP",
            "MySQL"
        ],

        live: "#",

        github: "#"
    },


    {
        id: 2,

        title: "Recipe Sharing Website",

        category: "Web Development",

        image: "assets/images/recipe.jpg",

        description:
            "A recipe sharing platform designed around discovering recipes, viewing step-by-step instructions, and creating an interactive experience for users.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        live: "#",

        github: "#"
    }

];


/* =====================================================
   DOM ELEMENTS
===================================================== */

const projectsGrid =
    document.getElementById("projectsGrid");

const projectFilters =
    document.getElementById("projectFilters");

const projectModal =
    document.getElementById("projectModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");


/* =====================================================
   PROJECT FILTERS
===================================================== */

function createFilters() {

    const categories = [
        "All",
        ...new Set(
            projects.map(project => project.category)
        )
    ];


    projectFilters.innerHTML = "";


    categories.forEach(category => {

        const button =
            document.createElement("button");

        button.className =
            "filter-btn";

        if (category === "All") {
            button.classList.add("active");
        }

        button.textContent = category;


        button.addEventListener("click", () => {

            document
                .querySelectorAll(".filter-btn")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            displayProjects(category);

        });


        projectFilters.appendChild(button);

    });

}


/* =====================================================
   DISPLAY PROJECTS
===================================================== */

function displayProjects(category = "All") {

    projectsGrid.innerHTML = "";


    const filteredProjects =
        category === "All"
            ? projects
            : projects.filter(
                project =>
                    project.category === category
            );


    filteredProjects.forEach(project => {

        const card =
            document.createElement("article");

        card.className = "project-card";


        card.innerHTML = `

            <img
                src="${project.image}"
                alt="${project.title}"
                class="project-image"
                loading="lazy"
            >

            <div class="project-content">

                <span class="project-category">
                    ${project.category}
                </span>

                <h3>
                    ${project.title}
                </h3>

                <p>
                    ${project.description}
                </p>

                <div class="skill-tags">

                    ${project.technologies
                        .map(
                            tech =>
                                `<span>${tech}</span>`
                        )
                        .join("")
                    }

                </div>

                <div class="project-actions">

                    <button
                        class="btn btn-primary"
                        onclick="openProject(${project.id})">
                        View Project
                    </button>

                </div>

            </div>
        `;


        projectsGrid.appendChild(card);

    });

}


/* =====================================================
   OPEN PROJECT MODAL
===================================================== */

function openProject(projectId) {

    const project =
        projects.find(
            item => item.id === projectId
        );


    if (!project) return;


    document.getElementById("modalImage").src =
        project.image;


    document.getElementById("modalImage").alt =
        project.title;


    document.getElementById("modalCategory").textContent =
        project.category;


    document.getElementById("modalTitle").textContent =
        project.title;


    document.getElementById("modalDescription").textContent =
        project.description;


    document.getElementById("modalTech").innerHTML =
        project.technologies
            .map(
                tech =>
                    `<span>${tech}</span>`
            )
            .join("");


    document.getElementById("modalLive").href =
        project.live;


    document.getElementById("modalGithub").href =
        project.github;


    projectModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =====================================================
   CLOSE PROJECT MODAL
===================================================== */

function closeProject() {

    projectModal.classList.remove("active");

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeProject
);


modalOverlay.addEventListener(
    "click",
    closeProject
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            projectModal.classList.contains("active")
        ) {

            closeProject();

        }

    }
);


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


menuToggle.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle("active");

    }
);


document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove("active");

            }
        );

    });


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }
);


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById("name").value;


        formMessage.textContent =
            `Thanks ${name}. Your message is ready to be connected to a backend/email service.`;


        contactForm.reset();

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

createFilters();

displayProjects();