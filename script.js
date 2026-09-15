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
