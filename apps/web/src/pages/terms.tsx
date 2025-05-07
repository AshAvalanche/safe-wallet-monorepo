import CustomLink from '@/components/common/CustomLink'
import type { NextPage } from 'next'
import Head from 'next/head'
import SafeTerms from '@/markdown/terms/terms.md'
import type { MDXComponents } from 'mdx/types'
import { BRAND_NAME } from '@/config/constants'

const overrideComponents: MDXComponents = {
  // @ts-expect-error
  a: CustomLink,
}

const Terms: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`${BRAND_NAME} – Terms`}</title>
      </Head>

      <main>
        <SafeTerms components={overrideComponents} />
      </main>
    </>
  )
}

export default Terms
