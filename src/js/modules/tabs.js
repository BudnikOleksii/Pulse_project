function tabs(tabsSelector, contentSelector, parentSelector, contentActiveClass, tabsActiveClass) {
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(contentSelector),
          tabsParent = document.querySelector(parentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove(contentActiveClass);
            item.classList.add('animated', 'fadeInUp');
        });
        tabs.forEach(item => {
            item.classList.remove(tabsActiveClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add(contentActiveClass);
        tabs[i].classList.add(tabsActiveClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.parentNode.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;