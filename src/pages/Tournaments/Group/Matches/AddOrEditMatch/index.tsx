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
import { useAddMatchMutation, useEditMatchMutation, type Group } from 'services';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AddOrEditMatch({
  open,
  onClose,
  teams,
  match,
  type,
}: {
  open: boolean;
  onClose: () => void;
  teams: Group['teams'];
  match: Group['matches'][number] | null;
  type: 'add' | 'edit';
}) {
  const [editMatch, {
    isLoading: isEditing,
    isSuccess: isEdited,
    reset: resetEditMatch,
  }] = useEditMatchMutation();

  const [addMatch, {
    isLoading: isAdding,
    isSuccess: isAdded,
    reset: resetAddMatch,
  }] = useAddMatchMutation();

  const isLoading = isAdding || isEditing;

  const { groupId } = useParams();

  const [form, setForm] = useState({
    team1Id: '',
    team2Id: '',
    sets: [['', ''], ['', ''], ['', '']],
  });

  const isDisabled = form.team1Id === ''
  || form.team2Id === ''
  || form.sets.some(([score1, score2], index) => {
    const team1Score = score1 === '' ? null : Number(score1);
    const team2Score = score2 === '' ? null : Number(score2);

    if (form.sets.length - 1 === index) {
      return (
        (team1Score === null) !== (team2Score === null)
        || (team1Score ?? 0) < 0
        || (team2Score ?? 0) < 0
      );
    }

    if (
      team1Score === null
      || team2Score === null
      || team1Score < 0
      || team2Score < 0) {
      return true;
    }

    return false;
  });

  const handle = () => {
    const result = form.sets.reduce(
      (acc, set) => {
        const [t1, t2] = set;

        const t1Score = t1 === '' ? null : Number(t1);

        const t2Score = t2 === '' ? null : Number(t2);

        if (t1Score === null || t2Score === null) {
          return acc;
        }

        if (t1Score > t2Score) {
          acc.team1 += 1;
        } else {
          acc.team2 += 1;
        }

        return acc;
      },
      { team1: 0, team2: 0 },
    );

    const winnerId = result.team1 > result.team2
      ? +form.team1Id
      : +form.team2Id;

    if (type === 'add') {
      addMatch({
        groupId: Number(groupId),
        team1Id: +form.team1Id,
        team2Id: +form.team2Id,
        sets: form.sets.map((set) => set.join('-')),
        winnerId,
      });
    } else {
      editMatch({
        matchId: match?.id ?? 0,
        team1Id: +form.team1Id,
        team2Id: +form.team2Id,
        sets: form.sets.map((set) => set.join('-')),
        winnerId,
      });
    }
  };

  useEffect(() => {
    if (match && type === 'edit') {
      setForm({
        team1Id: match.team1Id.toString(),
        team2Id: match.team2Id.toString(),
        sets: match.sets.map((set) => set.split('-')),
      });
    } else {
      setForm({
        team1Id: '',
        team2Id: '',
        sets: [['', ''], ['', ''], ['', '']],
      });
    }
  }, [match, type]);

  useEffect(() => {
    if (isAdded || isEdited) {
      resetAddMatch();

      resetEditMatch();

      setForm({
        team1Id: '',
        team2Id: '',
        sets: [['', ''], ['', ''], ['', '']],
      });

      onClose();
    }
  }, [isAdded, isEdited, resetAddMatch, resetEditMatch, onClose, setForm]);

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
        {type === 'add' ? 'Добавить матч' : 'Редактировать матч'}

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
            <Box sx={{ display: 'flex', gap: 4, mb: 1 }}>
              <Box sx={{
                p: 2,
                border: 1,
                borderRadius: 1,
                borderColor: 'divider',
              }}
              >
                <Typography variant="caption" color="text.secondary">
                  Счет первого сета
                </Typography>

                <Box sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  mt: 1,
                }}
                >
                  <TextField
                    placeholder="0"
                    fullWidth
                    type="number"
                    value={form.sets[0][0]}
                    onChange={(e) => setForm((prev) => {
                      const newSets = [...prev.sets];
                      newSets[0][0] = e.target.value;
                      return { ...prev, sets: newSets };
                    })}
                  />

                  <Box>
                    <Typography variant="body1">
                      -
                    </Typography>
                  </Box>

                  <TextField
                    placeholder="0"
                    fullWidth
                    type="number"
                    value={form.sets[0][1]}
                    onChange={(e) => setForm((prev) => {
                      const newSets = [...prev.sets];
                      newSets[0][1] = e.target.value;
                      return { ...prev, sets: newSets };
                    })}
                  />
                </Box>
              </Box>

              <Box sx={{
                p: 2,
                border: 1,
                borderRadius: 1,
                borderColor: 'divider',
              }}
              >
                <Typography variant="caption" color="text.secondary">
                  Счет второго сета
                </Typography>

                <Box sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  mt: 1,
                }}
                >
                  <TextField
                    placeholder="0"
                    fullWidth
                    type="number"
                    value={form.sets[1][0]}
                    onChange={(e) => setForm((prev) => {
                      const newSets = [...prev.sets];
                      newSets[1][0] = e.target.value;
                      return { ...prev, sets: newSets };
                    })}
                  />

                  <Box>
                    <Typography variant="body1">
                      -
                    </Typography>
                  </Box>

                  <TextField
                    placeholder="0"
                    fullWidth
                    type="number"
                    value={form.sets[1][1]}
                    onChange={(e) => setForm((prev) => {
                      const newSets = [...prev.sets];
                      newSets[1][1] = e.target.value;
                      return { ...prev, sets: newSets };
                    })}
                  />
                </Box>
              </Box>

              <Box sx={{
                p: 2,
                border: 1,
                borderRadius: 1,
                borderColor: 'divider',
              }}
              >
                <Typography variant="caption" color="text.secondary">
                  Счет третьего сета
                </Typography>

                <Box sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  mt: 1,
                }}
                >
                  <TextField
                    placeholder="0"
                    type="number"
                    fullWidth
                    value={form.sets[2][0]}
                    onChange={(e) => setForm((prev) => {
                      const newSets = [...prev.sets];
                      newSets[2][0] = e.target.value;
                      return { ...prev, sets: newSets };
                    })}
                  />

                  <Box>
                    <Typography variant="body1">
                      -
                    </Typography>
                  </Box>

                  <TextField
                    placeholder="0"
                    fullWidth
                    type="number"
                    value={form.sets[2][1]}
                    onChange={(e) => setForm((prev) => {
                      const newSets = [...prev.sets];
                      newSets[2][1] = e.target.value;
                      return { ...prev, sets: newSets };
                    })}
                  />
                </Box>
              </Box>
            </Box>

            <Typography variant="caption" color="text.secondary">
              Оставьте поля третьего сета пустыми, если сет не был сыгран и победа была за 2 сета.
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isDisabled}
            onClick={handle}
            loading={isLoading}
          >
            {type === 'add' ? 'Добавить матч' : 'Сохранить'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddOrEditMatch;
