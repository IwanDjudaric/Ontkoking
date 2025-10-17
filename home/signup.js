// Signup Pagina Functionaliteit
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.step');
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.querySelector('.progress-steps').appendChild(progressBar);

    let currentStep = 1;
    const totalSteps = 3;

    // Initialiseer progress bar
    updateProgressBar();

    // Password toggle functionaliteit
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.closest('.floating-input-group').querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
            
            // Micro-interactie
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Wachtwoordsterkte meter
    const passwordInput = document.getElementById('signupPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }

    // Gebruikersnaam beschikbaarheid
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            checkUsernameAvailability(this.value);
        });
    }

    // Wachtwoord bevestiging
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            validatePasswordMatch();
        });
    }

    // Next step knoppen
    document.querySelectorAll('.next-step-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const nextStep = parseInt(this.dataset.next);
            if (validateStep(currentStep)) {
                navigateToStep(nextStep);
            }
        });
    });

    // Previous step knoppen
    document.querySelectorAll('.prev-step-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStep = parseInt(this.dataset.prev);
            navigateToStep(prevStep);
        });
    });

    // Form submit
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateStep(currentStep)) {
                const submitBtn = this.querySelector('.signup-submit-btn');
                submitBtn.classList.add('loading');
                
                // Simuleer registratie proces
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    showSuccess('Account succesvol aangemaakt! Welkom bij KookGenZ!');
                    
                    // Redirect naar login pagina
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                }, 3000);
            }
        });
    }

    // Navigatie tussen stappen
    function navigateToStep(step) {
        // Verberg huidige stap
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
        
        // Toon nieuwe stap
        document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
        document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
        
        // Markeer vorige stappen als voltooid
        for (let i = 1; i < step; i++) {
            document.querySelector(`.step[data-step="${i}"]`).classList.add('completed');
        }
        
        currentStep = step;
        updateProgressBar();
    }

    // Update progress bar
    function updateProgressBar() {
        const progress = ((currentStep - 1) / (totalSteps - 1)) * 80 + 10; // 10% - 90%
        progressBar.style.width = `${progress}%`;
    }

    // Validatie per stap
    function validateStep(step) {
        const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
        const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                markInvalid(input, 'Dit veld is verplicht');
                isValid = false;
            } else {
                markValid(input);
            }
        });

        // Specifieke validatie voor stap 1
        if (step === 1) {
            const email = document.getElementById('signupEmail').value;
            if (email && !isValidEmail(email)) {
                markInvalid(document.getElementById('signupEmail'), 'Voer een geldig e-mailadres in');
                isValid = false;
            }

            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password && confirmPassword && password !== confirmPassword) {
                markInvalid(document.getElementById('confirmPassword'), 'Wachtwoorden komen niet overeen');
                isValid = false;
            }
        }

        // Specifieke validatie voor stap 3
        if (step === 3) {
            const termsAccepted = document.getElementById('acceptTerms').checked;
            if (!termsAccepted) {
                showError('Je moet akkoord gaan met de gebruiksvoorwaarden');
                isValid = false;
            }
        }

        return isValid;
    }

    // Wachtwoordsterkte check
    function checkPasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        
        if (!password) {
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '#e53e3e';
            strengthText.textContent = 'Wachtwoordsterkte';
            return;
        }

        let strength = 0;
        let feedback = '';

        // Criteria
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 25;

        strength = Math.min(strength, 100);

        // Update UI
        strengthBar.style.width = `${strength}%`;
        
        if (strength < 40) {
            strengthBar.style.backgroundColor = '#e53e3e';
            feedback = 'Zwak';
        } else if (strength < 70) {
            strengthBar.style.backgroundColor = '#ed8936';
            feedback = 'Matig';
        } else if (strength < 90) {
            strengthBar.style.backgroundColor = '#ecc94b';
            feedback = 'Goed';
        } else {
            strengthBar.style.backgroundColor = '#48bb78';
            feedback = 'Sterk';
        }

        strengthText.textContent = `Wachtwoordsterkte: ${feedback}`;
    }

    // Gebruikersnaam beschikbaarheid
    function checkUsernameAvailability(username) {
        const availabilityDiv = document.querySelector('.username-availability');
        
        if (!username) {
            availabilityDiv.style.display = 'none';
            return;
        }

        if (username.length < 3) {
            availabilityDiv.textContent = 'Minimaal 3 karakters';
            availabilityDiv.className = 'username-availability username-taken';
            availabilityDiv.style.display = 'block';
            return;
        }

        // Simuleer beschikbaarheidscheck
        setTimeout(() => {
            const takenUsernames = ['admin', 'test', 'user', 'koken'];
            const isAvailable = !takenUsernames.includes(username.toLowerCase());
            
            if (isAvailable) {
                availabilityDiv.textContent = '✓ Gebruikersnaam beschikbaar';
                availabilityDiv.className = 'username-availability username-available';
            } else {
                availabilityDiv.textContent = '✗ Gebruikersnaam is al in gebruik';
                availabilityDiv.className = 'username-availability username-taken';
            }
            availabilityDiv.style.display = 'block';
        }, 500);
    }

    // Wachtwoord match validatie
    function validatePasswordMatch() {
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                markInvalid(document.getElementById('confirmPassword'), 'Wachtwoorden komen niet overeen');
            } else {
                markValid(document.getElementById('confirmPassword'));
            }
        }
    }

    // Hulp functies
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function markInvalid(input, message) {
        const group = input.closest('.floating-input-group');
        group.classList.add('invalid');
        
        // Verwijder bestaande error
        const existingError = group.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Voeg error message toe
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.cssText = 'color: #e53e3e; font-size: 12px; margin-top: 5px;';
        group.appendChild(error);
    }

    function markValid(input) {
        const group = input.closest('.floating-input-group');
        group.classList.remove('invalid');
        
        const existingError = group.querySelector('.error-message');
        if (existingError) existingError.remove();
    }

    function showError(message) {
        alert('Fout: ' + message);
    }

    function showSuccess(message) {
        alert('Succes: ' + message);
    }

    // Initialiseer floating labels
    const floatingInputs = document.querySelectorAll('.floating-input');
    floatingInputs.forEach(input => {
        if (input.value) {
            input.dispatchEvent(new Event('input'));
        }
        
        input.addEventListener('input', function() {
            const label = this.nextElementSibling;
            if (this.value) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    });
});