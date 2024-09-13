// app.ts

// Function to handle form submission and generate the editable resume
import html2pdf from 'html2pdf.js';
function generateResume(event: Event) {
    event.preventDefault();

    // Get form input values
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const workExperience = (document.getElementById("workExperience") as HTMLInputElement).value;
    const skills = (document.getElementById("skills") as HTMLInputElement).value;

    // Populate the editable resume fields
    (document.getElementById("displayName") as HTMLElement).innerText = name;
    (document.getElementById("displayEducation") as HTMLElement).querySelector("p")!.innerText = education;
    (document.getElementById("displayWorkExperience") as HTMLElement).querySelector("p")!.innerText = workExperience;
    (document.getElementById("displaySkills") as HTMLElement).querySelector("p")!.innerText = skills;

    // Show the editable resume section
    (document.getElementById("editableResume") as HTMLElement).style.display = "block";

    // Generate unique URL based on the username
    const resumeURL = `${window.location.origin}/${username}/resume`;

    // Add event listener for sharing link
    document.getElementById("shareLink")!.addEventListener("click", () => {
        navigator.clipboard.writeText(resumeURL);
        const message = document.getElementById("shareMessage") as HTMLElement;
        message.style.display = "block";
        setTimeout(() => {
            message.style.display = "none";
        }, 2000);
    });

    // Add event listener for downloading PDF
    document.getElementById("downloadPdf")!.addEventListener("click", () => {
        downloadPDF();
    });
}

// Function to download the resume as a PDF
function downloadPDF() {
    const element = document.getElementById("editableResume")!;
    const opt = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use html2pdf to generate and save the PDF
    html2pdf().from(element).set(opt).save();
}

// Attach event listener to the form
const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
resumeForm.addEventListener("submit", generateResume);
