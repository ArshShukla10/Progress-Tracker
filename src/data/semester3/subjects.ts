import type { Subject } from "@/types/academic";

const emptyLearningTrail = {
  resources: [],
};

export const semester3Subjects: Subject[] = [
  {
    id: "computer-architecture",
    name: "Computer Architecture",
    semesterId: "semester-3",
    modules: [
      {
        id: "ca-module-1",
        title: "Module 1",
        description: "Foundations of computer organization and digital systems.",
        topics: [
          {
            id: "ca-number-systems",
            title: "Number Systems and Data Representation",
            status: "completed",
            subtopics: [
              { id: "ca-binary", title: "Binary, octal, decimal, and hexadecimal", status: "completed", ...emptyLearningTrail },
              { id: "ca-complements", title: "Complements and signed representation", status: "completed", ...emptyLearningTrail },
            ],
          },
          {
            id: "ca-basic-organization",
            title: "Basic Computer Organization",
            status: "in-progress",
            subtopics: [
              { id: "ca-cpu-memory-io", title: "CPU, memory, and I/O organization", status: "in-progress", ...emptyLearningTrail },
            ],
          },
        ],
      },
      {
        id: "ca-module-2",
        title: "Module 2",
        topics: [
          {
            id: "ca-instruction-cycle",
            title: "Instruction Cycle and Addressing Modes",
            status: "not-started",
            subtopics: [
              { id: "ca-fetch-decode-execute", title: "Fetch, decode, and execute cycle", status: "not-started", ...emptyLearningTrail },
              { id: "ca-addressing", title: "Addressing modes", status: "not-started", ...emptyLearningTrail },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "java-programming",
    name: "Java Programming",
    semesterId: "semester-3",
    modules: [
      {
        id: "java-module-1",
        title: "Module 1",
        description: "Java language fundamentals and object-oriented programming.",
        topics: [
          {
            id: "java-oop-basics",
            title: "Classes, Objects, and Methods",
            status: "completed",
            subtopics: [
              { id: "java-classes", title: "Class structure and object creation", status: "completed", ...emptyLearningTrail },
              { id: "java-methods", title: "Methods, parameters, and return values", status: "completed", ...emptyLearningTrail },
            ],
          },
          {
            id: "java-inheritance",
            title: "Inheritance and Polymorphism",
            status: "in-progress",
            subtopics: [
              { id: "java-extends", title: "Extending classes", status: "in-progress", ...emptyLearningTrail },
              { id: "java-overriding", title: "Method overriding", status: "not-started", ...emptyLearningTrail },
            ],
          },
        ],
      },
      {
        id: "java-module-2",
        title: "Module 2",
        topics: [
          {
            id: "java-exceptions",
            title: "Exception Handling",
            status: "not-started",
            subtopics: [
              { id: "java-try-catch", title: "try, catch, finally, and throw", status: "not-started", ...emptyLearningTrail },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cloud-computing",
    name: "Cloud Computing",
    semesterId: "semester-3",
    modules: [
      {
        id: "cloud-module-1",
        title: "Module 1",
        description: "Cloud computing fundamentals and service models.",
        topics: [
          {
            id: "cloud-introduction",
            title: "Introduction to Cloud Computing",
            status: "completed",
            subtopics: [
              { id: "cloud-characteristics", title: "Cloud characteristics", status: "completed", ...emptyLearningTrail },
              { id: "cloud-deployment-models", title: "Public, private, and hybrid cloud", status: "completed", ...emptyLearningTrail },
            ],
          },
          {
            id: "cloud-service-models",
            title: "IaaS, PaaS, and SaaS",
            status: "in-progress",
            subtopics: [
              { id: "cloud-iaas-paas-saas", title: "Service model comparison", status: "in-progress", ...emptyLearningTrail },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "data-structures",
    name: "Data Structures",
    semesterId: "semester-3",
    modules: [
      {
        id: "ds-module-1",
        title: "Module 1",
        description: "Linear data structures and implementation foundations.",
        topics: [
          {
            id: "ds-arrays",
            title: "Arrays",
            status: "completed",
            subtopics: [
              { id: "ds-array-operations", title: "Traversal, insertion, deletion, and searching", status: "completed", ...emptyLearningTrail },
            ],
          },
          {
            id: "ds-linked-lists",
            title: "Linked Lists and Pointer Operations",
            status: "in-progress",
            subtopics: [
              { id: "ds-singly-linked-list", title: "Singly linked list operations", status: "in-progress", ...emptyLearningTrail },
              { id: "ds-doubly-linked-list", title: "Doubly linked list operations", status: "not-started", ...emptyLearningTrail },
            ],
          },
        ],
      },
      {
        id: "ds-module-2",
        title: "Module 2",
        topics: [
          {
            id: "ds-stacks-queues",
            title: "Stacks and Queues",
            status: "not-started",
            subtopics: [
              { id: "ds-stack-applications", title: "Stack applications", status: "not-started", ...emptyLearningTrail },
              { id: "ds-queue-variants", title: "Queue variants", status: "not-started", ...emptyLearningTrail },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dbms",
    name: "DBMS",
    semesterId: "semester-3",
    modules: [
      {
        id: "dbms-module-1",
        title: "Module 1",
        description: "Database fundamentals and relational modeling.",
        topics: [
          {
            id: "dbms-er-model",
            title: "ER Model",
            status: "completed",
            subtopics: [
              { id: "dbms-entities-relationships", title: "Entities, attributes, and relationships", status: "completed", ...emptyLearningTrail },
            ],
          },
          {
            id: "dbms-normalization",
            title: "Normalization",
            status: "in-progress",
            subtopics: [
              { id: "dbms-normal-forms", title: "Functional dependencies and normal forms", status: "in-progress", ...emptyLearningTrail },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "computer-graphics",
    name: "Computer Graphics",
    semesterId: "semester-3",
    modules: [
      {
        id: "cg-module-1",
        title: "Module 1",
        description: "Graphics primitives and transformations.",
        topics: [
          {
            id: "cg-line-circle",
            title: "Line and Circle Drawing Algorithms",
            status: "not-started",
            subtopics: [
              { id: "cg-dda-bresenham", title: "DDA and Bresenham algorithms", status: "not-started", ...emptyLearningTrail },
            ],
          },
          {
            id: "cg-transformations",
            title: "2D Transformations",
            status: "not-started",
            subtopics: [
              { id: "cg-translation-rotation-scaling", title: "Translation, rotation, and scaling", status: "not-started", ...emptyLearningTrail },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "french",
    name: "French",
    semesterId: "semester-3",
    modules: [
      {
        id: "french-module-1",
        title: "Module 1",
        description: "Language fundamentals and academic communication.",
        topics: [
          {
            id: "french-grammar",
            title: "Grammar and Sentence Formation",
            status: "in-progress",
            subtopics: [
              { id: "french-verbs", title: "Common verbs and conjugation patterns", status: "in-progress", ...emptyLearningTrail },
            ],
          },
          {
            id: "french-vocabulary",
            title: "Academic Vocabulary",
            status: "not-started",
            subtopics: [
              { id: "french-introductions", title: "Introductions and classroom vocabulary", status: "not-started", ...emptyLearningTrail },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dsa-theory",
    name: "DSA Theory",
    semesterId: "semester-3",
    modules: [
      {
        id: "dsa-theory-module-1",
        title: "Module 1",
        description: "Algorithm analysis and core problem-solving patterns.",
        topics: [
          {
            id: "dsa-complexity",
            title: "Time and Space Complexity",
            status: "completed",
            subtopics: [
              { id: "dsa-big-o", title: "Asymptotic notation", status: "completed", ...emptyLearningTrail },
            ],
          },
          {
            id: "dsa-recursion",
            title: "Recursion",
            status: "in-progress",
            subtopics: [
              { id: "dsa-recursive-thinking", title: "Recursive flow and base cases", status: "in-progress", ...emptyLearningTrail },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dsa-coding",
    name: "DSA Coding",
    semesterId: "semester-3",
    modules: [
      {
        id: "dsa-coding-module-1",
        title: "Module 1",
        description: "Implementation practice for arrays and strings.",
        topics: [
          {
            id: "dsa-array-patterns",
            title: "Array Problem Patterns",
            status: "completed",
            subtopics: [
              { id: "dsa-two-pointer", title: "Two-pointer technique", status: "completed", ...emptyLearningTrail },
              { id: "dsa-prefix-sum", title: "Prefix sums", status: "in-progress", ...emptyLearningTrail },
            ],
          },
          {
            id: "dsa-string-patterns",
            title: "String Problem Patterns",
            status: "not-started",
            subtopics: [
              { id: "dsa-frequency-map", title: "Frequency maps", status: "not-started", ...emptyLearningTrail },
            ],
          },
        ],
      },
    ],
  },
];
