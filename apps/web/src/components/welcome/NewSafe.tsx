import React from 'react'
import { Grid, SvgIcon, Typography } from '@mui/material'
import css from './styles.module.css'
import CheckFilled from '@/public/images/common/check-filled.svg'

import WelcomeLogin from './WelcomeLogin'
import ExternalLink from '../common/ExternalLink'

const BulletListItem = ({ text }: { text: string }) => (
  <li>
    <SvgIcon className={css.checkIcon} component={CheckFilled} inheritViewBox />
    <Typography
      sx={{
        color: 'static.main',
        fontWeight: 700,
      }}
    >
      {text}
    </Typography>
  </li>
)

const NewSafe = () => {
  return (
    <>
      <Grid
        container
        spacing={3}
        direction="row-reverse"
        sx={{
          p: 3,
          pb: 0,
          flex: 1,
        }}
      >
        <Grid item xs={12} lg={6}>
          <WelcomeLogin />
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            flex: 1,
          }}
        >
          <div className={css.content}>
            <Typography
              variant="h1"
              sx={{
                fontSize: [44, null, 52],
                lineHeight: 1,
                letterSpacing: -1.5,
                color: 'static.main',
              }}
            >
              Ash Wallet - Safe for Avalanche L1s
            </Typography>

            <Typography mb={1} color="static.main">
              {
                'Ash Wallet is a shared infrastructure aimed at bringing all the features of Safe to the Avalanche L1s ecosystem.'
              }{' '}
              <br></br>
              Read the official announcement{' '}
              <ExternalLink
                href="https://ashavax.hashnode.dev/announcing-ash-wallet-for-avalanche-l1s"
                noIcon
                sx={{ span: { textDecoration: 'underline' } }}
                color="#000000"
              >
                here
              </ExternalLink>
              .
            </Typography>

            <ul className={css.bulletList}>
              <li>
                <SvgIcon className={css.checkIcon} component={CheckFilled} inheritViewBox />
                <Typography color="static.main" fontWeight={700}>
                  All the features of{' '}
                  <ExternalLink
                    href="https://safe.global/"
                    noIcon
                    sx={{ span: { textDecoration: 'underline' } }}
                    color="#000000"
                  >
                    Safe
                  </ExternalLink>
                </Typography>
              </li>
              <BulletListItem text="Hosted indexing and Ash Wallet for Avalanche L1s" />
              <li>
                <SvgIcon className={css.checkIcon} component={CheckFilled} inheritViewBox />
                <Typography color="static.main" fontWeight={700}>
                  Made with 🖤 by{' '}
                  <ExternalLink
                    href="https://ash.center"
                    noIcon
                    sx={{ span: { textDecoration: 'underline' } }}
                    color="#000000"
                  >
                    Ash
                  </ExternalLink>
                </Typography>
              </li>
              <li>
                <SvgIcon className={css.checkIcon} component={CheckFilled} inheritViewBox />
                <Typography color="static.main" fontWeight={700}>
                  Fill out this{' '}
                  <ExternalLink
                    href="https://forms.gle/x9mwwTeHEjSsp1yE9"
                    noIcon
                    sx={{ span: { textDecoration: 'underline' } }}
                    color="#000000"
                  >
                    form
                  </ExternalLink>{' '}
                  to get your Avalanche L1 indexed
                </Typography>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default NewSafe
