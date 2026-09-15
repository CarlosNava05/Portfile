let scrollY = 0;
let currentY = 0;
let wrapper = document.getElementById('smooth-wrapper');
let heroTitle = document.getElementById('heroTitle');

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

function lerpScroll() {
    currentY += (scrollY - currentY) * 0.08;
    wrapper.style.transform = `translate3d(0, -${currentY}px, 0)`;

    let heroProgress = Math.min(scrollY / window.innerHeight, 1);
    if (heroTitle) {
        let xOffset = heroProgress * 150;
        let scaleVal = 1 - heroProgress * 0.15;
        let opacityVal = 1 - heroProgress * 1.2;
        heroTitle.style.transform = `translateX(-${xOffset}px) scale(${scaleVal})`;
        heroTitle.style.opacity = Math.max(opacityVal, 0);
    }

    requestAnimationFrame(lerpScroll);
}
lerpScroll();

window.addEventListener('resize', updateBodyHeight);
function updateBodyHeight() {
    document.body.style.height = wrapper.getBoundingClientRect().height + 'px';
}
setTimeout(updateBodyHeight, 100);

// Inline Project Showcase Toggle (Accordion Style)
const workWrappers = document.querySelectorAll('.work-item-wrapper');

workWrappers.forEach(wrapperEl => {
    const row = wrapperEl.querySelector('.work-item-row');
    row.addEventListener('click', () => {
        const isActive = wrapperEl.classList.contains('active');
        
        // Cierra los demás
        workWrappers.forEach(w => w.classList.remove('active'));
        
        // Si no estaba activo, lo abre
        if (!isActive) {
            wrapperEl.classList.add('active');
        }
        
        setTimeout(updateBodyHeight, 400);
    });
});

// Trigger Language Bars Animation on Scroll
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
if (langSection) langObserver.observe(langSection);
