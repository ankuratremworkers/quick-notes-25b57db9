import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import type { Note } from '../api';

interface NoteCardProps {
  note: Note;
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diffSec = Math.round((Date.now() - then) / 1000);
  if (diffSec < 5) return 'just now';
  if (diffSec < 60) return `${diffSec} seconds ago`;
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 30) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
  return new Date(iso).toLocaleDateString();
}

// Derive a header when the note has no explicit title — use the first non-empty
// line of the body so the list is still scannable.
function headerFor(note: Note): { header: string; showBody: boolean } {
  if (note.title.trim()) {
    return { header: note.title.trim(), showBody: true };
  }
  const firstLine = note.body.split('\n').find((l) => l.trim().length > 0) ?? '';
  const trimmed = firstLine.trim();
  // If the whole body is basically that first line, don't repeat it below.
  const rest = note.body.replace(firstLine, '').trim();
  return { header: trimmed || 'Untitled', showBody: rest.length > 0 };
}

export function NoteCard({ note }: NoteCardProps) {
  const { header, showBody } = headerFor(note);

  return (
    <Paper
      sx={{
        p: { xs: 3, sm: 3.5 },
        borderRadius: 2,
        transition: 'border-color 120ms ease',
        '&:hover': { borderColor: 'rgba(28, 27, 26, 0.18)' },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: showBody ? 1 : 0,
          wordBreak: 'break-word',
        }}
      >
        {header}
      </Typography>
      {showBody && (
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: 'text.primary',
          }}
        >
          {note.body}
        </Typography>
      )}
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {relativeTime(note.created_at)}
        </Typography>
      </Box>
    </Paper>
  );
}
