// Verbeterde Login Functionaliteit
document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginForm = document.querySelector('.login-form');
    const signupLink = document.getElementById('signupLink');
    const submitBtn = document.querySelector('.modern-submit-btn');
    
    // Floating label functionaliteit
    const floatingInputs = document.querySelectorAll('.floating-input');
    floatingInputs.forEach(input => {
        // Zorg dat label correct geplaatst wordt bij herladen
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
    
    // Wachtwoord zichtbaar maken/verbergen
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Icoon veranderen
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
            
            // Micro-interactie
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Formulier verzenden met loading state
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simpele validatie
            if (!email || !password) {
                showError('Vul alstublieft alle velden in.');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError('Voer een geldig e-mailadres in.');
                return;
            }
            
            // Loading state activeren
            submitBtn.classList.add('loading');
            
            // Hier zou je normaal gesproken een API call doen
            setTimeout(() => {
                // Simuleer succesvol inloggen
                submitBtn.classList.remove('loading');
                showSuccess('Succesvol ingelogd! Je wordt doorgestuurd...');
                
                // Redirect naar hoofdpagina (in een echte app)
                setTimeout(() => {
                    // window.location.href = 'index.html';
                    console.log('Redirect naar hoofdpagina');
                }, 1500);
            }, 2000);
        });
    }
    
    // Google login
    const googleBtn = document.querySelector('.google-auth-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simuleer Google login
            showSuccess('Google authenticatie gestart...');
            console.log('Google login geïnitieerd');
        });
    }
    
    // Signup link met animatie
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pulse animatie
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
            
            // Redirect naar signup pagina met correct pad
            setTimeout(() => {
                window.location.href = '../signup/signup.html';
            }, 300);
        });
    }
    
    // Hulp functies
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(message) {
        // Simpele error weergave - kan uitgebreid worden met mooiere notificaties
        alert('Fout: ' + message);
    }
    
    function showSuccess(message) {
        // Simpele success weergave
        alert('Succes: ' + message);
    }
    
    function showInfo(message) {
        // Simpele info weergave
        alert('Info: ' + message);
    }
    
    // Input focus effect
    floatingInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});