import Link from "next/link";
import Image from 'next/image';

import styles from './header.module.scss'

export default function Header() {
  return(
    <header className={styles.postHeader}>
      <Link href="/">
        <a>
          <Image src="/logo.svg" alt='logo' width="239" height="27" />
        </a>
      </Link>
    </header>
  )
}
