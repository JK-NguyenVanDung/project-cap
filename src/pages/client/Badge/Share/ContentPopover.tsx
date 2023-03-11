import React from 'react';

export default function ContentPopover({ params }: { params: any }) {
  return (
    <div>
      <p>
        <span className="font-bold text-gray-800">Tên Chương Trình: </span>
        {params.programName}
      </p>
      <p>
        <span className="font-bold text-gray-800">Giảng Viên: </span>
        {params.lecturers}
      </p>
      <p>
        <span className="font-bold text-gray-800">Khoa: </span>
        {params.faculty.facultyName}
      </p>
    </div>
  );
}
