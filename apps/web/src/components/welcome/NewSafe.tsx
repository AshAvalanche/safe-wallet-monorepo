import React from 'react'
import { Typography, Link, Box } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import css from './styles.module.css'
import WelcomeLogin from './WelcomeLogin'
import SafeLabsLogo from '@/public/images/logo-safe-labs.svg'
import footerCss from './welcomeFooter.module.css'
import Footer from '../common/Footer'

const NewSafe = () => {
  return (
    <div className={css.loginPage}>
      <div className={css.leftSide}>
        <div className={css.logoContainer}>
          <SafeLabsLogo className={css.logo} />
        </div>
        <div className={css.loginContainer}>
          <WelcomeLogin />
        </div>
        <Footer forceShow versionIcon={false} helpCenter={false} preferences={false} className={footerCss.footer} />
      </div>

      <div className={css.rightSide}>
        <div className={css.rightContent}>
          <Typography className={css.mainTitle}>Ash Wallet – Safe for Avalanche L1s</Typography>
          <br></br>
          <Typography className={css.label}>
            Ash Wallet is a shared infrastructure bringing all the features of Safe to the Avalanche L1s ecosystem.
          </Typography>
          <Typography className={css.label}>
            Read the official announcement{' '}
            <Link href="https://suzaku.network/blog/announcing-ash-wallet" color="inherit" sx={{ textDecoration: 'underline' }}>
              here
            </Link>
            .
          </Typography>
          <Box sx={{ mt: 4, textAlign: 'left' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CheckCircle sx={{ color: '#000', fontSize: 20, mr: 1 }} />
              <Typography className={css.label}>
                All the features of{' '}
                <Link href="https://safe.global/" color="inherit" sx={{ textDecoration: 'underline' }}>
                  Safe
                </Link>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CheckCircle sx={{ color: '#000', fontSize: 20, mr: 1 }} />
              <Typography className={css.label}>Hosted indexing and Ash Wallet for Avalanche L1s</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CheckCircle sx={{ color: '#000', fontSize: 20, mr: 1 }} />
              <Typography className={css.label}>
                Read the {' '}
                <Link href="https://ash.center/docs/ash-wallet" color="inherit" sx={{ textDecoration: 'underline' }}>
                  docs
                </Link>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CheckCircle sx={{ color: '#000', fontSize: 20, mr: 1 }} />
              <Typography className={css.label}>
                Made with 🖤 by{' '}
                <Link href="https://suzaku.network" color="inherit" sx={{ textDecoration: 'underline' }}>
                  Suzaku
                </Link>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle sx={{ color: '#000', fontSize: 20, mr: 1 }} />
              <Typography className={css.label}>
                Fill out this{' '}
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfs_d-otuz7e50lvyLgoM6kFjr8QFkRKqSWolvzMMpVTI-N8w/viewform" color="inherit" sx={{ textDecoration: 'underline' }}>
                  form
                </Link>{' '}
                to get your Avalanche L1 indexed
              </Typography>
            </Box>
          </Box>
        </div>
        <div className={css.mockupImageContainer}>
          <img src="/images/welcome/safe-mockup.png" alt="Safe interface mockup" className={css.mockupImage} />
        </div>
      </div>
    </div>
  )
}

export default NewSafe
