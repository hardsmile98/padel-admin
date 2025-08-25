/* eslint-disable react/no-array-index-key */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { useEditPlayerMutation, type Players } from 'services';

type EditPlayerProps = {
  open: boolean;
  onClose: () => void;
  player: Players[number] | null;
};

function EditPlayer({ open, onClose, player }: EditPlayerProps) {
  const [editPlayer, { isLoading, isSuccess, reset }] = useEditPlayerMutation();

  const [form, setForm] = useState({
    slug: '',
    firstName: '',
    lastName: '',
    raiting: '',
    photoUrl: '',
    avatarUrl: '',
    description: [''],
  });

  useEffect(() => {
    if (player) {
      setForm({
        slug: player.slug,
        firstName: player.firstName,
        lastName: player.lastName,
        raiting: player.raiting ? String(player.raiting) : '',
        photoUrl: player.photoUrl,
        avatarUrl: player.avatarUrl,
        description: player.description,
      });
    }
  }, [player]);

  useEffect(() => {
    if (isSuccess) {
      setForm({
        slug: '',
        firstName: '',
        lastName: '',
        raiting: '',
        photoUrl: '',
        avatarUrl: '',
        description: [''],
      });

      onClose();

      reset();
    }
  }, [isSuccess]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          maxWidth: 900,
          width: '100%',
        },
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        Редактировать игрока

        <IconButton onClick={onClose}>
          <CloseIcon onClick={onClose} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            py: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
          <TextField
            label="Имя"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <TextField
            label="Фамилия"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />

          <TextField
            label="Рейтинг"
            type="number"
            value={form.raiting}
            onChange={(e) => setForm({ ...form, raiting: e.target.value })}
          />

          <TextField
            label="Главное фото"
            value={form.photoUrl}
            onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
          />
          <TextField
            label="Аватарка"
            value={form.avatarUrl}
            onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {form.description.map((item, index) => (
              <Box key={index} display="flex" gap={1}>
                <TextField
                  fullWidth
                  label={`Описание ${index + 1}`}
                  value={item}
                  onChange={(e) => setForm({
                    ...form,
                    description: form.description.map((itemDescription, i) => (
                      i === index ? e.target.value : itemDescription
                    )),
                  })}
                />

                {index !== 0 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setForm({
                    ...form,
                    description: form.description.filter((_, i) => i !== index),
                  })}
                >
                  <DeleteIcon />
                </Button>
                )}

                {index === form.description.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setForm({
                    ...form,
                    description: [...form.description, ''],
                  })}
                >
                  <AddIcon />
                </Button>
                )}
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={() => editPlayer({
              ...form,
              raiting: Number(form.raiting),
              id: player?.id ?? 0,
            })}
            disabled={isLoading || !player}
          >
            Сохранить
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EditPlayer;
