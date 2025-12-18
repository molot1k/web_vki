'use client';

import Link from 'next/link';
import styles from './BackNavigation.module.scss';

interface Props {
  href: string;
  text: string;
}

const BackNavigation = ({ href, text }: Props): React.ReactElement => {
  return (
    <div className={styles.BackNavigation}>
      <Link href={href} className={styles.link}>
        ← {text}
      </Link>
    </div>
  );
};

export default BackNavigation;