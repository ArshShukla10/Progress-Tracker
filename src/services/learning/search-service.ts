import type { LearningFilters, LearningItem, LearningSearchResult } from "@/types/learning";

function getSearchText(item: LearningItem) {
  return [
    item.title,
    item.subject,
    item.module,
    item.topic,
    item.skill,
    "body" in item ? item.body : "",
    "question" in item ? item.question : "",
    "front" in item ? item.front : "",
    "back" in item ? item.back : "",
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function matchesFilters(item: LearningItem, filters: LearningFilters) {
  if (filters.mode !== "all" && item.mode !== filters.mode) {
    return false;
  }

  if (filters.difficulty !== "all" && item.difficulty !== filters.difficulty) {
    return false;
  }

  if (filters.bookmarkedOnly && !item.bookmarked) {
    return false;
  }

  if (!filters.query.trim()) {
    return true;
  }

  return getSearchText(item).includes(filters.query.trim().toLowerCase());
}

function search(items: LearningItem[], filters: LearningFilters): LearningSearchResult[] {
  return items
    .filter((item) => matchesFilters(item, filters))
    .map((item) => ({
      item,
      score: filters.query.trim() ? getSearchText(item).indexOf(filters.query.toLowerCase()) : 0,
    }))
    .sort((first, second) => first.score - second.score);
}

export const searchService = {
  search,
};
