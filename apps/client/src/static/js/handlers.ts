export const toggleSort = (event: any) => {
  const target = (event as any).target;
  const targetTitle = target.parentElement.innerText.toLowerCase();
  target && target.classList.toggle("sorted-asc");
  target && target.classList.toggle("sorted-desc");
  if (target.classList.includes("sorted-desc")) {
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
