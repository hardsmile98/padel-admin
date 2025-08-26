import {
  Box, Button, Tab, Tabs, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { type Tournament } from 'services';
import AddStage from './AddStage';
import SetActiveStage from './SetActiveStage';
import DeleteStage from './DeleteStage';

function Stages({
  stages,
  stageId,
  activeStageId,
  setStageId,
}: {
  activeStageId: number | null,
  stages: Tournament['stages'],
  stageId: number | null,
  setStageId: (stageId: number | null) => void,
}) {
  const [addStageOpen, setAddStageOpen] = useState(false);

  const [deleteStageOpen, setDeleteStageOpen] = useState(false);

  const [setActiveStageOpen, setSetActiveStageOpen] = useState(false);

  const activeStage = stages.find((stage) => stage.id === activeStageId);

  useEffect(() => {
    if (stages.length > 0) {
      const stageFinded = stages.find((stage) => stage.id === stageId);

      if (!stageId || stageFinded === undefined) {
        setStageId(stages[0].id);
      }
    } else if (stageId) {
      setStageId(null);
    }
  }, [stages, stageId]);

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
          Этапы
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAddStageOpen(true)}
          >
            Добавить этап
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setSetActiveStageOpen(true)}
          >
            Выбрать активный
          </Button>

          <Button
            variant="contained"
            color="error"
            disabled={stages.length === 0}
            onClick={() => setDeleteStageOpen(true)}
          >
            Удалить этап
          </Button>
        </Box>
      </Box>

      {stages.length > 0 ? (
        <Tabs
          sx={{ mb: 2 }}
          value={stageId ?? false}
          onChange={(_, value) => setStageId(value)}
        >
          {stages.map((stage) => (
            <Tab
              key={stage.id}
              value={stage.id}
              label={stage.name}
              sx={{ textTransform: 'none' }}
            />
          ))}
        </Tabs>
      ) : (
        <Typography color="text.secondary" variant="body1">
          В турнире нет этапов
        </Typography>
      )}

      <AddStage
        open={addStageOpen}
        onClose={() => setAddStageOpen(false)}
      />

      <SetActiveStage
        open={setActiveStageOpen}
        onClose={() => setSetActiveStageOpen(false)}
        stages={stages}
        activeStage={activeStage || null}
      />

      <DeleteStage
        open={deleteStageOpen}
        onClose={() => setDeleteStageOpen(false)}
        stages={stages}
      />
    </>
  );
}

export default Stages;
