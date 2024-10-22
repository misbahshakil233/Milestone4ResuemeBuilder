document.getElementById("resumeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Collect form data
    const name = document.getElementById("nameInput").value || "Name not provided";
    const jobTitle = document.getElementById("jobTitleInput").value || "Job title not provided";
    const about = document.getElementById("aboutInput").value || "About not provided";
    const email = document.getElementById("emailInput").value || "Email not provided";
    const phone = document.getElementById("phoneInput").value || "Phone not provided";
    const address = document.getElementById("addressInput").value || "Address not provided";
    const expertise = document.getElementById("expertiseInput").value.split(",").map(exp => exp.trim()).filter(Boolean);
    const hobbies = document.getElementById("hobbiesInput").value.split(",").map(hobby => hobby.trim()).filter(Boolean);
    const skills = document.getElementById("skillsInput").value.split(",").map(skill => skill.trim()).filter(Boolean);
    const workExperience = document.getElementById("workExperienceInput").value || "Work experience not provided";
    const education = document.getElementById("educationInput").value || "Education details not provided";

    // Profile Image Handling
    const profileInput = document.getElementById("profileImageInput");
    const profileImage = document.getElementById("profileImage");

    if (profileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.style.display = "block";
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(profileInput.files[0]);
    }

    // Dynamic Content Assignment
    document.getElementById("name").textContent = name;
    document.getElementById("jobTitle").textContent = jobTitle;
    document.getElementById("about").textContent = about;
    const contactInfo = `<li>Email: ${email}</li><li>Phone: ${phone}</li><li>Address: ${address}</li>`;
    document.getElementById("contactInfo").innerHTML = contactInfo;

    // Adding bullets for lists
    document.getElementById("expertise").innerHTML = expertise.map(exp => `<li>${exp}</li>`).join("");
    document.getElementById("hobbies").innerHTML = hobbies.map(hobby => `<li>${hobby}</li>`).join("");
    document.getElementById("skillsList").innerHTML = skills.map(skill => `<li>${skill}</li>`).join("");

    // Work Experience
    document.getElementById("workExperience").textContent = workExperience;

    // Education Styling
    const educationLines = education.split("\n").map(line => {
        const [yearRange, description] = line.split(" - ");
        return `
            <div class="education-entry">
                <p class="year-range">${yearRange || ""}</p>
                <p>${description || ""}</p>
            </div>
        `;
    }).join("");

    document.getElementById("educationInfo").innerHTML = educationLines;
});

// Make elements editable on click
function makeEditable(element) {
    element.addEventListener("click", function() {
        if (!element.isContentEditable) {
            element.contentEditable = "true";
            element.focus();
        }
    });

    element.addEventListener("blur", function() {
        element.contentEditable = "false";
    });
}

// Apply makeEditable function to resume elements
const editableElements = [
    document.getElementById("name"),
    document.getElementById("jobTitle"),
    document.getElementById("about"),
    document.getElementById("workExperience"),
    document.getElementById("educationInfo"),
    ...document.querySelectorAll("#contactInfo li"),
    ...document.querySelectorAll("#expertise li"),
    ...document.querySelectorAll("#hobbies li"),
    ...document.querySelectorAll("#skillsList li")
];

editableElements.forEach(makeEditable);
