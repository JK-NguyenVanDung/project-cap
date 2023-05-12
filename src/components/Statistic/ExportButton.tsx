import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import CustomButton from '../admin/Button';

export const ExportCSV = ({
  csvData,
  fileName,
  children,
  className,
}: {
  csvData: any;
  fileName: string;
  children?: any;
  className?: string;
}) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  let row = [
    { v: 'Courier: 24', t: 's', s: { font: { name: 'Courier', sz: 24 } } },
    {
      v: 'bold & color',
      t: 's',
      s: { font: { bold: true, color: { rgb: 'FF0000' } } },
    },
    { v: 'fill: color', t: 's', s: { fill: { fgColor: { rgb: 'E9E9E9' } } } },
    { v: 'line\nbreak', t: 's', s: { alignment: { wrapText: true } } },
  ];

  const exportToCSV = (csvData: any, fileName: string) => {
    // const ws = XLSX.utils.json_to_sheet(csvData);
    const ws = XLSX.utils.json_to_sheet(csvData);
    // console.log(ws);
    // ws['A2'].s = {
    //   font: {
    //     name: 'Calibri',
    //     sz: 24,
    //     bold: true,
    //     color: { rgb: 'FFFFAA00' },
    //   },
    //   fill: { fgColor: { rgb: 'E9E9E9' } },
    // };
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <CustomButton
      color="green"
      className={'min-w-[6rem] py-3 mt-2 ' + className}
      noIcon
      onClick={(e) => exportToCSV(csvData, fileName)}
      text={children ? children : 'Xuất file '}
    />
  );
};
