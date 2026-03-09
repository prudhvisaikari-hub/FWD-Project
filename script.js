

document.addEventListener('DOMContentLoaded', () => {
    console.log("Bright Futures Tracker initialized.");


    const path = window.location.pathname;
    const page = path.split("/").pop();


    if (page === 'login_parent.html' || page === 'login_doctor.html' || page === 'login_caretaker.html') {
        setupLoginForm();
    } else if (page === 'home_page.html' || page === '') {
        setupHomePage();
    } else if (page === 'dashboard.html') {
        setupDashboard();
    } else if (page === 'login.html') {
        setupLoginHub();
    }

    setupCommonUI();
});


function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    if (loginForm && loginMessage) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember') ? document.getElementById('remember').checked : false;


            if (!email || !password) {
                showMessage(loginMessage, 'error', 'Please fill in both email and password.');
                return;
            }

            if (password.length >= 6) {
                showMessage(loginMessage, 'success', 'Login successful! Redirecting to tracker...');

                if (remember) {
                    localStorage.setItem('userEmail', email);
                }

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1200);
            } else {
                showMessage(loginMessage, 'error', 'Invalid email or password. Password must be at least 6 characters.');
            }
        });
    }

    const savePermissionsBtn = document.getElementById('savePermissionsBtn');
    if (savePermissionsBtn) {
        savePermissionsBtn.addEventListener('click', () => {
            const originalText = savePermissionsBtn.textContent;
            savePermissionsBtn.textContent = 'Permissions Saved ✓';
            savePermissionsBtn.disabled = true;

            setTimeout(() => {
                savePermissionsBtn.textContent = originalText;
                savePermissionsBtn.disabled = false;
            }, 2000);
        });
    }
}


function setupHomePage() {
    const newChildBtn = document.getElementById('new-child-btn');
    const cancelFormBtn = document.getElementById('cancel-form');
    const childForm = document.getElementById('child-form');
    const formSection = document.getElementById('new-child-form');
    const formMessage = document.getElementById('form-message');

    const displayName = document.getElementById('display-name');
    const displayAge = document.getElementById('display-age');
    const displayDiagnosis = document.getElementById('display-diagnosis');
    const displayCareTeam = document.getElementById('display-care-team');

    const displaySocialLevel = document.getElementById('display-social-level');
    const displaySocialNotes = document.getElementById('display-social-notes');
    const displayCommunicationLevel = document.getElementById('display-communication-level');
    const displayCommunicationNotes = document.getElementById('display-communication-notes');
    const displaySensoryLevel = document.getElementById('display-sensory-level');
    const displaySensoryNotes = document.getElementById('display-sensory-notes');
    const displayPhysicalLevel = document.getElementById('display-physical-level');
    const displayPhysicalNotes = document.getElementById('display-physical-notes');

    if (newChildBtn && formSection) {
        newChildBtn.addEventListener('click', () => {
            formSection.style.display = 'block';
            if (formMessage) formMessage.textContent = '';
            if (childForm) childForm.reset();
            formSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (cancelFormBtn) {
        cancelFormBtn.addEventListener('click', () => {
            formSection.style.display = 'none';
        });
    }

    if (childForm) {
        childForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = {
                name: document.getElementById('child-name').value.trim(),
                age: document.getElementById('child-age').value.trim(),
                diagnosis: document.getElementById('diagnosis').value.trim(),
                careTeam: document.getElementById('care-team').value.trim(),
                social: { level: document.getElementById('axis-social').value, notes: document.getElementById('axis-social-notes').value.trim() },
                communication: { level: document.getElementById('axis-communication').value, notes: document.getElementById('axis-communication-notes').value.trim() },
                sensory: { level: document.getElementById('axis-sensory').value, notes: document.getElementById('axis-sensory-notes').value.trim() },
                physical: { level: document.getElementById('axis-physical').value, notes: document.getElementById('axis-physical-notes').value.trim() }
            };


            if (displayName) displayName.textContent = data.name || 'Sample Child';
            if (displayAge) displayAge.textContent = (data.age ? data.age + ' years' : '7 years');
            if (displayDiagnosis) displayDiagnosis.textContent = data.diagnosis || 'Autism Spectrum, chronic physical illness monitoring.';
            if (displayCareTeam) displayCareTeam.textContent = data.careTeam || 'Parents, pediatrician, therapist, teacher.';

            if (displaySocialLevel) displaySocialLevel.textContent = data.social.level || 'Emerging';
            if (displaySocialNotes) displaySocialNotes.textContent = data.social.notes || 'Responds to name, occasional eye contact.';

            if (displayCommunicationLevel) displayCommunicationLevel.textContent = data.communication.level || 'Developing';
            if (displayCommunicationNotes) displayCommunicationNotes.textContent = data.communication.notes || 'Uses single words and gestures.';

            if (displaySensoryLevel) displaySensoryLevel.textContent = data.sensory.level || 'Sensitive';
            if (displaySensoryNotes) displaySensoryNotes.textContent = data.sensory.notes || 'Discomfort with loud sounds and crowds.';

            if (displayPhysicalLevel) displayPhysicalLevel.textContent = data.physical.level || 'Stable';
            if (displayPhysicalNotes) displayPhysicalNotes.textContent = data.physical.notes || 'On long-term medication, regular follow-ups.';

            if (formMessage) formMessage.textContent = `Record for "${data.name}" saved successfully (demo).`;

            const profile = document.getElementById('profile');
            if (profile) profile.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => { formSection.style.display = 'none'; }, 2000);
        });
    }


    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        card.style.transition = 'all 0.4s ease-out ' + (index * 0.1) + 's';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
}
function setupDashboard() {
    console.log("Dashboard activity monitoring active.");


    const saveMilestoneBtn = document.getElementById('saveMilestoneBtn');
    const clearMilestoneBtn = document.getElementById('clearMilestoneBtn');
    const milestoneText = document.getElementById('milestoneText');
    const milestoneDomain = document.getElementById('milestoneDomain');
    const milestoneMessage = document.getElementById('milestoneMessage');

    if (saveMilestoneBtn) {
        saveMilestoneBtn.addEventListener('click', () => {
            const text = milestoneText.value.trim();
            const domain = milestoneDomain.value;

            if (!text || !domain) {
                milestoneMessage.textContent = 'Please fill in both description and domain.';
                milestoneMessage.style.color = '#c62828';
                return;
            }

            milestoneMessage.style.color = '#2e7d32';
            milestoneMessage.textContent = 'Milestone saved successfully (demo).';
            milestoneText.value = '';
            milestoneDomain.value = '';
        });
    }

    if (clearMilestoneBtn) {
        clearMilestoneBtn.addEventListener('click', () => {
            milestoneText.value = '';
            milestoneDomain.value = '';
            milestoneMessage.textContent = '';
        });
    }


    const saveTriggerBtn = document.getElementById('saveTriggerBtn');
    const clearTriggerBtn = document.getElementById('clearTriggerBtn');
    const triggerText = document.getElementById('triggerText');
    const triggerMessage = document.getElementById('triggerMessage');

    if (saveTriggerBtn) {
        saveTriggerBtn.addEventListener('click', () => {
            const text = triggerText.value.trim();

            if (!text) {
                triggerMessage.textContent = 'Please describe the trigger or behaviour note.';
                triggerMessage.style.color = '#c62828';
                return;
            }

            triggerMessage.style.color = '#2e7d32';
            triggerMessage.textContent = 'Trigger note saved successfully (demo).';
            triggerText.value = '';
        });
    }

    if (clearTriggerBtn) {
        clearTriggerBtn.addEventListener('click', () => {
            triggerText.value = '';
            triggerMessage.textContent = '';
        });
    }

    const milestoneItems = document.querySelectorAll('.milestone-item');
    milestoneItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
        });
    });
}


function setupLoginHub() {
    const roleCards = document.querySelectorAll('.role-card');

    roleCards.forEach((card, index) => {

        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        card.style.transition = 'all 0.4s ease-out ' + (index * 0.12) + 's';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300);
    });
}


function showMessage(element, type, message) {
    element.innerText = message;
    element.style.display = 'block';

    if (type === 'success') {
        element.className = 'login-success';
    } else {
        element.className = 'login-error';
    }
}

function setupCommonUI() {

    const links = document.querySelectorAll('nav a');
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'home_page.html';

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === page || (page === 'index.html' && href === 'home_page.html')) {
            link.classList.add('active');
        } else {

            if (href === 'login.html' && page.startsWith('login_')) {
                link.classList.add('active');
            }
        }
    });

    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        console.log("Returning user detected: " + userEmail);
    }
}
