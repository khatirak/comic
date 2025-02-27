document.addEventListener('DOMContentLoaded', function() {
    // Initialize comic variables
    let currentIndex = 1;
    const totalPanels = 10; // Update this with your total number of panels
    
    // Get DOM elements
    const panel1 = document.getElementById('panel1');
    const panel2 = document.getElementById('panel2');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Initialize navigation state
    updateNavigationState();
    
    // Navigation button event listeners
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrevious);
    
    // Function to update the panels when going to the next page
    function goToNext() {
        if (currentIndex < totalPanels - 1) {
            currentIndex++;
            
            // Shift panel 2 to panel 1 position
            panel1.querySelector('img').src = panel2.querySelector('img').src;
            panel1.querySelector('img').alt = `Comic panel ${currentIndex}`;
            
            // Load new image into panel 2
            panel2.querySelector('img').src = `images/panel${currentIndex + 1}.jpg`;
            panel2.querySelector('img').alt = `Comic panel ${currentIndex + 1}`;
            
            // Add transition effect
            addTransitionEffect();
            
            // Update navigation buttons state
            updateNavigationState();
        }
    }
    
    // Function to update the panels when going to the previous page
    function goToPrevious() {
        if (currentIndex > 1) {
            currentIndex--;
            
            // Load new images based on currentIndex
            panel1.querySelector('img').src = `images/panel${currentIndex}.jpg`;
            panel1.querySelector('img').alt = `Comic panel ${currentIndex}`;
            
            panel2.querySelector('img').src = `images/panel${currentIndex + 1}.jpg`;
            panel2.querySelector('img').alt = `Comic panel ${currentIndex + 1}`;
            
            // Add transition effect
            addTransitionEffect();
            
            // Update navigation buttons state
            updateNavigationState();
        }
    }
    
    // Function to add a visual transition effect
    function addTransitionEffect() {
        // Add a temporary class for transition animation
        panel1.classList.add('panel-transition');
        panel2.classList.add('panel-transition');
        
        // Remove the class after animation completes
        setTimeout(() => {
            panel1.classList.remove('panel-transition');
            panel2.classList.remove('panel-transition');
        }, 300);
    }
    
    // Function to update navigation buttons state
    function updateNavigationState() {
        // Disable prev button if at the beginning
        prevBtn.disabled = currentIndex <= 1;
        
        // Disable next button if at the end
        nextBtn.disabled = currentIndex >= totalPanels - 1;
    }
    
    // Smooth scroll from header to comic when clicking the down arrow
    document.querySelector('.scroll-indicator').addEventListener('click', function() {
        document.querySelector('.comic-container').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            goToNext();
        } else if (e.key === 'ArrowLeft') {
            goToPrevious();
        }
    });
    
    // Optional: Add swipe support for mobile
    let touchstartX = 0;
    let touchendX = 0;
    
    document.querySelector('.comic-panels').addEventListener('touchstart', function(e) {
        touchstartX = e.changedTouches[0].screenX;
    });
    
    document.querySelector('.comic-panels').addEventListener('touchend', function(e) {
        touchendX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50; // Minimum distance for a swipe
        
        if (touchendX < touchstartX - threshold) {
            // Swipe left, go next
            goToNext();
        }
        
        if (touchendX > touchstartX + threshold) {
            // Swipe right, go previous
            goToPrevious();
        }
    }
});

// Add a CSS class for the panel transition effect
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .panel-transition {
            animation: panelFade 0.3s ease;
        }
        
        @keyframes panelFade {
            0% { opacity: 0.7; }
            100% { opacity: 1; }
        }
    </style>
`);

// flower img comeup
window.addEventListener('load', () => {
    const flower = document.getElementById('flower');
    const halfWindowHeight = window.innerHeight / 2 -50; // Dynamic half height

    flower.style.transition = 'bottom 2s ease-in-out';
    flower.style.bottom = `${halfWindowHeight}px`; // Set dynamically
});

// Update position if the window resizes
window.addEventListener('resize', () => {
    const flower = document.getElementById('flower');
    flower.style.bottom = `${window.innerHeight / 2}px`;
});