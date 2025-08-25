import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import type { Tournament } from 'services';
import { useNavigate, useParams } from 'react-router-dom';
import AddGroup from './AddGroup';

function Groups({
  groups,
  stageId,
  categoryId,
  subcategoryId,
}: {
  groups: Tournament['groups'],
  stageId: number,
  categoryId: number | null,
  subcategoryId: number | null,
}) {
  const { id: tournamentId } = useParams();

  const navigate = useNavigate();

  const [addGroupOpen, setAddGroupOpen] = useState(false);

  const category = subcategoryId ?? categoryId;

  const groupsByStageAndCategory = groups.filter(
    (group) => group.stageId === stageId && group.categoryId === category,
  );

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        mb: 1,
      }}
      >
        <Typography variant="h6">
          Группы
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddGroupOpen(true)}
        >
          Добавить группу
        </Button>
      </Box>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
      }}
      >
        {groupsByStageAndCategory.map((group) => (
          <Button
            key={group.id}
            variant="outlined"
            color="primary"
            sx={{
              textTransform: 'none',
            }}
            onClick={() => navigate(`/tournaments/${tournamentId}/groups/${group.id}`)}
          >
            {group.name}
          </Button>
        ))}
      </Box>

      <AddGroup
        open={addGroupOpen}
        onClose={() => setAddGroupOpen(false)}
        stageId={stageId}
        categoryId={category}
      />
    </>
  );
}

export default Groups;
