import MarkdownToJSX from 'markdown-to-jsx'
import { Fragment, memo } from 'react'

import { CodeBlock } from '@/components/ui/code-block'
import { Link } from '@/components/ui/link'
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type MarkdownProps = {
  children: string
}

const Markdown = memo((props: MarkdownProps) => {
  const { children } = props

  return (
    <div className='my-3 prose ml-0.5'>
      <MarkdownToJSX
        options={{
          overrides: {
            a: Link,
            pre: CodeBlock,
            table: Table,
            thead: TableHeader,
            tr: TableRow,
            th: TableHead,
            td: TableCell,
          },
          disableParsingRawHTML: true,
          wrapper: Fragment,
        }}
      >
        {children}
      </MarkdownToJSX>
    </div>
  )
})

Markdown.displayName = 'Markdown'

export default Markdown
