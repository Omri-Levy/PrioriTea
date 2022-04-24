export const displayTaskOptionsTooltip = () => {
  const selector = ".task-options-tooltip-btn";
  const parent = document.querySelector(selector);
  const target = parent?.firstChild;

  if (target && "classList" in target) {
    (target as HTMLElement).classList.remove("hidden");
  }
};

export const hideTaskOptionsTooltip = () => {
  const selector = ".task-options-tooltip-btn";
  const parent = document.querySelector(selector);
  const target = parent?.firstChild;

  if (target && "classList" in target) {
    (target as HTMLElement).classList.add("hidden");
  }
};

export const displayTaskFilterTooltip = (event: any) => {
  let target = (event as any).target.closest("#hidden-filter-modal");
  if (!target && (event as any).firstChild) {
    target = (event as any).firstChild.firstChild;
  }
  target && target.classList.remove("hidden");
};

export const hideTaskFilterTooltip = (event: any) => {
  let target = (event as any).closest("#hidden-filter-modal");
  if (!target && (event as any).firstChild) {
    target = (event as any).firstChild.firstChild;
  }
  target && target.classList.add("hidden");
};

export const toggleSort = (event: any) => {
  const target = (event as any).target;
  const targetTitle = target.parentElement.innerText.toLowerCase();
  target && target.classList.toggle("sorted-asc");
  target && target.classList.toggle("sorted-desc");
  if (target.className === "sorted-desc") {
    localStorage.setItem(
      "sort",
      JSON.stringify({
        sortBy: targetTitle,
        orderBy: "desc",
      })
    );
  } else {
    localStorage.setItem(
      "sort",
      JSON.stringify({
        sortBy: targetTitle,
        orderBy: "asc",
      })
    );
  }
};
