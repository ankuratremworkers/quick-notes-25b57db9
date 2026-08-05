import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { createNote, type Note } from '../api';

interface NewNoteCardProps {
  onCreated: (note: Note) => void;
}

// The "compose" card at the top of the page. Title is optional; body is required.
export function NewNoteCard({ onCreated }: NewNoteCardProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = body.trim().length > 0 && !submitting;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const created = await createNote({
        title: title.trim() || undefined,
        body: body.trim(),
      });
      onCreated(created);
      setTitle('');
      setBody('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2.5 }}>
        New note
      </Typography>
      <Stack spacing={2.5}>
        <TextField
          label="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ maxLength: 200 }}
          fullWidth
          size="small"
        />
        <TextField
          label="Write a note…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          multiline
          minRows={4}
          fullWidth
          required
        />
        {error && (
          <Alert severity="error" sx={{ borderRadius: 1.5 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!canSubmit}
            sx={{ minWidth: 120 }}
          >
            {submitting ? 'Adding…' : 'Add note'}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
