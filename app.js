// app.ts
// Function to handle form submission and generate the editable resume
function generateResume(event) {
    event.preventDefault();
    // Get form input values
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var education = document.getElementById("education").value;
    var workExperience = document.getElementById("workExperience").value;
    var skills = document.getElementById("skills").value;
    // Populate the editable resume fields
    document.getElementById("displayName").innerText = name;
    document.getElementById("displayEducation").querySelector("p").innerText = education;
    document.getElementById("displayWorkExperience").querySelector("p").innerText = workExperience;
    document.getElementById("displaySkills").querySelector("p").innerText = skills;
    // Show the editable resume section
    document.getElementById("editableResume").style.display = "block";
    // Generate unique URL based on the username
    var resumeURL = "".concat(window.location.origin, "/").concat(username, "/resume");
    // Add event listener for sharing link
    document.getElementById("shareLink").addEventListener("click", function () {
        navigator.clipboard.writeText(resumeURL);
        var message = document.getElementById("shareMessage");
        message.style.display = "block";
        setTimeout(function () {
            message.style.display = "none";
        }, 2000);
    });
    // Add event listener for downloading PDF
    document.getElementById("downloadPdf").addEventListener("click", function () {
        downloadPDF();
    });
}
// Function to download the resume as a PDF
function downloadPDF() {
    var element = document.getElementById("editableResume");
    var opt = {
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
var resumeForm = document.getElementById("resumeForm");
resumeForm.addEventListener("submit", generateResume);
