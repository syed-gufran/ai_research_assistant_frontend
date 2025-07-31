// API Configuration
const API_BASE_URL = "https://ai-research-assistant-gclm.onrender.com"; // Update this to match your FastAPI server URL

// DOM Elements
const researchForm = document.getElementById("researchForm");
const submitBtn = document.getElementById("submitBtn");
const loadingSpinner = document.getElementById("loadingSpinner");
const reportModal = document.getElementById("reportModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const navToggle = document.getElementById("navToggle");
const navMenu = document.querySelector(".nav-menu");

// Report state management
let reportsGenerated = false;
let currentResearchTopic = "";

// Premium Animation Functions
function createParticleEffect(x, y, color = "#00d4ff") {
  const particle = document.createElement("div");
  particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        animation: particleExplode 0.6s ease-out forwards;
    `;
  document.body.appendChild(particle);

  setTimeout(() => {
    document.body.removeChild(particle);
  }, 600);
}

function addRippleEffect(element, event) {
  const ripple = document.createElement("div");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(0, 212, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

  element.style.position = "relative";
  element.appendChild(ripple);

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

// Enhanced Loading Animation
function showPremiumLoading() {
  const loadingOverlay = document.createElement("div");
  loadingOverlay.id = "premiumLoading";
  loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

  loadingOverlay.innerHTML = `
        <div class="premium-loader">
            <div class="loader-ring"></div>
            <div class="loader-text">Processing Research...</div>
            <div class="loader-particles">
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
            </div>
        </div>
    `;

  document.body.appendChild(loadingOverlay);
}

function hidePremiumLoading() {
  const loadingOverlay = document.getElementById("premiumLoading");
  if (loadingOverlay) {
    loadingOverlay.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => {
      if (loadingOverlay.parentNode) {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
      }
    }, 300);
  }
}

// Premium Animation Functions
function createParticleEffect(x, y, color = "#00d4ff") {
  const particle = document.createElement("div");
  particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        animation: particleExplode 0.6s ease-out forwards;
    `;
  document.body.appendChild(particle);

  setTimeout(() => {
    document.body.removeChild(particle);
  }, 600);
}

function addRippleEffect(element, event) {
  const ripple = document.createElement("div");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(0, 212, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

  element.style.position = "relative";
  element.appendChild(ripple);

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

// Enhanced Loading Animation
function showPremiumLoading() {
  const loadingOverlay = document.createElement("div");
  loadingOverlay.id = "premiumLoading";
  loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

  loadingOverlay.innerHTML = `
        <div class="premium-loader">
            <div class="loader-ring"></div>
            <div class="loader-text">Processing Research...</div>
            <div class="loader-particles">
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
            </div>
        </div>
    `;

  document.body.appendChild(loadingOverlay);

  // Add CSS for premium loader
  const style = document.createElement("style");
  style.textContent = `
        .premium-loader {
            text-align: center;
            color: white;
        }
        
        .loader-ring {
            width: 80px;
            height: 80px;
            border: 4px solid rgba(0, 212, 255, 0.3);
            border-top: 4px solid #00d4ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
            box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
        }
        
        .loader-text {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #00d4ff, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .loader-particles {
            position: relative;
            width: 100px;
            height: 20px;
            margin: 0 auto;
        }
        
        .loader-particles .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #00d4ff;
            border-radius: 50%;
            animation: particleBounce 1.4s ease-in-out infinite;
        }
        
        .loader-particles .particle:nth-child(1) {
            left: 0;
            animation-delay: 0s;
        }
        
        .loader-particles .particle:nth-child(2) {
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 0.2s;
        }
        
        .loader-particles .particle:nth-child(3) {
            right: 0;
            animation-delay: 0.4s;
        }
        
        @keyframes particleBounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes particleExplode {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(0) translateY(-50px);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
  document.head.appendChild(style);
}

function hidePremiumLoading() {
  const loadingOverlay = document.getElementById("premiumLoading");
  if (loadingOverlay) {
    loadingOverlay.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => {
      if (loadingOverlay.parentNode) {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
      }
    }, 300);
  }
}

// Navigation Scroll Effects
function handleScroll() {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// Smooth scrolling for navigation links
function smoothScrollTo(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// Active navigation link highlighting
function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100;

  document.querySelectorAll("section[id]").forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Event listeners for navigation
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    smoothScrollTo(targetId);
  });
});

// Scroll event listeners
window.addEventListener("scroll", () => {
  handleScroll();
  updateActiveNavLink();
});

// Mobile Navigation Toggle
function toggleMobileMenu() {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.classList.toggle("nav-open");
}

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove("nav-open");
  });
});

// Mobile navigation toggle event
navToggle.addEventListener("click", toggleMobileMenu);

// Form Submission Handler
researchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const topic = document.getElementById("topic").value.trim();
  if (!topic) {
    showError("Please enter a research topic");
    return;
  }

  currentResearchTopic = topic;

  // Show premium loading
  showPremiumLoading();

  // Show reports loading state
  showReportsLoading();

  try {
    const response = await fetch(`${API_BASE_URL}/research`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: topic }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      // Don't show results section, just show success message
      showSuccess(
        "Research completed successfully! Reports are now available."
      );
      reportsGenerated = true;
      showReportsReady();

      // Scroll to reports section
      document.querySelector(".reports-section").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      throw new Error(data.detail || "Research failed");
    }
  } catch (error) {
    console.error("Error:", error);
    showError(`Research failed: ${error.message}`);
    showReportsPlaceholder();
  } finally {
    hidePremiumLoading();
  }
});

// Show reports loading state
function showReportsLoading() {
  const reportCards = document.querySelectorAll(".report-card");
  reportCards.forEach((card) => {
    const button = card.querySelector(".report-btn");
    const originalText = button.innerHTML;

    button.innerHTML = `
            <div class="report-loading-spinner"></div>
            <span>Generating...</span>
        `;
    button.disabled = true;
    button.classList.add("loading");
    button.classList.remove("ready", "placeholder");

    // Store original content for restoration
    card.dataset.originalButton = originalText;
  });
}

// Show reports ready state
function showReportsReady() {
  const reportCards = document.querySelectorAll(".report-card");
  reportCards.forEach((card) => {
    const button = card.querySelector(".report-btn");

    button.innerHTML = `
            <i class="fas fa-eye"></i>
            View Report
        `;
    button.disabled = false;
    button.classList.remove("loading", "placeholder");
    button.classList.add("ready");
    button.onclick = function () {
      const reportType = card.dataset.reportType;
      loadReport(reportType);
    };
  });
}

// Show reports placeholder state
function showReportsPlaceholder() {
  const reportCards = document.querySelectorAll(".report-card");
  reportCards.forEach((card) => {
    const button = card.querySelector(".report-btn");
    button.innerHTML = `
            <i class="fas fa-clock"></i>
            Not Available
        `;
    button.disabled = true;
    button.classList.remove("loading", "ready");
    button.classList.add("placeholder");
    button.onclick = null;
  });
}

// Load Report Function
async function loadReport(reportType) {
  if (!reportsGenerated) {
    showError("Please complete research first to generate reports");
    return;
  }

  const reportNames = {
    research_findings: "Research Findings",
    analysis_report: "Analysis Report",
    final_report: "Final Report",
  };

  modalTitle.textContent = `${
    reportNames[reportType] || "Report"
  } - ${currentResearchTopic}`;

  // Show loading in modal
  modalContent.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="modal-loading-spinner"></div>
            <h3 style="color: #00d4ff; margin: 16px 0;">Loading Report...</h3>
            <p style="color: #a1a1aa;">Please wait while we fetch your report.</p>
        </div>
    `;

  openModal();

  try {
    const response = await fetch(`${API_BASE_URL}/report/${reportType}`);

    if (!response.ok) {
      if (response.status === 404) {
        modalContent.innerHTML = `
                    <div style="text-align: center; padding: 40px;">
                        <div style="font-size: 4rem; margin-bottom: 16px; color: #00d4ff;">📄</div>
                        <h3 style="color: #ffffff; margin-bottom: 8px;">Report Not Available</h3>
                        <p style="color: #a1a1aa; margin-bottom: 24px;">This report hasn't been generated yet. Please run a research task first.</p>
                        <button onclick="closeModal()" style="background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                            Close
                        </button>
                    </div>
                `;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } else {
      const data = await response.json();

      // Format the report content nicely
      const formattedContent = formatReportContent(data.content, reportType);

      modalContent.innerHTML = `
                <div class="report-content">
                    <div class="report-header">
                        <div class="report-meta">
                            <span class="report-topic">${currentResearchTopic}</span>
                            <span class="report-date">${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div class="report-body">
                        ${formattedContent}
                    </div>
                </div>
            `;
    }
  } catch (error) {
    console.error("Error loading report:", error);
    modalContent.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 4rem; margin-bottom: 16px; color: #ef4444;">⚠️</div>
                <h3 style="color: #ef4444; margin-bottom: 8px;">Error Loading Report</h3>
                <p style="color: #a1a1aa; margin-bottom: 24px;">Failed to load the report: ${error.message}</p>
                <button onclick="closeModal()" style="background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                    Close
                </button>
            </div>
        `;
  }
}

// Format report content
function formatReportContent(content, reportType) {
  if (typeof content === "object") {
    // Handle object content
    if (content.summary) {
      return `
                <div class="report-section">
                    <h3>Executive Summary</h3>
                    <p>${content.summary}</p>
                </div>
                ${
                  content.keyFindings
                    ? `
                <div class="report-section">
                    <h3>Key Findings</h3>
                    <ul>
                        ${content.keyFindings
                          .map((finding) => `<li>${finding}</li>`)
                          .join("")}
                    </ul>
                </div>
                `
                    : ""
                }
                ${
                  content.recommendations
                    ? `
                <div class="report-section">
                    <h3>Recommendations</h3>
                    <ul>
                        ${content.recommendations
                          .map((rec) => `<li>${rec}</li>`)
                          .join("")}
                    </ul>
                </div>
                `
                    : ""
                }
            `;
    } else {
      return `<pre>${JSON.stringify(content, null, 2)}</pre>`;
    }
  } else {
    // Handle string content
    return `<pre class="formatted-content">${content}</pre>`;
  }
}

// Modal Functions
function openModal() {
  reportModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  reportModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
reportModal.addEventListener("click", (e) => {
  if (e.target === reportModal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && reportModal.style.display === "block") {
    closeModal();
  }
});

// Utility Functions
function setLoadingState(isLoading) {
  if (isLoading) {
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
  }
}

function showSuccess(message) {
  // Create success notification
  const notification = document.createElement("div");
  notification.className = "success-notification";
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        z-index: 1001;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(16, 185, 129, 0.3);
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function showError(message) {
  // Remove any existing error messages
  const existingError = document.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Create error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;

  // Insert after the form
  researchForm.parentNode.insertBefore(errorDiv, researchForm.nextSibling);

  // Remove error message after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 5000);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Input validation and enhancement
const topicInput = document.getElementById("topic");
topicInput.addEventListener("input", () => {
  // Remove error message when user starts typing
  const existingError = document.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
});

// Add some example topics for inspiration
const exampleTopics = [
  "Artificial Intelligence in Healthcare",
  "Climate Change Solutions",
  "Blockchain Technology Applications",
  "Quantum Computing Developments",
  "Space Exploration Technologies",
  "Renewable Energy Innovations",
  "Cybersecurity Trends",
  "Machine Learning in Finance",
];

// Add placeholder rotation
let placeholderIndex = 0;
setInterval(() => {
  if (!topicInput.matches(":focus")) {
    topicInput.placeholder = `e.g., ${exampleTopics[placeholderIndex]}`;
    placeholderIndex = (placeholderIndex + 1) % exampleTopics.length;
  }
}, 3000);

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + Enter to submit form
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    if (document.activeElement === topicInput) {
      researchForm.dispatchEvent(new Event("submit"));
    }
  }
});

// Add focus management for accessibility
topicInput.addEventListener("focus", () => {
  topicInput.parentElement.style.transform = "scale(1.02)";
});

topicInput.addEventListener("blur", () => {
  topicInput.parentElement.style.transform = "scale(1)";
});

// Add ripple effects to buttons
document.addEventListener("click", (e) => {
  if (e.target.matches(".cta-button, .submit-btn, .report-btn")) {
    addRippleEffect(e.target, e);
    createParticleEffect(e.clientX, e.clientY);
  }
});

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Add some subtle animations on page load
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Focus on the input field for better UX
  setTimeout(() => {
    topicInput.focus();
  }, 500);

  // Initialize scroll effects
  handleScroll();
  updateActiveNavLink();

  // Show initial reports placeholder
  showReportsPlaceholder();

  // Add premium entrance animations
  addEntranceAnimations();
});

// Premium entrance animations
function addEntranceAnimations() {
    const elements = document.querySelectorAll(
        ".report-card, .about-stat, .tech-item"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }, index * 100);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    elements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(el);
    });
}

// Add connection status indicator
function checkConnectionStatus() {
  fetch(`${API_BASE_URL}/docs`, { method: "HEAD" })
    .then(() => {
      // Server is reachable
      document.body.classList.remove("server-offline");
    })
    .catch(() => {
      // Server is not reachable
      document.body.classList.add("server-offline");
    });
}

// Check connection status every 30 seconds
setInterval(checkConnectionStatus, 30000);
checkConnectionStatus(); // Initial check

// Add ripple effects to buttons
document.addEventListener("click", (e) => {
  if (e.target.matches(".cta-button, .submit-btn, .report-btn")) {
    addRippleEffect(e.target, e);
    createParticleEffect(e.clientX, e.clientY);
  }
});

// Add offline indicator styles
const style = document.createElement("style");
style.textContent = `
    .premium-loader {
        text-align: center;
        color: white;
    }
    
    .loader-ring {
        width: 80px;
        height: 80px;
        border: 4px solid rgba(0, 212, 255, 0.3);
        border-top: 4px solid #00d4ff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
    }
    
    .loader-text {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 20px;
        background: linear-gradient(135deg, #00d4ff, #7c3aed);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .loader-particles {
        position: relative;
        width: 100px;
        height: 20px;
        margin: 0 auto;
    }
    
    .loader-particles .particle {
        position: absolute;
        width: 6px;
        height: 6px;
        background: #00d4ff;
        border-radius: 50%;
        animation: particleBounce 1.4s ease-in-out infinite;
    }
    
    .loader-particles .particle:nth-child(1) {
        left: 0;
        animation-delay: 0s;
    }
    
    .loader-particles .particle:nth-child(2) {
        left: 50%;
        transform: translateX(-50%);
        animation-delay: 0.2s;
    }
    
    .loader-particles .particle:nth-child(3) {
        right: 0;
        animation-delay: 0.4s;
    }
    
    @keyframes particleBounce {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-20px); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes particleExplode {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-50px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .server-offline::before {
        content: '⚠️ Server Offline';
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        background: #ef4444;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        z-index: 1002;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        backdrop-filter: blur(10px);
    }
    
    .report-loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        display: inline-block;
        margin-right: 8px;
    }
    
    .modal-loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 212, 255, 0.1);
        border-top: 4px solid #00d4ff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
    }
    
    .report-btn.loading {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .report-btn.ready {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }
    
    .report-btn.placeholder {
        background: #71717a;
        cursor: not-allowed;
    }
    
    .report-content {
        max-width: 100%;
    }
    
    .report-header {
        background: rgba(30, 30, 30, 0.8);
        backdrop-filter: blur(10px);
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 24px;
        border-left: 4px solid #00d4ff;
    }
    
    .report-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .report-topic {
        font-weight: 600;
        color: #ffffff;
        font-size: 1.1rem;
    }
    
    .report-date {
        color: #a1a1aa;
        font-size: 0.9rem;
    }
    
    .report-body {
        line-height: 1.7;
    }
    
    .report-section {
        margin-bottom: 24px;
    }
    
    .report-section h3 {
        color: #ffffff;
        margin-bottom: 12px;
        font-size: 1.3rem;
        font-weight: 600;
    }
    
    .report-section p {
        color: #ffffff;
        margin-bottom: 12px;
    }
    
    .report-section ul {
        color: #ffffff;
        padding-left: 20px;
    }
    
    .report-section li {
        margin-bottom: 8px;
    }
    
    .formatted-content {
        background: rgba(30, 30, 30, 0.8);
        backdrop-filter: blur(10px);
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid #00d4ff;
        font-family: inherit;
        line-height: 1.7;
        white-space: pre-wrap;
        color: #ffffff;
    }
`;
document.head.appendChild(style);
