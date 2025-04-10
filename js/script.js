/**
 * موقع بندر الجميلي الشخصي
 * ملف JavaScript الرئيسي
 * @author Bandar Al jameeli
 * @version 1.0.0
 */

// تنفيذ الكود بعد تحميل المستند بالكامل
document.addEventListener('DOMContentLoaded', () => {
    // استدعاء الوظائف الرئيسية
    initApp();
  });
  
  /**
   * تهيئة التطبيق الرئيسي
   */
  const initApp = () => {
    // إزالة شاشة التحميل
    handlePreloader();
    
    // تهيئة قائمة التنقل
    initNavigation();
    
    // تهيئة التمرير السلس
    initSmoothScrolling();
    
    // تهيئة فلترة المشاريع
    initProjectFilters();
    
    // تهيئة تأثيرات التمرير
    initScrollAnimations();
    
    // تهيئة نموذج الاتصال
    initContactForm();
    
    // تهيئة تأثيرات التفاعل
    initInteractionEffects();
    
    // تهيئة زر التمرير لأعلى
    initScrollTopButton();
    
    // تهيئة وضع الألوان
    initThemeToggle();
    
    // تحديث السنة في حقوق النشر
    updateCopyrightYear();
  };
  
  /**
   * إدارة شاشة التحميل
   */
  const handlePreloader = () => {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
      preloader.classList.add('preloader-hide');
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.classList.add('loaded');
        animateHeroElements();
      }, 500);
    });
  };
  
  /**
   * تحريك عناصر القسم الرئيسي
   */
  const animateHeroElements = () => {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    
    // إنشاء تأثير كتابة للنص
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.animationDelay = `${index * 0.05}s`;
      span.classList.add('char-animate');
      heroTitle.appendChild(span);
    });
    
    // تحريك الصورة الشخصية
    const profileImg = document.querySelector('.about-img img');
    if (profileImg) {
      profileImg.style.opacity = '0';
      setTimeout(() => {
        profileImg.style.opacity = '1';
        profileImg.style.transition = 'opacity 1s ease-in-out';
      }, 500);
    }
  };
  
  /**
   * تهيئة قائمة التنقل
   */
  const initNavigation = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');
    
    if (!burger || !nav || !navLinks.length || !header) return;
    
    // إضافة نمط CSS للرسوم المتحركة
    addKeyframeStyles();
    
    // تفعيل قائمة التنقل على الهواتف
    burger.addEventListener('click', () => {
      // تبديل حالة القائمة
      nav.classList.toggle('nav-active');
      
      // تبديل حالة زر القائمة
      burger.classList.toggle('toggle');
      
      // تحريك عناصر القائمة
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });
    });
    
    // تثبيت الهيدر عند التمرير
    window.addEventListener('scroll', () => {
      header.classList.toggle('header-scrolled', window.scrollY > 0);
    });
  };
  
  /**
   * إضافة أنماط CSS للرسوم المتحركة
   */
  const addKeyframeStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes navLinkFade {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .char-animate {
        display: inline-block;
        opacity: 0;
        animation: fadeIn 0.3s forwards;
      }
    `;
    document.head.appendChild(style);
  };
  
  /**
   * تهيئة التمرير السلس
   */
  const initSmoothScrolling = () => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    const nav = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    
    if (!anchors.length) return;
    
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // التمرير السلس إلى العنصر المستهدف
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // إغلاق القائمة المتنقلة إذا كانت مفتوحة
        if (nav && burger && nav.classList.contains('nav-active')) {
          nav.classList.remove('nav-active');
          burger.classList.remove('toggle');
        }
      });
    });
  };
  
  /**
   * تهيئة فلترة المشاريع
   */
  const initProjectFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (!filterButtons.length || !projectItems.length) return;
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // إزالة الكلاس النشط من جميع الأزرار
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // إضافة الكلاس النشط للزر المضغوط
        button.classList.add('active');
        
        // الحصول على فئة الفلتر
        const filterValue = button.getAttribute('data-filter');
        
        // تطبيق الفلتر على المشاريع باستخدام تأثيرات متحركة
        projectItems.forEach(item => {
          const category = item.getAttribute('data-category');
          
          // التحقق من تطابق الفئة
          const shouldShow = filterValue === 'all' || filterValue === category;
          
          // تطبيق تأثير متحرك
          if (shouldShow) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // تهيئة تأثيرات التحويم على المشاريع
    projectItems.forEach(project => {
      const overlay = project.querySelector('.project-overlay');
      if (!overlay) return;
      
      project.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
      });
      
      project.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
      });
    });
  };
  
  /**
   * تهيئة تأثيرات التمرير
   */
  const initScrollAnimations = () => {
    const animateElements = document.querySelectorAll('.animate');
    
    if (!animateElements.length) return;
    
    // دالة فحص العناصر المرئية
    const checkVisibleElements = () => {
      const triggerBottom = window.innerHeight * 0.8;
      
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
          element.classList.add('active');
        }
      });
    };
    
    // تشغيل التحريك عند تحميل الصفحة
    window.addEventListener('load', checkVisibleElements);
    
    // تشغيل التحريك عند التمرير
    window.addEventListener('scroll', checkVisibleElements);
  };
  
  /**
   * تهيئة نموذج الاتصال
   */
  const initContactForm = () => {
    const contactForm = document.querySelector('.contact-form form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm(this)) {
        // يمكن إضافة كود هنا لإرسال النموذج عبر AJAX
        // في مثال حقيقي، يمكن استخدام Fetch API أو Axios
        simulateFormSubmission(this);
      }
    });
    
    // إضافة تحقق في الوقت الفعلي
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateInput(this);
      });
      
      input.addEventListener('input', function() {
        if (this.classList.contains('invalid')) {
          validateInput(this);
        }
      });
    });
  };
  
  /**
   * التحقق من صحة النموذج بالكامل
   * @param {HTMLFormElement} form - عنصر النموذج
   * @returns {boolean} صحة النموذج
   */
  const validateForm = (form) => {
    const formInputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    formInputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  };
  
  /**
   * التحقق من صحة حقل واحد
   * @param {HTMLInputElement|HTMLTextAreaElement} input - عنصر الإدخال
   * @returns {boolean} صحة الحقل
   */
  const validateInput = (input) => {
    const value = input.value.trim();
    
    // التحقق من أن الحقل غير فارغ
    if (value === '') {
      setInputError(input, 'هذا الحقل مطلوب');
      return false;
    }
    
    // التحقق من صحة البريد الإلكتروني
    if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setInputError(input, 'يرجى إدخال بريد إلكتروني صحيح');
        return false;
      }
    }
    
    // إزالة أي خطأ سابق
    clearInputError(input);
    return true;
  };
  
  /**
   * تعيين رسالة خطأ لحقل
   * @param {HTMLInputElement|HTMLTextAreaElement} input - عنصر الإدخال
   * @param {string} message - رسالة الخطأ
   */
  const setInputError = (input, message) => {
    input.classList.add('invalid');
    input.style.borderColor = 'red';
    
    // إنشاء أو تحديث رسالة الخطأ
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.classList.add('error-message');
      errorElement.style.color = 'red';
      errorElement.style.fontSize = '12px';
      errorElement.style.marginTop = '5px';
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    
    errorElement.textContent = message;
  };
  
  /**
   * إزالة رسالة الخطأ من الحقل
   * @param {HTMLInputElement|HTMLTextAreaElement} input - عنصر الإدخال
   */
  const clearInputError = (input) => {
    input.classList.remove('invalid');
    input.style.borderColor = '';
    
    // إزالة رسالة الخطأ إن وجدت
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.remove();
    }
  };
  
  /**
   * محاكاة إرسال النموذج
   * @param {HTMLFormElement} form - عنصر النموذج
   */
  const simulateFormSubmission = (form) => {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // تعطيل الزر وتغيير النص
    submitButton.disabled = true;
    submitButton.textContent = 'جاري الإرسال...';
    
    // محاكاة عملية إرسال
    setTimeout(() => {
      // إعادة تفعيل الزر وتغيير النص
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      
      // عرض رسالة نجاح
      alert('تم إرسال رسالتك بنجاح!');
      
      // إعادة تعيين النموذج
      form.reset();
    }, 1500);
  };
  
  /**
   * تهيئة تأثيرات التفاعل
   */
  const initInteractionEffects = () => {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    // تأثير حركة الماوس على القسم الرئيسي
    hero.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const moveX = x * 20 - 10;
      const moveY = y * 20 - 10;
      
      document.documentElement.style.setProperty('--mouse-x', moveX + 'px');
      document.documentElement.style.setProperty('--mouse-y', moveY + 'px');
    });
  };
  
  /**
   * تهيئة زر التمرير لأعلى
   */
  const initScrollTopButton = () => {
    // إنشاء زر التمرير
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(45deg, var(--primary, #6a11cb), var(--secondary, #2575fc));
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      z-index: 99;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // إظهار/إخفاء الزر حسب موضع التمرير
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.transform = 'translateY(0)';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.transform = 'translateY(20px)';
      }
    });
    
    // التمرير لأعلى عند النقر
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  
  /**
   * تهيئة زر تبديل وضع الألوان
   */
  const initThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    // التحقق من وضع الألوان المفضل لدى المستخدم
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // التحقق من وضع الألوان المحفوظ
    const storedTheme = localStorage.getItem('theme');
    
    // تحديد الوضع الأولي
    const initialTheme = storedTheme || (prefersDarkMode ? 'dark' : 'light');
    
    // تطبيق الوضع الأولي
    document.body.setAttribute('data-theme', initialTheme);
    updateThemeToggleButton(themeToggle, initialTheme);
    
    // تبديل وضع الألوان عند النقر
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // تطبيق الوضع الجديد
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeToggleButton(themeToggle, newTheme);
      
      // إضافة تأثير انتقالي
      document.body.classList.add('theme-transition');
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 500);
    });
  };
  
  /**
   * تحديث زر تبديل وضع الألوان
   * @param {HTMLButtonElement} button - زر التبديل
   * @param {string} theme - وضع الألوان
   */
  const updateThemeToggleButton = (button, theme) => {
    button.textContent = theme === 'dark' ? '☀️' : '🌙';
    button.setAttribute('aria-label', theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن');
  };
  
  /**
   * تحديث سنة حقوق النشر
   */
  const updateCopyrightYear = () => {
    const copyright = document.querySelector('.copyright');
    
    if (!copyright) return;
    
    const currentYear = new Date().getFullYear();
    copyright.innerHTML = `© ${currentYear} جميع الحقوق محفوظة لبندر الجميلي`;
  };
  
  /**
   * إضافة تأثيرات لازي لود للصور (اختياري)
   */
  const initLazyLoading = () => {
    // التحقق من دعم Intersection Observer
    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
              img.src = src;
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          }
        });
      });
      
      // مراقبة الصور
      document.querySelectorAll('img[data-src]').forEach(img => {
        imgObserver.observe(img);
      });
    }
  };
  
  /**
   * إزالة شاشة التحميل المبدئية
   */
  (() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1000);
    }
  })();