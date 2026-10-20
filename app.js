// Step 1: getElementById selects the skill list, form, input, and message; the array stores existing skills.
const skills = ['Python', 'HTML'];
const skillsList = document.getElementById('skills-list');
const skillForm = document.getElementById('skill-form');
const skillInput = document.getElementById('skill-input');
const skillMessage = document.getElementById('skill-message');

// Step 1: replaceChildren clears the old list; forEach, createElement, and appendChild build the updated skill cards.
function renderSkills() {
    skillsList.replaceChildren();

    skills.forEach(function (skill) {
        const item = document.createElement('li');
        item.className = 'col';

        const card = document.createElement('div');
        card.className = 'card h-100';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const skillName = document.createElement('h3');
        skillName.className = 'card-title h5 fw-semibold mb-0';
        skillName.textContent = skill;

        cardBody.appendChild(skillName);
        card.appendChild(cardBody);
        item.appendChild(card);
        skillsList.appendChild(item);
    });
}

// Step 1: addEventListener handles form submission; preventDefault stops reload, trim validates input, and push adds a skill.
skillForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const newSkill = skillInput.value.trim();
    if (newSkill === '') {
        skillMessage.textContent = 'Enter a skill before adding it.';
        skillInput.focus();
        return;
    }

    if (skills.some(function (skill) {
        return skill.toLowerCase() === newSkill.toLowerCase();
    })) {
        skillMessage.textContent = 'That skill is already on the list.';
        skillInput.focus();
        return;
    }

    skills.push(newSkill);
    renderSkills();
    skillInput.value = '';
    skillMessage.textContent = newSkill + ' was added to your skills.';
});

renderSkills();

// Step 2: makes title, description, and deadline for the projects.
const projectTitles = [
    'Portfolio Website Refresh',
    'Coursework Project',
    'Personal Game Project'
];
const projectDescriptions = [
    'Updating this portfolio to present my background and skills.',
    'A placeholder for a course project; details can be added as they become available.',
    'deez nuts.'
];
const projectDeadlines = [
    '2026-12-10',
    '2026-12-10',
    '2026-12-10'
];
const projectsList = document.getElementById('projects-list');

// Step 3: makes deadline comparable
function getProjectStatus(deadline) {
    const deadlineDate = new Date(deadline + 'T00:00:00');
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const deadlineTime = deadlineDate.getTime();
    const todayTime = today.getTime();

    if (deadlineTime > todayTime) {
        return 'Ongoing';
    }
    if (deadlineTime < todayTime) {
        return 'Completed';
    }
    if (deadlineTime === todayTime) {
        return 'Due today';
    }

    return 'Invalid deadline';
}

// Step 2: makes a card for each project
for (let i = 0; i < projectTitles.length; i += 1) {
    const column = document.createElement('div');
    column.className = 'col-12 col-sm-6 col-xl-4';

    const card = document.createElement('article');
    card.className = 'card project-card h-100';

    const image = document.createElement('img');
    image.className = 'card-img-top project-image';
    image.src = 'Images&downloads/bleh.png';
    image.alt = 'Project placeholder image';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h3');
    title.className = 'card-title h5 fw-semibold';
    title.textContent = projectTitles[i];

    const description = document.createElement('p');
    description.className = 'card-text';
    description.textContent = projectDescriptions[i];

    const deadlineDate = new Date(projectDeadlines[i] + 'T00:00:00');
    const deadline = document.createElement('p');
    deadline.className = 'card-text';
    deadline.append('Deadline: ');

    const deadlineTime = document.createElement('time');
    deadlineTime.dateTime = projectDeadlines[i];
    deadlineTime.textContent = deadlineDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    deadline.appendChild(deadlineTime);

    const status = document.createElement('p');
    status.className = 'card-text';
    status.textContent = 'Status: ' + getProjectStatus(projectDeadlines[i]);

    cardBody.append(title, description, deadline, status);
    card.append(image, cardBody);
    column.appendChild(card);
    projectsList.appendChild(column);
}

// Step 4: updates number when clicked
let resumeDownloadCount = 0;
const downloadResumeLink = document.getElementById('download-resume');
const resumeDownloadCountElement = document.getElementById('resume-download-count');

downloadResumeLink.addEventListener('click', function () {
    resumeDownloadCount += 1;
    resumeDownloadCountElement.textContent = String(resumeDownloadCount);
});

// Step 5: make table and aligns them.
function createTable(containerId, headers, rows) {
    const container = document.getElementById(containerId);
    const table = document.createElement('table');
    table.className = 'table table-bordered table-striped align-middle';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(function (header) {
        const cell = document.createElement('th');
        cell.scope = 'col';
        cell.textContent = header;
        headerRow.appendChild(cell);
    });
    thead.appendChild(headerRow);

    const tbody = document.createElement('tbody');
    rows.forEach(function (row) {
        const tableRow = document.createElement('tr');
        row.forEach(function (value) {
            const cell = document.createElement('td');
            cell.textContent = value;
            tableRow.appendChild(cell);
        });
        tbody.appendChild(tableRow);
    });

    table.append(thead, tbody);
    container.replaceChildren(table);
}

// Step 5: made as rows
const experienceRows = [
    ['No experience details provided', 'N/A', 'N/A', 'N/A']
];
const educationRows = [
    ['Immersive Media & Games Degree', 'Northern Arizona University', 'Not provided', 'In progress'],
    ['CSS-121', 'Northern Arizona University', 'Not provided', 'Passed'],
    ['CS-212', 'Northern Arizona University', 'Not provided', 'Ongoing']
];

createTable('experience-table', ['Role', 'Company', 'Start date', 'End date'], experienceRows);
createTable(
    'education-table',
    ['Program/course', 'School', 'Start date', 'End date/status'],
    educationRows
);
