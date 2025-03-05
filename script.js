document.addEventListener('DOMContentLoaded', function() {
    // Initialize comic variables
    let currentPairIndex = 1; // Now tracking pairs instead of individual panels
    const totalPanels = 12; // Total number of panels
    let choiceMade = false; // Track if a story choice has been made
    let choiceRoute = null; // Track which choice was selected (A or B)
    
    // Get DOM elements
    const panel1 = document.getElementById('panel1');
    const panel2 = document.getElementById('panel2');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const storyChoice = document.getElementById('storyChoice');
    const choiceABtn = document.getElementById('choiceA');
    const choiceBBtn = document.getElementById('choiceB');
    
    // Predefined captions for each panel
    const panelCaptions = {
        1: "It was an ordinary sunny, peaceful day.",
        2: "Sunny: 'Look at those biceps! Pure, photosynthesized muscle - just like me!'",
        3: "<i>Sunny flexes her leafy arms.",
        4: "<i>Peash squints.</i> \n “That’s… literally just leaves.”",
        5: "<i>A zombie groans in the distance, Peash tenses.</i> \n  “Alright, step aside, I got this.”",
        6: "Caption for panel 6 goes here",
        7: "Caption for panel 7 goes here",
        8: "Caption for panel 8 goes here",
        9: "Option A: Caption for panel 9 goes here",
        10: "Option A: Caption for panel 10 goes here",
        11: "Option B: Caption for panel 11 goes here",
        12: "Option B: Caption for panel 12 goes here",
    };
    
    // Load initial panels (1 & 2)
    loadPanelPair(currentPairIndex);
    
    // Initialize navigation state
    updateNavigationState();
    
    // Navigation button event listeners
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrevious);
    
    // Story choice button event listeners
    choiceABtn.addEventListener('click', function() {
        makeChoice('A');
    });
    
    choiceBBtn.addEventListener('click', function() {
        makeChoice('B');
    });
    
    // Function to handle story choice
    function makeChoice(choice) {
        choiceMade = true;
        choiceRoute = choice;
        
        // Hide choice UI
        storyChoice.style.display = 'none';
        
        // Show navigation buttons
        nextBtn.disabled = false;
        
        // Load appropriate panels based on choice
        if (choice === 'A') {
            currentPairIndex = 5; // This will show panels 9 & 10
        } else {
            currentPairIndex = 6; // This will show panels 11 & 12
        }
        
        loadPanelPair(currentPairIndex);
        updateNavigationState();
    }
    
    // Function to load a specific pair of panels
    function loadPanelPair(pairIndex) {
        // Calculate the panel numbers based on pair index
        let leftPanelNum, rightPanelNum;
        
        if (choiceMade) {
            if (choiceRoute === 'A') {
                // Option A route (panels 9-10)
                leftPanelNum = 9;
                rightPanelNum = 10;
            } else {
                // Option B route (panels 11-12)
                leftPanelNum = 11;
                rightPanelNum = 12;
            }
        } else {
            // Normal route (panels 1-8)
            leftPanelNum = (pairIndex - 1) * 2 + 1;
            rightPanelNum = leftPanelNum + 1;
        }
        
        // Update images
        panel1.querySelector('img').src = `img/panel${leftPanelNum}.jpeg`;
        panel1.querySelector('img').alt = `Comic panel ${leftPanelNum}`;
        
        panel2.querySelector('img').src = `img/panel${rightPanelNum}.jpeg`;
        panel2.querySelector('img').alt = `Comic panel ${rightPanelNum}`;
        
        // Update captions
        panel1.querySelector('.caption-text').innerHTML = (panelCaptions[leftPanelNum] || 'No caption available').replace(/\n/g, '<br>');
panel2.querySelector('.caption-text').innerHTML = (panelCaptions[rightPanelNum] || 'No caption available').replace(/\n/g, '<br>');
        
        // Add transition effect
        addTransitionEffect();
    }
    
    // Function to go to the next pair of panels
    function goToNext() {
        // Check if we're at the choice point (after panels 7&8)
        if (currentPairIndex === 4 && !choiceMade) {
            // Show the choice UI
            storyChoice.style.display = 'block';
            // Disable the next button until a choice is made
            nextBtn.disabled = true;
            return;
        }
        
        // Normal navigation
        if ((currentPairIndex < 4 && !choiceMade) || (choiceMade && currentPairIndex < 6)) {
            currentPairIndex++;
            loadPanelPair(currentPairIndex);
            updateNavigationState();
        }
    }
    
    // Function to go to the previous pair of panels
    function goToPrevious() {
        if (currentPairIndex > 1) {
            // If we're at the choice result panels and try to go back
            if (choiceMade && (currentPairIndex === 5 || currentPairIndex === 6)) {
                // Go back to panels 7&8
                choiceMade = false;
                choiceRoute = null;
                currentPairIndex = 4;
                
                // Enable the next button
                nextBtn.disabled = false;
            } else {
                currentPairIndex--;
            }
            
            loadPanelPair(currentPairIndex);
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
        prevBtn.disabled = currentPairIndex <= 1;
        
        // Handle next button state
        if (choiceMade) {
            // If a choice has been made, disable next button at the end
            nextBtn.disabled = currentPairIndex >= 6;
        } else {
            // If no choice made yet, allow navigation up to choice point
            nextBtn.disabled = currentPairIndex > 4;
        }
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

// flower img comeup
window.addEventListener('load', () => {
    const flower = document.getElementById('flower');
    const halfWindowHeight = window.innerHeight / 5 - 50 ; // Dynamic half height

    flower.style.bottom = `${halfWindowHeight}px`; // Set dynamically
    // Note: Removed transition here as it's now handled by CSS animation
});

// Update position if the window resizes
window.addEventListener('resize', () => {
    const flower = document.getElementById('flower');
    flower.style.bottom = `${window.innerHeight / 2}px`;
});