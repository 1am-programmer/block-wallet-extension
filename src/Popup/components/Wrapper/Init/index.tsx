import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { CURRENCY_TYPE, LANGUAGE_TYPE } from '~/constants/chromeStorage';
import { useTranslation } from '~/Popup/hooks/useTranslation';
import { chromeStorageState } from '~/Popup/recoils/chromeStorage';
import { getAllStorage, setStorage } from '~/Popup/utils/chromeStorage';
import { openTab } from '~/Popup/utils/chromeTabs';
import type { LanguageType } from '~/types/chromeStorage';

type InitType = {
  children: JSX.Element;
};

export default function Init({ children }: InitType) {
  const [isLoading, setIsLoading] = useState(true);

  const [chromeStorage, setChromeStorage] = useRecoilState(chromeStorageState);

  const { changeLanguage, language } = useTranslation();

  useEffect(() => {
    chrome.storage.onChanged.addListener(() => {
      void (async function async() {
        setChromeStorage(await getAllStorage());
      })();
    });

    void (async function async() {
      const originChromeStorage = await getAllStorage();

      setChromeStorage(originChromeStorage);

      if (language && !originChromeStorage.currency) {
        const newCurrency = language.startsWith('ko')
          ? CURRENCY_TYPE.KRW
          : language.startsWith('ja')
          ? CURRENCY_TYPE.JPY
          : language.startsWith('zh')
          ? CURRENCY_TYPE.CNY
          : CURRENCY_TYPE.USD;

        await setStorage('currency', newCurrency);
      }

      if (language && !originChromeStorage.language) {
        const languageType = Object.values(LANGUAGE_TYPE) as string[];
        const newLanguage = (languageType.includes(language) ? language : 'en') as LanguageType;
        await changeLanguage(newLanguage);
        await setStorage('language', newLanguage);
      }

      if (!originChromeStorage.theme) {
        const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'DARK' : 'LIGHT';

        await setStorage('theme', theme);
      }

      // if (!chromeStorage.password) {
      //   console.log(chromeStorage);
      //   await openTab();
      //   navigate('/register/password');
      // }

      setIsLoading(false);
    })();

    console.log('init useEffect');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(chromeStorage, undefined, 3));
  }, [chromeStorage]);

  if (isLoading) {
    return null;
  }

  return children;
}