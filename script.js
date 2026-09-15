let scrollY = 0;
let currentY = 0;
let wrapper = document.getElementById('smooth-wrapper');
let heroTitle = document.getElementById('heroTitle');
const isMobile = window.innerWidth < 1024;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

function lerpScroll() {
    if (!isMobile && wrapper) {
        currentY += (scrollY - currentY) * 0.08;
        wrapper.style.transform = `translate3d(0, -${currentY}px, 0)`;
    }

    // Animación de desplazamiento y escala del título principal al hacer scroll
    let heroProgress = Math.min(scrollY / window.innerHeight, 1);
    if (heroTitle) {
        let xOffset = heroProgress * (isMobile ? 25 : 150);
        let scaleVal = 1 - heroProgress * (isMobile ? 0.04 : 0.15);
        let opacityVal = 1 - heroProgress * 1.2;
        heroTitle.style.transform = `translateX(-${xOffset}px) scale(${scaleVal})`;
        heroTitle.style.opacity = Math.max(opacityVal, 0);
    }

    requestAnimationFrame(lerpScroll);
}
lerpScroll();

function updateBodyHeight() {
    if (!isMobile && wrapper) {
        const totalHeight = wrapper.getBoundingClientRect().height;
        document.body.style.height = totalHeight + 'px';
    } else {
        document.body.style.height = 'auto';
    }
}

window.addEventListener('resize', updateBodyHeight);
window.addEventListener('load', updateBodyHeight);
setTimeout(updateBodyHeight, 150);

if (!isMobile && wrapper && window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(() => {
        updateBodyHeight();
    });
    resizeObserver.observe(wrapper);
}

// Desplegable de proyectos (Accordion nativo instantáneo)
const workWrappers = document.querySelectorAll('.work-item-wrapper');

workWrappers.forEach(wrapperEl => {
    const row = wrapperEl.querySelector('.work-item-row');
    if (row) {
        row.addEventListener('click', () => {
            const isActive = wrapperEl.classList.contains('active');
            
            workWrappers.forEach(w => w.classList.remove('active'));
            
            if (!isActive) {
                wrapperEl.classList.add('active');
            }
            
            setTimeout(updateBodyHeight, 400);
        });
    }
});

// Animación de las barras de idiomas al entrar en pantalla
const observerOptions = { threshold: 0.2 };
const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.lang-bar-fill');
            fills.forEach(fill => {
                fill.style.width = fill.getAttribute('data-width') + '%';
            });
        }
    });
}, observerOptions);

const langSection = document.getElementById('languages');
if (langSection) {
    langObserver.observe(langSection);
}
