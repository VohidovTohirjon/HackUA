export function joinList(items, fallback = "None detected") {
  return items?.length ? items.join(", ") : fallback;
}

export function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function firstName(fullName) {
  return fullName.split(" ")[0];
}
