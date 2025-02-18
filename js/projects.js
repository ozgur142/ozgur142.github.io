document.addEventListener("DOMContentLoaded", function () {
    fetch("data/projects.json")
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.getElementById("projects-container");
            projectsContainer.innerHTML = ""; // Clear previous content

            data.forEach(project => {
                const projectCard = `
                    <a href="${project.link}" target="_blank" class="project-card transition-transform transform hover:scale-105 hover:shadow-xl">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-6">
                            <h3 class="text-xl md:text-2xl font-bold text-white mb-2">${project.title}</h3>
                            <p class="text-gray-300">${project.description}</p>
                        </div>
                    </a>
                `;
                projectsContainer.innerHTML += projectCard;
            });
        })
        .catch(error => console.error("Error loading projects:", error));
});
