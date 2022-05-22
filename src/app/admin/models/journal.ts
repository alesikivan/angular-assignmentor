import { JournalRecord } from "./journalRecord";
import { TeacherModel } from "./teacher";

export interface Journal {
  id: number,
  teacher: TeacherModel,
  title: string,
  journalRecords: JournalRecord[]
}
