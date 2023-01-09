import React, { useEffect, useState } from 'react';
import apiService from '../../../api/apiService';
import { IProgramItem } from '../../../Type';
export enum Register {
  unApproved = 'UnApproved',
  Approved = 'Approved',
}
export type MyCourse = {
  learnerId: number;
  accountIdLearner: number;
  programId: number;
  isRegister: boolean;
  accountIdApprover: number;
  status: string;
  reasonRefusal: string;
  registerStatus: Register;
  comment: string;
  accountIdApproverNavigation: number;
  accountIdLearnerNavigation: number;
};

export default function MyCourse() {
  const [toDoList, setToDoList] = useState<Array<MyCourse>>([]);
  const [program_id, setProgram_id] = useState<IProgramItem>();
  useEffect(() => {
    const fetchMyProgram = async () => {
      const data: any = await apiService.getMyProgram();
      setToDoList(data);
    };
    fetchMyProgram();
  }, [toDoList]);
  return <div></div>;
}
