import { localStorageService } from "@/lib/storage/local-storage";
import type {
  ConfidenceLevel,
  LearningItemState,
  LearningNote,
  LearningRevisionState,
  LearningStatus,
  LearningWorkspaceState,
} from "@/types/academic";

function getStorageKey(semesterId: string, subjectId: string, moduleId: string) {
  return `nexus.learning.${semesterId}.${subjectId}.${moduleId}`;
}

function getWorkspaceState(
  semesterId: string,
  subjectId: string,
  moduleId: string,
): LearningWorkspaceState {
  const storedState = localStorageService.get<Partial<LearningWorkspaceState>>(
    getStorageKey(semesterId, subjectId, moduleId),
  );

  return {
    topics: storedState?.topics ?? {},
    subtopics: storedState?.subtopics ?? {},
    practice: storedState?.practice ?? {},
    notes: storedState?.notes ?? [],
  };
}

function setWorkspaceState(
  semesterId: string,
  subjectId: string,
  moduleId: string,
  state: LearningWorkspaceState,
) {
  localStorageService.set(getStorageKey(semesterId, subjectId, moduleId), state);
}

function updateWorkspaceState(
  semesterId: string,
  subjectId: string,
  moduleId: string,
  updater: (state: LearningWorkspaceState) => LearningWorkspaceState,
) {
  const nextState = updater(getWorkspaceState(semesterId, subjectId, moduleId));
  setWorkspaceState(semesterId, subjectId, moduleId, nextState);
  return nextState;
}

function setTopicStatus(
  semesterId: string,
  subjectId: string,
  moduleId: string,
  topicId: string,
  status: LearningStatus,
) {
  return updateWorkspaceState(semesterId, subjectId, moduleId, (state) => ({
    ...state,
    topics: {
      ...state.topics,
      [topicId]: {
        ...state.topics[topicId],
        status,
      },
    },
  }));
}

function setSubtopicStatus(
  semesterId: string,
  subjectId: string,
  moduleId: string,
  subtopicId: string,
  status: LearningStatus,
) {
  return updateWorkspaceState(semesterId, subjectId, moduleId, (state) => ({
    ...state,
    subtopics: {
      ...state.subtopics,
      [subtopicId]: {
        ...state.subtopics[subtopicId],
        status,
      },
    },
  }));
}

function setTopicConfidence(
  semesterId: string,
  subjectId: string,
  moduleId: string,
  topicId: string,
  confidence: ConfidenceLevel,
) {
  return updateWorkspaceState(semesterId, subjectId, moduleId, (state) => ({
    ...state,
    topics: {
      ...state.topics,
      [topicId]: {
        ...state.topics[topicId],
        confidence,
      },
    },
  }));
}

function toggleTopicBookmark(
  semesterId: string,
  subjectId: string,
  moduleId: string,
  topicId: string,
) {
  return updateWorkspaceState(semesterId, subjectId, moduleId, (state) => ({
    ...state,
    topics: {
      ...state.topics,
      [topicId]: {
        ...state.topics[topicId],
        bookmarked: !state.topics[topicId]?.bookmarked,
      },
    },
  }));
}

function setPracticeStatus(
  semesterId: string,
  subjectId: string,
  moduleId: string,
  practiceId: string,
  status: LearningStatus,
) {
  return updateWorkspaceState(semesterId, subjectId, moduleId, (state) => ({
    ...state,
    practice: {
      ...state.practice,
      [practiceId]: {
        ...state.practice[practiceId],
        status,
      },
    },
  }));
}

function setTopicRevision(
  semesterId: string,
  subjectId: string,
  moduleId: string,
  topicId: string,
  revision: LearningRevisionState,
) {
  return updateWorkspaceState(semesterId, subjectId, moduleId, (state) => ({
    ...state,
    topics: {
      ...state.topics,
      [topicId]: {
        ...state.topics[topicId],
        revision,
      },
    },
  }));
}

function createNote(
  semesterId: string,
  subjectId: string,
  moduleId: string,
  title: string,
  body: string,
) {
  return updateWorkspaceState(semesterId, subjectId, moduleId, (state) => {
    const timestamp = new Date().toISOString();
    const note: LearningNote = {
      id: crypto.randomUUID(),
      title,
      body,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    return {
      ...state,
      notes: [note, ...state.notes],
    };
  });
}

function updateNote(
  semesterId: string,
  subjectId: string,
  moduleId: string,
  noteId: string,
  title: string,
  body: string,
) {
  return updateWorkspaceState(semesterId, subjectId, moduleId, (state) => ({
    ...state,
    notes: state.notes.map((note) =>
      note.id === noteId
        ? {
            ...note,
            title,
            body,
            updatedAt: new Date().toISOString(),
          }
        : note,
    ),
  }));
}

function deleteNote(semesterId: string, subjectId: string, moduleId: string, noteId: string) {
  return updateWorkspaceState(semesterId, subjectId, moduleId, (state) => ({
    ...state,
    notes: state.notes.filter((note) => note.id !== noteId),
  }));
}

function getItemState(record: Record<string, LearningItemState>, id: string) {
  return record[id] ?? {};
}

export const learningStorageService = {
  getWorkspaceState,
  setWorkspaceState,
  setTopicStatus,
  setSubtopicStatus,
  setTopicConfidence,
  toggleTopicBookmark,
  setPracticeStatus,
  setTopicRevision,
  createNote,
  updateNote,
  deleteNote,
  getItemState,
};
