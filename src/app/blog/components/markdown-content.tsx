'use client'

import { useMemo } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface MarkdownContentProps {
  content: string
}

interface TableData {
  headers: string[]
  rows: string[][]
}

interface ContentBlock {
  type: 'h2' | 'h3' | 'paragraph' | 'list' | 'numbered-list' | 'blockquote' | 'table' | 'divider'
  content: string
  id?: string
  items?: string[]
  table?: TableData
}

// Helper to create URL-friendly ID from heading text
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Parse content into blocks
  const blocks = useMemo<ContentBlock[]>(() => {
    if (!content || typeof content !== 'string') {
      return []
    }
    const lines = content.trim().split('\n')
    const result: ContentBlock[] = []
    let currentList: string[] = []
    let currentNumberedList: string[] = []
    let currentParagraph = ''

    const flushParagraph = () => {
      if (currentParagraph.trim()) {
        result.push({ type: 'paragraph', content: currentParagraph.trim() })
        currentParagraph = ''
      }
    }

    const flushList = () => {
      if (currentList.length > 0) {
        result.push({ type: 'list', content: '', items: [...currentList] })
        currentList = []
      }
    }

    const flushNumberedList = () => {
      if (currentNumberedList.length > 0) {
        result.push({ type: 'numbered-list', content: '', items: [...currentNumberedList] })
        currentNumberedList = []
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmedLine = line.trim()

      // Divider ---
      if (trimmedLine === '---') {
        flushParagraph()
        flushList()
        flushNumberedList()
        result.push({ type: 'divider', content: '' })
        continue
      }

      // Table detection (starts with |)
      if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
        flushParagraph()
        flushList()
        flushNumberedList()
        
        // Collect all table lines
        const tableLines: string[] = [trimmedLine]
        while (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim()
          if (nextLine.startsWith('|') && nextLine.endsWith('|')) {
            tableLines.push(nextLine)
            i++
          } else {
            break
          }
        }
        
        // Parse table
        if (tableLines.length >= 2) {
          const parseRow = (row: string) => 
            row.split('|').slice(1, -1).map(cell => cell.trim())
          
          const headers = parseRow(tableLines[0])
          const rows: string[][] = []
          
          // Skip separator row (contains ---)
          for (let j = 1; j < tableLines.length; j++) {
            if (!tableLines[j].includes('---')) {
              rows.push(parseRow(tableLines[j]))
            }
          }
          
          result.push({ type: 'table', content: '', table: { headers, rows } })
        }
        continue
      }

      // Blockquote
      if (trimmedLine.startsWith('> ')) {
        flushParagraph()
        flushList()
        flushNumberedList()
        result.push({ type: 'blockquote', content: trimmedLine.slice(2) })
        continue
      }

      // H2 heading
      if (trimmedLine.startsWith('## ')) {
        flushParagraph()
        flushList()
        flushNumberedList()
        const headingText = trimmedLine.slice(3)
        result.push({ type: 'h2', content: headingText, id: createSlug(headingText) })
        continue
      }

      // H3 heading (including numbered ones like "### 1. Title")
      if (trimmedLine.startsWith('### ')) {
        flushParagraph()
        flushList()
        flushNumberedList()
        let headingText = trimmedLine.slice(4)
        // Remove leading numbers like "1. " from heading text for cleaner display
        headingText = headingText.replace(/^\d+\.\s*/, '')
        result.push({ type: 'h3', content: headingText, id: createSlug(headingText) })
        continue
      }

      // Bullet list item (including nested with bold labels)
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        flushParagraph()
        flushNumberedList()
        currentList.push(trimmedLine.slice(2))
        continue
      }

      // Numbered list item
      if (/^\d+\.\s/.test(trimmedLine)) {
        flushParagraph()
        flushList()
        currentNumberedList.push(trimmedLine.replace(/^\d+\.\s/, ''))
        continue
      }

      // Empty line
      if (!trimmedLine) {
        flushList()
        flushNumberedList()
        flushParagraph()
        continue
      }

      // Regular text - add to paragraph
      flushList()
      flushNumberedList()
      currentParagraph += (currentParagraph ? ' ' : '') + trimmedLine
    }

    // Flush remaining content
    flushParagraph()
    flushList()
    flushNumberedList()

    return result
  }, [content])

  const formatText = (text: string): React.ReactNode[] => {
    // Handle links [text](url), bold **text**, and inline code `code`
    const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g
    const result: React.ReactNode[] = []
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        result.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, match.index)}</span>)
      }

      if (match[2] && match[3]) {
        // Link: [text](url)
        result.push(
          <a 
            key={`link-${match.index}`} 
            href={match[3]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {match[2]}
          </a>
        )
      } else if (match[4]) {
        // Bold: **text**
        result.push(<strong key={`bold-${match.index}`} className="text-foreground font-semibold">{match[4]}</strong>)
      } else if (match[5]) {
        // Inline code: `code`
        result.push(<code key={`code-${match.index}`} className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">{match[5]}</code>)
      }

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      result.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>)
    }

    return result.length > 0 ? result : [<span key="empty">{text}</span>]
  }

  if (blocks.length === 0) {
    return <p className="text-foreground/60">No content available.</p>
  }

  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 
                key={index}
                id={block.id}
                className="text-xl md:text-2xl font-semibold text-foreground mt-10 first:mt-0 mb-4 pb-2 border-b border-border/50 scroll-mt-24"
              >
                {formatText(block.content)}
              </h2>
            )

          case 'h3':
            return (
              <h3 
                key={index}
                id={block.id}
                className="text-lg md:text-xl font-medium text-foreground mt-6 mb-3 flex items-center gap-2 scroll-mt-24"
              >
                <span className="w-1 h-5 bg-primary rounded-full flex-shrink-0" />
                <span>{formatText(block.content)}</span>
              </h3>
            )

          case 'paragraph':
            return (
              <p 
                key={index} 
                className="text-foreground/80 leading-relaxed text-base"
              >
                {formatText(block.content)}
              </p>
            )

          case 'list':
            return (
              <ul key={index} className="space-y-2.5 my-4 pl-1">
                {block.items?.map((item, i) => (
                  <li 
                    key={i} 
                    className="flex items-start gap-3 text-foreground/80"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{formatText(item)}</span>
                  </li>
                ))}
              </ul>
            )

          case 'numbered-list':
            return (
              <ol key={index} className="space-y-2.5 my-4 pl-1">
                {block.items?.map((item, i) => (
                  <li 
                    key={i} 
                    className="flex items-start gap-3 text-foreground/80"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{formatText(item)}</span>
                  </li>
                ))}
              </ol>
            )

          case 'blockquote':
            return (
              <blockquote 
                key={index} 
                className="border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r-lg italic text-foreground/80"
              >
                {formatText(block.content)}
              </blockquote>
            )

          case 'table':
            return (
              <div key={index} className="my-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary/10">
                      {block.table?.headers.map((header, i) => (
                        <th key={i} className="border border-border px-4 py-3 text-left font-semibold text-foreground">
                          {formatText(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.table?.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-muted/30' : 'bg-transparent'}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="border border-border px-4 py-3 text-foreground/80">
                            {formatText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case 'divider':
            return <hr key={index} className="my-8 border-border" />

          default:
            return null
        }
      })}
    </div>
  )
}
