import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import CustomButton from '../admin/Button';

export const ExportCSV = ({
  csvData,
  fileName,
}: {
  csvData: any;
  fileName: string;
}) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData: any, fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <CustomButton
      color="green"
      className="min-w-[6rem] py-3"
      noIcon
      onClick={(e) => exportToCSV(csvData, fileName)}
      text="Xuất file "
    />
  );
};
