import { useState } from 'react'

const EXAMPLES = [
  { label: 'find logs',    cmd: `find / -name '*.log' -mtime -7 -exec ls -lh {} \\;` },
  { label: 'kill process', cmd: `ps aux | grep nginx | awk '{print $2}' | xargs kill -9` },
  { label: 'tar backup',   cmd: `tar -czf backup.tar.gz /var/www/html` },
  { label: 'open ports',   cmd: `netstat -tulnp | grep LISTEN` },
  { label: 'disk usage',   cmd: `df -h | awk 'NR>1 {print $5, $6}' | sort -rn` },
  { label: 'sed replace',  cmd: `sed -i 's/old_text/new_text/g' config.yml` },
]

export default function App() {
  const [cmd, setCmd] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  async function explain() {
    if (!cmd.trim()) return
    setLoading(true)
    setOutput('')

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cmd })
      })

      const data = await res.json()
      setOutput(data.result || 'Something went wrong.')
    } catch {
      setOutput('Error connecting. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter') explain()
  }

  function copyOutput() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={styles.page}>
      <div style={styles.gridBg} />

      <div style={styles.wrapper}>
        <header style={styles.header}>
          <span style={styles.badge}>$ linux --explainer v1.0</span>
          <h1 style={styles.h1}>Linux Command<br /><span style={styles.green}>Explainer</span></h1>
          <p style={styles.subtitle}>Paste any command. Understand every part of it instantly.</p>
        </header>

        <div style={styles.card}>
          <label style={styles.inputLabel}>// ENTER COMMAND</label>
          <input
            style={styles.input}
            type="text"
            value={cmd}
            onChange={e => setCmd(e.target.value)}
            onKeyDown={handleKey}
            placeholder="e.g. awk '{print $1}' /var/log/auth.log | sort -u"
          />

          <div style={styles.examples}>
            {EXAMPLES.map(ex => (
              <button
                key={ex.label}
                style={styles.exampleBtn}
                onClick={() => setCmd(ex.cmd)}
              >
                {ex.label}
              </button>
            ))}
          </div>

          <button
            style={{ ...styles.runBtn, opacity: loading ? 0.5 : 1 }}
            onClick={explain}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Explain this command →'}
          </button>
        </div>

        {(loading || output) && (
          <div style={styles.outputCard}>
            <div style={styles.outputHeader}>
              <span style={styles.inputLabel}>// EXPLANATION</span>
              {output && (
                <button style={styles.copyBtn} onClick={copyOutput}>
                  {copied ? 'copied ✓' : 'copy'}
                </button>
              )}
            </div>

            {loading && (
              <div style={styles.loading}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ ...styles.dot, animationDelay: `${i * 0.2}s` }} />
                ))}
                <span style={{ color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
                  analyzing command...
                </span>
              </div>
            )}

            {output && <pre style={styles.outputText}>{output}</pre>}
          </div>
        )}

        <footer style={styles.footer}>
          built by gjarunselvan · powered by groq ai
        </footer>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem 1.5rem',
    position: 'relative',
  },
  gridBg: {
    position: 'fixed',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0,255,157,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,157,0.03) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  wrapper: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: 760,
  },
  header: {
    marginBottom: '3rem',
    textAlign: 'center',
  },
  badge: {
    display: 'inline-block',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: '#00ff9d',
    border: '1px solid #00ff9d',
    padding: '3px 10px',
    borderRadius: 2,
    marginBottom: '1.2rem',
    letterSpacing: '0.1em',
  },
  h1: {
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    color: '#e2e8f0',
  },
  green: { color: '#00ff9d' },
  subtitle: {
    marginTop: '0.75rem',
    color: '#64748b',
    fontSize: 15,
    fontWeight: 400,
  },
  card: {
    background: '#111827',
    border: '1px solid #1e2d40',
    borderRadius: 12,
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  inputLabel: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: '#00ff9d',
    letterSpacing: '0.1em',
    marginBottom: 10,
    display: 'block',
  },
  input: {
    width: '100%',
    background: '#0a0e1a',
    border: '1px solid #1e2d40',
    borderRadius: 8,
    color: '#e2e8f0',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 14,
    padding: '14px 16px',
    outline: 'none',
  },
  examples: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  exampleBtn: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    background: '#00ff9d22',
    color: '#00ff9d',
    border: '1px solid #00ff9d44',
    borderRadius: 4,
    padding: '5px 10px',
    cursor: 'pointer',
  },
  runBtn: {
    width: '100%',
    marginTop: '1rem',
    padding: 14,
    background: '#00ff9d',
    color: '#0a0e1a',
    fontSize: 15,
    fontWeight: 700,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    letterSpacing: '0.03em',
    fontFamily: 'Syne, sans-serif',
  },
  outputCard: {
    background: '#111827',
    border: '1px solid #1e2d40',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: '1.5rem',
  },
  outputHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 1.5rem',
    borderBottom: '1px solid #1e2d40',
    background: '#0d1520',
  },
  copyBtn: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: '#64748b',
    background: 'none',
    border: '1px solid #1e2d40',
    borderRadius: 4,
    padding: '4px 10px',
    cursor: 'pointer',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '1.5rem',
  },
  dot: {
    display: 'inline-block',
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#00ff9d',
    animation: 'pulse 1.2s ease-in-out infinite',
  },
  outputText: {
    padding: '1.5rem',
    fontSize: 15,
    lineHeight: 1.8,
    color: '#e2e8f0',
    whiteSpace: 'pre-wrap',
    fontFamily: 'Syne, sans-serif',
  },
  footer: {
    marginTop: '2rem',
    textAlign: 'center',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    color: '#64748b',
  },
}
