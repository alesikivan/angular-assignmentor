export interface JournalRecord {
  id: number,
  topic: string,
  lessonType: string,
  group: string,
  time: string,
  hours: number,
  date: Date,
  journalId?: number
}