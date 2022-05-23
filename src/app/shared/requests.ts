const domen = 'http://localhost'

export const requests = {

  test: `${domen}/api/reports/test`,

  educationalDoc: `${domen}/documentBuilder/site/educational-work`,
  scientificDoc: `${domen}/documentBuilder/site/scientific-work`,
  methodicalDoc: `${domen}/documentBuilder/site/methodical-work`,

  createEducationalReport: `${domen}/admin/educational-work/create`,
  createScientificReport: `${domen}/admin/scientific-work/create`,
  createMethodicalReport: `${domen}/admin/methodical-work/create`,
  reportsHelperData: `${domen}/reports/helper-data`,

  recordsData: `${domen}/api/custom/records-data`,

  getJournals: `${domen}/api/journals`,
  getJournal: `${domen}/api/journals/get`,
  deleteJournal: `${domen}/api/journals/delete`,
  addJournal: `${domen}/api/journals/add`,
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
}
