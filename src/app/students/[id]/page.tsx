import StudentPage from '@/components/Students/StudentPage/StudentPage';
import Page from '@/components/layout/Page/Page';
import { META_DESCRIPTION, META_TITLE } from '@/constants/meta';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
  title: `Студент - ${META_TITLE}`,
  description: META_DESCRIPTION,
};

interface Props {
  params: { id: string };
}

const StudentDetailPage = ({ params }: Props): React.ReactNode => (
  <Page>
    <StudentPage studentId={parseInt(params.id)} />
  </Page>
);

export default StudentDetailPage;