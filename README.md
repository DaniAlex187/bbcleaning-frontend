
# BBCleanPro

I Remove this, 

// Simulate form submission
    setTimeout(() => {
        // Hide loading state
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';
        
        // Hide form and show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'flex';
        
        // Reset form and show it again after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'flex';
            successMessage.style.display = 'none';
        }, 3000);
    }, 1500);
});

// Auto-advance testimonials every 5 seconds
setInterval(() => {
    nextTestimonial();
}, 5000);

To replace with this:


    // Collect form data
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Send data to backend
    fetch('https://bbcleaning-backend.vercel.app/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Hide loading state
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';

        if (response.ok) {
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'flex';

            // Reset form and show it again after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                successMessage.style.display = 'none';
            }, 3000);
        } else {
            alert('There was an error submitting the form. Please try again.');
        }
    })
    .catch(error => {
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';
        alert('There was an error submitting the form. Please try again.');
    });
});


So I can connect frontend to backend !!!

To insert a badge container stuck to the picture (just an example)

<section id="about" class="about">
        <div class="container">
            <div class="about-content">
                <div class="about-image">
                    <img src="https://images.pexels.com/photos/4107098/pexels-photo-4107098.jpeg" alt="Our cleaning team">
                    <div class="experience-badge">
                        <p class="experience-years">10+ Years</p>
                        <p class="experience-text">of Experience</p>
                    </div>
                </div>


If I want to add review, make changes

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Homeowner',
        content: 'I have been using this cleaning service for over a year now, and I could not be happier. My home is always spotless, and the team is always professional and thorough!',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'
    },
    {
        name: 'Michael Brown',
        role: 'Office Manager',
        content: 'We hired them for our office cleaning, and the difference was immediately noticeable. Their attention to detail and reliability has made them an essential part of our business operations.',
        rating: 5,
        imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
        name: 'Jennifer Smith',
        role: 'Property Manager',
        content: 'As a property manager, I need cleaning services I can trust. This company consistently delivers exceptional results for our move-out cleanings, making our turnover process much smoother.',
        rating: 4,
        imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    }
];