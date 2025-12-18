import { deleteStudentDb, getStudentDb } from '@/db/studentDb';
import { NextRequest } from 'next/server';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params): Promise<Response> {
  const { id } = await params;
  const studentId = parseInt(id);
  const student = await getStudentDb(studentId);

  return new Response(JSON.stringify(student), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function DELETE(req: NextRequest, { params }: Params): Promise<Response> {
  const { id } = await params;
  const studentId = parseInt(id);
  const deletedStudentId = await deleteStudentDb(studentId);

  return new Response(JSON.stringify({ deletedStudentId }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
