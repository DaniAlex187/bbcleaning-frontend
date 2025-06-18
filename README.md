
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