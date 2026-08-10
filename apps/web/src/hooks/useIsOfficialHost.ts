import { useEffect, useLayoutEffect, useState } from 'react'
import { IPFS_HOSTS, IS_OFFICIAL_HOST, OFFICIAL_HOSTS } from '@/config/constants'
import { APP_VERSION } from '@/config/version'
import useAsync from '@safe-global/utils/hooks/useAsync'

/** Runs layout effects on the client so hostname is synced before passive effects (e.g. terms redirect). */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const GITHUB_API_URL = 'https://api.github.com/repos/5afe/safe-wallet-ipfs/releases/tags'

async function getGithubRelease(version: string) {
  const resp = await fetch(`${GITHUB_API_URL}/v${version}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  })
  if (!resp.ok) return false
  return await resp.json()
}

async function isOfficialIpfs(): Promise<boolean> {
  const data = await getGithubRelease(APP_VERSION)
  return data.body.includes(window.location.host)
}

function isIpfs() {
  return IPFS_HOSTS.test(window.location.host)
}

export const useIsOfficialHost = (): boolean => {
  // Use IS_OFFICIAL_HOST as initial value to match server-side rendering
  const [isOfficialHost, setIsOfficialHost] = useState(IS_OFFICIAL_HOST)

  useIsomorphicLayoutEffect(() => {
    setIsOfficialHost(IS_OFFICIAL_HOST && OFFICIAL_HOSTS.test(window.location.host))
  }, [])

  const [isTrustedIpfs = false] = useAsync<boolean>(() => {
    if (isOfficialHost || !isIpfs()) return
    return isOfficialIpfs()
  }, [isOfficialHost])

  return isOfficialHost || isTrustedIpfs
}
