const heroTypedPhrases = [
    "scalable products",
    "immersive web apps",
    "secure experiences",
    "reliable cloud systems",
    "competitive solutions"
];

let typedIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".typed-cursor");

function typeLoop() {
    if (!typedSpan) {
        return;
    }

    const currentPhrase = heroTypedPhrases[typedIndex % heroTypedPhrases.length];
    const displayed = isDeleting
        ? currentPhrase.slice(0, Math.max(0, charIndex - 1))
        : currentPhrase.slice(0, charIndex + 1);

    typedSpan.textContent = displayed;
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    if (!isDeleting && charIndex === currentPhrase.length + 3) {
        isDeleting = true;
        setTimeout(typeLoop, 1000);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typedIndex += 1;
    }

    const typingSpeed = isDeleting ? 40 : 110;
    setTimeout(typeLoop, typingSpeed);
}

if (typedSpan) {
    typeLoop();
}

function setupCursorBlink() {
    if (!cursorSpan) {
        return;
    }

    let visible = true;
    setInterval(() => {
        cursorSpan.style.opacity = visible ? "0" : "1";
        visible = !visible;
    }, 500);
}

setupCursorBlink();

function setupRevealOnScroll() {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            root: null,
            threshold: 0.12
        }
    );

    document.querySelectorAll(".panel, .card, .hero, .hero-visual").forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}

function setupMobileNav() {
    const toggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector(".site-nav ul");

    if (!toggle || !navList) {
        return;
    }

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");

    toggle.addEventListener("click", () => {
        navList.classList.toggle("open");
        toggle.classList.toggle("active");

        const isOpen = toggle.classList.contains("active");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("open");
            toggle.classList.remove("active");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open navigation");
        });
    });
}

setupMobileNav();

function setupYear() {
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

setupYear();

const blogPosts = [
    {
        title: "Booting Up the Signal Log",
        description: "Why I am launching this blog, what to expect, and how curiosity fuels every experiment.",
        date: "2025-01-20",
        tags: ["announcement", "learning"],
        link: "#"
    },
    {
        title: "Competitive Programming Mindset",
        description: "A look into the routines, habits, and tactics that help me solve complex problems at speed.",
        date: "2025-02-05",
        tags: ["competitive", "strategy"],
        link: "#"
    },
    {
        title: "Securing the Stack",
        description: "Practical steps for hardening full stack applications without slowing down product velocity.",
        date: "2025-03-15",
        tags: ["cyber", "full stack"],
        link: "#"
    }
];

function renderBlogCards() {
    const blogGrid = document.getElementById("blog-grid");
    if (!blogGrid) {
        return;
    }

    const formatter = new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    blogGrid.innerHTML = blogPosts
        .map(post => {
            const formattedDate = formatter.format(new Date(post.date));
            const tagsHtml = post.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join("");

            return `
                <article class="card blog-card reveal">
                    <time datetime="${post.date}">${formattedDate}</time>
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <div class="tags">${tagsHtml}</div>
                    <a class="project-link" href="${post.link}">Read Post →</a>
                </article>
            `;
        })
        .join("");
}

renderBlogCards();
setupRevealOnScroll();

const subscribeButton = document.getElementById("subscribe-button");
if (subscribeButton) {
    subscribeButton.addEventListener("click", event => {
        event.preventDefault();
        subscribeButton.textContent = "Subscribed";
        subscribeButton.classList.add("primary");
        setTimeout(() => {
            subscribeButton.textContent = "Subscribe for updates";
            subscribeButton.classList.remove("primary");
        }, 2600);
    });
}
