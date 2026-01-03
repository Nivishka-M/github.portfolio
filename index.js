/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  Portfolio Filter Functionality 
 ---------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.work__filter');
  const workBoxes = document.querySelectorAll('.work__box');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const category = button.getAttribute('data-category');

      workBoxes.forEach(box => {
        const boxCategories = box.getAttribute('data-category');
        
        if (category === 'all' || boxCategories.includes(category)) {
          box.style.opacity = '1';
          box.style.transform = 'scale(1)';
          box.style.display = 'block';
          // Add a small delay for smooth animation
          setTimeout(() => {
            box.style.opacity = '1';
          }, 50);
        } else {
          box.style.opacity = '0';
          box.style.transform = 'scale(0.8)';
          setTimeout(() => {
            box.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Add smooth transition styles to work boxes
  workBoxes.forEach(box => {
    box.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

/* -----------------------------------------
  Scroll Reveal Animations 
 ---------------------------------------- */

const revealElements = () => {
  const reveals = document.querySelectorAll('.reveal, .reveal-stagger');
  const windowHeight = window.innerHeight;
  
  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 150;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

// Add reveal classes to sections
document.addEventListener('DOMContentLoaded', () => {
  // Add reveal class to main sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('reveal');
  });
  
  // Add stagger effect to grid containers
  const grids = document.querySelectorAll('.work__boxes, .tools__grid, .contact__cards');
  grids.forEach(grid => {
    grid.classList.add('reveal-stagger');
  });
  
  // Initial check
  revealElements();
});

// Listen for scroll
window.addEventListener('scroll', revealElements);

/* -----------------------------------------
  Parallax Effect for Background Elements 
 ---------------------------------------- */

document.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const orbs = document.querySelectorAll('.header__gradient-orb');
  
  orbs.forEach((orb, index) => {
    const speed = 0.1 + (index * 0.05);
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

/* -----------------------------------------
  Smooth Hover Glow Effect 
 ---------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.work__box, .tools__category, .contact__card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

/* -----------------------------------------
  Typing Effect for Subtitle (Optional) 
 ---------------------------------------- */

const addTypingEffect = () => {
  const subtitle = document.querySelector('.header__text p');
  if (!subtitle) return;
  
  const text = subtitle.textContent;
  subtitle.textContent = '';
  subtitle.style.borderRight = '2px solid var(--pink)';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    } else {
      // Remove cursor after typing
      setTimeout(() => {
        subtitle.style.borderRight = 'none';
      }, 1000);
    }
  };
  
  // Start typing after a delay
  setTimeout(typeWriter, 500);
};

// Uncomment below to enable typing effect
// document.addEventListener('DOMContentLoaded', addTypingEffect);
