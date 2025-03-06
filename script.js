document.addEventListener('DOMContentLoaded', function() {
    // Define all PICOs for easy reference
    const picos = {
        'pico2': 'Should interferon therapy be used in patients with early/prefibrotic Myelofibrosis?',
        'pico3': 'Should JAK inhibitor-naïve, higher-risk (DIPSS intermediate-2 and high) overt Myelofibrosis (primary and post-ET/PV MF) patients without symptomatic splenomegaly and/or inflammatory symptoms be treated with JAK inhibitors vs not?',
        'pico4': 'Should JAK inhibitor-naïve, symptomatic lower-risk (DIPSS low, intermediate-1) overt Myelofibrosis (primary and post-ET/PV MF) patients be treated with JAK inhibitors vs not?',
        'pico5': 'Should JAK inhibitor-naïve, overt Myelofibrosis (primary, post-ET/PV) patients whose primary symptom burden is disease-related anemia be treated with anemia-directed therapy or JAK inhibitor therapy?',
        'pico6': 'Should patients with Myelofibrosis who experience JAK inhibitor-associated anemia be managed with second-line JAK inhibitors, compared to optimization strategies to maintain front-line therapy?',
        'pico7': 'Should patients with higher-risk Myelofibrosis (int-2, high) on first-line JAK inhibitor therapy be referred for early transplantation, compared to delayed transplantation after failure of response to JAK inhibitor therapy?',
        'pico8': 'Among JAK inhibitor-naïve patients scheduled for transplant, should JAK inhibitor therapy be initiated prior to transplantation?',
        'pico9': 'Should aspirin therapy be used (or not) in all patients with Myelofibrosis?',
        'pico10': 'Should overt Myelofibrosis patients with transfusional iron overload and elevated ferritin be treated with iron chelators or not?'
    };
    
    // Get DOM elements
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('aside');
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Function to set up navigation links
    function setupNavigation() {
        const navLinks = document.querySelector('.nav-links');
        const mainContent = document.querySelector('main');
        
        // Clear existing content
        navLinks.innerHTML = '';
        mainContent.innerHTML = '';
        
        // For each PICO, create a navigation link and content section
        Object.keys(picos).forEach(picoId => {
            // Create navigation link
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${picoId}`;
            link.className = 'section-link';
            link.textContent = `Q${picoId.substring(4)}: ${picos[picoId].substring(0, 30)}...`;
            link.setAttribute('data-pico', picoId);
            li.appendChild(link);
            navLinks.appendChild(li);
            
            // Create content section (only initialize, content will be shown when clicked)
            const section = document.createElement('section');
            section.id = picoId;
            section.className = 'content-section';
            mainContent.appendChild(section);
        });
        
        // Add click event to each link
        document.querySelectorAll('.section-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the target section ID
                const targetId = this.getAttribute('href').substring(1);
                
                // Find the relevant section
                const targetSection = document.getElementById(targetId);
                
                // If section is empty, populate it
                if (targetSection.innerHTML === '') {
                    populateSection(targetId, targetSection);
                }
                
                // Remove active class from all links and sections
                document.querySelectorAll('.section-link').forEach(l => l.classList.remove('active'));
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Add active class to clicked link and target section
                this.classList.add('active');
                targetSection.classList.add('active');
                
                // Hide menu on mobile after selection
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
                
                // Scroll to top of content
                window.scrollTo(0, 0);
            });
        });
        
        // Set the first PICO as active by default
        if (document.querySelector('.section-link')) {
            document.querySelector('.section-link').click();
        }
    }
    
    // Function to populate a section with its content
    function populateSection(picoId, section) {
        // Get the PICO number
        const picoNum = picoId.substring(4);
        
        // Find the corresponding section in the original HTML
        const originalSection = document.querySelector(`.original-section[data-pico="${picoId}"]`);
        
        if (originalSection) {
            // Clone the content
            section.innerHTML = originalSection.innerHTML;
        }
    }
    
    // Run setup on load
    setupNavigation();
    
    // Initial setup for mobile devices
    function setupForMobile() {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        } else {
            sidebar.classList.add('active');
        }
    }
    
    // Run setup on load and window resize
    setupForMobile();
    window.addEventListener('resize', setupForMobile);
});