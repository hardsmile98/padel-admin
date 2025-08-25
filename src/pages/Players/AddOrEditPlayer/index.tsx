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
import { useAddPlayerMutation, useEditPlayerMutation, type Players } from 'services';

type AddOrEditPlayerProps = {
  open: boolean;
  onClose: () => void;
  type: 'add' | 'edit';
  player: Players[number] | null;
};

function AddOrEditPlayer({
  open,
  onClose,
  type,
  player,
}: AddOrEditPlayerProps) {
  const [addPlayer, {
    isLoading: isAdding,
    isSuccess: isAdded,
    reset: resetAdding,
  }] = useAddPlayerMutation();

  const [editPlayer, {
    isLoading: isEditing,
    isSuccess: isEdited,
    reset: resetEditing,
  }] = useEditPlayerMutation();

  const isLoading = isAdding || isEditing;

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
    if (player && type === 'edit') {
      setForm({
        slug: player.slug || '',
        firstName: player.firstName || '',
        lastName: player.lastName || '',
        raiting: player.raiting ? player.raiting.toString() : '',
        photoUrl: player.photoUrl || '',
        avatarUrl: player.avatarUrl || '',
        description: player.description || [''],
      });
    } else {
      setForm({
        slug: '',
        firstName: '',
        lastName: '',
        raiting: '',
        photoUrl: '',
        avatarUrl: '',
        description: [''],
      });
    }
  }, [player, type]);

  useEffect(() => {
    if (isAdded || isEdited) {
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

      resetAdding();

      resetEditing();
    }
  }, [isAdded, isEdited]);

  const handleAddOrEditPlayer = () => {
    if (type === 'add') {
      addPlayer({
        ...form,
        raiting: Number(form.raiting),
      });
    } else {
      editPlayer({
        ...form,
        raiting: Number(form.raiting),
        id: player?.id ?? 0,
      });
    }
  };

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
        {type === 'add' ? 'Добавить игрока' : 'Редактировать игрока'}

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
            onClick={handleAddOrEditPlayer}
            disabled={isLoading}
          >
            {type === 'add' ? 'Добавить' : 'Сохранить'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddOrEditPlayer;
