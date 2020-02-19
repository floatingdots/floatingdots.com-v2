import {Link} from 'gatsby'
import React, {useContext} from 'react'
import {AlternateLinksContext} from '../layout/wrapWithI18nProvider'
import {useTranslation} from 'react-i18next'

const LangSwitcher = () => {
  const alternateLinks = useContext(AlternateLinksContext)
  const {t, i18n} = useTranslation(['common', 'home'])

  return (
    <div>
      {alternateLinks &&
      alternateLinks
        // .filter(link => link.language !== i18n.language)
        .map((link, i) => [
          i > 0 && ' | ',
          <Link
            key={link}
            to={link.path}
            style={{
              color: `red`,
              textDecoration: `none`
            }}
            hrefLang={link.language}
            onClick={() => { window.localStorage.setItem('lang', link.language) }}
          >
            {t(link.language)}
          </Link>
        ])}
    </div>
  )
}

LangSwitcher.propTypes = {}
LangSwitcher.defaultProps = {}

export default LangSwitcher
