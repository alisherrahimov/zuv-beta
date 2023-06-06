import React, {createContext, ReactElement, useState} from 'react';
import {LangEnums} from '../helpers/translate';
import {storage} from '../helpers/dataStorage';

interface LanguageContextInterface {
  language: string;
  setLanguage?: (a: LangEnums) => void;
}

export const LanguageContext = createContext<LanguageContextInterface>({
  language: LangEnums.UZ,
});

function LanguageProvider({children}: {children: ReactElement}) {
  const initialLanguage = LangEnums.UZ;
  let lang = storage.getString('lang') ?? initialLanguage;

  const [language, setLanguage] = useState(lang);

  return (
    <LanguageContext.Provider value={{language, setLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
