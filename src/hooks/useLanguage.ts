import {useContext} from 'react';
import {LanguageContext} from '../context/LanguageContext';
import {languages} from '../helpers/translate';

function useLanguage() {
  const {language} = useContext(LanguageContext);
  return (text: string) => {
    let lang = languages[language];
    return lang[text as keyof typeof lang] || text;
  };
}
// languages[language][text] || text
export default useLanguage;
