/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAddMatchMutation, type Group } from 'services';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AddMatch({
  open,
  onClose,
  teams,
}: {
  open: boolean;
  onClose: () => void;
  teams: Group['teams'];
}) {
  const { groupId } = useParams();

  const [form, setForm] = useState({
    team1Id: '',
    team2Id: '',
    sets: ['', '', ''],
  });

  const isValidSet = (set: string) => /^(\d{1,2}-\d{1,2})$/.test(set);

  const isSetsValid = form.sets.every((set, index) => {
    if (index === form.sets.length - 1 && set === '') return true;

    return isValidSet(set);
  });

  const isDisabled = form.team1Id === ''
    || form.team2Id === ''
    || !isSetsValid;

  const [addMatch, { isLoading, isSuccess, reset }] = useAddMatchMutation();

  const handleAddMatch = () => {
    const result = form.sets.reduce(
      (acc, set) => {
        if (!set) return acc;

        const [p1, p2] = set.split('-').map(Number);

        if (p1 > p2) {
          acc.player1 += 1;
        } else {
          acc.player2 += 1;
        }

        return acc;
      },
      { player1: 0, player2: 0 },
    );

    const winnerId = result.player1 > result.player2
      ? +form.team1Id
      : +form.team2Id;

    addMatch({
      groupId: Number(groupId),
      team1Id: +form.team1Id,
      team2Id: +form.team2Id,
      sets: form.sets,
      winnerId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      reset();

      setForm({
        team1Id: '',
        team2Id: '',
        sets: ['', '', ''],
      });

      onClose();
    }
  }, [isSuccess, reset, onClose, setForm]);

  return (
    <Dialog
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '900px',
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
      >
        Добавить матч

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box py={1}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Команда 1</InputLabel>
            <Select
              label="Команда 1"
              value={form.team1Id}
              onChange={(e) => setForm({ ...form, team1Id: e.target.value })}
            >
              {teams.map((team) => (
                <MenuItem
                  key={team.id}
                  value={team.id}
                  disabled={team.id === +form.team2Id}
                >
                  {team.player1.firstName}
                  {' '}
                  {team.player1.lastName}
                  {' и '}
                  {team.player2.firstName}
                  {' '}
                  {team.player2.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Команда 2</InputLabel>
            <Select
              label="Команда 2"
              value={form.team2Id}
              onChange={(e) => setForm({ ...form, team2Id: e.target.value })}
            >
              {teams.map((team) => (
                <MenuItem
                  key={team.id}
                  value={team.id}
                  disabled={team.id === +form.team1Id}
                >
                  {team.player1.firstName}
                  {' '}
                  {team.player1.lastName}
                  {' и '}
                  {team.player2.firstName}
                  {' '}
                  {team.player2.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box mb={2}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="0-0"
                fullWidth
                label="Счет первого сета"
                value={form.sets[0]}
                onChange={(e) => setForm((prev) => {
                  const newSets = [...prev.sets];

                  newSets[0] = e.target.value;

                  return { ...prev, sets: newSets };
                })}
              />

              <TextField
                placeholder="0-0"
                fullWidth
                label="Счет второго сета"
                value={form.sets[1]}
                onChange={(e) => setForm((prev) => {
                  const newSets = [...prev.sets];

                  newSets[1] = e.target.value;

                  return { ...prev, sets: newSets };
                })}
              />

              <TextField
                placeholder="0-0"
                fullWidth
                label="Счет третьего сета"
                value={form.sets[2]}
                onChange={(e) => setForm((prev) => {
                  const newSets = [...prev.sets];

                  newSets[2] = e.target.value;

                  return { ...prev, sets: newSets };
                })}
              />
            </Box>

            <Typography mt={1} variant="caption" color="text.secondary">
              Оставьте поле пустым, если сет не был сыгран и победа была за 2 сета.
              Пример для ввода  в поле 1-6
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isDisabled}
            onClick={handleAddMatch}
            loading={isLoading}
          >
            Добавить матч
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddMatch;
