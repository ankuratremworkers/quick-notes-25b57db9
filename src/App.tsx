import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import { listNotes, type Note } from './api';
import { NewNoteCard } from './components/NewNoteCard';
import { NoteCard } from './components/NoteCard';

// Root component. Clean, minimal, single-page.
export function App() {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listNotes()
      .then((data) => {
        if (!cancelled) setNotes(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : 'Failed to load notes');
        setNotes([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleCreated(created: Note) {
    setNotes((prev) => (prev ? [created, ...prev] : [created]));
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="sm" sx={{ py: { xs: 5, sm: 8 } }}>
        <Box sx={{ mb: { xs: 5, sm: 7 } }}>
          <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
            Notes
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            A shared notebook. Anything you add is visible to everyone.
          </Typography>
        </Box>

        <Box sx={{ mb: { xs: 5, sm: 6 } }}>
          <NewNoteCard onCreated={handleCreated} />
        </Box>

        {notes === null ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress size={24} />
          </Box>
        ) : notes.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              color: 'text.secondary',
            }}
          >
            <Typography variant="body1">
              {loadError
                ? `Couldn't load notes: ${loadError}`
                : 'No notes yet — write the first one above.'}
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2.5}>
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
