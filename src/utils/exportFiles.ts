import XLSX from 'sheetjs-style'
import * as FileSaver from 'file-saver'

export const ExportExcel = (data: unknown[], fileName: string) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const dataExcel = new Blob([excelBuffer], { type: fileType })
  FileSaver.saveAs(dataExcel, fileName + fileExtension)
}
