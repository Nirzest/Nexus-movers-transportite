/**
 * Luxury Logistics - Core Application Script
 * Orchestrates SPA routing, animations, counters, trackers, calculator, and interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Toast Notifications Utility
  const toastContainer = document.getElementById("toast-container");
  
  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "💡";
    if (type === "success") icon = "✓";
    if (type === "error") icon = "✕";
    
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-msg">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remove toast
    setTimeout(() => {
      toast.style.animation = "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards";
      toast.addEventListener("animationend", () => {
        toast.remove();
      });
    }, 4000);
  }

  let currentSession = null;
  let loadAdminUsersList = null;

  // --- SPA ROUTER ---
  const routes = {
    "/": {
      viewId: "view-home",
      title: "Luxury Logistics | Elite Transport & Relocations",
      desc: "Experience premier moving and transport services. Premium white-glove packing, climate control, and global logistics."
    },
    "/about": {
      viewId: "view-about",
      title: "About Us | Luxury Logistics Heritage",
      desc: "Our story, elite leadership, certifications, and history of logistics excellence."
    },
    "/services": {
      viewId: "view-services",
      title: "Premier Relocation Services | Luxury Logistics",
      desc: "White-glove residential moving, anti-static corporate relocation, secure vehicle transport, and warehousing."
    },
    "/fleet": {
      viewId: "view-fleet",
      title: "Interactive Fleet Showcase | Luxury Logistics",
      desc: "Explore our elite transport fleet, from electric sprinters to hydrogen-fuel heavy-haul vehicles."
    },
    "/pricing": {
      viewId: "view-pricing",
      title: "Instant Moving Estimates & Packages | Luxury Logistics",
      desc: "Calculate your relocation costs instantly with our dynamic calculator and explore pricing packages."
    },
    "/tracking": {
      viewId: "view-tracking",
      title: "Real-time Shipment Telemetry Dashboard | Luxury Logistics",
      desc: "Monitor your cargo coordinates, cabin temperature, humidity, and delivery history live."
    },
    "/gallery": {
      viewId: "view-gallery",
      title: "Completed Projects Gallery | Luxury Logistics",
      desc: "Explore a masonry portfolio of our finished corporate, residential, and industrial relocations."
    },
    "/testimonials": {
      viewId: "view-testimonials",
      title: "Client Testimonials & Feedback | Luxury Logistics",
      desc: "What curators, operation vice-presidents, and elite estate owners say about our moving services."
    },
    "/blog": {
      viewId: "view-blog",
      title: "Logistics Insights & Innovation Blog | Luxury Logistics",
      desc: "Stay informed on supply chain developments, green shipping fleets, and white-glove packing systems."
    },
    "/careers": {
      viewId: "view-careers",
      title: "Careers & Open Positions | Luxury Logistics",
      desc: "Join our elite operations. Explore high-paying positions in dispatching, crafting, and transport operations."
    },
    "/contact": {
      viewId: "view-contact",
      title: "Contact Our Global Offices | Luxury Logistics",
      desc: "Inquire about customized relocations. Interactive forms, direct WhatsApp connects, and location coordinates."
    },
    "/signin": {
      viewId: "view-signin",
      title: "Sign In | Luxury Logistics Gateway",
      desc: "Access your elite logistics tracking dashboard and manage quotes."
    },
    "/signup": {
      viewId: "view-signup",
      title: "Register Account | Luxury Logistics Operations",
      desc: "Register to unlock high-tech telemetry tracking and pricing estimates."
    },
    "/admin": {
      viewId: "view-admin",
      title: "Admin Dashboard | NexusMove Operations",
      desc: "System operations control panel to manage registered executive profiles."
    }
  };

  const navLinks = document.querySelectorAll(".nav-link");
  const views = document.querySelectorAll(".page-view");
  const mobileMenu = document.querySelector(".nav-menu");
  const mobileToggle = document.querySelector(".mobile-toggle");

  function handleRoute() {
    let rawHash = window.location.hash || "#/";
    // Clean trailing slashes or parameters if any
    let hash = rawHash.replace(/^#/, "");
    if (!hash.startsWith("/")) {
      hash = "/" + hash;
    }
    
    // Match route
    const route = routes[hash] || routes["/"];

    // Admin clearance check
    if (hash === "/admin") {
      const isAdmin = currentSession?.user?.email === 'admin@nexusmove.com';
      if (!isAdmin) {
        showToast("Access Denied: Administrator clearance required.", "error");
        window.location.hash = "#/";
        return;
      }
    }
    
    // Update active navbar links
    navLinks.forEach(link => {
      const linkHash = link.getAttribute("href").replace(/^#/, "");
      if (linkHash === hash || (hash === "/" && linkHash === "")) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Close mobile menu on route change
    if (mobileMenu.classList.contains("open")) {
      mobileMenu.classList.remove("open");
      mobileToggle.classList.remove("open");
    }

    // Toggle View classes with animations
    views.forEach(view => {
      if (view.id === route.viewId) {
        view.style.display = "block";
        // Force reflow
        view.offsetHeight;
        view.classList.add("active-view");
        
        // Trigger reveals for elements inside the active view
        view.querySelectorAll(".reveal").forEach(el => {
          el.classList.add("active");
        });
      } else {
        view.classList.remove("active-view");
        view.style.display = "none";
      }
    });

    // Update document Meta/Title
    document.title = route.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", route.desc);
    }

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: "instant" });

    // Custom view trigger setups (if routing directly to tracker with ID)
    if (hash === "/tracking") {
      const params = new URLSearchParams(window.location.hash.split("?")[1]);
      const id = params.get("id");
      if (id) {
        document.getElementById("tracker-input-field").value = id;
        performTrackingSearch(id);
      }
    }
    if (hash === "/admin") {
      if (loadAdminUsersList) loadAdminUsersList();
    }
  }

  // Mobile navigation trigger
  mobileToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    mobileToggle.classList.toggle("open");
  });

  window.addEventListener("hashchange", handleRoute);
  // Initial route resolve
  handleRoute();

  // Sticky header transition on scroll
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- STATS COUNT-UP ANIMATION ---
  const statsSection = document.querySelector(".stats-section");
  let statsTriggered = false;

  function countUp(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target.toLocaleString() + (element.dataset.suffix || "");
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start).toLocaleString() + (element.dataset.suffix || "");
      }
    }, 16);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsTriggered) {
        statsTriggered = true;
        document.querySelectorAll(".stat-num").forEach(numEl => {
          const target = parseInt(numEl.dataset.target, 10);
          countUp(numEl, target);
        });
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) {
    observer.observe(statsSection);
  }

  // --- COMPONENT INJECTIONS ---
  const data = window.LuxuryLogisticsData;

  // 1. Inject Services on Home & Services View
  function injectServices() {
    const servicesGrids = document.querySelectorAll(".services-container-grid");
    servicesGrids.forEach(grid => {
      grid.innerHTML = data.services.map(srv => `
        <div class="glass-card service-card reveal">
          <div class="service-icon">
            ${srv.icon}
          </div>
          <h3>${srv.title}</h3>
          <p>${srv.shortDesc}</p>
          <ul class="service-features-list">
            ${srv.features.map(f => `<li>${f}</li>`).join("")}
          </ul>
          <button class="service-btn" data-srv-id="${srv.id}">
            Learn More 
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      `).join("");
    });
  }
  injectServices();

  // Service details click
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".service-btn");
    if (btn) {
      const srvId = btn.dataset.srvId;
      const srv = data.services.find(s => s.id === srvId);
      if (srv) {
        // Go to contact view directly with custom service selected, or pricing
        window.location.hash = `#/pricing?service=${srvId}`;
        showToast(`Redirecting to details calculator for ${srv.title}`, "info");
      }
    }
  });

  // 2. Process Timeline Interactions
  const timelineSteps = document.querySelectorAll(".timeline-step");
  const detailsTitle = document.getElementById("process-details-title");
  const detailsText = document.getElementById("process-details-text");
  const detailsImg = document.getElementById("process-details-img");

  const timelineData = {
    1: {
      title: "Request a Custom Quote",
      text: "Submit details about your relocation size, origin, and destination coordinates. Our pricing calculator will provide a transparent initial estimate, which is reviewed by our logistics coordinator within 10 minutes.",
      img: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=400"
    },
    2: {
      title: "Pre-Move Digital Survey",
      text: "We conduct a digital or physical walkthrough of your residence or office. We assess heavy loads, fragile artifacts, and building elevator/door tolerances to engineer custom wooden packaging.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400"
    },
    3: {
      title: "White-Glove Packing",
      text: "Our certified specialist craters build secure timber cases. We package each item with double-walled climate wrap and shock sensors to guarantee dampening from physical transit motions.",
      img: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=400"
    },
    4: {
      title: "Advanced Logistics Transit",
      text: "Cargo is loaded onto our air-suspension EV or biofuel vehicles. We lock telemetry sensors to monitor inside temperatures and secure real-time GPS locations linked directly to your dashboard.",
      img: "https://images.unsplash.com/photo-1516576880669-dfcbfd2f620e?auto=format&fit=crop&q=80&w=400"
    },
    5: {
      title: "Secure Assembly & Placement",
      text: "At your new location, we unpack, assemble, and position items according to your layout directives. Zero cleanup is left behind; our team recycles all packing shells.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400"
    },
    6: {
      title: "Customer Quality Sign-Off",
      text: "A final walkthrough confirms everything is placed perfectly and intact. Your transit security deposit is released, and your feedback score is updated to complete the operation.",
      img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400"
    }
  };

  timelineSteps.forEach(step => {
    step.addEventListener("click", () => {
      timelineSteps.forEach(s => s.classList.remove("active"));
      step.classList.add("active");
      
      const stepNum = step.dataset.step;
      const stepInfo = timelineData[stepNum];
      
      if (stepInfo) {
        // Fade details container slightly during swap
        const parentBox = document.querySelector(".step-details-box");
        parentBox.style.opacity = 0.5;
        parentBox.style.transition = "opacity 0.2s ease";
        
        setTimeout(() => {
          detailsTitle.textContent = stepInfo.title;
          detailsText.textContent = stepInfo.text;
          detailsImg.src = stepInfo.img;
          parentBox.style.opacity = 1;
        }, 200);
      }
    });
  });

  // 3. Inject and Filter Fleet
  function injectFleet(filter = "All") {
    const fleetGrid = document.getElementById("fleet-container-grid");
    if (!fleetGrid) return;
    
    const filteredFleet = filter === "All" ? data.fleet : data.fleet.filter(f => f.type === filter);
    
    fleetGrid.innerHTML = filteredFleet.map(vehicle => `
      <div class="glass-card fleet-card reveal">
        <div class="fleet-img-wrapper">
          <img src="${vehicle.image}" alt="${vehicle.name}" onerror="this.src='https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400&h=200'">
        </div>
        <div class="fleet-info">
          <div class="fleet-card-header">
            <h3>${vehicle.name}</h3>
            <span class="badge badge-royal">${vehicle.type}</span>
          </div>
          <p class="fleet-desc">${vehicle.desc}</p>
          <div class="fleet-specs">
            <div class="spec-item">
              <span class="spec-label">Payload Capacity</span>
              <span class="spec-value">${vehicle.capacity}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Volume Storage</span>
              <span class="spec-value">${vehicle.volume}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Engine Propulsion</span>
              <span class="spec-value">${vehicle.engine}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Max Road Speed</span>
              <span class="spec-value">${vehicle.speed}</span>
            </div>
          </div>
        </div>
      </div>
    `).join("");
    
    // Trigger reveals again
    initScrollReveal();
  }
  injectFleet();

  // Fleet Filter Tabs Click
  const fleetFilterBtns = document.querySelectorAll(".fleet-filter-btn");
  fleetFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      fleetFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      injectFleet(btn.dataset.filter);
    });
  });

  // 4. Inject Industries Grid
  const indGrid = document.getElementById("industries-container-grid");
  if (indGrid) {
    indGrid.innerHTML = data.industries.map(ind => `
      <div class="glass-card industry-card reveal">
        <div class="industry-icon">${ind.icon}</div>
        <h3>${ind.name}</h3>
        <p>${ind.desc}</p>
      </div>
    `).join("");
  }

  // 5. Inject Blog Grid
  const blogGrid = document.getElementById("blog-container-grid");
  if (blogGrid) {
    blogGrid.innerHTML = data.blogs.map(blog => `
      <div class="glass-card blog-card reveal">
        <div class="blog-img-wrapper">
          <img src="${blog.image}" alt="${blog.title}">
        </div>
        <div class="blog-card-content">
          <div class="blog-meta-row">
            <span class="badge badge-orange">${blog.category}</span>
            <span>${blog.date}</span>
            <span>•</span>
            <span>${blog.readTime}</span>
          </div>
          <h3>${blog.title}</h3>
          <p>${blog.excerpt}</p>
          <a href="#/blog" class="blog-readmore">
            Read Full Article
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    `).join("");
  }

  // 6. Inject FAQS accordion
  const faqGrid = document.getElementById("faq-container-grid");
  if (faqGrid) {
    faqGrid.innerHTML = data.faqs.map(faq => `
      <div class="faq-item">
        <button class="faq-question-btn">
          <span class="faq-question-text">${faq.question}</span>
          <span class="faq-chevron">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
          </span>
        </button>
        <div class="faq-answer-panel">
          <div class="faq-answer-content">
            <p>${faq.answer}</p>
          </div>
        </div>
      </div>
    `).join("");

    // Accordion click handlers
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
      const btn = item.querySelector(".faq-question-btn");
      const panel = item.querySelector(".faq-answer-panel");
      
      btn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        
        // Close other panels
        faqItems.forEach(otherItem => {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer-panel").style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add("active");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  // 7. Inject Careers Page Jobs Grid
  const careersGrid = document.getElementById("careers-jobs-grid");
  if (careersGrid) {
    careersGrid.innerHTML = data.jobs.map(job => `
      <div class="glass-card job-card reveal">
        <div class="job-info-col">
          <div class="job-meta-pills">
            <span class="badge badge-orange">${job.department}</span>
            <span class="badge badge-royal">${job.type}</span>
            <span class="badge badge-green">${job.location}</span>
          </div>
          <h3>${job.title}</h3>
          <p class="job-desc-text">${job.description}</p>
          <div class="job-requirements mt-4">
            <strong class="text-xs text-white uppercase tracking-wider block mb-2">Requirements:</strong>
            <ul class="service-features-list" style="margin-bottom: 0;">
              ${job.requirements.map(req => `<li>${req}</li>`).join("")}
            </ul>
          </div>
        </div>
        <button class="btn btn-primary job-apply-btn" data-job-title="${job.title}">
          Apply Instantly
        </button>
      </div>
    `).join("");

    // Apply Button Triggers Form Focus
    document.querySelectorAll(".job-apply-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const jobTitle = btn.dataset.jobTitle;
        const formTitleField = document.getElementById("careers-selected-job");
        if (formTitleField) {
          formTitleField.value = jobTitle;
        }
        document.getElementById("careers-form-section").scrollIntoView({ behavior: "smooth" });
        showToast(`Selected position: ${jobTitle}`, "info");
      });
    });
  }

  // --- TESTIMONIAL SLIDER IMPLEMENTATION ---
  const testimonialTrack = document.getElementById("testimonial-slider-track");
  const testimonialDots = document.getElementById("testimonial-slider-dots");
  
  if (testimonialTrack) {
    // Populate slides
    testimonialTrack.innerHTML = data.testimonials.map(t => `
      <div class="testimonial-slide">
        <div class="testimonial-content">
          <div class="testimonial-stars">
            ${"★".repeat(t.rating)}
          </div>
          <blockquote class="testimonial-quote">
            "${t.feedback}"
          </blockquote>
          <div class="testimonial-profile">
            <img class="testimonial-avatar" src="${t.image}" alt="${t.name}">
            <div class="testimonial-meta">
              <h4 class="testimonial-name">${t.name}</h4>
              <p class="testimonial-role">${t.role}, ${t.company}</p>
            </div>
          </div>
        </div>
      </div>
    `).join("");

    // Populate dots
    testimonialDots.innerHTML = data.testimonials.map((_, idx) => `
      <div class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
    `).join("");

    let currentSlide = 0;
    const slidesCount = data.testimonials.length;

    function goToSlide(index) {
      if (index < 0) index = slidesCount - 1;
      if (index >= slidesCount) index = 0;
      currentSlide = index;
      
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update dots
      document.querySelectorAll(".carousel-dot").forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    document.getElementById("testimonial-arrow-left").addEventListener("click", () => goToSlide(currentSlide - 1));
    document.getElementById("testimonial-arrow-right").addEventListener("click", () => goToSlide(currentSlide + 1));
    
    // Dot click triggers
    document.querySelectorAll(".carousel-dot").forEach(dot => {
      dot.addEventListener("click", () => {
        goToSlide(parseInt(dot.dataset.index, 10));
      });
    });

    // Auto rotate every 8 seconds
    setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 8000);
  }

  // --- DYNAMIC PRICING CALCULATOR ---
  const calcMoveType = document.getElementById("calc-move-type");
  const calcDistance = document.getElementById("calc-distance");
  const calcDistanceVal = document.getElementById("calc-distance-value");
  const calcSize = document.getElementById("calc-size");
  const calcSizeVal = document.getElementById("calc-size-value");
  const calcSizeLabel = document.getElementById("calc-size-label");

  const calcPack = document.getElementById("calc-pack");
  const calcInsure = document.getElementById("calc-insure");
  const calcStore = document.getElementById("calc-store");
  const calcExpress = document.getElementById("calc-express");

  const calcEstimateDisplay = document.getElementById("calc-estimate");
  const breakdownType = document.getElementById("breakdown-type");
  const breakdownDistance = document.getElementById("breakdown-distance");
  const breakdownVolume = document.getElementById("breakdown-volume");
  const breakdownAddons = document.getElementById("breakdown-addons");

  function runCalculator() {
    if (!calcMoveType) return;

    const moveType = calcMoveType.value;
    const distance = parseInt(calcDistance.value, 10);
    const sizeVal = parseInt(calcSize.value, 10);

    // Update label values
    calcDistanceVal.textContent = `${distance} km`;

    // Dynamic Label text depending on corporate vs residential
    let baseRate = 250;
    let ratePerKm = 2.5;
    let multiplier = 1.0;
    let sizeUnit = "BHK";

    if (moveType === "residential") {
      baseRate = 200;
      ratePerKm = 2.0;
      multiplier = 1.0;
      sizeUnit = "BHK";
      calcSizeLabel.textContent = "Residence Size";
      calcSizeVal.textContent = `${sizeVal} ${sizeUnit}`;
    } else if (moveType === "corporate") {
      baseRate = 500;
      ratePerKm = 3.5;
      multiplier = 1.35;
      sizeUnit = "Desk Setup";
      calcSizeLabel.textContent = "Office Size";
      calcSizeVal.textContent = `${sizeVal * 10} ${sizeUnit}s`;
    } else if (moveType === "international") {
      baseRate = 2500;
      ratePerKm = 12.0;
      multiplier = 2.5;
      sizeUnit = "Container Slot";
      calcSizeLabel.textContent = "Cargo Size";
      calcSizeVal.textContent = `${sizeVal} ${sizeUnit}(s)`;
    } else {
      // Auto Transport
      baseRate = 600;
      ratePerKm = 4.0;
      multiplier = 1.6;
      sizeUnit = "Vehicle";
      calcSizeLabel.textContent = "Automobile Count";
      calcSizeVal.textContent = `${sizeVal} ${sizeUnit}(s)`;
    }

    // Calculations
    const transportBase = baseRate * multiplier;
    const distanceCost = distance * ratePerKm * multiplier;
    
    // Volume size calculation
    let sizeFactor = 100;
    if (moveType === "corporate") sizeFactor = 45; // per 10 desks
    if (moveType === "international") sizeFactor = 400;
    if (moveType === "auto") sizeFactor = 250;
    const volumeCost = sizeVal * sizeFactor * multiplier;

    // Addons calculation
    let addonsCost = 0;
    let addonsList = [];
    if (calcPack.checked) {
      const pCost = (50 + sizeVal * 40) * multiplier;
      addonsCost += pCost;
      addonsList.push(`Packing: $${pCost.toFixed(0)}`);
    }
    if (calcInsure.checked) {
      const iCost = (transportBase + distanceCost + volumeCost) * 0.025; // 2.5% of asset base
      addonsCost += iCost;
      addonsList.push(`Insurance: $${iCost.toFixed(0)}`);
    }
    if (calcStore.checked) {
      const sCost = 150 * multiplier;
      addonsCost += sCost;
      addonsList.push(`Storage: $${sCost.toFixed(0)}`);
    }
    if (calcExpress.checked) {
      const eCost = (transportBase + distanceCost) * 0.3; // 30% speed loading markup
      addonsCost += eCost;
      addonsList.push(`Express: $${eCost.toFixed(0)}`);
    }

    const totalEstimate = transportBase + distanceCost + volumeCost + addonsCost;

    // Update Breakdown
    breakdownType.textContent = `$${transportBase.toFixed(0)}`;
    breakdownDistance.textContent = `$${distanceCost.toFixed(0)} (${distance} km)`;
    breakdownVolume.textContent = `$${volumeCost.toFixed(0)}`;
    breakdownAddons.textContent = addonsList.length > 0 ? addonsList.join(", ") : "None";

    // Animated count up for total estimate
    const oldPrice = parseFloat(calcEstimateDisplay.dataset.lastPrice || "0");
    calcEstimateDisplay.dataset.lastPrice = totalEstimate;
    
    animateNumberUpdate(calcEstimateDisplay, oldPrice, totalEstimate, "$");
  }

  function animateNumberUpdate(element, start, end, prefix = "", suffix = "") {
    const range = end - start;
    let current = start;
    const increment = range / 12; // 12 steps
    let steps = 0;

    const timer = setInterval(() => {
      current += increment;
      steps++;
      if (steps >= 12) {
        element.textContent = `${prefix}${Math.round(end).toLocaleString()}${suffix}`;
        clearInterval(timer);
      } else {
        element.textContent = `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
      }
    }, 25);
  }

  // Attach event listeners to calculator inputs
  if (calcMoveType) {
    [calcMoveType, calcDistance, calcSize, calcPack, calcInsure, calcStore, calcExpress].forEach(el => {
      el.addEventListener("input", runCalculator);
      el.addEventListener("change", runCalculator);
    });
    // Run initially
    runCalculator();
  }

  // Check URL parameters for pre-selected service in calculator
  const checkServiceParam = () => {
    const hashPart = window.location.hash.split("?");
    if (hashPart.length > 1) {
      const params = new URLSearchParams(hashPart[1]);
      const serviceId = params.get("service");
      if (serviceId && calcMoveType) {
        if (serviceId.includes("home")) calcMoveType.value = "residential";
        else if (serviceId.includes("office") || serviceId.includes("commercial")) calcMoveType.value = "corporate";
        else if (serviceId.includes("international") || serviceId.includes("global")) calcMoveType.value = "international";
        else if (serviceId.includes("vehicle") || serviceId.includes("auto")) calcMoveType.value = "auto";
        runCalculator();
      }
    }
  };
  window.addEventListener("hashchange", checkServiceParam);
  checkServiceParam();


  // --- REAL-TIME SHIPMENT TRACKER TELEMETRY ---
  const trackerForm = document.getElementById("shipment-tracker-form");
  const trackerInput = document.getElementById("tracker-input-field");
  const resultBox = document.getElementById("tracking-result-box");
  const mapGlowDot = document.getElementById("tracker-map-dot");

  function performTrackingSearch(id) {
    const idClean = id.trim().toUpperCase();
    const shipment = data.simulatedShipments[idClean];

    if (shipment) {
      // Toggle result layout
      resultBox.style.display = "block";
      
      // Update basic fields
      document.getElementById("track-id-disp").textContent = shipment.id;
      document.getElementById("track-status-disp").className = `badge ${shipment.status === 'Delivered' ? 'badge-green' : 'badge-orange'}`;
      document.getElementById("track-status-disp").textContent = shipment.status;
      document.getElementById("track-sender").textContent = shipment.sender;
      document.getElementById("track-recipient").textContent = shipment.recipient;
      document.getElementById("track-origin").textContent = shipment.origin;
      document.getElementById("track-dest").textContent = shipment.destination;
      document.getElementById("track-loc").textContent = shipment.currentLocation;
      document.getElementById("track-temp").textContent = shipment.temp;
      document.getElementById("track-humidity").textContent = shipment.humidity;
      document.getElementById("track-eta").textContent = shipment.eta;
      document.getElementById("track-updated").textContent = shipment.lastUpdated;

      // Update progress bar
      const fillBar = document.getElementById("tracker-fill-bar");
      fillBar.style.width = "0%";
      setTimeout(() => {
        fillBar.style.width = `${shipment.statusPercent}%`;
      }, 100);

      // Update Nodes status
      const nodes = document.querySelectorAll(".node-dot");
      nodes.forEach(node => {
        const stepNum = parseInt(node.dataset.step, 10);
        node.className = "node-dot"; // reset
        
        if (shipment.statusPercent >= 100) {
          node.classList.add("active-node");
        } else if (shipment.statusPercent >= stepNum * 25) {
          node.classList.add("passed-node");
        } else if (shipment.statusPercent >= (stepNum - 1) * 25) {
          node.classList.add("active-node");
        }
      });

      // Update History steps
      const historyList = document.getElementById("track-history-list");
      historyList.innerHTML = shipment.history.map((hist, index) => `
        <div class="history-item ${index === shipment.history.length - 1 ? 'recent' : ''}">
          <div class="history-time">${hist.time}</div>
          <div class="history-event">${hist.event}</div>
        </div>
      `).reverse().join(""); // Latest event on top

      // Position glowing map dot dynamically
      if (mapGlowDot) {
        mapGlowDot.style.display = "block";
        mapGlowDot.style.left = `${shipment.coordinates.x}px`;
        mapGlowDot.style.top = `${shipment.coordinates.y}px`;
      }

      showToast(`Telemetry online. Tracking loaded for ${shipment.id}`, "success");
      
      // Scroll smoothly down to tracking results
      setTimeout(() => {
        resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 300);
    } else {
      resultBox.style.display = "none";
      if (mapGlowDot) mapGlowDot.style.display = "none";
      showToast("Invalid Shipment ID. Please try 'NEXUS-7789' or 'AERO-4412'", "error");
    }
  }

  if (trackerForm) {
    trackerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      performTrackingSearch(trackerInput.value);
    });
  }

  // --- CONTACT AND APPLICATION FORM SUBMISSIONS ---
  const contactForm = document.getElementById("contact-message-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = "Transmitting Message...";
      
      setTimeout(() => {
        showToast("Message transmitted successfully. A logistics partner will contact you shortly.", "success");
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }

  const jobApplyForm = document.getElementById("job-apply-form");
  if (jobApplyForm) {
    jobApplyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = jobApplyForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = "Uploading Dossier...";
      
      setTimeout(() => {
        showToast("Application submitted successfully. Our HR division is analyzing your dossier.", "success");
        jobApplyForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 2000);
    });
  }

  const newsletterForms = document.querySelectorAll(".newsletter-form");
  newsletterForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      if (input.value) {
        showToast(`Subscribed! Weekly corporate insights will be dispatched to ${input.value}.`, "success");
        form.reset();
      }
    });
  });

  // --- SCROLL REVEAL TRIGGERS ---
  function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    
    function revealElements() {
      reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 80; // trigger early
        
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add("active");
        }
      });
    }

    window.addEventListener("scroll", revealElements);
    // Initial run
    revealElements();
  }
  
  // Expose for grid inject runs
  window.initScrollReveal = initScrollReveal;
  initScrollReveal();

  // --- FADE OUT PRELOADER ---
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.style.opacity = 0;
        setTimeout(() => {
          preloader.remove();
          // Trigger first view elements animation manually
          document.querySelectorAll(".page-view.active-view .reveal").forEach(el => {
            el.classList.add("active");
          });
        }, 600);
      }, 1000); // give it a brief premium load feel
    });
  }

  // --- SUPABASE AUTHENTICATION SYSTEM ---
  const supabaseUrl = 'https://cizanbakqpayextsxiyu.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpemFuYmFrcXBheWV4dHN4aXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5OTM0ODIsImV4cCI6MjA5ODU2OTQ4Mn0.Nxjmz3GfMf7OcDUlZvIzMIsKBhZd1HtPcu7_cd6OxsM';
  
  // Initialize Supabase Client
  let supabaseClient = null;
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
  } else {
    console.error("Supabase SDK CDN not loaded successfully.");
  }

  function updateAuthUI(session) {
    currentSession = session;
    const user = session?.user;
    
    const headerSigninBtn = document.getElementById("header-signin-btn");
    const headerProfile = document.getElementById("header-profile");
    const headerUserEmail = document.getElementById("header-user-email");
    
    const mobileSigninItem = document.getElementById("mobile-signin-item");
    const mobileProfileItem = document.getElementById("mobile-profile-item");
    const mobileUserEmail = document.getElementById("mobile-user-email");
    const mobileLogoutItem = document.getElementById("mobile-logout-item");
    
    const profileDropdownMenu = document.getElementById("profile-dropdown-menu");
    const profileToggleBtn = document.getElementById("profile-toggle-btn");
    
    const headerAdminBtn = document.getElementById("header-admin-btn");
    const mobileAdminItem = document.getElementById("mobile-admin-item");
    
    if (user) {
      // User is authenticated
      if (headerSigninBtn) headerSigninBtn.style.display = "none";
      if (headerProfile) headerProfile.style.display = "flex";
      if (headerUserEmail) headerUserEmail.textContent = user.email;
      
      const displayName = user.user_metadata?.full_name || user.email.split('@')[0];
      const headerUserDisplayName = document.getElementById("header-user-display-name");
      if (headerUserDisplayName) headerUserDisplayName.textContent = displayName;
      
      const isAdmin = user.email === 'admin@nexusmove.com';
      if (isAdmin) {
        if (headerAdminBtn) headerAdminBtn.style.display = "inline-flex";
        if (mobileAdminItem) mobileAdminItem.style.display = "block";
      } else {
        if (headerAdminBtn) headerAdminBtn.style.display = "none";
        if (mobileAdminItem) mobileAdminItem.style.display = "none";
      }
      
      if (mobileSigninItem) mobileSigninItem.style.display = "none";
      if (mobileProfileItem) mobileProfileItem.style.display = "block";
      if (mobileUserEmail) mobileUserEmail.textContent = user.email;
      if (mobileLogoutItem) mobileLogoutItem.style.display = "block";
    } else {
      // User is guest
      if (headerSigninBtn) headerSigninBtn.style.display = "inline-flex";
      if (headerProfile) headerProfile.style.display = "none";
      if (profileDropdownMenu) profileDropdownMenu.style.display = "none";
      if (profileToggleBtn) profileToggleBtn.classList.remove("active");
      if (headerAdminBtn) headerAdminBtn.style.display = "none";
      if (mobileAdminItem) mobileAdminItem.style.display = "none";
      
      if (mobileSigninItem) mobileSigninItem.style.display = "block";
      if (mobileProfileItem) mobileProfileItem.style.display = "none";
      if (mobileLogoutItem) mobileLogoutItem.style.display = "none";
    }
  }

  if (supabaseClient) {
    // Monitor Auth State transitions
    supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log("Auth Event Triggered:", event, session);
      updateAuthUI(session);
      
      // Auto-redirect if trying to access auth pages while signed in
      const currentHash = window.location.hash || "#/";
      if (session && (currentHash === "#/signin" || currentHash === "#/signup")) {
        window.location.hash = "#/";
      }
    });

    // Sign Up form submission
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
      signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        
        const submitBtn = signupForm.querySelector("button[type='submit']");
        const submitBtnText = submitBtn.querySelector("span");
        const originalText = submitBtnText.textContent;
        
        submitBtnText.textContent = "Verifying & Registering...";
        submitBtn.disabled = true;
        
        try {
          const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: name
              }
            }
          });
          
          if (error) throw error;
          
          if (data?.session) {
            showToast("Registration successful! Logging you in...", "success");
            signupForm.reset();
            setTimeout(() => {
              window.location.hash = "#/";
            }, 1500);
          } else {
            showToast("Registration initiated! Please verify your email inbox.", "success");
            signupForm.reset();
            setTimeout(() => {
              window.location.hash = "#/signin";
            }, 3000);
          }
        } catch (err) {
          showToast(err.message || "Registration failed.", "error");
        } finally {
          submitBtnText.textContent = originalText;
          submitBtn.disabled = false;
        }
      });
    }

    // Sign In form submission
    const signinForm = document.getElementById("signin-form");
    if (signinForm) {
      signinForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("signin-email").value;
        const password = document.getElementById("signin-password").value;
        
        const submitBtn = signinForm.querySelector("button[type='submit']");
        const submitBtnText = submitBtn.querySelector("span");
        const originalText = submitBtnText.textContent;
        
        submitBtnText.textContent = "Validating Gateway...";
        submitBtn.disabled = true;
        
        try {
          const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
          });
          
          if (error) throw error;
          
          showToast("Access granted! Entering NexusMove Gateway.", "success");
          signinForm.reset();
          setTimeout(() => {
            window.location.hash = "#/";
          }, 1000);
        } catch (err) {
          showToast(err.message || "Invalid credentials or unverified email.", "error");
        } finally {
          submitBtnText.textContent = originalText;
          submitBtn.disabled = false;
        }
      });
    }

    // Admin autofill credentials quick-link
    const adminAutofillLink = document.getElementById("admin-autofill-link");
    if (adminAutofillLink) {
      adminAutofillLink.addEventListener("click", (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("signin-email");
        const passwordInput = document.getElementById("signin-password");
        if (emailInput) emailInput.value = "admin@nexusmove.com";
        if (passwordInput) passwordInput.value = "admin123";
        showToast("Admin credentials autofilled!", "info");
      });
    }

    // Header Sign Out Click
    const headerLogoutBtn = document.getElementById("header-logout-btn");
    if (headerLogoutBtn) {
      headerLogoutBtn.addEventListener("click", async () => {
        try {
          const { error } = await supabaseClient.auth.signOut();
          if (error) throw error;
          showToast("Gateway connection closed.", "success");
          window.location.hash = "#/";
        } catch (err) {
          showToast("Sign out failed: " + err.message, "error");
        }
      });
    }

    // Mobile Sign Out Link Click
    const mobileLogoutLink = document.getElementById("mobile-logout-btn-link");
    if (mobileLogoutLink) {
      mobileLogoutLink.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          const { error } = await supabaseClient.auth.signOut();
          if (error) throw error;
          showToast("Gateway connection closed.", "success");
          window.location.hash = "#/";
        } catch (err) {
          showToast("Sign out failed: " + err.message, "error");
        }
      });
    }

    // Profile Dropdown Menu Toggle
    const profileToggleBtn = document.getElementById("profile-toggle-btn");
    const profileDropdownMenu = document.getElementById("profile-dropdown-menu");
    if (profileToggleBtn && profileDropdownMenu) {
      profileToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = profileDropdownMenu.style.display === "block";
        profileDropdownMenu.style.display = isOpen ? "none" : "block";
        profileToggleBtn.classList.toggle("active", !isOpen);
      });

      // Close dropdown if clicked anywhere outside
      document.addEventListener("click", (e) => {
        if (!profileToggleBtn.contains(e.target) && !profileDropdownMenu.contains(e.target)) {
          profileDropdownMenu.style.display = "none";
          profileToggleBtn.classList.remove("active");
        }
      });
    }

    // --- ADMIN PANEL CONTROL CENTER ---
    loadAdminUsersList = async function() {
      const listContainer = document.getElementById("admin-users-list");
      if (!listContainer) return;
      
      listContainer.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 3rem; color: var(--color-gray-dark);">
            Loading user directory telemetry...
          </td>
        </tr>
      `;
      
      try {
        const { data, error } = await supabaseClient.rpc('admin_get_users');
        if (error) throw error;
        
        if (!data || data.length === 0) {
          listContainer.innerHTML = `
            <tr>
              <td colspan="5" style="text-align: center; padding: 3rem; color: var(--color-gray-dark);">
                No registered user records found.
              </td>
            </tr>
          `;
          return;
        }
        
        listContainer.innerHTML = data.map(u => {
          const metadata = u.raw_user_meta_data || {};
          const name = metadata.full_name || "N/A";
          const created = new Date(u.created_at).toLocaleDateString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric'
          });
          const lastActive = u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString() : "Never";
          
          const isSelf = u.email === 'admin@nexusmove.com';
          const deleteButton = isSelf ? `
            <button class="btn btn-secondary btn-sm" disabled style="opacity: 0.5; cursor: not-allowed; padding: 0.4rem 0.8rem; font-size: 0.8rem;">
              System
            </button>
          ` : `
            <button class="btn btn-accent btn-sm admin-delete-user-btn" data-id="${u.id}" data-email="${u.email}" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; background: var(--color-orange);">
              Remove
            </button>
          `;
          
          return `
            <tr style="border-bottom: 1px solid var(--glass-border-dark);">
              <td style="padding: 1.2rem 1.5rem;"><strong>${u.email}</strong></td>
              <td style="padding: 1.2rem 1.5rem;">${name}</td>
              <td style="padding: 1.2rem 1.5rem;">${created}</td>
              <td style="padding: 1.2rem 1.5rem; font-size: 0.8rem; color: var(--color-gray-dark);">${lastActive}</td>
              <td style="padding: 1.2rem 1.5rem; text-align: right; display: flex; justify-content: flex-end; gap: 0.5rem; flex-wrap: wrap;">
                <button class="btn btn-secondary btn-sm admin-edit-user-btn" data-id="${u.id}" data-name="${name}" data-email="${u.email}" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
                  Edit
                </button>
                ${deleteButton}
              </td>
            </tr>
          `;
        }).join("");
        
        // Attach click handlers
        document.querySelectorAll(".admin-edit-user-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            openEditModal(btn.dataset.id, btn.dataset.name, btn.dataset.email);
          });
        });
        
        document.querySelectorAll(".admin-delete-user-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            confirmDeleteUser(btn.dataset.id, btn.dataset.email);
          });
        });
        
      } catch (err) {
        showToast("Failed to load users: " + err.message, "error");
        listContainer.innerHTML = `
          <tr>
            <td colspan="5" style="text-align: center; padding: 3rem; color: var(--color-orange);">
              Error loading user telemetry.
            </td>
          </tr>
        `;
      }
    }

    const editModal = document.getElementById("admin-edit-modal");
    const editForm = document.getElementById("admin-edit-form");
    const cancelEditBtn = document.getElementById("admin-edit-cancel-btn");
    
    function openEditModal(id, name, email) {
      if (!editModal) return;
      document.getElementById("edit-user-id").value = id;
      document.getElementById("edit-user-name").value = name;
      document.getElementById("edit-user-email").value = email;
      editModal.style.display = "flex";
    }
    
    function closeEditModal() {
      if (editModal) editModal.style.display = "none";
      if (editForm) editForm.reset();
    }
    
    if (cancelEditBtn) {
      cancelEditBtn.addEventListener("click", closeEditModal);
    }
    
    if (editForm) {
      editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("edit-user-id").value;
        const name = document.getElementById("edit-user-name").value;
        const email = document.getElementById("edit-user-email").value;
        
        try {
          const { error } = await supabaseClient.rpc('admin_update_user', {
            user_id: id,
            new_name: name,
            new_email: email
          });
          
          if (error) throw error;
          
          showToast("Executive profile updated successfully.", "success");
          closeEditModal();
          loadAdminUsersList();
        } catch (err) {
          showToast("Failed to update profile: " + err.message, "error");
        }
      });
    }
    
    async function confirmDeleteUser(id, email) {
      if (confirm(`Are you sure you want to revoke portal clearance and delete account: ${email}?`)) {
        try {
          const { error } = await supabaseClient.rpc('admin_delete_user', {
            user_id: id
          });
          
          if (error) throw error;
          
          showToast(`Account ${email} has been deleted.`, "success");
          loadAdminUsersList();
        } catch (err) {
          showToast("Failed to delete user: " + err.message, "error");
        }
      }
    }

    const adminRefreshBtn = document.getElementById("admin-refresh-btn");
    if (adminRefreshBtn) {
      adminRefreshBtn.addEventListener("click", () => {
        loadAdminUsersList();
      });
    }
  }
});
