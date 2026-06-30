import type { AiActionId, AiContext } from "@/types/ai";
import type { PlannerTask } from "@/types/planner";

export type LearningMode = "notes" | "pyqs" | "revision" | "flashcards" | "interview";

export type LearningDifficulty = "easy" | "medium" | "hard";

export type LearningContentSource = "academic" | "skill" | "ai" | "personal";

export type LearningContentStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "solved"
  | "unsolved"
  | "known"
  | "unknown";

export type LearningContentBase = {
  id: string;
  title: string;
  mode: LearningMode;
  source: LearningContentSource;
  subjectId?: string;
  subject?: string;
  moduleId?: string;
  module?: string;
  topicId?: string;
  topic?: string;
  skillId?: string;
  skill?: string;
  difficulty?: LearningDifficulty;
  bookmarked?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LearningNote = LearningContentBase & {
  mode: "notes";
  body: string;
  pinned?: boolean;
  noteType: "ai-generated" | "personal" | "quick";
};

export type PyqItem = LearningContentBase & {
  mode: "pyqs";
  question: string;
  expectedMarks?: number;
  status: "solved" | "unsolved";
  aiExplanationAvailable?: boolean;
};

export type RevisionItem = LearningContentBase & {
  mode: "revision";
  status: "not-started" | "in-progress" | "completed";
  dueAt?: string;
  intervalDays?: number;
  revisionCount: number;
};

export type FlashcardItem = LearningContentBase & {
  mode: "flashcards";
  front: string;
  back: string;
  status: "known" | "unknown" | "not-started";
};

export type InterviewQuestion = LearningContentBase & {
  mode: "interview";
  question: string;
  questionType: "technical" | "hr" | "viva" | "coding";
  status: "not-started" | "in-progress" | "completed";
};

export type LearningItem =
  | LearningNote
  | PyqItem
  | RevisionItem
  | FlashcardItem
  | InterviewQuestion;

export type LearningFilters = {
  mode: LearningMode | "all";
  query: string;
  difficulty: LearningDifficulty | "all";
  bookmarkedOnly: boolean;
};

export type LearningStats = {
  notesCount: number;
  pyqsPending: number;
  revisionDue: number;
  interviewPending: number;
  flashcardsDue: number;
  bookmarkedItems: number;
};

export type LearningSearchResult = {
  item: LearningItem;
  score: number;
};

export type LearningStorageState = {
  notes: LearningNote[];
  pyqs: PyqItem[];
  revision: RevisionItem[];
  flashcards: FlashcardItem[];
  interview: InterviewQuestion[];
};

export type LearningWorkspaceData = {
  modes: LearningMode[];
  items: LearningItem[];
  stats: LearningStats;
  plannerTasks: PlannerTask[];
  aiActions: AiActionId[];
  aiContext: AiContext;
};
