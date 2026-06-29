'use client'

import { useId, useState, type CSSProperties, type ReactNode } from 'react'
import { ProjectCard, Tag, UploadIcon } from '@/components'
import { PROJECT_TYPES, DRAFT_PROJECT, type ProjectType } from '@/data/creator'

/**
 * ProjectBuilder — the off-chain metadata builder. The form on the left writes
 * straight into a live ProjectCard preview on the right, so a creator sees the
 * exact card investors will see while they type. Scores read "pending" until the
 * oracle verifies, so the preview never implies a number we have not earned yet.
 */
export function ProjectBuilder() {
  const [name, setName] = useState(DRAFT_PROJECT.name)
  const [location, setLocation] = useState(DRAFT_PROJECT.location)
  const [type, setType] = useState<ProjectType>(DRAFT_PROJECT.type)
  const [story, setStory] = useState(DRAFT_PROJECT.story)
  const [fundingGoal, setFundingGoal] = useState(String(DRAFT_PROJECT.fundingGoal))
  const goalErrorId = useId()

  // The raw input is sanitised to digits + a single decimal point on change, so
  // free text can never reach here. We still validate: empty, non-numeric, and
  // non-positive goals are all invalid and explained inline instead of silently
  // rendering "$0 of $0" in the preview.
  const trimmedGoal = fundingGoal.trim()
  const parsedGoal = trimmedGoal === '' ? NaN : Number(trimmedGoal)
  const goalIsValid = Number.isFinite(parsedGoal) && parsedGoal > 0
  const goalError = goalIsValid
    ? null
    : trimmedGoal === ''
      ? 'Enter a funding goal so investors know the target.'
      : 'Enter a funding goal greater than $0 — numbers only.'
  const goalLabel = goalIsValid
    ? `$0 of $${parsedGoal.toLocaleString('en-US')}`
    : 'awaiting funding'

  // Keep only digits and a single decimal point; drop everything else as typed.
  const handleGoalChange = (raw: string) => {
    const cleaned = raw.replace(/[^0-9.]/g, '')
    const firstDot = cleaned.indexOf('.')
    const normalized =
      firstDot === -1
        ? cleaned
        : cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '')
    setFundingGoal(normalized)
  }

  return (
    <div
      style={{
        display: 'grid',
        gap: 24,
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
        alignItems: 'start',
      }}
    >
      {/* Left — the form */}
      <Card>
        <h3 style={cardTitle}>Project details</h3>
        <p style={{ ...subtle, margin: '0 0 20px' }}>
          This metadata lives off-chain and links to your on-chain registry entry.
        </p>

        <Field label="Project name" htmlFor="hb-name">
          <input
            id="hb-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Location" htmlFor="hb-bloc">
          <input
            id="hb-bloc"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <div style={{ marginBottom: 18 }}>
          <Label>Project type</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PROJECT_TYPES.map((t) => (
              <Tag key={t} selected={type === t} onClick={() => setType(t)}>
                {t}
              </Tag>
            ))}
          </div>
        </div>

        <Field label="Project story" htmlFor="hb-story">
          <textarea
            id="hb-story"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={4}
            style={{
              ...inputStyle,
              height: 'auto',
              padding: '12px 14px',
              lineHeight: 1.5,
              resize: 'vertical',
            }}
          />
        </Field>

        <Field label="Funding goal" htmlFor="hb-goal">
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'var(--font-data)',
                fontSize: 'var(--type-data)',
                color: 'var(--ink-60)',
              }}
            >
              $
            </span>
            <input
              id="hb-goal"
              type="text"
              inputMode="decimal"
              value={fundingGoal}
              onChange={(e) => handleGoalChange(e.target.value)}
              aria-invalid={goalError != null}
              aria-describedby={goalError ? goalErrorId : undefined}
              style={{
                ...inputStyle,
                paddingLeft: 28,
                fontFamily: 'var(--font-data)',
                fontFeatureSettings: '"tnum" 1',
                borderColor: goalError ? 'var(--ember)' : 'var(--ink-12)',
              }}
            />
          </div>
          {goalError && (
            <p
              id={goalErrorId}
              role="alert"
              style={{
                margin: '8px 0 0',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-caption)',
                color: 'var(--ember)',
              }}
            >
              {goalError}
            </p>
          )}
        </Field>

        <Label>Media and documents</Label>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
          <DropZone
            label="Cover photo"
            hint="PNG or JPG, shown on your card"
            accept="image/png,image/jpeg"
          />
          <DropZone label="Verification docs" hint="Permits, PPAs, metering plan" multiple />
        </div>
      </Card>

      {/* Right — the live preview */}
      <div
        style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--solar)',
              border: '1px solid var(--ink)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-caption)',
              fontWeight: 600,
              color: 'var(--ink)',
            }}
          >
            Live preview
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-caption)',
              color: 'var(--ink-60)',
            }}
          >
            — updates as you type
          </span>
        </div>

        <ProjectCard
          name={name || 'Your project name'}
          location={location || 'Add a location'}
          credit={0}
          green={0}
          funded={goalLabel}
          verifiedAgo="pending"
        />

        <p style={{ ...subtle, margin: 0 }}>
          Credit and green scores show as pending until the oracle verifies your project. The{' '}
          {type.toLowerCase()} type and your story travel with this card across the atlas.
        </p>
      </div>
    </div>
  )
}

function DropZone({
  label,
  hint,
  accept,
  multiple = false,
}: {
  label: string
  hint: string
  accept?: string
  multiple?: boolean
}) {
  const inputId = useId()
  const hintId = `${inputId}-hint`
  const [isFocused, setIsFocused] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState('')

  return (
    <label
      htmlFor={inputId}
      style={{
        position: 'relative',
        border: '1px dashed var(--ink-12)',
        borderRadius: 'var(--radius-card)',
        background: 'var(--ink-06)',
        padding: '20px 16px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        cursor: 'pointer',
        outline: isFocused ? '2px solid var(--solar)' : 'none',
        outlineOffset: 3,
      }}
    >
      <input
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        aria-describedby={hintId}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? [])
          setSelectedFiles(
            files.length === 0
              ? ''
              : files.length === 1
                ? files[0].name
                : `${files.length} files selected`,
          )
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer',
        }}
      />
      <UploadIcon style={{ color: 'var(--ink)' }} />
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--type-caption)',
          fontWeight: 600,
          color: 'var(--ink)',
        }}
      >
        {label}
      </div>
      <div
        id={hintId}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--type-eyebrow)',
          color: 'var(--ink-60)',
          lineHeight: 1.4,
        }}
      >
        {selectedFiles || hint}
      </div>
    </label>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}

function Label({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: 'block',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--type-caption)',
        fontWeight: 600,
        color: 'var(--ink)',
        marginBottom: 8,
      }}
    >
      {children}
    </label>
  )
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--ink-12)',
        borderRadius: 'var(--radius-card)',
        padding: 24,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {children}
    </div>
  )
}

const cardTitle: CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'var(--type-h5)',
  margin: '0 0 8px',
  color: 'var(--ink)',
  letterSpacing: '-0.01em',
}
const subtle: CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--type-small)',
  lineHeight: 1.5,
  color: 'var(--ink-60)',
}
const inputStyle: CSSProperties = {
  width: '100%',
  height: 44,
  padding: '0 14px',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--type-data)',
  color: 'var(--ink)',
  background: 'var(--surface)',
  border: '1px solid var(--ink-12)',
  borderRadius: 'var(--radius-input)',
  outline: 'none',
  boxSizing: 'border-box',
}
