// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionamos los elementos necesarios
    const navLinks = document.querySelectorAll('.header__nav-link');
    const portfolioItems = document.querySelectorAll('.portfolio__item');

    // Añadimos un efecto de scroll suave para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Prevenimos el comportamiento por defecto
            e.preventDefault();

            // Obtenemos el destino del enlace
            const targetId = this.getAttribute('href');

            // Si es un enlace interno, hacemos scroll suave
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Ajustamos para el header fijo
                        behavior: 'smooth'
                    });
                }
            } else {
                // Si es un enlace externo, navegamos normalmente
                window.location.href = targetId;
            }
        });
    });

    // Añadimos un efecto de hover para los elementos del portfolio
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.cursor = 'pointer';
        });

        // Podríamos añadir un evento click para abrir detalles del proyecto
        item.addEventListener('click', function () {
            const projectTitle = this.querySelector('.portfolio__item-title').textContent;
            console.log(`Proyecto seleccionado: ${projectTitle}`);
            // Aquí podríamos abrir un modal con más detalles del proyecto
        });
    });

    // Funcionalidad para mostrar/ocultar el menú en dispositivos móviles
    // (Este código se activaría si añadiéramos un botón de hamburguesa en el HTML)
    const menuToggle = document.querySelector('.menu-toggle');
    const headerNav = document.querySelector('.header__nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            headerNav.classList.toggle('header__nav--active');
            this.classList.toggle('menu-toggle--active');
        });
    }

    // Animación para los elementos cuando aparecen en el viewport
    // Usando Intersection Observer API
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observamos los elementos que queremos animar
    document.querySelectorAll('.portfolio__item').forEach(item => {
        observer.observe(item);
    });
});