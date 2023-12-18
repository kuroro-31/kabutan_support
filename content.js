window.onload = function () {
  // 既存の要素に対する処理
  addBlockButtons();

  // 新たに追加された要素に対する処理
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        setTimeout(addBlockButtons, 1000);
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

function addBlockButtons() {
  const cards = document.querySelectorAll(
    ".col-sm-4.my-2:not(.block-button-added)"
  );
  console.log(`Found ${cards.length} new cards`);
  let blockedTitles = JSON.parse(localStorage.getItem("blockedTitles") || "[]");
  cards.forEach((card, index) => {
    const titleElement = card.querySelector(".entry-title");
    if (titleElement) {
      console.log(`Processing new card ${index}`);
      const title = titleElement.innerText;
      console.log(`Title: ${title}`);
      if (blockedTitles.includes(title)) {
        card.style.display = "none";
        return;
      }
      const blockButton = document.createElement("button");
      blockButton.innerText = "Block";
      blockButton.addEventListener("click", () => {
        console.log(`Block button clicked for title: ${title}`);
        if (!blockedTitles.includes(title)) {
          blockedTitles.push(title);
          localStorage.setItem("blockedTitles", JSON.stringify(blockedTitles));
        }
        card.style.display = "none";
      });
      card.querySelector(".card-body").appendChild(blockButton);
      card.classList.add("block-button-added");
      console.log(`Block button added for new card ${index}`);
    }
  });
}
