import { environment } from "src/environments/environment.prod"

const domen = environment.domen

export const requests = {
  test: `${domen}/api/reports/test`,
  login: `${domen}/site/login`,

  loadTeacherPreferences: `${domen}/admin/teacher-preference/get-all`,
  saveTeacherPreferences: `${domen}/admin/teacher-preference/set-all`,

  loadTeacherRates: `${domen}/admin/teacher-rate/get-all`,
  saveTeacherRates: `${domen}/admin/teacher-rate/set-all`,

  loadDisciplineTimes: `${domen}/admin/discipline-time/get-all`,
  saveDisciplineTimes: `${domen}/admin/discipline-time/set-all`,

  loadTeacherDisciplines: `${domen}/admin/teacher-time-management/get-all`,
  saveTeacherDisciplines: `${domen}/admin/teacher-time-management/set-all`,

  genetate: `${domen}/admin/teacher-time-management/generate-new`,

  educationalDoc: `${domen}/documentBuilder/site/educational-work`,
  scientificDoc: `${domen}/documentBuilder/site/scientific-work`,
  methodicalDoc: `${domen}/documentBuilder/site/methodical-work`,

  createEducationalReport: `${domen}/admin/educational-work/create`,
  createScientificReport: `${domen}/admin/scientific-work/create`,
  createMethodicalReport: `${domen}/admin/methodical-work/create`,
  reportsHelperData: `${domen}/reports/helper-data`,

  recordsData: `${domen}/api/custom/records-data`,

  getJournals: `${domen}/admin/journal/index`,
  getJournal: `${domen}/admin/journal/read`,
  getJournalRecord: `${domen}/admin/journal-record/read`,
  deleteJournal: `${domen}/admin/journal/delete`,
  addJournalRecord: `${domen}/admin/journal-record/create`,
  updateournalRecord: `${domen}/admin/journal-record/update`,
  removeJournalRecord: `${domen}/admin/journal-record/delete`,
  updateJournal: `${domen}/api/journals/update`,
  recordUpdate: `${domen}/api/journals/record-update`,
  recordRemove: `${domen}/api/journals/record-remove`,
  
  getTeachers: `${domen}/admin/teacher/index`,
  getTeacher: `${domen}/api/teachers/get`,
  deleteTeacher: `${domen}/api/teachers/delete`,
  addTeacher: `${domen}/api/teachers/add`,
  updateTeacher: `${domen}/api/teachers/update`,
  helperData: `${domen}/api/teachers/helper-data`,

  getReportTypes: `${domen}/admin/work-report-type/index`,

  getUsers: `${domen}/api/users`,
  getUser: `${domen}/api/users/get`,
  deleteUser: `${domen}/api/users/delete`,
  addUser: `${domen}/api/users/add`,
  updateUser: `${domen}/api/users/update`,

  getNews: `${domen}/api/news`,
  getNew: `${domen}/api/news/get`,
  deleteNew: `${domen}/api/news/delete`,
  addNew: `${domen}/api/news/add`,
  updateNew: `${domen}/api/news/update`,

  getAcademicDegries: `${domen}/api/academic-degries`,
  getAcademicDegree: `${domen}/api/academic-degries/get`,
  deleteAcademicDegree: `${domen}/api/academic-degries/delete`,
  addAcademicDegree: `${domen}/api/academic-degries/add`,
  updateAcademicDegree: `${domen}/api/academic-degries/update`,

  getAcademicTitles: `${domen}/api/academic-titles`,
  getAcademicTitle: `${domen}/api/academic-titles/get`,
  deleteAcademicTitle: `${domen}/api/academic-titles/delete`,
  addAcademicTitle: `${domen}/api/academic-titles/add`,
  updateAcademicTitle: `${domen}/api/academic-titles/update`,
  
  getDepartments: `${domen}/api/departments`,
  getDepartment: `${domen}/api/departments/get`,
  deleteDepartment: `${domen}/api/departments/delete`,
  addDepartment: `${domen}/api/departments/add`,
  updateDepartment: `${domen}/api/departments/update`,

  getGroups: `${domen}/admin/group/index`,

  getClassTypes: `${domen}/admin/class-type/index`,
}
