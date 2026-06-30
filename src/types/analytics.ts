export type AnalyticsMetric = {
  id: string;
  label: string;
  value: string;
  detail?: string;
};

export type AnalyticsChartPoint = {
  label: string;
  value: number;
};

export type AnalyticsProgressItem = {
  id: string;
  label: string;
  completed: number;
  total: number;
  percentage: number;
};

export type AnalyticsInsight = {
  id: string;
  label: string;
  value: string;
  detail?: string;
};

export type StudyActivitySummary = {
  weeklyActivity: AnalyticsChartPoint[];
  monthlyActivity: AnalyticsChartPoint[];
  activeDaysThisWeek: number;
  averageDailyStudyTimeMinutes: number;
  totalStudyTimeMinutes: number;
};

export type LearningInsights = {
  mostStudiedSubject: string;
  leastStudiedSubject: string;
  weakestSubject: string;
  strongestSubject: string;
  currentStreak: number;
  longestStreak: number;
  topicsRemaining: number;
  averageStudyTimeMinutes: number;
  upcomingRevisionSuggestions: string[];
};

export type AnalyticsDashboardData = {
  metrics: AnalyticsMetric[];
  subjectProgress: AnalyticsProgressItem[];
  skillProgress: AnalyticsProgressItem[];
  weeklyActivity: AnalyticsChartPoint[];
  monthlyActivity: AnalyticsChartPoint[];
  overallCompletion: number;
  currentSemesterProgress: number;
  learningConsistency: number;
  insights: LearningInsights;
};
