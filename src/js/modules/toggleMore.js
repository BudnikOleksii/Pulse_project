function toggleMore(moreTrigger, backTrigger, content, list, activeItem, activeList) {
    const moreLink = document.querySelectorAll(moreTrigger),
          moreBack = document.querySelectorAll(backTrigger),
          itemContent = document.querySelectorAll(content),
          moreList = document.querySelectorAll(list);

    function toggleMoreList (trigger) {
        trigger.forEach((link, i) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                itemContent[i].classList.toggle(activeItem);
                moreList[i].classList.toggle(activeList);
            });
        });
    }
    toggleMoreList(moreLink);
    toggleMoreList(moreBack);
}

export default toggleMore;