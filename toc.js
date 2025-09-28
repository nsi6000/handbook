// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="Intro.html">Introduction</a></li><li class="chapter-item expanded affix "><a href="publishers.html">List of textbooks publishers</a></li><li class="chapter-item expanded affix "><li class="part-title">Textbooks</li><li class="chapter-item expanded "><a href="management.html"><strong aria-hidden="true">1.</strong> Management</a></li><li class="chapter-item expanded "><a href="economics.html"><strong aria-hidden="true">2.</strong> Economics</a></li><li class="chapter-item expanded "><a href="law.html"><strong aria-hidden="true">3.</strong> Law</a></li><li class="chapter-item expanded "><a href="computer_science.html"><strong aria-hidden="true">4.</strong> Computer Science</a></li><li class="chapter-item expanded "><a href="programming_languages.html"><strong aria-hidden="true">5.</strong> Programming Languages</a></li><li class="chapter-item expanded "><a href="mathematics.html"><strong aria-hidden="true">6.</strong> Mathematics</a></li><li class="chapter-item expanded "><a href="physics.html"><strong aria-hidden="true">7.</strong> Physics</a></li><li class="chapter-item expanded "><a href="chemistry.html"><strong aria-hidden="true">8.</strong> Chemistry</a></li><li class="chapter-item expanded "><a href="biology.html"><strong aria-hidden="true">9.</strong> Biology</a></li><li class="chapter-item expanded "><a href="medicine.html"><strong aria-hidden="true">10.</strong> Medicine</a></li><li class="chapter-item expanded "><a href="veterinary_medicine.html"><strong aria-hidden="true">11.</strong> Veterinary Medicine</a></li><li class="chapter-item expanded "><a href="standardized_test_preparation.html"><strong aria-hidden="true">12.</strong> Standardized Test Preparation</a></li><li class="chapter-item expanded "><a href="job_interviews.html"><strong aria-hidden="true">13.</strong> Job Interviews</a></li><li class="chapter-item expanded affix "><li class="part-title">Curriculums</li><li class="chapter-item expanded "><a href="mathematics_degree.html"><strong aria-hidden="true">14.</strong> Mathematics Degree</a></li><li class="chapter-item expanded "><a href="engineering_degree.html"><strong aria-hidden="true">15.</strong> Engineering Degree</a></li><li class="chapter-item expanded affix "><li class="part-title">Addendum</li><li class="chapter-item expanded "><a href="study_tips.html"><strong aria-hidden="true">16.</strong> How to study effectively</a></li><li class="chapter-item expanded "><a href="softwares.html"><strong aria-hidden="true">17.</strong> Free &amp; Open Source Softwares</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
