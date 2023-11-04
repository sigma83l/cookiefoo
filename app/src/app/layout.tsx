'use client'
import React, { useEffect } from 'react';
import i18n from '../../i18n';
import { I18nextProvider } from 'react-i18next';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/logo7.jpeg';
import styles from './page.module.css';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import Logo from '../../public/images/logo7.ico';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const { t } = useTranslation();
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    // setLanguage(selectedLanguage);
    // i18n.changeLanguage(selectedLanguage).then(() => {
    //   console.log(i18n.language); // This will show the updated language
    // });
    console.log(i18n.language)
  };

  return (
      <I18nextProvider i18n={i18n}>
        <Head>
            <title>Cookie Foo</title>
            <Link rel="icon" href="/assets/products/logo7.ico" />
            
        </Head>
          <nav className="header-wrapper">
              <Link className={'header-links'} href="/products">{t('PRODUCTS')}</Link>
              <Link className={'header-links'} href="/blog">{t('BLOG')}</Link>
              <Link className={'header-links'} href="/contact">{t('CONTACT')}</Link>
              <Link className={'header-links'} href="/users/signin">{t('SIGNIN/LOGIN')}</Link>
              <select
                value={i18n.language}
                onChange={handleLanguageChange}
              >
                <option value="en">en</option>
                <option value="fa">fa</option>
              </select>
              <div className='more-button'>
              </div>
            <Link href="/">
              <Image
                alt="cookie foo"
                src={logo}
                height={100}
                width={100}
                className={'logo-image'}
              />
            </Link>
            {/* <Image
            alt='OKEY'
            src={"http://localhost:3000/assets/products/img1.jpeg"}
            height={200}
            width={200}
            /> */}
          </nav>
          <main className={styles.main}>
            {children}
          </main>
          <footer>
          <div className="social-icons">
            <a href="#" target="_blank">Facebook</a>
            <a href="#" target="_blank">Twitter</a>
            <a href="#" target="_blank">Instagram</a>
          </div>

          <div className="copyright">
            &copy; 2023 Your Website Name. All rights reserved.
          </div>
        </footer>
      </I18nextProvider>
  );
}