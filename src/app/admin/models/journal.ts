import { JournalRecord } from "./journalRecord";
import { TeacherModel } from "./teacher";

export interface Journal {
  id: number,
  teacher: TeacherModel,
  name: string,
  journalRecords: JournalRecord[]
}
